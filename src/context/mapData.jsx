const mapFunction = (employees) => {
  const mappedOutput = employees.reduce((result, item) => {
    const managerId = item.manager;
    const itemId = item.id;
    if (managerId === itemId) {
      result["head"] = itemId;
      return result;
    }
    if (!result[managerId]) {
      result[managerId] = [];
    }

    result[managerId].push(itemId);

    return result;
  }, {});
  return [
    { ...addAllChildrenDFS(employees, mappedOutput, mappedOutput["head"]) },
  ];
};

const addAllChildrenDFS = (employees, mappedOutput, employeeId) => {
  const employee = employees.find((element) => element.id === employeeId);
  let orgChartNode = {};
  orgChartNode["label"] = employee.name;
  orgChartNode["expanded"] = true;
  orgChartNode["data"] = employee;
  if (!mappedOutput[employeeId]) {
    return orgChartNode;
  }

  orgChartNode["children"] = [];
  const employeesUnderThisEmployeeId = mappedOutput[employeeId];

  for (let i = 0; i < employeesUnderThisEmployeeId.length; i++) {
    orgChartNode["children"].push(
      addAllChildrenDFS(
        employees,
        mappedOutput,
        employeesUnderThisEmployeeId[i]
      )
    );
  }
  return orgChartNode;
};

export default mapFunction;
