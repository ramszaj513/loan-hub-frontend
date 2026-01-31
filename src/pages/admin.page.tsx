import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getAllOffers, 
  updateOfferStatus, 
  OfferStatus,
  type LoanOffer 
} from "@/features/admin/api/admin-api";
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock,
  LogOut,
  Building2
} from "lucide-react";
import { toast } from "sonner";

function AdminPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<LoanOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOffers();
      setOffers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (offerId: number, status: OfferStatus) => {
    setProcessingIds(prev => new Set(prev).add(offerId));
    try {
      await updateOfferStatus(offerId, status);
      toast.success(
        status === OfferStatus.Accepted 
          ? "Offer approved successfully" 
          : "Offer rejected successfully"
      );

      await fetchOffers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update offer status");
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(offerId);
        return next;
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/");
  };

  const getStatusConfig = (statusId: number) => {
    switch (statusId) {
      case OfferStatus.Accepted:
        return { 
          label: "Approved", 
          icon: CheckCircle2, 
          className: "text-emerald-400 bg-emerald-400/10"
        };
      case OfferStatus.Rejected:
        return { 
          label: "Rejected", 
          icon: XCircle, 
          className: "text-red-400 bg-red-400/10"
        };
      case OfferStatus.Pending:
        return { 
          label: "Pending", 
          icon: Clock, 
          className: "text-amber-400 bg-amber-400/10"
        };
      default:
        return { 
          label: "Created", 
          icon: Clock, 
          className: "text-blue-400 bg-blue-400/10"
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedOffers = [...offers].sort((a, b) => {
    const aIsCreated = a.statusId === OfferStatus.Created;
    const bIsCreated = b.statusId === OfferStatus.Created;
    
    if (aIsCreated && !bIsCreated) return -1;
    if (!aIsCreated && bIsCreated) return 1;
    
    return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">In House Bank Administration</h1>
              <p className="text-sm text-slate-400">Loan Application Management</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-slate-600 hover:bg-slate-700 text-slate-300"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="text-lg text-slate-100 flex items-center justify-between">
              <span>Loan Applications</span>
              <span className="text-sm font-normal text-slate-400">
                {!loading && `${offers.length} applications`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                <p className="text-red-400 font-medium">Failed to load applications</p>
                <p className="text-sm text-slate-500 mt-1">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-slate-600 hover:bg-slate-700"
                  onClick={fetchOffers}
                >
                  Retry
                </Button>
              </div>
            ) : offers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-slate-400">No loan applications found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700 text-left">
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Applicant</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Monthly</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Term</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Rate</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Created</th>
                      <th className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOffers.map((offer) => {
                      const statusConfig = getStatusConfig(offer.statusId);
                      const StatusIcon = statusConfig.icon;
                      const isProcessing = processingIds.has(offer.id);
                      const canChangeStatus = offer.statusId === OfferStatus.Created || offer.statusId === OfferStatus.Pending;

                      return (
                        <tr 
                          key={offer.id} 
                          className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="px-4 py-4 text-sm font-mono text-slate-300">#{offer.id}</td>
                          <td className="px-4 py-4 text-sm text-slate-100 font-medium">
                            {offer.personalData 
                              ? `${offer.personalData.firstName} ${offer.personalData.lastName}` 
                              : "—"}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-semibold text-slate-100">
                              {offer.requestedAmount.amount.toLocaleString()} {offer.requestedAmount.currencyCode}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-300">
                            {offer.monthlyInstallment.amount.toLocaleString()} {offer.monthlyInstallment.currencyCode}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-300">
                            {offer.requestedPeriodInMonth} mo
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-300">
                            {offer.percentage}%
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-400">
                            {formatDate(offer.createDate)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {canChangeStatus ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    disabled={isProcessing}
                                    onClick={() => handleStatusUpdate(offer.id, OfferStatus.Accepted)}
                                  >
                                    {isProcessing ? (
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                      <>
                                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                        Approve
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                                    disabled={isProcessing}
                                    onClick={() => handleStatusUpdate(offer.id, OfferStatus.Rejected)}
                                  >
                                    {isProcessing ? (
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                      <>
                                        <XCircle className="h-3.5 w-3.5 mr-1" />
                                        Reject
                                      </>
                                    )}
                                  </Button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500 italic">
                                  {offer.statusId === OfferStatus.Accepted ? "Approved" : "Rejected"}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default AdminPage;
