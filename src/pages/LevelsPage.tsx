
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dog, 
  Home, 
  Star, 
  Lock, 
  Trophy,
  ChevronLeft
} from 'lucide-react';

interface LevelCardProps {
  levelNumber: number;
  stars: number;
  highScore: number;
  isLocked: boolean;
}

function LevelCard({ levelNumber, stars, highScore, isLocked }: LevelCardProps) {
  return (
    <Card className={`relative overflow-hidden transition-all hover:scale-105 ${
      isLocked ? 'opacity-50' : 'cursor-pointer hover:shadow-lg'
    }`}>
      <Link to={isLocked ? '#' : '/game'} className="block p-6">
        {/* Level Number */}
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-foreground mb-1">
            {levelNumber}
          </div>
          <div className="text-xs text-muted-foreground">
            Level
          </div>
        </div>

        {/* Stars */}
        {!isLocked && (
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= stars
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        )}

        {/* Lock Icon */}
        {isLocked && (
          <div className="flex justify-center mb-3">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* High Score */}
        {!isLocked && highScore > 0 && (
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Best</div>
            <div className="text-sm font-bold text-accent">
              {highScore.toLocaleString()}
            </div>
          </div>
        )}

        {/* New Badge */}
        {!isLocked && stars === 0 && (
          <Badge className="absolute top-2 right-2" variant="secondary">
            New
          </Badge>
        )}
      </Link>
    </Card>
  );
}

export default function LevelsPage() {
  // Mock data - will be replaced with actual game progress
  const levels = Array.from({ length: 15 }, (_, i) => ({
    levelNumber: i + 1,
    stars: i === 0 ? 2 : i < 3 ? 1 : 0,
    highScore: i === 0 ? 12500 : i < 3 ? 8000 : 0,
    isLocked: i > 3
  }));

  const totalStars = levels.reduce((sum, level) => sum + level.stars, 0);
  const maxStars = levels.length * 3;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Dog className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                Level Select
              </h1>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Progress Summary */}
          <Card className="p-6 bg-card/95 backdrop-blur">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Your Progress
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Keep playing to unlock more levels!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {levels.filter(l => !l.isLocked).length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Unlocked
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-3xl font-bold text-foreground">
                      {totalStars}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      /{maxStars}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Stars Earned
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* World 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Backyard Battles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn the basics and master your aim
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {levels.slice(0, 5).map((level) => (
                <LevelCard key={level.levelNumber} {...level} />
              ))}
            </div>
          </div>

          {/* World 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  City Chaos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Navigate complex structures and obstacles
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {levels.slice(5, 10).map((level) => (
                <LevelCard key={level.levelNumber} {...level} />
              ))}
            </div>
          </div>

          {/* World 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center">
                <span className="text-xl font-bold text-destructive-foreground">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Castle Conquest
                </h3>
                <p className="text-sm text-muted-foreground">
                  Face the ultimate challenges
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {levels.slice(10, 15).map((level) => (
                <LevelCard key={level.levelNumber} {...level} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/95 backdrop-blur py-4">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Main Menu
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}