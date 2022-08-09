const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setuserInfo] = useState({});

  const value = {
    userInfo,
    setuserInfo,
  };
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
