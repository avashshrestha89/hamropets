import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function WalkSit() {
  const [isMobile, setIsMobile] = useState(false)
  const [tab, setTab] = useState('find')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '', phone: '', area: '', email: '', services: '🦮 Dog Walking', experience: ''
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.area) {
      alert('Please fill in your name, phone and area.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/apply-walker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const walkers = [
    { name: 'Priya Shrestha', area: 'Lalitpur', service: 'Walking + Sitting', rate: 'NPR 300/hr', emoji: '👩', color: '#FF6B9D', rating: '4.9', jobs: 48 },
    { name: 'Rajan Tamang', area: 'Kathmandu', service: 'Dog Walking', rate: 'NPR 250/hr', emoji: '👨', color: '#38BDF8', rating: '4.8', jobs: 32 },
    { name: 'Sunita KC', area: 'Bhaktapur', service: 'Pet Sitting', rate: 'NPR 500/day', emoji: '👩', color: '#7B5EA7', rating: '5.0', jobs: 21 },
    { name: 'Bikash Rai', area: 'Boudha', service: 'Walking + Sitting', rate: 'NPR 280/hr', emoji: '👨', color: '#58CC02', rating: '4.7', jobs: 15 },
  ]

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
      <Head>
        <title>Dog Walking & Pet Sitting — HamroPets</title>
        <meta name="description" content="Find trusted dog walkers and pet sitters across Nepal, or register as one." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden', maxWidth: '100vw' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 22, border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', flexShrink: 0 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 2 }}>
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Walk & Sit' ? 800 : 600, color: label === 'Walk & Sit' ? '#58CC02' : '#1A1A1A', background: label === 'Walk & Sit' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            )}
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', whiteSpace: 'nowrap' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* MOBILE NAV */}
        {isMobile && (
          <div style={{ background: '#FFFFFF', borderBottom: '2px solid #1A1A1A', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'Walk & Sit' ? 800 : 600, color: label === 'Walk & Sit' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'Walk & Sit' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '28px 16px' : '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🦮 New Service</span>
          <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -1 }}>Dog Walking & Pet Sitting</h1>
          <p style={{ color: '#6B7280', marginBottom: 28, fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>Find trusted walkers & sitters near you — or register as one</p>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 0, background: '#F3F4F6', borderRadius: 999, padding: 4, width: '100%', maxWidth: isMobile ? '100%' : 'fit-content', marginBottom: 28, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', boxSizing: 'border-box' }}>
            {[['find', '🔍 Find a Walker/Sitter'], ['register', '✋ Register as Walker/Sitter']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: isMobile ? '10px 12px' : '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: isMobile ? 12 : 14, background: tab === key ? '#58CC02' : 'transparent', color: tab === key ? '#fff' : '#888', transition: 'all 0.2s', textAlign: 'center', lineHeight: 1.3 }}>{label}</button>
            ))}
          </div>

          {/* FIND TAB */}
          {tab === 'find' && (
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <input placeholder="📍  Your area..." style={{ flex: 1, minWidth: 140, padding: '10px 16px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxShadow: '2px 2px 0px #1A1A1A' }} />
                {['All', 'Dog Walking', 'Pet Sitting', 'Both'].map(f => (
                  <button key={f} style={{ padding: isMobile ? '8px 12px' : '10px 18px', borderRadius: 999, border: '2px solid #1A1A1A', background: f === 'All' ? '#58CC02' : '#fff', color: f === 'All' ? '#fff' : '#666', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>{f}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>

                {/* WALKER CARDS */}
                {walkers.map(w => (
                  <div key={w.name} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                    <div style={{ height: isMobile ? 90 : 120, background: `linear-gradient(135deg, ${w.color}18, ${w.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 56, borderBottom: '2px solid #1A1A1A' }}>{w.emoji}</div>
                    <div style={{ padding: isMobile ? '12px' : '18px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 4 }}>
                        <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', lineHeight: 1.2 }}>{w.name}</div>
                        <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: isMobile ? 11 : 13, flexShrink: 0 }}>⭐ {w.rating}</span>
                      </div>
                      <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 600 }}>{w.service}</div>
                      <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 2, fontWeight: 500 }}>📍 {w.area} · {w.jobs} jobs</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontWeight: 900, color: '#58CC02', fontSize: isMobile ? 13 : 15 }}>{w.rate}</span>
                        <button style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '6px 12px' : '8px 20px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #166534', whiteSpace: 'nowrap' }}>Book</button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CTA 1 — BECOME A PET SITTER */}
                <button onClick={() => setTab('register')} style={{ background: '#FFFFFF', borderRadius: 16, border: '2.5px dashed #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 12px' : '24px 16px', textAlign: 'center', minHeight: isMobile ? 180 : 220, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: '#FFF0F6', border: '2.5px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10, boxShadow: '3px 3px 0px #1A1A1A' }}>🛋️</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A', marginBottom: 6 }}>Become a Pet Sitter</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 500, marginBottom: 14, lineHeight: 1.4 }}>Earn money caring for pets in your home</div>
                  <div style={{ background: '#FF6B9D', color: '#fff', padding: '7px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 12, fontWeight: 800, boxShadow: '2px 2px 0px #1A1A1A' }}>Apply Now →</div>
                </button>

                {/* CTA 2 — BECOME A DOG WALKER */}
                <button onClick={() => setTab('register')} style={{ background: '#FFFFFF', borderRadius: 16, border: '2.5px dashed #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 12px' : '24px 16px', textAlign: 'center', minHeight: isMobile ? 180 : 220, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: '#E8F9ED', border: '2.5px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10, boxShadow: '3px 3px 0px #1A1A1A' }}>🦮</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A', marginBottom: 6 }}>Become a Dog Walker</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 500, marginBottom: 14, lineHeight: 1.4 }}>Earn NPR 200-400/hr walking dogs near you</div>
                  <div style={{ background: '#58CC02', color: '#fff', padding: '7px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 12, fontWeight: 800, boxShadow: '2px 2px 0px #166534' }}>Apply Now →</div>
                </button>

              </div>
            </div>
          )}

          {/* REGISTER TAB */}
          {tab === 'register' && (
            <div style={{ maxWidth: 560 }}>
              {submitted ? (
                <div style={{ background: '#E8F9ED', borderRadius: 24, padding: isMobile ? '32px 20px' : '48px', border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>Application Submitted!</h3>
                  <p style={{ color: '#6B7280', fontSize: 15, fontWeight: 500, marginBottom: 24 }}>We'll review your application and contact you within 3–5 business days.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ fullName: '', phone: '', area: '', email: '', services: '🦮 Dog Walking', experience: '' }) }} style={{ background: '#58CC02', color: '#fff', padding: '12px 28px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>Submit Another</button>
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: 24, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '36px 40px', boxShadow: '5px 5px 0px #1A1A1A' }}>
                  <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px' }}>Register as a Walker / Sitter</h3>
                  <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24, fontWeight: 500 }}>Join Nepal's first pet walker network. Applications reviewed by our team.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your full name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number *</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Your Area / Locality *</label>
                      <input value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. Lalitpur, Jhamsikhel" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Services you offer *</label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['🦮 Dog Walking', '🛋️ Pet Sitting', 'Both'].map(s => (
                          <button key={s} onClick={() => update('services', s)} style={{ flex: 1, padding: '11px 8px', borderRadius: 12, border: `2px solid ${form.services === s ? '#1A1A1A' : '#E5E7EB'}`, background: form.services === s ? '#58CC02' : '#fff', color: form.services === s ? '#fff' : '#666', cursor: 'pointer', fontSize: isMobile ? 11 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: form.services === s ? '2px 2px 0px #166634' : 'none' }}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Why are you a good fit?</label>
                      <textarea rows={3} value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Tell us about your experience with pets..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                    </div>
                    <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#92400E', fontWeight: 600, border: '1.5px solid #FFD23F' }}>
                      📋 All candidates reviewed before listing. We will contact you within 3–5 business days.
                    </div>
                    <button onClick={handleSubmit} disabled={submitting} style={{ background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', marginTop: isMobile ? 48 : 64, padding: isMobile ? '24px 16px' : '32px 28px', borderTop: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
