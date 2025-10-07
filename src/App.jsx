import React from "react";

import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../src/components/ProtectedRoutes";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentCourseDetails from "./pages/Student/CourseDetails";
import AdminDashboard from "./pages/AdminDashboard";
import InstructorDashboard from "./pages/Instructor/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MyStudents from "./pages/Instructor/MyStudents";
import MyCourse from "./pages/Instructor/MyCourse";
import ManageCourse from "./pages/Instructor/ManageCourse";
import CourseDetails from "./pages/Instructor/CourseDetails";
import AllCourse from "./pages/Student/AllCourse";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<SignUp />} />

        <Route
          path="/InsDashboard"
          element={
            <ProtectedRoutes>
              <InstructorDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/MyStudents"
          element={
            <ProtectedRoutes>
              <MyStudents />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/MyCourse"
          element={
            <ProtectedRoutes>
              <MyCourse />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/ManageCourse/:courseId"
          element={
            <ProtectedRoutes>
              <ManageCourse />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/courseDetails/:courseId"
          element={
            <ProtectedRoutes>
              <CourseDetails />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/instructor"
          element={
            <ProtectedRoutes>
              <InstructorDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoutes>
              <StudentDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/stud/courseDetails/:courseId"
          element={
            <ProtectedRoutes>
              <StudentCourseDetails />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/allCourse"
          element={
            <ProtectedRoutes>
              <AllCourse />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
