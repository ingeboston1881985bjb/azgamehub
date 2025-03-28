
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
          toast.error('Page not found');
          navigate('/admin/pages');
        }
      } catch (error) {
        toast.error('Error loading page data');
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
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        updatePage(id, formData);
      } else {
        addPage(formData as Omit<Page, 'id' | 'createdAt' | 'updatedAt'>);
      }
      
      toast.success(`Page ${isEditing ? 'updated' : 'created'} successfully`);
      navigate('/admin/pages');
    } catch (error) {
      toast.error('Error saving page');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title={isEditing ? 'Edit Page' : 'Add New Page'}>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading page data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Page' : 'Add New Page'}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/pages')}
          className="mr-4 p-2 rounded-full hover:bg-azgaming-gray/30"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {isEditing ? `Edit: ${formData.title}` : 'Add New Page'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Page Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleTitleChange}
            className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
            placeholder="Enter page title"
            required
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
            URL Slug <span className="text-red-500">*</span>
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
              placeholder="page-url-slug"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            The slug will be used for the page URL: example.com/<strong>{formData.slug}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            Page Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleChange}
            rows={15}
            className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 font-mono"
            placeholder="Enter HTML content for the page..."
            required
          ></textarea>
          <p className="mt-1 text-xs text-gray-400">
            HTML is supported for formatting page content.
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
            Publish page (visible to users)
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
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default PageForm;
