import { useRoutes } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import ProductList from "./pages/product/list";
import ProductEdit from "./pages/product/edit";
import ProductAdd from "./pages/product/add";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Homepage from "./pages/Homepage";
import AdminLayout from "./pages/layout/AdminLayout";
import ClientLayout from "./pages/layout/ClientLayout";
import ProductDetail from "./pages/client/product/detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckoutPage from "./pages/client/checkout";
const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const routes = [
    {
      path: "",
      element: <ClientLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "auth/register",
          element: <Register />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "product/list",
          element: <ProductList />,
        },
        {
          path: "product/add",
          element: <ProductAdd />,
        },
        {
          path: "product/:id/edit",
          element: <ProductEdit />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  );
}

export default App;
