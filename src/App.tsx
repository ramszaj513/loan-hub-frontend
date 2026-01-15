import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/home.page";
import DashboardPage from "./pages/dashboard.page";
import LoansPage from "./pages/loans.page";
import LoanApplicationPage from "./pages/loan-application.page";
import DocsPage from "./pages/docs.page";
import SettingsPage from "./pages/settings.page";
import ProfilePage from "./pages/profile.page";
import NavigationMenuComponent from "./features/navigation/components/navigation-menu";
import ProfileMenu from "./features/navigation/components/profile-menu";
import { SignInModal } from "./features/login/components/sign-in-modal";
import { SignupModal } from "./features/login/components/signup-modal";
import { Logo } from "./components/icons/logo";
import { Link } from "react-router-dom";

import { ScrollToTop } from "./components/scroll-to-top";

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
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="flex items-center h-16 px-8 gap-4">
          <NavigationMenuComponent />
          <ProfileMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/loans/apply" element={<LoanApplicationPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Smart loan solutions for your financial dreams.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/loans" className="hover:text-foreground transition-colors">Find Loans</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LoanHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <SignInModal />
      <SignupModal />
    </div>
  );
}

export default App;
