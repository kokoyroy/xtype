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
  pinky: 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  ring: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  middle: 'bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  index: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
  thumb: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  unknown: 'bg-muted text-muted-foreground border-border'
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
          <div className="flex justify-center gap-3 text-sm flex-wrap">
            <Badge variant="outline" className="flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Pinky</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span>Ring</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Middle</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Index</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Thumb</span>
            </Badge>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
