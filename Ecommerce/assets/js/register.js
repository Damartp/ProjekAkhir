// ===========================
// FORM VALIDATION & SUBMIT
// ===========================

const createBtn = document.getElementById('createBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

createBtn.addEventListener('click', function () {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset styles
  [nameInput, emailInput, passwordInput].forEach(input => {
    input.style.borderBottomColor = '#ccc';
  });

  let valid = true;

  if (!name) {
    nameInput.style.borderBottomColor = '#db4444';
    valid = false;
  }

  if (!email || !isValidEmail(email)) {
    emailInput.style.borderBottomColor = '#db4444';
    valid = false;
  }

  if (!password || password.length < 6) {
    passwordInput.style.borderBottomColor = '#db4444';
    valid = false;
  }

  if (valid) {
    alert('Account created successfully! Welcome, ' + name + '!');
    // In a real app, you would submit data to a server here
  } else {
    alert('Please fill in all fields correctly.');
  }
});

// ===========================
// HELPER FUNCTIONS
// ===========================

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) || /^[0-9+\-\s]+$/.test(email); // also allow phone number
}

// ===========================
// INPUT FOCUS EFFECTS
// ===========================

[nameInput, emailInput, passwordInput].forEach(input => {
  input.addEventListener('focus', function () {
    this.style.borderBottomColor = '#db4444';
  });
  input.addEventListener('blur', function () {
    if (!this.value.trim()) {
      this.style.borderBottomColor = '#ccc';
    }
  });
});

// ===========================
// SEARCH BAR
// ===========================

const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function () {
  const query = searchInput.value.trim();
  if (query) {
    alert('Searching for: ' + query);
    // In a real app, navigate to search results page
  }
});

searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});