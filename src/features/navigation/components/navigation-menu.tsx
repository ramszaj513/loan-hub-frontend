import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Logo } from "@/components/icons/logo";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks";



function NavigationMenuComponent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };



  const navItems = [
    { path: "/loans", label: "Loans" },
    ...(isAuthenticated ? [{ path: "/dashboard", label: "Dashboard" }] : []),
    { path: "/docs", label: "Docs" },
  ];

  return (
    <div className="flex items-center flex-1">
      {/* Logo - Left */}
      <Link to="/">
        <Logo />
      </Link>

      {/* Navigation Links - Centered */}
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className={`inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${
                      location.pathname === item.path
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Dark Mode Toggle - Right */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
      >
        {isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

export default NavigationMenuComponent;
