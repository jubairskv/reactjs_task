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
  const [checkedTreeData, setCheckedTreeData] = useState([]);
  const [checkData, setCheckData] = useState([]);
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNDc4MjAzNywiaXNzIjoiV0VCX0FETUlOIn0.aaykp3anmLbvEddbuoezhMGisk80fFFoygJ4i7wiOBk";
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
    console.log(e.target.value);
  };

  console.log(selectedInstitution)

  const selectedCheckboxes = checkData.map((item) => {
    console.log(item);
    if (item.checked) {
      return "Checked";
    } else {
      return "";
    }
  });

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

    const institutionId = Number(selectedInstitution);
    const institution = institutions.find(
      (inst) => inst.institution_id === institutionId
    );
    const institutionName = institution
      ? institution.institution_name
      : "Unknown";

    const selectedActions = checkedTreeData
      .filter((item) => item.actionId)
      .map((item) => ({
        actionId: item.actionId,
        actionName: item.actionName,
      }));

    setTableData((prevTableData) => [
      ...prevTableData,
      {
        profileName,
        institutionId: selectedInstitution,
        institutionName,
        selectedActions,
      },
    ]);

    const resetTreeData = mapMenuItemsToTreeData(MenuItems);
    setCheckedTreeData(resetTreeData);
    setProfileName("");
    setSelectedInstitution("");
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
                checked: false,
                parentId: `menu-${menu.menu_id}`,
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
    const extractCheckedData = (tree) => {
      let checkedItems = [];
      tree.forEach((node) => {
        if (node.checked) {
          if (node.id.startsWith("action-")) {
            checkedItems.push({
              menuId: node.parentId,
              actionId: node.id,
              actionName: node.label,
            });
          } else {
            checkedItems.push({
              menuId: node.id,
              menuName: node.label,
              actionId: null,
              actionName: null,
            });
          }
        }
        if (node.children) {
          checkedItems = checkedItems.concat(extractCheckedData(node.children));
        }
      });
      return checkedItems;
    };

    const checkedData = extractCheckedData(updatedTreeData);
    setCheckedTreeData(checkedData);
    setCheckData(updatedTreeData);
    console.log("Updated checked data:", checkedData);
  };

  const handleActionClick = (actionName, profileName) => {
    switch (actionName.toLowerCase()) {
      case "add":
        handleAdd(profileName);
        break;
      case "edit":
        handleEdit(profileName);
        break;
      case "delete":
        handleDelete(profileName);
        break;
      case "view":
        handleView(profileName);
        break;
      case "auth":
        handleAuth(profileName);
        break;
      case "deauth":
        handleDeauth(profileName);
        break;
      default:
        console.log("Unknown action:", actionName);
    }
  };

  const handleAdd = async (profileName) => {
    console.log(`Adding new data for profile: ${profileName}`);

    // Check if selectedInstitution is defined
    if (!selectedInstitution) {

      console.error("Institution ID is not defined");
      return;
    }

    // Ensure checkedTreeData is not empty
    if (!checkedTreeData || checkedTreeData.length === 0) {
      console.error("Checked tree data is empty or undefined");
      return;
    }

    // Prepare the data to be sent in the request body
    const addProfileBody = {
      profile_info: {
        profile_name: profileName,
        inst_id: selectedInstitution, // Ensure this has the correct institution ID
      },
      menu_info: checkedTreeData
        .map((item) => {
          // Safeguard for menuId
          const menuId = item.menuId
            ? parseInt(item.menuId.replace("menu-", ""))
            : null;

          // Filter actions and ensure actionId exists
          const actions = checkedTreeData
            .filter(
              (actionItem) =>
                actionItem.menuId === item.menuId && actionItem.actionId
            )
            .map((actionItem) => {
              // Safeguard for actionId
              return actionItem.actionId
                ? parseInt(actionItem.actionId.replace("action-", ""))
                : null;
            })
            .filter((action) => action !== null); // Remove nulls

          return {
            menu_id: menuId,
            actions: actions,
            is_configuration: item.isConfiguration || 2, // Default value if not provided
          };
        })
        .filter((menu) => menu.menu_id !== null), // Remove any menus with null menu_id
    };

    // Debugging: Log the assembled payload to inspect its structure
    console.log("Assembled Payload:", addProfileBody);

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNDc4MjAzNywiaXNzIjoiV0VCX0FETUlOIn0.aaykp3anmLbvEddbuoezhMGisk80fFFoygJ4i7wiOBk"; // Replace with the actual token
      const apiUrl =
        "https://api-innovitegra.online/webadmin/profiles/add_profile";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addProfileBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Profile added successfully:", responseData);
      // Handle success, e.g., show a success message, update state, etc.
    } catch (error) {
      console.error("Error adding profile:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleEdit = (profileName) => {
    // Logic to edit existing data
    console.log(`Editing data for profile: ${profileName}`);
    // Example: Open a form or modal with the current data to edit
  };

  const handleDelete = (profileName) => {
    // Logic to delete data
    console.log(`Deleting data for profile: ${profileName}`);
    // Example: Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete data for ${profileName}?`
    );
    if (confirmDelete) {
      // Perform the delete operation
      console.log(`Data for ${profileName} has been deleted.`);
    }
  };

  const handleView = (profileName) => {
    // Logic to view details
    console.log(`Viewing data for profile: ${profileName}`);
    // Example: Redirect to a details page or open a modal with details
  };

  const handleAuth = (profileName) => {
    // Logic to authorize a profile
    console.log(`Authorizing profile: ${profileName}`);
    // Example: Send a request to authorize the profile
  };

  const handleDeauth = (profileName) => {
    // Logic to deauthorize a profile
    console.log(`Deauthorizing profile: ${profileName}`);
    // Example: Send a request to deauthorize the profile
  };

  return (
    <div className="flex flex-col gap-1">
      <form onSubmit={handleSubmit} className="flex flex-row gap-20">
        <div className="flex flex-col items-start gap-2">
          <label>Profile Name</label>
          <input
            type="text"
            className={`border pl-4 w-60 h-10 rounded-lg ${
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
            className={`border w-60 pl-4 h-10 rounded-lg ${
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
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg fixed"
          >
            Submit
          </button>
        </div>
      </form>
      {tableData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Table Data</h3>
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Profile Name</th>
                <th className="border px-4 py-2">Institution ID</th>
                <th className="border px-4 py-2">Institution Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.profileName}</td>
                  <td className="border px-4 py-2">{item.institutionId}</td>
                  <td className="border px-4 py-2">{item.institutionName}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      {item.selectedActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className="bg-green-500 text-white py-1 px-2 rounded-lg"
                          onClick={() =>
                            handleActionClick(
                              action.actionName,
                              item.profileName
                            )
                          }
                        >
                          {action.actionName}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddProfile;
