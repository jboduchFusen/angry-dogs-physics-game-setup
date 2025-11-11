
import { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Draw sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#87CEEB99');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    const groundGradient = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    groundGradient.addColorStop(0, '#8B4513CC');
    groundGradient.addColorStop(1, '#8B4513');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Draw slingshot
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(100, canvas.height - 100);
    ctx.lineTo(100, canvas.height - 200);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, canvas.height - 180);
    ctx.lineTo(100, canvas.height - 200);
    ctx.lineTo(120, canvas.height - 180);
    ctx.stroke();

    // Draw placeholder dog
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(100, canvas.height - 120, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(95, canvas.height - 125, 5, 0, Math.PI * 2);
    ctx.arc(105, canvas.height - 125, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(95, canvas.height - 125, 2, 0, Math.PI * 2);
    ctx.arc(105, canvas.height - 125, 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw placeholder structures (targets)
    const drawBox = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    };

    // Structure 1
    drawBox(600, canvas.height - 150, 60, 50, '#90EE90');
    drawBox(610, canvas.height - 200, 40, 50, '#FF6B6B');

    // Structure 2
    drawBox(500, canvas.height - 150, 60, 50, '#90EE90');
    drawBox(510, canvas.height - 200, 40, 50, '#FF6B6B');

    // Draw enemy cat placeholder
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(630, canvas.height - 170, 15, 0, Math.PI * 2);
    ctx.fill();

    // Cat ears
    ctx.beginPath();
    ctx.moveTo(620, canvas.height - 180);
    ctx.lineTo(615, canvas.height - 190);
    ctx.lineTo(625, canvas.height - 185);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(640, canvas.height - 180);
    ctx.lineTo(645, canvas.height - 190);
    ctx.lineTo(635, canvas.height - 185);
    ctx.fill();

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto bg-transparent"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}