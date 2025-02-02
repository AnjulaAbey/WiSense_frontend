import React from "react";
import RateCard from "../components/rate"; // Import RateCard component
import { HeartOutlined, SafetyOutlined } from "@ant-design/icons"; // Ant Design Icons

const Dashboard = () => {
  return (
    <div className="dashboard">
      <RateCard label="Heart Rate" value={72} unit="bpm" icon={<HeartOutlined />} />
      <RateCard label="Respiration Rate" value={18} unit="breaths/min" icon={<SafetyOutlined />} />
    </div>
  );
};

export default Dashboard;
