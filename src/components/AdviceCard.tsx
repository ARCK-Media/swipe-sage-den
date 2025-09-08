import { Heart, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdviceCardProps {
  advice: {
    id: number;
    title: string;
    content: string;
    category: string;
    emoji: string;
  };
  onSwipe?: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
  className?: string;
}

export const AdviceCard = ({ advice, onSwipe, style, className = "" }: AdviceCardProps) => {
  return (
    <Card 
      className={`w-full max-w-sm mx-auto bg-gradient-card shadow-card border-0 p-6 select-none ${className}`}
      style={style}
    >
      <div className="flex flex-col h-full space-y-4">
        {/* Category & Emoji Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {advice.category}
          </span>
          <span className="text-2xl">{advice.emoji}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {advice.title}
        </h3>

        {/* Content */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {advice.content}
        </p>

        {/* Action Hints */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-2 text-xs text-destructive">
            <X size={14} />
            <span>Pass</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-primary">
            <Heart size={14} />
            <span>Save</span>
          </div>
        </div>
      </div>
    </Card>
  );
};