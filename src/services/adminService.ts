
import { allGames } from '../lib/gameData';
import { AdminProduct, Page, Post, Banner, HomepageSection, AdminState } from '../types/admin';
import { toast } from "sonner";

// Helper function to get admin data from localStorage
const getAdminData = (): AdminState => {
  const adminData = localStorage.getItem('azgaming-admin-data');
  if (adminData) {
    try {
      return JSON.parse(adminData);
    } catch (error) {
      console.error('Failed to parse admin data:', error);
    }
  }

  // Initialize with default data if not found
  const initialState: AdminState = {
    products: allGames.map(game => ({
      ...game,
      description: `Experience the thrill of ${game.title} on ${game.platform}. This game offers incredible gameplay and stunning graphics.`,
      featured: Math.random() > 0.7,
      releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      publisher: ['Sony Interactive', 'Electronic Arts', 'Ubisoft', 'Activision', 'Rockstar Games'][Math.floor(Math.random() * 5)],
      developerStudio: ['Naughty Dog', 'Insomniac Games', 'CD Projekt Red', 'Rockstar North', 'FromSoftware'][Math.floor(Math.random() * 5)]
    })),
    pages: [
      {
        id: 'page-1',
        title: 'About Us',
        slug: 'about',
        content: '<h1>About AZGaming</h1><p>AZGaming is your ultimate destination for all gaming needs.</p>',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'page-2',
        title: 'Contact Us',
        slug: 'contact',
        content: '<h1>Contact AZGaming</h1><p>Get in touch with us for any inquiries.</p>',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    posts: [
      {
        id: 'post-1',
        title: 'Top Gaming Trends for 2024',
        slug: 'top-gaming-trends-2024',
        excerpt: 'Discover the hottest gaming trends for this year',
        content: '<h1>Top Gaming Trends for 2024</h1><p>The gaming industry continues to evolve...</p>',
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    banners: [
      {
        id: 'banner-1',
        title: 'Anti-Lag Software',
        description: 'Boost your PC gaming performance with our anti-lag software.',
        imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=200&fit=crop',
        link: '/download/anti-lag',
        isActive: true,
        position: 'top',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    homepageSections: [
      {
        id: 'section-1',
        title: 'Featured Games',
        type: 'featured-games',
        content: '{"count": 4, "platform": "all"}',
        order: 1,
        isActive: true
      },
      {
        id: 'section-2',
        title: 'Hot Deals',
        type: 'banner',
        content: '{"bannerId": "banner-1"}',
        order: 2,
        isActive: true
      }
    ]
  };

  // Save initial state to localStorage
  localStorage.setItem('azgaming-admin-data', JSON.stringify(initialState));
  return initialState;
};

// Save admin data to localStorage
const saveAdminData = (data: AdminState): void => {
  localStorage.setItem('azgaming-admin-data', JSON.stringify(data));
};

// Product operations
export const getProducts = (): AdminProduct[] => {
  return getAdminData().products;
};

export const getProduct = (id: string): AdminProduct | undefined => {
  return getAdminData().products.find(product => product.id === id);
};

export const addProduct = (product: Omit<AdminProduct, 'id'>): AdminProduct => {
  const id = `custom-${Date.now()}`;
  const now = new Date().toISOString(); // Add current date for updatedAt
  const newProduct: AdminProduct = {
    ...product,
    id,
    updatedAt: now // Set the updatedAt property
  };

  const adminData = getAdminData();
  adminData.products.push(newProduct);
  saveAdminData(adminData);
  
  toast.success('Sản phẩm đã được thêm thành công');
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<AdminProduct>): AdminProduct => {
  const adminData = getAdminData();
  const index = adminData.products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    adminData.products[index] = {
      ...adminData.products[index],
      ...updates,
      updatedAt: new Date().toISOString() // Set the updatedAt property
    };
    saveAdminData(adminData);
    toast.success('Sản phẩm đã được cập nhật thành công');
    return adminData.products[index];
  }
  
  toast.error('Không tìm thấy sản phẩm');
  throw new Error('Product not found');
};

export const deleteProduct = (id: string): void => {
  const adminData = getAdminData();
  const index = adminData.products.findIndex(product => product.id === id);
  
  if (index !== -1) {
    adminData.products.splice(index, 1);
    saveAdminData(adminData);
    toast.success('Sản phẩm đã được xóa thành công');
    return;
  }
  
  toast.error('Không tìm thấy sản phẩm');
  throw new Error('Product not found');
};

// Page operations
export const getPages = (): Page[] => {
  return getAdminData().pages;
};

export const getPage = (id: string): Page | undefined => {
  return getAdminData().pages.find(page => page.id === id);
};

export const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Page => {
  const id = `page-${Date.now()}`;
  const now = new Date().toISOString();
  
  const newPage: Page = {
    ...page,
    id,
    createdAt: now,
    updatedAt: now
  };

  const adminData = getAdminData();
  adminData.pages.push(newPage);
  saveAdminData(adminData);
  
  toast.success('Trang đã được thêm thành công');
  return newPage;
};

export const updatePage = (id: string, updates: Partial<Page>): Page => {
  const adminData = getAdminData();
  const index = adminData.pages.findIndex(page => page.id === id);
  
  if (index !== -1) {
    adminData.pages[index] = {
      ...adminData.pages[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveAdminData(adminData);
    toast.success('Trang đã được cập nhật thành công');
    return adminData.pages[index];
  }
  
  toast.error('Không tìm thấy trang');
  throw new Error('Page not found');
};

export const deletePage = (id: string): void => {
  const adminData = getAdminData();
  const index = adminData.pages.findIndex(page => page.id === id);
  
  if (index !== -1) {
    adminData.pages.splice(index, 1);
    saveAdminData(adminData);
    toast.success('Trang đã được xóa thành công');
    return;
  }
  
  toast.error('Không tìm thấy trang');
  throw new Error('Page not found');
};

// Post operations
export const getPosts = (): Post[] => {
  return getAdminData().posts;
};

export const getPost = (id: string): Post | undefined => {
  return getAdminData().posts.find(post => post.id === id);
};

export const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
  const id = `post-${Date.now()}`;
  const now = new Date().toISOString();
  
  const newPost: Post = {
    ...post,
    id,
    createdAt: now,
    updatedAt: now
  };

  const adminData = getAdminData();
  adminData.posts.push(newPost);
  saveAdminData(adminData);
  
  toast.success('Bài viết đã được thêm thành công');
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post => {
  const adminData = getAdminData();
  const index = adminData.posts.findIndex(post => post.id === id);
  
  if (index !== -1) {
    adminData.posts[index] = {
      ...adminData.posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveAdminData(adminData);
    toast.success('Bài viết đã được cập nhật thành công');
    return adminData.posts[index];
  }
  
  toast.error('Không tìm thấy bài viết');
  throw new Error('Post not found');
};

export const deletePost = (id: string): void => {
  const adminData = getAdminData();
  const index = adminData.posts.findIndex(post => post.id === id);
  
  if (index !== -1) {
    adminData.posts.splice(index, 1);
    saveAdminData(adminData);
    toast.success('Bài viết đã được xóa thành công');
    return;
  }
  
  toast.error('Không tìm thấy bài viết');
  throw new Error('Post not found');
};

// Banner operations
export const getBanners = (): Banner[] => {
  return getAdminData().banners;
};

export const getBanner = (id: string): Banner | undefined => {
  return getAdminData().banners.find(banner => banner.id === id);
};

export const addBanner = (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Banner => {
  const id = `banner-${Date.now()}`;
  const now = new Date().toISOString();
  
  const newBanner: Banner = {
    ...banner,
    id,
    createdAt: now,
    updatedAt: now
  };

  const adminData = getAdminData();
  adminData.banners.push(newBanner);
  saveAdminData(adminData);
  
  toast.success('Banner đã được thêm thành công');
  return newBanner;
};

export const updateBanner = (id: string, updates: Partial<Banner>): Banner => {
  const adminData = getAdminData();
  const index = adminData.banners.findIndex(banner => banner.id === id);
  
  if (index !== -1) {
    adminData.banners[index] = {
      ...adminData.banners[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveAdminData(adminData);
    toast.success('Banner đã được cập nhật thành công');
    return adminData.banners[index];
  }
  
  toast.error('Không tìm thấy banner');
  throw new Error('Banner not found');
};

export const deleteBanner = (id: string): void => {
  const adminData = getAdminData();
  const index = adminData.banners.findIndex(banner => banner.id === id);
  
  if (index !== -1) {
    adminData.banners.splice(index, 1);
    saveAdminData(adminData);
    toast.success('Banner đã được xóa thành công');
    return;
  }
  
  toast.error('Không tìm thấy banner');
  throw new Error('Banner not found');
};

// Homepage section operations
export const getHomepageSections = (): HomepageSection[] => {
  return getAdminData().homepageSections.sort((a, b) => a.order - b.order);
};

export const getHomepageSection = (id: string): HomepageSection | undefined => {
  return getAdminData().homepageSections.find(section => section.id === id);
};

export const addHomepageSection = (section: Omit<HomepageSection, 'id'>): HomepageSection => {
  const id = `section-${Date.now()}`;
  
  const newSection: HomepageSection = {
    ...section,
    id
  };

  const adminData = getAdminData();
  adminData.homepageSections.push(newSection);
  saveAdminData(adminData);
  
  toast.success('Phần trang chủ đã được thêm thành công');
  return newSection;
};

export const updateHomepageSection = (id: string, updates: Partial<HomepageSection>): HomepageSection => {
  const adminData = getAdminData();
  const index = adminData.homepageSections.findIndex(section => section.id === id);
  
  if (index !== -1) {
    adminData.homepageSections[index] = {
      ...adminData.homepageSections[index],
      ...updates
    };
    saveAdminData(adminData);
    toast.success('Phần trang chủ đã được cập nhật thành công');
    return adminData.homepageSections[index];
  }
  
  toast.error('Không tìm thấy phần trang chủ');
  throw new Error('Homepage section not found');
};

export const deleteHomepageSection = (id: string): void => {
  const adminData = getAdminData();
  const index = adminData.homepageSections.findIndex(section => section.id === id);
  
  if (index !== -1) {
    adminData.homepageSections.splice(index, 1);
    saveAdminData(adminData);
    toast.success('Phần trang chủ đã được xóa thành công');
    return;
  }
  
  toast.error('Không tìm thấy phần trang chủ');
  throw new Error('Homepage section not found');
};

// Additional helper for automatic game image correction
export const searchGameImage = async (gameTitle: string, platform: string): Promise<string> => {
  try {
    // In a real app, this would be an API call to a service like RAWG or similar
    // For demo purposes, we're using a placeholder
    toast.success('Đang tìm kiếm hình ảnh cho ' + gameTitle);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a placeholder based on platform
    if (platform === 'PS5') {
      return 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=350&fit=crop';
    } else if (platform === 'PS4') {
      return 'https://images.unsplash.com/photo-1587656649633-e6d5d4d2d98e?w=500&h=350&fit=crop';
    } else {
      return 'https://images.unsplash.com/photo-1599150093333-3142cba2a6a7?w=500&h=350&fit=crop';
    }
  } catch (error) {
    toast.error('Lỗi khi tìm kiếm hình ảnh');
    console.error('Error searching for game image:', error);
    return '';
  }
};
