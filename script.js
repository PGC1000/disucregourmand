document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.play-btn');
    const fullscreenBtn = wrapper.querySelector('.fullscreen-btn');

    video.muted = true;
    video.volume = 0;
    video.addEventListener('volumechange', () => {
        video.muted = true;
        video.volume = 0;
    });

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.textContent = '⏸️';
        } else {
            video.pause();
            playBtn.textContent = '▶️';
        }
    });

    video.addEventListener('pause', () => {
        playBtn.textContent = '▶️';
    });
    video.addEventListener('play', () => {
        playBtn.textContent = '⏸️';
    });

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

document.addEventListener('DOMContentLoaded', function () {
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

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function showCookieBanner() {
    const consent = getCookie('cookieConsent');
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');

    if (!consent && banner) {
        banner.style.display = 'block';

        document.getElementById('accept-all').onclick = () => {
            setCookie('cookieConsent', JSON.stringify({ necessary: true, analytics: true, marketing: true }), 365);
            enableTracking();
            banner.style.display = 'none';
        };

        document.getElementById('reject-all').onclick = () => {
            setCookie('cookieConsent', JSON.stringify({ necessary: true, analytics: false, marketing: false }), 365);
            banner.style.display = 'none';
        };

        document.getElementById('customize').onclick = () => {
            modal.style.display = 'block';
        };

        document.getElementById('cookie-preferences').onsubmit = (e) => {
            e.preventDefault();
            const analytics = document.querySelector('input[name="analytics"]').checked;
            const marketing = document.querySelector('input[name="marketing"]').checked;
            setCookie('cookieConsent', JSON.stringify({ necessary: true, analytics, marketing }), 365);
            banner.style.display = 'none';
            modal.style.display = 'none';
            if (analytics || marketing) enableTracking();
        };
    } else {
        try {
            const parsed = JSON.parse(consent);
            if (parsed.analytics || parsed.marketing) enableTracking();
        } catch {}
    }
}

function trackVisits() {
    let visits = parseInt(localStorage.getItem('visits') || '0', 10);
    visits += 1;
    localStorage.setItem('visits', visits);
}

function enableTracking() {
    trackVisits();

    let startTime = Date.now();
    window.addEventListener('beforeunload', function () {
        let timeSpent = (Date.now() - startTime) / 1000;
        let total = parseFloat(localStorage.getItem('timeSpent') || '0');
        total += timeSpent;
        localStorage.setItem('timeSpent', total);
    });

    // Google Analytics pode ser carregado aqui se houver consentimento
    let script = document.createElement('script');
    cript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SCQ3S35SXX';
    document.head.appendChild(script);
}

window.addEventListener('DOMContentLoaded', () => {
    showCookieBanner();
});
