import React, { useContext } from "react";
import { AgeContext } from "../store/AgeContext";

function AgeCalculator() {
  const {userAge} = useContext(AgeContext)

  return (
    <div className="age-calculator">
      <div className="age-results">
        <span>{userAge.year ? userAge.year : "--"}</span> years
      </div>
      <div className="age-results">
        <span>{userAge.month ? userAge.month : "--"}</span> months
      </div>
      <div className="age-results">
        <span>{userAge.day ? userAge.day : "--"}</span> days
      </div>
    </div>
  );
}

export default AgeCalculator;
