export type BanterTrigger =
  | 'start'
  | 'player_blunder'
  | 'player_brilliant'
  | 'bot_check'
  | 'player_check'
  | 'bot_capture'
  | 'low_time'
  | 'bot_win'
  | 'player_win'
  | 'draw';

export interface BotDialogueMap {
  start: string[];
  player_blunder: string[];
  player_brilliant: string[];
  bot_check: string[];
  player_check: string[];
  bot_capture: string[];
  low_time: string[];
  bot_win: string[];
  player_win: string[];
  draw: string[];
}

export const BOT_BANTER_CATALOG: Record<string, BotDialogueMap> = {
  Jimmy: {
    start: [
      "Hi! Have fun! I hope my knights don't get lost today.",
      "Hello! Let's play a friendly game!",
      "I practiced with my cat this morning!",
    ],
    player_blunder: [
      "Wait... was that a sacrifice or did you drop that?",
      "Oh! Can I take that? I think I can!",
      "Is that a trap? It feels like a trap...",
    ],
    player_brilliant: [
      "Whoa! That move was super sneaky!",
      "Are you a grandmaster in disguise?!",
      "I didn't see that coming at all!",
    ],
    bot_check: [
      "Check! ...I think that's check, right?",
      "Check! Look at my brave little piece!",
    ],
    player_check: [
      "Eek! My king needs to run away!",
      "Ouch, careful with that check!",
    ],
    bot_capture: [
      "Nom nom! That piece looked tasty.",
      "I got one! Yay!",
    ],
    low_time: [
      "Tick tock! My hands are getting shaky!",
      "Quick, where do my pieces go?!",
    ],
    bot_win: [
      "I won?! Wow, good game! Rematch anytime!",
      "High five! That was really fun!",
    ],
    player_win: [
      "Good game! You're really good at this!",
      "I'm gonna go study my openings now!",
    ],
    draw: [
      "A draw! We are perfectly matched!",
    ],
  },
  Martin: {
    start: [
      "Let's play some calm, classical chess.",
      "Good luck! Remember to control the center.",
    ],
    player_blunder: [
      "Careful with your piece safety there.",
      "I believe that square was undefended.",
    ],
    player_brilliant: [
      "Very sharp idea! Well calculated.",
      "Impressive tactical vision.",
    ],
    bot_check: [
      "Check. Mind your king's escape squares.",
    ],
    player_check: [
      "A respectable check. Stepping aside.",
    ],
    bot_capture: [
      "Simplifying the position.",
      "Securing material advantage.",
    ],
    low_time: [
      "Clock is running low. Keep your composure.",
    ],
    bot_win: [
      "Good game! Solid effort throughout.",
    ],
    player_win: [
      "Well played! You outmaneuvered me cleanly.",
    ],
    draw: [
      "A peaceful conclusion. Good match.",
    ],
  },
  Elena: {
    start: [
      "Ready for some fireworks? I like sharp games!",
      "Let's skip the boring moves and get straight to tactics!",
    ],
    player_blunder: [
      "Oof, you walked right into my crosshairs!",
      "Tactical oversight detected!",
    ],
    player_brilliant: [
      "Now THAT is what I call dynamic chess!",
      "Brilliant find! You've got sharp eyes.",
    ],
    bot_check: [
      "Check! No hiding from the attack!",
      "Check! The storm is arriving!",
    ],
    player_check: [
      "Nice poke, but my defense is active.",
    ],
    bot_capture: [
      "Forks, pins, and grabs! Free piece for me.",
    ],
    low_time: [
      "Speed chess time! Let's see who blinks first.",
    ],
    bot_win: [
      "Checkmate! Sharp tactical finish!",
    ],
    player_win: [
      "Bravo! You out-tacticked me fair and square.",
    ],
    draw: [
      "Perpetual check! Wild ride.",
    ],
  },
  Nelson: {
    start: [
      "My Queen is ready to feast. Hope your king is safe!",
      "Prepare for early queen sorties and kingside aggression!",
    ],
    player_blunder: [
      "My Queen smiles at your mistake!",
      "Left your king exposed? Big mistake against Nelson!",
    ],
    player_brilliant: [
      "Hmph... clever counter-punch. But I won't back down!",
    ],
    bot_check: [
      "Check! The Queen delivers her regards!",
      "Check! Run while you still can!",
    ],
    player_check: [
      "Merely a scratch. My counter-attack is coming!",
    ],
    bot_capture: [
      "Crushed! My queen clears the board.",
      "Another victim to the assault!",
    ],
    low_time: [
      "Time is running out for your defense!",
    ],
    bot_win: [
      "Checkmate! The Queen reigns supreme!",
    ],
    player_win: [
      "You survived my attack and won... respect.",
    ],
    draw: [
      "A hard-fought battle to a standstill.",
    ],
  },
  Antonio: {
    start: [
      "Harmony on 64 squares. May the best strategy prevail.",
    ],
    player_blunder: [
      "That weakens your pawn structure permanently.",
      "An unforced error that disrupts your harmony.",
    ],
    player_brilliant: [
      "Exquisite geometric harmony in that move.",
    ],
    bot_check: [
      "Check with positional initiative.",
    ],
    player_check: [
      "Parrying the check according to opening principles.",
    ],
    bot_capture: [
      "Harvesting positional dividends.",
    ],
    low_time: [
      "Stay calm under time constraints.",
    ],
    bot_win: [
      "Strategic victory achieved. Good game.",
    ],
    player_win: [
      "Superb positional mastery on your part. Congratulations!",
    ],
    draw: [
      "Perfect equilibrium achieved. Draw.",
    ],
  },
  Sofia: {
    start: [
      "Every pawn move creates an outpost. Let's build.",
    ],
    player_blunder: [
      "You conceded key dark squares with that move.",
      "That pawn push created holes in your defense.",
    ],
    player_brilliant: [
      "A profound pawn break! Superb structural play.",
    ],
    bot_check: [
      "Check. The outpost yields dividends.",
    ],
    player_check: [
      "My king safely retreats to an entrenched square.",
    ],
    bot_capture: [
      "Chipping away at your defensive perimeter.",
    ],
    low_time: [
      "Fast moves, but precision still counts.",
    ],
    bot_win: [
      "Positional squeeze converted cleanly. Well played.",
    ],
    player_win: [
      "You outmaneuvered my fortress! Splendid game.",
    ],
    draw: [
      "Impenetrable fortress. A well-earned draw.",
    ],
  },
  Laura: {
    start: [
      "Chess is pure magic and illusion. Watch closely!",
    ],
    player_blunder: [
      "Did you fall for the sleight of hand?",
      "Now you see the piece... now you don't!",
    ],
    player_brilliant: [
      "You saw straight through my illusion! Masterful.",
    ],
    bot_check: [
      "Check! The trick is revealed!",
    ],
    player_check: [
      "A surprise check! Nicely timed.",
    ],
    bot_capture: [
      "Abra-cadabra! That piece vanished.",
    ],
    low_time: [
      "The hourglass is running out of sand!",
    ],
    bot_win: [
      "Checkmate! That concludes the performance.",
    ],
    player_win: [
      "You out-magicked the magician! Truly brilliant.",
    ],
    draw: [
      "A mirror illusion. Perfectly balanced draw.",
    ],
  },
  Viktor: {
    start: [
      "Grandmaster preparation active. Show me your depth.",
    ],
    player_blunder: [
      "Inaccurate. That cedes the advantage instantly.",
      "Tactical concession. I will exploit this ruthlessly.",
    ],
    player_brilliant: [
      "Masterful calculation. Deep theoretical depth.",
    ],
    bot_check: [
      "Check. Forcing your king into passive squares.",
    ],
    player_check: [
      "Anticipated. Defensive file consolidated.",
    ],
    bot_capture: [
      "Material converted with active compensation.",
    ],
    low_time: [
      "Clock pressure separates grandmasters from novices.",
    ],
    bot_win: [
      "Checkmate. Accurate conversion of advantage.",
    ],
    player_win: [
      "Incredible victory. You played like a true Grandmaster.",
    ],
    draw: [
      "Theoretical draw correctly found. Commendable.",
    ],
  },
  Alexander: {
    start: [
      "International Master standard. No casual concessions.",
    ],
    player_blunder: [
      "Positional inaccuracy. The initiative transfers to me.",
    ],
    player_brilliant: [
      "World-class resourcefulness. Well played.",
    ],
    bot_check: [
      "Check. Tightening the positional noose.",
    ],
    player_check: [
      "Solid defensive response prepared.",
    ],
    bot_capture: [
      "Decisive material swing in the endgame.",
    ],
    low_time: [
      "Seconds ticking. Calculation speed is tested.",
    ],
    bot_win: [
      "Endgame technique brought to fruition. Good game.",
    ],
    player_win: [
      "Splendid mastery. You thoroughly earned this triumph.",
    ],
    draw: [
      "Grandmaster stalemate/agreement. Respected.",
    ],
  },
  Magnus: {
    start: [
      "Let's play. Every endgame has a truth.",
      "World Championship depth engaged. Enjoy the game.",
    ],
    player_blunder: [
      "A positional concession. The rest is technique.",
      "You surrendered the bishop pair without compensation.",
      "That pawn structure weakness will cost you in the endgame.",
    ],
    player_brilliant: [
      "Remarkable find. Even Stockfish nods in approval.",
      "Superb move. You saw the deep resource.",
    ],
    bot_check: [
      "Check. The clamp tightens.",
      "Check. Your king is running out of breathing room.",
    ],
    player_check: [
      "A brave check. Let's see the follow-up.",
    ],
    bot_capture: [
      "Simplifying into an effortlessly winning endgame.",
      "Precise capture. The advantage is cemented.",
    ],
    low_time: [
      "Under 30 seconds. This is where champions are made.",
    ],
    bot_win: [
      "Checkmate. Good fight, but the endgame technique was decisive.",
      "That was a great contest. Rematch whenever you're ready.",
    ],
    player_win: [
      "Astonishing play! You defeated the Apex Magnus engine. Take a bow!",
    ],
    draw: [
      "Stalemate / draw. You held the fortress against the World Champion.",
    ],
  },
};

export function getBotBanter(botName: string, trigger: BanterTrigger): string | null {
  const key = Object.keys(BOT_BANTER_CATALOG).find(
    (k) => botName.toLowerCase().includes(k.toLowerCase())
  ) || 'Nelson';

  const dialogues = BOT_BANTER_CATALOG[key]?.[trigger];
  if (!dialogues || dialogues.length === 0) return null;

  const idx = Math.floor(Math.random() * dialogues.length);
  return dialogues[idx];
}
