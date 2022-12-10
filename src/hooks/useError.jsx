import { createContext, useContext, useState } from "react";
const ErrorContext = createContext({
  errorMessage: null
});
export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState();

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};
