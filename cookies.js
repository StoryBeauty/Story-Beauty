document.addEventListener("DOMContentLoaded", function () {
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function acceptCookies() {
        setCookie("cookieConsent", "accepted", 365); // Save consent for 1 year
        document.getElementById("cookie-banner").style.display = "none";
        loadGoogleAnalytics(); // Load Google Analytics
    }

    function declineCookies() {
        setCookie("cookieConsent", "declined", 365); // Save decline choice for 1 year
        document.getElementById("cookie-banner").style.display = "none";
    }

    function loadGoogleAnalytics() {
        if (getCookie("cookieConsent") !== "accepted") return; // Block GA if no consent

        let gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R2H8CXP49K";
        document.head.appendChild(gaScript);

        gaScript.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag("js", new Date());
            gtag("config", "G-R2H8CXP49K", { 'anonymize_ip': true });
        };
    }

    // Show banner only if user hasn't accepted or declined cookies
    if (!getCookie("cookieConsent")) {
        let banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.innerHTML = `
            <p>
                This website uses Google Analytics to enhance your browsing experience, 
                improve website performance, and analyze visitor interactions. 
                By clicking 'Accept,' you allow us to collect anonymous data to optimize our content and services. 
                You can choose to decline, and no tracking will occur.
            </p>
            <button id="accept-cookies">Accept</button>
            <button id="decline-cookies">Decline</button>
        `;
        document.body.appendChild(banner);
        document.getElementById("cookie-banner").style.display = "block";

        document.getElementById("accept-cookies").addEventListener("click", acceptCookies);
        document.getElementById("decline-cookies").addEventListener("click", declineCookies);
    } else {
        // If user already accepted, load Google Analytics
        loadGoogleAnalytics();
    }
});
