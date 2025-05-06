import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./navigation";

// Create a query client instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
