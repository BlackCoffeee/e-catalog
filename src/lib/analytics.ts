/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
export async function trackEvent(params: {
  eventType: 'PAGE_VIEW' | 'CTA_CLICK_REGISTER' | 'CTA_CLICK_WA' | 'CALCULATOR_SIMULATION';
  targetPath: string;
  faculty?: string;
  prodiSlug?: string;
}) {
  try {
    if (typeof window === 'undefined') return;

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      keepalive: true,
    });
  } catch {
    // Silent fail agar tidak mengganggu pengalaman pengguna
  }
}
