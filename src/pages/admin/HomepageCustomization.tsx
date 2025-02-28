
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getHomepageSections, updateHomepageSection, addHomepageSection, deleteHomepageSection } from '../../services/adminService';
import { HomepageSection } from '../../types/admin';
import { Grid, Image, TextIcon, Layout, Plus, Save, Trash2, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from "sonner";

const HomepageCustomization: React.FC = () => {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState<HomepageSection['type']>('featured-games');

  useEffect(() => {
    const fetchSections = () => {
      try {
        setIsLoading(true);
        const data = getHomepageSections();
        setSections(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu trang chủ');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(section => section.id === id);
    if (sectionIndex === -1) return;
    
    if (direction === 'up' && sectionIndex > 0) {
      // Move section up
      const reorderedSections = [...sections];
      [reorderedSections[sectionIndex - 1], reorderedSections[sectionIndex]] = 
        [reorderedSections[sectionIndex], reorderedSections[sectionIndex - 1]];
      
      // Update order property
      const updatedSections = reorderedSections.map((section, index) => ({
        ...section,
        order: index + 1
      }));
      
      setSections(updatedSections);
      
      // Save to server
      updatedSections.forEach(section => {
        updateHomepageSection(section.id, { order: section.order });
      });
      
      toast.success('Đã thay đổi thứ tự phần');
    } else if (direction === 'down' && sectionIndex < sections.length - 1) {
      // Move section down
      const reorderedSections = [...sections];
      [reorderedSections[sectionIndex], reorderedSections[sectionIndex + 1]] = 
        [reorderedSections[sectionIndex + 1], reorderedSections[sectionIndex]];
      
      // Update order property
      const updatedSections = reorderedSections.map((section, index) => ({
        ...section,
        order: index + 1
      }));
      
      setSections(updatedSections);
      
      // Save to server
      updatedSections.forEach(section => {
        updateHomepageSection(section.id, { order: section.order });
      });
      
      toast.success('Đã thay đổi thứ tự phần');
    }
  };

  const toggleSectionExpand = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const toggleSectionActive = (section: HomepageSection) => {
    try {
      const updatedSection = updateHomepageSection(section.id, {
        isActive: !section.isActive
      });
      
      setSections(prevSections => 
        prevSections.map(s => 
          s.id === section.id ? updatedSection : s
        )
      );
      
      toast.success(`Phần "${section.title}" đã được ${!section.isActive ? 'kích hoạt' : 'vô hiệu hóa'}`);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái phần');
      console.error(error);
    }
  };

  const handleEditSection = (section: HomepageSection) => {
    setEditingSection({...section});
    toggleSectionExpand(section.id);
  };

  const handleUpdateSection = () => {
    if (!editingSection) return;
    
    try {
      setIsSaving(true);
      const updatedSection = updateHomepageSection(editingSection.id, editingSection);
      
      setSections(prevSections => 
        prevSections.map(s => 
          s.id === updatedSection.id ? updatedSection : s
        )
      );
      
      setEditingSection(null);
      toast.success('Đã cập nhật phần thành công');
    } catch (error) {
      toast.error('Lỗi khi cập nhật phần');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSection = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phần này?')) {
      try {
        deleteHomepageSection(id);
        setSections(prevSections => prevSections.filter(s => s.id !== id));
        toast.success('Đã xóa phần thành công');
      } catch (error) {
        toast.error('Lỗi khi xóa phần');
        console.error(error);
      }
    }
  };

  const handleAddNewSection = () => {
    if (!newSectionTitle.trim()) {
      toast.error('Vui lòng nhập tiêu đề phần');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const newSection = addHomepageSection({
        title: newSectionTitle,
        type: newSectionType,
        content: '{}',
        order: sections.length + 1,
        isActive: true
      });
      
      setSections(prev => [...prev, newSection]);
      setNewSectionTitle('');
      toast.success('Đã thêm phần mới thành công');
    } catch (error) {
      toast.error('Lỗi khi thêm phần mới');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const getSectionIcon = (type: HomepageSection['type']) => {
    switch (type) {
      case 'featured-games':
        return <Grid size={20} className="text-azgaming-orange" />;
      case 'banner':
        return <Image size={20} className="text-azgaming-orange" />;
      case 'text-block':
        return <TextIcon size={20} className="text-azgaming-orange" />;
      case 'product-grid':
        return <Grid size={20} className="text-azgaming-orange" />;
      default:
        return <Layout size={20} className="text-azgaming-orange" />;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Tùy chỉnh trang chủ">
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-azgaming-orange border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu trang chủ...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Tùy chỉnh trang chủ">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Bố cục trang chủ</h2>
          <p className="text-gray-400">Quản lý và sắp xếp các phần trên trang chủ</p>
        </div>
      </div>

      {/* Add new section */}
      <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl p-6 border border-azgaming-gray/10 mb-8">
        <h3 className="text-lg font-medium mb-4">Thêm phần mới</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tiêu đề phần
            </label>
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
              placeholder="Nhập tiêu đề phần"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Loại phần
            </label>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value as HomepageSection['type'])}
              className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
            >
              <option value="featured-games">Trò chơi nổi bật</option>
              <option value="banner">Banner</option>
              <option value="product-grid">Lưới sản phẩm</option>
              <option value="text-block">Khối văn bản</option>
              <option value="custom">Tùy chỉnh</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddNewSection}
              disabled={isSaving}
              className="bg-azgaming-green hover:bg-azgaming-green/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Plus size={18} className="mr-2" />
              )}
              Thêm phần
            </button>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <div
              key={section.id}
              className={`bg-azgaming-gray/20 backdrop-blur-md rounded-xl border ${
                section.isActive ? 'border-azgaming-gray/30' : 'border-red-500/20'
              } overflow-hidden`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between p-4 cursor-pointer"
                   onClick={() => toggleSectionExpand(section.id)}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-azgaming-black/30 rounded-lg">
                    {getSectionIcon(section.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {section.title}
                      {!section.isActive && (
                        <span className="ml-2 text-xs text-red-400">(Không hiển thị)</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {section.type === 'featured-games' ? 'Trò chơi nổi bật' :
                       section.type === 'banner' ? 'Banner' :
                       section.type === 'product-grid' ? 'Lưới sản phẩm' :
                       section.type === 'text-block' ? 'Khối văn bản' : 'Tùy chỉnh'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Reorder buttons */}
                  <button
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(section.id, 'up');
                    }}
                    className={`p-1 rounded ${
                      index === 0
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:bg-azgaming-gray/50'
                    }`}
                    title="Di chuyển lên"
                  >
                    <ChevronUp size={18} />
                  </button>
                  <button
                    disabled={index === sections.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReorder(section.id, 'down');
                    }}
                    className={`p-1 rounded ${
                      index === sections.length - 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-300 hover:bg-azgaming-gray/50'
                    }`}
                    title="Di chuyển xuống"
                  >
                    <ChevronDown size={18} />
                  </button>
                  
                  {/* Toggle active button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionActive(section);
                    }}
                    className={`p-1 rounded ${
                      section.isActive
                        ? 'text-azgaming-green hover:bg-azgaming-green/20'
                        : 'text-red-400 hover:bg-red-500/20'
                    }`}
                    title={section.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  >
                    {section.isActive ? 'Hiện' : 'Ẩn'}
                  </button>
                  
                  {/* Edit button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSection(section);
                    }}
                    className="p-1 text-azgaming-orange hover:bg-azgaming-orange/20 rounded"
                    title="Chỉnh sửa"
                  >
                    <Edit size={18} />
                  </button>
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                    className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Section Content - Expanded */}
              {expandedSection === section.id && (
                <div className="p-4 border-t border-azgaming-gray/20 bg-azgaming-black/20">
                  {editingSection && editingSection.id === section.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Tiêu đề phần
                        </label>
                        <input
                          type="text"
                          value={editingSection.title}
                          onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                          className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Loại phần
                        </label>
                        <select
                          value={editingSection.type}
                          onChange={(e) => setEditingSection({...editingSection, type: e.target.value as HomepageSection['type']})}
                          className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
                        >
                          <option value="featured-games">Trò chơi nổi bật</option>
                          <option value="banner">Banner</option>
                          <option value="product-grid">Lưới sản phẩm</option>
                          <option value="text-block">Khối văn bản</option>
                          <option value="custom">Tùy chỉnh</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Nội dung (JSON)
                        </label>
                        <textarea
                          value={editingSection.content}
                          onChange={(e) => setEditingSection({...editingSection, content: e.target.value})}
                          rows={4}
                          className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-2 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                        />
                        <p className="mt-1 text-xs text-gray-400">
                          Nhập dữ liệu dạng JSON cho phần này
                        </p>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setEditingSection(null)}
                          className="px-4 py-2 border border-azgaming-gray/30 text-white rounded-lg hover:bg-azgaming-gray/30 transition-colors"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={handleUpdateSection}
                          disabled={isSaving}
                          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center"
                        >
                          {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <Save size={18} className="mr-2" />
                          )}
                          Lưu thay đổi
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-1">Loại phần</h4>
                          <p className="bg-azgaming-black/30 p-2 rounded">
                            {section.type === 'featured-games' ? 'Trò chơi nổi bật' :
                             section.type === 'banner' ? 'Banner' :
                             section.type === 'product-grid' ? 'Lưới sản phẩm' :
                             section.type === 'text-block' ? 'Khối văn bản' : 'Tùy chỉnh'}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-1">Vị trí</h4>
                          <p className="bg-azgaming-black/30 p-2 rounded">
                            Thứ tự {section.order}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Nội dung</h4>
                        <pre className="bg-azgaming-black/30 p-3 rounded overflow-x-auto text-sm">
                          {section.content}
                        </pre>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          onClick={() => handleEditSection(section)}
                          className="bg-azgaming-orange hover:bg-azgaming-orange/90 transition-colors text-white px-4 py-2 rounded-lg flex items-center"
                        >
                          <Edit size={18} className="mr-2" />
                          Chỉnh sửa phần này
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-12 text-center">
            <p className="text-gray-400 mb-4">Chưa có phần nào trên trang chủ</p>
            <p className="text-sm text-gray-500">Hãy thêm phần đầu tiên bằng biểu mẫu bên trên</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default HomepageCustomization;
