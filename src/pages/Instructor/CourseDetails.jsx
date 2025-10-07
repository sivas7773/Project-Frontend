import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../api";
import Navbar from "../../components/Navbar";
import InsSidebar from "../../components/InsSideBar";
function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/course/withlessons/${courseId}`
        );
        setCourse(res.data.course);
        setLessons(res.data.lessons);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!course)
    return <p className="text-center text-red-600">Course not found</p>;
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
            <h1 className="text-2xl font-bold text-indigo-600 mb-4">
              Courses Details
            </h1>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
                {course.title}
              </h1>
              <h1 className="text-indigo-600 text-2xl font-bold mb-4">
                Rs: {course.price}
              </h1>{" "}
            </div>
            <p className="text-gray-700 text-lg mb-4">{course.description}</p>

            <p className="text-gray-700 text-lg mb-4">{course.level}</p>
            <p className="text-sm text-gray-600 italic">
              Instructor:{" "}
              <span className="font-semibold">
                {course.instructorId?.username} ({course.instructorId?.email})
              </span>
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300/50"></div>

            {/* Lessons */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lessons</h2>
            {lessons.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {lessons.map((lesson, idx) => (
                  <div
                    key={lesson._id}
                    className="p-6 rounded-xl shadow-xl 
                    backdrop-blur-md border border-white/40 
                    "
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-700 mb-3">{lesson.description}</p>

                    {lesson.contentUrl && (
                      <a
                        href={lesson.contentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-medium underline hover:text-blue-800"
                      >
                        View Content →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No lessons available for this course.
              </p>
            )}

            {/* Actions */}
            <div className="mt-10 flex gap-4">
              <button
                onClick={() => navigate("/Mycourse")}
                className="px-5 py-2 rounded-xl bg-indigo-300 text-gray-700 shadow hover:bg-gray-300 transition"
              >
                ← Back to Courses
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseDetails;
