

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>

      {showText && (
        <span className="font-bold text-xl text-foreground">
          Loan<span className="text-primary">Hub</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
