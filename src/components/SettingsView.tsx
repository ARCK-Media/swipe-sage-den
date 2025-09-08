import { User, Bell, Shield, Heart, HelpCircle, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const SettingsView = () => {
  const settingSections = [
    {
      title: "Profile",
      items: [
        { icon: User, label: "Edit Profile", action: "navigate" },
        { icon: Heart, label: "Saved Advice", action: "navigate", badge: "12" },
      ]
    },
    {
      title: "Preferences", 
      items: [
        { icon: Bell, label: "Push Notifications", action: "toggle", enabled: true },
        { icon: Shield, label: "Privacy Settings", action: "navigate" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & FAQ", action: "navigate" },
        { icon: LogOut, label: "Sign Out", action: "button", variant: "destructive" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-4xl">⚙️</div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Customize your Love Guru experience
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-pink rounded-full flex items-center justify-center text-2xl">
            😊
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground">Welcome back!</h3>
            <p className="text-muted-foreground text-sm">Love seeker since January 2024</p>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
          
          <div className="space-y-2">
            {section.items.map((item) => {
              const Icon = item.icon;
              
              return (
                <Card key={item.label} className="p-4 bg-gradient-card border-border/50 hover:bg-muted/20 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        size={20} 
                        className={item.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'} 
                      />
                      <span className={`font-medium ${item.variant === 'destructive' ? 'text-destructive' : 'text-card-foreground'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    {item.action === 'toggle' && (
                      <Switch defaultChecked={item.enabled} />
                    )}
                    
                    {item.action === 'navigate' && (
                      <div className="text-muted-foreground">›</div>
                    )}
                    
                    {item.action === 'button' && item.variant === 'destructive' && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        Sign Out
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* App Info */}
      <div className="text-center pt-6 space-y-2">
        <p className="text-xs text-muted-foreground">Love Guru v1.0</p>
        <p className="text-xs text-muted-foreground">Made with 💕 for better connections</p>
      </div>
    </div>
  );
};