import { useNavigate } from "react-router-dom";
import { getLoggedOutUser } from "utils/helpers/authUtils";

function App() {
  const navigate = useNavigate();
  return (
    <div
      className="text-left p-3 text-white mb-3 d-flex justify-content-between"
      style={{ backgroundColor: "#0db9be", fontSize: 18 }}
    >
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        My App
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          getLoggedOutUser();
        }}
      >
        Logout
      </div>
    </div>
  );
}

export default App;
