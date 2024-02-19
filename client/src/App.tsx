import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1 * 1000,
      gcTime: 1 * 60 * 60 * 1000,
    },
    mutations: {
      onSuccess: function () {
        invalidateQuery("GetMovies");
      },
    },
  },
});

const invalidateQuery = (key: string) => {
  console.log(key)
  queryClient.invalidateQueries({
    queryKey: [key],
  });
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} closeButton />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
