# Ingenious Streams

A modern live TV streaming application built with React Native and Expo. Stream your favorite live TV channels with an intuitive and feature-rich interface.

## Features

- **Live TV Streaming**: Watch live TV channels in high quality
- **Channel Browsing**: Discover featured channels and explore the full catalog
- **Video Player**: Full-featured player with playback controls
- **Responsive Design**: Optimized for both portrait and landscape viewing
- **Cross-Platform**: Works on iOS, Android, and web platforms
- **Tab Navigation**: Easy navigation between featured, explore, and settings

## Tech Stack

- **Framework**: [Expo](https://expo.dev) ~54.0
- **Language**: TypeScript 5.9
- **UI**: React Native 0.81
- **Navigation**: Expo Router with file-based routing
- **Video Playback**: Expo Video
- **State Management**: React hooks and AsyncStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Yarn package manager
- Expo CLI
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

### Running the App

#### Development Build
   ```bash
   yarn android  # Run on Android
   yarn ios      # Run on iOS
   yarn web      # Run on web
   ```

#### Expo Go
You can also run the app using [Expo Go](https://expo.dev/go) by scanning the QR code from the development server.

## Project Structure

```
ingenious-streams/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based screens
│   │   ├── index.tsx      # Home/Featured channels
│   │   ├── explore.tsx    # Explore channels
│   │   └── settings.tsx   # Settings screen
│   ├── player.tsx         # Video player screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── constants/            # App constants and configuration
└── assets/               # Images, fonts, and other assets
```

## Building for Production

Build the app using EAS Build:

```bash
eas build --platform android
eas build --platform ios
```

## Development

This project uses:
- **File-based routing** with Expo Router
- **TypeScript** for type safety
- **ESLint** for code linting

Start developing by editing files in the `app` directory. The app will automatically reload when you save changes.

## Scripts

- `yarn start` - Start the Expo development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS simulator
- `yarn web` - Run in web browser
- `yarn lint` - Run ESLint

## License

Private project

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
