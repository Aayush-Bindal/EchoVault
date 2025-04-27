"use client";
import { GraphCard } from "../_components/PieCard";
import { BarCard } from "../_components/BarCard";
import { LineCard } from "../_components/LineCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card, CardContent } from "@/components/ui/card";

function Analysis() {
  return (
    <SidebarProvider className="bg-transparent dark ">
      <AppSidebar variant="inset" className="bg-transparent" />
      <SidebarInset className="bg-transparent dark">
        <SiteHeader />
        <h1>Choose a journal</h1>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Analysis;
