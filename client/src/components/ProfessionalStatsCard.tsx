import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "./AnimatedCounter";
import { GradientBackground } from "./GradientBackground";
import { type LucideIcon } from "lucide-react";

interface ProfessionalStatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  variant: "primary" | "secondary" | "accent" | "success";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function ProfessionalStatsCard({
  title,
  value,
  icon: Icon,
  description,
  variant,
  trend
}: ProfessionalStatsCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl">
      <GradientBackground variant={variant} className="absolute inset-0" />
      <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-white/80" />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-white">
          <AnimatedCounter value={value} />
        </div>
        <p className="text-xs text-white/70 mt-1">
          {description}
        </p>
        {trend && (
          <div className={`text-xs mt-2 flex items-center ${
            trend.isPositive ? 'text-green-100' : 'text-red-100'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}% depuis hier
          </div>
        )}
      </CardContent>
    </Card>
  );
}