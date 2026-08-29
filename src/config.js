// Central place for the freemium rules and Stripe wiring.
// Replace STRIPE_PAYMENT_LINK with your real Stripe Payment Link before shipping.
export const FREE_MAX_FILES = 5
export const FREE_QUALITY = 0.8

export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PRO_PAYMENT_LINK'

// Manually-issued promo/license codes accepted in the "enter a code" box.
// In production you'd likely validate this against a real license service instead
// of a hardcoded list, but for a purely client-side tool a fixed allowlist (or a
// simple checksum scheme) is a reasonable, zero-backend way to distribute codes.
export const VALID_PROMO_CODES = ['PROMO-LAUNCH-2026', 'FRIENDS-AND-FAMILY']
