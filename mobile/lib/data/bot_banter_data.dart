import 'dart:math';

enum BanterTrigger {
  start,
  playerBlunder,
  playerBrilliant,
  botCheck,
  playerCheck,
  botCapture,
  lowTime,
  botWin,
  playerWin,
  draw,
}

class BotDialogueMap {
  final List<String> start;
  final List<String> playerBlunder;
  final List<String> playerBrilliant;
  final List<String> botCheck;
  final List<String> playerCheck;
  final List<String> botCapture;
  final List<String> lowTime;
  final List<String> botWin;
  final List<String> playerWin;
  final List<String> draw;

  const BotDialogueMap({
    required this.start,
    required this.playerBlunder,
    required this.playerBrilliant,
    required this.botCheck,
    required this.playerCheck,
    required this.botCapture,
    required this.lowTime,
    required this.botWin,
    required this.playerWin,
    required this.draw,
  });

  List<String> getByTrigger(BanterTrigger trigger) {
    switch (trigger) {
      case BanterTrigger.start:
        return start;
      case BanterTrigger.playerBlunder:
        return playerBlunder;
      case BanterTrigger.playerBrilliant:
        return playerBrilliant;
      case BanterTrigger.botCheck:
        return botCheck;
      case BanterTrigger.playerCheck:
        return playerCheck;
      case BanterTrigger.botCapture:
        return botCapture;
      case BanterTrigger.lowTime:
        return lowTime;
      case BanterTrigger.botWin:
        return botWin;
      case BanterTrigger.playerWin:
        return playerWin;
      case BanterTrigger.draw:
        return draw;
    }
  }
}

const Map<String, BotDialogueMap> BOT_BANTER_CATALOG = {
  'Jimmy': BotDialogueMap(
    start: [
      "Hi! Have fun! I hope my knights don't get lost today.",
      "Hello! Let's play a friendly game!",
      "I practiced with my cat this morning!",
    ],
    playerBlunder: [
      "Wait... was that a sacrifice or did you drop that?",
      "Oh! Can I take that? I think I can!",
      "Is that a trap? It feels like a trap...",
    ],
    playerBrilliant: [
      "Whoa! That move was super sneaky!",
      "Are you a grandmaster in disguise?!",
      "I didn't see that coming at all!",
    ],
    botCheck: [
      "Check! ...I think that's check, right?",
      "Check! Look at my brave little piece!",
    ],
    playerCheck: [
      "Eek! My king needs to run away!",
      "Ouch, careful with that check!",
    ],
    botCapture: [
      "Nom nom! That piece looked tasty.",
      "I got one! Yay!",
    ],
    lowTime: [
      "Tick tock! My hands are getting shaky!",
      "Quick, where do my pieces go?!",
    ],
    botWin: [
      "I won?! Wow, good game! Rematch anytime!",
      "High five! That was really fun!",
    ],
    playerWin: [
      "Good game! You're really good at this!",
      "I'm gonna go study my openings now!",
    ],
    draw: [
      "A draw! We are perfectly matched!",
    ],
  ),
  'Martin': BotDialogueMap(
    start: [
      "Let's play some calm, classical chess.",
      "Good luck! Remember to control the center.",
    ],
    playerBlunder: [
      "Careful with your piece safety there.",
      "I believe that square was undefended.",
    ],
    playerBrilliant: [
      "Very sharp idea! Well calculated.",
      "Impressive tactical vision.",
    ],
    botCheck: [
      "Check. Mind your king's escape squares.",
    ],
    playerCheck: [
      "A respectable check. Stepping aside.",
    ],
    botCapture: [
      "Simplifying the position.",
      "Securing material advantage.",
    ],
    lowTime: [
      "Clock is running low. Keep your composure.",
    ],
    botWin: [
      "Good game! Solid effort throughout.",
    ],
    playerWin: [
      "Well played! You outmaneuvered me cleanly.",
    ],
    draw: [
      "A peaceful conclusion. Good match.",
    ],
  ),
  'Elena': BotDialogueMap(
    start: [
      "Ready for some fireworks? I like sharp games!",
      "Let's skip the boring moves and get straight to tactics!",
    ],
    playerBlunder: [
      "Oof, you walked right into my crosshairs!",
      "Tactical oversight detected!",
    ],
    playerBrilliant: [
      "Now THAT is what I call dynamic chess!",
      "Brilliant find! You've got sharp eyes.",
    ],
    botCheck: [
      "Check! No hiding from the attack!",
      "Check! The storm is arriving!",
    ],
    playerCheck: [
      "Nice poke, but my defense is active.",
    ],
    botCapture: [
      "Forks, pins, and grabs! Free piece for me.",
    ],
    lowTime: [
      "Speed chess time! Let's see who blinks first.",
    ],
    botWin: [
      "Checkmate! Sharp tactical finish!",
    ],
    playerWin: [
      "Bravo! You out-tacticked me fair and square.",
    ],
    draw: [
      "Perpetual check! Wild ride.",
    ],
  ),
  'Nelson': BotDialogueMap(
    start: [
      "My Queen is ready to feast. Hope your king is safe!",
      "Prepare for early queen sorties and kingside aggression!",
    ],
    playerBlunder: [
      "My Queen smiles at your mistake!",
      "Left your king exposed? Big mistake against Nelson!",
    ],
    playerBrilliant: [
      "Hmph... clever counter-punch. But I won't back down!",
    ],
    botCheck: [
      "Check! The Queen delivers her regards!",
      "Check! Run while you still can!",
    ],
    playerCheck: [
      "Merely a scratch. My counter-attack is coming!",
    ],
    botCapture: [
      "Crushed! My queen clears the board.",
      "Another victim to the assault!",
    ],
    lowTime: [
      "Time is running out for your defense!",
    ],
    botWin: [
      "Checkmate! The Queen reigns supreme!",
    ],
    playerWin: [
      "You survived my attack and won... respect.",
    ],
    draw: [
      "A hard-fought battle to a standstill.",
    ],
  ),
  'Antonio': BotDialogueMap(
    start: [
      "Harmony on 64 squares. May the best strategy prevail.",
    ],
    playerBlunder: [
      "That weakens your pawn structure permanently.",
      "An unforced error that disrupts your harmony.",
    ],
    playerBrilliant: [
      "Exquisite geometric harmony in that move.",
    ],
    botCheck: [
      "Check with positional initiative.",
    ],
    playerCheck: [
      "Parrying the check according to opening principles.",
    ],
    botCapture: [
      "Harvesting positional dividends.",
    ],
    lowTime: [
      "Stay calm under time constraints.",
    ],
    botWin: [
      "Strategic victory achieved. Good game.",
    ],
    playerWin: [
      "Superb positional mastery on your part. Congratulations!",
    ],
    draw: [
      "Perfect equilibrium achieved. Draw.",
    ],
  ),
  'Sofia': BotDialogueMap(
    start: [
      "Every pawn move creates an outpost. Let's build.",
    ],
    playerBlunder: [
      "You conceded key dark squares with that move.",
      "That pawn push created holes in your defense.",
    ],
    playerBrilliant: [
      "A profound pawn break! Superb structural play.",
    ],
    botCheck: [
      "Check. The outpost yields dividends.",
    ],
    playerCheck: [
      "My king safely retreats to an entrenched square.",
    ],
    botCapture: [
      "Chipping away at your defensive perimeter.",
    ],
    lowTime: [
      "Fast moves, but precision still counts.",
    ],
    botWin: [
      "Positional squeeze converted cleanly. Well played.",
    ],
    playerWin: [
      "You outmaneuvered my fortress! Splendid game.",
    ],
    draw: [
      "Impenetrable fortress. A well-earned draw.",
    ],
  ),
  'Laura': BotDialogueMap(
    start: [
      "Chess is pure magic and illusion. Watch closely!",
    ],
    playerBlunder: [
      "Did you fall for the sleight of hand?",
      "Now you see the piece... now you don't!",
    ],
    playerBrilliant: [
      "You saw straight through my illusion! Masterful.",
    ],
    botCheck: [
      "Check! The trick is revealed!",
    ],
    playerCheck: [
      "A surprise check! Nicely timed.",
    ],
    botCapture: [
      "Abra-cadabra! That piece vanished.",
    ],
    lowTime: [
      "The hourglass is running out of sand!",
    ],
    botWin: [
      "Checkmate! That concludes the performance.",
    ],
    playerWin: [
      "You out-magicked the magician! Truly brilliant.",
    ],
    draw: [
      "A mirror illusion. Perfectly balanced draw.",
    ],
  ),
  'Viktor': BotDialogueMap(
    start: [
      "Grandmaster preparation active. Show me your depth.",
    ],
    playerBlunder: [
      "Inaccurate. That cedes the advantage instantly.",
      "Tactical concession. I will exploit this ruthlessly.",
    ],
    playerBrilliant: [
      "Masterful calculation. Deep theoretical depth.",
    ],
    botCheck: [
      "Check. Forcing your king into passive squares.",
    ],
    playerCheck: [
      "Anticipated. Defensive file consolidated.",
    ],
    botCapture: [
      "Material converted with active compensation.",
    ],
    lowTime: [
      "Clock pressure separates grandmasters from novices.",
    ],
    botWin: [
      "Checkmate. Accurate conversion of advantage.",
    ],
    playerWin: [
      "Incredible victory. You played like a true Grandmaster.",
    ],
    draw: [
      "Theoretical draw correctly found. Commendable.",
    ],
  ),
  'Alexander': BotDialogueMap(
    start: [
      "International Master standard. No casual concessions.",
    ],
    playerBlunder: [
      "Positional inaccuracy. The initiative transfers to me.",
    ],
    playerBrilliant: [
      "World-class resourcefulness. Well played.",
    ],
    botCheck: [
      "Check. Tightening the positional noose.",
    ],
    playerCheck: [
      "Solid defensive response prepared.",
    ],
    botCapture: [
      "Decisive material swing in the endgame.",
    ],
    lowTime: [
      "Seconds ticking. Calculation speed is tested.",
    ],
    botWin: [
      "Endgame technique brought to fruition. Good game.",
    ],
    playerWin: [
      "Splendid mastery. You thoroughly earned this triumph.",
    ],
    draw: [
      "Grandmaster stalemate/agreement. Respected.",
    ],
  ),
  'Magnus': BotDialogueMap(
    start: [
      "Let's play. Every endgame has a truth.",
      "World Championship depth engaged. Enjoy the game.",
    ],
    playerBlunder: [
      "A positional concession. The rest is technique.",
      "You surrendered the bishop pair without compensation.",
      "That pawn structure weakness will cost you in the endgame.",
    ],
    playerBrilliant: [
      "Remarkable find. Even Stockfish nods in approval.",
      "Superb move. You saw the deep resource.",
    ],
    botCheck: [
      "Check. The clamp tightens.",
      "Check. Your king is running out of breathing room.",
    ],
    playerCheck: [
      "A brave check. Let's see the follow-up.",
    ],
    botCapture: [
      "Simplifying into an effortlessly winning endgame.",
      "Precise capture. The advantage is cemented.",
    ],
    lowTime: [
      "Under 30 seconds. This is where champions are made.",
    ],
    botWin: [
      "Checkmate. Good fight, but the endgame technique was decisive.",
      "That was a great contest. Rematch whenever you're ready.",
    ],
    playerWin: [
      "Astonishing play! You defeated the Apex Magnus engine. Take a bow!",
    ],
    draw: [
      "Stalemate / draw. You held the fortress against the World Champion.",
    ],
  ),
};

String? getBotBanter(String botName, BanterTrigger trigger) {
  final key = BOT_BANTER_CATALOG.keys.firstWhere(
    (k) => botName.toLowerCase().contains(k.toLowerCase()),
    orElse: () => 'Nelson',
  );

  final dialogueMap = BOT_BANTER_CATALOG[key];
  if (dialogueMap == null) return null;

  final options = dialogueMap.getByTrigger(trigger);
  if (options.isEmpty) return null;

  final random = Random();
  return options[random.nextInt(options.length)];
}
