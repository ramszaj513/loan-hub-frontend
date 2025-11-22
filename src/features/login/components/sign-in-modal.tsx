import { useAuth } from "@/hooks";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui";
import SignInForm from "./sign-in-form";

export function SignInModal() {
  const { isLoginModalOpen, hideLoginModal, showSignupModal } = useAuth();

  const handleSignupClick = () => {
    hideLoginModal();
    showSignupModal();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={hideLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl text-center">Sign in</DialogTitle>
        <SignInForm />
        <div className="text-center text-xs text-muted-foreground mt-4">
          New to LoanHub?{" "}
          <button
            onClick={handleSignupClick}
            className="underline hover:text-primary"
          >
            Sign up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
