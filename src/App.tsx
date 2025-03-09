import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StoreTable from "./components/StoreTable";
import PlanTable from "./components/PlanTable";
import Chart from "./components/Chart";
import SkuTable from "./components/SkuTable";
import NewStore from "./components/NewStore";
import NewSku from "./components/NewSku";

const App = () => {
  return (
    <Router>
      <div className="app flex"
     >
        <Sidebar /> {/* Sidebar remains on the left */}

        <div className="content-container flex flex-col w-full p-6">
          {/* Main Content */}
          <div className="content"
             >
            <Routes>
              <Route path="/" element={<Navigate to="/store" replace />} />
              <Route path="/store" element={<StoreTable />} />
              <Route path="/new-store" element={<NewStore />} />
              <Route path="/sku-table" element={<SkuTable />} />
              <Route path="/sku" element={<SkuTable />} />
              <Route path="/new-sku" element={<NewSku />} />
              <Route path="/planning" element={<PlanTable />} />
              <Route path="/charts" element={<Chart />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
