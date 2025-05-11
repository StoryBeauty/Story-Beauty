document.addEventListener("DOMContentLoaded", function () {
    // Create and Insert the Menu Button
    const menuButton = document.createElement("button");
    menuButton.id = "menu-button";
    menuButton.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;
    document.body.appendChild(menuButton);

    // Create and Insert the Sidebar Menu
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.innerHTML = `
        <button id="menu-button" class="close-sidebar">&times;</button>
        <ul>
            <li><a href="index.html"><img src="media/icons/home.png" class="nav-icon"> Home</a></li>
            <li><a href="services.html"><img src="media/icons/book.png" class="nav-icon"> Book Now</a></li>
            <li><a href="gallery.html"><img src="media/icons/gallery.png" class="nav-icon"> Gallery</a></li>
            <li><a href="terms.html"><img src="media/icons/terms.png" class="nav-icon"> Booking Policy</a></li>
            <li><a href="contact.html"><img src="media/icons/contact.png" class="nav-icon"> Contact Us</a></li>
        </ul>
        <!-- Sidebar Footer -->
        <footer class="sidebar-footer">
            <a href="https://storybeauty.co.uk/terms.html">Terms of Use</a>
        </footer>
    `;
    document.body.appendChild(sidebar);

    // Toggle Sidebar
    menuButton.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-open");
        menuButton.classList.toggle("open"); // Apply animation
    });

    // Close Sidebar When Clicking Outside
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuButton && !menuButton.contains(event.target)) {
            sidebar.classList.remove("sidebar-open");
            menuButton.classList.remove("open");
        }
    });

    // ✅ FIX: USE EXISTING LIGHTBOX, DO NOT CREATE A NEW ONE
    const lightbox = document.querySelector(".lightbox"); // Use the one from gallery.html

    if (!lightbox) {
        console.error("Lightbox not found in gallery.html!");
        return; // Prevent errors if no lightbox exists
    }

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxVideo = document.getElementById("lightbox-video");
    const closeButton = lightbox.querySelector(".close");
    const prevButton = lightbox.querySelector(".prev");
    const nextButton = lightbox.querySelector(".next");
    const items = document.querySelectorAll(".gallery-item");

    let currentIndex = 0;
    let allItems = Array.from(items);

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
