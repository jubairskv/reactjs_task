import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AddProfile = () => {
  const [insData, setInsData] = useState(null);
  const location = useLocation();
  const { userData } = location?.state;

  useEffect(() => {
    if (!userData) {
      console.error("No user data found");
      return;
    }

    // Find the "Institution" menu
    const institutionMenu = userData.menu_array.find(
      (menu) => menu.menu_name === "Institution"
    );

    if (!institutionMenu) {
      console.error("No institution menu found");
      return;
    }

    // Filter actions to include only action_id === 2
    const filteredActions = institutionMenu.actions.filter(
      (action) => action.action_id === 2
    );

    if (filteredActions.length === 0) {
      console.error("No actions with action_id 2 found");
      return;
    }

    const actionId = filteredActions[0].action_id; // Assuming there's only one action_id needed

    // Prepare the API request body
    const menuData = {
      menu_info: {
        menu_id: institutionMenu.menu_id, // Use the menu_id from institutionMenu
        action_id: actionId // Use the action_id from filteredActions
      }
    };

    console.log("Menu Data:", menuData);

    const fetchProfileData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNDUwODk2NSwiaXNzIjoiV0VCX0FETUlOIn0.614SI2ktjTVplzoQgmI4CAIqiX7fvIIfV9zjRWfC2AM"; // Replace with your actual Bearer token
      const apiUrl = "https://api-innovitegra.online/webadmin/inst/view_inst"; // Replace with your actual API endpoint

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the Bearer token here
          },
          body: JSON.stringify(menuData), // Use the updated menuData structure
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setInsData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userData]);

  return <div>AddProfile</div>;
};

export default AddProfile;
