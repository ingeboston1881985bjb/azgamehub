
import { GameItem } from '../context/CartContext';

// Helper function to generate a random price between 30 and 50
const randomPrice = () => Math.floor(Math.random() * 21) + 30;

// PS4 Games
export const ps4Games: GameItem[] = [
  {
    id: 'ps4-001',
    title: 'The Last of Us Part II',
    price: 39.99,
    image: 'https://cdn1.epicgames.com/offer/7713e3fa4b234e0d8f553044205d53b6/EGS_TheLastofUsPartIIRemastered_NaughtyDogLLCNixxesSoftwareIronGalaxy_S1_2560x1440-e93b7a99866b784c5fc948c1666df5e0?resize=1&w=480&h=270&quality=medium',
    platform: 'PS4'
  },
  {
    id: 'ps4-002',
    title: 'God of War',
    price: 34.99,
    image: 'https://cdn11.bigcommerce.com/s-b72t4x/images/stencil/1280x1280/products/272615/194304/God_of_War_Poster__16494.1595893742.jpg?c=2',
    platform: 'PS4'
  },
  {
    id: 'ps4-003',
    title: 'Horizon Zero Dawn',
    price: 29.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4c6a7uKTfOOYPhILdD_wev1HuTXK7VHSCw&s',
    platform: 'PS4'
  },
  {
    id: 'ps4-004',
    title: 'Spider-Man',
    price: 32.99,
    image: 'https://i.pinimg.com/736x/5c/e3/eb/5ce3eb230374d405a7a6656f66819143.jpg',
    platform: 'PS4'
  },
  {
    id: 'ps4-005',
    title: 'Uncharted 4',
    price: 27.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadC_8lngKPd1-NzM1ngfRB5msu-18n5-1CQ&s',
    platform: 'PS4'
  },
  {
    id: 'ps4-006',
    title: 'Bloodborne',
    price: 24.99,
    image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/09/bloodborne-thumb.jpg',
    platform: 'PS4'
  },
  {
    id: 'ps4-007',
    title: 'Red Dead Redemption 2',
    price: 39.99,
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/82c4ce208862945.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
    platform: 'PS4'
  },
  {
    id: 'ps4-008',
    title: 'Ghost of Tsushima',
    price: 49.99,
    image: 'https://myhotposters.com/cdn/shop/products/mL5567_1024x1024.jpg?v=1628014831',
    platform: 'PS4'
  },
  {
    id: 'ps4-009',
    title: 'Final Fantasy VII Remake',
    price: 44.99,
    image: 'https://ae01.alicdn.com/kf/H09e9673097184a31a729530e5a47774eN.jpg',
    platform: 'PS4'
  },
  {
    id: 'ps4-010',
    title: 'Death Stranding',
    price: 34.99,
    image: 'https://www.geeky-gadgets.com/wp-content/uploads/2023/05/Death-Stranding-game-free.webp',
    platform: 'PS4'
  }
];

// PS5 Games
export const ps5Games: GameItem[] = [
  {
    id: 'ps5-001',
    title: 'Demon\'s Souls',
    price: 69.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxbXXElWwZJ0dGL3ymOSUw_0g_CJpRlHk0A&s',
    platform: 'PS5'
  },
  {
    id: 'ps5-002',
    title: 'Spider-Man: Miles Morales',
    price: 49.99,
    image: 'https://70f186a60af817fe0731-09dac41207c435675bfd529a14211b5c.ssl.cf1.rackcdn.com/assets/attachments_p/000/080/940/size500_miles_web.jpg',
    platform: 'PS5'
  },
  {
    id: 'ps5-003',
    title: 'Ratchet & Clank: Rift Apart',
    price: 69.99,
    image: 'https://i.ytimg.com/vi/D3KdQSKQyxE/maxresdefault.jpg',
    platform: 'PS5'
  },
  {
    id: 'ps5-004',
    title: 'Returnal',
    price: 69.99,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/returnal-keyart-01-ps5-en-25feb21?$facebook$',
    platform: 'PS5'
  },
  {
    id: 'ps5-005',
    title: 'Sackboy: A Big Adventure',
    price: 59.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IVXDqqg3ntqcF99Jxmpq4rhJzvsGIF04GA&s',
    platform: 'PS5'
  },
  {
    id: 'ps5-006',
    title: 'Godfall',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe1SFwnsKs_YikSbMj9TrHGgHqsLCXl1f2FQ&s',
    platform: 'PS5'
  },
  {
    id: 'ps5-007',
    title: 'Astro\'s Playroom',
    price: 29.99,
    image: 'https://assets.hardwarezone.com/img/2021/01/PS5-Astros-Playroom.jpg',
    platform: 'PS5'
  },
  {
    id: 'ps5-008',
    title: 'Call of Duty: Black Ops Cold War',
    price: 69.99,
    image: 'https://imageio.forbes.com/specials-images/imageserve/5f3f4fc25f4a062c1a56915c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
    platform: 'PS5'
  },
  {
    id: 'ps5-009',
    title: 'Assassin\'s Creed Valhalla',
    price: 59.99,
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ZAlQrGYxXi8Bo8PuhJd5g/117dbe6cf56d580c60ad955e28467d88/ACV_Meta_image_website.png',
    platform: 'PS5'
  },
  {
    id: 'ps5-010',
    title: 'NBA 2K21',
    price: 69.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuCJxEejRCxa5mJ7yu7ErNIc1U2WieuZnoA&s',
    platform: 'PS5'
  }
];

// PC Games
export const pcGames: GameItem[] = [
  {
    id: 'pc-001',
    title: 'Cyberpunk 2077',
    price: 59.99,
    image: 'https://i.ebayimg.com/images/g/OgAAAOSwK5tgDyUz/s-l1200.jpg',
    platform: 'PC'
  },
  {
    id: 'pc-002',
    title: 'Half-Life: Alyx',
    price: 49.99,
    image: 'https://i.ytimg.com/vi/O2W0N3uKXmo/maxresdefault.jpg',
    platform: 'PC'
  },
  {
    id: 'pc-003',
    title: 'Valorant',
    price: 0,
    image: 'https://w0.peakpx.com/wallpaper/503/780/HD-wallpaper-kay-o-x-jett-valorant-game-poster.jpg',
    platform: 'PC'
  },
  {
    id: 'pc-004',
    title: 'Microsoft Flight Simulator',
    price: 59.99,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1250410/capsule_616x353.jpg?t=1740686114',
    platform: 'PC'
  },
  {
    id: 'pc-005',
    title: 'Counter-Strike: Global Offensive',
    price: 14.99,
    image: 'https://rukminim2.flixcart.com/image/850/1000/kpinwy80/poster/d/o/z/large-counter-strike-global-offensive-poster-non12x18no1x0261-original-imag3qb3nurzmmve.jpeg?q=90&crop=false',
    platform: 'PC'
  },
  {
    id: 'pc-006',
    title: 'DOOM Eternal',
    price: 39.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyNkt3Bfe9YrpMR98PWB4ooFa_7fffItmbaA&s',
    platform: 'PC'
  },
  {
    id: 'pc-007',
    title: 'World of Warcraft: Shadowlands',
    price: 39.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSB6lUtdhHGN-qKpkL9_Syk3XGn-jfhc9_g&s',
    platform: 'PC'
  },
  {
    id: 'pc-008',
    title: 'Crusader Kings III',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR59JW5pjaxpEbpkzMDPWj82yMp8qYUlPCHNw&s',
    platform: 'PC'
  },
  {
    id: 'pc-009',
    title: 'League of Legends',
    price: 0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS4rgEs65GtMXW-1AJaLIAtAT9N8XVgUsKw&s',
    platform: 'PC'
  },
  {
    id: 'pc-010',
    title: 'Overwatch',
    price: 19.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8ZbAR6vJt7zV8jywNAJRXnfrAS9toOMsrA&s',
    platform: 'PC'
  }
];

// All games combined
export const allGames = [...ps4Games, ...ps5Games, ...pcGames];

// Banner images
export const bannerImages = {
  featuredGames: 'https://assets.vg247.com/current//2015/09/ashe_league_of_legends.jpg',
  //hotProducts: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&h=400&fit=crop',
  hotProducts: 'https://static.posters.cz/image/hp/77526.jpg',
  antiLagSoftware: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=400&fit=crop',
};

