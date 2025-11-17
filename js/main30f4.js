// Main JavaScript for Social Casino

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeGames();
    updateAuthNavigation();
    initializeGameSearch();
    initializeAgeVerification();
});

// Update authentication navigation based on login status
function updateAuthNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');
    
    if (authButtons && userMenu) {
        if (isLoggedIn) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            
            // Update user name if available
            const storedName = localStorage.getItem('userName');
            if (userName && storedName) {
                userName.textContent = storedName;
            }
        } else {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }
}

// Initialize games (placeholder for future game logic)
function initializeGames() {
    console.log('Social Casino initialized');
    
    // Add click animations to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Play game function
function playGame(gameType) {
    console.log(`Starting ${gameType} game...`);
    
    // Redirect to the game page
    window.location.href = `game.php?game=${gameType}`;
}

// Show game placeholder
function showGamePlaceholder(gameType) {
    const gameNames = {
        'slots': 'Slot Machine',
        'blackjack': 'Blackjack',
        'poker': 'Poker',
        'roulette': 'Roulette'
    };
    
    const message = `
        🎮 ${gameNames[gameType]} Game
        
        This is a placeholder for the ${gameNames[gameType]} game.
        In the future, this will load the actual game interface.
    `;
    
    alert(message);
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some visual feedback for interactions
function addVisualFeedback() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .game-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// Initialize visual feedback
addVisualFeedback();

// Console welcome message
console.log(`
🎰 Welcome to Social Casino! 🎰
This is a fun, no-money social casino.
All games are for entertainment only.
`);

// Scroll to games section
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}


// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.features-section, .how-it-works, .testimonials-section, .cta-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations
addScrollAnimations();

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('rememberMe');
    
    // Update navigation
    updateAuthNavigation();
    
    // Show logout message
    if (typeof showMessage === 'function') {
        showMessage('You have been logged out successfully.', 'success');
    }
    
    // Redirect to home page
    window.location.href = 'index.php';
}

// Game Search Functionality
function initializeGameSearch() {
    const searchInput = document.getElementById('games-search');
    const clearBtn = document.getElementById('clear-search');
    const gamesGrid = document.getElementById('games-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('search-results-count');
    
    if (!searchInput || !gamesGrid) return;
    
    // Get the 6 displayed game cards
    const gameCards = Array.from(gamesGrid.querySelectorAll('.game-card'));
    let isSearching = false;
    
    // Search functionality
    function performSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            // Show all 6 games (default view)
            isSearching = false;
            gameCards.forEach(card => {
                card.style.display = 'block';
            });
            noResults.style.display = 'none';
            resultsCount.textContent = '';
            clearBtn.style.display = 'none';
        } else {
            // Search through the 6 displayed games
            isSearching = true;
            let visibleCount = 0;
            
            gameCards.forEach(card => {
                const title = card.getAttribute('data-title') || '';
                if (title.includes(term)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show results info
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                resultsCount.textContent = '';
            } else {
                noResults.style.display = 'none';
                resultsCount.textContent = `Found ${visibleCount} game${visibleCount !== 1 ? 's' : ''}`;
            }
            
            clearBtn.style.display = 'block';
        }
    }
    
    
    // Event listeners
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        performSearch('');
        searchInput.focus();
    });
    
    
    // Add keyboard shortcuts
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            performSearch('');
        }
    });
    
    // Add search animation
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}

// Export functions for potential future use
window.SocialCasino = {
    playGame,
    scrollToGames,
    updateAuthNavigation,
    logout,
    initializeGameSearch
};

// Handle the age verification prompt entirely on the client to avoid 405s
function initializeAgeVerification() {
    const popup = document.getElementById('age-verification-popup');
    if (!popup) return;

    const form = popup.querySelector('.age-verification-form');
    const confirmBtn = popup.querySelector('button[name="age_verification"][value="confirm"]');
    const denyBtn = popup.querySelector('button[name="age_verification"][value="deny"]');
    const body = document.body;
    const ageKey = 'ageVerified';

    const enablePageAccess = () => {
        body.style.overflow = '';
        body.style.pointerEvents = '';
        popup.style.display = 'none';
    };

    const blockPageUntilVerified = () => {
        popup.style.display = 'flex';
        popup.style.pointerEvents = 'auto';
        body.style.overflow = 'hidden';
        body.style.pointerEvents = 'none';
    };

    if (localStorage.getItem(ageKey) === 'true') {
        enablePageAccess();
        return;
    }

    blockPageUntilVerified();

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.setItem(ageKey, 'true');
            enablePageAccess();
        });
    }

    if (denyBtn) {
        denyBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem(ageKey);
            alert('You must be 18 or older to continue.');
        });
    }
}
