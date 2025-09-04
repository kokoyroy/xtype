import type { TypingStats } from '../types'
import { formatTime, cn } from '../lib/utils'
import { Clock, Target, Zap, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface StatsDisplayProps {
  stats: TypingStats
  showLiveWpm?: boolean
  className?: string
}

export function StatsDisplay({ stats, showLiveWpm = true, className }: StatsDisplayProps) {
  const { wpm, accuracy, timeElapsed, correctChars, totalChars, isComplete } = stats

  const statItems = [
    {
      label: 'WPM',
      value: wpm,
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      icon: Target,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Time',
      value: formatTime(timeElapsed),
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      label: 'Progress',
      value: `${correctChars}/${totalChars}`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <Card key={item.label} className="hover:shadow-xl transition-all duration-200">
            <CardContent className="flex items-center space-x-4 p-5">
              <div className={cn("p-3 rounded-xl shadow-md", item.bgColor)}>
                <item.icon className={cn("h-6 w-6", item.color)} />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-semibold text-foreground">
          <span>📈 Progress</span>
          <span>{Math.round((correctChars / Math.max(totalChars, 1)) * 100)}%</span>
        </div>
        <Progress 
          value={Math.min((correctChars / Math.max(totalChars, 1)) * 100, 100)} 
          className="h-3"
        />
      </div>

      {/* Completion Message */}
      {isComplete && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200">
                Congratulations! 🎉
              </h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">
              You completed the typing test with <span className="font-bold">{wpm} WPM</span> and <span className="font-bold">{accuracy}% accuracy</span>!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Live WPM Display (optional) */}
      {showLiveWpm && !isComplete && timeElapsed > 0 && (
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="text-center p-4">
            <p className="text-sm font-semibold text-primary mb-2">⚡ Live WPM</p>
            <p className="text-4xl font-bold text-primary">{wpm}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
