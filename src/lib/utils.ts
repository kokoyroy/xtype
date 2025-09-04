import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Typing utility functions
export function calculateWPM(correctChars: number, timeElapsedSeconds: number): number {
  if (timeElapsedSeconds === 0) return 0
  const words = correctChars / 5 // Average word length is 5 characters
  const minutes = timeElapsedSeconds / 60
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

// Word generation - Expanded lists for better variety
const easyWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use',
  'any', 'ask', 'bad', 'big', 'box', 'car', 'cat', 'dog', 'eat', 'end', 'eye', 'far', 'few', 'fly', 'fun', 'gas', 'got', 'gun', 'hat', 'hot', 'ice', 'job', 'key', 'kid', 'lay', 'leg', 'lie', 'lot', 'low', 'map', 'may', 'men', 'mom', 'net', 'oil', 'own', 'pay', 'pen', 'pet', 'pig', 'pop', 'red', 'run', 'sat', 'set', 'sit', 'sun', 'top', 'try', 'use', 'war', 'win', 'yes', 'yet', 'zip'
]

const mediumWords = [
  'about', 'after', 'again', 'before', 'could', 'every', 'first', 'great', 'house', 'large', 'might', 'never', 'other', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these', 'think', 'three', 'under', 'water', 'where', 'which', 'world', 'would', 'write', 'years', 'young',
  'above', 'across', 'almost', 'always', 'animal', 'answer', 'around', 'became', 'because', 'become', 'began', 'behind', 'better', 'between', 'called', 'change', 'children', 'coming', 'course', 'during', 'enough', 'family', 'father', 'friend', 'ground', 'happened', 'having', 'important', 'interest', 'learned', 'letter', 'little', 'living', 'mother', 'moved', 'number', 'people', 'person', 'picture', 'point', 'problem', 'really', 'school', 'second', 'should', 'something', 'sometimes', 'started', 'system', 'through', 'together', 'turned', 'until', 'wanted', 'without', 'working'
]

const hardWords = [
  'beautiful', 'challenge', 'different', 'education', 'important', 'knowledge', 'necessary', 'opportunity', 'particular', 'responsibility', 'significant', 'understanding', 'development', 'environment', 'information', 'organization', 'relationship', 'technology', 'communication', 'administration',
  'achievement', 'appreciation', 'architecture', 'characteristic', 'circumstance', 'concentration', 'consideration', 'constitutional', 'contemporary', 'contribution', 'conversation', 'cooperation', 'correspondence', 'demonstration', 'determination', 'discrimination', 'distribution', 'entertainment', 'establishment', 'examination', 'experimentation', 'extraordinary', 'fundamental', 'governmental', 'identification', 'implementation', 'improvement', 'institutional', 'international', 'interpretation', 'investigation', 'manufacturing', 'mathematical', 'multinational', 'participation', 'philosophical', 'psychological', 'recommendation', 'representation', 'revolutionary', 'sophisticated', 'specification', 'substitution', 'transformation', 'transportation', 'unconstitutional', 'unprecedented', 'unquestionable', 'unsatisfactory', 'vulnerability'
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
    // Left Pinky (Little finger)
    '`': 'left-pinky', '1': 'left-pinky', 'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky',
    '\\': 'left-pinky', '[': 'left-pinky', ']': 'left-pinky', 'tab': 'left-pinky', 'caps': 'left-pinky',
    'shift': 'left-pinky', 'ctrl': 'left-pinky', 'alt': 'left-pinky',
    
    // Left Ring finger
    '2': 'left-ring', 'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring',
    
    // Left Middle finger
    '3': 'left-middle', 'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle',
    
    // Left Index finger
    '4': 'left-index', '5': 'left-index', 'r': 'left-index', 't': 'left-index', 
    'f': 'left-index', 'g': 'left-index', 'v': 'left-index', 'b': 'left-index',
    
    // Right Index finger
    '6': 'right-index', '7': 'right-index', 'y': 'right-index', 'u': 'right-index',
    'h': 'right-index', 'j': 'right-index', 'n': 'right-index', 'm': 'right-index',
    
    // Right Middle finger
    '8': 'right-middle', 'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle',
    
    // Right Ring finger
    '9': 'right-ring', 'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring',
    
    // Right Pinky (Little finger)
    '0': 'right-pinky', '-': 'right-pinky', '=': 'right-pinky', 'p': 'right-pinky',
    '[': 'right-pinky', ']': 'right-pinky', '\\': 'right-pinky', ';': 'right-pinky',
    "'": 'right-pinky', '/': 'right-pinky', 'shift': 'right-pinky', 'enter': 'right-pinky',
    'backspace': 'right-pinky', 'ctrl': 'right-pinky', 'alt': 'right-pinky',
    
    // Thumb (both hands)
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

export function playSound(type: 'correct' | 'incorrect' | 'complete', enabled: boolean = true, volume: number = 0.5) {
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
        gainNode.gain.setValueAtTime(0.1 * volume, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.1)
        break
      case 'incorrect':
        oscillator.frequency.setValueAtTime(200, ctx.currentTime)
        gainNode.gain.setValueAtTime(0.15 * volume, ctx.currentTime)
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
          gain.gain.setValueAtTime(0.1 * volume, ctx.currentTime + index * 0.1)
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
