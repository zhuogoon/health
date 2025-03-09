import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// 动态导入RouteGuard以避免服务器端渲染问题
const DynamicRouteGuard = dynamic(
  () => import("@/components/auth/RouteGuard"),
  { ssr: false }
);

// 动态导入Providers以避免服务器端渲染问题
const DynamicProviders = dynamic(() => import("./providers"), { ssr: false });

export const metadata: Metadata = {
  title: "慧医智慧医疗系统",
  description: "慧医智慧医疗系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DynamicRouteGuard>
            <DynamicProviders>{children}</DynamicProviders>
          </DynamicRouteGuard>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
