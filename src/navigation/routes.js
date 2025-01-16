import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home.tsx";

const Layout = ({ children }) => {
  return (
    <>
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([{
  path: '/', element: <Layout />, children: [
    { index: true, element: <Home /> }
  ]
}])