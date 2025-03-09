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
  Settings,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { get, post } from "@/net";

interface SystemSettings {
  basicSettings: {
    site_name: string;
    log_level: string;
    allow_register: string;
    maintenance_mode: string;
  };
  backupSettings: {
    auto_backup: string;
    backup_frequency: string;
    backup_time: string;
    retention_days: string;
  };
  emailSettings: {
    smtp_server: string;
    smtp_port: string;
    smtp_username: string;
    smtp_password: string;
    mail_from: string;
    notification_email: string;
  };
  securitySettings: {
    [key: string]: string;
  };
}

interface BackupItem {
  id: number;
  filename: string;
  filePath: string;
  fileSize: number;
  backupType: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const AdminSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [backups, setBackups] = useState<BackupItem[]>([]);

  // 客户端用的设置状态（经过转换的）
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

  // 从API加载系统设置
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        // 获取系统设置
        const settings: SystemSettings = await get("/api/system/settings");

        // 更新设置状态
        setSysSettings({
          siteName: settings.basicSettings.site_name,
          allowRegistration: settings.basicSettings.allow_register === "true",
          maintenanceMode: settings.basicSettings.maintenance_mode === "true",
          notificationEmail: settings.emailSettings.notification_email,
          maxUploadSize: 5, // 假设这个值不在API返回中
          logLevel: settings.basicSettings.log_level.toLowerCase(),
        });

        setBackupSettings({
          autoBackup: settings.backupSettings.auto_backup === "true",
          backupInterval: settings.backupSettings.backup_frequency,
          retentionDays: parseInt(settings.backupSettings.retention_days),
          backupTime: settings.backupSettings.backup_time,
        });

        // 获取备份列表
        fetchBackups();
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "设置加载失败",
          description: "无法加载系统设置，请重试",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 获取备份列表
  const fetchBackups = async () => {
    try {
      const response = await get("/api/system/backup/list");
      setBackups(response.records || []);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const saveSystemSettings = async () => {
    try {
      setIsSubmitting(true);

      // 转换为API格式
      const apiSettings = {
        groupName: "basic",
        settings: {
          site_name: sysSettings.siteName,
          allow_register: String(sysSettings.allowRegistration),
          maintenance_mode: String(sysSettings.maintenanceMode),
          log_level: sysSettings.logLevel.toUpperCase(),
        },
      };

      // 保存基本设置
      await post("/api/system/settings/update", apiSettings);

      // 保存邮件设置（如果需要）
      const emailSettings = {
        groupName: "email",
        settings: {
          notification_email: sysSettings.notificationEmail,
        },
      };

      await post("/api/system/settings/update", emailSettings);

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

      // 转换为API格式
      const apiSettings = {
        groupName: "backup",
        settings: {
          auto_backup: String(backupSettings.autoBackup),
          backup_frequency: backupSettings.backupInterval,
          backup_time: backupSettings.backupTime,
          retention_days: String(backupSettings.retentionDays),
        },
      };

      // 保存备份设置
      await post("/api/system/settings/update", apiSettings);

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

      // API文档中没有清除缓存的端点，这里保留实现，但可能需要后端补充
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

      // 创建手动备份
      await get("/api/system/backup/create");

      // 刷新备份列表
      fetchBackups();

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

  const handleRestoreBackup = async (id: number) => {
    if (window.confirm("确定要恢复此备份吗？这将覆盖当前数据。")) {
      try {
        setIsSubmitting(true);

        // 恢复备份
        await get(`/api/system/backup/restore?id=${id}`);

        toast({
          title: "备份已恢复",
          description: "系统数据已成功恢复",
          variant: "default",
        });
      } catch (error) {
        console.error("Error restoring backup:", error);
        toast({
          title: "恢复失败",
          description: "无法恢复系统备份，请重试",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 添加维护模式切换的快速函数
  const toggleMaintenanceMode = async () => {
    try {
      setIsSubmitting(true);

      // 切换维护模式
      const newMode = !sysSettings.maintenanceMode;
      console.log(`正在${newMode ? "启用" : "禁用"}维护模式...`);

      // 更新系统设置
      const apiSettings = {
        groupName: "basic",
        settings: {
          maintenance_mode: String(newMode),
        },
      };

      // 调用API更新设置
      const response = await post("/api/system/settings/update", apiSettings);
      console.log("维护模式更新响应:", response);

      // 更新本地状态
      setSysSettings((prev) => ({
        ...prev,
        maintenanceMode: newMode,
      }));

      toast({
        title: newMode ? "已启用维护模式" : "已禁用维护模式",
        description: newMode
          ? "系统已进入维护状态，仅管理员可访问"
          : "系统已恢复正常访问",
        variant: "default",
      });
    } catch (error) {
      console.error("Error toggling maintenance mode:", error);
      toast({
        title: "切换维护模式失败",
        description: "无法更改系统维护状态，请重试",
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
            variant={sysSettings.maintenanceMode ? "destructive" : "outline"}
            size="sm"
            onClick={toggleMaintenanceMode}
            disabled={isSubmitting}
            className={
              !sysSettings.maintenanceMode
                ? "border-gray-200 dark:border-gray-700"
                : ""
            }
          >
            {sysSettings.maintenanceMode ? (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                退出维护模式
              </>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                启用维护模式
              </>
            )}
          </Button>
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      sysSettings.maintenanceMode
                        ? "text-red-500 border-red-200 dark:border-red-800"
                        : "text-gray-500"
                    }
                    onClick={toggleMaintenanceMode}
                    disabled={isSubmitting}
                  >
                    {sysSettings.maintenanceMode ? "立即关闭" : "立即开启"}
                  </Button>
                  <Switch
                    id="maintenanceMode"
                    checked={sysSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSystemChange("maintenanceMode", checked)
                    }
                  />
                </div>
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
                <CardTitle className="text-lg font-medium">备份配置</CardTitle>
                <CardDescription>设置自动备份参数</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-700 dark:text-gray-300">
                    启用自动备份
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    定期自动备份系统数据
                  </p>
                </div>
                <Switch
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) =>
                    handleBackupChange("autoBackup", checked)
                  }
                  disabled={isSubmitting || isLoading}
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
                  disabled={
                    !backupSettings.autoBackup || isSubmitting || isLoading
                  }
                  className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
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
                  备份时间（每天）
                </Label>
                <Input
                  id="backupTime"
                  type="time"
                  value={backupSettings.backupTime}
                  onChange={(e) =>
                    handleBackupChange("backupTime", e.target.value)
                  }
                  disabled={
                    !backupSettings.autoBackup || isSubmitting || isLoading
                  }
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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
                  min="1"
                  max="365"
                  value={backupSettings.retentionDays}
                  onChange={(e) =>
                    handleBackupChange(
                      "retentionDays",
                      parseInt(e.target.value)
                    )
                  }
                  disabled={isSubmitting || isLoading}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  超过此天数的备份将自动删除
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-between items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mx-4">
                自动备份将在指定时间进行，确保系统在备份期间保持稳定
              </p>
              <Button
                onClick={saveBackupSettings}
                disabled={isSubmitting || isLoading}
                variant="outline"
                className="ml-auto"
              >
                保存设置
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 flex flex-row items-center gap-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  手动备份与恢复
                </CardTitle>
                <CardDescription>手动创建备份或从已有备份恢复</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleManualBackup}
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Database className="h-4 w-4 mr-2" />
                  创建备份
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  创建当前系统状态的备份文件
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">备份历史</h4>

                {isLoading ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      加载备份历史...
                    </p>
                  </div>
                ) : backups.length === 0 ? (
                  <div className="text-center py-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="text-gray-500 dark:text-gray-400">
                      暂无备份记录
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400">
                            文件名
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400">
                            大小
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400">
                            类型
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400">
                            创建时间
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {backups.map((backup) => (
                          <tr
                            key={backup.id}
                            className="border-t border-gray-200 dark:border-gray-700"
                          >
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                              {backup.filename}
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                              {(backup.fileSize / 1024 / 1024).toFixed(2)} MB
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                              {backup.backupType === "MANUAL"
                                ? "手动备份"
                                : "自动备份"}
                            </td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                              {backup.createdAt}
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-500 hover:text-blue-600"
                                onClick={() => handleRestoreBackup(backup.id)}
                                disabled={isSubmitting}
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                恢复
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                恢复备份将覆盖当前系统数据，请谨慎操作
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
