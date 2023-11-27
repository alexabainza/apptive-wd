// Inside Dashboard.jsx
import { useParams, useLocation } from "react-router-dom";
import Folders from "./Folders";
import UserNavbar from "./UserNavbar";

function Dashboard() {
  const location = useLocation();
  const { user_id } = useParams();
  const { username } = location.state;

  return (
    <div className="user-dashboard mt-0 border border-white">
      <UserNavbar username={username} user_id={user_id}/>
      <h1 className="text-white justify-content-start align-items-start mb-0">Welcome, {username}!</h1>
      <h2 className="text-white">Your folders</h2>
      <Folders user_id={user_id}/>
      {/* Other dashboard content */}
    </div>
  );
}

export default Dashboard;
