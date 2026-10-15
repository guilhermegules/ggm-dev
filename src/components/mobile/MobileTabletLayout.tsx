import React, { useState, useEffect } from "react";
import type { BlogPostData } from "../desktop/types";
import MobileHeader from "./MobileHeader";
import MobileBottomBar, { type MobileTab } from "./MobileBottomBar";
import MobileAboutView from "./views/MobileAboutView";
import MobileBlogView from "./views/MobileBlogView";
import MobileLinksView from "./views/MobileLinksView";
import MobileSettingsView from "./views/MobileSettingsView";

interface MobileTabletLayoutProps {
  posts: BlogPostData[];
  initialTab?: MobileTab;
}

const TAB_TITLES: Record<MobileTab, string> = {
  about: "Sobre Mim",
  blog: "Artigos & Blog",
  links: "Projetos & Links",
  settings: "Ajustes do Sistema",
};

export default function MobileTabletLayout({
  posts,
  initialTab = "about",
}: MobileTabletLayoutProps) {
  const [activeTab, setActiveTab] = useState<MobileTab>(initialTab);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as MobileTab | null;
      if (tabParam && ["about", "blog", "links", "settings"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleTabChange = (tab: MobileTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "about") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] flex flex-col font-sans transition-colors">
      <MobileHeader currentTabName={TAB_TITLES[activeTab]} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        {activeTab === "about" && (
          <MobileAboutView posts={posts} onGoToBlog={() => handleTabChange("blog")} />
        )}
        {activeTab === "blog" && <MobileBlogView posts={posts} />}
        {activeTab === "links" && <MobileLinksView />}
        {activeTab === "settings" && <MobileSettingsView />}
      </main>

      <MobileBottomBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        blogCount={posts.length}
      />
    </div>
  );
}
