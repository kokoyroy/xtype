# TypeX - Modern Typing Learning Application

A beautiful, feature-rich typing application built with React, TypeScript, and Tailwind CSS. Learn to type faster and more accurately with real-time feedback and interactive features.

[![TypeX Demo](https://img.shields.io/badge/Live%20Demo-xtype.pages.dev-blue?style=for-the-badge&logo=react)](https://xtype.pages.dev/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Smart Learning System**
- **Difficulty Levels**: Easy, Medium, and Hard word sets for progressive learning
- **Customizable Word Count**: Choose from 10, 25, 50, 100, or 200 words per test
- **Dynamic Text Generation**: Thousands of words across all difficulty levels

### 📊 **Real-time Analytics**
- **Live WPM Tracking**: Real-time words per minute calculation
- **Accuracy Monitoring**: Track your typing accuracy percentage
- **Progress Visualization**: Visual progress bar and completion statistics
- **Session Summary**: Detailed results after each test

### ⌨️ **Interactive Virtual Keyboard**
- **Finger Placement Guide**: Color-coded keys showing which finger to use
- **Touch Typing Support**: Learn proper finger positioning
- **Real-time Highlighting**: Keys light up as you type
- **Toggle Visibility**: Show/hide keyboard as needed

### 🎵 **Audio Feedback**
- **Sound Effects**: Audio feedback for correct/incorrect keystrokes
- **Volume Control**: Adjustable volume slider
- **Completion Sounds**: Melodic feedback when tests are complete

### 🎨 **Customizable Interface**
- **Theme Support**: Light, Dark, and System theme modes
- **Font Size Options**: Small, Medium, and Large text sizes
- **Visual Feedback**: Green/red highlighting for correct/incorrect characters
- **Responsive Design**: Works seamlessly on all devices

### ⚙️ **Advanced Settings**
- **Modal Settings Panel**: Clean, organized settings interface
- **Live WPM Display**: Toggle real-time WPM visibility
- **Error Highlighting**: Visual feedback for typing mistakes
- **Browser Shortcuts**: Preserved Cmd+R, F5, and other browser shortcuts

## 🚀 Live Demo

Try the application live at: **[https://xtype.pages.dev/](https://xtype.pages.dev/)**

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Audio**: Web Audio API
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/typex.git
   cd typex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 How to Use

1. **Start Typing**: Click on the typing area or press any key to begin
2. **Choose Settings**: Click the Settings button to customize your experience
3. **Select Difficulty**: Choose Easy, Medium, or Hard based on your skill level
4. **Set Word Count**: Pick how many words you want to type (10-200)
5. **Customize Display**: Adjust theme, font size, and other preferences
6. **Track Progress**: Monitor your WPM and accuracy in real-time
7. **Learn Proper Typing**: Use the virtual keyboard to see finger placement

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── SettingsPanel.tsx    # Settings modal
│   ├── StatsDisplay.tsx     # Statistics display
│   ├── TypingArea.tsx       # Main typing interface
│   └── VirtualKeyboard.tsx  # Interactive keyboard
├── hooks/               # Custom React hooks
│   └── useTypingEngine.ts   # Core typing logic
├── lib/                 # Utility functions
│   └── utils.ts             # Helper functions
├── types/               # TypeScript definitions
│   └── index.ts             # Type definitions
└── App.tsx              # Main application component
```

## 🎯 Key Features Explained

### **Typing Engine**
- Custom React hook managing all typing logic
- Real-time statistics calculation
- Character-level tracking and feedback
- Timer management and session control

### **Virtual Keyboard**
- Comprehensive finger mapping for touch typing
- Color-coded keys for different fingers
- Real-time highlighting of current character
- Responsive design for all screen sizes

### **Settings System**
- Modal-based settings interface
- Organized into logical sections
- Real-time theme switching
- Persistent user preferences

### **Audio System**
- Web Audio API for sound generation
- Multiple sound types (correct, incorrect, complete)
- Volume control with smooth transitions
- Audio context management

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Key Dependencies**
- `react` - UI framework
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icon library

## 🎨 Design Principles

- **Accessibility First**: WCAG compliant with keyboard navigation
- **Mobile Responsive**: Works on all device sizes
- **Performance Optimized**: Fast loading and smooth animations
- **User Experience**: Intuitive interface with clear feedback
- **Modern Standards**: Latest React patterns and best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by typing learning platforms like keybr.com
- Built with modern web technologies
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)

## 📞 Contact

- **Live Demo**: [https://xtype.pages.dev/](https://xtype.pages.dev/)
- **LinkedIn**: [https://www.linkedin.com/in/kourouklidis/](https://www.linkedin.com/in/kourouklidis/)
- **GitHub**: [https://github.com/kokoyroy](https://github.com/kokoyroy)

---

**Happy Typing! 🎉**

*Built with ❤️ using React, TypeScript, and Tailwind CSS*