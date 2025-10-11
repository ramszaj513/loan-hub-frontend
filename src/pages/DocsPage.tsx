import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground">Quick guides to get you started with Loan Hub</p>
      </div>
      
      {/* Content Container */}
      <div className="w-full max-w-4xl">
        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Apply for a Loan</CardTitle>
              <CardDescription>
                Get started in 3 simple steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3">1</span>
                  Choose your loan type
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3">2</span>
                  Fill application form
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3">3</span>
                  Submit and track status
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Dashboard Overview</CardTitle>
              <CardDescription>
                Monitor your loan portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Loans</span>
                  <span className="text-muted-foreground">Track all applications</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Status</span>
                  <span className="text-muted-foreground">Review progress</span>
                </div>
                <div className="flex justify-between">
                  <span>Recent Activity</span>
                  <span className="text-muted-foreground">Latest updates</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Loan Types  */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Available Loan Types</CardTitle>
              <CardDescription>
                Choose the right loan for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Personal Loans
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Quick funding for personal expenses
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • 5.5% APR • $1K-$50K • 24hr approval
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Auto Loans
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Financing for new and used vehicles
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • 4.2% APR • $5K-$100K • Same day
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Home Loans
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Mortgages and refinancing options
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • 3.8% APR • $50K-$1M • 7-14 days
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Business Loans
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Capital for business growth
                  </p>
                  <div className="text-xs text-muted-foreground">
                    • 6.0% APR • $10K-$500K • 3-5 days
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DocsPage