import React, { useContext } from "react";
import iconArrow from "../../assets/images/icon-arrow.svg";
import { AgeContext } from "../../store/AgeContext";
import iconSuccess from "../../assets/images/icon-success.svg";

function ArrowButton({ ...props }) {
  const { isSuccess } = useContext(AgeContext);

  return (
    <div className={`arrow-button`} {...props}>
      <img src={isSuccess ? iconSuccess : iconArrow} width={"65px"} alt="arrow-icon" />
    </div>
  );
}

export default ArrowButton;
