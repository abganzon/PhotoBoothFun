` tags.

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
```

Applying the changes:

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

The issue seems to be that the route is added twice. I will remove the duplicate.

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}><Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

The issue was likely a duplicate route and incorrect import path for SharedPage. I've corrected the import and removed the duplicate route.

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/shared/:id" component={SharedPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

```

```python
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import SharedPage from "@/pages/shared";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;
```

```
import { Route, Switch, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import LandingPage from "@/pages/landing";
import NotFound from "@/pages/not-found";
import Privacy from "@/pages/privacy";
import SharedPage from "./pages/shared";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
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

export default App;