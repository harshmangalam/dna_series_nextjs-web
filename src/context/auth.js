import Axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const defaultState = {
  authenticated: false,
  user: null,
  loading: false,
};

const StateContext = createContext(defaultState);

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };

    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null,
      };

    case "LOADING":
      return {
        ...state,
        loading: payload,
      };

    default:
      throw new Error(`Unknown dispatch event type :- ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, defaultState);

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function loadUser() {
      try {
        dispatch("LOADING", true);
        const res = await Axios.get("/auth/me");
        dispatch("LOGIN", res.data.data.user);
        dispatch("LOADING", true);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("LOADING", false);
      }
    }

    if (token) {
      Axios.defaults.headers.common["Authorization"] = token;
      loadUser();
    }
  }, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
