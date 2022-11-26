import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import api from "../services/api";
import { clear, getUser, setUser } from "../services/database";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();

    useEffect(() =>{
        if(getUser()){
            setAuthUser(getUser())
        }
    },[])

  function doLogin({ email, password }) {
    return api.post(`login`, { email, password });
  }


  const {mutate, error,isSuccess} = useMutation(doLogin, {
    onSuccess: (data) => {
      setUser(data.user);
      setAuthUser(data.user);
    },
  });

  const login = (data) =>{
    mutate(data)
  }

  const logout = () => {
    setAuthUser(null);
    clear();
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout, error,isSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
