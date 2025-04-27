"use client";
import React, { useState, useEffect } from "react";
import { GraphCard } from "../../_components/PieCard";
import { BarCard } from "../../_components/BarCard";
import { LineCard } from "../../_components/LineCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

// Journal history data - this should match the data in your sidebar
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

export default function JournalAnalysisPage({ params }) {
  const router = useRouter();
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [expandedJournal, setExpandedJournal] = useState(true);

  // Find the journal entry based on the ID from URL parameters
  useEffect(() => {
    let journal;
    if (params?.journalId) {
      journal = journalHistory.find((j) => j.id === params.journalId);
    }

    if (!journal) {
      // Default to Journal 1 if no journal is found
      journal = journalHistory.find((j) => j.id === "journal-1");
    }

    setSelectedJournal(journal);
    // Mark the journal as read if it was new
    if (journal?.status === "new") {
      journal.status = "read";
    }
  }, [params?.journalId]);

  const toggleJournalExpand = () => {
    setExpandedJournal(!expandedJournal);
  };

  if (!selectedJournal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c051c]">
        <p className="text-xl text-white">Journal not found</p>
      </div>
    );
  }

  return (
    <SidebarProvider className="bg-[#0D0A1C]">
      <AppSidebar
        variant="inset"
        className="bg-[#0c051c]"
        currentJournalId={params.journalId}
      />
      <SidebarInset className="bg-[#0c051c] dark">
        <SiteHeader />
        <div className="min-h-screen">
          <p className="text-5xl md:text-7xl font-bold mb-8 text-center text-white pt-8 md:pt-11">
            Journal and Analysis
          </p>

          {/* Journal Section */}
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Card className="dark border-2 border-[#3a158e] shadow-lg">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
                    <div className="flex items-center">
                      <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">
                        {selectedJournal.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-slate-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{selectedJournal.date}</span>
                      </div>
                      <button
                        onClick={toggleJournalExpand}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        {expandedJournal ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedJournal && (
                    <p className="text-lg text-[#d1d5db] leading-relaxed">
                      {selectedJournal.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Analysis Section with Graphs */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Sentiment Analysis
              </h2>
              <Card className="dark border-2 border-[#3a158e] mb-8">
                <CardContent className="py-6">
                  <p className="text-[#d1d5db] mb-4">
                    The following visualizations represent an analysis of your
                    journal entries over time, tracking sentiment, topics, and
                    productivity patterns to help identify trends in your
                    thoughts and activities.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="h-[400px] md:h-[500px]">
                  <Card className="dark border-2 border-[#3a158e] h-full flex flex-col">
                    <CardContent className="flex-1 flex flex-col py-4">
                      <h3 className="font-semibold text-purple-300 mb-2 text-center">
                        Emotion Distribution
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <GraphCard />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[400px] md:h-[500px]">
                  <Card className="dark border-2 border-[#3a158e] h-full flex flex-col">
                    <CardContent className="flex-1 flex flex-col py-4">
                      <h3 className="font-semibold text-purple-300 mb-2 text-center">
                        Topic Frequency
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <BarCard />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[400px] md:h-[500px]">
                  <Card className="dark border-2 border-[#3a158e] h-full flex flex-col">
                    <CardContent className="flex-1 flex flex-col py-4">
                      <h3 className="font-semibold text-purple-300 mb-2 text-center">
                        Mood Over Time
                      </h3>
                      <div className="flex-1 flex items-center justify-center">
                        <LineCard />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Additional Insights */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
