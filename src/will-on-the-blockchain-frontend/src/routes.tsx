import {createBrowserRouter} from "react-router-dom";
import PublicWillsPage from "./pages/PublicWillsPage";
import CreateWillPage from "./pages/CreateWillPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import HowToCreateWillPage from "./pages/HowToCreateWillPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: "/create-will",
        element: <CreateWillPage />,
      },
      {path: "/public-wills", element: <PublicWillsPage />},
      {path: "/how-to-create-will", element: <HowToCreateWillPage />},
    ],
  },
]);

export default router;
