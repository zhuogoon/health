# 慧医健康系统管理员API文档

## 目录

- [认证接口](#认证接口)
- [系统状态接口](#系统状态接口)
- [系统通知接口](#系统通知接口)
- [系统设置接口](#系统设置接口)
- [系统备份接口](#系统备份接口)

## 通用返回格式

所有API返回JSON格式的数据，结构如下：

```json
{
  "code": 200,        // 状态码，200表示成功，非200表示失败
  "message": "success", // 状态消息
  "data": { }         // 返回的数据，失败时可能为null或错误信息
}
```

## 认证接口

### 管理员登录

- **URL**: `/api/admin/login`
- **方法**: `POST`
- **权限**: 无需认证
- **请求体**:

```json
{
  "username": "admin",
  "key": "随机密钥"
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "JWT令牌",
    "expire": 7200, // 过期时间(秒)
    "username": "admin"
  }
}
```

### 获取密钥

- **URL**: `/api/admin/getkey`
- **方法**: `GET`
- **权限**: 无需认证
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": "随机密钥"
}
```

## 系统状态接口

### 获取系统状态

- **URL**: `/api/system/status`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "cpuUsage": 25.4,          // CPU使用率(%)
    "memoryUsage": 68.2,        // 内存使用率(%)
    "usedMemory": 4096.5,       // 已用内存(MB)
    "totalMemory": 8192.0,      // 总内存(MB)
    "diskUsage": 45.6,          // 磁盘使用率(%)
    "usedDiskSpace": 128.5,     // 已用磁盘空间(GB)
    "totalDiskSpace": 512.0,    // 总磁盘空间(GB)
    "uptime": 345600,           // 系统运行时间(秒)
    "osName": "Windows 10",     // 操作系统名称
    "javaVersion": "17.0.2",    // Java版本
    "currentTime": "2023-11-24 15:30:20" // 当前时间
  }
}
```

### 获取统计数据

- **URL**: `/api/admin/count`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "patientCount": 1250,     // 患者总数
    "doctorCount": 45,        // 医生总数
    "checkProjectCount": 28   // 检查项目总数
  }
}
```

## 系统通知接口

### 获取系统通知列表

- **URL**: `/api/system/notifications`
- **方法**: `POST`
- **权限**: 管理员
- **请求体**:

```json
{
  "current": 1,       // 当前页码
  "size": 10,         // 每页大小
  "type": "WARNING",  // 可选，通知类型筛选
  "isRead": false     // 可选，已读状态筛选
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "title": "CPU使用率过高",
        "content": "当前CPU使用率: 85.6%, 超过设定阈值: 80%",
        "type": "WARNING",
        "isRead": false,
        "createdAt": "2023-11-24 15:20:10"
      },
      // 更多记录...
    ],
    "total": 24,       // 总记录数
    "size": 10,        // 每页大小
    "current": 1,      // 当前页码
    "pages": 3         // 总页数
  }
}
```

### 获取未读通知数量

- **URL**: `/api/system/notifications/unread-count`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": 5  // 未读通知数量
}
```

### 获取最新通知

- **URL**: `/api/system/notifications/latest`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `limit`: 数量限制，默认5
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 24,
      "title": "系统备份完成",
      "content": "系统数据已成功备份，文件: backup_20231124_152510.sql",
      "type": "INFO",
      "isRead": false,
      "createdAt": "2023-11-24 15:25:10"
    },
    // 更多通知...
  ]
}
```

### 标记通知为已读

- **URL**: `/api/system/notifications/mark-read`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `id`: 通知ID
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 系统设置接口

### 获取系统设置

- **URL**: `/api/system/settings`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "basicSettings": {
      "site_name": "智慧医疗系统",
      "log_level": "INFO",
      "allow_register": "true",
      "maintenance_mode": "false"
    },
    "backupSettings": {
      "auto_backup": "true",
      "backup_frequency": "daily",
      "backup_time": "02:00",
      "retention_days": "30"
    },
    "emailSettings": {
      "smtp_server": "smtp.example.com",
      "smtp_port": "25",
      "smtp_username": "admin@example.com",
      "smtp_password": "******",
      "mail_from": "no-reply@example.com",
      "notification_email": "admin@example.com"
    },
    "securitySettings": {
      "system.cpu.threshold": "80",
      "system.memory.threshold": "80",
      "system.disk.threshold": "80"
    }
  }
}
```

### 更新系统设置

- **URL**: `/api/system/settings/update`
- **方法**: `POST`
- **权限**: 管理员
- **请求体**:

```json
{
  "groupName": "basic",
  "settings": {
    "site_name": "新的系统名称",
    "allow_register": "false"
  }
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 重置系统数据

- **URL**: `/api/system/reset`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 系统备份接口

### 创建系统备份

- **URL**: `/api/system/backup/create`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `description`: 备份描述
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 恢复系统备份

- **URL**: `/api/system/backup/restore`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `id`: 备份ID
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 获取备份列表

- **URL**: `/api/system/backup/list`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `current`: 当前页码，默认1
  - `size`: 每页大小，默认10
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 5,
        "filename": "backup_20231124_152510.sql",
        "filePath": "./backups/backup_20231124_152510.sql",
        "fileSize": 1048576,
        "backupType": "MANUAL",
        "status": "COMPLETED",
        "description": "手动备份 - 发布前",
        "createdAt": "2023-11-24 15:25:10",
        "updatedAt": "2023-11-24 15:25:15"
      },
      // 更多备份记录...
    ],
    "total": 12,       // 总记录数
    "size": 10,        // 每页大小
    "current": 1,      // 当前页码
    "pages": 2         // 总页数
  }
}
```

## 医生管理接口

### 获取医生列表

- **URL**: `/api/admin/doctor`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "张医生",
      "jobTitle": "主任医师",
      "jobType": "内科",
      "avatar": "头像URL"
    },
    // 更多医生...
  ]
}
```

### 删除医生

- **URL**: `/api/admin/deldoctor`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `id`: 医生ID
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 患者管理接口

### 获取患者列表

- **URL**: `/api/admin/patient`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "李患者",
      "sex": "男",
      "birthday": "1990-01-01",
      "userId": 101
    },
    // 更多患者...
  ]
}
```

### 删除患者

- **URL**: `/api/admin/delpatient`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `id`: 患者ID
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 检查项目管理接口

### 获取检查项目列表

- **URL**: `/api/admin/info`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "血常规",
      "room": "检验科"
    },
    // 更多检查项目...
  ]
}
```

### 添加检查项目

- **URL**: `/api/admin/add`
- **方法**: `POST`
- **权限**: 管理员
- **请求体**:

```json
{
  "name": "CT扫描",
  "room": "放射科"
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 更新检查项目

- **URL**: `/api/admin/update`
- **方法**: `POST`
- **权限**: 管理员
- **请求体**:

```json
{
  "id": 1,
  "name": "血常规检查",
  "room": "检验科一室"
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 删除检查项目

- **URL**: `/api/admin/delete`
- **方法**: `GET`
- **权限**: 管理员
- **参数**:
  - `id`: 检查项目ID
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

## 统计仪表盘接口

### 获取仪表盘数据

- **URL**: `/api/admin/dashboard`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "appointmentStats": {
      "total": 40,
      "pending": 18,
      "completed": 22
    },
    "patientStats": {
      "total": 3578,
      "todayNew": 12,
      "monthlyActive": 456
    },
    "medicalRecordStats": {
      "total": 890,
      "todayNew": 15,
      "totalAppointments": 1245
    },
    "checkProjectStats": {
      "total": 28,
      "mostPopular": "血常规检查"
    },
    "weeklyDistribution": {
      "data": [12, 18, 15, 21, 18, 8, 5],
      "labels": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    "patientGrowth": {
      "data": [45, 52, 49, 60, 67, 72, 82, 88, 92, 105, 112, 120],
      "labels": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    }
  }
}
```

### 获取预约统计

- **URL**: `/api/system/stats/appointment`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 40,
    "pending": 18,
    "completed": 22
  }
}
```

### 获取患者统计

- **URL**: `/api/system/stats/patient`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 3578,
    "todayNew": 12,
    "monthlyActive": 456
  }
}
```

### 获取医疗记录统计

- **URL**: `/api/system/stats/medical`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 890,
    "todayNew": 15,
    "totalAppointments": 1245
  }
}
```

### 获取检查项目统计

- **URL**: `/api/system/stats/check`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 28,
    "mostPopular": "血常规检查"
  }
}
```

### 获取每周预约分布

- **URL**: `/api/system/stats/appointment/weekly`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "data": [12, 18, 15, 21, 18, 8, 5],
    "labels": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  }
}
```

### 获取患者增长趋势

- **URL**: `/api/system/stats/patient/growth`
- **方法**: `GET`
- **权限**: 管理员
- **响应**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "data": [45, 52, 49, 60, 67, 72, 82, 88, 92, 105, 112, 120],
    "labels": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  }
}
``` 