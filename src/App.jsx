import {
  createBrowserRouter,
  redirect,
  redirectDocument,
  RouterProvider,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import RootLayout from "./pages/RootLayout";
import Page404 from "./pages/Page404";

const Routes = () => {
  const privatedRouutes = [
    {
      path: "/profile",
      element: <h1>профиль</h1>,
    },
  ];

  const publicRoutes = [
    {
      path: ":section?",
      element: <MainPage />,
    },
    { path: "/cart", element: <CartPage /> },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        ...(true ? publicRoutes : []),
        ...(false ? privatedRouutes : []),
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
