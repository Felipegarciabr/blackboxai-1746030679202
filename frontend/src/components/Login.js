import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // Redirect to backend OAuth login route
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Conectar com Google Search Console</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded flex items-center justify-center transition"
        >
          <i className="fab fa-google mr-3"></i> Conectar com Google
        </button>
      </div>
    </div>
  );
};

export default Login;
