/**
 * Leaderboard JavaScript
 * Handles animated score updates and real-time effects
 */

class Leaderboard {
    constructor() {
        this.scores = {
            grand: 296941381,
            major: 3274156,
            minor: 260146,
            mini: 30119
        };
        
        this.baseScores = { ...this.scores };
        this.updateIntervals = {};
        this.lastWonTimes = {
            grand: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
            major: Date.now() - (8 * 60 * 1000), // 8 minutes ago
            minor: Date.now() - (30 * 1000), // 30 seconds ago
            mini: Date.now() - (15 * 1000) // 15 seconds ago
        };
        
        this.init();
    }
    
    init() {
        this.startScoreAnimations();
        this.startLastWonUpdates();
        this.addVisualEffects();
    }
    
    startScoreAnimations() {
        // Grand Jackpot - updates every 2-5 seconds
        this.updateIntervals.grand = setInterval(() => {
            this.incrementScore('grand', this.getRandomIncrement(1000, 5000));
        }, this.getRandomInterval(2000, 5000));
        
        // Major Jackpot - updates every 1-3 seconds
        this.updateIntervals.major = setInterval(() => {
            this.incrementScore('major', this.getRandomIncrement(100, 1000));
        }, this.getRandomInterval(1000, 3000));
        
        // Minor Jackpot - updates every 0.5-2 seconds
        this.updateIntervals.minor = setInterval(() => {
            this.incrementScore('minor', this.getRandomIncrement(10, 100));
        }, this.getRandomInterval(500, 2000));
        
        // Mini Jackpot - updates every 0.3-1.5 seconds
        this.updateIntervals.mini = setInterval(() => {
            this.incrementScore('mini', this.getRandomIncrement(1, 50));
        }, this.getRandomInterval(300, 1500));
    }
    
    incrementScore(type, amount) {
        this.scores[type] += amount;
        this.animateScoreUpdate(type);
    }
    
    animateScoreUpdate(type) {
        const element = document.getElementById(`${type}-score`);
        if (!element) return;
        
        // Add animation class
        element.classList.add('score-updating');
        
        // Update the score with formatting
        element.textContent = this.formatNumber(this.scores[type]);
        
        // Remove animation class after animation
        setTimeout(() => {
            element.classList.remove('score-updating');
        }, 300);
        
        // Occasionally trigger a "win" effect
        if (Math.random() < 0.1) {
            this.triggerWinEffect(type);
        }
    }
    
    triggerWinEffect(type) {
        const element = document.getElementById(`${type}-score`);
        if (!element) return;
        
        // Add win animation
        element.classList.add('score-win');
        
        // Update last won time
        this.lastWonTimes[type] = Date.now();
        this.updateLastWonTime(type);
        
        // Remove win class
        setTimeout(() => {
            element.classList.remove('score-win');
        }, 1000);
    }
    
    updateLastWonTime(type) {
        const element = document.getElementById(`${type}-last-won`);
        if (!element) return;
        
        const timeDiff = Date.now() - this.lastWonTimes[type];
        const timeText = this.getTimeAgoText(timeDiff);
        element.textContent = `Last won ${timeText}`;
    }
    
    getTimeAgoText(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (seconds < 60) {
            return 'less than a minute ago';
        } else if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }
    
    startLastWonUpdates() {
        // Update last won times every 30 seconds
        setInterval(() => {
            Object.keys(this.lastWonTimes).forEach(type => {
                this.updateLastWonTime(type);
            });
        }, 30000);
    }
    
    addVisualEffects() {
        // Add hover effects to leaderboard items
        const items = document.querySelectorAll('.leaderboard-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
        
    }
    
    
    formatNumber(num) {
        return num.toLocaleString();
    }
    
    getRandomIncrement(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Public method to reset scores (for testing)
    resetScores() {
        this.scores = { ...this.baseScores };
        Object.keys(this.scores).forEach(type => {
            const element = document.getElementById(`${type}-score`);
            if (element) {
                element.textContent = this.formatNumber(this.scores[type]);
            }
        });
    }
    
    // Public method to stop animations
    stopAnimations() {
        Object.values(this.updateIntervals).forEach(interval => {
            clearInterval(interval);
        });
    }
}

// Initialize leaderboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.leaderboard = new Leaderboard();
    
    // Add global methods for testing
    window.resetLeaderboard = function() {
        window.leaderboard.resetScores();
    };
    
    window.stopLeaderboard = function() {
        window.leaderboard.stopAnimations();
    };
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Leaderboard;
}
