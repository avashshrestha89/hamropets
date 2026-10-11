import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Collaborate() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', industry: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/collaborate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', organization: '', industry: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>Collaborate with Avash — HamroPets</title>
        <meta name="description" content="Have an idea or business opportunity? Connect with Avash Shrestha, founder of HamroPets and Adopt a Dog Nepal." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '48px 16px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>

          {/* Back */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1A1A1A', fontWeight: 700, fontSize: 13, textDecoration: 'none', marginBottom: 28 }}>
            ← Back to HamroPets
          </Link>

          {/* Header */}
          <div style={{ background: '#1A1A1A', borderRadius: 20, padding: '32px', marginBottom: 24, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #555' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', border: '2.5px solid #FFD23F', flexShrink: 0 }}>
                <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/Remove_airbud_from_ear_20261011220355.jpg" alt="Avash Shrestha" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div>
                <h1 style={{ margin: 0, color: '#FFD23F', fontSize: 22, fontWeight: 900 }}>Let's Collaborate</h1>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 }}>Avash Shrestha · Founder, HamroPets</p>
              </div>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7, fontWeight: 500 }}>
              If you have an idea, a business plan, or just want to explore something together — in any industry — fill out this form. No pitch decks required.
            </p>
          </div>

          {/* Form */}
          {status === 'success' ? (
            <div style={{ background: '#fff', border: '3px solid #58CC02', borderRadius: 20, padding: 40, textAlign: 'center', boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🙌</div>
              <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 900, color: '#1A1A1A' }}>Message received!</h2>
              <p style={{ margin: '0 0 24px', color: '#555', fontSize: 15, lineHeight: 1.6 }}>Avash will get back to you soon. Great ideas don't have boundaries.</p>
              <Link href="/" style={{ display: 'inline-block', background: '#1A1A1A', color: '#FFD23F', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none' }}>← Back to HamroPets</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#fff', border: '3px solid #1A1A1A', borderRadius: 20, padding: '32px', boxShadow: '5px 5px 0px #1A1A1A' }}>
              {[
                { label: 'Your Name *', key: 'name', type: 'text', required: true, placeholder: 'Full name' },
                { label: 'Email *', key: 'email', type: 'email', required: true, placeholder: 'you@example.com' },
                { label: 'Organization / Company', key: 'organization', type: 'text', required: false, placeholder: 'Optional' },
                { label: 'Industry / Niche', key: 'industry', type: 'text', required: false, placeholder: 'e.g. Fintech, EdTech, Food, Real Estate...' },
              ].map(({ label, key, type, required, placeholder }) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: 13, color: '#1A1A1A', marginBottom: 6 }}>{label}</label>
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid #1A1A1A', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 800, fontSize: 13, color: '#1A1A1A', marginBottom: 6 }}>What's on your mind? *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell Avash about your idea, what you're building, or what you'd like to explore together..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ width: '100%', padding: '11px 14px', border: '2px solid #1A1A1A', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#FF3B30', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Something went wrong. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: '#1A1A1A', color: '#FFD23F', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 900, border: '2px solid #1A1A1A', cursor: status === 'loading' ? 'wait' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #555' }}>
                {status === 'loading' ? 'Sending...' : '💬 Send Message →'}
              </button>
            </form>
          )}

        </div>
      </div>
    </>
  )
}
