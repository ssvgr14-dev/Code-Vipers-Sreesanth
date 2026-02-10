export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Grains';
  pricePerKg: number;
  availableQty: number;
  harvestDate: string;
  farmerName: string;
  farmLocation: string;
  distance: number; // km
  image: string;
  isAvailable: boolean;
  isApproved: boolean;
  isVerified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
}

export const mandiPrices: Record<string, number> = {
  'Tomato': 35,
  'Potato': 22,
  'Onion': 28,
  'Carrot': 40,
  'Spinach': 30,
  'Mango': 80,
  'Banana': 45,
  'Apple': 120,
  'Guava': 55,
  'Rice': 42,
  'Wheat': 28,
  'Millets': 65,
  'Brinjal': 32,
  'Cabbage': 18,
  'Cauliflower': 38,
};

export const mockProducts: Product[] = [
  {
    id: '1', name: 'Organic Tomatoes', category: 'Vegetables', pricePerKg: 40,
    availableQty: 200, harvestDate: '2026-02-08', farmerName: 'Ravi Kumar',
    farmLocation: 'Kanchipuram', distance: 12, image: '🍅', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '2', name: 'Fresh Potatoes', category: 'Vegetables', pricePerKg: 25,
    availableQty: 500, harvestDate: '2026-02-06', farmerName: 'Lakshmi Devi',
    farmLocation: 'Villupuram', distance: 45, image: '🥔', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '3', name: 'Alphonso Mangoes', category: 'Fruits', pricePerKg: 90,
    availableQty: 100, harvestDate: '2026-02-09', farmerName: 'Suresh Reddy',
    farmLocation: 'Ratnagiri', distance: 78, image: '🥭', isAvailable: true, isApproved: true, isVerified: false,
  },
  {
    id: '4', name: 'Green Spinach', category: 'Vegetables', pricePerKg: 35,
    availableQty: 80, harvestDate: '2026-02-10', farmerName: 'Anitha S.',
    farmLocation: 'Thanjavur', distance: 22, image: '🥬', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '5', name: 'Basmati Rice', category: 'Grains', pricePerKg: 48,
    availableQty: 1000, harvestDate: '2026-01-20', farmerName: 'Mohan Singh',
    farmLocation: 'Karnal', distance: 120, image: '🌾', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '6', name: 'Fresh Bananas', category: 'Fruits', pricePerKg: 50,
    availableQty: 300, harvestDate: '2026-02-07', farmerName: 'Priya M.',
    farmLocation: 'Trichy', distance: 30, image: '🍌', isAvailable: true, isApproved: true, isVerified: false,
  },
  {
    id: '7', name: 'Red Onions', category: 'Vegetables', pricePerKg: 30,
    availableQty: 400, harvestDate: '2026-02-05', farmerName: 'Karthik R.',
    farmLocation: 'Nashik', distance: 55, image: '🧅', isAvailable: true, isApproved: false, isVerified: false,
  },
  {
    id: '8', name: 'Finger Millets', category: 'Grains', pricePerKg: 70,
    availableQty: 250, harvestDate: '2026-01-28', farmerName: 'Deepa N.',
    farmLocation: 'Madurai', distance: 35, image: '🌾', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '9', name: 'Organic Carrots', category: 'Vegetables', pricePerKg: 45,
    availableQty: 150, harvestDate: '2026-02-09', farmerName: 'Ravi Kumar',
    farmLocation: 'Kanchipuram', distance: 12, image: '🥕', isAvailable: true, isApproved: true, isVerified: true,
  },
  {
    id: '10', name: 'Sweet Guava', category: 'Fruits', pricePerKg: 60,
    availableQty: 120, harvestDate: '2026-02-08', farmerName: 'Suresh Reddy',
    farmLocation: 'Ratnagiri', distance: 78, image: '🍈', isAvailable: false, isApproved: true, isVerified: true,
  },
];
