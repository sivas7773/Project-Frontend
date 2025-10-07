import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import InsSidebar from "../../components/InsSideBar";
import { baseUrl } from "../../api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ManageCourse() {
  const { courseId } = useParams(); // from route
  
  const instructorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [lessons, setLessons] = useState([
    { title: "", description: "", contentUrl: "" },
  ]);

  // ✅ If editing, load existing course + lessons
  useEffect(() => {
    if (courseId != "null") {
      axios
        .get(`${baseUrl}/course/withlessons/${courseId}`)
        .then((res) => {
          setCourse({
            title: res.data.course.title,
            description: res.data.course.description,
            price: res.data.course.price,
          });
          setLessons(
            res.data.lessons.length > 0
              ? res.data.lessons
              : [{ title: "", description: "", contentUrl: "" }]
          );
        })
        .catch((err) => console.error("Error loading course:", err));
    }
  }, [courseId]);

  // ✅ Handle field changes
  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, e) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setLessons(updatedLessons);
  };

  const addLesson = () =>
    setLessons([...lessons, { title: "", description: "", contentUrl: "" }]);

  const removeLesson = (index) =>
    setLessons(lessons.filter((_, i) => i !== index));

  // ✅ Save (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...course, instructorId: instructorId, lessons };

      if (courseId != "null") {
        await axios.put(`${baseUrl}/course/${courseId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${baseUrl}/course/${instructorId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate("/MyCourse");
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="w-full flex">
        <InsSidebar />
        <main className="overflow-y-auto flex-1">
          <div className="min-h-screen p-6 bg-gradient-to-br from-purple-200 via-blue-200 to-green-200">
            
            <div className="p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">
                {courseId != "null" ? "Edit Course" : "Create Course"}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course fields */}
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={course.title}
                  onChange={handleCourseChange}
                  className="w-full border rounded p-2"
                />
                <textarea
                  name="description"
                  placeholder="Course Description"
                  value={course.description}
                  onChange={handleCourseChange}
                  className="w-full border rounded p-2"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Course Price"
                  value={course.price}
                  onChange={handleCourseChange}
                  className="w-full border rounded p-2"
                />
                {/* Lessons */}
                <h2 className="text-xl font-semibold mt-6">Lessons</h2>
                {lessons.map((lesson, index) => (
                  <div key={index} className="border p-3 rounded mb-3">
                    <input
                      type="text"
                      name="title"
                      placeholder="Lesson Title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full border rounded p-2 mb-2"
                    />
                    <input
                      type="text"
                      name="contentUrl"
                      placeholder="Lesson Content URL"
                      value={lesson.contentUrl}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full border rounded p-2 mb-2"
                    />
                    <textarea
                      name="description"
                      placeholder="Lesson Description"
                      value={lesson.description}
                      onChange={(e) => handleLessonChange(index, e)}
                      className="w-full border rounded p-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="text-red-500 text-sm mt-2 cursor-pointer hover:text-red-700"
                    >
                      Remove Lesson
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLesson}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  + Add Lesson
                </button>

                {/* Save */}
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                  {courseId != "null" ? "Update Course" : "Create Course"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageCourse;
