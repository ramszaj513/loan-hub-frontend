import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/home.page";
import DashboardPage from "./pages/dashboard.page";
import LoansPage from "./pages/loans.page";
import DocsPage from "./pages/docs.page";
import SettingsPage from "./pages/settings.page";
import ProfilePage from "./pages/profile.page";
import NavigationMenuComponent from "./features/navigation/components/navigation-menu";
import ProfileMenu from "./features/navigation/components/profile-menu";
import { SignInModal } from "./features/login/components/sign-in-modal";
import { SignupModal } from "./features/login/components/signup-modal";

function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 w-full flex items-center py-1 border-b min-h-[60px] px-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Left spacer */}
        <div className="w-16"></div>

        {/* Center - Navigation Menu */}
        <NavigationMenuComponent />

        {/* Right side - Profile Menu */}
        <ProfileMenu />
      </div>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Auth Modals */}
      <SignInModal />
      <SignupModal />
    </div>
  );
}

export default App;
