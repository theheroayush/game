import '../models/chess_models.dart';

const List<OpeningData> OPENINGS_DATABASE = [
  // --- A: Flank & Modern Systems ---
  OpeningData(
    eco: 'A10',
    name: 'English Opening: Symmetrical',
    moves: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'Nf3', 'Nf6', 'O-O', 'O-O', 'd4', 'cxd4', 'Nxd4', 'Nxd4', 'Qxd4', 'd6'],
    fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
    description: 'A flexible flank opening controlling d5 and transposing fluidly into Queen’s Pawn or Catalan structures.',
    keyIdeas: ['Fianchetto the light-squared bishop on g2', 'Exert long diagonal pressure towards the queenside', 'Control d5 without early central pawn commitment'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'A20',
    name: 'English Opening: King’s English',
    moves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'd5', 'cxd5', 'Nxd5', 'Bg2', 'Nb6', 'O-O', 'Be7', 'a3', 'O-O', 'b4', 'Be6'],
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR b KQkq - 1 2',
    description: 'Reversed Sicilian structure where White plays with an extra tempo and rapid queenside expansion.',
    keyIdeas: ['Play a3 and b4 to launch a minority attack on the queenside', 'Maintain pressure on d5 with the g2 bishop', 'Keep central pawn flexibility'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'A04',
    name: 'Réti Opening: King’s Indian Attack',
    moves: ['Nf3', 'd5', 'g3', 'Nf6', 'Bg2', 'c6', 'O-O', 'Bg4', 'd3', 'Nbd7', 'Nbd2', 'e5', 'e4', 'Bd6', 'h3', 'Bh5'],
    fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1',
    description: 'Hypermodern system popularized by Richard Réti. White controls the center with pieces before committing pawns.',
    keyIdeas: ['Delay central pawn occupation', 'Fianchetto both bishops when appropriate', 'Strike at Black’s center with e4 or c4'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'A80',
    name: 'Dutch Defense: Leningrad Variation',
    moves: ['d4', 'f5', 'g3', 'Nf6', 'Bg2', 'g6', 'Nf3', 'Bg7', 'O-O', 'O-O', 'c4', 'd6', 'Nc3', 'c6', 'd5', 'e5'],
    fen: 'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
    description: 'An aggressive, asymmetrical response to 1.d4 combining Dutch f5 aggression with King’s Indian fianchetto defense.',
    keyIdeas: ['Control the e4 outpost with ...f5', 'Prepare the ...e5 central breakthrough', 'Create kingside mating threats with heavy pieces'],
    side: 'black',
    difficulty: 'Advanced',
  ),

  // --- B: Semi-Open Games (1.e4 Other than 1...e5) ---
  OpeningData(
    eco: 'B90',
    name: 'Sicilian Defense: Najdorf Variation (English Attack)',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nb3', 'Be6', 'f3', 'Be7', 'Qd2', 'O-O', 'O-O-O', 'Nbd7', 'g4', 'b5', 'g5', 'Nh5'],
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    description: 'The sharpest battleground in modern chess. Kasparov and Fischer’s primary weapon against 1.e4.',
    keyIdeas: ['Delay pawn central commitments with ...a6', 'Expand on the queenside with ...b5 and ...Nb6', 'Counter-attack White’s king storm through the half-open c-file'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'B70',
    name: 'Sicilian Defense: Dragon (Yugoslav Attack)',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6', 'Bc4', 'Bd7', 'O-O-O', 'Rc8', 'Bb3', 'Ne5', 'h4', 'h5'],
    fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R b KQkq - 1 6',
    description: 'One of the most razor-sharp tactical lines in chess theory with opposite-side castling and race to mate.',
    keyIdeas: ['Activate the powerful dragon bishop on g7 along the long diagonal', 'Exchange White’s dark-squared bishop with ...Nc4 or ...Be6', 'Launch a devastating queenside rook lift along the c-file'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'B33',
    name: 'Sicilian Defense: Sveshnikov Variation',
    moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bg5', 'a6', 'Na3', 'b5', 'Nd5', 'Be7', 'Bxf6', 'Bxf6', 'c3', 'O-O'],
    fen: 'r1bqkb1r/5ppp/p1np1n2/1N1Np3/4P3/8/PPP2PPP/R1BQKB1R b KQkq - 1 9',
    description: 'Dynamic system championed by Magnus Carlsen in the 2018 World Championship match.',
    keyIdeas: ['Surrender the d5 square in exchange for active piece play and bishops', 'Break in the center with ...f5', 'Dominate the light squares on the queenside'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'B22',
    name: 'Sicilian Defense: Alapin Variation (c3)',
    moves: ['e4', 'c5', 'c3', 'd5', 'exd5', 'Qxd5', 'd4', 'Nf6', 'Nf3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O', 'c4', 'Qd8', 'Nc3', 'cxd4', 'Nxd4', 'a6'],
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2',
    description: 'A solid, positional anti-Sicilian establishing a strong classical pawn center with d4 and c3.',
    keyIdeas: ['Build an uncontested d4 pawn center', 'Avoid sharp Najdorf/Dragon tactical complications', 'Target isolated queen pawn dynamic advantages'],
    side: 'white',
    difficulty: 'Beginner',
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
    eco: 'B12',
    name: 'Caro-Kann Defense: Advance Variation',
    moves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'Be3', 'Qb6', 'Nc3', 'Nc6', 'O-O', 'Qxb2', 'Qe1', 'cxd4', 'Bxd4', 'Nxd4', 'Nxd4', 'Bb4'],
    fen: 'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    description: 'White gains central space with 3.e5. Black rapidly activates the light-squared bishop before closing the pawn structure.',
    keyIdeas: ['Develop the light-squared bishop to f5 outside the pawn chain', 'Strike at the base of White’s pawn chain with ...c5', 'Keep King safety rock-solid in the endgame'],
    side: 'black',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'B18',
    name: 'Caro-Kann Defense: Classical (Capablanca)',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7', 'h5', 'Bh7', 'Bd3', 'Bxd3', 'Qxd3', 'e6', 'Bd2', 'Ngf6', 'O-O-O', 'Be7'],
    fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    description: 'Renowned for its rock-solid pawn structure and safety. Black trades bishops and prepares a safe queenside fortress.',
    keyIdeas: ['Develop the light-squared bishop outside the chain before playing ...e6', 'Castle queenside or kingside depending on White’s plan', 'Superior pawn skeleton in endgames'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'B01',
    name: 'Scandinavian Defense: Mainline (3...Qa5)',
    moves: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qa5', 'd4', 'Nf6', 'Nf3', 'c6', 'Bc4', 'Bf5', 'Bd2', 'e6', 'Nd5', 'Qd8', 'Nxf6+', 'Qxf6'],
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description: 'Black immediately challenges White’s central e4 pawn on move 1 and retreats the queen safely to a5.',
    keyIdeas: ['Rapid piece development and queenside castling', 'Place the light-squared bishop on f5 before ...e6', 'Solid pawn fortress on c6 and e6'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'B07',
    name: 'Pirc Defense: Austrian Attack',
    moves: ['e4', 'd6', 'd4', 'Nf6', 'Nc3', 'g6', 'f4', 'Bg7', 'Nf3', 'O-O', 'Bd3', 'Na6', 'O-O', 'c5', 'd5', 'Bg4', 'h3', 'Bxf3', 'Qxf3'],
    fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 3',
    description: 'An aggressive test of Black’s hypermodern defense where White builds a massive 3-pawn center.',
    keyIdeas: ['Break White’s center with ...c5 or ...e5', 'Target White’s overextended pawn advances', 'Utilize the dark-squared bishop on g7'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'B02',
    name: 'Alekhine Defense: Modern Variation',
    moves: ['e4', 'Nf6', 'e5', 'Nd5', 'd4', 'd6', 'Nf3', 'g6', 'Bc4', 'Nb6', 'Bb3', 'Bg7', 'Qe2', 'Nc6', 'O-O', 'O-O', 'h3', 'a5'],
    fen: 'rnbqkb1r/pppppppp/5n2/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2',
    description: 'Black baits White’s central pawns forward with 1...Nf6, intending to undermine and destroy the overextended center.',
    keyIdeas: ['Provoke pawn advances with the wandering knight', 'Undermine e5 with ...d6', 'Apply queenside and central piece pressure'],
    side: 'black',
    difficulty: 'Advanced',
  ),

  // --- C: Open Games (1.e4 e5) & French Defense ---
  OpeningData(
    eco: 'C65',
    name: 'Ruy Lopez: Berlin Defense',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5', 'Nf5', 'Qxd8+', 'Kxd8', 'Nc3', 'Ke8', 'h3', 'h5', 'Bf4', 'Be7', 'Rad1', 'Be6'],
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    description: 'The "Berlin Wall" that Vladimir Kramnik used to dethrone Garry Kasparov in 2000. An unbreachable master fortress.',
    keyIdeas: ['Trade queens on move 8 to enter the famed Berlin Endgame', 'Leverage the bishop pair despite losing castling rights', 'Rock-solid pawn structure on the queenside'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'C60',
    name: 'Ruy Lopez: Closed Morphy Defense',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3', 'Na5', 'Bc2', 'c5', 'd4', 'Qc7', 'Nbd2', 'cxd4', 'cxd4', 'Nc6'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'The classical cornerstone of chess culture. Centuries of theoretical depth and strategic mastery.',
    keyIdeas: ['Maintain indirect pin and pressure against Black’s e5 pawn', 'Preserve the Spanish Bishop on c2/b3', 'Build a monumental pawn center with c3 and d4'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C50',
    name: 'Italian Game (Giuoco Piano)',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O', 'O-O', 'Nbd2', 'a6', 'Bb3', 'Ba7', 'h3', 'h6', 'Re1', 'Re8', 'Nf1', 'Be6'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    description: 'A classical opening focusing on rapid piece development and direct pressure against Black’s weak f7 square.',
    keyIdeas: ['Target the sensitive f7 pawn', 'Castle quickly and prepare c3 followed by d4', 'Flexible setup suitable for aggressive and positional players alike'],
    side: 'white',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'C51',
    name: 'Italian Game: Evans Gambit',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5', 'd4', 'exd4', 'O-O', 'Nge7', 'cxd4', 'd5', 'exd5', 'Nxd5', 'Ba3', 'Be6'],
    fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4',
    description: 'Romantic attacking gambit where White sacrifices a flank pawn for blazing piece development and center domination.',
    keyIdeas: ['Sacrifice the b-pawn to gain tempos with c3 and d4', 'Prevent Black from castling with Ba3', 'Launch overwhelming attacks down the open e- and f-files'],
    side: 'white',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'C55',
    name: 'Two Knights Defense: Fried Liver Attack',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Nxd5', 'Nxf7', 'Kxf7', 'Qf3+', 'Ke6', 'Nc3', 'Ncb4', 'Qe4', 'c6', 'a3', 'Na6', 'd4', 'Nc7'],
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2BP4/8/PPP2PPP/RNBQK2R b KQkq - 3 4',
    description: 'A ruthless tactical sacrifice on f7 exposing Black’s king to a ferocious central crossfire.',
    keyIdeas: ['Sacrifice knight on f7 to drag Black’s king into the open center', 'Pin Black’s knight on d5 with Nc3 and Qf3+', 'Win through unstoppable mating attacks against Ke6'],
    side: 'white',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'C45',
    name: 'Scotch Game: Classical',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bc5', 'Be3', 'Qf6', 'c3', 'Nge7', 'Bc4', 'O-O', 'O-O', 'Bb6', 'Na3', 'd6', 'Ndc2', 'Be6'],
    fen: 'r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
    description: 'White opens the center on move 3. Kasparov revived it with devastating victories in championship matches.',
    keyIdeas: ['Open the central lines for fast piece activity', 'Exchange central pawns to simplify without losing initiative', 'Maintain aggressive piece placement'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C18',
    name: 'French Defense: Winawer (Poisoned Pawn)',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Qg4', 'Qc7', 'Qxg7', 'Rg8', 'Qxh7', 'cxd4', 'Ne2', 'Nbc6', 'f4', 'Bd7'],
    fen: 'rnbqk1nr/ppp2ppp/4p3/3pP3/1bPP4/2N5/PP3PPP/R1BQKBNR b KQkq - 2 4',
    description: 'A sharp, complex clash where Black sacrifices kingside pawns for total control of the dark squares and queenside.',
    keyIdeas: ['Double White’s c-pawns with ...Bxc3+', 'Counter-attack White’s overextended Queen with ...Rg8', 'Pressure the d4/c3 pawn chain with ...cxd4 and ...Nbc6'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'C00',
    name: 'French Defense: Classical',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'e5', 'Nfd7', 'f4', 'c5', 'Nf3', 'Nc6'],
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    description: 'A solid and resilient counter-attacking defense where Black creates a strong pawn chain pointing towards the kingside.',
    keyIdeas: ['Attack White’s pawn base with ...c5', 'Pressure the d4 pawn with ...Nc6 and ...Qb6', 'Solve the problem of the bad light-squared c8 bishop'],
    side: 'black',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C20',
    name: 'King’s Gambit Accepted',
    moves: ['e4', 'e5', 'f4', 'exf4', 'Nf3', 'g5', 'h4', 'g4', 'Ne5', 'Nf6', 'd4', 'd6'],
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2',
    description: 'The romantic era favorite. White sacrifices the f-pawn on move 2 for blazing piece development and kingside attack.',
    keyIdeas: ['Open the f-file for the rook after castling', 'Dominate the center with d4 and Bc4', 'Deliver devastating tactics against Black’s king'],
    side: 'white',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'C42',
    name: 'Petrov Defense (Russian Game)',
    moves: ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'd6', 'Nf3', 'Nxe4', 'd4', 'd5', 'Bd3', 'Bd6', 'O-O', 'O-O', 'c4', 'c6', 'Nc3', 'Nxc3', 'bxc3', 'dxc4'],
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    description: 'Symmetrical, ultra-resilient defense favored by Fabiano Caruana and Anatoly Karpov for its drawing power as Black.',
    keyIdeas: ['Maintain symmetrical central control', 'Neutralize White’s e4 pawn directly', 'Anchor an active knight on e4'],
    side: 'black',
    difficulty: 'Intermediate',
  ),

  // --- D: Closed Games (1.d4 d5) & Grünfeld ---
  OpeningData(
    eco: 'D00',
    name: 'Queen’s Gambit: Slav Defense',
    moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4', 'O-O', 'O-O', 'Qe2', 'Nbd7', 'e4', 'Bg6'],
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
    description: 'White offers a flank pawn to divert Black’s central d5 pawn and dominate the center with e4.',
    keyIdeas: ['Regain the gambited c4 pawn easily if accepted', 'Exert permanent queenside pressure', 'Dominate the central squares e4 and d4'],
    side: 'white',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'D30',
    name: 'Queen’s Gambit Declined: Orthodox',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'b6', 'cxd5', 'Nxd5', 'Bxe7', 'Qxe7', 'Nxd5', 'exd5', 'Rc1', 'Be6'],
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    description: 'Black refuses the pawn and bolsters the d5 outpost. A staple in world championship matches for over a century.',
    keyIdeas: ['Firmly secure the center', 'Neutralize White’s c-file attack', 'Seek freeing breaks with ...c5 or ...e5'],
    side: 'black',
    difficulty: 'Beginner',
  ),
  OpeningData(
    eco: 'D85',
    name: 'Grünfeld Defense: Modern Exchange Variation',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'e4', 'Nxc3', 'bxc3', 'Bg7', 'Nf3', 'c5', 'Be3', 'Qa5', 'Qd2', 'Nc6', 'Rc1', 'cxd4', 'cxd4', 'Qxd2+', 'Kxd2', 'O-O'],
    fen: 'rnbqkb1r/ppp1pp1p/6p1/3n4/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4',
    description: 'Garry Kasparov and Bobby Fischer’s favorite weapon. Black allows White a huge center, then hammers it with ...c5 and ...Bg7.',
    keyIdeas: ['Shatter White’s broad pawn center with ...c5', 'Pressure the d4 pawn with the dark-squared monster on g7', 'Active queen and rook play in the endgame'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'D02',
    name: 'London System: Classical',
    moves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'c3', 'e6', 'Nbd2', 'Bd6', 'Bg3', 'O-O', 'Bd3', 'b6', 'Ne5', 'Bb7', 'f4', 'Ne7'],
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
    description: 'A modern, reliable setup system for White. Rapid development of the dark-squared bishop outside the pawn pyramid (c3, d4, e3).',
    keyIdeas: ['Establish the solid pawn triangle c3-d4-e3', 'Control the e5 outpost for the knight', 'Extremely low risk and consistent middlegame plans'],
    side: 'white',
    difficulty: 'Beginner',
  ),

  // --- E: Indian Defenses (1.d4 Nf6 2.c4) ---
  OpeningData(
    eco: 'E60',
    name: 'King’s Indian Defense: Classical',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'Be3', 'f5', 'f3', 'f4', 'Bf2', 'g5'],
    fen: 'rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5',
    description: 'A hypermodern defense where Black allows White a huge center, then launches a ferocious kingside attack with ...f5.',
    keyIdeas: ['Lock the center with d5 and launch a pawn storm on White’s King with f5-f4-g5', 'Transfer pieces to the kingside attack', 'Endure queenside pressure in exchange for mating threats'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'E20',
    name: 'Nimzo-Indian Defense: Classical',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O', 'Bd3', 'd5', 'Nf3', 'c5', 'O-O', 'Nc6', 'a3', 'Bxc3', 'bxc3', 'dxc4', 'Bxc4', 'Qc7'],
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
    description: 'Black pins White’s knight on c3, preventing e4 and often doubling White’s c-pawns.',
    keyIdeas: ['Inflict doubled pawns on White after ...Bxc3', 'Blockade the center and target the weak c4 pawn', 'Solid pawn chains on dark or light squares'],
    side: 'black',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'E15',
    name: 'Queen’s Indian Defense: Fianchetto Variation',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6', 'g3', 'Ba6', 'b3', 'Bb4+', 'Bd2', 'Be7', 'Bg2', 'c6', 'Bc3', 'd5', 'Ne5', 'Nfd7', 'Nxd7', 'Nxd7', 'Nd2', 'O-O', 'O-O'],
    fen: 'rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 3',
    description: 'When White avoids the Nimzo-Indian with 3.Nf3, Black develops the light-squared bishop to b7 or a6 to control e4.',
    keyIdeas: ['Control the critical e4 central square', 'Target White’s c4 pawn with ...Ba6', 'Maintain solid pawn structure and safe king position'],
    side: 'black',
    difficulty: 'Intermediate',
  ),
  OpeningData(
    eco: 'E04',
    name: 'Catalan Opening: Open Defense',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'g3', 'd5', 'Bg2', 'dxc4', 'Nf3', 'a6', 'O-O', 'Nc6', 'e3', 'Bd7', 'Qe2', 'b5', 'Rd1', 'Be7', 'Nc3', 'O-O', 'e4', 'Qc8'],
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 3',
    description: 'A hybrid of Queen’s Gambit and Réti. The Catalan Bishop on g2 exerts monstrous diagonal pressure down the queenside.',
    keyIdeas: ['Dominate the long h1-a8 diagonal with the g2 bishop', 'Recover the c4 pawn with Ne5 or Qe2', 'Create queenside pins and rook infiltration'],
    side: 'white',
    difficulty: 'Advanced',
  ),
  OpeningData(
    eco: 'A56',
    name: 'Modern Benoni Defense',
    moves: ['d4', 'Nf6', 'c4', 'c5', 'd5', 'e6', 'Nc3', 'exd5', 'cxd5', 'd6', 'e4', 'g6', 'Nf3', 'Bg7', 'Be2', 'O-O', 'O-O', 'Re8', 'Nd2', 'Nbd7', 'a4', 'Ne5'],
    fen: 'rnbqkb1r/pp1ppp1p/5np1/2pP4/2P1P3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4',
    description: 'An asymmetrical fighting defense where Black creates a queenside pawn majority and pressure on White’s e4 pawn.',
    keyIdeas: ['Advance the queenside majority with ...a6 and ...b5', 'Pressure the e4 pawn down the half-open e-file', 'Active tactical piece play centered around the g7 bishop'],
    side: 'black',
    difficulty: 'Advanced',
  ),
];

OpeningData? findOpeningByMoves(List<String> moveSans) {
  if (moveSans.isEmpty) {
    return OPENINGS_DATABASE.first;
  }

  OpeningData? bestMatch;
  int maxMatched = 0;

  // 1. First priority: Match against defined opening sequences that have been completed
  for (final op in OPENINGS_DATABASE) {
    if (op.moves.length > moveSans.length) continue;
    bool match = true;
    for (int i = 0; i < op.moves.length; i++) {
      if (op.moves[i] != moveSans[i]) {
        match = false;
        break;
      }
    }
    if (match && op.moves.length > maxMatched) {
      maxMatched = op.moves.length;
      bestMatch = op;
    }
  }

  // 2. Fallback: If move sequence is shorter than opening definitions (e.g. ['e4'])
  if (bestMatch == null) {
    for (final op in OPENINGS_DATABASE) {
      bool match = true;
      for (int i = 0; i < moveSans.length; i++) {
        if (i >= op.moves.length || op.moves[i] != moveSans[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        bestMatch = op;
        break;
      }
    }
  }

  return bestMatch ?? OPENINGS_DATABASE.first;
}

OpeningData? findBookOpeningForMoves(List<String> moveSans) {
  OpeningData? best;
  int maxDepth = 0;
  for (final op in OPENINGS_DATABASE) {
    if (op.moves.length <= moveSans.length) continue;
    bool match = true;
    for (int i = 0; i < moveSans.length; i++) {
      if (op.moves[i] != moveSans[i]) {
        match = false;
        break;
      }
    }
    if (match && op.moves.length > maxDepth) {
      maxDepth = op.moves.length;
      best = op;
    }
  }
  return best;
}
