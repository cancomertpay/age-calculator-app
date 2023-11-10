import { createContext, useEffect, useState } from "react";

export const AgeContext = createContext({
  userAge: {
    day: "",
    month: "",
    year: "",
  },
  handleUserBirth: (birth) => {},
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

  // handler functions
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
  };

  return (
    <AgeContext.Provider value={contextValues}>{children}</AgeContext.Provider>
  );
}
