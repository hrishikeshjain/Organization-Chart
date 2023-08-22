import { Avatar } from "primereact/avatar";
import "../styles/employee.css";

function Employee({ empDetails }) {
  return (
    <div className="employee-block">
      <Avatar
        image={empDetails.image}
        size="large"
        shape="circle"
        className="employee-avatar"
      />
      <div className="employee-name-team">
        <p className="employee-name">
          {empDetails.name}
          {empDetails.team && <span>({empDetails.team})</span>}
        </p>
        <p className="employee-designation">{empDetails.designation}</p>
      </div>
    </div>
  );
}

export default Employee;
