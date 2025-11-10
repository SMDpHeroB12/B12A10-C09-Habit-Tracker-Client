import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-white font-semibold bg-primary" : `${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
