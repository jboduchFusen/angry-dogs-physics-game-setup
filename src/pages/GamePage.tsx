
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GameCanvas from '@/components/game/GameCanvas';
import { 
  Dog, 
  Home, 
  Pause, 
  Play, 
  RotateCcw, 
  Settings, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  Trophy,
  Star
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function GamePage() {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const currentLevel = 1;
  const totalLevels = 15;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back & Level Info */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/levels">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Levels
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">
                  Level {currentLevel}/{totalLevels}
                </span>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center gap-2">
              <Dog className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground hidden sm:block">
                Angry Dogs
              </h1>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="hidden sm:flex"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Level Info */}
          <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-sm">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">
              Level {currentLevel}/{totalLevels}
            </span>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-4">
            {/* Game Canvas */}
            <Card className="overflow-hidden shadow-2xl border-4 border-primary/20">
              <div className="relative">
                {isPaused && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <Card className="p-8 space-y-4 max-w-sm">
                      <h2 className="text-3xl font-bold text-center text-foreground">
                        Paused
                      </h2>
                      <div className="space-y-2">
                        <Button
                          className="w-full"
                          onClick={() => setIsPaused(false)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.location.reload()}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Restart Level
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <Link to="/levels">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Level Select
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <Link to="/">
                            <Home className="w-4 h-4 mr-2" />
                            Main Menu
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
                <GameCanvas />
              </div>
            </Card>

            {/* Side Panel - Info & Tips */}
            <div className="space-y-4">
              {/* Level Objective */}
              <Card className="p-4 bg-card/95 backdrop-blur">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Objective
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Defeat all the evil cats to complete the level!
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target Score:</span>
                    <span className="font-bold text-foreground">5,000</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-xs text-muted-foreground ml-2">
                      15,000 pts
                    </span>
                  </div>
                </div>
              </Card>

              {/* Controls Guide */}
              <Card className="p-4 bg-card/95 backdrop-blur">
                <h3 className="font-bold text-foreground mb-3">
                  How to Play
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p>Drag the dog backwards on the slingshot</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p>Aim carefully at the structures and enemies</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p>Release to launch and watch the destruction!</p>
                  </div>
                </div>
              </Card>

              {/* Dog Types Preview */}
              <Card className="p-4 bg-card/95 backdrop-blur">
                <h3 className="font-bold text-foreground mb-3">
                  Available Dogs
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center">
                      <Dog className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">
                        Standard
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Balanced power
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Level
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Main Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
            <DialogDescription>
              Customize your game experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Sound Effects
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Music
              </span>
              <Button variant="outline" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="pt-4 border-t border-border">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Reset All Progress
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}