"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import {
  AlertTriangle,
  Database,
  Download,
  RefreshCw,
  Upload,
} from "lucide-react";
import { useState } from "react";

const AdminSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sysSettings, setSysSettings] = useState({
    siteName: "智慧医疗系统",
    allowRegistration: true,
    maintenanceMode: false,
    notificationEmail: "admin@example.com",
    maxUploadSize: 5,
    logLevel: "info",
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupInterval: "daily",
    retentionDays: 30,
    backupTime: "02:00",
  });

  const saveSystemSettings = async () => {
    try {
      setIsSubmitting(true);
      // 这里是模拟保存设置的API调用
      // 实际实现中，您需要替换为真实的API调用
      // await post('/api/admin/settings/system', sysSettings);

      // 模拟延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 显示成功消息
      toast({
        title: "系统设置已保存",
        description: "您的系统设置已成功更新",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "保存失败",
        description: "无法保存系统设置，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveBackupSettings = async () => {
    try {
      setIsSubmitting(true);
      // 模拟API调用
      // await post('/api/admin/settings/backup', backupSettings);

      // 模拟延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast({
        title: "备份设置已保存",
        description: "您的备份设置已成功更新",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving backup settings:", error);
      toast({
        title: "保存失败",
        description: "无法保存备份设置，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSystemChange = (key: string, value: any) => {
    setSysSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBackupChange = (key: string, value: any) => {
    setBackupSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearSystemCache = async () => {
    try {
      setIsSubmitting(true);
      // 模拟API调用
      // await get('/api/admin/cache/clear');

      // 模拟延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "缓存已清除",
        description: "系统缓存已成功清除",
        variant: "default",
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
      toast({
        title: "操作失败",
        description: "无法清除系统缓存，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualBackup = async () => {
    try {
      setIsSubmitting(true);
      // 模拟API调用
      // await post('/api/admin/backup/manual');

      // 模拟延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "备份已创建",
        description: "系统数据已成功备份",
        variant: "default",
      });
    } catch (error) {
      console.error("Error creating backup:", error);
      toast({
        title: "备份失败",
        description: "无法创建系统备份，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          系统设置
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSystemCache}
            disabled={isSubmitting}
            className="border-gray-200 dark:border-gray-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            清除缓存
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="general"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            一般设置
          </TabsTrigger>
          <TabsTrigger
            value="backup"
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            备份与恢复
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 flex flex-row items-center gap-2">
              <div>
                <CardTitle className="text-lg font-medium">基本设置</CardTitle>
                <CardDescription>配置系统的基本参数</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-2">
                <Label
                  htmlFor="siteName"
                  className="text-gray-700 dark:text-gray-300"
                >
                  站点名称
                </Label>
                <Input
                  id="siteName"
                  value={sysSettings.siteName}
                  onChange={(e) =>
                    handleSystemChange("siteName", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="logLevel"
                  className="text-gray-700 dark:text-gray-300"
                >
                  日志级别
                </Label>
                <select
                  id="logLevel"
                  value={sysSettings.logLevel}
                  onChange={(e) =>
                    handleSystemChange("logLevel", e.target.value)
                  }
                  className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="allowRegistration"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    允许用户注册
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    开启后允许新用户注册账号
                  </p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={sysSettings.allowRegistration}
                  onCheckedChange={(checked) =>
                    handleSystemChange("allowRegistration", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="maintenanceMode"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    维护模式
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    开启后系统将对外显示维护页面
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={sysSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    handleSystemChange("maintenanceMode", checked)
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="notificationEmail"
                  className="text-gray-700 dark:text-gray-300"
                >
                  系统通知邮箱
                </Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  value={sysSettings.notificationEmail}
                  onChange={(e) =>
                    handleSystemChange("notificationEmail", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <Button
                onClick={saveSystemSettings}
                disabled={isSubmitting}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                {isSubmitting ? "保存中..." : "保存设置"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 flex flex-row items-center gap-2">
              <div>
                <CardTitle className="text-lg font-medium flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  危险操作区
                </CardTitle>
                <CardDescription>
                  这些操作可能会影响系统运行，请谨慎使用
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                    重置系统数据
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                    此操作将清除所有系统数据，包括用户、预约和医疗记录。此操作不可撤销。
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    重置所有数据
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 flex flex-row items-center gap-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  <Database className="h-5 w-5 mr-2 inline-block" />
                  备份设置
                </CardTitle>
                <CardDescription>配置系统自动备份选项</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="flex items-center justify-between md:col-span-2">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="autoBackup"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    自动备份
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    开启后系统将按设定的时间自动备份
                  </p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) =>
                    handleBackupChange("autoBackup", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="backupInterval"
                  className="text-gray-700 dark:text-gray-300"
                >
                  备份频率
                </Label>
                <select
                  id="backupInterval"
                  value={backupSettings.backupInterval}
                  onChange={(e) =>
                    handleBackupChange("backupInterval", e.target.value)
                  }
                  className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                  disabled={!backupSettings.autoBackup}
                >
                  <option value="hourly">每小时</option>
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="backupTime"
                  className="text-gray-700 dark:text-gray-300"
                >
                  备份时间
                </Label>
                <Input
                  id="backupTime"
                  type="time"
                  value={backupSettings.backupTime}
                  onChange={(e) =>
                    handleBackupChange("backupTime", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  disabled={!backupSettings.autoBackup}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="retentionDays"
                  className="text-gray-700 dark:text-gray-300"
                >
                  保留天数
                </Label>
                <Input
                  id="retentionDays"
                  type="number"
                  value={backupSettings.retentionDays}
                  onChange={(e) =>
                    handleBackupChange(
                      "retentionDays",
                      parseInt(e.target.value)
                    )
                  }
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  disabled={!backupSettings.autoBackup}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <Button
                onClick={saveBackupSettings}
                disabled={isSubmitting}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                {isSubmitting ? "保存中..." : "保存设置"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
              <CardTitle className="text-lg font-medium">
                手动备份与恢复
              </CardTitle>
              <CardDescription>手动创建或恢复系统备份</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                    创建备份
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    创建系统数据的完整备份，包括所有用户、预约和医疗记录。
                  </p>
                  <Button
                    variant="outline"
                    className="border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    onClick={handleManualBackup}
                    disabled={isSubmitting}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    创建备份
                  </Button>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
                    恢复备份
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                    从现有备份恢复系统数据。此操作将覆盖当前所有数据。
                  </p>
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <select
                      className="p-2 text-sm bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 rounded-md"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        选择备份文件
                      </option>
                      <option value="backup_20230601">
                        2023-06-01 (11:30)
                      </option>
                      <option value="backup_20230530">
                        2023-05-30 (09:15)
                      </option>
                      <option value="backup_20230525">
                        2023-05-25 (14:45)
                      </option>
                    </select>
                    <Button
                      variant="outline"
                      className="border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                      disabled={isSubmitting}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      恢复备份
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
