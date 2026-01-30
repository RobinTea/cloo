// Authentication module

const USERS_STORAGE_KEY = 'cloo_users';
const SESSION_STORAGE_KEY = 'cloo_session';

// Get all users from localStorage
function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// Save users to localStorage
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
}

// Register new user
function register(username, email, password) {
  try {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'Username already taken' };
    }
    
    // Create new user
    // Note: In a production application, passwords should be hashed on the server-side
    // before storage. Client-side hashing alone is not sufficient security.
    // This is a demo application using localStorage for simplicity.
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username,
      email,
      password // WARNING: Plain text storage - for demo purposes only
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Registration successful', user: newUser };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed' };
  }
}

// Login user
function login(emailOrUsername, password) {
  try {
    const users = getUsers();
    const user = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && 
      u.password === password
    );
    
    if (user) {
      // Set session
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));
      return { success: true, message: 'Login successful', user };
    }
    
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Login failed' };
  }
}

// Logout user
function logout() {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, message: 'Logout failed' };
  }
}

// Check if user is logged in
function isLoggedIn() {
  try {
    const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return session !== null;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

// Get current logged in user
function getCurrentUser() {
  try {
    const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Export functions
window.authModule = {
  register,
  login,
  logout,
  isLoggedIn,
  getCurrentUser
};
