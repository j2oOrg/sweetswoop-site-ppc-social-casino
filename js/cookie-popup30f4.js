/**
 * Cookie Policy Popup JavaScript
 * Handles cookie consent management and popup display
 */

class CookiePopup {
    constructor() {
        this.popup = document.getElementById('cookie-popup');
        this.acceptAllBtn = document.getElementById('cookie-accept-all');
        this.acceptNecessaryBtn = document.getElementById('cookie-accept-necessary');
        
        this.cookieName = 'cookie_consent';
        this.consentTypes = {
            necessary: 'necessary',
            analytics: 'analytics',
            marketing: 'marketing',
            preferences: 'preferences'
        };
        
        this.init();
    }
    
    init() {
        // Check if user has already given consent
        if (!this.hasConsent()) {
            this.showPopup();
        }
        
        // Bind event listeners
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.acceptAllBtn) {
            this.acceptAllBtn.addEventListener('click', () => this.acceptAll());
        }
        
        if (this.acceptNecessaryBtn) {
            this.acceptNecessaryBtn.addEventListener('click', () => this.acceptNecessary());
        }
    }
    
    showPopup() {
        if (this.popup) {
            // Add a small delay to ensure smooth animation
            setTimeout(() => {
                this.popup.classList.add('show');
            }, 500);
        }
    }
    
    hidePopup() {
        if (this.popup) {
            this.popup.classList.remove('show');
            // Remove from DOM after animation
            setTimeout(() => {
                this.popup.style.display = 'none';
            }, 600);
        }
    }
    
    acceptAll() {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
            timestamp: new Date().toISOString()
        };
        
        this.setConsent(consent);
        this.hidePopup();
        this.enableAllCookies();
        
        // Show success message (optional)
        this.showMessage('All cookies accepted! Thank you for your consent.');
    }
    
    acceptNecessary() {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
            timestamp: new Date().toISOString()
        };
        
        this.setConsent(consent);
        this.hidePopup();
        this.enableNecessaryCookies();
        
        // Show success message (optional)
        this.showMessage('Only necessary cookies accepted.');
    }
    
    
    hasConsent() {
        return this.getCookie(this.cookieName) !== null;
    }
    
    getConsent() {
        const cookieValue = this.getCookie(this.cookieName);
        if (cookieValue) {
            try {
                return JSON.parse(cookieValue);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
    
    setConsent(consent) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration
        
        this.setCookie(this.cookieName, JSON.stringify(consent), expires);
    }
    
    enableAllCookies() {
        // Enable all tracking and analytics
        this.enableAnalytics();
        this.enableMarketing();
        this.enablePreferences();
    }
    
    enableNecessaryCookies() {
        // Only enable necessary cookies
        this.disableAnalytics();
        this.disableMarketing();
        this.disablePreferences();
    }
    
    enableAnalytics() {
        // Enable Google Analytics, etc.
        console.log('Analytics cookies enabled');
        // Example: gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
    
    disableAnalytics() {
        // Disable analytics
        console.log('Analytics cookies disabled');
        // Example: gtag('consent', 'update', { 'analytics_storage': 'denied' });
    }
    
    enableMarketing() {
        // Enable marketing cookies
        console.log('Marketing cookies enabled');
    }
    
    disableMarketing() {
        // Disable marketing cookies
        console.log('Marketing cookies disabled');
    }
    
    enablePreferences() {
        // Enable preference cookies
        console.log('Preference cookies enabled');
    }
    
    disablePreferences() {
        // Disable preference cookies
        console.log('Preference cookies disabled');
    }
    
    showMessage(message) {
        // Create a temporary success message
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            font-size: 14px;
            font-weight: 500;
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    }
    
    // Cookie utility functions
    setCookie(name, value, expires) {
        let cookieString = `${name}=${value}`;
        if (expires) {
            cookieString += `; expires=${expires.toUTCString()}`;
        }
        cookieString += '; path=/; SameSite=Lax';
        document.cookie = cookieString;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    
    // Public method to reset consent (for testing)
    resetConsent() {
        this.deleteCookie(this.cookieName);
        location.reload();
    }
}

// Initialize cookie popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookiePopup = new CookiePopup();
    
    // Add global method for testing
    window.resetCookieConsent = function() {
        window.cookiePopup.resetConsent();
    };
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookiePopup;
}
