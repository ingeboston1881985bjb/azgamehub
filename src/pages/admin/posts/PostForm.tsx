
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getPost, addPost, updatePost } from '../../../services/adminService';
import { Post } from '../../../types/admin';
import { ArrowLeft, Save, FileImage } from 'lucide-react';
import { toast } from "sonner";

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    isPublished: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);
      try {
        const post = getPost(id);
        if (post) {
          setFormData(post);
        } else {
          toast.error('Không tìm thấy bài viết');
          navigate('/admin/posts');
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu bài viết');
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
      // Only auto-generate slug if we're creating a new post or the slug hasn't been manually edited
      slug: !isEditing || formData.slug === generateSlug(formData.title || '') 
        ? generateSlug(title)
        : formData.slug
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.coverImage) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        updatePost(id, formData);
      } else {
        addPost(formData as Omit<Post, 'id' | 'createdAt' | 'updatedAt'>);
      }
      
      toast.success(`Bài viết đã được ${isEditing ? 'cập nhật' : 'tạo'} thành công`);
      navigate('/admin/posts');
    } catch (error) {
      toast.error('Lỗi khi lưu bài viết');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title={isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu bài viết...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/posts')}
          className="mr-4 p-2 rounded-full hover:bg-azgaming-gray/30"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {isEditing ? `Chỉnh sửa: ${formData.title}` : 'Thêm bài viết mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleTitleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Nhập tiêu đề bài viết"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
                Đường dẫn (slug) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="bg-azgaming-black/70 text-gray-400 px-3 py-2 rounded-l-lg border border-azgaming-gray/30 border-r-0">
                  /blog/
                </span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleChange}
                  className="flex-1 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-r-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                  placeholder="duong-dan-bai-viet"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Đường dẫn sẽ được sử dụng để truy cập bài viết: example.com/blog/<strong>{formData.slug}</strong>
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-1">
                Tóm tắt bài viết <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                rows={3}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Nhập tóm tắt bài viết..."
                required
              ></textarea>
              <p className="mt-1 text-xs text-gray-400">
                Đoạn tóm tắt ngắn sẽ được hiển thị ở trang danh sách bài viết
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                Nội dung bài viết <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                rows={15}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 font-mono"
                placeholder="Nhập nội dung HTML của bài viết..."
                required
              ></textarea>
              <p className="mt-1 text-xs text-gray-400">
                Hỗ trợ HTML để định dạng nội dung bài viết.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ảnh bìa bài viết <span className="text-red-500">*</span>
              </label>
              
              {/* Image Preview */}
              <div className="bg-azgaming-black/30 border border-azgaming-gray/30 rounded-lg p-4 mb-4">
                {formData.coverImage ? (
                  <div className="relative">
                    <img 
                      src={formData.coverImage} 
                      alt={formData.title || 'Cover preview'} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-azgaming-black/50 rounded-lg border border-dashed border-azgaming-gray/50">
                    <div className="text-center">
                      <FileImage className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        Chưa có ảnh bìa
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image URL Input */}
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300 mb-1">
                  URL ảnh bìa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage || ''}
                  onChange={handleChange}
                  className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="mt-1 text-xs text-gray-400">
                  Nhập URL của ảnh bìa bài viết
                </p>
              </div>
            </div>

            {/* Published Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished || false}
                onChange={handleChange}
                className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-300">
                Xuất bản bài viết
              </label>
            </div>

            {/* Post tips */}
            <div className="p-4 bg-azgaming-orange/10 border border-azgaming-orange/20 rounded-lg">
              <h4 className="font-medium text-azgaming-orange mb-2">Mẹo viết bài hiệu quả</h4>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Sử dụng tiêu đề hấp dẫn, thu hút người đọc</li>
                <li>Chia nội dung thành các đoạn ngắn, dễ đọc</li>
                <li>Sử dụng hình ảnh minh họa phù hợp</li>
                <li>Kiểm tra lỗi chính tả trước khi xuất bản</li>
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
            {isSaving ? 'Đang lưu...' : 'Lưu bài viết'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default PostForm;
