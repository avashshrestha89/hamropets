import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function SubmitPet() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    petName: '', breed: '', species: 'Dog', gender: 'Male',
    ageYears: '', ageMonths: '', location: 'Kathmandu',
    vaccinated: false, neutered: false, description: '',
    submitterName: '', phone: '', email: '',
    images: [], video: null,
  })

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/submit-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <>
        <Head><title>Submitted — HamroPets</title></Head>
        <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, padding: '40px' }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#000', marginBottom: 12 }}>Submission Received!</h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>
              Thank you! Your pet listing is now under review. We'll approve it within 24 hours. You'll be notified once it goes live.
            </p>
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px', border: '2px solid #000', marginBottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>✅ What happens next?</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 8, lineHeight: 1.7 }}>
                Our team reviews your photos, video and details.<br />
                Once approved, your listing goes live on HamroPets.<br />
                Interested adopters will contact you directly.
              </div>
            </div>
            <Link href="/" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>← Back to Home</Link>
          </div>
        </div>
      </>
    )
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff', fontWeight: 500 }
  const selectStyle = { ...inputStyle, cursor: 'pointer' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#000', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
      <Head>
        <title>List a Pet for Adoption — HamroPets</title>
        <meta name="description" content="List your pet for adoption on HamroPets. Free forever." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #000', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: '#000', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#58CC02', fontWeight: 800, letterSpacing: 1 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <Link href="/" style={{ color: '#666', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 28px 80px' }}>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Free Forever</span>
            <h1 style={{ fontSize: 38, fontWeight: 900, color: '#000', margin: '0 0 8px', letterSpacing: -1 }}>List a Pet for Adoption</h1>
            <p style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>Reviewed within 24 hours · Nothing goes live without your approval</p>
          </div>

          {/* STEP INDICATOR */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 36, border: '2px solid #000', borderRadius: 14, overflow: 'hidden', boxShado
