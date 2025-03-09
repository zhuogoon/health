import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 不需要检查维护状态的路径列表
const EXEMPT_PATHS = [
  "/admin",
  "/maintenance",
  "/api", // API路径也需要排除，因为我们需要调用API来检查维护状态
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是豁免路径
  const isExemptPath = EXEMPT_PATHS.some((path) => pathname.startsWith(path));

  // 如果是豁免路径，直接通过
  if (isExemptPath) {
    return NextResponse.next();
  }

  try {
    // 获取系统维护状态
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const maintenanceRes = await fetch(`${baseUrl}/api/system/maintenance`, {
      headers: {
        "Content-Type": "application/json",
        // 如果API需要认证，这里可以从cookie或其他地方获取token
        ...(request.cookies.get("jwt")
          ? { Authorization: `Bearer ${request.cookies.get("jwt")?.value}` }
          : {}),
      },
      cache: "no-store",
    });

    // 记录响应状态，帮助调试
    console.log(`维护状态检查响应状态码: ${maintenanceRes.status}`);

    if (!maintenanceRes.ok) {
      console.error("获取维护状态失败:", await maintenanceRes.text());
      return NextResponse.next();
    }

    const responseText = await maintenanceRes.text();
    console.log("原始响应文本:", responseText);

    // 如果响应为空，无法判断状态，默认放行
    if (!responseText) {
      console.warn("维护状态API返回空响应");
      return NextResponse.next();
    }

    // 尝试解析JSON
    let maintenanceData;
    try {
      maintenanceData = JSON.parse(responseText);
    } catch (e) {
      console.error("解析JSON失败:", e);
      // 如果直接返回了布尔值，可能是以文本形式
      const isInMaintenance = responseText.trim() === "true";
      if (isInMaintenance) {
        console.log(`重定向到维护页面(文本响应): ${pathname} -> /maintenance`);
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // 记录响应内容，帮助调试
    console.log("维护状态API响应(解析后):", maintenanceData);

    // API可能返回多种格式，尝试所有可能的维护状态格式：
    // 1. 直接返回布尔值: true/false
    // 2. {data: true/false}
    // 3. {code: 200, message: "success", data: true/false}

    let isInMaintenance = false;

    if (typeof maintenanceData === "boolean") {
      // 直接返回布尔值
      isInMaintenance = maintenanceData;
    } else if (maintenanceData && typeof maintenanceData === "object") {
      if ("data" in maintenanceData) {
        // {data: true/false} 或 {code: 200, message: "success", data: true/false}
        isInMaintenance = maintenanceData.data === true;
      }
    }

    console.log("系统是否处于维护状态:", isInMaintenance);

    // 如果系统在维护中且不是admin或maintenance页面，重定向到维护页面
    if (isInMaintenance) {
      console.log(`重定向到维护页面: ${pathname} -> /maintenance`);
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("中间件检查维护状态时出错:", error);
    // 出错时默认放行请求
    return NextResponse.next();
  }

  return NextResponse.next();
}

// 配置中间件应该运行的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * - api 路由（/api/*)
     * - 静态文件（包括images、_next）
     * - favicon.ico, manifest.json等特殊文件
     */
    "/((?!_next/static|_next/image|images/|favicon.ico|manifest.json).*)",
  ],
};
