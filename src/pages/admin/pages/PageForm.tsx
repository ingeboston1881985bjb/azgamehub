
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getPage, addPage, updatePage } from '../../../services/adminService';
import { Page } from '../../../types/admin';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from "sonner";

const PageForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    isPublished: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);
      try {
        const page = getPage(id);
        if (page) {
          setFormData(page);
        } else {
          toast.error('Không tìm thấy trang');
          navigate('/admin/pages');
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu trang');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      // Only auto-generate slug if we're creating a new page or the slug hasn't been manually edited
      slug: !isEditing || formData.slug === generateSlug(formData.title || '') 
        ? generateSlug(title)
        : formData.slug
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        updatePage(id, formData);
      } else {
        addPage(formData as Omit<Page, 'id' | 'createdAt' | 'updatedAt'>);
      }
      
      toast.success(`Trang đã được ${isEditing ? 'cập nhật' : 'tạo'} thành công`);
      navigate('/admin/pages');
    } catch (error) {
      toast.error('Lỗi khi lưu trang');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title={isEditing ? 'Chỉnh sửa trang' : 'Thêm trang mới'}>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu trang...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Chỉnh sửa trang' : 'Thêm trang mới'}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/pages')}
          className="mr-4 p-2 rounded-full hover:bg-azgaming-gray/30"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {isEditing ? `Chỉnh sửa: ${formData.title}` : 'Thêm trang mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Tiêu đề trang <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleTitleChange}
            className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
            placeholder="Nhập tiêu đề trang"
            required
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
            Đường dẫn (slug) <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <span className="bg-azgaming-black/70 text-gray-400 px-3 py-2 rounded-l-lg border border-azgaming-gray/30 border-r-0">
              /
            </span>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug || ''}
              onChange={handleChange}
              className="flex-1 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-r-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              placeholder="duong-dan-trang"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Đường dẫn sẽ được sử dụng để truy cập trang: example.com/<strong>{formData.slug}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            Nội dung trang <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            rows={15}
            className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 font-mono"
            placeholder="Nhập nội dung HTML của trang..."
            required
          ></textarea>
          <p className="mt-1 text-xs text-gray-400">
            Hỗ trợ HTML để định dạng nội dung trang.
          </p>
        </div>

        {/* Published Status */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished || false}
            onChange={handleChange}
            className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
          />
          <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-300">
            Xuất bản trang (hiển thị cho người dùng)
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
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
            {isSaving ? 'Đang lưu...' : 'Lưu trang'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default PageForm;
