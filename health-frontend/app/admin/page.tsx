"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clipboard,
  Clock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { get } from "@/net";

// 为图表准备的模拟数据
// 这些数据将通过API获取，保留作为备用
const weeklyAppointmentData = [
  { name: "周一", count: 12 },
  { name: "周二", count: 19 },
  { name: "周三", count: 15 },
  { name: "周四", count: 21 },
  { name: "周五", count: 18 },
  { name: "周六", count: 9 },
  { name: "周日", count: 5 },
];

const monthlyPatientData = [
  { name: "1月", count: 45 },
  { name: "2月", count: 52 },
  { name: "3月", count: 49 },
  { name: "4月", count: 63 },
  { name: "5月", count: 71 },
  { name: "6月", count: 80 },
  { name: "7月", count: 85 },
  { name: "8月", count: 90 },
  { name: "9月", count: 95 },
  { name: "10月", count: 105 },
  { name: "11月", count: 110 },
  { name: "12月", count: 120 },
];

// 定义系统通知的接口
interface SystemNotification {
  id: number;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

// 将系统通知转换为前端显示格式的通知
interface Alert {
  id: number;
  message: string;
  type: string;
  time: string;
  isRead: boolean;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    appointments: {
      total: 0,
      todayPending: 0,
      todayCompleted: 0,
    },
    patients: {
      total: 0,
      newToday: 0,
      activeMonth: 0,
    },
    records: {
      total: 0,
      todayCreated: 0,
    },
    checkProjects: {
      total: 0,
      mostPopular: "",
    },
  });

  const [weeklyData, setWeeklyData] = useState(weeklyAppointmentData);
  const [patientGrowthData, setPatientGrowthData] =
    useState(monthlyPatientData);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 使用API获取仪表盘数据
  const fetchData = async () => {
    try {
      setIsLoading(true);

      await noLoadingFetchData();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "数据加载失败",
        description: "无法加载控制台数据，请刷新页面重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // 定时刷新数据
  useEffect(() => {
    const interval = setInterval(() => {
      noLoadingFetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // 不会修改loading的fetchData
  const noLoadingFetchData = async () => {
    try {
      // 获取仪表盘综合数据
      const dashboardData = await get("/api/admin/dashboard");
      // 设置统计数据
      setStats({
        appointments: {
          total: dashboardData.appointmentStats.total,
          todayPending: dashboardData.appointmentStats.pending,
          todayCompleted: dashboardData.appointmentStats.completed,
        },
        patients: {
          total: dashboardData.patientStats.total,
          newToday: dashboardData.patientStats.todayNew,
          activeMonth: dashboardData.patientStats.monthlyActive,
        },
        records: {
          total: dashboardData.medicalRecordStats.total,
          todayCreated: dashboardData.medicalRecordStats.todayNew,
        },
        checkProjects: {
          total: dashboardData.checkProjectStats.total,
          mostPopular: dashboardData.checkProjectStats.mostPopular,
        },
      });

      // 设置图表数据
      if (dashboardData.weeklyDistribution) {
        const weeklyChartData = dashboardData.weeklyDistribution.labels.map(
          (label: string, index: number) => ({
            name: label,
            count: dashboardData.weeklyDistribution.data[index],
          })
        );
        setWeeklyData(weeklyChartData);
      }
      if (dashboardData.patientGrowth) {
        const growthChartData = dashboardData.patientGrowth.labels.map(
          (label: string, index: number) => ({
            name: label,
            count: dashboardData.patientGrowth.data[index],
          })
        );
        setPatientGrowthData(growthChartData);
      }

      // 获取最新系统通知
      await fetchLatestNotifications();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "数据加载失败",
        description: "无法加载控制台数据，请刷新页面重试",
        variant: "destructive",
      });
    }
  };

  // 获取最新系统通知
  const fetchLatestNotifications = async () => {
    try {
      // 获取最新通知，限制5条
      const notifications: SystemNotification[] = await get(
        "/api/system/notifications/latest?limit=5"
      );

      // 获取未读通知数量
      const unreadCountData = await get(
        "/api/system/notifications/unread-count"
      );
      setUnreadCount(unreadCountData);

      // 转换通知格式
      const formattedAlerts: Alert[] = notifications.map((notification) => {
        // 计算时间差
        const createdTime = new Date(notification.createdAt);
        const now = new Date();
        const diffMinutes = Math.floor(
          (now.getTime() - createdTime.getTime()) / (1000 * 60)
        );

        let timeString;
        if (diffMinutes < 1) {
          timeString = "刚刚";
        } else if (diffMinutes < 60) {
          timeString = `${diffMinutes}分钟前`;
        } else if (diffMinutes < 24 * 60) {
          const hours = Math.floor(diffMinutes / 60);
          timeString = `${hours}小时前`;
        } else {
          const days = Math.floor(diffMinutes / (24 * 60));
          timeString = `${days}天前`;
        }

        // 转换通知类型
        let alertType = "info";
        if (notification.type === "WARNING") alertType = "warning";
        if (notification.type === "ERROR") alertType = "error";
        if (notification.type === "SUCCESS") alertType = "success";

        return {
          id: notification.id,
          message: notification.title,
          type: alertType,
          time: timeString,
          isRead: notification.isRead,
        };
      });

      setAlerts(formattedAlerts);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDismissAlert = async (id: number) => {
    try {
      // 调用API标记通知为已读
      await get(`/api/system/notifications/mark-read?id=${id}`);

      // 更新本地状态
      setAlerts(
        alerts.map((alert) =>
          alert.id === id ? { ...alert, isRead: true } : alert
        )
      );

      // 更新未读通知数
      if (unreadCount > 0) {
        setUnreadCount(unreadCount - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // 即使API调用失败，也从界面上移除
      setAlerts(alerts.filter((alert) => alert.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          控制台概览
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchData()}
          disabled={isLoading}
          className="border-gray-200 dark:border-gray-700"
        >
          <Clock className="h-4 w-4 mr-2" />
          刷新数据
        </Button>
      </div>

      {/* 主要统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              今日预约
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
              {isLoading
                ? "加载中..."
                : stats.appointments.todayPending +
                  stats.appointments.todayCompleted}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              待完成: {isLoading ? "-" : stats.appointments.todayPending} ·
              已完成: {isLoading ? "-" : stats.appointments.todayCompleted}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-700 dark:text-teal-400 flex items-center text-sm font-medium">
              <Users className="mr-2 h-4 w-4" />
              患者统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900 dark:text-teal-300">
              {isLoading ? "加载中..." : stats.patients.total}
            </div>
            <p className="text-xs text-teal-700 dark:text-teal-400 mt-1">
              今日新增: {isLoading ? "-" : stats.patients.newToday} · 本月活跃:{" "}
              {isLoading ? "-" : stats.patients.activeMonth}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-700 dark:text-purple-400 flex items-center text-sm font-medium">
              <FileText className="mr-2 h-4 w-4" />
              医疗记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
              {isLoading ? "加载中..." : stats.records.total}
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
              今日新增: {isLoading ? "-" : stats.records.todayCreated} ·
              总预约数: {isLoading ? "-" : stats.appointments.total}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-700 dark:text-amber-400 flex items-center text-sm font-medium">
              <Clipboard className="mr-2 h-4 w-4" />
              检查项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-300">
              {isLoading ? "加载中..." : stats.checkProjects.total}
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
              最受欢迎: {isLoading ? "-" : stats.checkProjects.mostPopular}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 图表部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
              每周预约分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="rgba(59, 130, 246, 0.8)"
                    radius={[4, 4, 0, 0]}
                    name="预约数量"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-teal-500" />
              患者增长趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patientGrowthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="rgba(20, 184, 166, 0.8)"
                    strokeWidth={2}
                    name="患者数"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统提醒部分 */}
      <Card className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              系统提醒
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                {unreadCount}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              加载中...
            </p>
          ) : alerts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              暂无系统提醒
            </p>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-md flex justify-between items-center 
                    ${
                      alert.type === "warning"
                        ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                        : ""
                    }
                    ${
                      alert.type === "error"
                        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        : ""
                    }
                    ${
                      alert.type === "success"
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : ""
                    }
                    ${
                      alert.type === "info"
                        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        : ""
                    }
                    ${alert.isRead ? "opacity-70" : ""}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 
                        ${alert.type === "warning" ? "bg-amber-500" : ""} 
                        ${alert.type === "error" ? "bg-red-500" : ""} 
                        ${alert.type === "success" ? "bg-green-500" : ""}
                        ${alert.type === "info" ? "bg-blue-500" : ""}
                        ${alert.isRead ? "opacity-50" : ""}
                      `}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium
                        ${
                          alert.type === "warning"
                            ? "text-amber-800 dark:text-amber-300"
                            : ""
                        } 
                        ${
                          alert.type === "error"
                            ? "text-red-800 dark:text-red-300"
                            : ""
                        } 
                        ${
                          alert.type === "success"
                            ? "text-green-800 dark:text-green-300"
                            : ""
                        }
                        ${
                          alert.type === "info"
                            ? "text-blue-800 dark:text-blue-300"
                            : ""
                        }
                        ${alert.isRead ? "opacity-70" : ""}
                      `}
                      >
                        {alert.message}
                        {!alert.isRead && (
                          <span className="inline-block ml-2 bg-blue-500 rounded-full h-2 w-2"></span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismissAlert(alert.id)}
                    className="h-7 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {alert.isRead ? "删除" : "标为已读"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
