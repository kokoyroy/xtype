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

// Word generation - Significantly expanded lists for maximum variety
const easyWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use',
  'any', 'ask', 'bad', 'big', 'box', 'car', 'cat', 'dog', 'eat', 'end', 'eye', 'far', 'few', 'fly', 'fun', 'gas', 'got', 'gun', 'hat', 'hot', 'ice', 'job', 'key', 'kid', 'lay', 'leg', 'lie', 'lot', 'low', 'map', 'may', 'men', 'mom', 'net', 'oil', 'own', 'pay', 'pen', 'pet', 'pig', 'pop', 'red', 'run', 'sat', 'set', 'sit', 'sun', 'top', 'try', 'war', 'win', 'yes', 'yet', 'zip',
  'act', 'add', 'age', 'air', 'arm', 'art', 'ask', 'bag', 'bed', 'bit', 'bus', 'buy', 'cap', 'cup', 'cut', 'dad', 'ear', 'egg', 'far', 'fat', 'fit', 'fix', 'gap', 'god', 'hit', 'hop', 'ill', 'ink', 'joy', 'kit', 'lap', 'log', 'mad', 'mix', 'mud', 'nut', 'odd', 'off', 'own', 'pad', 'pan', 'pin', 'pot', 'rat', 'raw', 'rid', 'rip', 'rob', 'rod', 'rot', 'rub', 'sad', 'saw', 'sea', 'sex', 'sir', 'six', 'sky', 'sly', 'sow', 'tag', 'tap', 'tax', 'tea', 'ten', 'tip', 'toe', 'ton', 'toy', 'tug', 'van', 'vat', 'vet', 'wag', 'web', 'wet', 'wig', 'win', 'wit', 'yam', 'yap', 'yes', 'yet', 'zip', 'zoo'
]

const mediumWords = [
  'about', 'after', 'again', 'before', 'could', 'every', 'first', 'great', 'house', 'large', 'might', 'never', 'other', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these', 'think', 'three', 'under', 'water', 'where', 'which', 'world', 'would', 'write', 'years', 'young',
  'above', 'across', 'almost', 'always', 'animal', 'answer', 'around', 'became', 'because', 'become', 'began', 'behind', 'better', 'between', 'called', 'change', 'children', 'coming', 'course', 'during', 'enough', 'family', 'father', 'friend', 'ground', 'happened', 'having', 'important', 'interest', 'learned', 'letter', 'little', 'living', 'mother', 'moved', 'number', 'people', 'person', 'picture', 'point', 'problem', 'really', 'school', 'second', 'should', 'something', 'sometimes', 'started', 'system', 'through', 'together', 'turned', 'until', 'wanted', 'without', 'working',
  'action', 'active', 'actual', 'advice', 'affect', 'afraid', 'agency', 'almost', 'already', 'although', 'another', 'anyone', 'appear', 'around', 'arrive', 'article', 'artist', 'attack', 'attempt', 'attention', 'attitude', 'attract', 'author', 'available', 'average', 'balance', 'beautiful', 'because', 'become', 'before', 'behavior', 'believe', 'benefit', 'better', 'between', 'beyond', 'billion', 'brother', 'business', 'camera', 'capital', 'captain', 'career', 'center', 'central', 'century', 'certain', 'chance', 'change', 'charge', 'choice', 'choose', 'church', 'citizen', 'clearly', 'client', 'college', 'color', 'common', 'company', 'compare', 'computer', 'concern', 'condition', 'consider', 'contain', 'continue', 'control', 'country', 'couple', 'course', 'create', 'current', 'customer', 'danger', 'daughter', 'decade', 'decide', 'decision', 'deep', 'defense', 'degree', 'demand', 'department', 'depend', 'describe', 'design', 'despite', 'detail', 'develop', 'difference', 'different', 'difficult', 'dinner', 'direction', 'director', 'discover', 'discuss', 'disease', 'doctor', 'dollar', 'door', 'double', 'doubt', 'down', 'draw', 'dream', 'drive', 'during', 'early', 'earth', 'east', 'easy', 'economy', 'education', 'effect', 'effort', 'eight', 'either', 'election', 'else', 'employee', 'end', 'energy', 'enjoy', 'enough', 'enter', 'entire', 'environment', 'even', 'evening', 'event', 'ever', 'every', 'everyone', 'everything', 'evidence', 'exact', 'example', 'except', 'exchange', 'exist', 'expect', 'experience', 'expert', 'explain', 'express', 'extend', 'extra', 'eye', 'face', 'fact', 'factor', 'fail', 'fall', 'family', 'far', 'fast', 'father', 'fear', 'federal', 'feel', 'feeling', 'few', 'field', 'fight', 'figure', 'fill', 'film', 'final', 'finally', 'financial', 'find', 'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'five', 'floor', 'fly', 'focus', 'follow', 'food', 'foot', 'for', 'force', 'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free', 'friend', 'from', 'front', 'full', 'fund', 'future', 'game', 'garden', 'gas', 'general', 'generation', 'get', 'girl', 'give', 'glass', 'go', 'goal', 'good', 'government', 'great', 'green', 'ground', 'group', 'grow', 'growth', 'guess', 'gun', 'guy', 'hair', 'half', 'hand', 'hang', 'happen', 'happy', 'hard', 'harm', 'head', 'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'her', 'here', 'herself', 'high', 'him', 'himself', 'his', 'history', 'hit', 'hold', 'home', 'hope', 'hospital', 'hot', 'hotel', 'hour', 'house', 'how', 'however', 'huge', 'human', 'hundred', 'husband', 'idea', 'identify', 'if', 'image', 'imagine', 'impact', 'important', 'improve', 'in', 'include', 'including', 'increase', 'indeed', 'indicate', 'individual', 'industry', 'information', 'inside', 'instead', 'institute', 'interest', 'interesting', 'international', 'interview', 'into', 'investment', 'involve', 'issue', 'it', 'item', 'its', 'itself', 'job', 'join', 'just', 'keep', 'key', 'kid', 'kill', 'kind', 'king', 'kitchen', 'know', 'knowledge', 'land', 'language', 'large', 'last', 'late', 'later', 'laugh', 'law', 'lawyer', 'lay', 'lead', 'leader', 'learn', 'least', 'leave', 'left', 'leg', 'legal', 'less', 'let', 'letter', 'level', 'lie', 'life', 'light', 'like', 'likely', 'line', 'list', 'listen', 'little', 'live', 'local', 'long', 'look', 'lose', 'loss', 'lot', 'love', 'low', 'luck', 'lunch', 'machine', 'magazine', 'main', 'maintain', 'major', 'majority', 'make', 'man', 'manage', 'management', 'manager', 'many', 'map', 'mark', 'market', 'marriage', 'material', 'matter', 'may', 'maybe', 'me', 'mean', 'measure', 'media', 'medical', 'meet', 'meeting', 'member', 'memory', 'mention', 'message', 'method', 'middle', 'might', 'military', 'million', 'mind', 'minute', 'miss', 'mission', 'model', 'modern', 'moment', 'money', 'month', 'more', 'morning', 'most', 'mother', 'motion', 'move', 'movement', 'movie', 'much', 'music', 'must', 'my', 'myself', 'name', 'nation', 'national', 'natural', 'nature', 'near', 'nearly', 'necessary', 'need', 'network', 'never', 'new', 'news', 'newspaper', 'next', 'nice', 'night', 'no', 'none', 'nor', 'north', 'not', 'note', 'nothing', 'notice', 'now', 'number', 'nurse', 'occur', 'of', 'off', 'offer', 'office', 'officer', 'official', 'often', 'oil', 'ok', 'old', 'on', 'once', 'one', 'only', 'onto', 'open', 'operation', 'opinion', 'opportunity', 'option', 'or', 'order', 'organization', 'other', 'others', 'our', 'out', 'outside', 'over', 'own', 'owner', 'page', 'pain', 'paint', 'pair', 'paper', 'parent', 'park', 'part', 'participant', 'particular', 'particularly', 'partner', 'party', 'pass', 'past', 'patient', 'pattern', 'pay', 'peace', 'people', 'per', 'perform', 'performance', 'perhaps', 'period', 'person', 'personal', 'phone', 'photo', 'physical', 'pick', 'picture', 'piece', 'place', 'plan', 'plant', 'play', 'player', 'please', 'plus', 'point', 'police', 'policy', 'political', 'politics', 'poor', 'popular', 'population', 'position', 'positive', 'possible', 'power', 'practice', 'prepare', 'present', 'president', 'press', 'pressure', 'pretty', 'prevent', 'price', 'private', 'probably', 'problem', 'process', 'produce', 'product', 'production', 'professor', 'program', 'project', 'property', 'protect', 'prove', 'provide', 'public', 'pull', 'purpose', 'push', 'put', 'quality', 'question', 'quick', 'quickly', 'quite', 'race', 'radio', 'raise', 'range', 'rate', 'rather', 'reach', 'read', 'ready', 'real', 'reality', 'realize', 'really', 'reason', 'receive', 'recent', 'recently', 'recognize', 'record', 'red', 'reduce', 'reflect', 'region', 'relate', 'relationship', 'religious', 'remain', 'remember', 'remove', 'repeat', 'replace', 'reply', 'report', 'represent', 'republican', 'require', 'research', 'resource', 'respond', 'response', 'responsibility', 'rest', 'result', 'return', 'reveal', 'rich', 'right', 'rise', 'risk', 'road', 'rock', 'role', 'room', 'rule', 'run', 'safe', 'same', 'save', 'say', 'scene', 'school', 'science', 'scientist', 'score', 'sea', 'season', 'seat', 'second', 'secret', 'section', 'security', 'see', 'seek', 'seem', 'sell', 'send', 'senior', 'sense', 'series', 'serious', 'serve', 'service', 'set', 'seven', 'several', 'shake', 'share', 'she', 'shoot', 'short', 'shot', 'should', 'shoulder', 'show', 'side', 'sign', 'significant', 'similar', 'simple', 'simply', 'since', 'sing', 'single', 'sister', 'sit', 'site', 'situation', 'six', 'size', 'skill', 'skin', 'sky', 'sleep', 'slide', 'slow', 'small', 'smart', 'smile', 'smoke', 'snow', 'so', 'social', 'society', 'soldier', 'some', 'somebody', 'someone', 'something', 'sometimes', 'son', 'song', 'soon', 'sort', 'sound', 'south', 'space', 'speak', 'special', 'specific', 'speech', 'speed', 'spend', 'sport', 'spring', 'staff', 'stage', 'stand', 'standard', 'star', 'start', 'state', 'statement', 'station', 'stay', 'step', 'stick', 'still', 'stock', 'stop', 'store', 'story', 'strategy', 'street', 'strong', 'structure', 'student', 'study', 'stuff', 'style', 'subject', 'success', 'successful', 'such', 'suddenly', 'suffer', 'suggest', 'summer', 'sun', 'support', 'sure', 'surface', 'system', 'table', 'take', 'talk', 'tall', 'task', 'tax', 'teach', 'teacher', 'team', 'technology', 'television', 'tell', 'ten', 'tend', 'term', 'test', 'than', 'thank', 'that', 'the', 'their', 'them', 'themselves', 'then', 'theory', 'there', 'these', 'they', 'thing', 'think', 'third', 'this', 'those', 'though', 'thought', 'thousand', 'three', 'through', 'throughout', 'throw', 'thus', 'time', 'to', 'today', 'together', 'tonight', 'too', 'top', 'total', 'touch', 'toward', 'town', 'trade', 'traditional', 'training', 'travel', 'treat', 'treatment', 'tree', 'trial', 'trip', 'trouble', 'true', 'truth', 'try', 'turn', 'tv', 'two', 'type', 'under', 'understand', 'union', 'unit', 'university', 'until', 'up', 'upon', 'us', 'use', 'usually', 'value', 'various', 'very', 'view', 'violence', 'visit', 'voice', 'vote', 'wait', 'walk', 'wall', 'want', 'war', 'watch', 'water', 'way', 'we', 'weapon', 'wear', 'week', 'weight', 'welcome', 'well', 'west', 'what', 'whatever', 'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'whom', 'whose', 'why', 'wide', 'wife', 'will', 'win', 'wind', 'window', 'wine', 'wing', 'winner', 'winter', 'wish', 'with', 'within', 'without', 'woman', 'wonder', 'wonderful', 'wood', 'word', 'work', 'worker', 'world', 'worry', 'worse', 'worst', 'worth', 'would', 'write', 'writer', 'writing', 'wrong', 'yard', 'yeah', 'year', 'yellow', 'yes', 'yesterday', 'yet', 'you', 'young', 'your', 'yourself', 'youth'
]

const hardWords = [
  'beautiful', 'challenge', 'different', 'education', 'important', 'knowledge', 'necessary', 'opportunity', 'particular', 'responsibility', 'significant', 'understanding', 'development', 'environment', 'information', 'organization', 'relationship', 'technology', 'communication', 'administration',
  'achievement', 'appreciation', 'architecture', 'characteristic', 'circumstance', 'concentration', 'consideration', 'constitutional', 'contemporary', 'contribution', 'conversation', 'cooperation', 'correspondence', 'demonstration', 'determination', 'discrimination', 'distribution', 'entertainment', 'establishment', 'examination', 'experimentation', 'extraordinary', 'fundamental', 'governmental', 'identification', 'implementation', 'improvement', 'institutional', 'international', 'interpretation', 'investigation', 'manufacturing', 'mathematical', 'multinational', 'participation', 'philosophical', 'psychological', 'recommendation', 'representation', 'revolutionary', 'sophisticated', 'specification', 'substitution', 'transformation', 'transportation', 'unconstitutional', 'unprecedented', 'unquestionable', 'unsatisfactory', 'vulnerability',
  'abbreviation', 'abnormalities', 'accomplishment', 'acknowledgment', 'administrative', 'advertisement', 'agricultural', 'announcement', 'anthropological', 'anticipating', 'apprehensive', 'appropriation', 'archaeological', 'architectural', 'arrangements', 'assassination', 'associations', 'astronomical', 'authorization', 'automatically', 'bureaucratic', 'characteristics', 'circumstances', 'classification', 'collaboration', 'commercialization', 'commissioner', 'communications', 'compassionate', 'compensation', 'competitiveness', 'comprehensive', 'computational', 'conceptualization', 'confidentiality', 'congratulations', 'consciousness', 'constitutional', 'contemporaries', 'controversial', 'conversational', 'coordination', 'correspondence', 'counterproductive', 'crystallization', 'decentralization', 'decomposition', 'decontamination', 'deforestation', 'democratization', 'demonstration', 'denominational', 'depersonalization', 'deregulation', 'desensitization', 'destabilization', 'determination', 'differentiation', 'disappointment', 'discontinuation', 'discrimination', 'disenfranchisement', 'disproportionate', 'dissatisfaction', 'distinguishing', 'documentation', 'domestication', 'dramatization', 'eccentricities', 'ecclesiastical', 'econometric', 'editorialization', 'educational', 'effectiveness', 'electrification', 'elimination', 'emancipation', 'embarrassment', 'encouragement', 'endorsement', 'enlightenment', 'entertainment', 'entrepreneurial', 'environmental', 'epidemiological', 'epistemological', 'equalization', 'establishment', 'evaluation', 'exaggeration', 'examination', 'exemplification', 'experimentation', 'exploitation', 'extermination', 'extraordinary', 'falsification', 'familiarization', 'federalization', 'fertilization', 'fictionalization', 'fragmentation', 'generalization', 'globalization', 'governmental', 'hallucination', 'harmonization', 'hospitalization', 'humanitarian', 'identification', 'illumination', 'imagination', 'immobilization', 'immortalization', 'immunization', 'implementation', 'imprisonment', 'improvement', 'institutional', 'instrumental', 'intellectual', 'intensification', 'international', 'interpretation', 'intervention', 'investigation', 'justification', 'liberalization', 'magnetization', 'maintenance', 'malnutrition', 'manufacturing', 'marginalization', 'materialization', 'mathematical', 'maximization', 'mechanization', 'memorization', 'merchandising', 'metamorphosis', 'methodological', 'microscopic', 'militarization', 'minimization', 'miscalculation', 'misconception', 'misinformation', 'misinterpretation', 'misrepresentation', 'mobilization', 'modernization', 'modification', 'monopolization', 'multinational', 'multiplication', 'nationalization', 'naturalization', 'neutralization', 'normalization', 'notification', 'objectification', 'obliteration', 'observation', 'obstruction', 'occupational', 'optimization', 'organization', 'orientation', 'originality', 'ornamentation', 'oscillation', 'overpopulation', 'overproduction', 'overwhelming', 'participation', 'particularity', 'penalization', 'perfection', 'permeation', 'perpetuation', 'personification', 'persuasion', 'pharmaceutical', 'philosophical', 'polarization', 'politicization', 'popularization', 'precipitation', 'predestination', 'predetermination', 'preoccupation', 'preservation', 'privatization', 'procrastination', 'proliferation', 'pronunciation', 'propaganda', 'proportional', 'proposition', 'prosecution', 'prosperity', 'psychoanalysis', 'psychological', 'publication', 'purification', 'qualification', 'quantification', 'questionnaire', 'rationalization', 'reactionary', 'realization', 'reappearance', 'rearrangement', 'reassessment', 'rebellion', 'recognition', 'reconstruction', 'recreation', 'redistribution', 'reduction', 'reformation', 'regeneration', 'registration', 'regularization', 'rehabilitation', 'reimbursement', 'reinforcement', 'reinterpretation', 'reintroduction', 'rejuvenation', 'relationship', 'relativization', 'religion', 'reorganization', 'representation', 'reproduction', 'requirement', 'reservation', 'resignation', 'resistance', 'resolution', 'restoration', 'restriction', 'retaliation', 'retirement', 'revolutionary', 'satisfaction', 'scientification', 'secularization', 'segregation', 'sensitization', 'separation', 'simplification', 'socialization', 'sophisticated', 'specialization', 'specification', 'standardization', 'sterilization', 'stigmatization', 'stimulation', 'subordination', 'substitution', 'supernatural', 'supervision', 'supplementation', 'synchronization', 'systematization', 'technological', 'telecommunication', 'termination', 'territorial', 'transformation', 'transmission', 'transportation', 'tribalization', 'unconstitutional', 'underdevelopment', 'underestimation', 'understatement', 'unemployment', 'unification', 'unprecedented', 'unquestionable', 'unsatisfactory', 'urbanization', 'utilization', 'validation', 'vaporization', 'vegetation', 'verification', 'versification', 'victimization', 'visualization', 'vocalization', 'vulnerability', 'westernization', 'xenophobia', 'youthfulness', 'zoological'
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
    'tab': 'left-pinky', 'caps': 'left-pinky',
    
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
    "'": 'right-pinky', '/': 'right-pinky', 'enter': 'right-pinky', 'backspace': 'right-pinky',
    
    // Special keys (both hands)
    'shift': 'thumb', 'ctrl': 'thumb', 'alt': 'thumb',
    
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
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
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
      case 'complete': {
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
    }
  } catch (error) {
    // Silently fail if audio context is not supported
    console.warn('Audio playback failed:', error)
  }
}
