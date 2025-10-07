import React from "react";
import Navbar from "../../components/Navbar";
import InsSidebar from "../../components/InsSideBar";
import { useEffect, useState } from "react";
import { baseUrl } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MyCourse() {
  const [courses, setCourses] = useState([]);
  const instructorId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Fetch all courses
  useEffect(() => {
    const loadMyCourse = async () => {
      try {
        await axios
          .get(`${baseUrl}/course/instructor/${instructorId}`)
          .then((res) => setCourses(res.data));
      } catch (err) {
        console.error("Error:", err);
      }
    };
    loadMyCourse();
  }, []);

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await fetch(`${baseUrl}/course/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex">
        <InsSidebar />
        <main className="overflow-y-auto flex-1">
          <div
            className="p-6 space-y-6 min-h-screen bg-gradient-to-br 
          from-indigo-200 via-purple-200 to-pink-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-indigo-600 mb-4">
                My Courses
              </h1>
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 
          text-white shadow-lg hover:opacity-90 flex items-center gap-2 p-3 "
                onClick={() => {
                  navigate(`/ManageCourse/null`);
                }}
              >
                + New Course
              </button>
            </div>

            <div
              className="grid grid-cols-1 gap-x-6 gap-y-10
                                     sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
            >
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border-white/20 rounded-xl p-2 py-3 shadow-xl hover:shadow-2xl transition"
                >
                  <div
                    className=" cursor-pointer"
                    onClick={() => {
                      navigate(`/courseDetails/${course._id}`);
                    }}
                  >
                    <h3 className="text-lg font-bold  ">{course.title}</h3>
                    <p className="text-gray-600 text-sm py-2">
                      {course.description}
                    </p>

                    <div className="flex gap-3 justify-between mt-4">
                      <p className="text-sm text-gray-500">{course.level}</p>
                      <p className="text-indigo-600 font-semibold">
                        ₹{course.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-between mt-4">
                    <button
                      className="bg-indigo-400 text-white 
                    px-3 py-1 rounded-lg hover:bg-blue-700 cursor-pointer"
                      onClick={() => {
                        navigate(`/ManageCourse/${course._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-400 text-white px-3 py-1 cursor-pointer rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {courses.length === 0 && (
                <p className="col-span-3 text-center text-gray-500">
                  No courses found.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyCourse;
