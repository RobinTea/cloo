// UI helper functions module

// Create drink card HTML
function createDrinkCard(drink) {
  const discountedPrice = window.drinksModule.getDiscountedPrice(drink);
  const hasDiscount = drink.discount > 0;
  
  return `
    <a href="product.html?id=${drink.id}" class="drink-card" data-id="${drink.id}" style="text-decoration: none; color: inherit;">
      <div class="drink-image" style="background: linear-gradient(135deg, ${drink.color} 0%, ${drink.color}88 100%);">
        <img class="drink-img" src="img/can/${drink.id}.png" alt="${drink.name}">
      </div>
      <div class="drink-type-badge">${drink.type}</div>
      <div class="drink-info">
        <h3 class="drink-name">${drink.name}</h3>
        <div class="drink-price">
          ${hasDiscount ? `
            <span class="original-price">$${drink.price.toFixed(2)}</span>
            <span class="discounted-price">$${discountedPrice.toFixed(2)}</span>
            <span class="discount-badge">${drink.discount}% OFF</span>
          ` : `
            <span class="price">$${drink.price.toFixed(2)}</span>
          `}
        </div>
      </div>
    </a>
  `;
}

// Update cart badge in header
function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    const count = window.cartModule.getCartCount();
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Open side navigation menu
function openMenu() {
  const menu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.menu-overlay');
  
  if (menu) {
    menu.classList.add('active');
  }
  if (overlay) {
    overlay.classList.add('active');
  }
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = 'hidden';
}

// Close side navigation menu
function closeMenu() {
  const menu = document.querySelector('.side-menu');
  const overlay = document.querySelector('.menu-overlay');
  
  if (menu) {
    menu.classList.remove('active');
  }
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
}

// Show toast notification
function showToast(message, type = 'info') {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Render drinks grid
function renderDrinksGrid(drinks, containerId = 'drinks-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (drinks.length === 0) {
    container.innerHTML = '<p class="no-results">No drinks found</p>';
    return;
  }
  
  container.innerHTML = drinks.map(drink => createDrinkCard(drink)).join('');
}

// Update account menu based on login status
function updateAccountMenu() {
  const accountIcon = document.querySelector('.account-icon');
  if (!accountIcon) return;
  
  if (window.authModule.isLoggedIn()) {
    const user = window.authModule.getCurrentUser();
    accountIcon.title = `Account: ${user.username}`;
  } else {
    accountIcon.title = 'Login / Register';
  }
}

// Export functions
window.uiModule = {
  createDrinkCard,
  updateCartBadge,
  openMenu,
  closeMenu,
  showToast,
  renderDrinksGrid,
  updateAccountMenu
};

//noise noise nosie
const noiseCanvas = document.getElementById("noise-canvas");
const noiseCtx = noiseCanvas.getContext("2d");
const noiseTexture = new Image();
noiseTexture.src = 'img/noise.jpg';

function resize() {
  noiseCanvas.width = window.innerWidth;
  noiseCanvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let noiseFrame = 0;

function drawNoise() {
  if (!noiseTexture.complete) {
    requestAnimationFrame(drawNoise);
    return;
  }

  noiseFrame++;
  if (noiseFrame % 3 !== 0) {  // 20fps is enough for noise
    requestAnimationFrame(drawNoise);
    return;
  }

  const texW = noiseTexture.width;
  const texH = noiseTexture.height;

  // Random offset each frame — makes it shimmer
  const offsetX = Math.floor(Math.random() * texW);
  const offsetY = Math.floor(Math.random() * texH);

  noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);

  for (let x = -texW + offsetX; x < noiseCanvas.width; x += texW) {
    for (let y = -texH + offsetY; y < noiseCanvas.height; y += texH) {
      noiseCtx.drawImage(noiseTexture, x, y);
    }
  }

  requestAnimationFrame(drawNoise);
}

noiseTexture.onload = () => drawNoise();

