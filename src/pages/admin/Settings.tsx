
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { toast } from "sonner";

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Example settings
  const [settings, setSettings] = useState({
    siteName: 'AZgaming',
    siteDescription: 'Website bán game PS4, PS5 và PC chính hãng',
    contactEmail: 'contact@azgaming.com',
    phoneNumber: '+84 123 456 789',
    facebookLink: 'https://facebook.com/azgaming',
    instagramLink: 'https://instagram.com/azgaming',
    enableNotifications: true,
    maintenanceMode: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setSettings({
        ...settings,
        [name]: checkbox.checked
      });
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save settings to localStorage for demo
      localStorage.setItem('azgaming-settings', JSON.stringify(settings));
      toast.success('Cài đặt đã được lưu thành công');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <AdminLayout title="Cài đặt">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-azgaming-orange/20 rounded-full mr-3">
          <SettingsIcon className="text-azgaming-orange" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Cài đặt hệ thống</h2>
          <p className="text-gray-400">Quản lý các thiết lập cho website</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium border-b border-azgaming-gray/30 pb-2">Thông tin chung</h3>
            
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-1">
                Tên website
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>
            
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-300 mb-1">
                Mô tả website
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                Email liên hệ
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>
          </div>
          
          {/* Social Media & Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium border-b border-azgaming-gray/30 pb-2">Mạng xã hội & Tính năng</h3>
            
            <div>
              <label htmlFor="facebookLink" className="block text-sm font-medium text-gray-300 mb-1">
                Facebook
              </label>
              <input
                type="url"
                id="facebookLink"
                name="facebookLink"
                value={settings.facebookLink}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>
            
            <div>
              <label htmlFor="instagramLink" className="block text-sm font-medium text-gray-300 mb-1">
                Instagram
              </label>
              <input
                type="url"
                id="instagramLink"
                name="instagramLink"
                value={settings.instagramLink}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableNotifications"
                name="enableNotifications"
                checked={settings.enableNotifications}
                onChange={handleChange}
                className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
              />
              <label htmlFor="enableNotifications" className="ml-2 text-sm font-medium text-gray-300">
                Bật thông báo trên website
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
              />
              <label htmlFor="maintenanceMode" className="ml-2 text-sm font-medium text-gray-300">
                Bật chế độ bảo trì website
              </label>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-700/30 rounded-lg p-4 mt-4">
              <p className="text-yellow-500 text-sm">
                <strong>Lưu ý:</strong> Khi bật chế độ bảo trì, website sẽ không thể truy cập với người dùng thông thường. Chỉ admin mới có thể đăng nhập.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-6 py-2 rounded-lg flex items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {isLoading ? 'Đang lưu...' : 'Lưu cài đặt'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Settings;
