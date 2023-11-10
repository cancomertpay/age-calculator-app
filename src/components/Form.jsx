import React, { useContext, useState } from "react";
import Input from "./Input";
import { AgeContext } from "../store/AgeContext";
import ArrowButton from "./ArrowButton";
import { ErrorStatesContext } from "../store/ErrorStatesContext";

function Form() {
  const ageCtx = useContext(AgeContext);
  const errorCtx = useContext(ErrorStatesContext);

  const [userBirth, setUserBirth] = useState({
    day: "",
    month: "",
    year: "",
  });

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

    errorCtx.clearError(inputName);
  }

  function handleBlur(id) {
    // Error handlers
    if (id === "day") {
      errorCtx.dayErrorHandler(userBirth.day);
    }
    if (id === "month") {
      errorCtx.monthErrorHandler(userBirth.month);
    }
    if (id === "year") {
      errorCtx.yearErrorHandler(userBirth.year);
    }
  }

  function handleSubmit(day, month, year) {
    // Error handlers will also work on the submit event.
    if (day === "day") {
      errorCtx.dayErrorHandler(userBirth.day);
    }
    if (month === "month") {
      errorCtx.monthErrorHandler(userBirth.month);
    }
    if (year === "year") {
      errorCtx.yearErrorHandler(userBirth.year);
    }

    // on submit
    if (
      errorCtx.hasError.dayError ||
      errorCtx.hasError.monthError ||
      errorCtx.hasError.yearError
    ) {
      return;
    } else {
      errorCtx.clearSucces();
      ageCtx.handleUserBirth(userBirth);
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
            hasError={errorCtx.hasError}
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
