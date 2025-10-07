import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
function AllCourse() {
  const [courses, setCourses] = useState([]);
  const [EnrolledCourse, setEnrolledCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const StudentId = localStorage.getItem("userId");
  // Fetch all courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/course`);
      setCourses(res.data);

      const AlreadyEnrolled = await axios.get(
        `${baseUrl}/enrolled/${StudentId}`
      );

      setEnrolledCourse(AlreadyEnrolled.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/student/enroll`,
        { courseId: courseId, studentId: StudentId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchCourses();
      alert(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white text-xl">
        Loading courses...
      </div>
    );
  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center relative text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 rounded-2xl p-8">
          <h1 className="text-4xl text-white font-bold text-center mb-12">
            All Courses
          </h1>

          <div className="relative z-10 p-8  border border-white/30 shadow-xl rounded-2xl p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-6 rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl cursor-pointer
               border border-white/30 hover:scale-105 transition-transform"
              >
                <div
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate(`/stud/courseDetails/${course._id}`);
                  }}
                >
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {course.title}
                  </h2>
                  <p className="text-white/80 mb-6">{course.description}</p>
                </div>
                {EnrolledCourse.map((EachEnrolled) => {
                  if (
                    EachEnrolled.courseId == course._id &&
                    EachEnrolled.userId == StudentId
                  ) {
                    course.isEnrolled = true;
                  }
                })}

                {course.isEnrolled ? null : (
                  <button
                    onClick={() => {
                      handleEnroll(course._id);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer
                  font-medium hover:bg-blue-700 transition"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourse;
