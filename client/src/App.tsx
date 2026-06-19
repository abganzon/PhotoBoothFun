import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { isAuthEnabled } from "@/lib/auth-config";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
const queryClient = new QueryClient();

const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  (import.meta.env as any).NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  (import.meta.env as any).CLERK_PUBLISHABLE_KEY ||
  (typeof window !== "undefined" ? (window as any).__VITE_CLERK_PUBLISHABLE_KEY : undefined) ||
  undefined;

function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="min-h-screen pt-16">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home">
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Route>
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function MissingClerkKeyNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">Missing Clerk Publishable Key</h1>
        <p className="mb-4 text-sm text-slate-600">
          The app couldn't find a Clerk publishable key in the environment. To fix this locally,
          add a `.env.local` file at the project root with:
        </p>
        <pre className="rounded bg-slate-100 p-3 text-sm overflow-auto">
          VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
        </pre>
        <p className="mt-4 text-sm text-slate-600">
          For Netlify, set the environment variable `VITE_CLERK_PUBLISHABLE_KEY` and the
          server-side `CLERK_SECRET_KEY` in your site settings, then redeploy. See
          <code>NETLIFY_DEPLOYMENT.md</code> for details.
        </p>
      </div>
    </div>
  );
}

function App() {
  if (isAuthEnabled) {
    if (!clerkPublishableKey) {
      console.error(
        "Missing Clerk publishable key. Set `VITE_CLERK_PUBLISHABLE_KEY` in .env or in Netlify environment variables."
      );
      return <MissingClerkKeyNotice />;
    }
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <AppRoutes />
      </ClerkProvider>
    );
  }

  return <AppRoutes />;
}

export default App;
