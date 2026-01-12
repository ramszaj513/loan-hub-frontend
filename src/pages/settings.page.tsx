import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";

function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const {isAuthenticated} = useAuth();

  // Initialize theme state and listen for changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    };

    // Initial theme detection with a small delay to ensure App.tsx has run
    const timer = setTimeout(updateTheme, 100);

    // Also update immediately
    updateTheme();

    // Listen for class changes on the document element
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleThemeChange = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setCurrentTheme(theme);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your Loan Hub experience
        </p>
      </div>

      {/* Settings Container */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Choose how Loan Hub looks to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Color Theme</Label>
              <Select value={currentTheme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose between light and dark theme for better viewing experience
            </p>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        {isAuthenticated && (
          <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Notifications</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Loan application updates</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Payment reminders</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Marketing updates</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Security Settings */}
        {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
