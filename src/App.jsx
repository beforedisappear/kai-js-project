import {
  createBrowserRouter,
  redirectDocument,
  RouterProvider,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import RootLayout from "./pages/RootLayout";
import Page404 from "./pages/Page404";

const Routes = () => {
  const publicRoutes = [
    {
      path: "/:section?",
      element: <MainPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        ...(true ? publicRoutes : []),
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
