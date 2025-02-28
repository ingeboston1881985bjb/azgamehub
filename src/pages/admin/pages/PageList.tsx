
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getPages, deletePage, updatePage } from '../../../services/adminService';
import { Page } from '../../../types/admin';
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const PageList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = () => {
      try {
        setIsLoading(true);
        const data = getPages();
        setPages(data);
        setFilteredPages(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu trang');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  useEffect(() => {
    // Filter pages based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = pages.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.slug.toLowerCase().includes(query)
      );
      setFilteredPages(filtered);
    } else {
      setFilteredPages(pages);
    }
  }, [searchQuery, pages]);

  const togglePageStatus = (id: string, isCurrentlyPublished: boolean) => {
    try {
      const updatedPage = updatePage(id, { isPublished: !isCurrentlyPublished });
      
      // Update state with the new value
      setPages(prevPages => 
        prevPages.map(page => 
          page.id === id ? updatedPage : page
        )
      );
      
      toast.success(`Trang đã được ${!isCurrentlyPublished ? 'xuất bản' : 'đưa về bản nháp'}`);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái trang');
      console.error(error);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa trang "${title}"?`)) {
      try {
        deletePage(id);
        // Update state after deletion
        setPages(prevPages => prevPages.filter(page => page.id !== id));
        toast.success(`Đã xóa trang "${title}"`);
      } catch (error) {
        toast.error('Lỗi khi xóa trang');
        console.error(error);
      }
    }
  };

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <AdminLayout title="Quản lý trang">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Danh sách trang</h2>
          <p className="text-gray-400">Quản lý tất cả các trang tĩnh của website</p>
        </div>
        <a
          href="/admin/pages/new"
          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center self-start"
        >
          <Plus size={18} className="mr-2" />
          Thêm trang mới
        </a>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm trang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Đang tải dữ liệu trang...</p>
          </div>
        ) : filteredPages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-azgaming-black/30">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Tiêu đề</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Đường dẫn</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Cập nhật</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-300">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-azgaming-gray/10">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-azgaming-black/20">
                    <td className="py-3 px-4 font-medium">{page.title}</td>
                    <td className="py-3 px-4">
                      <span className="text-gray-400">/{page.slug}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        page.isPublished
                          ? 'bg-azgaming-green/20 text-azgaming-green'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {page.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {formatDate(page.updatedAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => togglePageStatus(page.id, page.isPublished)}
                          className={`p-1.5 rounded-lg ${
                            page.isPublished 
                              ? 'bg-red-500/20 hover:bg-red-500/30' 
                              : 'bg-azgaming-green/20 hover:bg-azgaming-green/30'
                          } transition-colors`}
                          title={page.isPublished ? 'Chuyển thành bản nháp' : 'Xuất bản'}
                        >
                          {page.isPublished ? (
                            <EyeOff size={18} className="text-red-400" />
                          ) : (
                            <Eye size={18} className="text-azgaming-green" />
                          )}
                        </button>
                        
                        <a
                          href={`/admin/pages/edit/${page.id}`}
                          className="p-1.5 bg-azgaming-orange/20 rounded-lg hover:bg-azgaming-orange/30 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit size={18} className="text-azgaming-orange" />
                        </a>
                        
                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
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
            <p className="text-gray-400 mb-4">Không tìm thấy trang nào</p>
            <a
              href="/admin/pages/new"
              className="inline-flex items-center bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} className="mr-2" />
              Thêm trang mới
            </a>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PageList;
