
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getProduct, addProduct, updateProduct, searchGameImage } from '../../../services/adminService';
import { AdminProduct } from '../../../types/admin';
import { ArrowLeft, Save, Image, Search } from 'lucide-react';
import { toast } from "sonner";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    title: '',
    platform: 'PS5',
    price: 0,
    image: '',
    description: '',
    featured: false,
    publisher: '',
    developerStudio: '',
    releaseDate: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      setIsLoading(true);
      try {
        const product = getProduct(id);
        if (product) {
          setFormData(product);
        } else {
          toast.error('Product not found');
          navigate('/admin/products');
        }
      } catch (error) {
        toast.error('Error loading product data');
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
    // Handle number inputs
    else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
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

  const handleSearchImage = async () => {
    if (!formData.title) {
      toast.error('Please enter a product name before searching for an image');
      return;
    }

    setIsSearchingImage(true);
    try {
      const imageUrl = await searchGameImage(
        formData.title || '', 
        formData.platform as string || 'PS5'
      );
      
      if (imageUrl) {
        setFormData({
          ...formData,
          image: imageUrl
        });
        toast.success('Image found for this product');
      } else {
        toast.error('No suitable image found');
      }
    } catch (error) {
      toast.error('Error searching for image');
      console.error(error);
    } finally {
      setIsSearchingImage(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.platform || formData.price === undefined || !formData.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        updateProduct(id, formData);
      } else {
        addProduct(formData as Omit<AdminProduct, 'id'>);
      }
      
      navigate('/admin/products');
    } catch (error) {
      toast.error('Error saving product');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title={isEditing ? 'Edit Product' : 'Add New Product'}>
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading product data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Edit Product' : 'Add New Product'}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/products')}
          className="mr-4 p-2 rounded-full hover:bg-azgaming-gray/30"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {isEditing ? `Edit: ${formData.title}` : 'Add New Product'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
                Platform <span className="text-red-500">*</span>
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform || 'PS5'}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
                required
              >
                <option value="PS5">PlayStation 5</option>
                <option value="PS4">PlayStation 4</option>
                <option value="PC">PC</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Publisher */}
            <div>
              <label htmlFor="publisher" className="block text-sm font-medium text-gray-300 mb-1">
                Publisher
              </label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Publisher name"
              />
            </div>

            {/* Developer Studio */}
            <div>
              <label htmlFor="developerStudio" className="block text-sm font-medium text-gray-300 mb-1">
                Development Studio
              </label>
              <input
                type="text"
                id="developerStudio"
                name="developerStudio"
                value={formData.developerStudio || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                placeholder="Development studio"
              />
            </div>

            {/* Release Date */}
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-1">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate || ''}
                onChange={handleChange}
                className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured || false}
                onChange={handleChange}
                className="w-4 h-4 text-azgaming-orange bg-azgaming-black/50 border border-azgaming-gray/30 rounded focus:ring-azgaming-orange/50"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                Featured Product
              </label>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Product Image <span className="text-red-500">*</span>
              </label>
              
              {/* Image Preview */}
              <div className="bg-azgaming-black/30 border border-azgaming-gray/30 rounded-lg p-4 mb-4">
                {formData.image ? (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt={formData.title || 'Product preview'} 
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 bg-azgaming-black/50 rounded-lg border border-dashed border-azgaming-gray/50">
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        No product image yet
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image || ''}
                    onChange={handleImageUrlChange}
                    className="flex-1 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSearchImage}
                    disabled={isSearchingImage}
                    className="bg-azgaming-green hover:bg-azgaming-green/90 transition-colors text-white px-3 py-2 rounded-lg flex items-center"
                  >
                    {isSearchingImage ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Search size={18} className="mr-1" />
                        Find Image
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Click "Find Image" to automatically search for an image based on the product name
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={8}
                  className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                  placeholder="Enter product description..."
                ></textarea>
              </div>
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
            {isSaving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ProductForm;
