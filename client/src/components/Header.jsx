import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sign_out } from "../functions/login_functions";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const loginContext = useContext(AuthContext);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const signOut = () => {
    sign_out(loginContext);
  };

  return (
    <div className="fixed w-screen">
      <div className="flex p-[10px] bg-[#59ad7e]">
        <div className="border-[1.5px] w-[50px] h-[50px] rounded-[50%] overflow-hidden">
          logo
        </div>

        <div className="border-[1.5px] w-[110px] h-[50px] absolute left-20">
          Company_name
        </div>

        <div
          className="    w-[50px] h-[50px] rounded-[50%] text-center bg-[violet] absolute right-[20px]"
          
        >
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img src="profile.png" alt="" />

            {showDropdown && (
              <div className="absolute right-[10px] top-[50px] bg-white rounded-2xl overflow-hidden shadow-lg min-w-25 z-50">
                <div
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false); // Close dropdown after click
                  }}
                >
                  Profile
                </div>

                <div
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={() => {
                    signOut();
                    setShowDropdown(false);
                  }}
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};
