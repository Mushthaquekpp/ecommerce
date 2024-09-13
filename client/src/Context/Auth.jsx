import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

// Creating a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold authentication information: user and token
  const [auth, setAuth] = useState({ user: null, token: "" });

  // Setting the default authorization header for axios requests
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // useEffect to retrieve and set authentication data from localStorage when component mounts
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      // Parsing the stored authentication data
      const parseData = JSON.parse(data);
      // Updating the auth state with user and token from localStorage
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // Providing auth state and updater function to the component tree
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

// Exporting the hook and provider for use in other parts of the application
export { useAuth, AuthProvider };
