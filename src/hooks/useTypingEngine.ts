import { useState, useEffect, useCallback, useRef } from 'react'
import type { TypingStats, CharacterState, TypingSettings } from '../types'
import { calculateWPM, calculateAccuracy, getRandomWords } from '../lib/utils'

export function useTypingEngine(initialSettings: TypingSettings) {
  const [text, setText] = useState('')
  const [characters, setCharacters] = useState<CharacterState[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeElapsed: 0,
    startTime: null,
    isComplete: false
  })
  const [isActive, setIsActive] = useState(false)
  const [settings, setSettings] = useState(initialSettings)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Initialize text and characters
  const initializeText = useCallback((newText?: string) => {
    const textToUse = newText || getRandomWords(settings.difficulty, settings.wordCount).join(' ')
    setText(textToUse)
    
    const chars: CharacterState[] = textToUse.split('').map((char: string, index: number) => ({
      char,
      status: index === 0 ? 'current' : 'pending',
      index
    }))
    
    setCharacters(chars)
    setCurrentIndex(0)
    setIsActive(false)
    setStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0,
      startTime: null,
      isComplete: false
    })
    startTimeRef.current = null
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [settings.wordCount, settings.difficulty])

  // Start timer
  const startTimer = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
      setStats(prev => ({ ...prev, startTime: startTimeRef.current }))
    }
    
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Date.now() - startTimeRef.current
          setStats(prev => ({ ...prev, timeElapsed: elapsed }))
        }
      }, 100)
    }
    
    setIsActive(true)
  }, [])

  // Stop timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsActive(false)
  }, [])

  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    if (currentIndex >= characters.length) return
    
    // Start timer on first keypress
    if (!isActive && !stats.startTime) {
      startTimer()
    }

    const currentChar = characters[currentIndex]
    const isCorrect = key === currentChar.char
    
    // Only advance if the key is correct
    if (isCorrect) {
      setCharacters(prev => prev.map((char, index) => {
        if (index === currentIndex) {
          return { ...char, status: 'correct' }
        } else if (index === currentIndex + 1) {
          return { ...char, status: 'current' }
        }
        return char
      }))
      
      setStats(prev => {
        const newStats = {
          ...prev,
          totalChars: prev.totalChars + 1,
          correctChars: prev.correctChars + 1
        }
        
        newStats.accuracy = calculateAccuracy(newStats.correctChars, newStats.totalChars)
        
        if (prev.timeElapsed > 0) {
          newStats.wpm = calculateWPM(newStats.correctChars, prev.timeElapsed)
        }
        
        return newStats
      })
      
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      
      // Check if completed
      if (nextIndex >= characters.length) {
        stopTimer()
        setStats(prev => ({ ...prev, isComplete: true }))
      }
    } else {
      // Mark as incorrect but don't advance
      setCharacters(prev => prev.map((char, index) => {
        if (index === currentIndex) {
          return { ...char, status: 'incorrect' }
        }
        return char
      }))
      
      setStats(prev => {
        const newStats = {
          ...prev,
          totalChars: prev.totalChars + 1,
          incorrectChars: prev.incorrectChars + 1
        }
        
        newStats.accuracy = calculateAccuracy(newStats.correctChars, newStats.totalChars)
        
        if (prev.timeElapsed > 0) {
          newStats.wpm = calculateWPM(newStats.correctChars, prev.timeElapsed)
        }
        
        return newStats
      })
    }
  }, [currentIndex, characters, isActive, stats.startTime, startTimer, stopTimer])

  // Handle backspace - DISABLED like keybr.com
  const handleBackspace = useCallback(() => {
    // Backspace is disabled to prevent corrections, just like keybr.com
    // This forces users to focus on accuracy and forward progress
    return
  }, [])

  // Reset the typing session
  const reset = useCallback(() => {
    initializeText()
  }, [initializeText])

  // Generate new text
  const generateNewText = useCallback(() => {
    const newText = getRandomWords(settings.difficulty, settings.wordCount).join(' ')
    initializeText(newText)
  }, [settings.wordCount, settings.difficulty, initializeText])

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<TypingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  // Initialize on mount and settings change
  useEffect(() => {
    initializeText()
  }, [initializeText])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    text,
    characters,
    currentIndex,
    stats,
    isActive,
    settings,
    handleKeyPress,
    handleBackspace,
    reset,
    generateNewText,
    updateSettings,
    startTimer,
    stopTimer
  }
}
