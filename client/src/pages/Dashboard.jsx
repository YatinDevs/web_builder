import CustomizeTemplate from "@/components/CustomizeTemplate/CustomizeTemplate";
import TemplateSelector from "@/components/TemplateSelector/TemplateSelector";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-around items-center m-2">
        <h1 className="text-2xl">Welcome {user?.username}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <TemplateSelector />
      <CustomizeTemplate />
    </div>
  );
};

export default Dashboard;
