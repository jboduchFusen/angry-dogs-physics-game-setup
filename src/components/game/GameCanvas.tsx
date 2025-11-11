
import { useRef } from 'react';
import { usePhysicsGame } from '@/hooks/usePhysicsGame';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, handleMouseDown, handleMouseMove, handleMouseUp, resetLevel } = usePhysicsGame(canvasRef);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-auto bg-transparent cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Game UI Overlay */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 shadow-lg">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Dogs:</span>
            <span className="text-primary font-bold">{gameState.projectileCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Enemies:</span>
            <span className="text-destructive font-bold">{gameState.enemiesRemaining}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Score:</span>
            <span className="text-accent font-bold">{gameState.score}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <Button size="sm" variant="outline" onClick={resetLevel}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Victory/Defeat Messages */}
      {gameState.enemiesRemaining === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur">
          <div className="bg-card p-8 rounded-lg shadow-2xl text-center space-y-4">
            <h2 className="text-4xl font-bold text-success">Victory! 🎉</h2>
            <p className="text-xl text-muted-foreground">Score: {gameState.score}</p>
            <Button onClick={resetLevel}>Play Again</Button>
          </div>
        </div>
      )}

      {gameState.projectileCount === 0 && gameState.enemiesRemaining > 0 && gameState.isLaunched && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur">
          <div className="bg-card p-8 rounded-lg shadow-2xl text-center space-y-4">
            <h2 className="text-4xl font-bold text-destructive">Game Over</h2>
            <p className="text-xl text-muted-foreground">Score: {gameState.score}</p>
            <Button onClick={resetLevel}>Try Again</Button>
          </div>
        </div>
      )}
    </div>
  );
}