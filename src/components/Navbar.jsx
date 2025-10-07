import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
  };

  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setRole(decoded.role);
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  return (
    <div>
      <nav
        className="bg-gradient-to-r from-indigo-400 
      via-slate-400 to-indigo-400 p-3 text-white flex items-center border justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">EduTech</div>
            {role === "student" ? (
              <div className=" flex gap-4">
            <button
             onClick={() => {
                  navigate(`/allCourse`);
                }}
              className=" bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded p-2 font-semibold "
            >
              All Course
            </button>
             <button
             onClick={() => {
                  navigate(`/student`);
                }}
              className=" bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded p-2 font-semibold "
            >
             Dashboard
            </button></div>
          ) : null}
        </div>

        <div className="flex gap-2 items-center">
        

          <p className="font-semibold w-full">Hi, {username}</p>
          <button
            onClick={handleLogOut}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 cursor-pointer rounded-full font-semibold "
          >
            LogOut
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
