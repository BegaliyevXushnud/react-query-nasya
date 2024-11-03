
import { createRoot } from "react-dom/client";
import Root from './router/index'
import { QueryClientProvider,  QueryClient } from "@tanstack/react-query";
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Root />
  </QueryClientProvider>
)