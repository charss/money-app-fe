import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const NAVIGATIONS = [
    {
      id: 1,
      title: "Dashboard",
      url: "/",
    },
    {
      id: 2,
      title: "Groups",
      url: "/groups/",
    },
    {
      id: 3,
      title: "Panelists",
      url: "/panelists/",
    },
    {
      id: 4,
      title: "Students",
      url: "/students/",
    },
    {
      id: 5,
      title: "Schedules",
      url: "/schedules/",
    },
    {
      id: 6,
      title: "Gradesheets",
      url: "/gradesheets/",
    },
    {
      id: 7,
      title: "Rubrics",
      url: "/rubrics/",
    },
  ];

  return (
    <div className="flex flex-row gap-x-8 fixed h-10 bg-sky-900 w-full items-center">
      <NavLink to="/" end>
        <span>Home</span>
      </NavLink>
      <NavLink to="/accounts/">
        <span>Accounts</span>
      </NavLink>
      <NavLink to="/categories/" end>
        <span>Categories</span>
      </NavLink>
      <NavLink to="/transactions/" end>
        <span>Transactions</span>
      </NavLink>
    </div>
  );
}

export default Navbar;