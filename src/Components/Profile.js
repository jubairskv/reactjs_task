import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const location = useLocation();
  const userData = location.state?.userData.menu_array[0];
  const buttonDrop =location.state?.userData.menu_array;
  console.log(userData);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVZGlkIjoiMTIzNDU2Nzg5MDEyMzQ1NjciLCJDdXN0b21lcklEIjoiMiIsImV4cCI6MTcyNDUwODk2NSwiaXNzIjoiV0VCX0FETUlOIn0.614SI2ktjTVplzoQgmI4CAIqiX7fvIIfV9zjRWfC2AM"; // Replace with your actual Bearer token
      const apiUrl =
        "https://api-innovitegra.online/webadmin/profiles/list_profiles"; // Replace with your actual API endpoint

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the Bearer token here
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (!userData) return null;

  return (
    <div>
      <div className="flex gap-4">
        <h1 className="text-center text-2xl font-bold ">Profile Page</h1>
        <div>
          <button className="w-20 h-10 bg-blue-800 rounded-lg text-white">
            {userData.actions[0].action_name}
          </button>
        </div>
      </div>

      <div className="flex  mt-8">
        <div className="w-full max-w-8xl bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr className="flex justify-evenly items-center p-5">
                  <th className=" text-base font-bold text-gray-600 tracking-wider">
                    Profile ID
                  </th>
                  <th className=" font-bold text-gray-600 tracking-wider">
                    Name
                  </th>
                  <th className=" text-base font-bold text-gray-600 tracking-wider">
                    Auth Status
                  </th>
                  <th className="text-base font-bold text-gray-600 tracking-wider">
                    Created Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {profileData?.profile_array?.map((profile) => (
                  <tr
                    key={profile.profile_id}
                    className="flex justify-evenly items-center p-5"
                  >
                    <td className=" whitespace-nowrap text-sm font-medium text-gray-900">
                      {profile.profile_id}
                    </td>
                    <td className=" whitespace-nowrap text-sm text-gray-500">
                      {profile.profile_name}
                    </td>
                    <td className="whitespace-nowrap text-sm text-gray-500">
                      {profile.auth_status}
                    </td>
                    <td className=" whitespace-nowrap text-sm text-gray-500">
                      {new Date(profile.created_time).toLocaleString()}
                    </td>
                    <td className=" whitespace-nowrap text-sm text-gray-500">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={toggleDropdown}
                          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                          <BsThreeDotsVertical size={20} />
                        </button>
                        {isOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="flex justify-end p-2">
                              <button onClick={toggleDropdown} className="p-1">
                                <FaTimes size={16} />
                              </button>
                            </div>
                            <p>1</p>
                            <p>2</p>
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
      </div>
    </div>
  );
};

export default Profile;
