import type { RouteObject } from "react-router-dom";
import { RoutePath } from "../../constants/routes.path";
import Home from "../../pages/home/Home";
import Products from "../../pages/products/Products";
import ProductDetail from "../../pages/product-detail/Product-Detail";
import Categories from "../../pages/categories/Categories";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import ProtectedRoute from "../../hooks/routing/useProtectedRoute";
import Cart from "../../pages/cart/Cart";
import Checkout from "../../pages/checkout/Checkout";
import Profile from "../../pages/profile/Profile";
import Orders from "../../pages/orders/Orders";
import Wishlist from "../../pages/wishlist/Wishlist";

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
  {
    path: RoutePath.wishlist,
    element: (
      <ProtectedRoute>
        <Wishlist  />
      </ProtectedRoute>
    ),
  },
];
