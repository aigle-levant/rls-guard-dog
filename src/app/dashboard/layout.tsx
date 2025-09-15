import { AppSidebar } from "@/components/ui/app-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main">
      <div id="top-content" className="flex-1 p-6">
        <SidebarProvider>
          <AppSidebar />
          {children}
        </SidebarProvider>
      </div>
    </main>
  );
}
