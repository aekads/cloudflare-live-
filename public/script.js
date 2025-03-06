const videoFrame = document.getElementById("videoFrame");
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

function toggleFullScreen() {
    const videoContainer = document.getElementById("videoContainer");
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().then(() => {
            setTimeout(() => {
                playButton.style.display = "block"; // Show play button after 5 seconds
            }, 5000);
        }).catch(err => {
            console.error("Error attempting full-screen mode:", err);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    toggleFullScreen(); // Auto full-screen when page loads
});

playButton.addEventListener("click", () => {
    videoFrame.src += "&autoplay=1"; // Trigger autoplay when play button is clicked
    playButton.style.display = "none";
});
