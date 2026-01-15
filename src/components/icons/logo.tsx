import { CreditCard } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <CreditCard className="w-5 h-5 text-primary-foreground" />
      </div>
      {showText && (
        <span className="font-bold text-xl text-foreground">
          Loan<span className="text-primary">Hub</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
