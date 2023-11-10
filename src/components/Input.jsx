import React from "react";
import FormError from "./FormError";

function Input({ id, value, hasError, ...props }) {

  const {dayError} = hasError;
  const {monthError} = hasError;
  const {yearError} = hasError;

  const isErrorInDay = id === dayError?.id;
  const isErrorInMonth = id === monthError?.id;
  const isErrorInYear = id === yearError?.id;
  
  return (
    <div className="inputs">
      <div className="input-group">
        <label
          htmlFor={id}
          className={`input-label ${isErrorInDay || isErrorInMonth || isErrorInYear ? "error" : ""}`}
        >
          {id.toUpperCase()}
        </label>
        <input
          id={id}
          value={value}
          type="text"
          className={`input ${isErrorInDay || isErrorInMonth || isErrorInYear ? "error-input" : ""}`}
          {...props}
        />
      </div>
      {/* day errors */}
      {isErrorInDay && <FormError msg={dayError.msg} /> }

      {/* month errors */}
      {isErrorInMonth && <FormError msg={monthError.msg} /> }

      {/* year errors */}
      {isErrorInYear && <FormError msg={yearError.msg} />}
    </div>
  );
}

export default Input;
