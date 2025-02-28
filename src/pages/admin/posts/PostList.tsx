
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getPosts, deletePost, updatePost } from '../../../services/adminService';
import { Post } from '../../../types/admin';
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        setIsLoading(true);
        const data = getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu bài viết');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.slug.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const togglePostStatus = (id: string, isCurrentlyPublished: boolean) => {
    try {
      const updatedPost = updatePost(id, { isPublished: !isCurrentlyPublished });
      
      // Update state with the new value
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? updatedPost : post
        )
      );
      
      toast.success(`Bài viết đã được ${!isCurrentlyPublished ? 'xuất bản' : 'đưa về bản nháp'}`);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái bài viết');
      console.error(error);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      try {
        deletePost(id);
        // Update state after deletion
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        toast.success(`Đã xóa bài viết "${title}"`);
      } catch (error) {
        toast.error('Lỗi khi xóa bài viết');
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
    <AdminLayout title="Quản lý bài viết">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
          <p className="text-gray-400">Quản lý tất cả các bài viết của website</p>
        </div>
        <a
          href="/admin/posts/new"
          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center self-start"
        >
          <Plus size={18} className="mr-2" />
          Thêm bài viết mới
        </a>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Đang tải dữ liệu bài viết...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-azgaming-black/30">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Tiêu đề</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Cập nhật</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-300">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-azgaming-gray/10">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-azgaming-black/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-xs text-gray-400 truncate max-w-xs">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.isPublished
                          ? 'bg-azgaming-green/20 text-azgaming-green'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {post.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => togglePostStatus(post.id, post.isPublished)}
                          className={`p-1.5 rounded-lg ${
                            post.isPublished 
                              ? 'bg-red-500/20 hover:bg-red-500/30' 
                              : 'bg-azgaming-green/20 hover:bg-azgaming-green/30'
                          } transition-colors`}
                          title={post.isPublished ? 'Chuyển thành bản nháp' : 'Xuất bản'}
                        >
                          {post.isPublished ? (
                            <EyeOff size={18} className="text-red-400" />
                          ) : (
                            <Eye size={18} className="text-azgaming-green" />
                          )}
                        </button>
                        
                        <a
                          href={`/admin/posts/edit/${post.id}`}
                          className="p-1.5 bg-azgaming-orange/20 rounded-lg hover:bg-azgaming-orange/30 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit size={18} className="text-azgaming-orange" />
                        </a>
                        
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
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
            <p className="text-gray-400 mb-4">Không tìm thấy bài viết nào</p>
            <a
              href="/admin/posts/new"
              className="inline-flex items-center bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg"
            >
              <Plus size={18} className="mr-2" />
              Thêm bài viết mới
            </a>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostList;
