const videoFrame = document.getElementById("videoFrame");
const fullscreenButton = document.getElementById("fullscreenButton");
const playButton = document.getElementById("playButton");
const unmuteButton = document.getElementById("unmuteButton");
let lastUpdated = null;

// Function to check for updates
function checkForUpdate() {
    fetch("/video-status")
        .then(response => response.json())
        .then(data => {
            if (lastUpdated && lastUpdated !== data.updated) {
                console.log("New video pushed, reloading frame...");
                videoFrame.src = videoFrame.src.split("?")[0] + "?autoplay=1&muted=1&preload=auto&quality=720p";
            }
            lastUpdated = data.updated;
        })
        .catch(err => console.error("Error checking for updates:", err));
}

setInterval(checkForUpdate, 5000); // Check every 5 seconds

// Fullscreen functionality
fullscreenButton.addEventListener("click", () => {
    const container = document.querySelector(".video-container");

    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    }
});

// Play button functionality
playButton.addEventListener("click", () => {
    videoFrame.src = videoFrame.src.split("?")[0] + "?autoplay=1&muted=0&preload=auto&quality=720p";
});

// Unmute button functionality
unmuteButton.addEventListener("click", () => {
    videoFrame.src = videoFrame.src.split("?")[0] + "?autoplay=1&muted=0&preload=auto&quality=720p";
});
