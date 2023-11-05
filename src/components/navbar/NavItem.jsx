import { NavLink } from "react-router-dom";

export default function NavItem({ text, link }) {
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending, isTransitioning }) => {
        return (
          [
            isPending ? "pending" : "",
            isActive ? "bg-slate-200/10 rounded-md" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ") + "text-slate-200 px-5 py-2 font-medium"
        );
      }}
    >
      <span>{text}</span>
    </NavLink>
  );
}
