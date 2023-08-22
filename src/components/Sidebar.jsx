import SidebarFilter from "./SidebarFilter";
import useOrgContext from "../hooks/useContext";
import Employee from "./Employee";
import "../styles/sidebar.css";

function Sidebar() {
  const { employees, loading } = useOrgContext();
  return (
    <div className="sidebar">
      <SidebarFilter />
      <div className="employee-list">
        {!loading &&
          employees.map((element, index) => {
            return <Employee empDetails={element} key={index} />;
          })}
      </div>
    </div>
  );
}

export default Sidebar;
