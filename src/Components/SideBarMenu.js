import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SideBarMenu = ({ data }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const userData = data?.menu_array;
  const navigate = useNavigate();
  if (!userData) return null;

  // Filter items where parent_menu_id is 0 (main menu)
  const MenuItems = userData.filter((item) => item.parent_menu_id === 0);

  // Filter items where parent_menu_id is 3 (submenus under Settings)
  const settingsSubMenuItems = userData.filter(
    (item) => item.parent_menu_id === 3
  );

  const handleNavigation = (menuName) => {
    const path = menuName.replace(/\s+/g, '').toLowerCase();
    navigate(`/body/${path}`, { state: { userData: data } });
  };
  

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="bg-white w-52 h-[100vh] flex flex-col items-center text-xl">
      <div className="mt-7">
        <h1 className="text-blue-700 font-bold text-3xl">First Bank</h1>
      </div>
      <div className="mt-10">
        {MenuItems.map((item, index) => (
          <div key={index} className="w-full">
            {item.menu_id === 3 ? (
              // For Settings, add dropdown functionality
              <div>
                <button
                  className="hover:bg-blue-400 rounded-full p-4 text-nowrap w-40 h-10 flex items-center justify-between"
                  onClick={toggleSettingsDropdown}
                >
                  {item.menu_name}
                  <span>
                    {isSettingsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </button>
                {isSettingsOpen && (
                  <div className="ml-4 mt-2">
                    {console.log(settingsSubMenuItems)}
                    {settingsSubMenuItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className="hover:bg-blue-300 rounded-full p-2 text-sm w-32 flex items-center"
                        onClick={() => handleNavigation(subItem.menu_name)}
                      >
                        {subItem.menu_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // For other menu items
              <button
                className="hover:bg-blue-400 rounded-full p-4 text-nowrap w-40 h-10 flex items-center"
                onClick={() => handleNavigation(item.menu_name)}
              >
                {item.menu_name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarMenu;
