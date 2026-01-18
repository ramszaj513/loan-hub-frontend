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
      </div>
    </div>
  )
}

export default DocsPage