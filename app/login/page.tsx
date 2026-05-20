'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'
import '@/styles/signup.css'

const OTP_LENGTH = 6

export default function LoginPage() {
  const [phone, setphone] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpDigits, setOtpDigits] = useState<string[]>(() => Array(OTP_LENGTH).fill(''))
  const [otpError, setOtpError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const resetOtp = useCallback(() => {
    setOtpDigits(Array(OTP_LENGTH).fill(''))
    setOtpError(null)
  }, [])

  const closeModal = useCallback(() => {
    setShowOtpModal(false)
    resetOtp()
  }, [resetOtp])

  useEffect(() => {
    if (showOtpModal) {
      const t = window.setTimeout(() => otpInputRefs.current[0]?.focus(), 50)
      return () => window.clearTimeout(t)
    }
  }, [showOtpModal])

  const handleGenerateOtp = async () => {
    setError(null)
    const trimmed = phone.trim()
    if (!trimmed) {
      setError('Please enter your phone number')
      return
    }
    setIsGenerating(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      resetOtp()
      setShowOtpModal(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleOtpChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setOtpDigits((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    setOtpError(null)
    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH)
      .fill('')
      .map((_, i) => pasted[i] ?? '')
    setOtpDigits(next)
    setOtpError(null)
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    otpInputRefs.current[focusIndex]?.focus()
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otpDigits.join('')
    if (code.length !== OTP_LENGTH) {
      setOtpError(`Enter all ${OTP_LENGTH} digits`)
      return
    }
    setIsVerifying(true)
    setOtpError(null)
    try {
      await new Promise((r) => setTimeout(r, 700))
      console.log('OTP verified', { phone: phone.trim(), code })
      closeModal()
    } catch {
      setOtpError('Verification failed. Try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="signup-container" style={{ fontFamily: FONT_FAMILY.default }}>
      <div className="signup-card">
        <h1 className="signup-title" style={{ fontSize: FONT_SIZES.heading }}>Access your account securely</h1>
        <p className="signup-subtitle" style={{ fontSize: FONT_SIZES.small }}>Join Nanban to get started</p>

        <div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="form-input"
              placeholder="+905555555555"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: COLORS.danger, marginBottom: '0.75rem' }}>{error}</div>
          )}

          <button
            type="button"
            className="btn-primary"
            style={{ backgroundColor: COLORS.primary }}
            disabled={isGenerating}
            onClick={handleGenerateOtp}
          >
            {isGenerating ? 'Generating otp...' : 'Generate OTP'}
          </button>
        </div>
      </div>

      {showOtpModal && (
        <div
          className="otp-modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div
            className="otp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="otp-modal-title"
          >
            <div className="otp-modal-header">
              <h2 id="otp-modal-title" className="otp-modal-title">
                Enter OTP
              </h2>
              <button type="button" className="otp-modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>
            <p className="otp-modal-hint" style={{ fontSize: FONT_SIZES.small }}>
              We sent a code to {phone.trim() || 'your number'}
            </p>

            <form onSubmit={handleVerifyOtp}>
              <div className="otp-input-row">
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpInputRefs.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    className="otp-digit-input"
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </div>

              {otpError && (
                <div className="otp-modal-error" style={{ color: COLORS.danger }}>
                  {otpError}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary otp-modal-submit"
                style={{ backgroundColor: COLORS.primary }}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


