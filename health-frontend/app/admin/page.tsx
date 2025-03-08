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

// 为图表准备的模拟数据
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

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "今日有5位患者等待预约确认",
      type: "warning",
      time: "10分钟前",
    },
    {
      id: 2,
      message: "检查项目「血常规」预约量已达今日上限",
      type: "error",
      time: "30分钟前",
    },
    {
      id: 3,
      message: "已完成今日所有预约安排",
      type: "success",
      time: "1小时前",
    },
  ]);

  useEffect(() => {
    // 模拟加载数据
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 实际实现中应替换为真实API调用
        // const data = await get('/api/admin/dashboard/stats');

        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 模拟数据
        setStats({
          appointments: {
            total: 1245,
            todayPending: 18,
            todayCompleted: 22,
          },
          patients: {
            total: 3578,
            newToday: 12,
            activeMonth: 456,
          },
          records: {
            total: 890,
            todayCreated: 15,
          },
          checkProjects: {
            total: 28,
            mostPopular: "血常规检查",
          },
        });
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

    fetchData();
  }, []);

  const handleDismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
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
          onClick={() => window.location.reload()}
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyAppointmentData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eaeaea"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis tick={{ fontSize: 12 }} width={30} />
                  <Tooltip
                    formatter={(value: number) => [`${value} 个预约`, "数量"]}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-teal-500" />
              患者增长趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyPatientData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#eaeaea"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis tick={{ fontSize: 12 }} width={30} />
                  <Tooltip
                    formatter={(value: number) => [`${value} 位患者`, "数量"]}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
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
          <CardTitle className="text-base font-medium flex items-center">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            系统提醒
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
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
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 
                        ${alert.type === "warning" ? "bg-amber-500" : ""} 
                        ${alert.type === "error" ? "bg-red-500" : ""} 
                        ${alert.type === "success" ? "bg-green-500" : ""}
                      `}
                    />
                    <div>
                      <p
                        className={`text-sm 
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
                      `}
                      >
                        {alert.message}
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
                    关闭
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
