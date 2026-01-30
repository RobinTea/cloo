// Cart management module

const CART_STORAGE_KEY = 'cloo_cart';

// Get cart from localStorage
function getCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart:', error);
    return false;
  }
}

// Add item to cart
function addToCart(drinkId, quantity = 1) {
  try {
    const cart = getCart();
    const drink = window.drinksModule.getDrinkById(drinkId);
    
    if (!drink) {
      return { success: false, message: 'Drink not found' };
    }
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.drinkId === drinkId);
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.push({
        drinkId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    saveCart(cart);
    
    // Update cart badge
    if (window.uiModule && window.uiModule.updateCartBadge) {
      window.uiModule.updateCartBadge();
    }
    
    return { success: true, message: 'Added to cart' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, message: 'Failed to add to cart' };
  }
}

// Remove item from cart
function removeFromCart(drinkId) {
  try {
    let cart = getCart();
    cart = cart.filter(item => item.drinkId !== drinkId);
    saveCart(cart);
    
    // Update cart badge
    if (window.uiModule && window.uiModule.updateCartBadge) {
      window.uiModule.updateCartBadge();
    }
    
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, message: 'Failed to remove from cart' };
  }
}

// Update quantity of item in cart
function updateQuantity(drinkId, quantity) {
  try {
    const cart = getCart();
    const item = cart.find(item => item.drinkId === drinkId);
    
    if (item) {
      if (quantity <= 0) {
        return removeFromCart(drinkId);
      }
      item.quantity = quantity;
      saveCart(cart);
      
      // Update cart badge
      if (window.uiModule && window.uiModule.updateCartBadge) {
        window.uiModule.updateCartBadge();
      }
      
      return { success: true, message: 'Quantity updated' };
    }
    
    return { success: false, message: 'Item not found in cart' };
  } catch (error) {
    console.error('Error updating quantity:', error);
    return { success: false, message: 'Failed to update quantity' };
  }
}

// Get cart items with drink details
function getCartItems() {
  try {
    const cart = getCart();
    return cart.map(item => {
      const drink = window.drinksModule.getDrinkById(item.drinkId);
      return {
        ...item,
        drink
      };
    }).filter(item => item.drink); // Filter out items where drink doesn't exist
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
}

// Get total item count in cart
function getCartCount() {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
}

// Calculate total price with discounts
function getTotal() {
  try {
    const items = getCartItems();
    return items.reduce((total, item) => {
      const price = window.drinksModule.getDiscountedPrice(item.drink);
      return total + (price * item.quantity);
    }, 0);
  } catch (error) {
    console.error('Error calculating total:', error);
    return 0;
  }
}

// Clear cart
function clearCart() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    
    // Update cart badge
    if (window.uiModule && window.uiModule.updateCartBadge) {
      window.uiModule.updateCartBadge();
    }
    
    return { success: true, message: 'Cart cleared' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false, message: 'Failed to clear cart' };
  }
}

// Export functions
window.cartModule = {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  getCartItems,
  getCartCount,
  getTotal,
  clearCart
};
