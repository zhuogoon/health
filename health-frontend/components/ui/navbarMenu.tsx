"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "查看我的病例",
    href: "/docs/primitives/alert-dialog",
    description: "查看账号下在本院所有的病例结果",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>开始预约</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/home"
                  >
                    <img
                      src="/images/icon.png"
                      alt="logo"
                      className="h-10 w-10"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      智慧医疗系统
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      开启你的智慧医疗时代
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/appointment/list" title="查看我的预约">
                在这里你可以找到你的所有预约信息
              </ListItem>
              <ListItem href="/appointment" title="就诊预约">
                在这里你可以预约到本院所有的医生，为你提供专业的医疗服务
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>病例单</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/home"
                  >
                    <img
                      src="/images/icon.png"
                      alt="logo"
                      className="h-10 w-10"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      智慧医疗系统
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      开启你的智慧医疗时代
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/cases/list" title="查看我的病例单">
                在这里可以找到在本院就诊的所有病例单
              </ListItem>
              <ListItem href="/check" title="查看我的病例单">
                在这里可以找到在本院开出的检查项目，就诊时请在这里确认
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/patient/settings" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              我的设置
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
