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

// Automatically enter full-screen mode when the page loads
window.onload = () => {
    if (videoFrame.requestFullscreen) {
        videoFrame.requestFullscreen();
    } else if (videoFrame.mozRequestFullScreen) { // Firefox
        videoFrame.mozRequestFullScreen();
    } else if (videoFrame.webkitRequestFullscreen) { // Chrome, Safari, Opera
        videoFrame.webkitRequestFullscreen();
    } else if (videoFrame.msRequestFullscreen) { // IE/Edge
        videoFrame.msRequestFullscreen();
    }

    // Show play button after 2 seconds
    setTimeout(() => {
        playButton.style.display = "block";
    }, 2000);
};

// Play button functionality
playButton.addEventListener("click", () => {
    videoFrame.src = videoFrame.src; // Reload the iframe to play live stream
    playButton.style.display = "none";
});