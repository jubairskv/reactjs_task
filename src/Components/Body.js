import React from "react";
import SideBarMenu from "./SideBarMenu";
import { Outlet ,useLocation} from "react-router-dom";
import NavBar from "./NavBar";

const Body = () => {
  const location= useLocation();
  const {state} =location
  const userData=state?.userData
  if(!userData) return null
  return (
    <div className="flex h-screen">
      <SideBarMenu data={userData}/>
      <div className="flex flex-col flex-grow">
        <NavBar />
        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
