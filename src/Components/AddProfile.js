import React from "react";
import { useLocation } from "react-router-dom";

const AddProfile = () => {
  const location = useLocation();
  const userData = location?.state?.userData?.menu_array[0];
  console.log(userData);

  return(
    <div>AddProfile</div>
  )
};

export default AddProfile;
