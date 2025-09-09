"use client";
import { Button } from "@/components/ui/button";

interface OnboardOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface OnboardSectionProps {
  title?: string;
  subtitle?: string;
  options?: OnboardOption[];
  onSkip?: () => void;
  skipText?: string;
}

export function OnboardSection({
  title = "¡Bienvenido!",
  subtitle = "Configura tu perfil para comenzar",
  options = [],
  onSkip,
  skipText = "Continuar sin configurar"
}: OnboardSectionProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Options */}
        {options.length > 0 && (
          <div className="space-y-3 mb-6">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {option.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Skip option */}
        {onSkip && (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              {skipText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
