import { createContext, useContext, useMemo, useState } from 'react'
import { useProStatus } from '../hooks/useProStatus'
import ProModal from '../components/ProModal'

const ProStatusContext = createContext(null)

/**
 * Wraps the whole app so Pro status and the "Go Pro" modal are available from
 * any route — the header's Go Pro button, the converter's locked quality
 * slider, and the batch-limit modal all need to open the same modal without
 * prop-drilling through the router.
 */
export function ProStatusProvider({ children }) {
  const { isPro, activateWithCode } = useProStatus()
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  const value = useMemo(
    () => ({
      isPro,
      activateWithCode,
      openProModal: () => setIsProModalOpen(true),
    }),
    [isPro, activateWithCode],
  )

  return (
    <ProStatusContext.Provider value={value}>
      {children}
      <ProModal isOpen={isProModalOpen} onClose={() => setIsProModalOpen(false)} isPro={isPro} onActivateCode={activateWithCode} />
    </ProStatusContext.Provider>
  )
}

export function useProStatusContext() {
  const ctx = useContext(ProStatusContext)
  if (!ctx) throw new Error('useProStatusContext must be used within ProStatusProvider')
  return ctx
}
