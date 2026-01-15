import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { getUserApplications, BankOfferStatus, type ApplicationStatus } from "@/features/loans/api/loans-api";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  Loader2,
  Inbox
} from "lucide-react";

function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    pending: applications.filter(a => a.status === BankOfferStatus.Pending).length,
    approved: applications.filter(a => a.status === BankOfferStatus.Approved).length,
    rejected: applications.filter(a => a.status === BankOfferStatus.Rejected).length,
  };

  const getStatusConfig = (status: BankOfferStatus) => {
    switch (status) {
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
                <div className="space-y-3">
                  {applications.map((app, index) => {
                    const config = getStatusConfig(app.status);
                    const StatusIcon = config.icon;
                    
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-3 h-3 rounded-full ${config.dotClass} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgClass} ${config.textClass}`}>
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </span>
                          </div>
                          {app.description && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">
                              {app.description}
                            </p>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground flex-shrink-0">
                          {formatDate(app.lastUpdated)}
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
    </div>
  );
}

export default DashboardPage;