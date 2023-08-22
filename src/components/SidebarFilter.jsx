import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import useEmployeeContext from "../hooks/useContext";
import "../styles/SidebarFilter.css";

function SidebarFilter() {
  const { filters, handleChange, teamOptions } = useEmployeeContext();

  return (
    <>
      <span className="p-input-icon-left p-input-icon-right w-full">
        <i className="pi pi-search w-1rem" />
        <InputText
          value={filters.employeeName}
          placeholder="Search"
          className="sidebar-input-filter"
          name="employeeName"
          onInput={handleChange}
        />
      </span>
      <span className="p-input-icon-left w-full">
        <i className="pi pi-filter z-1" />
        <MultiSelect
          value={filters.selectedTeams}
          onChange={handleChange}
          options={teamOptions}
          optionLabel="name"
          name="selectedTeams"
          filter
          placeholder="Select Teams"
          className="employee-dropdown"
        />
      </span>
    </>
  );
}

export default SidebarFilter;
