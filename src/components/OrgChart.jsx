import { OrganizationChart } from "primereact/organizationchart";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useOrgContext from "../hooks/useContext";
import EmployeeNode from "./EmployeeNode";
import "../styles/orgchart.css";

function OrgChart() {
  const { orgChartData } = useOrgContext();

  const renderEmployeeNode = (node) => (
    <EmployeeNode key={node.data} employee={node} />
  );

  return (
    <div className="org-chart">
      <DndProvider backend={HTML5Backend}>
        {orgChartData && orgChartData.length != 0 && (
          <OrganizationChart
            value={orgChartData}
            nodeTemplate={renderEmployeeNode}
          />
        )}
      </DndProvider>
    </div>
  );
}

export default OrgChart;
