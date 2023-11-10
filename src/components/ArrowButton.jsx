import React, { useContext, useEffect } from "react";
import { AgeContext } from "../store/AgeContext";

// icons
import iconArrow from "../assets/images/icon-arrow.svg";
import iconSuccess from "../assets/images/icon-success.svg";
import iconError from "../assets/images/icon-error.svg";

function ArrowButton({ ...props }) {
  const { isSuccess } = useContext(AgeContext);

  function handleSuccess() {
    const buttonIcon = isSuccess ? iconSuccess : iconError;
    return buttonIcon;
  }

  useEffect(() => {
    handleSuccess();
  }, [isSuccess]);

  return (
    <div
      className={`button 
      ${isSuccess !== null && !isSuccess ? "button-error" : ""} 
      ${isSuccess !== null && isSuccess ? "button-success" : ""}
      `}
      {...props}
    >
      <img
        src={isSuccess === null ? iconArrow : handleSuccess()}
        alt="arrow-icon"
      />
    </div>
  );
}

export default ArrowButton;
