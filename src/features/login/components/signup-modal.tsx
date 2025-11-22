import { useAuth } from "@/hooks";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui";
import SignupForm from "./signup-form";

export function SignupModal() {
  const { isSignupModalOpen, hideSignupModal, showLoginModal } = useAuth();

  const handleLoginClick = () => {
    hideSignupModal();
    showLoginModal();
  };

  return (
    <Dialog open={isSignupModalOpen} onOpenChange={hideSignupModal}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl text-center">
          Create an account
        </DialogTitle>
        <SignupForm />
        <div className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <button
            onClick={handleLoginClick}
            className="underline hover:text-primary"
          >
            Sign in
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
