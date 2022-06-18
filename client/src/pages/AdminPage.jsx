import { Sidebar, Dashboard } from "../components";

const AdminPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminPage;
