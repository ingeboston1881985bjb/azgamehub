
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAdmin();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-8 shadow-xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-azgaming-orange">AZ</span>
            <span className="text-3xl font-bold text-white">gaming</span>
          </div>
          <h1 className="text-2xl font-bold">Đăng nhập Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              placeholder="68686868"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Abcd!123456789"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors duration-300 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="mr-2" size={20} />
                Đăng nhập
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Công cụ dành cho quản trị viên. <br />
            Vui lòng quay lại nếu bạn không phải là admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
