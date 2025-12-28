import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Only connect if user is logged in, or maybe public also needs socket for alerts?
    // Let's allow public connection for alerts.
    // If we deploy on Render, the backend URL will be different.
    // For local dev, proxy handles it.
    // For production, we need the backend URL.
    
    const url = import.meta.env.PROD ? window.location.origin : '/'; // Or explicit URL
    // Actually if we host FE on static site and BE on web service, origins differ.
    // We should use an ENV var for Backend URL.
    
    // For now assume proxy or same origin (if served by express).
    // If separated on Render (Static + Web Service), we need VITE_API_URL.
    
    const backendUrl = import.meta.env.VITE_API_URL || ''; 
    
    const newSocket = io(backendUrl, {
       path: '/socket.io',
       reconnectionDelayMax: 10000,
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
