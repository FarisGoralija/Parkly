import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./navigation";
import { RegistrationProvider } from "./context/RegistrationContext";

// Create a query client instance
const queryClient = new QueryClient();

export default function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <RegistrationProvider>
      <Navigation />
      </RegistrationProvider>
    </QueryClientProvider>
  );
}
