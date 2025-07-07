# To-Do App

A production-ready Android to-do app built with Expo React Native (SDK 53) and SQLite for offline data persistence.

## Features

- ✅ **Create Tasks**: Add to-do items with title, description, and due dates
- ✅ **Read & Filter**: View all tasks, pending only, or completed tasks
- ✅ **Update Tasks**: Edit existing tasks and mark them as completed
- ✅ **Delete Tasks**: Remove tasks with confirmation prompts
- ✅ **Offline Support**: Works completely offline with SQLite storage
- ✅ **Minimalist Design**: Clean, distraction-free interface
- ✅ **Platform Differentiation**: Android app + Web landing page

## Tech Stack

- **Framework**: Expo React Native SDK 53
- **Language**: TypeScript with strict mode
- **Database**: expo-sqlite for offline persistence
- **State Management**: Zustand ^4.5.0
- **Navigation**: expo-router (file-based routing)
- **UI**: Minimalist design (#FFFFFF background, #007AFF accent)
- **Fonts**: Inter font family via @expo-google-fonts/inter
- **Date Picker**: @react-native-community/datetimepicker

## Project Structure

```
todo-app/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Main screen (todo list)
│   └── add-edit/
│       ├── index.tsx            # Add task screen
│       └── [id].tsx             # Edit task screen
├── src/
│   ├── components/              # Reusable components
│   │   ├── TodoItem.tsx         # Individual todo item
│   │   ├── TodoList.tsx         # Todo list with filters
│   │   ├── TodoForm.tsx         # Add/edit form
│   │   ├── LandingPage.tsx      # Web landing page
│   │   ├── Hero.tsx             # Landing page hero
│   │   ├── Features.tsx         # Features section
│   │   ├── Download.tsx         # Download section
│   │   └── Footer.tsx           # Footer
│   ├── screens/                 # Screen components (legacy)
│   ├── store/
│   │   └── todoStore.ts         # Zustand state management
│   ├── db/
│   │   └── database.ts          # SQLite database layer
│   └── assets/                  # Images and icons
├── app.json                     # Expo configuration
├── eas.json                     # EAS Build configuration
└── package.json                 # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and Bun (or PNPM/npm)
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`
- Android Studio (for emulator testing)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd todo-app
   bun install
   ```

2. **Start development server:**
   ```bash
   expo start
   ```

3. **Run on Android:**
   ```bash
   expo run:android
   ```

4. **Run web version:**
   ```bash
   expo start --web
   ```

### Database Schema

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);
```

## Building for Production

### Android APK

1. **Configure EAS Build:**
   ```bash
   eas build:configure
   ```

2. **Build APK:**
   ```bash
   eas build --platform android --profile production
   ```

3. **Download APK from EAS dashboard**

### Web Deployment

1. **Export static files:**
   ```bash
   expo export:web
   ```

2. **Deploy to Expo hosting:**
   ```bash
   expo publish
   ```

## Platform Differentiation

The app uses `Platform.OS` to render different content:

- **Android**: Full to-do app with CRUD functionality
- **Web**: Static landing page with download links

```typescript
// App.tsx
if (Platform.OS === 'web') {
  return <LandingPage />;
}
return <Slot />; // Expo Router for Android
```

## State Management

Uses Zustand for simple, type-safe state management:

```typescript
interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  isLoading: boolean;
  error: string | null;
  formData: TodoFormData;
  
  // Actions
  loadTodos: () => Promise<void>;
  addTodo: (todo) => Promise<void>;
  updateTodo: (id, updates) => Promise<void>;
  deleteTodo: (id) => Promise<void>;
  // ...
}
```

## Testing

### Development Testing

1. **Expo Go (recommended):**
   ```bash
   expo start
   # Scan QR code with Expo Go app
   ```

2. **Android Emulator:**
   ```bash
   expo run:android
   ```

3. **EAS Update (for testing builds):**
   ```bash
   eas update
   ```

### Production Testing

Test the APK on physical devices:
- Android 9+ (API level 28+)
- Recommended: Pixel 6, Pixel 8

## Distribution

### GitHub Releases

1. Upload APK to GitHub Releases
2. Tag as `v1.0.0`
3. Include installation instructions

### Web Landing Page

Deployed to Expo hosting with:
- Hero section
- Features list
- Download button linking to GitHub Release
- Installation instructions

## Development Commands

```bash
# Start development
expo start

# Run on Android
expo run:android

# Run web version
expo start --web

# Check compatibility
npx expo-doctor

# Build APK
eas build --platform android

# Deploy web
expo publish

# Update app
eas update
```

## Troubleshooting

### Common Issues

1. **SQLite errors**: Ensure database is initialized before use
2. **Font loading**: Check Inter fonts are properly loaded
3. **Navigation issues**: Verify expo-router setup
4. **Build failures**: Run `npx expo-doctor` to check compatibility

### Performance

- SQLite tested with 1,000+ todos
- Optimized FlatList rendering
- Minimal re-renders with Zustand

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with TypeScript strict mode
4. Test on Android emulator
5. Submit pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Expo React Native SDK 53