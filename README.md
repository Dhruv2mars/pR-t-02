# Todo App 📝

A modern, cross-platform todo application built with React Native and Expo. Available as both a web application and Android APK.

## 🌐 Live Demo

**Web App:** [https://2doapp.expo.app](https://2doapp.expo.app)

**Android APK:** [Download from Releases](https://github.com/Dhruv2mars/pR-t-02/releases/latest)

## ✨ Features

- ✅ **Cross-Platform**: Works on web and Android
- 📱 **Responsive Design**: Optimized for all screen sizes
- 💾 **Local Storage**: SQLite database for offline functionality
- 🎨 **Modern UI**: Clean, intuitive interface
- 📥 **Direct Download**: One-click APK download from web app
- 🚀 **Fast Performance**: Built with React Native and Expo Router

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Database**: SQLite (expo-sqlite)
- **Styling**: React Native StyleSheet
- **Build**: EAS Build
- **Hosting**: Expo EAS Hosting
- **State Management**: React Hooks

## 📱 Platforms

### Web Application
- Accessible at [2doapp.expo.app](https://2doapp.expo.app)
- Responsive design for desktop and mobile browsers
- Includes download button for Android APK

### Android Application
- Production APK available in [GitHub Releases](https://github.com/Dhruv2mars/pR-t-02/releases)
- Offline functionality with SQLite storage
- Native Android performance

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- EAS CLI (for building)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhruv2mars/pR-t-02.git
   cd pR-t-02/todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npx expo start
   ```

4. **Run on different platforms**
   - **Web**: Press `w` in the terminal or visit `http://localhost:8081`
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **iOS**: Press `i` (requires macOS and Xcode)

## 🏗️ Building

### Web Build
```bash
npx expo export:web
```

### Android APK
```bash
eas build --platform android --profile production
```

### Deploy to Expo Hosting
```bash
eas deploy --prod
```

## 📁 Project Structure

```
todo-app/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page (web landing)
│   └── add-edit/          # Todo add/edit screens
├── src/
│   ├── components/        # Reusable components
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   ├── LandingPage.tsx
│   │   └── Download.tsx
│   ├── db/               # Database configuration
│   │   └── database.ts
│   ├── store/            # State management
│   │   └── todoStore.ts
│   └── assets/           # Images and icons
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
└── package.json
```

## 🔧 Configuration

### EAS Build Profiles
- **Development**: Internal distribution with dev client
- **Preview**: Internal APK builds for testing
- **Production**: Store-ready builds

### Environment Variables
No environment variables required for basic functionality.

## 📦 Dependencies

### Core
- `expo` - Expo SDK
- `react-native` - React Native framework
- `expo-router` - File-based routing
- `expo-sqlite` - SQLite database

### UI & Navigation
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native navigation primitives

### Development
- `expo-dev-client` - Development builds
- `@expo/webpack-config` - Web bundling

## 🚀 Deployment

### Web Deployment
The web app is automatically deployed to Expo EAS Hosting:
- **Production URL**: [https://2doapp.expo.app](https://2doapp.expo.app)
- **Dashboard**: [Expo Project Dashboard](https://expo.dev/projects/2c6386a8-1ab7-4add-9e7b-9d5bad17039e)

### Android Distribution
APK files are distributed through GitHub Releases:
- Production builds are automatically uploaded
- Direct download link available on web app
- No Google Play Store submission required

## 📱 Installation Instructions (Android)

1. **Download APK**: Click "Download APK" on the web app or download from [GitHub Releases](https://github.com/Dhruv2mars/pR-t-02/releases)
2. **Enable Unknown Sources**: Go to Settings > Security > Enable "Install from Unknown Sources"
3. **Install**: Open the downloaded APK file and follow installation prompts
4. **Launch**: Find "To-Do App" in your app drawer and start organizing!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Web App**: [https://2doapp.expo.app](https://2doapp.expo.app)
- **GitHub Repository**: [https://github.com/Dhruv2mars/pR-t-02](https://github.com/Dhruv2mars/pR-t-02)
- **Latest Release**: [Download Android APK](https://github.com/Dhruv2mars/pR-t-02/releases/latest)
- **Expo Project**: [Dashboard](https://expo.dev/projects/2c6386a8-1ab7-4add-9e7b-9d5bad17039e)

---

**Built with React Native & Expo** 🚀