import React, { useEffect, useState } from "react";
import RateCard from "../components/rate";
import "./dashboard.css";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getRespirationRate } from "../api/rateApi"; 
const Dashboard = () => {
  const [respirationRate, setRespirationRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRespirationRate = async () => {
      try {
        const data = await getRespirationRate();
        setRespirationRate(parseFloat(data.respiration_rate_bpm).toFixed(1)); 
      } catch (error) {
        console.error("Failed to fetch respiration rate:", error);
        setRespirationRate("N/A");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRespirationRate();
  }, []);
  

  return (
    <div className="dashboard">
      <RateCard
        label="Presence"
        value={false ? "Absent" : "Present"}
        unit=""
        icon={
          false ? (
            <CloseCircleTwoTone twoToneColor="#999" />
          ) : (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          )
        }
      />

      <RateCard label="Heart Rate" value={72} unit="bpm" icon={<HeartOutlined />} />

      <RateCard
        label="Respiration Rate"
        value={loading ? "Loading..." : respirationRate}
        unit={loading || respirationRate === "N/A" ? "" : "breaths/min"}
        icon={<SafetyOutlined />}
      />

      <RateCard label="Body Posture" value={"Supine"} unit="" icon={<UserOutlined />} />
    </div>
  );
};

export default Dashboard;
