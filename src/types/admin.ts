
import { GameItem } from '../context/CartContext';

export interface AdminProduct extends GameItem {
  description?: string;
  featured?: boolean;
  releaseDate?: string;
  publisher?: string;
  developerStudio?: string;
  updatedAt?: string; // Added this missing property
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
  position: 'top' | 'sidebar' | 'bottom';
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSection {
  id: string;
  title: string;
  type: 'featured-games' | 'banner' | 'product-grid' | 'text-block' | 'custom';
  content: string;
  order: number;
  isActive: boolean;
}

export interface AdminState {
  products: AdminProduct[];
  pages: Page[];
  posts: Post[];
  banners: Banner[];
  homepageSections: HomepageSection[];
}
