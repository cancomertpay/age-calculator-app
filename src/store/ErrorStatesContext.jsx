import { createContext, useEffect, useState } from "react";

export const ErrorStatesContext = createContext({
  hasError: false,
  dayErrorHandler: (day) => {},
  monthErrorHandler: (month) => {},
  yearErrorHandler: (year) => {},
  clearError: () => {},
  toggleSuccess: () => {},
  isSuccess: null,
  clearSucces: () => {},
});

export default function ErrorStatesContextProvider({ children }) {
  // states
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  // error handlers
  function dayErrorHandler(day) {
    if (day.trim() === "") {
      setError((prev) => ({
        ...prev,
        dayError: {
          id: "day",
          isEmpty: true,
          msg: "This is field required",
        },
      }));
    } else if (day <= 0 || day > 31) {
      setError((prev) => ({
        ...prev,
        dayError: {
          id: "day",
          isInvalid: true,
          msg: "Must be a valid day",
        },
      }));
    }
  }

  function monthErrorHandler(month) {
    if (month.trim() === "") {
      setError((prev) => ({
        ...prev,
        monthError: {
          id: "month",
          isEmpty: true,
          msg: "This field is required",
        },
      }));
    } else if (month <= 0 || month > 12) {
      setError((prev) => ({
        ...prev,
        monthError: {
          id: "month",
          isInvalid: true,
          msg: "Must be a valid month",
        },
      }));
    }
  }

  function yearErrorHandler(year) {
    const currentYear = new Date().getUTCFullYear();
    if (year.trim() === "") {
      setError((prev) => ({
        ...prev,
        yearError: {
          id: "year",
          isEmpty: true,
          msg: "This field is required",
        },
      }));
    } else if (year < 1000) {
      setError((prev) => ({
        ...prev,
        yearError: {
          id: "year",
          isInvalid: true,
          msg: "Must be a valid year",
        },
      }));
    } else if (year > currentYear) {
      setError((prev) => ({
        ...prev,
        yearError: {
          id: "year",
          isPast: true,
          msg: "Must be in the past",
        },
      }));
    }
  }

  function clearError(id) {
    if (id === "day") {
      setError((prev) => ({
        ...prev,
        dayError: false,
      }));
    }
    if (id === "month") {
      setError((prev) => ({
        ...prev,
        monthError: false,
      }));
    }
    if (id === "year") {
      setError((prev) => ({
        ...prev,
        yearError: false,
      }));
    }
  }

  // success handlers
  function toggleSuccess() {
    if (error === false) {
      setIsSuccess(null);
    } else if (error.dayError || error.monthError || error.yearError) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  }

  function clearSucces() {
    setIsSuccess(null);
  }

  useEffect(() => {
    toggleSuccess();
  }, [error]);

  const contextValue = {
    hasError: error,
    dayErrorHandler,
    monthErrorHandler,
    yearErrorHandler,
    clearError,
    toggleSuccess,
    isSuccess,
    clearSucces,
  };

  return (
    <ErrorStatesContext.Provider value={contextValue}>
      {children}
    </ErrorStatesContext.Provider>
  );
}
