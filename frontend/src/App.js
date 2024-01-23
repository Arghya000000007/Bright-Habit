import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";
import Login from "./pages/Login";
import "./styles.scss";

const Layout = () => {
  return (
    <>
      <Navbar /> 
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children : [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: '/posts/:id',
        element: <SinglePost />,
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router = {router}/>
      </div>
    </div>
  );
}

export default App;
