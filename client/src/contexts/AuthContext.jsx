import { useState, createContext } from "react";

const AuthContext = createContext();
const AuthProvider = (props) => {
  const [user, setUser] = useState(); //empty by default is undefined
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}; //wrapper that gives its children context
export { AuthContext, AuthProvider };
