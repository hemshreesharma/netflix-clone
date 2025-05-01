// 1️⃣ Show the Login/Sign-In Modal  
function showAuthModal(mode) {
    const modal = document.createElement("div");
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h2>${mode === "login" ? "Login" : "Sign Up"}</h2>
                <input type="email" id="authEmail" placeholder="Enter Email" required>
                <input type="password" id="authPassword" placeholder="Enter Password" required>
                <button id="authSubmit">${mode === "login" ? "Login" : "Sign Up"}</button>
                <button id="closeModal">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal
    document.getElementById("closeModal").addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    // Handle authentication
    document.getElementById("authSubmit").addEventListener("click", () => handleAuth(mode));
}

// 2️⃣ Handle Login & Sign-In Logic  
function handleAuth(mode) {
    const email = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;

    if (!email.includes("@") || password.length < 6) {
        alert("⚠️ Enter a valid email and password (min. 6 characters)!");
        return;
    }

    if (mode === "signup") {
        // Store user in LocalStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("✅ Sign-Up Successful! Please login.");
    } else {
        // Check stored user
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userName", email.split("@")[0]);
            updateNavBar();
            alert("✅ Login Successful!");
        } else {
            alert("❌ Incorrect email or password!");
        }
    }
}

// 3️⃣ Update Navbar After Login  
function updateNavBar() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const userName = localStorage.getItem("userName");

    const nav = document.querySelector("nav div");
    if (isLoggedIn) {
        nav.innerHTML = `<span class="welcome-msg">Welcome, ${userName}!</span>
                         <button class="btn btn-red-sm" id="logoutBtn">Logout</button>`;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.clear();
            location.reload();
        });
    }
}

// 4️⃣ Event Listeners for Login/Sign-In Buttons  
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn-red-sm:first-child").addEventListener("click", () => showAuthModal("login"));
    document.querySelector(".btn-red-sm:last-child").addEventListener("click", () => showAuthModal("signup"));
    updateNavBar();
});
// 1️⃣ FAQ Section: Toggle Expand/Collapse  
document.querySelectorAll(".faqbox").forEach((box) => {
    box.addEventListener("click", () => {
        // Close all other open FAQs before opening the clicked one
        document.querySelectorAll(".faqbox").forEach((otherBox) => {
            if (otherBox !== box) {
                otherBox.classList.remove("active");
            }
        });

        // Toggle current FAQ
        box.classList.toggle("active");

        // Update SVG icon (Plus ↔ Minus)
        let icon = box.querySelector(".faq-icon path");
        if (box.classList.contains("active")) {
            icon.setAttribute("d", "M4 12H20"); // Minus icon  
        } else {
            icon.setAttribute("d", "M12 4V20 M4 12H20"); // Plus icon  
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".movie-slider");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    let scrollAmount = 0;
    const movieWidth = 160; // Adjusted size to match smaller posters
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    function scrollMovies(direction) {
        scrollAmount += direction * movieWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }

    prev.addEventListener("click", () => scrollMovies(-1));
    next.addEventListener("click", () => scrollMovies(1));

    // Auto-scroll every 4 seconds
    setInterval(() => scrollMovies(1), 4000);
});

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".movie-slider");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const modal = document.getElementById("trailerModal");
    const trailerVideo = document.getElementById("trailerVideo");
    const closeTrailer = document.getElementById("closeTrailer");

    let scrollAmount = 0;
    const movieWidth = 160;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    function scrollMovies(direction) {
        scrollAmount += direction * movieWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }

    prev.addEventListener("click", () => scrollMovies(-1));
    next.addEventListener("click", () => scrollMovies(1));

    // Auto-scroll every 4 seconds
    setInterval(() => scrollMovies(1), 4000);
});

// ✅ Move this function outside `DOMContentLoaded`
// Function to play local trailer
function playTrailer(videoUrl) {
    const modal = document.getElementById("trailerModal");
    const trailerVideo = document.getElementById("trailerVideo");
    const videoSource = document.getElementById("videoSource");

    videoSource.src = videoUrl; // Set video source
    trailerVideo.load(); // Reload video to apply new source
    trailerVideo.play(); // Start playing
    modal.style.display = "flex"; // Show modal
}

// Close trailer modal
document.getElementById("closeTrailer").addEventListener("click", () => {
    const modal = document.getElementById("trailerModal");
    const trailerVideo = document.getElementById("trailerVideo");

    trailerVideo.pause(); // Stop playback
    trailerVideo.src = ""; // Remove source
    modal.style.display = "none"; // Hide modal
});

// Close modal when clicking outside the video
document.getElementById("trailerModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("trailerModal")) {
        const modal = document.getElementById("trailerModal");
        const trailerVideo = document.getElementById("trailerVideo");

        trailerVideo.pause();
        trailerVideo.src = "";
        modal.style.display = "none";
    }
});
