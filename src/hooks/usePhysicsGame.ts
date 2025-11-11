
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { PhysicsEngine } from '@/lib/physics/PhysicsEngine';

export interface GameState {
  isLaunched: boolean;
  isDragging: boolean;
  projectileCount: number;
  enemiesRemaining: number;
  score: number;
}

export function usePhysicsGame(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const engineRef = useRef<PhysicsEngine | null>(null);
  const projectileRef = useRef<Matter.Body | null>(null);
  const animationFrameRef = useRef<number>();
  const [gameState, setGameState] = useState<GameState>({
    isLaunched: false,
    isDragging: false,
    projectileCount: 3,
    enemiesRemaining: 0,
    score: 0
  });

  const slingshotPosition = { x: 100, y: 280 };
  const maxDragDistance = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize physics engine
    const engine = new PhysicsEngine({
      width: canvas.width,
      height: canvas.height,
      gravity: 1
    });
    engineRef.current = engine;

    // Create ground
    engine.createGround(canvas.width / 2, canvas.height - 50, canvas.width, 100);

    // Create structures
    engine.createBox(500, canvas.height - 125, 60, 50, true);
    engine.createBox(530, canvas.height - 175, 40, 50);
    
    engine.createBox(600, canvas.height - 125, 60, 50, true);
    engine.createBox(620, canvas.height - 175, 40, 50);

    // Create enemies
    const enemy1 = engine.createEnemy(530, canvas.height - 210, 15);
    const enemy2 = engine.createEnemy(620, canvas.height - 210, 15);

    setGameState(prev => ({ ...prev, enemiesRemaining: 2 }));

    // Create initial projectile
    const projectile = engine.createProjectile(slingshotPosition.x, slingshotPosition.y, 20);
    projectileRef.current = projectile;

    // Game loop
    const gameLoop = () => {
      engine.update();
      render(ctx, canvas, engine);
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      engine.clear();
    };
  }, []);

  const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, engine: PhysicsEngine) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#87CEEB99');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground gradient
    const groundGradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    groundGradient.addColorStop(0, '#8B4513CC');
    groundGradient.addColorStop(1, '#8B4513');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Draw slingshot
    drawSlingshot(ctx, canvas);

    // Draw all physics bodies
    const bodies = engine.getBodies();
    bodies.forEach(body => {
      if (body.label === 'ground') return; // Skip ground rendering (already drawn)

      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);

      if (body.label === 'projectile') {
        drawDog(ctx, 0, 0, body.circleRadius || 20);
      } else if (body.label === 'enemy') {
        drawCat(ctx, 0, 0, body.circleRadius || 15);
      } else if (body.label === 'box' || body.label === 'structure') {
        const bounds = body.bounds;
        const width = bounds.max.x - bounds.min.x;
        const height = bounds.max.y - bounds.min.y;
        ctx.fillStyle = body.label === 'structure' ? '#90EE90' : '#A0D890';
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(-width / 2, -height / 2, width, height);
      }

      ctx.restore();
    });

    // Check for destroyed enemies
    const enemies = engine.getAllBodiesByLabel('enemy');
    const activeEnemies = enemies.filter(enemy => {
      const velocity = Matter.Body.getVelocity(enemy);
      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      return enemy.position.y < canvas.height + 100 && speed > 0.1;
    });

    if (activeEnemies.length !== gameState.enemiesRemaining) {
      setGameState(prev => ({
        ...prev,
        enemiesRemaining: activeEnemies.length,
        score: prev.score + (prev.enemiesRemaining - activeEnemies.length) * 100
      }));
    }
  };

  const drawSlingshot = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(slingshotPosition.x, canvas.height - 100);
    ctx.lineTo(slingshotPosition.x, canvas.height - 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(slingshotPosition.x - 20, canvas.height - 180);
    ctx.lineTo(slingshotPosition.x, canvas.height - 200);
    ctx.lineTo(slingshotPosition.x + 20, canvas.height - 180);
    ctx.stroke();

    // Draw elastic bands if dragging
    if (gameState.isDragging && projectileRef.current) {
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(slingshotPosition.x - 20, canvas.height - 180);
      ctx.lineTo(projectileRef.current.position.x, projectileRef.current.position.y);
      ctx.lineTo(slingshotPosition.x + 20, canvas.height - 180);
      ctx.stroke();
    }
  };

  const drawDog = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Body
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, 5, 0, Math.PI * 2);
    ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, 2, 0, Math.PI * 2);
    ctx.arc(x + 5, y - 5, 2, 0, Math.PI * 2);
    ctx.fill();

    // Angry eyebrows
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x - 3, y - 7);
    ctx.moveTo(x + 10, y - 10);
    ctx.lineTo(x + 3, y - 7);
    ctx.stroke();
  };

  const drawCat = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    // Body
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x - 15, y - 20);
    ctx.lineTo(x - 5, y - 15);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 10, y - 10);
    ctx.lineTo(x + 15, y - 20);
    ctx.lineTo(x + 5, y - 15);
    ctx.fill();

    // Evil eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x - 5, y - 3, 2, 0, Math.PI * 2);
    ctx.arc(x + 5, y - 3, 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState.isLaunched || !projectileRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - projectileRef.current.position.x;
    const dy = mouseY - projectileRef.current.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 30) {
      setGameState(prev => ({ ...prev, isDragging: true }));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameState.isDragging || !projectileRef.current || !engineRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = slingshotPosition.x - mouseX;
    const dy = slingshotPosition.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let targetX = mouseX;
    let targetY = mouseY;

    if (distance > maxDragDistance) {
      const angle = Math.atan2(dy, dx);
      targetX = slingshotPosition.x - Math.cos(angle) * maxDragDistance;
      targetY = slingshotPosition.y - Math.sin(angle) * maxDragDistance;
    }

    Matter.Body.setPosition(projectileRef.current, { x: targetX, y: targetY });
    Matter.Body.setVelocity(projectileRef.current, { x: 0, y: 0 });
  };

  const handleMouseUp = () => {
    if (!gameState.isDragging || !projectileRef.current || !engineRef.current) return;

    const dx = slingshotPosition.x - projectileRef.current.position.x;
    const dy = slingshotPosition.y - projectileRef.current.position.y;

    const forceMagnitude = 0.015;
    const force = {
      x: dx * forceMagnitude,
      y: dy * forceMagnitude
    };

    engineRef.current.launchProjectile(projectileRef.current, force);

    setGameState(prev => ({
      ...prev,
      isDragging: false,
      isLaunched: true,
      projectileCount: prev.projectileCount - 1
    }));

    projectileRef.current = null;
  };

  const resetLevel = () => {
    if (!engineRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    engineRef.current.clear();

    // Recreate level
    engineRef.current.createGround(canvas.width / 2, canvas.height - 50, canvas.width, 100);
    engineRef.current.createBox(500, canvas.height - 125, 60, 50, true);
    engineRef.current.createBox(530, canvas.height - 175, 40, 50);
    engineRef.current.createBox(600, canvas.height - 125, 60, 50, true);
    engineRef.current.createBox(620, canvas.height - 175, 40, 50);
    engineRef.current.createEnemy(530, canvas.height - 210, 15);
    engineRef.current.createEnemy(620, canvas.height - 210, 15);

    const projectile = engineRef.current.createProjectile(slingshotPosition.x, slingshotPosition.y, 20);
    projectileRef.current = projectile;

    setGameState({
      isLaunched: false,
      isDragging: false,
      projectileCount: 3,
      enemiesRemaining: 2,
      score: 0
    });
  };

  return {
    gameState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetLevel
  };
}