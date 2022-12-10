import { createContext, useContext, useState } from "react";
const SuccessContext = createContext({
  successMessage: null
});
export const SuccessProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState();

  return (
    <SuccessContext.Provider value={{ successMessage, setSuccessMessage }}>
      {children}
    </SuccessContext.Provider>
  );
};

export const useSuccess = () => {
  return useContext(SuccessContext);
};
