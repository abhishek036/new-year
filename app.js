/* ============================================
   NEW YEAR 2026 - MAIN APPLICATION SCRIPT
   ============================================ */

// Target Date: January 1, 2026, 00:30:00 (30 minutes after midnight)
const NEW_YEAR_2026 = new Date('January 1, 2026 00:30:00').getTime();

// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.querySelector('.sound-label');
const soundOnIcon = document.querySelector('.sound-on');
const soundOffIcon = document.querySelector('.sound-off');
const countdownContainer = document.getElementById('countdownContainer');

// State
let lastSeconds = null;
let isSoundOn = true;
let audioContext = null;

// ============================================
// COUNTDOWN LOGIC
// ============================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = NEW_YEAR_2026 - now;

    // If countdown is over
    if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        document.body.classList.add('celebration-mode');
        triggerCelebration();
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display with leading zeros
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    // Trigger pulse effect on seconds change
    if (lastSeconds !== null && lastSeconds !== seconds) {
        triggerPulse();
    }
    lastSeconds = seconds;
}

function triggerPulse() {
    // Pulse the seconds digit
    secondsEl.classList.add('pulse');
    setTimeout(() => {
        secondsEl.classList.remove('pulse');
    }, 300);

    // Background pulse effect
    document.body.classList.add('pulse-bg');
    setTimeout(() => {
        document.body.classList.remove('pulse-bg');
    }, 500);

    // Play subtle tick sound if enabled
    if (isSoundOn) {
        playTickSound();
    }
}

function triggerCelebration() {
    // Add extra confetti and effects when countdown reaches zero
    console.log('🎉 Happy New Year 2026! 🎉');
}

// ============================================
// SOUND SYSTEM
// ============================================

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playTickSound() {
    try {
        const ctx = initAudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5 note

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
        // Audio not supported or blocked
    }
}

function toggleSound() {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
        soundLabel.textContent = 'Sound On';
        soundOnIcon.classList.remove('hidden');
        soundOffIcon.classList.add('hidden');
        initAudioContext();
    } else {
        soundLabel.textContent = 'Sound Off';
        soundOnIcon.classList.add('hidden');
        soundOffIcon.classList.remove('hidden');
    }
}

// ============================================
// PARTICLES CONFIGURATION
// ============================================

async function initParticles() {
    await tsParticles.load("tsparticles", {
        fullScreen: {
            enable: false
        },
        background: {
            color: {
                value: "transparent"
            }
        },
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800
                }
            },
            color: {
                value: ["#FFD700", "#00D2FF", "#A855F7", "#FF6B9D"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: {
                    enable: true,
                    minimumValue: 0.2
                },
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: {
                    enable: true,
                    minimumValue: 1
                },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: "top",
                random: true,
                straight: false,
                outModes: {
                    default: "out",
                    bottom: "out",
                    top: "out"
                },
                attract: {
                    enable: false
                }
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1,
                    color: {
                        value: "#FFFFFF"
                    }
                }
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                bubble: {
                    distance: 150,
                    size: 6,
                    duration: 2,
                    opacity: 0.8
                },
                push: {
                    quantity: 4
                }
            }
        },
        detectRetina: true
    });
}

// Additional floating sparkles effect
async function initSparkles() {
    await tsParticles.load("tsparticles", {
        fullScreen: {
            enable: false
        },
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    area: 1000
                }
            },
            color: {
                value: ["#FFD700", "#FFFFFF"]
            },
            shape: {
                type: "star",
                options: {
                    star: {
                        sides: 4
                    }
                }
            },
            opacity: {
                value: 0.7,
                random: {
                    enable: true,
                    minimumValue: 0.3
                },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: {
                    enable: true,
                    minimumValue: 0.5
                }
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: "bounce"
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.1,
                    opacity: 1
                }
            }
        },
        detectRetina: true
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize particles
    initParticles().catch(console.error);

    // Sound toggle event
    soundToggle.addEventListener('click', () => {
        toggleSound();
        if (isSoundOn) {
            initAudioContext();
        }
    });

    // Add hover effect to timer digits
    const timerDigits = document.querySelectorAll('.timer-digit');
    timerDigits.forEach(digit => {
        digit.addEventListener('mouseenter', () => {
            digit.style.textShadow = '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.5)';
        });
        digit.addEventListener('mouseleave', () => {
            digit.style.textShadow = '';
        });
    });

    // Prefetch audio context on first user interaction
    document.addEventListener('click', () => {
        if (isSoundOn) {
            initAudioContext();
        }
    }, { once: true });

    console.log('✨ New Year 2026 Countdown initialized!');
    console.log(`⏰ Target: ${new Date(NEW_YEAR_2026).toLocaleString()}`);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce animation intensity when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}
