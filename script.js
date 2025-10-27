console.log("Welcome to Kenyan Music Galore!");
function searchMusic() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".music-card, .video-card");

  cards.forEach(card => {
    let title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
// CATEGORY FILTER FUNCTION + ACTIVE BUTTON
const filterBtns = document.querySelectorAll('.filter-btn');
const allItems = document.querySelectorAll('.track, .video');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    allItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
// ---------- CUSTOM PLAYER CONTROLS ----------
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach((btn) => {
  const player = btn.closest('.player');
  const audio = player.querySelector('.audio');
  const progress = player.querySelector('.progress');

  btn.addEventListener('click', () => {
    if (audio.paused) {
      // Pause all others first
      document.querySelectorAll('.audio').forEach(a => a.pause());
      document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶️');

      audio.play();
      btn.textContent = '⏸️';
    } else {
      audio.pause();
      btn.textContent = '▶️';
    }
  });

  // Update progress bar as song plays
  audio.addEventListener('timeupdate', () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;
  });

  // Reset button when audio ends
  audio.addEventListener('ended', () => {
    btn.textContent = '▶️';
    progress.style.width = '0';
  });
});
// ---------- AUTO-PAUSE & SMART VIDEO CONTROLS ----------
const allVideos = document.querySelectorAll('video');

// When any video starts playing, pause all others
allVideos.forEach((vid) => {
  vid.addEventListener('play', () => {
    allVideos.forEach((otherVid) => {
      if (otherVid !== vid) {
        otherVid.pause();
      }
    });
  });

  // Optional: stop when it leaves the screen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !vid.paused) {
          vid.pause();
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(vid);
});