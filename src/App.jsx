import OrgChart from "./components/OrgChart";
import Sidebar from "./components/Sidebar";
import { Splitter, SplitterPanel } from "primereact/splitter";
import "./styles/app.css";

function App() {
  return (
    <div className="main">
      <Splitter style={{ height: "calc(100vh - 40px)" }}>
        <SplitterPanel size={25} minSize={20}>
          <Sidebar />
        </SplitterPanel>
        <SplitterPanel className="org-chart-splitter" size={75} minSize={70}>
          <OrgChart />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
