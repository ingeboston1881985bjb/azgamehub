
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAdmin();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login({ username, password });
      if (success) {
        navigate('/admin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // This helps prevent autocomplete
  useEffect(() => {
    // Set a random name attribute to confuse browser autocomplete
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
      usernameInput.setAttribute('name', `username_${Math.random().toString(36).substring(2)}`);
      usernameInput.setAttribute('autocomplete', 'off');
    }
    
    if (passwordInput) {
      passwordInput.setAttribute('name', `password_${Math.random().toString(36).substring(2)}`);
      passwordInput.setAttribute('autocomplete', 'new-password');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-azgaming-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div>
          <div className="flex justify-center">
            <div className="h-12 flex items-center">
              <span className="text-3xl font-bold text-azgaming-orange">AZ</span>
              <span className="text-3xl font-bold text-white">gaming</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
            Admin Dashboard Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to access the admin area
          </p>
        </div>
        
        <form className="mt-8 space-y-6 login-form" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="off"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-azgaming-gray/50 placeholder-gray-500 text-white rounded-t-md bg-azgaming-gray/30 focus:outline-none focus:ring-azgaming-orange/50 focus:border-azgaming-orange/50 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-azgaming-gray/50 placeholder-gray-500 text-white rounded-b-md bg-azgaming-gray/30 focus:outline-none focus:ring-azgaming-orange/50 focus:border-azgaming-orange/50 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azgaming-orange hover:bg-azgaming-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azgaming-orange/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <LogIn className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <a href="/" className="text-sm text-azgaming-orange hover:text-azgaming-orange/80">
              Return to website
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
