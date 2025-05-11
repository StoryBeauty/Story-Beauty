document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video-slide");
    const dots = document.querySelectorAll(".dot");
    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    let currentIndex = 0;

    function showVideo(index) {
        if (index < 0) index = videos.length - 1;
        if (index >= videos.length) index = 0;
        currentIndex = index;

        videos.forEach((video, i) => {
            video.style.display = i === index ? "block" : "none";
            video.pause();
            video.currentTime = 0;
        });

        videos[currentIndex].play();
        updateDots();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    function playNextVideo() {
        showVideo(currentIndex + 1);
    }

    // Listen for video end event to play next video
    videos.forEach((video, index) => {
        video.addEventListener("ended", function () {
            playNextVideo();
        });
    });

    nextButton.addEventListener("click", () => showVideo(currentIndex + 1));
    prevButton.addEventListener("click", () => showVideo(currentIndex - 1));
    dots.forEach(dot => dot.addEventListener("click", (e) => showVideo(parseInt(e.target.dataset.index))));

    // Ensure first video starts playing
    showVideo(0);

    // Fix autoplay issues on iOS & browsers
    document.addEventListener("click", () => {
        if (videos[currentIndex].paused) {
            videos[currentIndex].play().catch(() => {});
        }
    });
});
