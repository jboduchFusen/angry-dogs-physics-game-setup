
# Angry Dogs Physics Game

## Requirements
- Physics-based projectile game similar to Angry Birds
- Slingshot mechanic to launch dog projectiles
- Destructible structures with enemy cats
- Multiple levels with increasing difficulty
- Score tracking and star ratings
- Different dog types with unique abilities
- Responsive design with beautiful UI

## Design
### Color Scheme
- Primary: Orange (#FF8C00) - energetic, playful
- Accent: Green (#228B22) - structures, success
- Destructive: Red (#DC143C) - enemies, danger
- Sky: Light blue gradient
- Ground: Brown gradient

### Game Mechanics
- Drag and release slingshot to launch dogs
- Physics-based collision and destruction
- Limited projectiles per level
- Score based on destruction and remaining projectiles
- Victory when all enemies defeated
- Defeat when projectiles exhausted

## Tasks
### ✅ Task 1: Project Setup & Foundation (Completed)
- Created React + TypeScript + Vite project structure
- Implemented design system with semantic tokens
- Built home page with navigation
- Created placeholder game canvas
- Set up routing structure

### ✅ Task 2: Physics Engine Implementation (Completed)
- Integrated Matter.js physics library
- Created PhysicsEngine class for game world management
- Implemented projectile, structure, and enemy bodies
- Built slingshot drag-and-release mechanic
- Added collision detection and physics simulation
- Created game loop with rendering
- Implemented game state management (score, projectiles, enemies)
- Added victory/defeat conditions
- Built interactive game UI overlay

**Files Modified:**
- package.json (added matter-js dependencies)
- src/lib/physics/PhysicsEngine.ts (new)
- src/hooks/usePhysicsGame.ts (new)
- src/components/game/GameCanvas.tsx (updated with physics)

### 🔲 Task 3: Level System
- Design level data structure
- Create level loader/manager
- Build 10+ levels with varying difficulty
- Implement level progression
- Add level selection UI
- Store level completion data

### 🔲 Task 4: Dog Types & Abilities
- Create base dog class
- Implement 5 dog variants:
  - Standard (basic projectile)
  - Speed (fast, light impact)
  - Splitter (splits into 3)
  - Bomber (explosive impact)
  - Heavy (slow, massive damage)
- Add ability activation system
- Create visual distinctions for each type

### 🔲 Task 5: Enhanced Visuals & Effects
- Add particle effects for impacts
- Implement destruction animations
- Create trajectory preview line
- Add background parallax layers
- Enhance character sprites
- Add smooth camera follow

### 🔲 Task 6: Audio System
- Integrate audio library
- Add sound effects (launch, impact, destruction, victory)
- Implement background music
- Create audio settings/mute controls

### 🔲 Task 7: Scoring & Progression
- Implement 3-star rating system
- Add high score tracking
- Create achievement system
- Build leaderboard (optional - requires backend)
- Add unlock progression

## Discussions
### Physics Engine Choice
Selected Matter.js for its:
- Lightweight and performant
- Good documentation
- Active maintenance
- Perfect for 2D physics games
- Easy integration with Canvas API

### Game Balance
- Slingshot force: 0.015 (tuned for satisfying launches)
- Max drag distance: 80px (prevents over-stretching)
- Projectile density: 0.004 (balanced weight)
- Enemy density: 0.002 (lighter for easier destruction)
- Ground friction: 0.8 (realistic rolling)