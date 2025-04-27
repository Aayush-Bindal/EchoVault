import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeftIcon } from "lucide-react";

export function AppLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                {/* Your sidebar menu items here */}
                <SidebarMenuItem>
                  <SidebarMenuButton>Menu Item 1</SidebarMenuButton>
                </SidebarMenuItem>
                {/* More menu items */}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 w-[40px]" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex flex-row space-x-2">
          <ArrowBigLeftIcon className="text-white" />
          <h1 className="text-base font-medium">Explore</h1>
        </div>
      </div>
    </header>
  );
}
