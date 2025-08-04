document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.play-btn');
    const fullscreenBtn = wrapper.querySelector('.fullscreen-btn');

    // Always keep video muted
    video.muted = true;
    video.volume = 0;
    video.addEventListener('volumechange', () => {
        video.muted = true;
        video.volume = 0;
    });

    // Play/Pause button
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.textContent = '⏸️';
        } else {
            video.pause();
            playBtn.textContent = '▶️';
        }
    });

    // Update play button on video end/pause
    video.addEventListener('pause', () => {
        playBtn.textContent = '▶️';
    });
    video.addEventListener('play', () => {
        playBtn.textContent = '⏸️';
    });

    // Fullscreen button
    fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
});

// Scroll-to-top arrow logic
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    function toggleScrollBtn() {
        if (window.scrollY > 100) {
            scrollBtn.classList.remove('hide');
        } else {
            scrollBtn.classList.add('hide');
        }
    }
    window.addEventListener('scroll', toggleScrollBtn);
    toggleScrollBtn();
});

// Cookie consent banner
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!getCookie('cookieConsent') && banner) {
        banner.style.display = 'block';
        document.getElementById('accept-cookies').onclick = function() {
            setCookie('cookieConsent', 'yes', 365);
            banner.style.display = 'none';
        };
        document.getElementById('privacy-link').onclick = function(e) {
            e.preventDefault();
            alert("Nous utilisons Google Analytics pour analyser le trafic du site, y compris votre localisation approximative. Aucune donnée personnelle n'est vendue ou partagée à des tiers. Pour toute question, contactez-nous.");
        };
    }
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Track visits
function trackVisits() {
    let visits = parseInt(localStorage.getItem('visits') || '0', 10);
    visits += 1;
    localStorage.setItem('visits', visits);
    // Optionally, send this info to your server here
}

// Track time spent
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
    let timeSpent = (Date.now() - startTime) / 1000; // seconds
    let total = parseFloat(localStorage.getItem('timeSpent') || '0');
    total += timeSpent;
    localStorage.setItem('timeSpent', total);
    // Optionally, send this info to your server here
});

// Run on page load
window.addEventListener('DOMContentLoaded', function() {
    showCookieBanner();
    trackVisits();
});