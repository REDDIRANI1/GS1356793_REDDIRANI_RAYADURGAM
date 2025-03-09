import React from "react";
import ChartImage from "../assets/Chart.png"; // Ensure correct path
import "../css/Chart.css";

const Chart: React.FC = () => {
  return (
    <div className="chart-container">

      <img src={ChartImage} alt="Gross Margin Chart" className="chart-img" />
    </div>
  );
};

export default Chart;
