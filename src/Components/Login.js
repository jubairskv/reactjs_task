import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType] = useState("CORPORATE"); // Default to CORPORATE

  const API_URL = "https://api-innovitegra.online/webadmin/user/user_login";

  const loginUser = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Password": "4970FAB298E271E430010235E9C88EA5E467DEEF",
          "X-Username": "wallet",
          Appversion: "4.0.4",
          "Content-Type": "application/json",
          Deviceid: "12345678901234567",
        },
        body: JSON.stringify({
          user_name: userName,
          password: password,
          user_type: userType,
        }),
      });
      //console.log(response);

      const data = await response.json();

      if (response.ok && data.code === 1) {
        console.log("Login successful:", data);
        navigate("/body", { state: { userData: data } }); // Redirect to dashboard or another route after successful login
      } else {
        console.error("Login failed:", data);
        // Handle login failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="pl-40 pt-32">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-4xl">Create Account !</h1>
          <p className="pt-2 text-gray-500">Let's get your account set up</p>
        </div>
        <div className="pt-8">
          <form onSubmit={loginUser}>
            <div className="flex flex-col">
              <label className="pr-[82%] font-medium text-base">
                Mobile <span className="text-red-500">*</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Mobile"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
                className="border rounded-lg w-96 h-12 p-2 mt-2"
              />
            </div>
            <div className="flex flex-col pt-2">
              <label className="pr-[78%] font-medium text-base">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded-lg  w-96 h-12 p-2 mt-2"
              />
            </div>
            <div className="flex gap-28 mt-4 text-nowrap">
              <p>Remember Me</p>
              <Link
                className="flex text-blue-800 font-medium"
                to="/forgotpassword"
              >
                Forgot your password ?
              </Link>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="border bg-blue-700 rounded-lg shadow-lg w-96 h-12 text-white"
              >
                Login
              </button>
            </div>
            <div className="flex">
              <hr className="w-32 mt-10" />
              <span className="mx-4 mt-7 text-nowrap text-gray-500">
                Or, Login With
              </span>
              <hr className="w-32 mt-10 " />
            </div>

            <div className="mt-8 flex items-center">
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="icon"
                className="w-7 h-7 absolute ml-20"
              />
              <button
                type="submit"
                className="border bg-white rounded-lg  w-96 h-12 text-black font-medium"
              >
                Sign up with google
              </button>
            </div>
            <div className="ml-16 mt-8">
              <p className="flex gap-2 text-gray-600">
                Don't have an account?
                <Link
                  to="/signup"
                  className="underline text-blue-800 font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-blue-800 border w-screen h-svh ml-96"></div>
    </div>
  );
};

export default LoginPage;
