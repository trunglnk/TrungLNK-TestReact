import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../contains/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const authContext = createContext({ isAuthenticated: false });

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true); 
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const [redbook, iucn, kingdom, phylum, CLASS, order, family, genus] =
          await Promise.all([
            axios.get(Api.redbook),
            axios.get(Api.iucn),
            axios.get(Api.kingdom, config),
            axios.get(Api.phylum, config),
            axios.get(Api.CLASS, config),
            axios.get(Api.order, config),
            axios.get(Api.family, config),
            axios.get(Api.genus, config),
          ]);

        sessionStorage.setItem("redbook", JSON.stringify(redbook.data));
        sessionStorage.setItem("iucn", JSON.stringify(iucn.data));
        sessionStorage.setItem("kingdom", JSON.stringify(kingdom.data));
        sessionStorage.setItem("phylum", JSON.stringify(phylum.data));
        sessionStorage.setItem("CLASS", JSON.stringify(CLASS.data));
        sessionStorage.setItem("order", JSON.stringify(order.data));
        sessionStorage.setItem("family", JSON.stringify(family.data));
        sessionStorage.setItem("genus", JSON.stringify(genus.data));

        setIsChecking(false);
        setIsAuthenticated(true);
      } catch (error) {
        Logout();
      }
    };

    if (token) {
      getData();
    } else {
      setIsChecking(false);
    }

    if (token) {
      navigate("/species");
    } else {
      getData();
    }
  }, [token]);

  const getMe = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(Api.apiMe, config);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      Logout();
    }
  };

  const Login = async (data) => {
    if (isAuthenticated) {
      navigate("/species");
      return;
    }
    try {
      const response = await axios.post(Api.login, data);
      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem("token", token);
      await getMe(token);
      setIsAuthenticated(true);
      navigate("/species");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const Logout = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(Api.logout, token, config);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      setToken(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        isChecking,
        Login,
        Logout,
        token,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
