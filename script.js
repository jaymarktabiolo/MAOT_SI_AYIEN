/**
 * Interactive Thank You Proposal Flower Interface
 * Handles bouquet selection, animations, flower meanings, and background music
 */

class FlowerInterface {
    constructor() {
        this.currentBouquet = null;
        this.musicPlaying = false;
        this.petalsInterval = null;
        this.philosophyVisible = false;
        
        // Initialize the interface
        this.init();
    }

    /**
     * Initialize all event listeners and setup
     */
    init() {
        this.setupEventListeners();
        this.setupFlowerMeanings();
        this.startPetalAnimation();
    }

    /**
     * Setup all event listeners for the interface
     */
    setupEventListeners() {
        // Bouquet button listeners
        const bouquetButtons = document.querySelectorAll('.bouquet-btn');
        bouquetButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const flowerType = e.currentTarget.getAttribute('data-flower');
                this.selectBouquet(flowerType, e.currentTarget);
            });

            // Add hover sound effect (optional enhancement)
            button.addEventListener('mouseenter', () => {
                this.playHoverEffect();
            });
        });

        // Music control listener
        const musicBtn = document.getElementById('musicBtn');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        musicBtn.addEventListener('click', () => {
            this.toggleMusic();
        });

        // Philosophy button listener
        const philosophyBtn = document.getElementById('philosophyBtn');
        philosophyBtn.addEventListener('click', () => {
            this.togglePhilosophy();
        });

        // Handle music loading errors gracefully
        backgroundMusic.addEventListener('error', () => {
            console.log('Background music file not found or cannot be loaded');
            musicBtn.style.opacity = '0.5';
            musicBtn.title = 'Music file not available';
        });

        // Auto-play prevention handling
        backgroundMusic.addEventListener('canplaythrough', () => {
            console.log('Background music loaded successfully');
        });
    }

    /**
     * Define flower meanings and descriptions
     */
    setupFlowerMeanings() {
        this.flowerMeanings = {
            roses: {
                title: "Roses - Love & Gratitude",
                meaning: "Roses symbolize deep love, appreciation, and heartfelt gratitude. Red roses represent passionate love and respect, while pink roses convey gentle affection and thankfulness. Their timeless beauty makes them the perfect choice to express your most sincere appreciation and warm feelings toward someone special.",
                bouquet: [
                    { emoji: '🌹', color: '#dc143c', size: '4rem', position: { x: 50, y: 40 } },
                    { emoji: '🌹', color: '#ff1493', size: '3.5rem', position: { x: 30, y: 55 } },
                    { emoji: '🌹', color: '#dc143c', size: '3.8rem', position: { x: 70, y: 55 } },
                    { emoji: '🌹', color: '#b22222', size: '3.2rem', position: { x: 40, y: 70 } },
                    { emoji: '🌹', color: '#ff69b4', size: '3.6rem', position: { x: 60, y: 70 } },
                    { emoji: '🌿', color: '#228b22', size: '2rem', position: { x: 25, y: 45 } },
                    { emoji: '🌿', color: '#32cd32', size: '1.8rem', position: { x: 75, y: 45 } },
                    { emoji: '🎀', color: '#ff69b4', size: '2.5rem', position: { x: 50, y: 80 } }
                ]
            },
            tulips: {
                title: "Tulips - Perfect Love & Elegance",
                meaning: "Tulips represent perfect and pure love, elegance, and grace. They symbolize rebirth and new beginnings, making them ideal for expressing fresh gratitude and renewed appreciation. Their vibrant colors bring joy and cheerfulness, while their elegant form conveys refined beauty and sophisticated thankfulness.",
                bouquet: [
                    { emoji: '🌷', color: '#ff1493', size: '4rem', position: { x: 50, y: 35 } },
                    { emoji: '🌷', color: '#ff69b4', size: '3.7rem', position: { x: 35, y: 50 } },
                    { emoji: '🌷', color: '#da70d6', size: '3.9rem', position: { x: 65, y: 50 } },
                    { emoji: '🌷', color: '#ff1493', size: '3.4rem', position: { x: 25, y: 65 } },
                    { emoji: '🌷', color: '#ba55d3', size: '3.6rem', position: { x: 75, y: 65 } },
                    { emoji: '🌷', color: '#ff69b4', size: '3.3rem', position: { x: 50, y: 75 } },
                    { emoji: '🌿', color: '#228b22', size: '2rem', position: { x: 20, y: 40 } },
                    { emoji: '🌿', color: '#32cd32', size: '1.9rem', position: { x: 80, y: 40 } },
                    { emoji: '🎗️', color: '#da70d6', size: '2.2rem', position: { x: 50, y: 85 } }
                ]
            },
            sunflowers: {
                title: "Sunflowers - Loyalty & Adoration",
                meaning: "Sunflowers embody unwavering loyalty, adoration, and pure joy. They represent the sun's warmth and positive energy, symbolizing how someone brightens your life. Their tall, proud stance conveys strength and resilience, while their bright yellow petals spread happiness and optimism wherever they bloom.",
                bouquet: [
                    { emoji: '🌻', color: '#ffd700', size: '5rem', position: { x: 50, y: 30 } },
                    { emoji: '🌻', color: '#ffb347', size: '4.2rem', position: { x: 30, y: 50 } },
                    { emoji: '🌻', color: '#ffd700', size: '4.5rem', position: { x: 70, y: 50 } },
                    { emoji: '🌻', color: '#daa520', size: '3.8rem', position: { x: 20, y: 70 } },
                    { emoji: '🌻', color: '#ffb347', size: '4rem', position: { x: 80, y: 70 } },
                    { emoji: '🌻', color: '#ffd700', size: '3.5rem', position: { x: 50, y: 80 } },
                    { emoji: '🌿', color: '#228b22', size: '2.5rem', position: { x: 15, y: 35 } },
                    { emoji: '🌿', color: '#32cd32', size: '2.3rem', position: { x: 85, y: 35 } },
                    { emoji: '🌾', color: '#daa520', size: '2rem', position: { x: 50, y: 90 } }
                ]
            },
            lilies: {
                title: "Lilies - Purity & Rebirth",
                meaning: "Lilies symbolize purity, rebirth, and devotion. They represent the beauty of the soul and the purity of feelings. White lilies convey virtue and modesty, while colored lilies express passion and confidence. Their graceful form and sweet fragrance make them perfect for expressing deep respect and spiritual gratitude.",
                bouquet: [
                    { emoji: '🌼', color: '#ffffff', size: '4.5rem', position: { x: 50, y: 35 } },
                    { emoji: '🌼', color: '#f0f8ff', size: '4rem', position: { x: 30, y: 50 } },
                    { emoji: '🌼', color: '#fffacd', size: '4.2rem', position: { x: 70, y: 50 } },
                    { emoji: '🌼', color: '#ffffff', size: '3.7rem', position: { x: 25, y: 70 } },
                    { emoji: '🌼', color: '#f5f5dc', size: '3.9rem', position: { x: 75, y: 70 } },
                    { emoji: '🌿', color: '#228b22', size: '2.2rem', position: { x: 20, y: 40 } },
                    { emoji: '🌿', color: '#32cd32', size: '2rem', position: { x: 80, y: 40 } },
                    { emoji: '🌿', color: '#90ee90', size: '1.8rem', position: { x: 50, y: 25 } },
                    { emoji: '✨', color: '#ffffff', size: '2rem', position: { x: 50, y: 85 } }
                ]
            }
        };
    }

    /**
     * Handle bouquet selection and display
     * @param {string} flowerType - Type of flower selected
     * @param {HTMLElement} buttonElement - The clicked button element
     */
    selectBouquet(flowerType, buttonElement) {
        // Update active button state
        document.querySelectorAll('.bouquet-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        buttonElement.classList.add('active');

        // Set current bouquet
        this.currentBouquet = flowerType;

        // Display bouquet animation
        this.displayBouquetAnimation(flowerType);

        // Show flower meaning
        this.displayFlowerMeaning(flowerType);

        // Trigger special effects
        this.triggerSpecialEffects(flowerType);

        // Play selection sound (if available)
        this.playSelectionSound();
    }

    /**
     * Display animated bouquet for selected flower type
     * @param {string} flowerType - Type of flower to display
     */
    displayBouquetAnimation(flowerType) {
        const displayContainer = document.getElementById('bouquetDisplay');
        const flowerData = this.flowerMeanings[flowerType];

        // Clear existing content
        displayContainer.innerHTML = '';

        // Create bouquet animation container
        const bouquetContainer = document.createElement('div');
        bouquetContainer.className = 'realistic-bouquet';

        // Add flowers with realistic positioning
        flowerData.bouquet.forEach((flower, index) => {
            const flowerElement = document.createElement('div');
            flowerElement.className = 'realistic-flower';
            flowerElement.textContent = flower.emoji;
            flowerElement.style.fontSize = flower.size;
            flowerElement.style.color = flower.color;
            flowerElement.style.left = flower.position.x + '%';
            flowerElement.style.top = flower.position.y + '%';
            flowerElement.style.animationDelay = `${index * 0.15}s`;
            
            // Add natural rotation and scaling
            const randomRotation = Math.random() * 40 - 20;
            const randomScale = 0.9 + Math.random() * 0.2;
            flowerElement.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
            
            bouquetContainer.appendChild(flowerElement);
        });

        displayContainer.appendChild(bouquetContainer);

        // Add sparkle effects around the bouquet
        this.addSparkleEffects(displayContainer);
    }

    /**
     * Display flower meaning and description
     * @param {string} flowerType - Type of flower to show meaning for
     */
    displayFlowerMeaning(flowerType) {
        const meaningContainer = document.getElementById('flowerMeaning');
        const flowerData = this.flowerMeanings[flowerType];

        // Create meaning content
        meaningContainer.innerHTML = `
            <h3>${flowerData.title}</h3>
            <p>${flowerData.meaning}</p>
        `;

        // Show with animation
        meaningContainer.classList.add('show');
    }

    /**
     * Add sparkle effects around the bouquet
     * @param {HTMLElement} container - Container to add sparkles to
     */
    addSparkleEffects(container) {
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = `sparkle 2s infinite ${Math.random() * 2}s`;
            sparkle.style.pointerEvents = 'none';
            
            container.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 4000);
        }
    }

    /**
     * Trigger special effects based on flower type
     * @param {string} flowerType - Type of flower for special effects
     */
    triggerSpecialEffects(flowerType) {
        // Create floating petals specific to flower type
        this.createFloatingPetals(flowerType, 10);

        // Add CSS for sparkle animation if not already present
        if (!document.querySelector('#sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-style';
            style.textContent = `
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Create floating petals animation
     * @param {string} flowerType - Type of flower for petals
     * @param {number} count - Number of petals to create
     */
    createFloatingPetals(flowerType, count) {
        const petalsContainer = document.getElementById('floatingPetals');
        const flowerEmoji = this.flowerMeanings[flowerType].bouquet[0].emoji;

        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = flowerEmoji;
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDelay = Math.random() * 2 + 's';
            petal.style.animationDuration = (Math.random() * 3 + 5) + 's';

            petalsContainer.appendChild(petal);

            // Remove petal after animation completes
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 8000);
        }
    }

    /**
     * Start continuous petal animation
     */
    startPetalAnimation() {
        const petalsContainer = document.getElementById('floatingPetals');
        const petalTypes = ['🌸', '🌺', '🌼', '🌻'];

        this.petalsInterval = setInterval(() => {
            // Only add petals if there aren't too many already
            if (petalsContainer.children.length < 15) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDuration = (Math.random() * 4 + 6) + 's';
                petal.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';

                petalsContainer.appendChild(petal);

                // Remove petal after animation
                setTimeout(() => {
                    if (petal.parentNode) {
                        petal.parentNode.removeChild(petal);
                    }
                }, 10000);
            }
        }, 2000);
    }

    /**
     * Toggle background music playback
     */
    toggleMusic() {
        const musicBtn = document.getElementById('musicBtn');
        const backgroundMusic = document.getElementById('backgroundMusic');
        const btnText = musicBtn.querySelector('span');
        const btnIcon = musicBtn.querySelector('i');

        if (this.musicPlaying) {
            // Pause music
            backgroundMusic.pause();
            this.musicPlaying = false;
            musicBtn.classList.remove('playing');
            btnText.textContent = 'Play me';
            btnIcon.className = 'fas fa-music';
        } else {
            // Play music
            backgroundMusic.play().then(() => {
                this.musicPlaying = true;
                musicBtn.classList.add('playing');
                btnText.textContent = 'Pause';
                btnIcon.className = 'fas fa-pause';
            }).catch((error) => {
                console.log('Cannot play music:', error);
                // Handle autoplay restrictions
                btnText.textContent = 'Click to play';
            });
        }
    }

    /**
     * Play hover effect sound (placeholder for future enhancement)
     */
    playHoverEffect() {
        // Placeholder for hover sound effect
        // Could be implemented with Web Audio API for subtle UI sounds
    }

    /**
     * Toggle philosophy message display
     */
    togglePhilosophy() {
        const philosophyBtn = document.getElementById('philosophyBtn');
        const philosophyContainer = document.getElementById('philosophyMessage');
        
        if (this.philosophyVisible) {
            // Hide philosophy message
            philosophyContainer.classList.remove('show');
            philosophyBtn.classList.remove('active');
            this.philosophyVisible = false;
        } else {
            // Show philosophy message
            this.displayPhilosophyMessage();
            philosophyBtn.classList.add('active');
            this.philosophyVisible = true;
        }
    }

    /**
     * Display philosophy message about life
     */
    displayPhilosophyMessage() {
        const philosophyContainer = document.getElementById('philosophyMessage');
        
        const philosophyContent = `
            <h2>What is Life?</h2>
            <div class="quote">
                "Life is like a garden - it requires patience, care, and love to bloom into something beautiful. 
                Each moment is a seed of possibility, each challenge a chance to grow stronger, 
                and each joy a flower that brightens our path."
            </div>
            <div class="author">- Ancient Garden Wisdom</div>
            <div class="reflection">
                Life is the art of finding meaning in the ordinary, beauty in the struggle, and hope in the darkness. 
                It's about the connections we make, the love we share, and the gratitude we express. 
                Like flowers in a bouquet, each experience adds color and fragrance to our journey. 
                We bloom not just for ourselves, but to bring joy and beauty to others around us like you yien😇.
            </div>
        `;
        
        philosophyContainer.innerHTML = philosophyContent;
        philosophyContainer.classList.add('show');
    }

    /**
     * Play selection sound (placeholder for future enhancement)
     */
    playSelectionSound() {
        // Placeholder for selection sound effect
        // Could be implemented with Web Audio API for button click sounds
    }
}

// Initialize the flower interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const flowerInterface = new FlowerInterface();
    
    // Add some initial visual effects
    setTimeout(() => {
        const title = document.querySelector('.main-title');
        if (title) {
            title.style.animation = 'titleGlow 3s ease-in-out infinite alternate';
        }
    }, 1000);

    // Handle visibility change to pause music when tab is not active
    document.addEventListener('visibilitychange', () => {
        const backgroundMusic = document.getElementById('backgroundMusic');
        if (document.hidden && flowerInterface.musicPlaying) {
            backgroundMusic.pause();
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        const bouquetButtons = document.querySelectorAll('.bouquet-btn');
        const activeButton = document.querySelector('.bouquet-btn.active');
        
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (bouquetButtons[index]) {
                bouquetButtons[index].click();
            }
        } else if (e.key === ' ') {
            e.preventDefault();
            flowerInterface.toggleMusic();
        }
    });

    console.log('Thank You Proposal Flower Interface initialized successfully!');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlowerInterface;
}
