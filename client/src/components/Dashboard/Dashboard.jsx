import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ flexGrow: 4, border: "1px solid red" }}>
      <Outlet />
    </div>
  );
};

export default Dashboard;
