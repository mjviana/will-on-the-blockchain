import {createBrowserRouter} from "react-router-dom";
import PublicWillsPage from "./pages/PublicWillsPage";
import CreateWillPage from "./pages/CreateWillPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import HowToCreateWillPage from "./pages/HowToCreateWillPage";
import SearchWillPage from "./pages/SearchWillPage";
import React from 'react'
import RevokeWillPage from "./pages/RevokeWillPage";
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
      {path: "/search-will", element: <SearchWillPage />},
      {path: "/revoke-will", element: <RevokeWillPage />},
    ],
  },
]);

export default router;
