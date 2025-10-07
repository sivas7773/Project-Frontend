import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#a78bfa",
  "#38bdf8",
  "#f87171",
  "#34d399",
  "#facc15",
  "#fb923c",
];

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentCourseStats, setStudentCourseStats] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/user/`).then((res) => setUsers(res.data));
    axios.get(`${baseUrl}/course/`).then((res) => setCourses(res.data));
  }, []);
  const students = users.filter((user) => user.role === "student");
  const instructors = users.filter((user) => user.role === "instructor");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/student/course/stats`);
        setStudentCourseStats(res.data);
      } catch (err) {
        console.error("Error fetching student-course stats:", err);
      }
    };
    fetchStats();
  }, []);

  const navigate = useNavigate();
  console.log(studentCourseStats);
  const HandleUsers = (e) => {
    e.preventDefault();
    navigate("/UserDetails");
  };

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

        <main className="relative z-10 p-8">
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg"
              onClick={HandleUsers}
            >
              <h3>Total Users</h3>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
              <h3>Students</h3>
              <p className="text-3xl font-bold mt-2">{students.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
              <h3>Instructor</h3>
              <p className="text-3xl font-bold mt-2">{instructors.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
              <h3>Active Courses</h3>
              <p className="text-3xl font-bold mt-2">{courses.length}</p>
            </div>
          </div>
          <div className="my-5 shadow-2xl rounded-3xl p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Students per Course
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={studentCourseStats}
                  dataKey="students"
                  nameKey="course"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {studentCourseStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    border: "none",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Legend wrapperStyle={{ color: "white" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Users List */}
          <div className="mt-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl mb-4">Recent Users</h3>
            <ul className="space-y-2">
              {students.map((u) => (
                <li
                  key={u._id}
                  className="flex justify-between bg-white/5 p-2 rounded-lg"
                >
                  <span>{u.username}</span>
                  {students.enrolledCourses
                    ? students.enrolledCourses.map((c) => {
                        <span>{c?.courseId?.title}</span>;
                        <span>{c.progress}</span>;
                      })
                    : "-"}
                  <span className="text-sm text-white/70">{u.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
