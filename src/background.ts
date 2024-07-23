/**
 * @file Background script for the Reddit Post Filter extension.
 * @description Handles extension installation and tab update events.
 */

/**
 * Initializes the extension's storage on installation.
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ seenPosts: [] });
});

/**
 * Listens for tab updates and sends a message to filter posts when a Reddit page is loaded.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('reddit.com')) {
        chrome.tabs.sendMessage(tabId, { action: 'filterPosts' });
    }
});