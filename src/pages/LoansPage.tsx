import { Button, Badge, Input, Label, BlurText, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import Aurora from "@/components/ui/animated/aurora-background"
// import RippleGrid from "@/components/ui/animated/ripple-grid-background"
// import LightRays from "@/components/ui/animated/light-rays-background"

function LoansPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="bg-background relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background" style={{ backgroundColor: 'hsl(var(--background))' }}>
          {/* <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            backgroundColor="hsl(var(--background))"
            raysSpeed={0.5}
            lightSpread={2}
            rayLength={0.62}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.4}
            distortion={0.01}
            fadeDistance={1}
            className="custom-rays"
          /> */}
          <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        </div>
        
        <div className="relative z-10 text-center px-8">
          <BlurText
            text="Find Your Perfect Loan"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-center justify-center"
          />
          <p className="text-xl max-w-2xl mx-auto">
            Search and compare loan options that match your needs with competitive rates and fast approvals
          </p>
        </div>
      </div>

      {/* Overlapping Search Form */}
      <div className="relative -mt-32 px-8 z-20">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 shadow-2xl border-2">
            <CardHeader>
              <CardTitle>Loan Search</CardTitle>
              <CardDescription>
                Enter your criteria to find the best loan options
              </CardDescription>
            </CardHeader>
            <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="$10,000"
                  min="1000"
                  step="1000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Loan Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Loan Term</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                    <SelectItem value="120">10 years</SelectItem>
                    <SelectItem value="360">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credit">Credit Score</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (750+)</SelectItem>
                    <SelectItem value="good">Good (700-749)</SelectItem>
                    <SelectItem value="fair">Fair (650-699)</SelectItem>
                    <SelectItem value="poor">Poor (600-649)</SelectItem>
                    <SelectItem value="bad">Bad (Below 600)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 lg:col-span-4">
                <Button type="submit" className="w-full md:w-auto">
                  Search Loans
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 py-12 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Available Loans */}
          <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Available Loan Options</h2>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Personal Loan</CardTitle>
                  <CardDescription>Quick approval • No collateral required</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Best Rate
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-semibold">5.5% APR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount Range</p>
                  <p className="text-lg font-semibold">$1K - $50K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="text-lg font-semibold">12-60 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-lg font-semibold">24 hours</p>
                </div>
              </div>
              <Button className="w-full md:w-auto">Apply Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Auto Loan</CardTitle>
                  <CardDescription>New & used vehicles • Competitive rates</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Popular
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-semibold">4.2% APR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount Range</p>
                  <p className="text-lg font-semibold">$5K - $100K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="text-lg font-semibold">24-84 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-lg font-semibold">Same day</p>
                </div>
              </div>
              <Button className="w-full md:w-auto">Apply Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Home Loan</CardTitle>
                  <CardDescription>Purchase or refinance • Low rates</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
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
          </div>
        </div>
      </div>
    </div>
  )
}export default LoansPage