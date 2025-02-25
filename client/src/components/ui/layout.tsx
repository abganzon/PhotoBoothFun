
import { cn } from "@/lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        className
      )}
      {...props}
    >
      <main className="container relative py-6 space-y-4">{children}</main>
    </div>
  );
}
