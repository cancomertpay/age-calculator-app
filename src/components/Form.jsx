import React, { useContext, useState } from "react";
import Input from "./UI/Input";
import { AgeContext } from "../store/AgeContext";
import ArrowButton from "./UI/ArrowButton";

function Form() {
  const ageCtx = useContext(AgeContext);

  const [userBirth, setUserBirth] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [onSuccess, setOnSuccess] = useState(false);

  function handleChange(inputName, event) {
    let newValue = event.target.value;

    if (isNaN(newValue) || +newValue < 0) {
      return;
    }

    if (inputName === "day" || inputName === "month") {
      if (newValue.length > 1 && newValue.startsWith("0")) {
        newValue = newValue.slice(1);
      }

      if (newValue.length === 1) {
        newValue = "0" + newValue;
      }
    }

    setUserBirth((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));

    ageCtx.clearError(inputName);
  }

  function handleBlur(id) {
    // Error handlers
    if (id === "day") {
      ageCtx.dayErrorHandler(userBirth.day);
    }
    if (id === "month") {
      ageCtx.monthErrorHandler(userBirth.month);
    }
    if (id === "year") {
      ageCtx.yearErrorHandler(userBirth.year);
    }
  }

  function handleSubmit(day, month, year) {
    // Error handlers will also work on the submit event.
    if (day === "day") {
      ageCtx.dayErrorHandler(userBirth.day);
    }
    if (month === "month") {
      ageCtx.monthErrorHandler(userBirth.month);
    }
    if (year === "year") {
      ageCtx.yearErrorHandler(userBirth.year);
    }

    // on submit
    if (
      ageCtx.hasError.dayError ||
      ageCtx.hasError.monthError ||
      ageCtx.hasError.yearError
    ) {
      return;
    } else {
      ageCtx.handleUserBirth(userBirth);
      setOnSuccess(true);
      ageCtx.toggleSuccess(onSuccess)
    }
  }

  const inputPlaceholder = {
    day: "DD",
    month: "MM",
    year: "YYYY",
  };

  return (
    <>
      <div className="form">
        {Array("day", "month", "year").map((item, index) => (
          <Input
            key={index}
            id={item}
            onChange={() => handleChange(item, event)}
            onBlur={() => handleBlur(item)}
            hasError={ageCtx.hasError}
            value={userBirth[item]}
            placeholder={inputPlaceholder[item]}
          />
        ))}
      </div>
      <ArrowButton onClick={() => handleSubmit("day", "month", "year")} />
    </>
  );
}

export default Form;
