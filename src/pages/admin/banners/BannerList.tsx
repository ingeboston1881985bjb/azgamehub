
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getBanners, deleteBanner, updateBanner } from '../../../services/adminService';
import { Banner } from '../../../types/admin';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = () => {
      try {
        setIsLoading(true);
        const data = getBanners();
        setBanners(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu banner');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa banner "${title}"?`)) {
      try {
        deleteBanner(id);
        // Update state after deletion
        setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
        toast.success(`Đã xóa banner "${title}"`);
      } catch (error) {
        toast.error('Lỗi khi xóa banner');
        console.error(error);
      }
    }
  };

  const toggleBannerStatus = (id: string, isCurrentlyActive: boolean) => {
    try {
      const updatedBanner = updateBanner(id, { isActive: !isCurrentlyActive });
      
      // Update state with the new value
      setBanners(prevBanners => 
        prevBanners.map(banner => 
          banner.id === id ? updatedBanner : banner
        )
      );
      
      toast.success(`Banner đã được ${!isCurrentlyActive ? 'kích hoạt' : 'vô hiệu hóa'}`);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái banner');
      console.error(error);
    }
  };

  return (
    <AdminLayout title="Quản lý Banner">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Danh sách Banner</h2>
          <p className="text-gray-400">Quản lý các banner trên trang web</p>
        </div>
        <a
          href="/admin/banners/new"
          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center self-start"
        >
          <Plus size={18} className="mr-2" />
          Thêm banner mới
        </a>
      </div>

      {/* Banners Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu banner...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className={`bg-azgaming-gray/20 backdrop-blur-md rounded-xl border ${
                banner.isActive ? 'border-azgaming-green/30' : 'border-azgaming-gray/10'
              } overflow-hidden transition-all hover:shadow-lg`}
            >
              {/* Banner Image */}
              <div className="relative h-40">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-azgaming-black to-transparent"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  banner.isActive 
                    ? 'bg-azgaming-green/20 text-azgaming-green border border-azgaming-green/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {banner.isActive ? 'Đang hiển thị' : 'Đã tắt'}
                </div>
              </div>
              
              {/* Banner Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{banner.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-azgaming-gray/30 px-2 py-1 rounded">
                    {banner.position === 'top' ? 'Đầu trang' : 
                     banner.position === 'sidebar' ? 'Bên cạnh' : 'Cuối trang'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleBannerStatus(banner.id, banner.isActive)}
                      className={`p-1.5 rounded-lg ${
                        banner.isActive 
                          ? 'bg-red-500/20 hover:bg-red-500/30' 
                          : 'bg-azgaming-green/20 hover:bg-azgaming-green/30'
                      } transition-colors`}
                      title={banner.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      {banner.isActive ? (
                        <EyeOff size={18} className="text-red-400" />
                      ) : (
                        <Eye size={18} className="text-azgaming-green" />
                      )}
                    </button>
                    
                    <a
                      href={`/admin/banners/edit/${banner.id}`}
                      className="p-1.5 bg-azgaming-orange/20 rounded-lg hover:bg-azgaming-orange/30 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={18} className="text-azgaming-orange" />
                    </a>
                    
                    <button
                      onClick={() => handleDelete(banner.id, banner.title)}
                      className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-12 text-center">
          <p className="text-gray-400 mb-4">Chưa có banner nào được tạo</p>
          <a
            href="/admin/banners/new"
            className="inline-flex items-center bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} className="mr-2" />
            Tạo banner đầu tiên
          </a>
        </div>
      )}
    </AdminLayout>
  );
};

export default BannerList;
