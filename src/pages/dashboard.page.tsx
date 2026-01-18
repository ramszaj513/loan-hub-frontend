import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks";
import { getUserApplications, type LoanApplicationResponse } from "@/features/loans/api/loans-api";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Loader2,
  Inbox,
  CalendarDays,
  Wallet
} from "lucide-react";

const BankOfferStatus = {
    Pending: 0,
    Approved: 1,
    Rejected: 2,
    RequiresMoreInfo: 3
} as const;

function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<LoanApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<LoanApplicationResponse | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getUserApplications();
        setApplications(data);
      } catch (err: any) {
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.statusId === BankOfferStatus.Pending).length,
    approved: applications.filter(a => a.statusId === BankOfferStatus.Approved).length,
    rejected: applications.filter(a => a.statusId === BankOfferStatus.Rejected).length,
  };

  const getStatusConfig = (statusId: number) => {
    switch (statusId) {
      case BankOfferStatus.Approved:
        return { 
          label: "Approved", 
          icon: CheckCircle2, 
          bgClass: "bg-emerald-500/10 dark:bg-emerald-400/10",
          textClass: "text-emerald-600 dark:text-emerald-400",
          dotClass: "bg-emerald-500"
        };
      case BankOfferStatus.Rejected:
        return { 
          label: "Rejected", 
          icon: XCircle, 
          bgClass: "bg-red-500/10 dark:bg-red-400/10",
          textClass: "text-red-600 dark:text-red-400",
          dotClass: "bg-red-500"
        };
      case BankOfferStatus.RequiresMoreInfo:
        return { 
          label: "More Info Required", 
          icon: AlertCircle, 
          bgClass: "bg-amber-500/10 dark:bg-amber-400/10",
          textClass: "text-amber-600 dark:text-amber-400",
          dotClass: "bg-amber-500"
        };
      default:
        return { 
          label: "Pending", 
          icon: Clock, 
          bgClass: "bg-blue-500/10 dark:bg-blue-400/10",
          textClass: "text-blue-600 dark:text-blue-400",
          dotClass: "bg-blue-500"
        };
    }
  };



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="px-8 py-12 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back{user?.userData?.firstName ? `, ${user.userData.firstName}` : ""}
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your loan applications and manage your finances
              </p>
            </div>
            <Button asChild>
              <Link to="/loans">
                New Application <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl icon-bg-yellow flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">{loading ? "–" : stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl icon-bg-blue flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold">{loading ? "–" : stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl icon-bg-green flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Approved</p>
                    <p className="text-xl font-bold">{loading ? "–" : stats.approved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl icon-bg-coral flex items-center justify-center flex-shrink-0">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                    <p className="text-xl font-bold">{loading ? "–" : stats.rejected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Your Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                  <p className="text-destructive font-medium">Failed to load applications</p>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Inbox className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium">No applications yet</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Start by searching for loan offers
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/loans">Browse Loans</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app, index) => {
                    const config = getStatusConfig(app.statusId);
                    const StatusIcon = config.icon;
                    const bankName = app.bankName || "Unknown Bank";
                    
                    return (
                      <div 
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border"
                      >
                         <div className="flex items-center gap-4">
                            {/* Status Icon on Left */}
                            <div className={`p-2 rounded-full ${config.bgClass} ${config.textClass} flex-shrink-0`}>
                                <StatusIcon className="h-5 w-5" />
                            </div>
                            
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                                {/* Bank & Amount Group */}
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        {bankName}
                                    </div>
                                    <div className="text-lg font-bold">
                                        {app.requestedAmount.amount.toLocaleString()} {app.requestedAmount.currencyCode}
                                    </div>
                                </div>
                                
                                {/* Term & Rate Group - Moved Closer to Left */}
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>{app.requestedPeriodInMonth} Months</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4" />
                                        <span>
                                            {app.monthlyInstallment.amount.toLocaleString()} {app.monthlyInstallment.currencyCode} / mo
                                        </span>
                                    </div>
                                </div>
                            </div>
                         </div>

                         <div className="flex items-center justify-between sm:justify-end gap-6 w-full md:w-auto">
                             {/* Updated Time - Moved to Right */}
                             <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                                <Clock className="h-4 w-4" />
                                <span>Updated {formatDate(app.updateDate)}</span>
                            </div>

                             <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSelectedApp(app)}
                                className="shrink-0"
                             >
                                View Details
                             </Button>
                         </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Details Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <DialogContent className="max-w-lg">
            <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                    Full details for your loan application.
                </DialogDescription>
            </DialogHeader>
            
            {selectedApp && (
                <div className="space-y-6 pt-4">
                     {/* Key Figures */}
                    <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-lg bg-muted/40 space-y-1">
                             <div className="text-xs text-muted-foreground uppercase tracking-wider">Amount</div>
                             <div className="text-2xl font-bold flex items-baseline gap-1">
                                {selectedApp.requestedAmount.amount.toLocaleString()}
                                <span className="text-sm font-normal text-muted-foreground">{selectedApp.requestedAmount.currencyCode}</span>
                             </div>
                         </div>
                         <div className="p-4 rounded-lg bg-muted/40 space-y-1">
                             <div className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Pmt</div>
                             <div className="text-2xl font-bold flex items-baseline gap-1">
                                {selectedApp.monthlyInstallment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                <span className="text-sm font-normal text-muted-foreground">{selectedApp.monthlyInstallment.currencyCode}</span>
                             </div>
                         </div>
                    </div>

                    {/* Secondary Figures */}
                    <div className="grid grid-cols-3 gap-4">
                         <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                             <div className="text-xs text-muted-foreground uppercase tracking-wider">Term</div>
                             <div className="font-semibold">{selectedApp.requestedPeriodInMonth} mo</div>
                         </div>
                         <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                             <div className="text-xs text-muted-foreground uppercase tracking-wider">Rate</div>
                             <div className="font-semibold">{selectedApp.percentage}%</div>
                         </div>
                         <div className="p-3 rounded-lg bg-muted/40 space-y-1">
                             <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
                             <div className={`font-semibold ${getStatusConfig(selectedApp.statusId).textClass}`}>
                                {getStatusConfig(selectedApp.statusId).label}
                             </div>
                         </div>
                    </div>

                    {/* Dates Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                        <div>Created {new Date(selectedApp.createDate).toLocaleDateString()}</div>
                        <div>Updated {new Date(selectedApp.updateDate).toLocaleString()}</div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">


                        
                        {selectedApp.approvedBy && (
                            <div className="pt-2 border-t">
                                <span className="text-muted-foreground block text-xs mb-1">Approved By</span>
                                <p className="text-sm font-medium">{selectedApp.approvedBy}</p>
                            </div>
                        )}
                        
                         {selectedApp.documentLink && (
                            <div className="pt-4">
                                <Button className="w-full" asChild>
                                    <a href={selectedApp.documentLink} target="_blank" rel="noopener noreferrer">
                                        <FileText className="mr-2 h-4 w-4" /> View Loan Document
                                    </a>
                                </Button>
                                {selectedApp.documentLinkValidDate && (
                                     <p className="text-xs text-center text-muted-foreground mt-2">
                                        Link valid until {new Date(selectedApp.documentLinkValidDate).toLocaleDateString()}
                                     </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashboardPage;