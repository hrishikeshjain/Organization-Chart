import SidebarFilter from "./SidebarFilter";
import useFormContext from "../hooks/useContext";
import Employee from "./Employee";
import "../styles/sidebar.css";

function Sidebar() {
  const { employees, loading } = useFormContext();
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
