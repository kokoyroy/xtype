import { useEffect, useRef, useState } from 'react'
import type { CharacterState } from '../types'
import { cn } from '../lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface TypingAreaProps {
  characters: CharacterState[]
  currentIndex: number
  onKeyPress: (key: string) => void
  onBackspace: () => void
  isActive: boolean
  className?: string
  fontSize?: 'small' | 'medium' | 'large'
}

export function TypingArea({ 
  characters, 
  currentIndex, 
  onKeyPress, 
  onBackspace, 
  isActive,
  className,
  fontSize = 'medium'
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [overlayVisible, setOverlayVisible] = useState(true)

  // Reset overlay visibility when text changes (new text generated)
  useEffect(() => {
    setOverlayVisible(true)
  }, [characters])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      
      if (e.key === 'Backspace') {
        onBackspace()
      } else if (e.key.length === 1) { // Only handle printable characters
        onKeyPress(e.key)
      }
    }

    if (isActive || currentIndex === 0) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onKeyPress, onBackspace, isActive, currentIndex])

  // Auto-scroll to keep current character visible
  useEffect(() => {
    if (containerRef.current && currentIndex > 0) {
      const currentChar = containerRef.current.querySelector(`[data-index="${currentIndex}"]`)
      if (currentChar) {
        currentChar.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    }
  }, [currentIndex])

  if (characters.length === 0) {
    return (
      <Card className={cn("border-dashed", className)}>
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground font-medium">Loading text...</p>
          </div>
        </CardContent>
      </Card>
    )
  }


  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className={cn(
          "typing-text focus-within:ring-4 focus-within:ring-primary/20 focus-within:ring-offset-4 cursor-text shadow-inner",
          "max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
          "bg-card border border-border rounded-lg",
          className
        )}
        onClick={() => {
          containerRef.current?.focus()
          // Force focus and trigger any focus handlers
          if (containerRef.current) {
            containerRef.current.focus()
          }
        }}
        tabIndex={0}
      >
        <div className="p-8">
          <div className={cn(
            "leading-relaxed font-mono",
            fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-xl' : 'text-lg'
          )} style={{ wordBreak: 'keep-all', overflowWrap: 'normal', whiteSpace: 'pre-wrap' }}>
            {characters.map((char, index) => (
              <span
                key={index}
                data-index={index}
                className={cn(
                  "relative transition-all duration-200 ease-in-out inline-block",
                  {
                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200': char.status === 'correct',
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200': char.status === 'incorrect', 
                    'bg-primary text-primary-foreground shadow-lg transform scale-110': char.status === 'current',
                    'text-muted-foreground': char.status === 'pending'
                  }
                )}
                style={{ 
                  display: 'inline',
                  margin: 0,
                  padding: 0,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {char.char}
                {char.status === 'current' && (
                  <span className="absolute top-0 left-0 w-full h-full bg-blue-400/30 rounded-sm animate-pulse" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {overlayVisible && !isActive && currentIndex === 0 && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-lg border border-border cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOverlayVisible(false)
            if (containerRef.current) {
              containerRef.current.focus()
              // Simulate a click on the typing area to ensure focus
              containerRef.current.click()
            }
          }}
        >
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">⌨️</span>
              </div>
            </div>
            <p className="text-xl font-semibold text-card-foreground mb-2">
              Ready to start typing?
            </p>
            <p className="text-muted-foreground">
              Click here and start typing to begin your test
            </p>
          </div>
        </div>
      )}
    </div>
  )
}