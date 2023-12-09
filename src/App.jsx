import {
  createBrowserRouter,
  redirect,
  redirectDocument,
  RouterProvider,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./pages/RootLayout";
import Page404 from "./pages/Page404";

import { useSelector } from "react-redux";

const Routes = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const privatedRoutes = [
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ];

  const publicRoutes = [
    {
      path: ":section?",
      element: <MainPage />,
    },
    { path: "/cart", element: <CartPage /> },
    {
      path: "/page-not-found",
      element: <Page404 />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        ...publicRoutes,
        ...(token ? privatedRoutes : []),
        {
          path: "/*",
          element: <Page404 />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default function App() {
  return <Routes />;
}
