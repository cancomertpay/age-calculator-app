import { createContext, useEffect, useState } from "react";

export const AgeContext = createContext({
  userAge: {
    day: "",
    month: "",
    year: "",
  },
  handleUserBirth: (birth) => {},
  hasError: false,
  dayErrorHandler: (day) => {},
  monthErrorHandler: (month) => {},
  yearErrorHandler: (year) => {},
  clearError: () => {},
  toggleSuccess: (boolean) => {},
  isSuccess: false
});

export default function AgeContextProvider({ children }) {
  // states
  const [userBirth, setUserBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [userAge, setUserAge] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  // handler functions
  function toggleSuccess(boolean) {
    setIsSuccess(boolean)
  }

  function dayErrorHandler(day) {
    if (day.trim() === "") {
      setError((prev) => ({
        ...prev,
        dayError: {
          id: "day",
          isEmpty: true,
          msg: "This field required"
        },
      }));
    } else if (day <= 0 || day > 31) {
      setError((prev) => ({
        ...prev,
        dayError: {
          id: "day",
          isInvalid: true,
          msg: "Must be a valid day"
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
          msg: "This field is required"
        }
      }));
    } else if (month <= 0 || month > 12) {
      setError((prev) => ({
        ...prev,
        monthError: {
          id: "month",
          isInvalid: true,
          msg: "Must be a valid month"
        }
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
          msg: "This field is required"
        },
      }));
    } else if (year < 1000) {
      setError((prev) => ({
        ...prev,
        yearError: {
          id: "year",
          isInvalid: true,
          msg: "Must be a valid year"
        },
      }));
    } else if (year > currentYear) {
      setError((prev) => ({
        ...prev,
        yearError: {
          id: "year",
          isPast: true,
          msg: "Must be in the past"
        },
      }));
    }
  }

  function clearError(id) {
    if(id === "day") {
      setError(prev => ({
        ...prev,
        dayError: false
      }))
    }
    if(id === "month") {
      setError(prev => ({
        ...prev,
        monthError: false
      }))
    }
    if(id === "year") {
      setError(prev => ({
        ...prev,
        yearError: false
      }))
    }
  }

  function handleUserBirth(enteredBirth) {
    setUserBirth({
      day: enteredBirth.day,
      month: enteredBirth.month,
      year: enteredBirth.year,
    });
  }

  function CalculateAge() {
    const birthDate = new Date(
      `${userBirth.month} ${userBirth.day}, ${userBirth.year}`
    );
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - birthDate;

    const years = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );
    const remainingMilliseconds =
      ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000);

    const months = Math.floor(
      remainingMilliseconds / (30.44 * 24 * 60 * 60 * 1000)
    );
    const remainingMillisecondsInMonth =
      remainingMilliseconds % (30.44 * 24 * 60 * 60 * 1000);

    const days = Math.floor(
      remainingMillisecondsInMonth / (24 * 60 * 60 * 1000)
    );

    setUserAge({
      day: days,
      month: months,
      year: years,
    });
  }

  useEffect(() => {
    CalculateAge();
  }, [userBirth]);

  const contextValues = {
    userAge,
    handleUserBirth,
    hasError: error,
    dayErrorHandler,
    monthErrorHandler,
    yearErrorHandler,
    clearError,
    toggleSuccess,
    isSuccess
  };

  return (
    <AgeContext.Provider value={contextValues}>{children}</AgeContext.Provider>
  );
}
