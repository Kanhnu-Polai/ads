import { NavLink } from "react-router-dom";

function Navbar() {
  // Common classes for NavLinks to keep code clean
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className=" mx-auto px-6 h-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/admin" className={linkStyles}>
            Admin Panel
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
