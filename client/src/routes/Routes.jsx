import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
    {
      path: "/",
      // element: <Home/>,
      element: <Login/>,
    },
    {
      path: "/home",
      element: <Home/>,
      // element: <Login/>,
    },
  ]);
  