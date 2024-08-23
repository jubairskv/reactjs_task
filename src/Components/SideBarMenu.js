import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarMenu = ({ data }) => {
  console.log(data.menu_array);
  const userData = data?.menu_array;
  const navigate = useNavigate();
  if (!data) return null;

  const handleNavigation = (menuName) => {
    switch (menuName) {
      case "Profile":
        navigate("profile");
        break;
      case "User":
        navigate("user");
        break;
      case "Settings":
        navigate("settings");
        break;
      default:
        navigate("/body"); // Redirect to Dashboard or default route
        break;
    }
  };

//   // Example menu items (this should be populated based on your data)
//   const menuItems = [
//     { menu_name: "Dashboard" },
//     { menu_name: "Profile" },
//     { menu_name: "User" },
//     { menu_name: "Settings" },
//   ];

  return (
    <div className="bg-white w-52 h-[100vh] flex flex-col items-center text-xl">
      <div className="mt-7">
        <h1 className="text-blue-700 font-bold text-3xl">First Bank</h1>
      </div>
      <div className="mt-10">
        {userData.map((item, index) => (
          <div key={index}>
            <button
              className="hover:bg-blue-400 rounded-full p-4 text-nowrap w-40 h-10 flex items-center"
              onClick={() => handleNavigation(item.menu_name)}
            >
              {item.menu_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarMenu;
