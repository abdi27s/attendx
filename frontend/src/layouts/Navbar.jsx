import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
    }`;
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-gray-900">
            MyApp
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/reports" className={linkClass}>
              Reports
            </NavLink>
            <NavLink to="/users" className={linkClass}>
              Users
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/me"
              className="text-sm text-gray-600 hover:text-gray-900">
              {user?.fullname?.split(" ")[0]}
            </NavLink>

            <button
              className="text-sm rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
              onClick={logout}>
              Logout
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 text-xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>

            <NavLink
              to="/reports"
              className={linkClass}
              onClick={() => setOpen(false)}>
              Reports
            </NavLink>

            <NavLink
              to="/users"
              className={linkClass}
              onClick={() => setOpen(false)}>
              Users
            </NavLink>

            <div className="border-t pt-3 flex flex-col gap-2">
              <button className="text-left text-sm text-gray-600">
                Profile
              </button>
              <button className="text-left text-sm text-red-600">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
