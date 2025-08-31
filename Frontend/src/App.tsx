import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ add Navigate
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Workshops from "./pages/Workshops";
import Registration from "./pages/Registration";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/register/:type/:title" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
