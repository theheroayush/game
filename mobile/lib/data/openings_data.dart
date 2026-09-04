import '../models/chess_models.dart';

const List<OpeningData> OPENINGS_DATABASE = [
  OpeningData(
    eco: 'B90',
    name: 'Sicilian Defense: Najdorf Variation',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    description: 'The legendary weapon of Kasparov and Fischer. Sharp, dynamic, and full of tactical complexity.',
    keyIdeas: ['Delay pawn central commitments with ...a6', 'Expand on the queenside with ...b5', 'Counter-attack White’s e4 pawn through the c-file'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'B20',
    name: 'Sicilian Defense',
    moves: ['e4', 'c5'],
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'The most popular and best-scoring response to 1.e4 at grandmaster level. Leads to asymmetrical, unbalanced positions.',
    keyIdeas: ['Fight for the center from the flank', 'Generate queenside counterplay', 'Trade the c-pawn for White’s d-pawn for central pawn superiority'],
    side: 'black',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C60',
    name: 'Ruy Lopez (Spanish Game)',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'One of the oldest and most classical openings. White applies indirect pressure on Black’s e5 pawn by attacking its defender.',
    keyIdeas: ['Maintain long-term pressure on e5', 'Build a classical pawn center with c3 and d4', 'Maneuver the light-squared bishop via c2 to support king attack'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C50',
    name: 'Italian Game (Giuoco Piano)',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'A classical opening focusing on rapid piece development and direct pressure against Black’s weak f7 square.',
    keyIdeas: ['Target the sensitive f7 pawn', 'Castle quickly and prepare c3 followed by d4', 'Flexible setup suitable for aggressive and positional players alike'],
    side: 'white',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'C00',
    name: 'French Defense',
    moves: ['e4', 'e6', 'd4', 'd5'],
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    description: 'A solid and resilient counter-attacking defense where Black creates a strong pawn chain pointing towards the kingside.',
    keyIdeas: ['Attack White’s pawn base with ...c5', 'Pressure the d4 pawn with ...Nc6 and ...Qb6', 'Solve the problem of the bad light-squared c8 bishop'],
    side: 'black',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'B10',
    name: 'Caro-Kann Defense',
    moves: ['e4', 'c6', 'd4', 'd5'],
    fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    description: 'Renowned for its rock-solid pawn structure and safety. Black avoids the "bad bishop" issue of the French Defense.',
    keyIdeas: ['Develop the light-squared bishop outside the pawn chain before playing ...e6', 'Pawn breaks with ...c5', 'Extremely solid endgame pawn structure'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'D00',
    name: 'Queen’s Gambit',
    moves: ['d4', 'd5', 'c4'],
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
    description: 'White offers a flank pawn to divert Black’s central d5 pawn and dominate the center with e4.',
    keyIdeas: ['Regain the gambited c4 pawn easily if accepted', 'Exert permanent queenside pressure', 'Dominate the central squares e4 and d4'],
    side: 'white',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'D30',
    name: 'Queen’s Gambit Declined',
    moves: ['d4', 'd5', 'c4', 'e6'],
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    description: 'Black refuses the pawn and bolsters the d5 outpost. A staple in world championship matches for over a century.',
    keyIdeas: ['Firmly secure the center', 'Neutralize White’s c-file attack', 'Seek freeing breaks with ...c5 or ...e5'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'E60',
    name: 'King’s Indian Defense',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6'],
    fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5',
    description: 'A hypermodern defense where Black allows White a huge center, then launches a ferocious kingside attack with ...f5.',
    keyIdeas: ['Lock the center with d5 and launch a pawn storm on White’s King with f5-f4-g5', 'Transfer pieces to the kingside attack', 'Endure queenside pressure in exchange for mating threats'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'D02',
    name: 'London System',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4'],
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
    description: 'A modern, reliable setup system for White. Rapid development of the dark-squared bishop outside the pawn pyramid (c3, d4, e3).',
    keyIdeas: ['Establish the solid pawn triangle c3-d4-e3', 'Control the e5 outpost for the knight', 'Extremely low risk and consistent middlegame plans'],
    side: 'white',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'A10',
    name: 'English Opening',
    moves: ['c4'],
    fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
    description: 'A flexible, flank opening controlling d5. Can transpose into Queen’s Gambit, King’s Indian, or maintain an independent character.',
    keyIdeas: ['Fianchetto the light-squared bishop on g2', 'Exert long diagonal pressure towards the queenside', 'Flexible central reaction'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'B01',
    name: 'Scandinavian Defense',
    moves: ['e4', 'd5'],
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'Black immediately challenges White’s central e4 pawn on move 1.',
    keyIdeas: ['Force open lines immediately', 'After 2.exd5 Qxd5, play ...Qa5 or ...Qd6', 'Develop pieces smoothly and castle queenside'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'C45',
    name: 'Scotch Game',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
    description: 'White opens the center on move 3. Kasparov revived it with devastating victories in championship matches.',
    keyIdeas: ['Open the central lines for fast piece activity', 'Exchange central pawns to simplify without losing initiative', 'Maintain aggressive piece placement'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'E20',
    name: 'Nimzo-Indian Defense',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4'],
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
    description: 'Black pins White’s knight on c3, preventing e4 and often doubling White’s c-pawns.',
    keyIdeas: ['Inflict doubled pawns on White after ...Bxc3', 'Blockade the center and target the weak c4 pawn', 'Solid pawn chains on dark or light squares'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'C20',
    name: 'King’s Gambit',
    moves: ['e4', 'e5', 'f4'],
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2',
    description: 'The romantic era favorite. White sacrifices the f-pawn on move 2 for blazing piece development and kingside attack.',
    keyIdeas: ['Open the f-file for the rook after castling', 'Dominate the center with d4 and Bc4', 'Deliver devastating tactics against Black’s king'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
];

OpeningData? findOpeningByMoves(List<String> moveSans) {
  if (moveSans.isEmpty) return null;

  OpeningData? bestMatch;
  int maxMatched = 0;

  for (final op in OPENINGS_DATABASE) {
    bool match = true;
    for (int i = 0; i < op.moves.length; i++) {
      if (i >= moveSans.length || moveSans[i] != op.moves[i]) {
        match = false;
        break;
      }
    }
    if (match && op.moves.length > maxMatched) {
      maxMatched = op.moves.length;
      bestMatch = op;
    }
  }

  return bestMatch;
}
