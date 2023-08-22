import { useState, useEffect, createContext } from "react";
import { useGetQuery } from "../hooks/useGetQuery";
import mapFunction from "./mapData";

const OrgContext = createContext({});

const REACT_APP_BASE_URL = "http://localhost:5173";
export const OrgProvider = ({ children }) => {
  const {
    data: allEmployeeList,
    mappedData,
    loading,
    error,
  } = useGetQuery(`${REACT_APP_BASE_URL}/employees`, mapFunction);

  const [employees, setEmployees] = useState([]);
  const [orgChartData, setOrgChartData] = useState([]);
  const [teamOptions, setTeamOption] = useState([]);
  const [filters, setFilters] = useState({
    employeeName: "",
    selectedTeams: null,
  });

  useEffect(() => {
    let uniqueTeams = new Set();
    if (!loading) {
      let teamOption = [];
      allEmployeeList.forEach((element) => {
        if (element.team) uniqueTeams.add(element.team);
      });
      uniqueTeams.forEach((element) => {
        teamOption.push({ name: element, code: element });
      });
      setTeamOption([...teamOption]);
      setEmployees(allEmployeeList);
      setOrgChartData(mappedData);
    }
  }, [loading]);

  const containsString = (str1, str2) => {
    return str1
      .toString()
      .toLowerCase()
      .includes(str2.toString().toLowerCase().trim());
  };

  const addAllManagers = (employee, employeeManagerId, isEmployeeVisited) => {
    if (isEmployeeVisited[employee.id]) {
      return [];
    }
    isEmployeeVisited[employee.id] = true;
    let allManagers = [employee];
    const employeeManager = allEmployeeList.find(
      (element) => element.id === employeeManagerId
    );
    if (employee.id === employeeManagerId) {
      return allManagers;
    }
    return [
      ...allManagers,
      ...addAllManagers(
        employeeManager,
        employeeManager.manager,
        isEmployeeVisited
      ),
    ];
  };

  const filterOrgChart = (filteredEmployees) => {
    let isEmployeeVisited = {};
    let filteredEmployeesForOrgChart = [];
    filteredEmployees.forEach((employee) => {
      const employees = addAllManagers(
        employee,
        employee.manager,
        isEmployeeVisited
      );
      filteredEmployeesForOrgChart = [
        ...filteredEmployeesForOrgChart,
        ...employees,
      ];
    });
    return filteredEmployeesForOrgChart;
  };

  const applyFilter = (filters) => {
    const filteredEmployees = allEmployeeList.filter((element) => {
      const filterByName =
        filters.employeeName === ""
          ? true
          : containsString(element.name, filters.employeeName);
      let filterByTeam =
        filters.selectedTeams == null || filters.selectedTeams.length === 0
          ? true
          : false;
      if (filters.selectedTeams && filters.selectedTeams.length != 0) {
        filters.selectedTeams.forEach((value) => {
          if (value.name === element.team) {
            filterByTeam = true;
          }
        });
      }
      return filterByName && filterByTeam;
    });

    setEmployees(filteredEmployees);
    setOrgChartData(mapFunction(filterOrgChart(filteredEmployees)));
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    applyFilter(updatedFilters);
  };

  const updateManagerId = async (body) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/employee`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropEmployee = (employeeId, newManagerId) => {
    const employee = employees.find((employee) => employee.id === employeeId);
    if (employee.manager != newManagerId && newManagerId !== employeeId) {
      let updatedEmployees = employees;
      let index = employees.findIndex((employee) => employee.id === employeeId);
      updatedEmployees[index].manager = newManagerId;
      setOrgChartData(mapFunction(filterOrgChart(updatedEmployees)));
      updateManagerId({ employeeId: employeeId, managerId: newManagerId });
    }
  };

  return (
    <OrgContext.Provider
      value={{
        employees,
        handleChange,
        handleDropEmployee,
        orgChartData,
        teamOptions,
        filters,
        loading,
        error,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export default OrgContext;
