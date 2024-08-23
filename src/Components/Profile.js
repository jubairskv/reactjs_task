import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

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

  console.log(profileData);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Profile Page</h1>
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-4xl bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-bold text-gray-600 tracking-wider">
                    Profile ID
                  </th>
                  <th className="px-6 py-3 text-left text-base font-bold text-gray-600 tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-base font-bold text-gray-600 tracking-wider">
                    Auth Status
                  </th>
                  <th className="px-6 py-3 text-left text-base font-bold text-gray-600 tracking-wider">
                    Created Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {profileData?.profile_array?.map((profile) => (
                  <tr key={profile.profile_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {profile.profile_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {profile.profile_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {profile.auth_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(profile.created_time).toLocaleString()}
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
