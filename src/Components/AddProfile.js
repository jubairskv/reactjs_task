import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CheckboxTree from "./Mock";

const AddProfile = () => {
  const [insData, setInsData] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});
  const [checkedTreeData, setCheckedTreeData] = useState([]); // State for checked checkboxes

  const location = useLocation();
  const { userData } = location?.state;

  const menuList = userData.menu_array;
  const MenuItems = userData.menu_array.filter(
    (item) => item.parent_menu_id === 0
  );

  const instname =
    userData?.menu_array?.find((menu) => menu.menu_name === "Institution")
      ?.menu_name || "Institution";

  useEffect(() => {
    if (!userData) {
      console.error("No user data found");
      return;
    }

    const institutionMenu = userData.menu_array.find(
      (menu) => menu.menu_name === "Institution"
    );

    if (!institutionMenu) {
      console.error("No institution menu found");
      return;
    }

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
        menu_id: institutionMenu.menu_id,
        action_id: actionId,
      },
    };

    const fetchProfileData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNDUwODk2NSwiaXNzIjoiV0VCX0FETUlOIn0.614SI2ktjTVplzoQgmI4CAIqiX7fvIIfV9zjRWfC2AM";
      const apiUrl = "https://api-innovitegra.online/webadmin/inst/view_inst";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(menuData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInsData(data);
        setInstitutions(data.menu_array);
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
    console.log(e.target.value)
  };

  const validateFields = () => {
    const errors = {};
    if (!profileName.trim()) {
      errors.profileName = "Profile Name is required";
    }
    if (!selectedInstitution) {
      errors.selectedInstitution = "Institution selection is required";
    }
    if (checkedTreeData.length === 0) {
      errors.checkedTreeData = "At least one checkbox must be selected";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    console.log("Institutions:", institutions);
    console.log("Selected Institution ID:", selectedInstitution);
  
    // Ensure selectedInstitution is the same type as institution_id
    const institutionId = Number(selectedInstitution); // or use String(selectedInstitution) if institution_id is a string
  
    // Find the institution by id
    const institution = institutions.find(
      (inst) => inst.institution_id === institutionId
    );
  
    const institutionName = institution ? institution.institution_name : "Unknown";
  
    console.log("Institution Name:", institutionName);
  
    setTableData((prevTableData) => [
      ...prevTableData,
      {
        profileName,
        institutionId: selectedInstitution,
        institutionName,
      },
    ]);
  
    setProfileName("");
    setSelectedInstitution("");
    setCheckedTreeData([]);
    setErrors({});
  };
  
  
  const mapMenuItemsToTreeData = (menuItems) => {
    const mapMenuToTree = (menu) => {
      const children = menuList.filter(
        (item) => item.parent_menu_id === menu.menu_id
      );

      const isSettingsMenu = menu.menu_name === "Settings";

      return {
        id: `menu-${menu.menu_id}`,
        label: menu.menu_name,
        checked: false,
        level: 0,
        children: [
          ...(isSettingsMenu
            ? []
            : menu.actions.map((action) => ({
                id: `action-${action.action_id}`,
                label: action.action_name,
                checked: action.status === 1,
                level: 1,
              }))),
          ...children.map(mapMenuToTree),
        ],
      };
    };

    return menuItems.map(mapMenuToTree);
  };

  const treeData = mapMenuItemsToTreeData(MenuItems);

  const handleTreeChange = (updatedTreeData) => {
    // Update the checkedTreeData state based on the updatedTreeData
    const extractCheckedIds = (tree) => {
      let checkedIds = [];
      tree.forEach((node) => {
        if (node.checked) {
          checkedIds.push(node.id);
        }
        if (node.children) {
          checkedIds = checkedIds.concat(extractCheckedIds(node.children));
        }
      });
      return checkedIds;
    };
    
    const checkedIds = extractCheckedIds(updatedTreeData);
    setCheckedTreeData(checkedIds);
    console.log("Updated tree data:", updatedTreeData);
  };

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={handleSubmit} className="flex flex-row gap-20">
        <div className="flex flex-col items-start gap-2">
          <label>Profile Name</label>
          <input
            type="text"
            className={`border w-60 h-10 rounded-lg ${
              errors.profileName ? "border-red-500" : ""
            }`}
            value={profileName}
            onChange={handleProfileNameChange}
          />
          {errors.profileName && (
            <p className="text-red-500 text-xs">{errors.profileName}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label>{instname}</label>
          <select
            className={`border w-60 h-10 rounded-lg ${
              errors.selectedInstitution ? "border-red-500" : ""
            }`}
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
          {errors.selectedInstitution && (
            <p className="text-red-500 text-xs">{errors.selectedInstitution}</p>
          )}
        </div>
        <div>
          <CheckboxTree data={treeData} onChange={handleTreeChange} />
          {errors.checkedTreeData && (
            <p className="text-red-500 text-xs">{errors.checkedTreeData}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-40 h-10 mt-7"
        >
          Add to Table
        </button>
      </form>
      <div className="overflow-x-auto mt-10 mr-10">
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
          <tbody className="bg-white divide-y divide-gray-200  ">
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.profileName}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.institutionId}
                </td>
                <td className=" py-4 whitespace-nowrap text-sm text-gray-500">
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
