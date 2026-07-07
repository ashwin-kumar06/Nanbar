'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { COLORS, FONT_FAMILY, FONT_SIZES } from '@/lib/constants'
import Cookies from 'js-cookie'
import '@/styles/signup.css'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setUser } from '@/lib/redux/features/user/userSlice'

const OTP_LENGTH = 6

export default function LoginPage() {
  const router = useRouter()
  const [phone, setphone] = useState('')
  const [name, setName] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [otpDigits, setOtpDigits] = useState<string[]>(() => Array(OTP_LENGTH).fill(''))
  const [otpError, setOtpError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSavingName, setIsSavingName] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useAppDispatch()

  const resetOtp = useCallback(() => {
    setOtpDigits(Array(OTP_LENGTH).fill(''))
    setOtpError(null)
  }, [])

  const closeOtpModal = useCallback(() => {
    setShowOtpModal(false)
    resetOtp()
  }, [resetOtp])

  const closeNameModal = useCallback(() => {
    setShowNameModal(false)
    setName('')
    setNameError(null)
  }, [])

  const redirectHome = useCallback(() => {
    router.push('/')
  }, [router])

  useEffect(() => {
    if (showOtpModal) {
      const t = window.setTimeout(() => otpInputRefs.current[0]?.focus(), 50)
      return () => window.clearTimeout(t)
    }
  }, [showOtpModal])

  useEffect(() => {
    if (showNameModal) {
      const t = window.setTimeout(() => nameInputRef.current?.focus(), 50)
      return () => window.clearTimeout(t)
    }
  }, [showNameModal])

  const checkUserExists = async (phoneNumber: string): Promise<boolean> => {
    const response = await axios.get(`http://localhost:8080/user/exist/${phoneNumber}`)
    const data = response.data
    if (typeof data === 'boolean') return data
    if (typeof data?.exists === 'boolean') return data.exists
    return Boolean(data)
  }

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
      const trimmedPhone = phone.trim()
      const exists = await checkUserExists(trimmedPhone)
      console.log("Exists: ", exists)
      closeOtpModal()
      if (exists) {
        redirectHome()
      } else {
        setShowNameModal(true)
      }
      handleGetUser();

    } catch {
      setOtpError('Verification failed. Try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError('Please enter your name')
      return
    }
    setIsSavingName(true)
    setNameError(null)
    console.log("phone", phone)
    try {
      await axios.post(`http://localhost:8080/user/create`,
        {
          name: trimmedName,
          mobile: phone
        }
      )
      closeNameModal()
      handleGetUser();
      redirectHome()
    } catch {
      setNameError('Could not save your details. Try again.')
    } finally {
      setIsSavingName(false)
    }
  }

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/get/mobile/${phone}`)

      dispatch(
        setUser({
          id: response.data.userId,
          name: response.data.name,
          mobile: response.data.mobile,
          email: response.data.email,
          addedOn: response.data.addedOn,
        })
      );
      console.log("Response: ", response.data)
    } catch {
      setNameError('Could not get your details. Try again.')
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

      {showNameModal && (
        <div
          className="otp-modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeNameModal()
          }}
        >
          <div
            className="otp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="name-modal-title"
          >
            <div className="otp-modal-header">
              <h2 id="name-modal-title" className="otp-modal-title">
                Welcome to Nanban
              </h2>
              <button type="button" className="otp-modal-close" onClick={closeNameModal} aria-label="Close">
                ×
              </button>
            </div>
            <p className="otp-modal-hint" style={{ fontSize: FONT_SIZES.small }}>
              You&apos;re a new user. Please enter your name to continue.
            </p>

            <form onSubmit={handleSaveUser}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="form-input name-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setNameError(null)
                  }}
                />
              </div>

              {nameError && (
                <div className="otp-modal-error" style={{ color: COLORS.danger }}>
                  {nameError}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary otp-modal-submit"
                style={{ backgroundColor: COLORS.primary }}
                disabled={isSavingName}
              >
                {isSavingName ? 'Saving...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showOtpModal && (
        <div
          className="otp-modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOtpModal()
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
              <button type="button" className="otp-modal-close" onClick={closeOtpModal} aria-label="Close">
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
