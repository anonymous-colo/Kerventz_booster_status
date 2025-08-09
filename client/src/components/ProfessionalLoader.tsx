export function ProfessionalLoader({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-10 h-10", 
    lg: "w-16 h-16"
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 dark:border-t-primary-400"></div>
        </div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 opacity-20"></div>
      </div>
    </div>
  );
}