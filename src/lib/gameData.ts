
import { GameItem } from '../context/CartContext';

// Helper function to generate a random price between 30 and 50
const randomPrice = () => Math.floor(Math.random() * 21) + 30;

// PS4 Games
export const ps4Games: GameItem[] = [
  {
    id: 'ps4-001',
    title: 'The Last of Us Part II',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1587656649633-e6d5d4d2d98e?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-002',
    title: 'God of War',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-003',
    title: 'Horizon Zero Dawn',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-004',
    title: 'Spider-Man',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-005',
    title: 'Uncharted 4',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1586182987320-4f17f5f61af2?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-006',
    title: 'Bloodborne',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1550745164-9bc0b2536258?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-007',
    title: 'Red Dead Redemption 2',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1575034360942-b8d69a8a017a?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-008',
    title: 'Ghost of Tsushima',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-009',
    title: 'Final Fantasy VII Remake',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1565024144485-d5677de3ead7?w=500&h=350&fit=crop',
    platform: 'PS4'
  },
  {
    id: 'ps4-010',
    title: 'Death Stranding',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1542332143-2f54ba93276a?w=500&h=350&fit=crop',
    platform: 'PS4'
  }
];

// PS5 Games
export const ps5Games: GameItem[] = [
  {
    id: 'ps5-001',
    title: 'Demon\'s Souls',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-002',
    title: 'Spider-Man: Miles Morales',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-003',
    title: 'Ratchet & Clank: Rift Apart',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-004',
    title: 'Returnal',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-005',
    title: 'Sackboy: A Big Adventure',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1580327332925-a10e6cb11baa?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-006',
    title: 'Godfall',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1548484352-ea579e5233a8?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-007',
    title: 'Astro\'s Playroom',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1603068668424-95d0307830ff?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-008',
    title: 'Call of Duty: Black Ops Cold War',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-009',
    title: 'Assassin\'s Creed Valhalla',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=500&h=350&fit=crop',
    platform: 'PS5'
  },
  {
    id: 'ps5-010',
    title: 'NBA 2K21',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1587855281243-4c26e5d0e0b7?w=500&h=350&fit=crop',
    platform: 'PS5'
  }
];

// PC Games
export const pcGames: GameItem[] = [
  {
    id: 'pc-001',
    title: 'Cyberpunk 2077',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1599150093333-3142cba2a6a7?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-002',
    title: 'Half-Life: Alyx',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-003',
    title: 'Valorant',
    price: 0,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-004',
    title: 'Microsoft Flight Simulator',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608479487176-eb4c11eab2c2?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-005',
    title: 'Counter-Strike: Global Offensive',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1548484352-ea579e5233a8?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-006',
    title: 'DOOM Eternal',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1565547442969-8b9929271421?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-007',
    title: 'World of Warcraft: Shadowlands',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-008',
    title: 'Crusader Kings III',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-009',
    title: 'League of Legends',
    price: 0,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop',
    platform: 'PC'
  },
  {
    id: 'pc-010',
    title: 'Overwatch',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=350&fit=crop',
    platform: 'PC'
  }
];

// All games combined
export const allGames = [...ps4Games, ...ps5Games, ...pcGames];

// Banner images
export const bannerImages = {
  featuredGames: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop',
  hotProducts: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&h=400&fit=crop',
  antiLagSoftware: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=400&fit=crop',
};
