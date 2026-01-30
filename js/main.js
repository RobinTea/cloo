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
  
  // Parallax effect for home page hero section
  if (document.querySelector('.hero-section')) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    function handleParallax() {
      const heroSection = document.querySelector('.hero-section');
      const drinkImage = document.querySelector('.hero-drink-image');
      
      if (!heroSection || !drinkImage) return;
      
      const heroRect = heroSection.getBoundingClientRect();
      const scrollProgress = Math.max(0, -heroRect.top);
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply parallax while hero section is visible
      if (heroRect.bottom > 0) {
        const parallaxAmount = scrollProgress * 0.5;
        drinkImage.style.transform = `translateY(${parallaxAmount}px)`;
      }
    }
  }
});
