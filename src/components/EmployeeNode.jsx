/* eslint-disable */
import { useDrag, useDrop } from "react-dnd";
import { Card } from "primereact/card";
import useOrgContext from "../hooks/useContext";
import { Avatar } from "primereact/avatar";
import "../styles/employeenode.css";

const EmployeeNode = ({ employee }) => {
  const { handleDropEmployee } = useOrgContext();
  const [{ isDragging }, drag] = useDrag({
    type: "EMPLOYEE",
    item: { id: employee?.data?.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "EMPLOYEE",
    drop: (droppedEmployee) => {
      handleDropEmployee(droppedEmployee.id, employee?.data?.id); // Pass the dropped employee and new manager IDs
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Card
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      onDragOver={(e) => e.preventDefault()}
      className="employee-card"
    >
      <div>
        <Avatar
          image={employee.data.image}
          size="large"
          shape="circle"
          className="employee-avatar"
        />
        <p className="employee-name">{employee.data.name}</p>
        <p className="employee-designation">{employee.data.designation}</p>
      </div>
    </Card>
  );
};

export default EmployeeNode;
