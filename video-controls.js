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