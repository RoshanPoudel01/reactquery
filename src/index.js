import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import DisplayForm from "./display/DisplayForm";
import Search from "./display/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
  },
  {
    path: "/dataform",
    element: <DisplayForm />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

const queryClient = new QueryClient();
root.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ChakraProvider>
);
