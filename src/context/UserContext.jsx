// src/context/UserContext.jsx
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  hasLoginError: false,
};

const UserContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      const { username, password, token } = action.payload;
      if (validateCredentials(username, password)) {
        return {
          ...state,
          hasLoginError: false,
          user: { username, token }, // assign user and token here
        };
      }
      return {
        ...state,
        hasLoginError: true,
        user: null,
      };
    }
    case "logout":
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const login = (username, password) => {
    // Assume validateCredentials returns a token if valid
    const token = validateCredentials(username, password);
    if (token) {
      dispatch({ type: "login", payload: { username, password, token } });
    } else {
      dispatch({ type: "login", payload: { username, password } });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
