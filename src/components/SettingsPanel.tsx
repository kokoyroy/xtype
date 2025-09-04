import type { TypingSettings } from '../types'
import { cn } from '../lib/utils'
import { Settings, Keyboard, Volume2, VolumeX, Monitor, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'

interface SettingsPanelProps {
  settings: TypingSettings
  onSettingsChange: (settings: Partial<TypingSettings>) => void
  onNewText: () => void
  className?: string
}

export function SettingsPanel({ 
  settings, 
  onSettingsChange, 
  onNewText, 
  className 
}: SettingsPanelProps) {
  const difficultyOptions = [
    { value: 'easy' as const, label: 'Easy', description: 'Common short words' },
    { value: 'medium' as const, label: 'Medium', description: 'Standard vocabulary' },
    { value: 'hard' as const, label: 'Hard', description: 'Complex words' }
  ]

  const wordCountOptions = [10, 25, 50, 100, 200]
  const fontSizeOptions = [
    { value: 'small' as const, label: 'Small' },
    { value: 'medium' as const, label: 'Medium' },
    { value: 'large' as const, label: 'Large' }
  ]

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor }
  ]

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-primary rounded-lg">
            <Settings className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

      {/* Difficulty */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <span>🎯</span>
          <span>Difficulty</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {difficultyOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => onSettingsChange({ difficulty: option.value })}
              variant={settings.difficulty === option.value ? "default" : "outline"}
              className="h-auto p-3 justify-start text-left"
            >
              <div>
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs opacity-70 mt-1">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Word Count */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <span>📊</span>
          <span>Word Count</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {wordCountOptions.map((count) => (
            <Button
              key={count}
              onClick={() => onSettingsChange({ wordCount: count })}
              variant={settings.wordCount === count ? "default" : "outline"}
              size="sm"
            >
              {count}
            </Button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <span>🔤</span>
          <span>Font Size</span>
        </label>
        <div className="flex gap-2">
          {fontSizeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => onSettingsChange({ fontSize: option.value })}
              variant={settings.fontSize === option.value ? "default" : "outline"}
              size="sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <span>🎨</span>
          <span>Theme</span>
        </label>
        <div className="flex gap-2">
          {themeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => onSettingsChange({ theme: option.value })}
              variant={settings.theme === option.value ? "default" : "outline"}
              size="icon"
              title={option.label}
            >
              <option.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </div>

      {/* Toggle Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
          <span>⚙️</span>
          <span>Preferences</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Keyboard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Show Virtual Keyboard</span>
            </div>
            <Switch
              checked={settings.showKeyboard}
              onCheckedChange={(checked) => onSettingsChange({ showKeyboard: checked })}
            />
          </div>

          <div className="p-3 bg-muted/50 rounded-lg border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.soundEnabled ? <Volume2 className="h-4 w-4 text-muted-foreground" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                <span className="text-sm font-medium text-foreground">Sound Effects</span>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => onSettingsChange({ soundEnabled: checked })}
              />
            </div>
            {settings.soundEnabled && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Volume</span>
                  <span className="text-xs text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
                </div>
                <Slider
                  value={[settings.volume]}
                  onValueChange={(value) => onSettingsChange({ volume: value[0] })}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-sm">📈</span>
              <span className="text-sm font-medium text-foreground">Show Live WPM</span>
            </div>
            <Switch
              checked={settings.showWpmLive}
              onCheckedChange={(checked) => onSettingsChange({ showWpmLive: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <span className="text-sm">🎯</span>
              <span className="text-sm font-medium text-foreground">Highlight Errors</span>
            </div>
            <Switch
              checked={settings.highlightErrors}
              onCheckedChange={(checked) => onSettingsChange({ highlightErrors: checked })}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-border">
        <Button
          onClick={onNewText}
          className="w-full"
          size="lg"
        >
          <span>✨</span>
          <span className="ml-2">Generate New Text</span>
        </Button>
      </div>
      </CardContent>
    </Card>
  )
}
