
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
- Limited projectiles per level (3 turns)
- Score based on destruction and remaining projectiles
- Victory when all enemies defeated
- Defeat when projectiles exhausted
- Different dog types with unique abilities
- Trajectory preview for aiming
- Particle effects on impacts
- Material-based destruction (wood, stone, glass)
- Combo scoring system

### Dog Types
1. **Standard Dog** (Brown) - Balanced projectile, no special ability
   - Radius: 20px
   - Density: 0.004
   - Ability: None (baseline)
   
2. **Speed Dog** (Blue) - Fast and light, penetrates structures
   - Radius: 18px
   - Density: 0.003
   - Ability: Speed boost on activation (2x velocity)
   
3. **Splitter Dog** (Yellow) - Splits into 3 smaller dogs mid-flight
   - Radius: 20px
   - Density: 0.004
   - Ability: Split into 3 projectiles (radius 12px each)
   
4. **Bomber Dog** (Black) - Explodes on impact with area damage
   - Radius: 22px
   - Density: 0.005
   - Ability: Explosion with radial force (radius 100px, force 0.02)
   
5. **Heavy Dog** (Gray) - Massive weight, destroys everything in path
   - Radius: 25px
   - Density: 0.008
   - Ability: Increase density by 2x on activation

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

### ✅ Task 2.6: Multi-Turn System (Completed)
**Cost Estimate:** 50 LOC × 10 = 500 tokens
**Execution:** Single-pass modification

- Implemented automatic projectile spawning after settlement
- Added velocity and angular velocity detection for settled state
- Configured 3 turns per level
- Auto-spawn new projectile when previous one stops moving
- Remove settled projectile from physics world

**Files Modified:**
- src/hooks/usePhysicsGame.ts (added settlement detection and auto-spawn logic)

### ✅ Task 2.7: Trajectory Preview Line (Completed)
**Execution:** Single-pass implementation

- Created trajectory calculation utility
- Implemented dotted arc preview during drag
- Shows predicted path based on launch angle and force
- Updates preview in real-time as user drags
- Styled with semi-transparent white dotted line

**Files Created:**
- src/lib/effects/TrajectoryPreview.ts (trajectory calculation and rendering)

**Files Modified:**
- src/hooks/usePhysicsGame.ts (integrated trajectory preview)

### 🔲 Task 3: Dog Types & Abilities System
**Cost Estimate:** 600 LOC × 10 = 6,000 tokens
**Execution:** Multi-pass (types → abilities → rendering → integration)

**Subtasks:**

#### 3.1: Type System & Configuration (150 LOC)
- Create `src/types/DogTypes.ts` with DogType enum
- Define DogConfig interface with physics properties
- Create configuration map for all 5 dog types
- Add ability metadata (name, description, cooldown)

#### 3.2: Ability Implementation (250 LOC)
- Create `src/lib/physics/DogAbilities.ts`
- Implement ability functions:
  - `activateSpeedBoost()` - Multiply velocity by 2
  - `activateSplitter()` - Create 3 smaller bodies at angles
  - `activateBomber()` - Apply radial force to nearby bodies
  - `activateHeavy()` - Increase body density
- Add ability state tracking (used/available)
- Implement cooldown/one-time-use logic

#### 3.3: Visual Rendering (150 LOC)
- Create `src/lib/rendering/DogRenderer.ts`
- Implement type-specific rendering:
  - Standard: Brown with angry eyes
  - Speed: Blue with motion lines
  - Splitter: Yellow with split indicator
  - Bomber: Black with fuse
  - Heavy: Gray with weight symbol
- Add ability activation visual effects
- Create particle effects for abilities

#### 3.4: Game Integration (50 LOC)
- Extend PhysicsEngine.createProjectile() to accept DogType
- Add ability activation handler in usePhysicsGame
- Implement click/tap during flight to activate
- Update game state to track current dog type
- Add visual feedback for ability availability

**Files to Create:**
- src/types/DogTypes.ts (new - type definitions)
- src/lib/physics/DogAbilities.ts (new - ability logic)
- src/lib/rendering/DogRenderer.ts (new - visual rendering)

**Files to Modify:**
- src/lib/physics/PhysicsEngine.ts (extend createProjectile)
- src/hooks/usePhysicsGame.ts (add ability activation)
- src/components/game/GameCanvas.tsx (integrate rendering)

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
- Projectile density: 0.01 (increased for better impact)
- Projectile friction: 0.3 (balanced for realistic movement)
- Projectile restitution: 0.6 (good bounce)
- Box density: 0.002 (lighter for easier destruction)
- Box friction: 0.5 (reduced for better toppling)
- Ground friction: 0.8 (realistic rolling)

### Multi-Turn System
- 3 projectiles per level
- Automatic spawning after projectile settles
- Settlement detection: speed < 0.5 and angular velocity < 0.01
- Old projectile removed from physics world before spawning new one
- Game state tracks remaining turns

### Dog Type Balance
- **Standard**: Baseline for comparison, reliable
- **Speed**: Lower density compensates for speed boost
- **Splitter**: 3 smaller dogs = more coverage but less individual impact
- **Bomber**: Explosion radius balanced to not be overpowered
- **Heavy**: High density but slower, good for tough structures

### Material Properties (Future)
- **Wood**: Low density (0.001), medium friction (0.6), breaks easily
- **Stone**: High density (0.003), high friction (0.9), very durable
- **Glass**: Very low density (0.0005), low friction (0.3), shatters on impact

### Ability Activation
- Click/tap on projectile during flight to activate ability
- Visual indicator shows when ability is available
- One-time use per projectile
- Some abilities (Bomber) can auto-activate on impact
- Cooldown prevents spam (if needed for balance)

### Scoring Formula (Future)