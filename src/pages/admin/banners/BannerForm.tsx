
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getBanner, addBanner, updateBanner } from '../../../services/adminService';
import { Banner } from '../../../types/admin';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { toast } from "sonner";

const BannerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<Partial<Banner>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    position: 'top',
    isActive: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);
      try {
        const banner = getBanner(id);
        if (banner) {
          setFormData(banner);
        } else {
          toast.error('Không tìm thấy banner');
          navigate('/admin/banners');
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu banner');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } 
    // Handle other inputs
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.imageUrl || !formData.link) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        updateBanner(id, formData);
      } else {
        addBanner(formData as Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>);
      }
      
      toast.success(`Banner đã được ${isEditing ? 'cập nhật' : 'tạo'} thành công`);
      navigate('/admin/banners');
    } catch (error) {
      toast.error('Lỗi khi lưu banner');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title={isEditing ? 'Chỉnh sửa banner' : 'Thêm banner mới'}>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu banner...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Chỉnh sửa banner' : 'Thêm banner mới'}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/banners')}
          className="mr-4 p-2 rounded-full hover:bg-azgaming-gray/30"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {isEditing ? `Chỉnh sửa: ${formData.title}` : 'Thêm banner mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Tiêu đề banner <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Tiêu đề banner"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Mô tả banner"
              ></textarea>
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-1">
                Đường dẫn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="/download/anti-lag"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Đường dẫn khi click vào banner, có thể là link trong trang hoặc link ngoài
              </p>
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-1">
                Vị trí hiển thị
              </label>
              <select
                id="position"
                name="position"
                value={formData.position || 'top'}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
              >
                <option value="top">Đầu trang (gắn với menu)</option>
                <option value="sidebar">Bên cạnh</option>
                <option value="bottom">Cuối trang</option>
              </select>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive || false}
                onChange={handleChange}
                className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
              />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-300">
                Kích hoạt banner (hiển thị trên trang web)
              </label>
            </div>
          </div>

          {/* Right Column - Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Hình ảnh banner <span className="text-red-500">*</span>
            </label>
            
            {/* Image Preview */}
            <div className="bg-azgaming-black/30 border border-azgaming-gray/30 rounded-lg p-4 mb-4">
              {formData.imageUrl ? (
                <div className="relative">
                  <img 
                    src={formData.imageUrl} 
                    alt={formData.title || 'Banner preview'} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 bg-azgaming-black/50 rounded-lg border border-dashed border-azgaming-gray/50">
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-400">
                      Chưa có hình ảnh banner
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                URL hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="https://example.com/banner.jpg"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Nhập URL của hình ảnh banner. Khuyến nghị kích thước 1200x200 cho banner top.
              </p>
            </div>

            {/* Banner tips */}
            <div className="mt-6 p-4 bg-azgaming-orange/10 border border-azgaming-orange/20 rounded-lg">
              <h4 className="font-medium text-azgaming-orange mb-2">Mẹo tạo banner hiệu quả</h4>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Sử dụng hình ảnh chất lượng cao, rõ ràng</li>
                <li>Văn bản trên banner nên ngắn gọn, dễ đọc</li>
                <li>Màu sắc nên phù hợp với tone màu website (đen, cam, xanh lá)</li>
                <li>Banner phần mềm chống giật lag nên nổi bật để thu hút người dùng</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-6 py-2 rounded-lg flex items-center"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {isSaving ? 'Đang lưu...' : 'Lưu banner'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BannerForm;
