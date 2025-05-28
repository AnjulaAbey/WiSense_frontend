import React from "react";
import "./rate.css"; 

const RateCard = ({ label, value, unit, icon, img = "" }) => {
  return (
    <div className="rate-card">
      <div className="rate-card-content">
        <div className="rate-icon">{icon}</div>
        <div className="rate-info">
          <p className="rate-label">{label}</p>
         {img && <img style={{height: 60, width: 100}} src={img}/>}
          <p className="rate-value">
            {value} {unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateCard;
