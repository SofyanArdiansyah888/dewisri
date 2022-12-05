import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false
    }
  }
});
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
