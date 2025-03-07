const videoFrame = document.getElementById("videoFrame");
const fullscreenButton = document.getElementById("fullscreenButton");
const playButton = document.getElementById("playButton");
let lastUpdated = null;

function checkForUpdate() {
    fetch("/video-status")
        .then(response => response.json())
        .then(data => {
            if (lastUpdated && lastUpdated !== data.updated) {
                console.log("New video pushed, reloading frame...");
                videoFrame.src = videoFrame.src; // Reload only the iframe
            }
            lastUpdated = data.updated;
        })
        .catch(err => console.error("Error checking for updates:", err));
}

setInterval(checkForUpdate, 5000); // Check for updates every 5 seconds

// Fullscreen button functionality
fullscreenButton.addEventListener("click", () => {
    const container = document.querySelector(".video-container");

    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.mozRequestFullScreen) { // Firefox
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Opera
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { // IE/Edge
        container.msRequestFullscreen();
    }

    // Show play button after 2 seconds
    setTimeout(() => {
        playButton.style.display = "block";
    }, 2000);
});

// Play button functionality
playButton.addEventListener("click", () => {
    videoFrame.src = videoFrame.src; // Reload the iframe to play live stream
    playButton.style.display = "none";
});
