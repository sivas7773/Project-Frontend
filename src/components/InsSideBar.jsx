import { Link } from "react-router-dom";
import {
  BookOpen,
  PlusCircle,
  Users,
  DollarSign,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div
      className="w-64 bg-gradient-to-b from-indigo-400 to-purple-500 h-screen
     text-white p-6 space-y-10 shadow-xl"
    >
      <h1 className="text-2xl font-bold">Instructor</h1>
      <nav className="space-y-10 h-full">
        <Link
          to="/InsDashboard"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          to="/Mycourse"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <BookOpen /> My Courses
        </Link>
               
        <Link
          to="/MyStudents"
          className="flex items-center gap-3 hover:text-yellow-300"
        >
          <Users /> Students
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
