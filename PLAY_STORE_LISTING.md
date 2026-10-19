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
| **Permissions Required** | **NONE (0 Permissions)** |
| **Video Proof Required by Google Play?** | **NO (Exempt – no restricted/sensitive permissions declared)** |
| **Content Rating** | Everyone (PEGI 3, ESRB Everyone) |
| **Target Audience** | All ages (including Families) |
| **Ads Declaration** | No (App contains no ads) |
| **In-App Purchases** | No (100% free full game) |

---

## 2.1 Zero-Permissions Exemption (No Video Demonstration Needed)

> [!NOTE]
> **Why You Do NOT Need to Upload Any Video to Google Play Console:**
> Google Play Console **only** forces developers to submit declaration forms and YouTube video links when an app requests **sensitive, high-risk, or restricted permissions** (e.g. `SCHEDULE_EXACT_ALARM`, Foreground Services, `RECORD_AUDIO`, `CAMERA`, `READ_MEDIA_IMAGES`, `ACCESS_FINE_LOCATION`, or SMS/Call logs).
>
> By removing `flutter_local_notifications`, `http`, and all runtime/network permissions, **Apex Chess Master declares ZERO permissions**.
>
> When you go through Google Play Console setup:
> - **Exact Alarms / Alarms questionnaire**: App does NOT declare exact alarms. (No form or video needed).
> - **Foreground Services**: App does NOT use foreground services. (No form or video needed).
> - **Notification Permissions**: App does NOT request `POST_NOTIFICATIONS`. (No prompt shown to users on install).
> - **Data Safety Questionnaire**: Select **"No, this app does not collect or share any user data"**.
> - **App Permissions in Play Console**: Google Play will automatically detect 0 permissions and display *"No permissions requested by this release"*.

## 3. Ready-to-Upload Store Visual Assets

All visual assets have been rendered to Google Play's exact dimension specifications and are located in the [`store_assets/`](store_assets/) folder:

1. **App Icon (Mandatory)**:
   - **File**: [`store_assets/icon_512x512.png`](store_assets/icon_512x512.png)
   - **Dimensions**: **512 x 512 px** (PNG, 32-bit with alpha)
   - **Status**: ✅ Ready to upload directly to Play Console.

2. **Feature Graphic (Mandatory)**:
   - **File**: [`store_assets/feature_graphic_1024x500.png`](store_assets/feature_graphic_1024x500.png)
   - **Dimensions**: **1024 x 500 px** (PNG, no alpha)
   - **Design**: Cinematic luxury chess set with gold accents, "APEX CHESS MASTER" title branding, and feature badges.
   - **Status**: ✅ Ready to upload directly to Play Console.

3. **Phone Screenshots (Mandatory - 5 High-Res Mobile Slides)**:
   All screenshots are rendered at **1080 x 2160 px** in [`store_assets/screenshots/`](store_assets/screenshots/):
   - **Slide 1**: [`1_gameplay_live.png`](store_assets/screenshots/1_gameplay_live.png) — Live match with threat arrows, evaluation bar, active timer clocks, and bot profile.
   - **Slide 2**: [`2_tactical_puzzles.png`](store_assets/screenshots/2_tactical_puzzles.png) — 3-Minute Tactics Sprint and puzzle rush training mode.
   - **Slide 3**: [`3_coach_analysis.png`](store_assets/screenshots/3_coach_analysis.png) — Move-by-move game review with CAPS accuracy score and blunder analysis.
   - **Slide 4**: [`4_opening_explorer.png`](store_assets/screenshots/4_opening_explorer.png) — Master opening repertoire explorer with theory lines.
   - **Slide 5**: [`5_endgame_trainer.png`](store_assets/screenshots/5_endgame_trainer.png) — Theoretical endgame practice against live computer defense.
   - **Status**: ✅ Ready to select and upload all 5 slides to the Phone Screenshots section.

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
