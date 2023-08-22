const mapFunction = (data) => {
  const mappedOutput = data.reduce((result, item) => {
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

  const find = (data, id) => {
    return data.find((ele) => ele.id === id);
  };

  const addAllChildrenDFS = (mappedOutput, employeeId) => {
    const employee = find(data, employeeId);
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
        addAllChildrenDFS(mappedOutput, employeesUnderThisEmployeeId[i])
      );
    }
    return orgChartNode;
  };
  return [{ ...addAllChildrenDFS(mappedOutput, mappedOutput["head"]) }];
};

export default mapFunction;
