import { useState } from "react";
import { SwipeContainer } from "@/components/SwipeContainer";
import { ChatView } from "@/components/ChatView";
import { SettingsView } from "@/components/SettingsView";
import { BottomNavigation } from "@/components/BottomNavigation";
import { datingAdviceData } from "@/data/datingAdvice";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'settings'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Header */}
            <header className="text-center py-8 px-4">
              <div className="animate-float">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Love Guru 💕
                </h1>
                <p className="text-muted-foreground text-sm">
                  Swipe through dating wisdom • Save your favorites
                </p>
              </div>
            </header>

            {/* Main Content */}
            <main className="px-4 pb-24">
              <SwipeContainer adviceList={datingAdviceData} />
            </main>
          </>
        );
      case 'chat':
        return (
          <main className="px-4 py-8 pb-24">
            <ChatView />
          </main>
        );
      case 'settings':
        return (
          <main className="px-4 py-8 pb-24">
            <SettingsView />
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {renderContent()}
      
      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
