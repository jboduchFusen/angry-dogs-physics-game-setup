
import Matter from 'matter-js';

export interface PhysicsConfig {
  width: number;
  height: number;
  gravity: number;
}

export class PhysicsEngine {
  public engine: Matter.Engine;
  public world: Matter.World;
  public render?: Matter.Render;
  private config: PhysicsConfig;

  constructor(config: PhysicsConfig) {
    this.config = config;
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: config.gravity, scale: 0.001 }
    });
    this.world = this.engine.world;
  }

  createGround(x: number, y: number, width: number, height: number) {
    const ground = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      friction: 0.8,
      restitution: 0.2,
      label: 'ground',
      render: {
        fillStyle: '#8B4513'
      }
    });
    Matter.World.add(this.world, ground);
    return ground;
  }

  createProjectile(x: number, y: number, radius: number) {
    const projectile = Matter.Bodies.circle(x, y, radius, {
      density: 0.01,
      friction: 0.3,
      restitution: 0.6,
      label: 'projectile',
      render: {
        fillStyle: '#8B4513'
      }
    });
    Matter.World.add(this.world, projectile);
    return projectile;
  }

  createBox(x: number, y: number, width: number, height: number, isStatic = false) {
    const box = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic,
      density: 0.002,
      friction: 0.5,
      restitution: 0.4,
      label: isStatic ? 'structure' : 'box',
      render: {
        fillStyle: isStatic ? '#90EE90' : '#A0D890'
      }
    });
    Matter.World.add(this.world, box);
    return box;
  }

  createEnemy(x: number, y: number, radius: number) {
    const enemy = Matter.Bodies.circle(x, y, radius, {
      density: 0.002,
      friction: 0.5,
      restitution: 0.4,
      label: 'enemy',
      render: {
        fillStyle: '#FF6B6B'
      }
    });
    Matter.World.add(this.world, enemy);
    return enemy;
  }

  launchProjectile(body: Matter.Body, force: Matter.Vector) {
    Matter.Body.applyForce(body, body.position, force);
  }

  removeBody(body: Matter.Body) {
    Matter.World.remove(this.world, body);
  }

  update() {
    Matter.Engine.update(this.engine, 1000 / 60);
  }

  clear() {
    Matter.World.clear(this.world, false);
    Matter.Engine.clear(this.engine);
  }

  getBodies() {
    return this.world.bodies;
  }

  getBody(label: string) {
    return this.world.bodies.find(body => body.label === label);
  }

  getAllBodiesByLabel(label: string) {
    return this.world.bodies.filter(body => body.label === label);
  }
}