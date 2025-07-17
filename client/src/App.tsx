import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Privacy from "@/components/Privacy"; // Added import for Privacy component
import SharedPage from "@/pages/shared"; // Added import for SharedPage component

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/booth" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/shared/:id" component={SharedPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}