"use client"

import React, { useState } from 'react';
import LoginComponent from '../components/vendor-login-portal';
import RegisterComponent from '../components/vendor-register-portal';

interface VendorPortalWrapperProps {
  initialMode?: 'login' | 'register';
}

const VendorPortalWrapper: React.FC<VendorPortalWrapperProps> = ({ 
  initialMode = 'login' 
}) => {
  const [currentMode, setCurrentMode] = useState(initialMode);

  const switchToLogin = () => setCurrentMode('login');
  const switchToRegister = () => setCurrentMode('register');

  return (
    <div>
      {currentMode === 'login' ? (
        <LoginComponent onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterComponent onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

// Alternative approach - Simple wrapper that uses route-based switching
const SimpleVendorPortalWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <LoginComponent /> : <RegisterComponent />}
      
      {/* Optional: Add a toggle button if you want manual switching */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-800 transition-colors"
        >
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default VendorPortalWrapper;
export { SimpleVendorPortalWrapper };