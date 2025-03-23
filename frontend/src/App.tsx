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
import CategoryList from "./pages/category/list";
import CategoryEdit from "./pages/category/edit";
import CategoryAdd from "./pages/category/add";
import CartPage from "./pages/client/cart/cart";
import SearchPage from "./pages/SearchPage";

axios.defaults.baseURL = "http://localhost:3000"; // Chỉ thiết lập 1 lần

const queryClient = new QueryClient();

function App() {
  const routes = [
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { index: true, element: <Homepage /> },
      { path: "gio-hang", element: <CartPage /> },  // Sửa lại đường dẫn
      { path: "tim-kiem", element: <SearchPage /> },
      { path: "thanh-toan", element: <CheckoutPage /> },
      { path: "san-pham/:id", element: <ProductDetail /> },
      { path: "auth/dang-ky", element: <Register /> },
      { path: "auth/dang-nhap", element: <Login /> },
    ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "product/list", element: <ProductList /> },
        { path: "product/add", element: <ProductAdd /> },
        { path: "product/:id/edit", element: <ProductEdit /> },
        { path: "category/list", element: <CategoryList /> },
        { path: "category/add", element: <CategoryAdd /> },
        { path: "category/:id/edit", element: <CategoryEdit /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>;
}

export default App;
