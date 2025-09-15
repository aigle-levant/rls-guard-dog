"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2 } from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: Bot,
      items: [
        {
          title: "View details",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "View reports",
          url: "/dashboard/progress",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <p className="p-2 text-xl font-body">RLS</p>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
