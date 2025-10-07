import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../api";

function Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem("userId");
    const fetchStudent = async () => {
      try {
        // Example API: get student with enrolled courses, progress & lastLesson
        const res = await axios.get(`${baseUrl}/student/me/${studentId}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  if (loading)
    return <p className="text-center text-white-600">Loading dashboard...</p>;
  if (!student)
    return <p className="text-center text-red-600">Student not found</p>;

  // Assume backend sends `lastLesson` like:
  // { _id, title, courseId: { _id, title } }
  // const lastLesson = student.lastLesson;

  return (
    <div>
      <Navbar />
      {/* <div className="w-full flex">
        <Sidebar /> */}
      <main className="overflow-y-auto flex-1">
        <div
          className="min-h-screen bg-cover bg-center relative text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative z-10 p-8  border border-white/30 shadow-xl rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
              Welcome, {student.username}
              <p className="text-white-200">({student.email})</p>
            </h1>

            <div className=" border border-white/30 shadow-xl rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white-900 mb-6">
                Courses
              </h2>

              {student.enrolledCourses?.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {student.enrolledCourses.map((enrolled) => (
                    <div
                      key={enrolled.courseId._id}
                      className="p-6 rounded-xl cursor-pointer shadow-lg bg-white/30 backdrop-blur-md border border-white/40 hover:shadow-2xl transition"
                      onClick={() => {
                       navigate(`/stud/courseDetails/${enrolled.courseId._id}`);
                      }}
                    >
                      <h3 className="text-xl font-bold text-white-900 mb-2">
                        {enrolled.courseId.title}
                      </h3>
                      <p className="text-white-700 mb-3">
                        {enrolled.courseId.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div
                          className="bg-indigo-600 h-3 rounded-full"
                          style={{ width: `${enrolled.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-white-600 mb-3">
                        Progress: {enrolled.progress}%
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white-500 italic">
                  You are not enrolled in any courses yet.
                </p>
              )}
            </div>

            <div className="  border border-white/30 shadow-xl rounded-2xl p-8 my-5">
              <h2 className="text-2xl font-semibold text-white-900 mb-6">
                Completed Lessons
              </h2>

              {student.completedLessons?.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {student.completedLessons.map((lesson, idx) => (
                    <div
                      key={lesson._id}
                      className="p-4 rounded-xl shadow-md bg-white/30 backdrop-blur-md border border-white/40 hover:shadow-xl transition"
                    >
                      <h3 className="text-lg font-semibold text-white-900 mb-1">
                        {idx + 1}. {lesson.title}
                      </h3>
                      <p className="text-sm text-white-700 mb-2">
                        {lesson.description}
                      </p>
                      {lesson.contentUrl && (
                        <a
                          href={lesson.contentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 font-medium underline hover:text-indigo-800 text-sm"
                        >
                          View Content →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white-500 italic">
                  No lessons completed yet.
                </p>
              )}
            </div>
          </div>{" "}
        </div>{" "}
      </main>
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
