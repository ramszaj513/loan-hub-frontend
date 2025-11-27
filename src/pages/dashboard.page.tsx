import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8">
      
      {/* Content Container */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Stats Stacked Vertically (Still in Cards) */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1 text-orange-600">3</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting review
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1 text-green-600">9</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last week
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* RIGHT COLUMN: Recent Activity (No Card Wrapper) */}
          <div className="md:col-span-1 pl-0 md:pl-4">
            {/* Header Text */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">
                Your latest loan application updates
              </p>
            </div>

            {/* List Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/100 transition-colors hover:bg-muted">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">Loan Application #001 Approved</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/100 transition-colors hover:bg-muted">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">New loan application submitted</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/100 transition-colors hover:bg-muted">
                <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">Document verification pending</p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage