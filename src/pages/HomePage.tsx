import { BlurText } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function HomePage() {
  return (
    <div className="container mx-auto px-10 py-8">
      <div className="text-center mb-12">
        <div className="relative z-10 text-center px-8">
          <BlurText
            text="Welcome to Loan Hub"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-center justify-center"
          />
          <p className="text-xl max-w-2xl mx-auto">
            Search and compare loan options that match your needs with
            competitive rates and fast approvals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Loans</CardTitle>
            <CardDescription>
              Track and manage all your loan applications in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Loans
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              View analytics and insights about your loan portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Open Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Apply</CardTitle>
            <CardDescription>
              Start a new loan application in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Apply Now</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Loan Hub?</CardTitle>
            <CardDescription>
              Experience the best loan management platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Fast Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Get loan decisions in as little as 24 hours
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Competitive Rates</h4>
                <p className="text-sm text-muted-foreground">
                  Access to the best interest rates in the market
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secure Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Bank-level security for all your financial data
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer support when you need it
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
