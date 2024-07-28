# News App

## Overview

This Expo project is a news application that fetches and displays the top 100 news headlines from the [News API](https://newsapi.org/). The app provides offline access by storing the headlines in local storage and offers various features for dynamic list updates and user interactions.

## Features

### Fetching and Storing Headlines

- Implement a background task to fetch the top 100 news headlines from a news API.
- Store these headlines in local storage for offline access.

### Splash Screen and Initial View

- Display a splash logo of your choice on the app load.
- After the splash screen, show a list view with the first 10 headlines.

### Dynamic List Update

- Set up a timer to introduce a new batch of up to 5 random headlines to the top of the list every 10 seconds.
- Allow users to manually trigger fetching the next batch from local storage and resetting the drip timer.

### Handling Exhaustion of Headlines

- When all headlines from the current batch have been displayed, reset local storage.
- Fetch the next batch of headlines and populate the list view.

### User Interaction

- Allow users to swipe a headline to delete it or pin it to the top of the view.
- A pinned headline should stay in view when the list updates, whether manually or automatically.
- Deleting a headline should remove it from view, with the next headline appearing at the top of the list.

## Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed.
- Install the Expo CLI globally by running `npm install -g expo-cli`.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/prabhat120999/KiranaClubNewsApp.git
   cd YOUR_REPOSITORY
