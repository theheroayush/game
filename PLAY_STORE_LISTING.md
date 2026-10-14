# 🚀 Google Play Store Listing & Submission Package
## App: Apex Chess Master

---

## 1. Store Listing Copy

### App Title (30 Characters Limit)
```
Apex Chess Master: Play AI
```
*(Exact length: 26 / 30 chars)*

### Short Description (80 Characters Limit)
```
Play grandmaster chess vs AI, master tactical puzzles, and boost your Elo!
```
*(Exact length: 74 / 80 chars)*

### Full Description (Up to 4,000 Characters)
```markdown
Master the game of kings with Apex Chess Master — the ultimate grandmaster-grade chess experience designed for both beginners and seasoned club players.

Powered by a hardened Alpha-Beta Minimax engine with Static Exchange Evaluation (SEE) and Quiescence search, Apex Chess Master delivers authentic, human-like play that never makes accidental piece-drops or unrealistic blunders.

KEY FEATURES:

♟️ 10 PROGRESSIVE AI OPPONENTS (600 TO 2500 ELO)
• Jimmy (600 Elo) - Novice friendly, perfect for learning the basics
• Martin (800 Elo) - Gentle beginner practice
• Elena (1000 Elo) - Solid foundational player
• Nelson (1200 Elo) - Aggressive attacker with early sorties
• Sophia (1400 Elo) - Solid club novice with opening knowledge
• Alexander (1600 Elo) - Tactical club contender
• Maya (1800 Elo) - Positional master who punishes mistakes
• Viktor (2000 Elo) - Master-level calculation & endgame technique
• Viswanathan AI (2200 Elo) - Lightning-fast tactical intuition
• Magnus AI (2500 Elo) - Relentless grandmaster precision

⚡ ADVANCED VISUAL COACHING & HEATMAPS
• Live Threat Arrows: See opponent threats before they strike
• Visual Best Move: Get grandmaster-level move suggestions in real time
• Control Heatmap: Visualize territorial board dominance at a glance

⏱️ 3-MINUTE TACTICS SPRINT & PUZZLES
• Rapid-fire tactical puzzles to train your pattern recognition
• Curated endgame studies and tactical motifs (pins, forks, skewers, mates)

📊 COMPREHENSIVE ELO CAREER PROFILE
• Real-time Elo progression tracker with performance charts
• Detailed win, loss, and draw analytics across all difficulty tiers
• Match history and move-by-move notation review

🎨 HIGH-FIDELITY BOARD & PIECE THEMES
• Classic Tournament wood, Midnight Onyx, Emerald Canvas, and Cyber Neon
• Smooth 60fps animations and realistic piece placement physics
• Tactile haptic feedback and custom sound effects for captures and checks

💬 INTERACTIVE BOT BANTER
• Personality-driven speech bubbles and dynamic reactions to moves, blunders, and brilliant sacrifices

🔒 100% OFFLINE & PRIVACY-FIRST
• Play anywhere without an internet connection
• No mandatory accounts, no telemetry, no tracking

Whether you are taking your first steps or preparing for your next tournament, Apex Chess Master is your personal grandmaster coach in your pocket. Download today and claim your crown!
```

---

## 2. Store Configuration & Classification

| Property | Value |
|---|---|
| **App Name** | `Apex Chess Master` |
| **Package Name / Application ID** | `com.apex.chess.apex_chess` |
| **Version Name** | `1.0.0` |
| **Version Code** | `1` |
| **Default Language** | English (United States) - en-US |
| **App Category** | Games > Board / Strategy |
| **Tags** | Chess, Board Games, Strategy, Puzzle, Offline |
| **Content Rating** | Everyone (PEGI 3, ESRB Everyone) |
| **Target Audience** | All ages (including Families) |
| **Ads Declaration** | No (App contains no ads) |
| **In-App Purchases** | No (100% free full game) |

---

## 3. Store Visual Asset Specifications

Prepare the following image files when setting up the store listing:

1. **App Icon**:
   - Format: PNG (32-bit with alpha)
   - Dimensions: **512 x 512 px**
   - Max file size: 1024 KB
   *(Tip: Use the high-res icon located at `mobile/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` or scale your vector master to 512x512)*

2. **Feature Graphic (Mandatory)**:
   - Format: JPEG or 24-bit PNG (no alpha)
   - Dimensions: **1024 x 500 px**
   - Max file size: 15 MB
   - Content: High-contrast title "Apex Chess Master" with 3D chess pieces (e.g., gold King & Queen) on a dark slate background.

3. **Phone Screenshots**:
   - Minimum: 2 screenshots (Recommended: 4 to 6)
   - Aspect ratio: 16:9 or 9:16 (e.g., **1080 x 1920 px** or **1080 x 2400 px**)
   - Recommended slides:
     - Slide 1: Main Menu & Personalized Chessboard Selection
     - Slide 2: In-Game Chessboard vs Magnus AI with Live Banter
     - Slide 3: Threat Arrows & Visual Best Move Coach
     - Slide 4: 3-Minute Tactics Sprint Puzzle Screen
     - Slide 5: Player Elo Career Profile & Win Analytics

---

## 4. Keystore & Signing Credentials (CRITICAL BACKUP)

> [!CAUTION]
> **DO NOT LOSE THIS KEYSTORE!** If you lose this keystore file or password, Google Play will **NEVER** allow you to update this app in the future. Back it up to a secure offline drive or password manager immediately.

- **Keystore Location**: `mobile/android/app/upload-keystore.jks`
- **Keystore Password**: `ApexChess2026SecureKey!`
- **Key Alias**: `upload`
- **Key Password**: `ApexChess2026SecureKey!`
- **Validity**: 10,000 days (~27 years)

---

## 5. Step-by-Step Google Play Console Upload Guide

1. Log in to [Google Play Console](https://play.google.com/console).
2. Click **Create app**:
   - App name: `Apex Chess Master`
   - Default language: `English (United States)`
   - App or game: `Game`
   - Free or paid: `Free`
3. In the Dashboard under **Set up your app**:
   - **Privacy Policy**: Enter the URL to your hosted `PRIVACY_POLICY.md` (e.g., GitHub Pages: `https://<username>.github.io/game/PRIVACY_POLICY.html` or a public Notion link).
   - **App Access**: Select *"All functionality is available without special access"*.
   - **Ads**: Select *"No, my app does not contain ads"*.
   - **Content Rating**: Complete the questionnaire (Answer "No" to violence, gambling, vulgarity). Your rating will be **Everyone / PEGI 3**.
   - **Target Audience**: Select *13 and older* (or all ages if family-friendly).
   - **Data Safety**:
     - Does your app collect or share user data? Select **No**.
     - All user stats are stored strictly locally on device.
4. In the Left Menu, go to **Store presence > Main store listing**:
   - Paste the App Title, Short Description, and Full Description from Section 1 above.
   - Upload your 512x512 App Icon.
   - Upload your 1024x500 Feature Graphic.
   - Upload 2 to 6 Phone Screenshots.
5. In the Left Menu, go to **Release > Production** (or **Closed testing**):
   - Click **Create new release**.
   - Drag and drop the generated release bundle:
     `mobile/build/app/outputs/bundle/release/app-release.aab`
   - Release name: `1.0.0`
   - Release notes:
     ```
     Initial release of Apex Chess Master!
     • 10 progressive AI difficulty tiers (600 to 2500 Elo)
     • Grandmaster Alpha-Beta engine with Static Exchange Evaluation (SEE)
     • Threat arrows and visual best move hints
     • 3-minute tactics sprints and puzzle challenges
     • Elo career tracking and analytics
     ```
   - Click **Save** > **Review release** > **Start rollout to Production**!
