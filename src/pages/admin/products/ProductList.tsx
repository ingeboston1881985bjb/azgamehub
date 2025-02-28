
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getProducts, deleteProduct } from '../../../services/adminService';
import { AdminProduct } from '../../../types/admin';
import { Search, Plus, Edit, Trash2, ArrowDown, ArrowUp, Filter } from 'lucide-react';
import { toast } from "sonner";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof AdminProduct>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setIsLoading(true);
        const data = getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu sản phẩm');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products when dependencies change
    let result = [...products];
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      result = result.filter(product => product.platform === platformFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.id.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // Handle string comparison
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredProducts(result);
  }, [products, searchQuery, platformFilter, sortField, sortDirection]);

  const handleSort = (field: keyof AdminProduct) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${title}"?`)) {
      try {
        deleteProduct(id);
        // Update state after deletion
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } catch (error) {
        toast.error('Lỗi khi xóa sản phẩm');
        console.error(error);
      }
    }
  };

  const SortIcon = ({ field }: { field: keyof AdminProduct }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  return (
    <AdminLayout title="Quản lý sản phẩm">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
          <p className="text-gray-400">Quản lý tất cả sản phẩm của AZgaming</p>
        </div>
        <a
          href="/admin/products/new"
          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center self-start"
        >
          <Plus size={18} className="mr-2" />
          Thêm sản phẩm
        </a>
      </div>

      {/* Filters */}
      <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl p-4 mb-6 border border-azgaming-gray/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
            />
          </div>
          
          {/* Platform Filter */}
          <div className="w-full md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
              >
                <option value="all">Tất cả nền tảng</option>
                <option value="PS4">PlayStation 4</option>
                <option value="PS5">PlayStation 5</option>
                <option value="PC">PC</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          Hiển thị {filteredProducts.length} trong số {products.length} sản phẩm
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Đang tải dữ liệu sản phẩm...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-azgaming-black/30">
                  <th 
                    className="text-left py-3 px-4 font-medium text-gray-300 cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      Tên sản phẩm
                      <SortIcon field='title' />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 font-medium text-gray-300 cursor-pointer"
                    onClick={() => handleSort('platform')}
                  >
                    <div className="flex items-center">
                      Nền tảng
                      <SortIcon field='platform' />
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 font-medium text-gray-300 cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Giá
                      <SortIcon field='price' />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Hình ảnh</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-300">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-azgaming-gray/10">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-azgaming-black/20">
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{product.platform}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <a 
                          href={`/admin/products/edit/${product.id}`}
                          className="p-1 bg-azgaming-green/20 rounded hover:bg-azgaming-green/30 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit size={18} className="text-azgaming-green" />
                        </a>
                        <button 
                          onClick={() => handleDelete(product.id, product.title)}
                          className="p-1 bg-red-500/20 rounded hover:bg-red-500/30 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-400">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductList;
