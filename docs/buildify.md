
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
- Different dog types with unique abilities
- Trajectory preview for aiming
- Particle effects on impacts
- Material-based destruction (wood, stone, glass)
- Combo scoring system

### Dog Types
1. **Standard Dog** - Balanced projectile, no special ability
2. **Speed Dog** - Fast and light, penetrates structures
3. **Splitter Dog** - Splits into 3 smaller dogs mid-flight
4. **Bomber Dog** - Explodes on impact with area damage
5. **Heavy Dog** - Massive weight, destroys everything in path

### Level Structure
- 15 levels across 3 worlds (5 levels each)
- Progressive difficulty with complex structures
- Different material types (wood, stone, glass)
- Star rating based on score thresholds
- Unlock progression (complete level to unlock next)

## Tasks
### ✅ Task 1: Project Setup & Foundation (Completed)
**Cost Estimate:** 500 LOC × 10 = 5,000 tokens
**Execution:** Single-pass generation with design system setup

- Created React + TypeScript + Vite project structure
- Implemented design system with semantic tokens
- Built home page with navigation
- Created placeholder game canvas
- Set up routing structure

### ✅ Task 2: Physics Engine Implementation (Completed)
**Cost Estimate:** 400 LOC × 10 = 4,000 tokens
**Execution:** Single-pass with Matter.js integration

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

### ✅ Task 2.5: Game Page & Level Selection UI (Completed)
**Execution:** Single-pass UI implementation

- Created comprehensive game page with header navigation
- Implemented pause menu with resume/restart/quit options
- Built side panel with objectives, controls guide, and dog info
- Added settings dialog for audio and game options
- Created level selection page with world grouping
- Implemented level cards with star ratings and lock states
- Added progress summary with stats display
- Built responsive layouts for mobile and desktop

**Files Modified:**
- src/pages/GamePage.tsx (complete redesign)
- src/pages/LevelsPage.tsx (complete redesign)

### 🔲 Task 3: Dog Types & Abilities System
**Cost Estimate:** 600 LOC × 10 = 6,000 tokens
**Execution:** Multi-pass (types → abilities → rendering)

**Subtasks:**
- Create DogType enum and configuration system
- Extend PhysicsEngine to support dog variants with custom properties
- Implement ability activation system (click/tap during flight)
- Build dog-specific rendering functions with visual distinctions
- Add ability effects:
  - Speed boost for Speed Dog
  - Split mechanic for Splitter Dog (create 3 smaller bodies)
  - Explosion radius for Bomber Dog (apply radial force)
  - Increased mass/force for Heavy Dog
- Update game state to track current dog type
- Create dog selection UI for levels

**Files to Create/Modify:**
- src/types/DogTypes.ts (new - dog type definitions)
- src/lib/physics/DogAbilities.ts (new - ability implementations)
- src/lib/physics/PhysicsEngine.ts (extend with dog variants)
- src/hooks/usePhysicsGame.ts (add ability activation)
- src/components/game/DogRenderer.ts (new - visual rendering)

### 🔲 Task 4: Level System & Data Structure
**Cost Estimate:** 700 LOC × 10 = 7,000 tokens
**Execution:** Multi-pass (structure → loader → UI)

**Subtasks:**
- Design level data schema (structures, enemies, dogs, par score)
- Create material types (wood, stone, glass) with different physics properties
- Build 15 level configurations with increasing difficulty
- Implement LevelManager class for loading/progression
- Add level completion tracking (stars, high scores)
- Create level selection screen with unlock progression
- Implement world/episode grouping (3 worlds × 5 levels)
- Add localStorage persistence for progress

**Files to Create/Modify:**
- src/types/LevelTypes.ts (new - level schema)
- src/data/levels.ts (new - level configurations)
- src/lib/game/LevelManager.ts (new - level loading/progression)
- src/lib/game/MaterialTypes.ts (new - material physics properties)
- src/hooks/useGameProgress.ts (new - progress tracking)
- src/components/game/LevelSelect.tsx (new - level selection UI)
- src/lib/physics/PhysicsEngine.ts (extend with material types)

### 🔲 Task 5: Scoring & Star Rating System
**Cost Estimate:** 400 LOC × 10 = 4,000 tokens
**Execution:** Single-pass with scoring logic

**Subtasks:**
- Implement scoring algorithm (destruction + remaining projectiles + time bonus)
- Create star rating thresholds (1-star, 2-star, 3-star)
- Add combo system for consecutive hits
- Build score multiplier for special abilities
- Create score display with animations
- Implement high score tracking per level
- Add end-of-level score summary screen
- Calculate and display statistics (accuracy, destruction %)

**Files to Create/Modify:**
- src/lib/game/ScoringSystem.ts (new - scoring logic)
- src/hooks/usePhysicsGame.ts (integrate scoring)
- src/components/game/ScoreDisplay.tsx (new - score UI)
- src/components/game/LevelComplete.tsx (new - summary screen)

### 🔲 Task 6: Visual Effects & Polish
**Cost Estimate:** 500 LOC × 10 = 5,000 tokens
**Execution:** Multi-pass (particles → trajectory → animations)

**Subtasks:**
- Create particle system for impacts and explosions
- Implement trajectory preview line (dotted arc)
- Add destruction animations (crumbling, shattering)
- Build parallax background layers (clouds, hills)
- Enhance character sprites with better details
- Add smooth camera follow for projectile
- Implement screen shake on impacts
- Create visual feedback for ability activation
- Add star collection animation

**Files to Create/Modify:**
- src/lib/effects/ParticleSystem.ts (new - particle effects)
- src/lib/effects/TrajectoryPreview.ts (new - aiming line)
- src/lib/effects/CameraController.ts (new - camera follow)
- src/hooks/usePhysicsGame.ts (integrate effects)
- src/components/game/GameCanvas.tsx (enhanced rendering)

### 🔲 Task 7: Audio System
**Cost Estimate:** 300 LOC × 10 = 3,000 tokens
**Execution:** Single-pass with audio integration

**Subtasks:**
- Create audio manager for sound effects and music
- Add sound effects (launch, impact, destruction, victory, ability activation)
- Implement background music with volume control
- Create audio settings (mute, volume sliders)
- Add spatial audio for impacts (panning based on position)
- Implement audio preloading for performance

**Files to Create/Modify:**
- src/lib/audio/AudioManager.ts (new - audio system)
- src/hooks/useAudio.ts (new - audio hook)
- src/components/game/AudioSettings.tsx (new - settings UI)
- src/hooks/usePhysicsGame.ts (integrate audio triggers)

### 🔲 Task 8: Mobile & Touch Support
**Cost Estimate:** 300 LOC × 10 = 3,000 tokens
**Execution:** Single-pass with touch handlers

**Subtasks:**
- Add touch event handlers for slingshot
- Implement responsive canvas scaling
- Create mobile-optimized UI controls
- Add haptic feedback for impacts (if supported)
- Optimize performance for mobile devices
- Test and adjust physics for touch precision

**Files to Create/Modify:**
- src/hooks/usePhysicsGame.ts (add touch handlers)
- src/components/game/GameCanvas.tsx (responsive sizing)
- src/lib/utils/touchUtils.ts (new - touch utilities)

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

### Material Properties
- **Wood**: Low density (0.001), medium friction (0.6), breaks easily
- **Stone**: High density (0.003), high friction (0.9), very durable
- **Glass**: Very low density (0.0005), low friction (0.3), shatters on impact

### Scoring Formula