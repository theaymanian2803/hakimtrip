export const SITE_PHONE_DISPLAY = '+212 768-188817';
export const SITE_PHONE_TEL = '+212768188817';
export const SITE_WHATSAPP_NUMBER = '212768188817';
export const SITE_EMAIL = 'contact@moroccotourcravers.com';

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${SITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}