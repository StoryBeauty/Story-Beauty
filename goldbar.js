document.addEventListener("DOMContentLoaded", function () {
    const messages = [
        "Review my Google page and get £10 off your next appointment!",
        "Follow me on social media for updates, beauty tips, and exclusive offers!",
    ];

    let index = 0;
    const textElement = document.getElementById("sliding-text");

    if (!textElement) {
        console.error("Element with ID 'sliding-text' not found!");
        return; // Stops script if the element is missing
    }

    function updateText() {
        textElement.innerText = messages[index];
        index = (index + 1) % messages.length;
    }

    updateText(); // Show the first message immediately
    setInterval(updateText, 5000); // Change text every 5 seconds
});
