import LoginPage from "./Components/Login";
import Body from "./Components/Body";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Components/Profile";
import User from "./Components/User";
import Settings from "./Components/Settings";
import Dashborad from "./Components/Dashborad";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/body",
    element: <Body />,
    children: [
      {
        path: "/body",
        element: <Dashborad />, 
      },
      {
        path: "/body/profile",
        element: <Profile />,
      },
      {
        path: "/body/user",
        element: <User />,
      },
      {
        path: "/body/settings",
        element: <Settings />,
      },
    ],
  },
  // {
  //   path: "/Profile",
  //   element: <Profile />,
  // },
  // {
  //   path: "/User",
  //   element: <User />,
  // },
  // {
  //   path: "/Settings",
  //   element: <Settings />,
  // },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
