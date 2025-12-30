import type { RouteObject } from "react-router-dom";
import { RoutePath } from "../../constants/routes.path";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/products";
import ProductDetail from "../../pages/product-detail/product-detail";
import Categories from "../../pages/categories/Categories";
import Login from "../../pages/login/login";
import Signup from "../../pages/signup/signup";
import ProtectedRoute from "../../hooks/routing/useProtectedRoute";
import Cart from "../../pages/cart/cart";
import Checkout from "../../pages/checkout/Checkout";
import Profile from "../../pages/profile/profile";
import Orders from "../../pages/orders/Orders";

export const routes: RouteObject[] = [
  {
    path: RoutePath.home,
    element: <Home />,
  },
  {
    path: RoutePath.products,
    element: <Products />,
  },
  {
    path: RoutePath.productDetail,
    element: <ProductDetail />,
  },
  {
    path: RoutePath.categories,
    element: <Categories />,
  },
  {
    path: RoutePath.auth.login,
    element: <Login />,
  },
  {
    path: RoutePath.auth.signup,
    element: <Signup />,
  },

  //  protected routes
  {
    path: RoutePath.cart,
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePath.checkout,
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePath.profile,
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePath.orders,
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
];
