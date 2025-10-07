import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import InsSidebar from "../../components/InsSideBar";

function InstructorDashboard() {
  const navigate = useNavigate();
  const [Mystudents, setMystudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const instructorId = localStorage.getItem("userId");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        await axios
          .get(`${baseUrl}/student/${instructorId}`)
          .then((res) => setMystudents(res.data));
        await axios
          .get(`${baseUrl}/course/instructor/${instructorId}`)
          .then((res) => setCourses(res.data));
      } catch (err) {
        console.error("Error:", err);
      }
    };

    loadStudents();
  }, []);

  console.log(Mystudents?.students?.length);

  const handleStudents = async (e) => {
    e.preventDefault();
    navigate("/Mystudents");
  };
  const handleCourse = async (e) => {
    e.preventDefault();
    navigate("/MyCourse");
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="w-full flex">
          <InsSidebar />
          <main className="grow">
            <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                Instructor Dashboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  className="bg-white/10 backdrop-blur-lg border 
                border-white/20 rounded-xl p-6 shadow-lg cursor-pointer"
                  onClick={handleStudents}
                >
                  <h3 className="text-lg font-medium">My Students</h3>
                  <p className="text-3xl font-bold mt-2">
                    {Mystudents && Mystudents?.length > 0
                      ? Mystudents?.students?.length
                      : "-"}
                  </p>
                </div>

                <div
                  className="bg-white/10 backdrop-blur-lg border 
                border-white/20 rounded-xl p-6 shadow-lg cursor-pointer"
                  onClick={handleCourse}
                >
                  <h3 className="text-lg font-medium">My Courses</h3>
                  <p className="text-3xl font-bold mt-2">
                    {courses && courses?.length > 0 ? courses.length : "-"}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
