document.addEventListener("DOMContentLoaded", () => {
    console.log("Video page loaded");
    
    // Reload page every 5 minutes
    setTimeout(() => {
        location.reload();
    }, 300000);
});