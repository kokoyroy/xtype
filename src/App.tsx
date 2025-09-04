import { useState, useCallback, useEffect } from 'react'
import type { TypingSettings } from './types'
import { useTypingEngine } from './hooks/useTypingEngine'
import { TypingArea } from './components/TypingArea'
import { StatsDisplay } from './components/StatsDisplay'
import { VirtualKeyboard } from './components/VirtualKeyboard'
import { SettingsPanel } from './components/SettingsPanel'
import { RotateCcw, Settings, Keyboard, BarChart3 } from 'lucide-react'
import { cn, playSound } from './lib/utils'

const defaultSettings: TypingSettings = {
  difficulty: 'medium',
  wordCount: 50,
  showKeyboard: true,
  soundEnabled: false,
  theme: 'system',
  fontSize: 'medium',
  showWpmLive: true,
  highlightErrors: true
}

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [lastTypedChar, setLastTypedChar] = useState<string>('')
  const [wasCorrect, setWasCorrect] = useState<boolean>(true)

  const {
    characters,
    currentIndex,
    stats,
    isActive,
    settings,
    handleKeyPress,
    handleBackspace,
    reset,
    generateNewText,
    updateSettings
  } = useTypingEngine(defaultSettings)

  const handleKeyPressWithFeedback = useCallback((key: string) => {
    const currentChar = characters[currentIndex]
    if (currentChar) {
      const correct = key === currentChar.char
      setLastTypedChar(key)
      setWasCorrect(correct)
      
      // Play sound effect
      if (correct) {
        playSound('correct', settings.soundEnabled)
      } else {
        playSound('incorrect', settings.soundEnabled)
      }
      
      handleKeyPress(key)
    }
  }, [characters, currentIndex, handleKeyPress, settings.soundEnabled])

  const handleSettingsChange = useCallback((newSettings: Partial<TypingSettings>) => {
    updateSettings(newSettings)
    
    // Handle theme switching
    if (newSettings.theme !== undefined) {
      const root = document.documentElement
      if (newSettings.theme === 'dark') {
        root.classList.add('dark')
      } else if (newSettings.theme === 'light') {
        root.classList.remove('dark')
      } else if (newSettings.theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }
    
    // If word count or difficulty changed, generate new text
    if (newSettings.wordCount !== undefined || newSettings.difficulty !== undefined) {
      // Small delay to ensure settings are updated first
      setTimeout(() => {
        generateNewText()
      }, 100)
    }
  }, [updateSettings, generateNewText])

  // Initialize theme on mount
  useEffect(() => {
    const root = document.documentElement
    if (settings.theme === 'dark') {
      root.classList.add('dark')
    } else if (settings.theme === 'light') {
      root.classList.remove('dark')
    } else if (settings.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [settings.theme])

  // Play completion sound when test is complete
  useEffect(() => {
    if (stats.isComplete) {
      playSound('complete', settings.soundEnabled)
    }
  }, [stats.isComplete, settings.soundEnabled])

  const currentChar = characters[currentIndex]?.char || ''

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Keyboard className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TypeX
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={reset}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-card border border-border hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md text-card-foreground"
                title="Reset typing test"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md",
                  showSettings
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border hover:bg-accent text-card-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Typing Area - Takes up 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Display */}
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <StatsDisplay stats={stats} showLiveWpm={settings.showWpmLive} />
            </div>
            
            {/* Typing Area */}
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border">
              <TypingArea
                characters={characters}
                currentIndex={currentIndex}
                onKeyPress={handleKeyPressWithFeedback}
                onBackspace={handleBackspace}
                isActive={isActive}
                className={cn(
                  "transition-all duration-200",
                  settings.fontSize === 'small' && "text-sm",
                  settings.fontSize === 'large' && "text-xl"
                )}
              />
            </div>
            
            {/* Virtual Keyboard */}
            {settings.showKeyboard && (
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
                <VirtualKeyboard
                  currentChar={currentChar}
                  lastTypedChar={lastTypedChar}
                  wasCorrect={wasCorrect}
                />
              </div>
            )}
            
            {/* Progress Summary */}
            {stats.isComplete && (
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center space-x-3 text-card-foreground">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span>Session Complete! 🎉</span>
                  </h3>
                  <button
                    onClick={generateNewText}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                  >
                    Try Again
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-primary">{stats.wpm}</p>
                    <p className="text-sm text-muted-foreground mt-1">Words per minute</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-green-600">{stats.accuracy}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Accuracy</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-blue-600">{stats.correctChars}</p>
                    <p className="text-sm text-muted-foreground mt-1">Correct characters</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-orange-600">
                      {Math.round(stats.timeElapsed / 1000)}s
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Time taken</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Settings Sidebar */}
          <div className={cn(
            "lg:col-span-1",
            showSettings ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-8">
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
                <SettingsPanel
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                  onNewText={generateNewText}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-medium">
              TypeX - Learn to type faster and more accurately
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              Inspired by typing learning platforms • Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App