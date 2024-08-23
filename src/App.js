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
    // children: [
    //   {
    //     path: "profile",
    //     element: <Profile />,
    //   },
    //   {
    //     path: "user",
    //     element: <User />,
    //   },
    //   {
    //     path: "settings",
    //     element: <Settings />,
    //   },
    //   {
    //     path: "*",
    //     element: <Dashborad />, // Default to Dashboard if no other route matches
    //   },
    // ],
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/User",
    element: <User />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
