/**
 * @file Popup script for the Reddit Post Filter extension.
 * @description Handles user interactions in the extension popup.
 */

/**
 * Initializes the popup functionality.
 */
function initPopup(): void {
    const clearButton = document.getElementById('clearHistory');
    if (clearButton) {
        clearButton.addEventListener('click', clearSeenPostsHistory);
    }
}

/**
 * Clears the history of seen posts.
 */
function clearSeenPostsHistory(): void {
    chrome.storage.local.set({ seenPosts: [] }, () => {
        alert('Seen posts history cleared!');
    });
}

// Initialize the popup when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initPopup);