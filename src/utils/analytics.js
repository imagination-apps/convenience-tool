const PURCHASE_EVENT_SESSION_KEY = 'ga_purchase_event_sent'

/**
 * Fires a GA4 "purchase" event, but only once per browser session
 * (guarded via sessionStorage) — a reload, back/forward navigation, or
 * StrictMode's double-invoked effects on the success page won't re-send it.
 * Returns true if the event was actually sent, false if it was skipped
 * because it already fired this session.
 */
export function trackPurchaseOnce() {
  try {
    if (window.sessionStorage.getItem(PURCHASE_EVENT_SESSION_KEY) === 'true') {
      return false
    }
  } catch {
    // sessionStorage unavailable (private mode, etc.) — fall through and
    // fire anyway; worst case a refresh could send it again.
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: 'TR_' + new Date().getTime(),
      value: 4.99, // unit price — keep in sync with the Pro price shown in Tokushoho.jsx
      currency: 'USD',
    })
  }

  try {
    window.sessionStorage.setItem(PURCHASE_EVENT_SESSION_KEY, 'true')
  } catch {
    // ignore — see above
  }

  return true
}
