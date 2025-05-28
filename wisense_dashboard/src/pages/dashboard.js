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
import { getPresence, getRespirationRate } from "../api/rateApi"; 
const Dashboard = () => {
  const [respirationRate, setRespirationRate] = useState(null);
  const [presence, setPresence] = useState('empty');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRespirationRate = async () => {
      try {
        const data = await getRespirationRate();
        setRespirationRate(parseInt(data.respiration_rate_bpm));
      } catch (error) {
        console.error("Failed to fetch respiration rate:", error);
        setRespirationRate("N/A");
      } finally {
        setLoading(false);
      }
    };
    const fetchPresence = async () => {
      try {
        const data = await getPresence();
        setPresence(data.presence);
      } catch (error) {
        console.error("Failed to fetch respiration rate:", error);
        setPresence("N/A");
      } finally {
        setLoading(false);
      }
    };
  
    // Initial fetch
    fetchRespirationRate();
    fetchPresence();
    // Set up interval
    const intervalId = setInterval(fetchRespirationRate, 10000); 
  
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="dashboard">
      <RateCard
        label="Presence"
        value={presence=="empty" ? "Absent" : "Present"}
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
