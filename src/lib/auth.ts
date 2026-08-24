const DEFAULT_ADMIN_EMAIL = 'admin@site.com';
const DEFAULT_ADMIN_PASSWORD_HASH = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (!email || !password) return false;
  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return false;
  const digest = await sha256Hex(password);
  return timingSafeEqualHex(digest, ADMIN_PASSWORD_HASH);
}