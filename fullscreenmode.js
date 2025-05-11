document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".gallery-item");
    let lightbox = document.querySelector(".lightbox"); // Use only the existing lightbox

    if (!lightbox) {
        console.error("Lightbox not found in gallery.html!"); // Debugging
        return;
    }

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxVideo = document.getElementById("lightbox-video");
    const closeButton = lightbox.querySelector(".close");
    const prevButton = lightbox.querySelector(".prev");
    const nextButton = lightbox.querySelector(".next");

    let currentIndex = 0;
    let allItems = Array.from(items);

    // Prevent duplicate event listeners by removing existing ones
    closeButton.removeEventListener("click", closeLightbox);
    nextButton.removeEventListener("click", nextItem);
    prevButton.removeEventListener("click", prevItem);
    lightbox.removeEventListener("click", outsideClick);
    document.removeEventListener("keydown", keyboardNav);

    items.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (!allItems[currentIndex]) return;
        const clickedItem = allItems[currentIndex];

        // Reset display first
        lightboxImage.style.display = "none";
        lightboxVideo.style.display = "none";
        lightboxVideo.pause();
        lightboxVideo.src = ""; // Clear video source

        // Check if it's an image
        if (clickedItem.querySelector("img")) {
            const imgSrc = clickedItem.querySelector("img").getAttribute("src");
            lightboxImage.src = imgSrc;
            lightboxImage.style.display = "block";
        }
        // Check if it's a video
        else if (clickedItem.querySelector("video")) {
            const videoSrc = clickedItem.querySelector("video").getAttribute("src");
            lightboxVideo.src = videoSrc;
            lightboxVideo.style.display = "block";
            lightboxVideo.play();
        }

        // Show lightbox
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImage.src = ""; // Clear image
        lightboxVideo.pause();
        lightboxVideo.src = ""; // Clear video
        document.body.style.overflow = ""; // Restore scrolling
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % allItems.length;
        openLightbox();
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
        openLightbox();
    }

    function outsideClick(e) {
        if (e.target === lightbox || e.target === closeButton) {
            closeLightbox();
        }
    }

    function keyboardNav(e) {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") nextItem();
            if (e.key === "ArrowLeft") prevItem();
            if (e.key === "Escape") closeLightbox();
        }
    }

    // Add event listeners (only once)
    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", nextItem);
    prevButton.addEventListener("click", prevItem);
    lightbox.addEventListener("click", outsideClick);
    document.addEventListener("keydown", keyboardNav);
});
