import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;
console.log(BASE_URL);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "register":
      toast.success(action.payload?.message || "Registration successful");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "login":
      toast.success(action.payload?.message || "Login successful");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      toast.success("Logout successful");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "error":
      toast.error(action.payload || "Something went wrong");
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, token, isAuthenticated, isLoading, error } = state;

  const register = async (userData) => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      dispatch({ type: "register", payload: response.data });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Something went wrong",
      });
      return false;
    }
  };

  const login = async (credentials) => {
    dispatch({ type: "loading" });
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      dispatch({ type: "login", payload: response.data });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Login failed",
      });
      return false;
    }
  };

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "logout" });
      return true;
    } catch (error) {
      dispatch({
        type: "error",
        payload: error.response?.data?.message || "Logout failed",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
