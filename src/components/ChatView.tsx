import { MessageCircle, Heart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const ChatView = () => {
  const { toast } = useToast();
  
  const handleChatClick = (chatName: string) => {
    toast({
      title: `Opening chat with ${chatName}`,
      description: "Chat feature coming soon!",
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: action,
      description: "This feature will be available soon!",
    });
  };

  const mockChats = [
    {
      id: 1,
      name: "Dating Coach Sarah",
      lastMessage: "Remember to ask open-ended questions!",
      time: "2m ago",
      unread: 2,
      avatar: "💕"
    },
    {
      id: 2,
      name: "Love Support Group",
      lastMessage: "New discussion about first dates",
      time: "1h ago",
      unread: 0,
      avatar: "👥"
    },
    {
      id: 3,
      name: "Weekly Dating Tips",
      lastMessage: "This week's tip: Be yourself!",
      time: "1d ago",
      unread: 1,
      avatar: "✨"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-4xl">💬</div>
        <h2 className="text-2xl font-bold text-foreground">Chat & Support</h2>
        <p className="text-muted-foreground text-sm">
          Connect with coaches and community
        </p>
      </div>

      {/* Chat List */}
      <div className="space-y-3">
        {mockChats.map((chat) => (
          <Card 
            key={chat.id} 
            className="p-4 bg-gradient-card border-border/50 hover:bg-gradient-purple/20 transition-all duration-200 cursor-pointer"
            onClick={() => handleChatClick(chat.name)}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{chat.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-card-foreground truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {chat.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {chat.unread}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        
        <Card 
          className="p-4 bg-gradient-pink/20 border-primary/30 hover:bg-gradient-pink/30 transition-all duration-200 cursor-pointer"
          onClick={() => handleQuickAction("Ask a Dating Coach")}
        >
          <div className="flex items-center space-x-3">
            <Heart className="text-primary" size={24} />
            <div>
              <h4 className="font-medium text-card-foreground">Ask a Dating Coach</h4>
              <p className="text-sm text-muted-foreground">Get personalized advice</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-purple/20 border-accent/30 hover:bg-gradient-purple/30 transition-all duration-200 cursor-pointer"
          onClick={() => handleQuickAction("Join Community")}
        >
          <div className="flex items-center space-x-3">
            <Users className="text-accent" size={24} />
            <div>
              <h4 className="font-medium text-card-foreground">Join Community</h4>
              <p className="text-sm text-muted-foreground">Share experiences with others</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};