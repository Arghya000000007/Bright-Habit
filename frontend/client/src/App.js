import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import SinglePost from "./pages/post/SinglePost.jsx";
import Footer from "./components/footer/Footer.jsx";
import Write from "./pages/write/Write.jsx";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />
      },
      {
        path: "/createPost",
        element: <Write />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
