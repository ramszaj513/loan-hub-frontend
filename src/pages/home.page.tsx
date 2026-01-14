import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlurText } from "@/components/ui/animated";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  TrendingDown,
  Shield,
  Headphones,
  FileText,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Hero Content - Centered */}
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center">
              <BlurText
                text="Smart Loans for"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl lg:text-6xl font-bold leading-tight"
              />
              <BlurText
                text="Big Dreams"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl lg:text-6xl font-bold leading-tight text-primary ml-4"
              />
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Search and compare loan options that match your needs with
              competitive rates and fast approvals. No hidden fees, ever.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/loans">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit impact
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                24h Approval
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Financial Hub Section */}
      <section className="px-8 py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Your Financial Hub</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Quick Apply - Dark Card */}
            <Card className="dark-gradient-card border-0 overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs text-white/70 mb-4">
                  Active
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Quick Apply</h3>
                <p className="text-white/70 text-sm mb-6">
                  Start a new loan application in minutes. Our AI-driven process
                  gets you approved faster than ever.
                </p>
                <Button
                  variant="link"
                  className="text-primary p-0 hover:no-underline"
                  asChild
                >
                  <Link to="/loans">
                    Start Application <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Manage Loans */}
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg icon-bg-blue flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Manage Loans</h3>
                <p className="text-muted-foreground text-sm">
                  Track all applications in one place
                </p>
              </CardContent>
            </Card>

            {/* Dashboard */}
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg icon-bg-purple flex items-center justify-center mb-4">
                  <LayoutDashboard className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                <p className="text-muted-foreground text-sm">
                  View analytics and insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                iconClass: "icon-bg-coral",
                title: "Fast Processing",
                desc: "Decisions in as little as 24 hours",
              },
              {
                icon: TrendingDown,
                iconClass: "icon-bg-blue",
                title: "Competitive Rates",
                desc: "Access the best rates in the market",
              },
              {
                icon: Shield,
                iconClass: "icon-bg-yellow",
                title: "Secure Platform",
                desc: "Bank-level security for your data",
              },
              {
                icon: Headphones,
                iconClass: "icon-bg-green",
                title: "24/7 Support",
                desc: "Round-the-clock customer support",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.iconClass} flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
