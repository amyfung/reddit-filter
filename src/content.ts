/**
 * @file Content script for the Reddit Post Filter extension.
 * @description Handles filtering and marking Reddit posts as seen.
 */

/**
 * Represents a Reddit post with its ID and DOM element.
 */
interface RedditPost {
    id: string;
    element: HTMLElement;
  }
  
  /**
   * Filters out seen posts and adds click listeners to unseen posts.
   */
  function filterPosts(): void {
    chrome.storage.local.get('seenPosts', (data: { seenPosts?: string[] }) => {
      const seenPosts = data.seenPosts || [];
      const posts = getRedditPosts();
      
      posts.forEach(({ id, element }) => {
        if (seenPosts.includes(id)) {
          hidePost(element);
        } else {
          addClickListener(element, id);
        }
      });
    });
  }
  
  /**
   * Retrieves all Reddit posts from the current page.
   * @returns {RedditPost[]} An array of Reddit post objects.
   */
  function getRedditPosts(): RedditPost[] {
    return Array.from(document.querySelectorAll('.thing')).map((element): RedditPost => ({
      id: element.getAttribute('data-fullname') || '',
      element: element as HTMLElement
    }));
  }
  
  /**
   * Hides a given post element.
   * @param {HTMLElement} element - The post element to hide.
   */
  function hidePost(element: HTMLElement): void {
    element.style.display = 'none';
  }
  
  /**
   * Adds a click listener to a post element to mark it as seen.
   * @param {HTMLElement} element - The post element to add the listener to.
   * @param {string} id - The ID of the post.
   */
  function addClickListener(element: HTMLElement, id: string): void {
    element.addEventListener('click', () => {
      chrome.storage.local.get('seenPosts', (data: { seenPosts?: string[] }) => {
        const updatedSeenPosts = [...(data.seenPosts || []), id];
        chrome.storage.local.set({ seenPosts: updatedSeenPosts });
      });
    });
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request: { action: string }) => {
    if (request.action === 'filterPosts') {
      filterPosts();
    }
  });
  
  // Initial filtering on page load
  filterPosts();