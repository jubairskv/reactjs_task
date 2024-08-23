import React from "react";
import { useNavigate} from "react-router-dom";

const SideBarMenu = ({ data }) => {
  console.log(data.menu_array);
  const userData = data?.menu_array;
  const navigate = useNavigate();
  if (!userData) return null;

  const handleNavigation = (menuName) => {
    const path = menuName.toLowerCase(); // Dynamically created the path no need add each modulepath 
    navigate(`/body/${path}`, { state: { userData: data } });
  };

  
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
