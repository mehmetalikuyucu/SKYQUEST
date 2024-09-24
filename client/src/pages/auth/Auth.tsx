import React, { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';

const AuthContainer: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const switchToRegister = () => setIsLoginView(false);
  const switchToLogin = () => setIsLoginView(true);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLoginView ? 'Giriş Yap' : 'Kayıt Ol'}
      </h1>
      {isLoginView ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthContainer;