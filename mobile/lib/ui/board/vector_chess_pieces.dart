import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../models/chess_models.dart';

/// Tournament-grade Colin Burnett vector definitions (international standard used by Chess.com & Lichess).
/// Renders authentic, crisp vector silhouettes with dual-tone fills and realistic ambient drop shadow.
class VectorChessPieceWidget extends StatelessWidget {
  final String type; // 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
  final String color; // 'w' | 'b'
  final PieceThemeId theme;
  final double size;

  const VectorChessPieceWidget({
    super.key,
    required this.type,
    required this.color,
    this.theme = PieceThemeId.staunton,
    this.size = 40.0,
  });

  @override
  Widget build(BuildContext context) {
    final bool isWhite = color == 'w';
    final svgString = _buildPieceSvg(
      type: type.toLowerCase(),
      isWhite: isWhite,
      theme: theme,
    );

    return SizedBox(
      width: size,
      height: size,
      child: Center(
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Soft ambient contact shadow onto the board square for 3D realism
            Positioned(
              bottom: size * 0.05,
              child: Container(
                width: size * 0.62,
                height: size * 0.16,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.elliptical(size * 0.31, size * 0.08)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withAlpha(isWhite ? 90 : 130),
                      blurRadius: size * 0.10,
                      spreadRadius: 0.5,
                      offset: Offset(0, size * 0.03),
                    ),
                  ],
                ),
              ),
            ),

            // High-DPI anti-aliased SVG piece
            SvgPicture.string(
              svgString,
              width: size * 0.96,
              height: size * 0.96,
              fit: BoxFit.contain,
            ),
          ],
        ),
      ),
    );
  }

  static String _buildPieceSvg({
    required String type,
    required bool isWhite,
    required PieceThemeId theme,
  }) {
    // Theme palette mappings matching web
    String whiteFill = '#FFFFFF';
    String whiteStroke = '#1E242B';
    String blackFill = '#2A2E35';
    String blackStroke = '#0F1216';
    String detailColor = isWhite ? '#1E242B' : '#F0F4F8';

    switch (theme) {
      case PieceThemeId.woodcraft:
        whiteFill = '#FEF3C7';
        whiteStroke = '#78350F';
        blackFill = '#451A03';
        blackStroke = '#1C0A00';
        detailColor = isWhite ? '#78350F' : '#FDE68A';
        break;
      case PieceThemeId.alpha:
        whiteFill = '#E0F2FE';
        whiteStroke = '#0284C7';
        blackFill = '#0F172A';
        blackStroke = '#38BDF8';
        detailColor = isWhite ? '#0284C7' : '#38BDF8';
        break;
      case PieceThemeId.neo:
        whiteFill = '#F8FAFC';
        whiteStroke = '#0F172A';
        blackFill = '#1E293B';
        blackStroke = '#0A0E17';
        detailColor = isWhite ? '#334155' : '#E2E8F0';
        break;
      case PieceThemeId.minimal:
        whiteFill = '#F8FAFC';
        whiteStroke = '#18181B';
        blackFill = '#18181B';
        blackStroke = '#A1A1AA';
        detailColor = isWhite ? '#18181B' : '#F4F4F5';
        break;
      case PieceThemeId.staunton:
        whiteFill = '#FCFBF7'; // Rich warm ivory porcelain
        whiteStroke = '#1E232A'; // Clean dark graphite
        blackFill = '#23272F'; // Rich deep obsidian
        blackStroke = '#0D0F13';
        detailColor = isWhite ? '#1E232A' : '#EAEFF5';
        break;
    }

    final fill = isWhite ? whiteFill : blackFill;
    final stroke = isWhite ? whiteStroke : blackStroke;

    switch (type) {
      case 'p':
        return _pawnSvg(fill, stroke, detailColor, isWhite);
      case 'n':
        return _knightSvg(fill, stroke, detailColor, isWhite);
      case 'b':
        return _bishopSvg(fill, stroke, detailColor, isWhite);
      case 'r':
        return _rookSvg(fill, stroke, detailColor, isWhite);
      case 'q':
        return _queenSvg(fill, stroke, detailColor, isWhite);
      case 'k':
        return _kingSvg(fill, stroke, detailColor, isWhite);
      default:
        return _pawnSvg(fill, stroke, detailColor, isWhite);
    }
  }

  // PAWN
  static String _pawnSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
        fill="$fill" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${isWhite ? 'M11.5 37.5c0-6 3.5-9.5 6.5-11 1.5 1 3 1.5 4.5 1.5s3-.5 4.5-1.5c3 1.5 6.5 5 6.5 11h-22z' : 'M12 37.5c.5-4.5 3.5-8.5 7-10.5 1.1.7 2.3 1 3.5 1s2.4-.3 3.5-1c3.5 2 6.5 6 7 10.5H12z'}"
        fill="none" stroke="$detail" stroke-width="1.3" stroke-linecap="round"/>
</svg>''';
  }

  // KNIGHT
  static String _knightSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
        fill="$fill" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
        fill="$fill" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="9.5" cy="25.5" r="1.1" fill="$detail"/>
  <circle cx="15" cy="15.5" r="1.1" fill="$detail"/>
  <path d="M24.55 10.4s-1.05 1.47-1.55 3.15c-.5 1.68-.3 3.65.6 4.75"
        fill="none" stroke="$detail" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M28.5 12.5s-1.2 1.8-1.7 3.8c-.5 2-.2 4.2.8 5.4"
        fill="none" stroke="$detail" stroke-width="1.3" stroke-linecap="round"/>
</svg>''';
  }

  // BISHOP
  static String _bishopSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <g fill="none" fill-rule="evenodd" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"
          fill="$fill"/>
    <path d="M17.5 26h10M15 30h15" stroke="$detail" stroke-width="1.3"/>
    <path d="M22.5 10v4M20.5 12h4" stroke="$detail" stroke-width="1.3"/>
    <path d="M20 18c1.5 1 3.5 1 5 0" stroke="$detail" stroke-width="1.3"/>
  </g>
</svg>''';
  }

  // ROOK
  static String _rookSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <g fill="$fill" fill-rule="evenodd" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt"/>
    <path d="M34 14l-3 3H14l-3-3"/>
    <path d="M31 17v12.5H14V17" stroke-linecap="butt" stroke-linejoin="miter"/>
    <path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/>
    <path d="M11 14h23" fill="none" stroke="$detail" stroke-width="1.3"/>
    <path d="M14 23.5h17" fill="none" stroke="$detail" stroke-width="1.3"/>
  </g>
</svg>''';
  }

  // QUEEN
  static String _queenSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <g fill="$fill" fill-rule="evenodd" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="12" r="2.5"/>
    <circle cx="14" cy="9" r="2.5"/>
    <circle cx="22.5" cy="8" r="2.5"/>
    <circle cx="31" cy="9" r="2.5"/>
    <circle cx="39" cy="12" r="2.5"/>
    <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-7.5-14-7.5 14-7-11 2 12z" stroke-linecap="butt"/>
    <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" stroke-linecap="butt"/>
    <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" stroke="$detail" stroke-width="1.3"/>
  </g>
</svg>''';
  }

  // KING
  static String _kingSvg(String fill, String stroke, String detail, bool isWhite) {
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="100%" height="100%">
  <g fill="none" stroke="$stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22.5 4v7M20 6.5h5" stroke="$stroke" stroke-width="1.9"/>
    <path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 20l-8.5-8.5L14 20l-7.5-6.5L9 26z" fill="$fill" stroke-linecap="butt"/>
    <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="$fill" stroke-linecap="butt"/>
    <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" stroke="$detail" stroke-width="1.3"/>
    <circle cx="22.5" cy="18" r="2.5" fill="$detail"/>
  </g>
</svg>''';
  }
}
