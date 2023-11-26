// Inside Dashboard.jsx
import { useParams, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const { user_id } = useParams();
  const { username } = location.state;

  // Now, you can use user_id and username as needed in your component

  return (
    <div>
      <h1 className="text-white">Welcome, {username}!</h1>
      {/* Other dashboard content */}
    </div>
  );
}

export default Dashboard;
