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

//main scroll 
const videoTitle = document.getElementById("video-title");

const lenis = new Lenis({
  duration: 1.25,
  easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
  wheelMultiplier: 1,
  touchMultiplier: 2,
  normalizeWheel: true
});

lenis.stop();  //lock

function unlockScroll() {
  lenis.start();
  scrollLock = false;
}

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ({ scroll }) => {
  currentScroll = scroll;
  handleScroll();
});

window.addEventListener("resize", () => {
  targetScroll = window.scrollY;
  currentScroll = window.scrollY;
});

function handleScroll() {
  const container = document.querySelector(".scroll-container");
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight - window.innerHeight;

  if (containerHeight <= 0) return;

  const scrolled = (currentScroll - containerTop) / containerHeight;
  const progress = Math.min(Math.max(scrolled, 0), 1);

  const frameIndex = Math.floor(progress * (frameCount - 1));
  drawFrame(frameIndex);

  if (progress > 0.8) {
    const fadeProgress = (progress - 0.8) / 0.1; // 0 → 1 over that range
    videoTitle.style.opacity = Math.min(fadeProgress, 1);
  } else {
    videoTitle.style.opacity = 0;
  }
}


//splash splash splash
const splash = document.getElementById("splash");

let splashDismissed = false;

document.body.classList.add("no-scroll");
window.scrollTo(0, 0); 

function dismissSplash() {
  if (splashDismissed) return;
  splashDismissed = true;
  
  window.scrollTo(0, 0);
  let currentscroll = 0;
  let targetScroll = 0;

  splash.classList.add("hidden");

  setTimeout(() => {
    splash.style.display = "none";
    console.log("Removing no-scroll");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
    unlockScroll()
  }, 1000); // important- if scroll doesnt work
}

splash.addEventListener("click", dismissSplash);

setTimeout(dismissSplash, 3000); 