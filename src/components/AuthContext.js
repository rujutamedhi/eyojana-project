import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider to wrap your app
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage when app loads
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });
  
  const [email, setEmail] = useState(() => {
    // Check localStorage for stored email
    const storedEmail = localStorage.getItem('email');
    return storedEmail ? storedEmail : "";
  });

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Update localStorage when email changes
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook to access the context
export function useAuth() {
  return useContext(AuthContext);
}
