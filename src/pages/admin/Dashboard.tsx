
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
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Products</p>
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
              Manage Products <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Pages Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Pages</p>
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
              Manage Pages <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Banners Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Banners</p>
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
              Manage Banners <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Homepage Sections Card */}
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400">Homepage Sections</p>
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
              Customize Homepage <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            href="/admin/products/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-orange/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-orange/20 rounded-full mr-3">
              <Package className="text-azgaming-orange" size={20} />
            </div>
            <span>Add New Product</span>
          </a>
          
          <a 
            href="/admin/pages/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-green/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-green/20 rounded-full mr-3">
              <FileText className="text-azgaming-green" size={20} />
            </div>
            <span>Create New Page</span>
          </a>
          
          <a 
            href="/admin/banners/new" 
            className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-4 hover:border-azgaming-orange/50 transition-all flex items-center"
          >
            <div className="p-2 bg-azgaming-orange/20 rounded-full mr-3">
              <FileImage className="text-azgaming-orange" size={20} />
            </div>
            <span>Create New Banner</span>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Products</h2>
        <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-azgaming-black/30">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
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
                        Edit
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
