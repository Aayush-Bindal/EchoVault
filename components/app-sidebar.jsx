"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for dynamic routing
import {
  ArrowUpCircle,
  BarChart,
  BookOpen,
  Camera,
  ClipboardList,
  Database,
  FileCode,
  File,
  FileText,
  Folder,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  List,
  Search,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

// NavUser component
const NavUser = ({ user }) => (
  <div className="flex items-center p-2">
    <div className="w-8 h-8 rounded-full bg-slate-700 mr-2"></div>
    <div>
      <div className="text-sm font-medium text-white">{user.name}</div>
      <div className="text-xs text-slate-400">{user.email}</div>
    </div>
  </div>
);

// Updated NavMain component with styling
const NavMain = ({ items, onItemSelect }) => (
  <div className="space-y-1 px-2">
    {items.map((item, index) => {
      const Icon = item.icon;
      return (
        <a
          key={index}
          onClick={() => onItemSelect(item.url)} // Use onClick to update URL
          className="flex items-center p-2 rounded-md text-white hover:bg-opacity-20 hover:bg-white transition-colors cursor-pointer"
        >
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          <span className="text-sm">{item.title}</span>
        </a>
      );
    })}
  </div>
);

// Updated Journal history component with buttons
const JournalHistory = ({ journals, onJournalClick }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center px-3 mb-2">
        <BookOpen className="w-4 h-4 mr-2 text-white" />
        <h3 className="text-sm font-medium text-white">Journal History</h3>
      </div>
      <div className="space-y-2 px-2">
        {journals.map((journal) => (
          <Button
            key={journal.id}
            variant="ghost"
            onClick={() => onJournalClick(journal.id)} // Pass journal ID instead of whole object
            className="w-full flex items-center justify-start p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 hover:bg-primary py-7"
          >
            <div className="relative flex-shrink-0">
              <Inbox className="w-4 h-4 mr-2" />
              {journal.status === "new" && (
                <span className="absolute top-0 right-1 w-2 h-2 bg-purple-400 rounded-full" />
              )}
            </div>
            <div className="overflow-hidden text-left">
              <div className="truncate text-sm">{journal.title}</div>
              <div className="text-xs text-slate-400">{journal.date}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

const SidebarSection = ({ children }) => <div className="mt-6">{children}</div>;

// Updated journal data with content
const journalHistory = [
  {
    id: "journal-1",
    title: "Morning Reflection",
    date: "Apr 27, 2025",
    status: "new",
    content:
      "Today I woke up feeling refreshed and ready to tackle the day. I've set clear goals for the week ahead and feel confident about achieving them. My morning meditation session was particularly effective, helping me center my thoughts and prepare mentally for upcoming challenges. I should continue this practice daily.",
  },
  {
    id: "journal-2",
    title: "Project Ideas",
    date: "Apr 25, 2025",
    status: "read",
    content:
      "I've been brainstorming some new project concepts that could help streamline our workflow. The main idea involves creating a centralized dashboard that can track progress across multiple teams simultaneously. We could integrate data visualization tools to make patterns and bottlenecks more apparent. I should discuss this with the team during our next meeting.",
  },
  {
    id: "journal-3",
    title: "Weekly Goals",
    date: "Apr 22, 2025",
    status: "new",
    content:
      "This week I'm focusing on three main objectives: 1) Complete the backend API implementation by Wednesday, 2) Review the design specifications for the new user interface by Thursday, and 3) Prepare the presentation for stakeholders by Friday afternoon. If I manage my time effectively, these should all be achievable within the set timeframes.",
  },
  {
    id: "journal-4",
    title: "Meeting Notes",
    date: "Apr 20, 2025",
    status: "read",
    content:
      "Today's strategic planning meeting was productive. Key takeaways include: shifting our focus to mobile-first development for the next quarter, allocating additional resources to the customer support team, and exploring potential partnerships with complementary service providers. We need to follow up on the action items assigned during the meeting and ensure everyone is aligned with the new direction.",
  },
];

const data = {
  user: {
    name: "Username",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Record new",
      url: "/new-record", // Use dynamic URL
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics", // Use dynamic URL
      icon: BarChart,
    },
  ],
};

export function AppSidebar({ onJournalSelect, selectedJournal, ...props }) {
  const [selected, setSelected] = useState(selectedJournal || null);
  const router = useRouter(); // Initialize router for programmatic navigation

  const handleJournalClick = (journalId) => {
    router.push(`/journaling/${journalId}`); // Navigate to journal details page
    if (onJournalSelect) {
      onJournalSelect(journalId);
    }
  };

  const handleNavItemClick = (url) => {
    router.push(url); // Navigate to the clicked URL dynamically
  };

  return (
    <Sidebar className="bg-[#0c051c] text-white" {...props}>
      <SidebarHeader className="bg-[#0c051c]">
        <div className="p-4 border-b border-opacity-10 border-slate-300">
          <div className="flex items-center">
            <div className="flex-1">
              <a href="/" className="text-base font-semibold text-white">
                Echo Vault
              </a>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#0c051c]">
        <NavMain items={data.navMain} onItemSelect={handleNavItemClick} />

        <SidebarSection>
          <JournalHistory
            journals={journalHistory}
            onJournalClick={handleJournalClick}
          />
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter className="bg-[#0c051c]">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
