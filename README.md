# Reddit Post Filter Chrome Extension

## Description

Reddit Post Filter is a Chrome extension that enhances your Reddit browsing experience by filtering out posts you've already seen.

## Features

- Automatically hides posts you've already viewed or clicked on
- Works across multiple Reddit pages and sessions
- Simple popup interface to clear your post history

## Installation

1. Clone this repository
2. Install dependencies 
3. Build the project
4. Load the extension in Chrome:
- Open Chrome and navigate to `chrome://extensions`
- Enable "Developer mode" in the top right corner
- Click "Load unpacked" and select the `dist` directory from this project

## Usage

Once installed, the extension will automatically start filtering Reddit posts. Posts you've already seen or clicked on will be hidden from view.

To clear your post history:
1. Click on the extension icon in your Chrome toolbar
2. Click the "Clear Seen Posts History" button in the popup

## Development

This project is built with TypeScript and uses the Chrome Extension API.

### Notes

Reddit itself tracks posts you've seen; currently, it styles seen posts differently by lightening the color of seen posts' titles. I considered using this fact to develop the extension, but I ultimately decided not to have the extension rely on this small, fickle detail. More generally, it would be helpful to use the already existing data regarding which posts have been viewed, but Reddit's API is not free.