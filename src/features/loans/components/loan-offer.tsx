import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

function LoanOffer() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Home Loan</CardTitle>
            <CardDescription>Purchase or refinance • Low rates</CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-800 hover:bg-purple-100"
          >
            Low Rate
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Interest Rate</p>
            <p className="text-lg font-semibold">3.8% APR</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount Range</p>
            <p className="text-lg font-semibold">$50K - $1M</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Term</p>
            <p className="text-lg font-semibold">15-30 years</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processing</p>
            <p className="text-lg font-semibold">7-14 days</p>
          </div>
        </div>
        <Button className="w-full md:w-auto">Apply Now</Button>
      </CardContent>
    </Card>
  );
}

export default LoanOffer;
