// Drinks data and management module

const DRINKS_STORAGE_KEY = 'cloo_drinks';

// Pre-populated drinks data
const DEFAULT_DRINKS = [
  {
    id: 1,
    type: "original",
    color: "blackasdf",
    name: "CLOO",
    price: 18,
    discount: 2,
    amount: 19888,
    product: "drink"
  },
  {
    id: 2,
    type: "classic",
    color: "blue",
    name: "CLOO Energy",
    price: 12,
    discount: 0,
    amount: 5000,
    product: "drink"
  },
  {
    id: 3,
    type: "limited edition",
    color: "red",
    name: "Ejer",
    price: 25,
    discount: 5,
    amount: 1000,
    product: "drink"
  },
  {
    id: 4,
    type: "limited edition",
    color: "green",
    name: "Nightsky",
    price: 10,
    discount: 0,
    amount: 15000,
    product: "drink"
  },
  {
    id: 5,
    type: "classic",
    color: "purple",
    name: "CLOO COFFEE",
    price: 20,
    discount: 3,
    amount: 8000,
    product: "drink"
  },
  {
    id: 6,
    type: "classic",
    color: "orange",
    name: "caset",
    price: 14,
    discount: 10,
    amount: 12000,
    product: "drink"
  },
  {
    id: 7,
    type: "premium edition",
    color: "pink",
    name: "SNAP",
    price: 22,
    discount: 4,
    amount: 3000,
    product: "drink"
  },
  {
    id: 8,
    type: "standard",
    color: "yellow",
    name: "ANATOLY",
    price: 9,
    discount: 0,
    amount: 20000,
    product: "drink"
  }
];

// Initialize drinks in localStorage if not exists
function initializeDrinks() {
  try {
    const stored = localStorage.getItem(DRINKS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(DRINKS_STORAGE_KEY, JSON.stringify(DEFAULT_DRINKS));
    }
  } catch (error) {
    console.error('Error initializing drinks:', error);
  }
}

// Get all drinks
function getAllDrinks() {
  try {
    const stored = localStorage.getItem(DRINKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_DRINKS;
  } catch (error) {
    console.error('Error getting drinks:', error);
    return DEFAULT_DRINKS;
  }
}

// Get drink by ID
function getDrinkById(id) {
  const drinks = getAllDrinks();
  return drinks.find(drink => drink.id === parseInt(id));
}

// Search drinks by query (searches name, type, and color)
function searchDrinks(query) {
  if (!query || query.trim() === '') {
    return getAllDrinks();
  }
  
  const drinks = getAllDrinks();
  const searchTerm = query.toLowerCase().trim();
  
  return drinks.filter(drink => 
    drink.name.toLowerCase().includes(searchTerm) ||
    drink.type.toLowerCase().includes(searchTerm) ||
    drink.color.toLowerCase().includes(searchTerm)
  );
}

// Calculate discounted price
function getDiscountedPrice(drink) {
  if (drink.discount > 0) {
    return drink.price * (1 - drink.discount / 100);
  }
  return drink.price;
}

// Initialize drinks on load
initializeDrinks();

// Export functions for use in other modules
window.drinksModule = {
  getAllDrinks,
  getDrinkById,
  searchDrinks,
  getDiscountedPrice
};
