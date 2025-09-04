import { cn, getFingerForKey } from '../lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface VirtualKeyboardProps {
  currentChar: string
  lastTypedChar?: string
  wasCorrect?: boolean
  className?: string
}

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
]

const fingerColors = {
  // Left hand
  'left-pinky': 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  'left-ring': 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  'left-middle': 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  'left-index': 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
  
  // Right hand
  'right-index': 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'right-middle': 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
  'right-ring': 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'right-pinky': 'bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800',
  
  // Thumb
  'thumb': 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
  
  // Legacy support (fallback)
  'pinky': 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  'ring': 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  'middle': 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  'index': 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
  
  'unknown': 'bg-muted text-muted-foreground border-border'
}

export function VirtualKeyboard({ 
  currentChar, 
  lastTypedChar, 
  wasCorrect,
  className 
}: VirtualKeyboardProps) {
  const getKeyState = (key: string) => {
    if (key === currentChar) {
      return 'current'
    }
    if (key === lastTypedChar) {
      return wasCorrect ? 'correct' : 'incorrect'
    }
    return 'normal'
  }

  const getKeyClassName = (key: string) => {
    const state = getKeyState(key)
    const finger = getFingerForKey(key)
    const baseClass = 'keyboard-key'
    
    let stateClass = ''
    if (state === 'current') {
      stateClass = 'active'
    } else if (state === 'correct') {
      stateClass = 'correct'
    } else if (state === 'incorrect') {
      stateClass = 'incorrect'
    }
    
    const fingerClass = fingerColors[finger as keyof typeof fingerColors] || fingerColors.unknown
    
    return cn(
      baseClass,
      !stateClass && fingerClass,
      stateClass && stateClass,
      'transition-all duration-200'
    )
  }

  return (
    <div className={cn("select-none", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Virtual Keyboard</CardTitle>
          <CardDescription>See which finger to use for each key</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        
        {/* Main keyboard rows */}
        <div className="space-y-2 max-w-full overflow-hidden">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 flex-wrap">
              {row.map((key) => (
                <button
                  key={key}
                  className={getKeyClassName(key)}
                  style={{
                    minWidth: key.length > 1 ? `${key.length * 0.8}rem` : '2.5rem',
                    height: '2.5rem',
                    flex: '0 0 auto'
                  }}
                  disabled
                >
                  <span className="font-bold text-sm">{key.toUpperCase()}</span>
                </button>
              ))}
            </div>
          ))}
          
          {/* Spacebar row */}
          <div className="flex justify-center gap-1 mt-3">
            <button
              className={getKeyClassName(' ')}
              style={{ minWidth: '12rem', height: '2.5rem' }}
              disabled
            >
              <span className="font-bold text-sm">SPACE</span>
            </button>
          </div>
        </div>

        {/* Finger guide */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-semibold text-foreground text-center mb-4 flex items-center justify-center space-x-2">
            <span>👆</span>
            <span>Finger Guide</span>
          </p>
          <div className="space-y-3">
            {/* Left Hand */}
            <div className="text-center">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Left Hand</p>
              <div className="flex justify-center gap-2 text-xs flex-wrap">
                <Badge variant="outline" className="flex items-center gap-1 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>L.Pinky</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>L.Ring</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>L.Middle</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>L.Index</span>
                </Badge>
              </div>
            </div>
            
            {/* Right Hand */}
            <div className="text-center">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Right Hand</p>
              <div className="flex justify-center gap-2 text-xs flex-wrap">
                <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>R.Index</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span>R.Middle</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>R.Ring</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span>R.Pinky</span>
                </Badge>
              </div>
            </div>
            
            {/* Thumb */}
            <div className="text-center">
              <Badge variant="outline" className="flex items-center gap-1 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span>Thumb (Space)</span>
              </Badge>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
