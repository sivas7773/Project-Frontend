import React from "react";
import { baseUrl } from "../../api";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import InsSidebar from "../../components/InsSidebar";


function MyStudents() {
  const [students, setStudents] = useState([]);
  const instructorId = localStorage.getItem("userId");
  
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/student/${instructorId}`);
      console.log(res.data.students);
      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-full flex">
        <InsSidebar />
        <main className="grow">
          <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Students List</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Enrolled Courses</th>
                  <th className="p-3 text-left">Progress</th>
                  
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id} className="border-b">
                      <td className="p-3">{student.username}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">
                        {student.courses.length === 0
                          ? "—"
                          : student.courses.map((c) => c.title).join(", ")}
                      </td>
                      <td className="p-3">
                        {student.courses.length === 0
                          ? "—"
                          : student.courses
                              .map((c) => `${c.progress}%`)
                              .join(", ")}
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyStudents;
