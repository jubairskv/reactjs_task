import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CheckboxTree from "./Mock";

const AddProfile = () => {
  const [insData, setInsData] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [profileName, setProfileName] = useState(""); // State for profile name
  const [selectedInstitution, setSelectedInstitution] = useState(""); // State for selected institution
  const [tableData, setTableData] = useState([]); // State to store table data
  const location = useLocation();
  const { userData } = location?.state;
  console.log(userData)
 // const {checkboxData} = location?.state?.menu_array
//   console.log(checkboxData)

// const MenuItems = userData.filter((item) => item.parent_menu_id === 0);
// console.log(MenuItems)

  const instname =
    userData?.menu_array?.find((menu) => menu.menu_name === "Institution")
      ?.menu_name || "Institution";

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

    const actionId = filteredActions[0].action_id; 

    
    const menuData = {
      menu_info: {
        menu_id: institutionMenu.menu_id, // Use the menu_id from institutionMenu
        action_id: actionId, // Use the action_id from filteredActions
      },
    };

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
        setInstitutions(data.menu_array); // Store institution data
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userData]);

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handleInstitutionChange = (e) => {
    setSelectedInstitution(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new entry to the table
    setTableData((prevTableData) => [
      ...prevTableData,
      {
        profileName,
        institutionId: selectedInstitution,
        institutionName:
          institutions.find(
            (inst) => inst.institution_id === selectedInstitution
          )?.institution_name || "Unknown",
      },
    ]);

    // Clear the form inputs
    setProfileName("");
    setSelectedInstitution("");
  };

  const initialData = [
    {
      id: 1,
      label: "Parent 1",
      checked: false,
      level: 0,
      children: [
        {
          id: 2,
          label: "Child 1",
          checked: false,
          level: 1,
          children: [
            {
              id: 3,
              label: "Grandchild 1",
              checked: false,
              level: 2,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "Parent 2",
      checked: false,
      level: 0,
    },
  ];

  const handleTreeChange = (updatedTreeData) => {
    console.log("Updated tree data:", updatedTreeData);
  };
  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={handleSubmit} className="flex flex-row gap-20">
        <div className="flex flex-col items-start gap-2">
          <label>Profile Name</label>
          <input
            type="text"
            className="border w-60 h-10 rounded-lg"
            value={profileName}
            onChange={handleProfileNameChange}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label>{instname}</label>
          <select
            className="border w-60 h-10 rounded-lg"
            value={selectedInstitution}
            onChange={handleInstitutionChange}
          >
            <option value="">Select Institution</option>
            {institutions.map((institution) => (
              <option
                key={institution.institution_id}
                value={institution.institution_id}
              >
                {institution.institution_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <CheckboxTree data={initialData} onChange={handleTreeChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-40 h-10 mt-7"
        >
          Add to Table
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Institution ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Institution Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.profileName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.institutionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.institutionName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProfile;
