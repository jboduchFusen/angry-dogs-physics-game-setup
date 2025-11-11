
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GameCanvas from '@/components/game/GameCanvas';
import { Dog, Target, Crosshair } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Angry Dogs</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link to="/levels">Levels</Link>
            </Button>
            <Button variant="ghost">Settings</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 game-gradient-sky">
        <div className="max-w-4xl w-full space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-bold text-white drop-shadow-lg">
              Angry Dogs
            </h2>
            <p className="text-xl text-white/90 drop-shadow">
              Launch furious pups to defeat the evil cats!
            </p>
          </div>

          {/* Game Preview Canvas */}
          <div className="bg-card rounded-lg shadow-2xl overflow-hidden border-4 border-primary">
            <GameCanvas />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/game">
                <Crosshair className="w-5 h-5 mr-2" />
                Play Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/levels">
                <Target className="w-5 h-5 mr-2" />
                Select Level
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-card/80 backdrop-blur p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Levels</div>
            </div>
            <div className="bg-card/80 backdrop-blur p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Dog Types</div>
            </div>
            <div className="bg-card/80 backdrop-blur p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-destructive">∞</div>
              <div className="text-sm text-muted-foreground">Fun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Angry Dogs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}