// Main JavaScript - Common functionality for all pages

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart badge
  if (window.uiModule && window.uiModule.updateCartBadge) {
    window.uiModule.updateCartBadge();
  }
  
  // Initialize account menu
  if (window.uiModule && window.uiModule.updateAccountMenu) {
    window.uiModule.updateAccountMenu();
  }
  
  // Setup hamburger menu
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.uiModule.openMenu();
    });
  }
  
  // Setup menu close button
  const closeBtn = document.querySelector('.close-menu');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.uiModule.closeMenu();
    });
  }
  
  // Setup menu overlay
  const overlay = document.querySelector('.menu-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      window.uiModule.closeMenu();
    });
  }
  
  // Setup cart icon
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }
  
  // Setup account icon
  const accountIcon = document.querySelector('.account-icon');
  if (accountIcon) {
    accountIcon.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.authModule.isLoggedIn()) {
        window.location.href = 'account.html';
      } else {
        window.location.href = 'login.html';
      }
    });
  }
  
});

