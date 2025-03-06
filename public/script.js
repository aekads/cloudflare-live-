const videoFrame = document.getElementById("videoFrame");
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
        videoContainer.requestFullscreen().catch(err => {
            console.error("Error attempting full-screen mode:", err);
        });
    }
}
