import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check expiry
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ ...decoded, token });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ ...decoded, ...userData, token });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (fullName, email, password, role) => {
      // In a real app this would call API, but here we expect the component to call API and then login
      // Or we can put the axios call here.
      // Let's keep it simple: API call in component, then login(token)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
