import LoginPage from "./Components/Login";
import Body from "./Components/Body";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Components/Profile";
import User from "./Components/User";
import Institution from "./Components/Institution";
import Dashborad from "./Components/Dashborad";
import AddProfile from "./Components/AddProfile";
import Country from "./Components/Country";
import Currency from "./Components/Currency";
import PasswordPolicy from "./Components/PasswordPolicy";

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
        path:"/body",
        element: <Dashborad />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user",
        element: <User />,
      },
      
      {
        path: "addprofile",
        element: <AddProfile />,
      },
      {
        path: "country",
        element: <Country />,
      },
      {
        path: "currency",
        element: <Currency />,
      },
      {
        path: "passowrd policy",
        element: <PasswordPolicy />,
      },
      {
        path: "institution",
        element: <Institution />,
      },
    ],
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

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./Components/Login";
// import Body from "./Components/Body";
// import Profile from "./Components/Profile";
// import User from "./Components/User";
// import Settings from "./Components/Settings";
// import Dashboard from "./Components/Dashborad";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/body" element={<Body />}>
//             <Route index element={<Dashboard />} />  {/* Default child route */}
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/user" element={<User />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
