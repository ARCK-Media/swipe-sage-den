import { useState, useRef, useEffect } from "react";
import { AdviceCard } from "./AdviceCard";
import { Button } from "@/components/ui/button";
import { Heart, X, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Advice {
  id: number;
  title: string;
  content: string;
  category: string;
  emoji: string;
}

interface SwipeContainerProps {
  adviceList: Advice[];
}

export const SwipeContainer = ({ adviceList }: SwipeContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<{ id: number; direction: 'left' | 'right' }[]>([]);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentAdvice = adviceList[currentIndex];
  const isComplete = currentIndex >= adviceList.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isComplete) return;

    const card = cardRef.current;
    if (card) {
      card.style.animation = direction === 'left' ? 'swipe-left 0.6s ease-out forwards' : 'swipe-right 0.6s ease-out forwards';
      
      setTimeout(() => {
        setSwipedCards(prev => [...prev, { id: currentAdvice.id, direction }]);
        setCurrentIndex(prev => prev + 1);
        setDragOffset({ x: 0, y: 0 });
        
        if (card) {
          card.style.animation = '';
        }

        // Show toast
        if (direction === 'right') {
          toast({
            title: "Saved! 💕",
            description: "Added to your favorites",
          });
        }
      }, 600);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || !isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    
    setDragStart(null);
    setIsDragging(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSwipedCards([]);
    setDragOffset({ x: 0, y: 0 });
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStart || !isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-foreground">All done!</h2>
          <p className="text-muted-foreground">
            You've gone through all {adviceList.length} dating tips.
            <br />
            Saved: {swipedCards.filter(c => c.direction === 'right').length} tips
          </p>
        </div>
        <Button onClick={handleReset} className="bg-primary hover:bg-primary/90">
          <RotateCcw size={16} className="mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Progress */}
      <div className="w-full max-w-sm space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{currentIndex + 1} of {adviceList.length}</span>
          <span>{swipedCards.filter(c => c.direction === 'right').length} saved</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / adviceList.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-sm h-96">
        {/* Next card (background) */}
        {adviceList[currentIndex + 1] && (
          <div className="absolute inset-0 transform scale-95 opacity-50">
            <AdviceCard advice={adviceList[currentIndex + 1]} />
          </div>
        )}
        
        {/* Current card */}
        <div
          ref={cardRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`,
            opacity: opacity,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AdviceCard advice={currentAdvice} />
        </div>

        {/* Swipe indicators */}
        {isDragging && (
          <>
            <div 
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-opacity ${
                dragOffset.x < -50 ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <X size={14} />
                <span>PASS</span>
              </div>
            </div>
            <div 
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-opacity ${
                dragOffset.x > 50 ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Heart size={14} />
                <span>SAVE</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full p-0 hover:bg-destructive/10 hover:border-destructive/50"
        >
          <X size={20} className="text-destructive" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full p-0 hover:bg-primary/10 hover:border-primary/50"
        >
          <Heart size={20} className="text-primary" />
        </Button>
      </div>
    </div>
  );
};