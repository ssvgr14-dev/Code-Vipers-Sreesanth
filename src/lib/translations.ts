export type Language = 'en' | 'ta';

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.marketplace': { en: 'Marketplace', ta: 'சந்தை' },
  'nav.dashboard': { en: 'Dashboard', ta: 'டாஷ்போர்டு' },
  'nav.admin': { en: 'Admin Panel', ta: 'நிர்வாக பேனல்' },
  'nav.cart': { en: 'Cart', ta: 'வண்டி' },
  'nav.login': { en: 'Login', ta: 'உள்நுழை' },
  
  // Hero
  'hero.title': { en: 'Farm Fresh, Direct to You', ta: 'பண்ணை புத்தம், நேரடியாக உங்களுக்கு' },
  'hero.subtitle': { en: 'Connect directly with local farmers. Get the freshest produce at fair prices, while supporting sustainable agriculture.', ta: 'உள்ளூர் விவசாயிகளுடன் நேரடியாக இணையுங்கள்.' },
  'hero.cta': { en: 'Shop Fresh Produce', ta: 'புதிய பொருட்களை வாங்கு' },
  'hero.cta2': { en: 'Become a Seller', ta: 'விற்பனையாளர் ஆகுங்கள்' },

  // Marketplace
  'market.title': { en: 'Fresh from the Farm', ta: 'பண்ணையிலிருந்து புதிதாக' },
  'market.search': { en: 'Search produce...', ta: 'தேடு...' },
  'market.all': { en: 'All', ta: 'அனைத்து' },
  'market.vegetables': { en: 'Vegetables', ta: 'காய்கறிகள்' },
  'market.fruits': { en: 'Fruits', ta: 'பழங்கள்' },
  'market.grains': { en: 'Grains', ta: 'தானியங்கள்' },
  'market.addToCart': { en: 'Add to Cart', ta: 'வண்டியில் சேர்' },
  'market.perKg': { en: '/kg', ta: '/கிலோ' },
  'market.sortDistance': { en: 'Sort by Distance', ta: 'தூரம் வாரியாக' },

  // Farmer
  'farmer.title': { en: 'Farmer Dashboard', ta: 'விவசாயி டாஷ்போர்டு' },
  'farmer.addProduce': { en: 'List New Produce', ta: 'புதிய பொருள் சேர்' },
  'farmer.cropName': { en: 'Crop Name', ta: 'பயிர் பெயர்' },
  'farmer.category': { en: 'Category', ta: 'வகை' },
  'farmer.price': { en: 'Price per KG (₹)', ta: 'விலை / கிலோ (₹)' },
  'farmer.quantity': { en: 'Available Quantity (KG)', ta: 'கிடைக்கும் அளவு (கிலோ)' },
  'farmer.harvestDate': { en: 'Harvest Date', ta: 'அறுவடை தேதி' },
  'farmer.image': { en: 'Upload Image', ta: 'படம் பதிவேற்று' },
  'farmer.stockAvailable': { en: 'Available', ta: 'கிடைக்கும்' },
  'farmer.soldOut': { en: 'Sold Out', ta: 'விற்றுவிட்டது' },
  'farmer.earnings': { en: 'Earnings Overview', ta: 'வருமான மேற்பார்வை' },
  'farmer.mandiPrice': { en: 'Recommended Market Price', ta: 'பரிந்துரைக்கப்பட்ட சந்தை விலை' },
  'farmer.submit': { en: 'List Produce', ta: 'பொருளை பட்டியலிடு' },

  // Admin
  'admin.title': { en: 'Admin Panel', ta: 'நிர்வாக பேனல்' },
  'admin.pendingListings': { en: 'Pending Listings', ta: 'நிலுவையிலுள்ள பட்டியல்கள்' },
  'admin.analytics': { en: 'System Analytics', ta: 'அமைப்பு பகுப்பாய்வு' },
  'admin.approve': { en: 'Approve', ta: 'ஒப்புதல்' },
  'admin.reject': { en: 'Reject', ta: 'நிராகரி' },
  'admin.totalSales': { en: 'Total Sales', ta: 'மொத்த விற்பனை' },
  'admin.activeUsers': { en: 'Active Users', ta: 'செயலில் உள்ள பயனர்கள்' },
  'admin.totalFarmers': { en: 'Total Farmers', ta: 'மொத்த விவசாயிகள்' },
  'admin.totalOrders': { en: 'Total Orders', ta: 'மொத்த ஆர்டர்கள்' },

  // Checkout
  'checkout.title': { en: 'Checkout', ta: 'பணம் செலுத்து' },
  'checkout.cartReview': { en: 'Cart Review', ta: 'வண்டி மதிப்பாய்வு' },
  'checkout.shipping': { en: 'Shipping Details', ta: 'கப்பல் விவரங்கள்' },
  'checkout.payment': { en: 'Payment', ta: 'பணம் செலுத்துதல்' },
  'checkout.placeOrder': { en: 'Place Order', ta: 'ஆர்டர் செய்' },
  'checkout.total': { en: 'Total', ta: 'மொத்தம்' },

  // Order
  'order.confirmed': { en: 'Order Confirmed!', ta: 'ஆர்டர் உறுதிசெய்யப்பட்டது!' },
  'order.verifiedFarm': { en: 'Verified Farm', ta: 'சரிபார்க்கப்பட்ட பண்ணை' },
  'order.traceability': { en: 'Scan QR for Traceability', ta: 'கண்டறிய QR ஸ்கேன் செய்' },

  // General
  'general.language': { en: 'English', ta: 'தமிழ்' },
  'general.switchRole': { en: 'Switch Role', ta: 'பாத்திரம் மாற்று' },
  'general.consumer': { en: 'Consumer', ta: 'நுகர்வோர்' },
  'general.farmer': { en: 'Farmer', ta: 'விவசாயி' },
  'general.admin': { en: 'Admin', ta: 'நிர்வாகி' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}
