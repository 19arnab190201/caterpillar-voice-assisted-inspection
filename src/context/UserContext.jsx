// src/context/UserContext.jsx
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  hasLoginError: false,
};

const UserContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: JSON.parse(localStorage.getItem("catInspection")) || null,
  });

  // const logout = () => {
  //   dispatch({ type: "logout" });
  // };

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
