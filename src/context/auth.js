import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const defaultState = {
  authenticated: false,
  user: null,
  loading: true,
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

    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };

    default:
      throw new Error(`Unknown dispatch event type :- ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, defaultState);

  const dispatch = (type, payload) =>
    defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await Axios.get("/auth/me");
        dispatch("LOGIN", res.data.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("STOP_LOADING");
      }
    }
    loadUser();
  }, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
