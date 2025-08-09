interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success";
  className?: string;
}

export function GradientBackground({ 
  children, 
  variant = "primary", 
  className = "" 
}: GradientBackgroundProps) {
  const variants = {
    primary: "bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700",
    secondary: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700", 
    accent: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    success: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700"
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}