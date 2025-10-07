import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../api";
import Navbar from "../../components/Navbar";

function CourseDetails() {
  const { courseId } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [EnrolledCourse, setEnrolledCourse] = useState([]);
  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/course/withlessons/${courseId}`
        );
        setCourse(res.data.course);
        setLessons(res.data.lessons);

        const AlreadyEnrolled = await axios.get(
          `${baseUrl}/enrolled/${userId}`
        );

        setEnrolledCourse(AlreadyEnrolled.data);
      } catch (err) {
        console.error("Error fetching course:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`${baseUrl}/student/me/${userId}`);
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student:", err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchStudent();

  if (EnrolledCourse) {
    // console.log(EnrolledCourse);
    EnrolledCourse.map((EachEnrolled) => {
      if (EachEnrolled.courseId === courseId) {
        course.isEnrolled = true;
      }
    });
  }

  //console.log(lessons);
  if (student.completedLessons?.length > 0) {
    student.completedLessons.map((EachCompleted) => {
      lessons.map((EachLesson) => {
        if (EachCompleted._id === EachLesson._id) {
          EachLesson.isCompleted = true;
        }
      });
    });
  }
  const markCompleted = async (lessonId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/user/${userId}/course/${courseId}/lesson/${lessonId}`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchStudent();
      alert("✅ Lesson completed!");
    } catch (err) {
      console.error("Error marking completed:", err.message);
    }
  };

  if (loading) return <p className="text-center text-white-600">Loading...</p>;

  if (!course)
    return <p className="text-center text-red-600">Course not found</p>;

  return (
    <div>
      <Navbar />

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
            <h1 className="text-2xl font-bold text-white-600 mb-4 text-center p-5">
              Courses Details
            </h1>
            <div className="relative z-10 p-8  border border-white/30 shadow-xl rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-white-900 mb-4 drop-shadow-sm">
                  {course.title}
                </h1>

                <h3 className="font-semibold text-white">
                  Instructor: {course.instructorId?.username} (
                  {course.instructorId?.email})
                </h3>
              </div>

              <div className="flex justify-between">
                <p className="text-white-700 text-lg mb-4">
                  {course.description}
                </p>

                <p className="text-sm text-white-600 italic"> </p>
                <h1 className="text-white-600 text-2xl font-bold mb-4">
                  Rs: {course.price}
                </h1>
              </div>
            </div>
            {/* Divider */}
            {/* <div className="my-6 border-t border-white-300/50"></div> */}

            {/* Lessons */}
            <h2 className="text-2xl font-bold text-white-800 mb-4 p-5">
              Lessons
            </h2>
            {lessons.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {lessons.map((lesson, idx) => (
                  <div
                    key={lesson._id}
                    className="p-6 rounded-xl shadow-xl 
                    backdrop-blur-md border border-white/40 
                    "
                  >
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold text-white-900 mb-2">
                        {lesson.title}
                      </h3>

                      {course.isEnrolled && !lesson.isCompleted ? (
                        <button
                          className="px-2 py-3 rounded-lg text-xl cursor-pointer
                    text-white font-semibold hover:bg-green-700 transition"
                          onClick={() => markCompleted(lesson._id)}
                        >
                          ✅
                        </button>
                      ) : null}
                    </div>
                    <p className="text-white-700 mb-3">{lesson.description}</p>

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
                {/* Status Message */}
                {message && <p className="mt-4">{message}</p>}
              </div>
            ) : (
              <p className="text-white-500 italic">
                No lessons available for this course.
              </p>
            )}

            {/* Actions */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseDetails;
