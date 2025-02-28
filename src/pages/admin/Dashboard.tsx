
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  getProducts, 
  getPages, 
  getPosts, 
  getBanners,
  getHomepageSections
} from '../../services/adminService';
import { Package, FileText, FileImage, Layout, ArrowUpRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    pages: 0,
    posts: 0,
    banners: 0,
    sections: 0
  });

  useEffect(() => {
    const fetchStats = () => {
      const products = getProducts();
      const pages = getPages();
      const posts = getPosts();
      const banners = getBanners();
      const sections = getHomepageSections();

      setStats({
        products: products.length,
        pages: pages.length,
        posts: posts.length,
        banners: banners.length,
        sections: sections.length
      });
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Bảng điều khiển">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Sản phẩm</p>
              <h3 className="text-3xl font-bold mt-2">{stats.products}</h3>
            </div>
            <div className="p-3 bg-azgaming-orange/20 rounded-full">
              <Package className="text-azgaming-orange" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="/admin/products" 
              className="text-sm inline-flex items-center text-azgaming-orange hover:underline"
            >
              Quản lý sản phẩm <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Pages Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Trang</p>
              <h3 className="text-3xl font-bold mt-2">{stats.pages}</h3>
            </div>
            <div className="p-3 bg-azgaming-green/20 rounded-full">
              <FileText className="text-azgaming-green" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="/admin/pages" 
              className="text-sm inline-flex items-center text-azgaming-green hover:underline"
            >
              Quản lý trang <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Banners Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Banner</p>
              <h3 className="text-3xl font-bold mt-2">{stats.banners}</h3>
            </div>
            <div className="p-3 bg-azgaming-orange/20 rounded-full">
              <FileImage className="text-azgaming-orange" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="/admin/banners" 
              className="text-sm inline-flex items-center text-azgaming-orange hover:underline"
            >
              Quản lý banner <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Homepage Sections Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Phần trang chủ</p>
              <h3 className="text-3xl font-bold mt-2">{stats.sections}</h3>
            </div>
            <div className="p-3 bg-azgaming-green/20 rounded-full">
              <Layout className="text-azgaming-green" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="/admin/homepage" 
              className="text-sm inline-flex items-center text-azgaming-green hover:underline"
            >
              Tùy chỉnh trang chủ <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/admin/products/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-orange/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-orange/20 rounded-full mr-3">
              <Package className="text-azgaming-orange" size={20} />
            </div>
            <span>Thêm sản phẩm mới</span>
          </a>
          
          <a 
            href="/admin/pages/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-green/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-green/20 rounded-full mr-3">
              <FileText className="text-azgaming-green" size={20} />
            </div>
            <span>Tạo trang mới</span>
          </a>
          
          <a 
            href="/admin/banners/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-orange/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-orange/20 rounded-full mr-3">
              <FileImage className="text-azgaming-orange" size={20} />
            </div>
            <span>Tạo banner mới</span>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Sản phẩm gần đây</h2>
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-azgaming-black/30">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Tên sản phẩm</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Nền tảng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Giá</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-azgaming-gray/10">
                {getProducts().slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-azgaming-black/20">
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{product.platform}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <a 
                        href={`/admin/products/edit/${product.id}`}
                        className="text-azgaming-orange hover:underline"
                      >
                        Chỉnh sửa
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
