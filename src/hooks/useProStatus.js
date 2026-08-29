import { useCallback, useEffect, useState } from 'react'
import { VALID_PROMO_CODES } from '../config'

const STORAGE_KEY = 'is_pro_user'

function readStoredProFlag() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function writeStoredProFlag(value) {
  try {
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage unavailable — Pro status just won't persist across reloads
  }
}

/**
 * Tracks whether this browser is activated as Pro, and handles the
 * post-Stripe-checkout return: if the page loads with `?success=true` or
 * `?license_key=...` in the URL, we treat that as proof of purchase, persist
 * `is_pro_user: true` in localStorage, and strip the query params so a
 * refresh/share of the URL doesn't re-trigger anything.
 */
export function useProStatus() {
  const [isPro, setIsPro] = useState(readStoredProFlag)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const success = params.get('success')
    const licenseKey = params.get('license_key')

    if (success === 'true' || (licenseKey && licenseKey.trim().length > 0)) {
      writeStoredProFlag(true)
      setIsPro(true)

      params.delete('success')
      params.delete('license_key')
      const rest = params.toString()
      const cleanUrl = window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash
      window.history.replaceState({}, document.title, cleanUrl)
    }
  }, [])

  const activateWithCode = useCallback((code) => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) return false
    const isValid = VALID_PROMO_CODES.some((c) => c.toUpperCase() === normalized)
    if (isValid) {
      writeStoredProFlag(true)
      setIsPro(true)
    }
    return isValid
  }, [])

  return { isPro, activateWithCode }
}
