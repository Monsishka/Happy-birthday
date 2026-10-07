// Плавное появление карточек при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Небольшая задержка для эффекта «волны»
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));

    // Лёгкий параллакс для hero
    const hero = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight && hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - scrolled / window.innerHeight;
        }
    });
});
// Пасхалка-фото в самом низу
const secretPhoto = document.querySelector('.secret-photo');
if (secretPhoto) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                secretPhoto.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(secretPhoto);
}
// ============ МУЗЫКА ============
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Кнопка в hero
if (playBtn && bgMusic) {
    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                isPlaying = true;
                playBtn.classList.add('playing');
                playBtn.querySelector('.play-text').textContent = 'играет...';
                musicToggle.classList.add('show', 'playing');
            }).catch(err => {
                console.log('Не удалось воспроизвести:', err);
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            playBtn.classList.remove('playing');
            playBtn.querySelector('.play-text').textContent = 'нажми, чтобы начать';
            musicToggle.classList.remove('playing');
        }
    });
}

// Плавающая кнопка
if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            if (playBtn) {
                playBtn.classList.remove('playing');
                playBtn.querySelector('.play-text').textContent = 'нажми, чтобы начать';
            }
        } else {
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                if (playBtn) {
                    playBtn.classList.add('playing');
                    playBtn.querySelector('.play-text').textContent = 'играет...';
                }
            });
        }
    });
}
