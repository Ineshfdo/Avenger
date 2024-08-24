// script.js

// Check if Service Workers are supported in the browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register the Service Worker
        navigator.serviceWorker.register('/anime-universe/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
} else {
    console.warn('Service Workers are not supported in this browser.');
}

// Optional: Add code here to handle Service Worker updates or other functionality
