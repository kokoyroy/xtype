import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Typing utility functions
export function calculateWPM(correctChars: number, timeElapsed: number): number {
  if (timeElapsed === 0) return 0
  const words = correctChars / 5 // Average word length is 5 characters
  const minutes = timeElapsed / 60
  return Math.round(words / minutes)
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100
  return Math.round((correctChars / totalChars) * 100)
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Word generation
const easyWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'
]

const mediumWords = [
  'about', 'after', 'again', 'before', 'could', 'every', 'first', 'great', 'house', 'large', 'might', 'never', 'other', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these', 'think', 'three', 'under', 'water', 'where', 'which', 'world', 'would', 'write', 'years', 'young'
]

const hardWords = [
  'beautiful', 'challenge', 'different', 'education', 'important', 'knowledge', 'necessary', 'opportunity', 'particular', 'responsibility', 'significant', 'understanding', 'development', 'environment', 'information', 'organization', 'relationship', 'technology', 'communication', 'administration'
]

export function getRandomWords(difficulty: 'easy' | 'medium' | 'hard', count: number): string[] {
  const wordList = difficulty === 'easy' ? easyWords : difficulty === 'medium' ? mediumWords : hardWords
  const words: string[] = []
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    words.push(wordList[randomIndex])
  }
  
  return words
}

// Finger mapping for virtual keyboard
export function getFingerForKey(key: string): string {
  const keyToFinger: Record<string, string> = {
    // Pinky keys
    '`': 'pinky', '1': 'pinky', 'q': 'pinky', 'a': 'pinky', 'z': 'pinky',
    '\\': 'pinky', '[': 'pinky', ']': 'pinky', "'": 'pinky', ';': 'pinky',
    '=': 'pinky', '-': 'pinky',
    
    // Ring finger keys
    '2': 'ring', 'w': 'ring', 's': 'ring', 'x': 'ring',
    
    // Middle finger keys
    '3': 'middle', 'e': 'middle', 'd': 'middle', 'c': 'middle',
    
    // Index finger keys
    '4': 'index', '5': 'index', 'r': 'index', 't': 'index', 'f': 'index', 'g': 'index', 'v': 'index', 'b': 'index',
    '6': 'index', '7': 'index', 'y': 'index', 'u': 'index', 'h': 'index', 'j': 'index', 'n': 'index', 'm': 'index',
    '8': 'index', 'i': 'index', 'k': 'index', ',': 'index',
    '9': 'index', 'o': 'index', 'l': 'index', '.': 'index',
    '0': 'index', 'p': 'index', '/': 'index',
    
    // Thumb
    ' ': 'thumb'
  }
  
  return keyToFinger[key.toLowerCase()] || 'unknown'
}

// Sound effects with persistent audio context
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Audio not supported:', error)
      return null
    }
  }
  
  // Resume context if suspended (required by some browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  
  return audioContext
}

export function playSound(type: 'correct' | 'incorrect' | 'complete', enabled: boolean = true) {
  if (!enabled) return
  
  const ctx = getAudioContext()
  if (!ctx) return
  
  try {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Set frequency and duration based on sound type
    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime)
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.1)
        break
      case 'incorrect':
        oscillator.frequency.setValueAtTime(200, ctx.currentTime)
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.2)
        break
      case 'complete':
        // Play a short melody
        const frequencies = [523, 659, 784] // C, E, G
        frequencies.forEach((freq, index) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1)
          gain.gain.setValueAtTime(0.1, ctx.currentTime + index * 0.1)
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.1 + 0.2)
          osc.start(ctx.currentTime + index * 0.1)
          osc.stop(ctx.currentTime + index * 0.1 + 0.2)
        })
        break
    }
  } catch (error) {
    // Silently fail if audio context is not supported
    console.warn('Audio playback failed:', error)
  }
}
