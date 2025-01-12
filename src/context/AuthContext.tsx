import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate checking token from storage
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "John Doe" }); // Replace with actual user fetching logic
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", "example-token");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to Use Auth
export function useAuth() {
  return useContext(AuthContext);
}
