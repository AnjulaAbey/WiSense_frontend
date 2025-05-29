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
import { getBodyPosture, getPresence, getRespirationRate } from "../api/rateApi"; 
import supine from '../assets/supine.png'
import prone from '../assets/prone.png'
import left from '../assets/left.png'
import right from '../assets/right.png'

const postureImageMap = {
  supine: supine,
  prone: prone,
  left: left,
  right: right,
};

const Dashboard = () => {
  const [respirationRate, setRespirationRate] = useState(null);
  const [presence, setPresence] = useState('Presence');
  const [loading, setLoading] = useState(true);
  const [posture, setPosture] = useState("")

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
        console.log({posture})
        setPresence(error.posture);
      } finally {
        setLoading(false);
      }
    };
    const fetchPosture = async () => {
      try {
        const data = await getBodyPosture();
        console.log(data.posture)
        setPosture(data.posture);
      } catch (error) {
        console.error("Failed to fetch respiration rate:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Initial fetch
    fetchRespirationRate();
    fetchPresence();
    fetchPosture();
    // Set up interval
    const intervalId = setInterval(fetchRespirationRate, 10000); 
    const intervalId2 = setInterval(fetchPresence, 10000); 
    const intervalId3 = setInterval(fetchPosture, 10000); 
    
  
    // Cleanup on unmount
    return () => clearInterval(intervalId, intervalId2, intervalId3);
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

      <RateCard 
        label="Body Posture" 
        value={posture} 
        unit="" 
        icon={<UserOutlined/>}
        img={posture != "N/A" && postureImageMap[posture.toLowerCase()]} />
    </div>
  );
};

export default Dashboard;
