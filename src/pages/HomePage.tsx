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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Loan Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your comprehensive loan management platform
        </p>
        <Button size="lg">Get Started</Button>
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
