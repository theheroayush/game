/**
 * Cryptographically secure random dice generator.
 * Generates an authoritative integer from 1 to 6.
 */
export function generateSecureDice(): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return (array[0] % 6) + 1;
  }
  // Fallback for non-crypto environments
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Generates a clean 6-character room code excluding ambiguous characters (0, O, 1, I).
 */
export function generateRoomCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(6);
    crypto.getRandomValues(array);
    for (let i = 0; i < 6; i++) {
      code += chars[array[i] % chars.length];
    }
    return code;
  }
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Generates a unique client action ID for idempotency tracking.
 */
export function generateActionId(prefix = 'act'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
