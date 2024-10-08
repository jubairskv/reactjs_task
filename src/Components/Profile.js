import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location?.state?.userData.menu_array[0];
  console.log(userData);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNTEyNzAwMCwiaXNzIjoiV0VCX0FETUlOIn0.pamsr_kCY360c9_3jyVZoZwULD1oLJwmQ9J6EWlEzRQ"; // Replace with your actual Bearer token
      const apiUrl =
        "https://api-innovitegra.online/webadmin/profiles/list_profiles";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setProfileData(data);
        setOpenDropdowns(new Array(data?.profile_array?.length).fill(false));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : false))
    );
  };

  const closeDropdown = (index) => {
    setOpenDropdowns((prev) =>
      prev.map((isOpen, i) => (i === index ? false : isOpen))
    );
  };

  const handleNavigation = (path, menuInfo) => {
    navigate(`/body/${path}`, {
      state: { userData: location.state.userData, menuInfo },
    });
  };

  if (!userData) return null;

  return (
    <div>
      <div className="flex gap-4">
        <h1 className="text-center text-2xl font-bold">Profile Page</h1>
        <div>
          {userData.actions
            .filter((action) => action.action_id === 1)
            .map((btn) => (
              <button
                key={btn.action_id}
                className=" bg-blue-800 w-20 h-10 flex items-center p-6 text-nowrap rounded-lg text-white"
                onClick={() => handleNavigation("addprofile")}
              >
                {btn.action_name}
              </button>
            ))}
        </div>
      </div>

      <div className=" mt-8">
        <table className="w-full border divide-y divide-gray-200">
          <thead className="">
            <tr className="">
              <th className="text-base font-bold border text-gray-600 tracking-wider ">
                Profile ID
              </th>
              <th className="font-bold text-gray-600 tracking-wider border">
                Name
              </th>
              <th className="text-base font-bold text-gray-600 tracking-wider border">
                Auth Status
              </th>
              <th className="text-base font-bold text-gray-600 tracking-wider border">
                Created Time
              </th>
              <th className="text-base font-bold text-gray-600 tracking-wider border">
                Edit Menu
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profileData?.profile_array?.map((profile, index) => (
              <tr key={profile.profile_id} className="">
                <td className="whitespace-nowrap border text-sm font-medium text-gray-900">
                  {profile.profile_id}
                </td>
                <td className="whitespace-nowrap border text-sm text-gray-500">
                  {profile.profile_name}
                </td>
                <td className="whitespace-nowrap border text-sm text-gray-500">
                  {profile.auth_status}
                </td>
                <td className="whitespace-nowrap text-sm border text-gray-500">
                  {new Date(profile.created_time).toLocaleString()}
                </td>
                <td className="whitespace-nowrap text-sm border text-gray-500">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                      <BsThreeDotsVertical size={20} />
                    </button>
                    {openDropdowns[index] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="flex justify-end p-2">
                          <button
                            onClick={() => closeDropdown(index)}
                            className=""
                          >
                            <FaTimes size={18} />
                          </button>
                        </div>
                        <div className="flex flex-col">
                          {userData.actions
                            .filter(
                              (action) =>
                                action.action_name.toLowerCase() !== "add"
                            )
                            .map((btn, index) => (
                              <Link
                                className="p-2 hover:bg-slate-300"
                                key={index}
                              >
                                {btn.action_name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
