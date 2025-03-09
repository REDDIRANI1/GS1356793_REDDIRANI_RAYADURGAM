import { Link } from "react-router-dom";
import { FaStore, FaBox, FaChartBar, FaCalendar } from "react-icons/fa";
import logo from "../assets/Gsynergy Logo V2.svg"; // Import logo
import "../css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="G Synergy Logo" className="logo" />
      </div>

      {/* Navigation Items */}
      <div className="sidebar-item">
        <FaStore />
        <Link to="/store">Store</Link>
      </div>
      <div className="sidebar-item">
        <FaBox />
        <Link to="/sku">SKU</Link>
      </div>
      <div className="sidebar-item">
        <FaCalendar />
        <Link to="/planning">Planning</Link>
      </div>
      <div className="sidebar-item">
        <FaChartBar />
        <Link to="/charts">Charts</Link>
      </div>
    </div>
  );
};

export default Sidebar;
