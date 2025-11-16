import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase/config';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const openLoginModal = () => {
    setShowRegister(false); 
    setShowLogin(true); 
  };

  const openRegisterModal = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const value = {
    user,
    logout,
    loading,
    openLoginModal, 
    openRegisterModal,
    closeModals,
  };

  if (loading) {
     return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
     );
  }

  return (
    <AuthContext.Provider value={value}>
      {children} 
      {showLogin && (
        <Login
          onClose={closeModals}
          onSwitchToRegister={openRegisterModal}
        />
      )}
      {showRegister && (
        <Register
          onClose={closeModals}
          onSwitchToLogin={openLoginModal}
        />
      )}
    </AuthContext.Provider>
  );
};