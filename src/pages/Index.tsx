import { SwipeContainer } from "@/components/SwipeContainer";
import { datingAdviceData } from "@/data/datingAdvice";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-warm">
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
      <main className="px-4 pb-8">
        <SwipeContainer adviceList={datingAdviceData} />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground">
        <p>Swipe right to save • Swipe left to pass</p>
      </footer>
    </div>
  );
};

export default Index;
