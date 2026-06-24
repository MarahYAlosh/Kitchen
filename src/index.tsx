import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ApiContextProvider from "./context/ApiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import Area from "./pages/Area";
import Categories from "./pages/Categories";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import Search from "./pages/Search";
import SpecialArea from "./pages/SpecialArea";
import SpecialCategory from "./pages/SpecialCategory";
import SpecialIngredients from "./pages/SpecialIngredients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "/", element: <App /> },
      { path: "search/:term", element: <Search /> },
      { path: "recipe/:id", element: <Recipes /> },
      { path: "/ingredients", element: <Ingredients />, children: [{ path: ":ingredient", element: <SpecialIngredients /> }] },
      { path: "/area", element: <Area />, children: [{ path: ":area", element: <SpecialArea /> }] },
      { path: "/categories", element: <Categories />, children: [{ path: "/categories/:category", element: <SpecialCategory /> }] },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <React.StrictMode>
    <ApiContextProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </ApiContextProvider>
  </React.StrictMode>
);
