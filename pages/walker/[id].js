import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function BookingForm({ walker, isMobile }) {
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    clientName: '', clientPhone: '', service: walker.services || '', preferredDate: '', petDetails: '', message: ''
  })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))
  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }

  const handleSubmit = async () => {
    if (!form.clientName || !form.clientPhone) {
      alert('Please fill in your name and phone number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/book-walker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walkerId: walker.id,
          walkerName: walker.full_name,
          ...form,
        }),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')
    } catch (err) {
      alert('Something went wrong.')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '24px', border: '2px solid #1A1A1A', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
        <div style={{ fontWeight: 900, fontSize: 18, color: '#1A1A1A', marginBottom: 6 }}>Inquiry Sent!</div>
        <div style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>HamroPets will contact you within a few hours to confirm your booking with {walker.full_name}.</div>
      </div>
    )
  }

  if (!showForm) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={() => setShowForm(true)} style={{ background: '#38BDF8', color: '#fff', padding: isMobile ? '14px' : '16px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', boxShadow: '3px 3px 0px #1A1A1A', display: 'block', width: '100%' }}>
          📅 Book {walker.full_name}
        </button>
        <div style={{ background: '#F0F8FF', borderRadius: 12, padding: '12px 16px', border: '1.5px solid #38BDF8', fontSize: 13, color: '#1A1A1A', fontWeight: 600, textAlign: 'center' }}>
          HamroPets will connect you after confirming availability 🐾
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F0F8FF', borderRadius: 16, border: '2px solid #38BDF8', padding: isMobile ? '20px 16px' : '24px' }}>
      <div style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A', marginBottom: 16 }}>📅 Book {walker.full_name}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Your Name *</div>
          <input value={form.clientName} onChange={e => update('clientName', e.target.value)} placeholder="Your full name" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Your Phone *</div>
          <input type="tel" value={form.clientPhone} onChange={e => update('clientPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Service Needed *</div>
          <select value={form.service} onChange={e => update('service', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Select service</option>
            <option value="Dog Walking — NPR 300-400/walk">🦮 Dog Walking (NPR 300-400/walk)</option>
<option value="Dog Walking Monthly — NPR 5,000-6,500/month">📅 Dog Walking Monthly Package (NPR 5,000-6,500/mo)</option>
<option value="Day Care 9-5 — NPR 700/day">🏡 Day Care 9-5 (NPR 700/day)</option>
<option value="Day Care Monthly — NPR 12,000-15,000/month">📅 Day Care Monthly Package (NPR 12,000-15,000/mo)</option>
<option value="Overnight Sitting — NPR 1,500-2,000/night">🌙 Overnight Sitting (NPR 1,500-2,000/night)</option>
          </select>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Preferred Date</div>
          <input type="date" value={form.preferredDate} onChange={e => update('preferredDate', e.target.value)} style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Pet Details</div>
          <input value={form.petDetails} onChange={e => update('petDetails', e.target.value)} placeholder="e.g. Golden Retriever, 2 years old, friendly" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: 5 }}>Message</div>
          <textarea rows={3} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Any special requirements or questions..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, background: '#38BDF8', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Sending...' : '📅 Send Booking Request'}
          </button>
          <button onClick={() => setShowForm(false)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
        </div>
        <div style={{ background: '#FFFBDE', borderRadius: 10, padding: '10px 14px', border: '1.5px solid #FFD23F', fontSize: 12, color: '#92400E', fontWeight: 600 }}>
          ⚠️ HamroPets will contact you to confirm availability and arrange payment before connecting you with {walker.full_name}.
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const { data, error } = await supabase
    .from('walker_applications')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()
  if (error || !data) return { notFound: true }
  return { props: { walker: data } }
}

export default function WalkerProfile({ walker }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const isSitter = walker.services?.includes('Sitting')
  const color = isSitter ? '#FF6B9D' : '#38BDF8'
  const emoji = isSitter ? '🛋️' : '🦮'

  return (
    <>
      <Head>
        <title>{walker.full_name} — HamroPets Walker/Sitter</title>
        <meta name="description" content={`${walker.full_name} is a verified pet walker/sitter in ${walker.city || walker.area}, Nepal.`} />
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
            <Link href="/walk-sit" style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '7px 14px' : '9px 20px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: isMobile ? 12 : 14, fontWeight: 800, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>← All Walkers</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 28px' }}>

          {/* PROFILE CARD */}
          <div style={{ background: '#fff', borderRadius: 24, border: '3px solid #1A1A1A', boxShadow: '6px 6px 0px #1A1A1A', overflow: 'hidden', marginBottom: 24 }}>

            {/* HEADER */}
            <div style={{ height: isMobile ? 120 : 160, background: `linear-gradient(135deg, ${color}25, ${color}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 60 : 80, position: 'relative', borderBottom: '3px solid #1A1A1A' }}>
              {emoji}
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#58CC02', color: '#fff', fontSize: isMobile ? 11 : 13, fontWeight: 900, padding: '4px 12px', borderRadius: 999, border: '2px solid #1A1A1A' }}>
                🇳🇵 ID Verified
              </div>
              <div style={{ position: 'absolute', top: 16, right: 16, background: '#FFD23F', color: '#1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 900, padding: '4px 12px', borderRadius: 999, border: '2px solid #1A1A1A' }}>
                ✅ Available
              </div>
            </div>

            <div style={{ padding: isMobile ? '20px 16px' : '32px' }}>

              {/* NAME & SERVICE */}
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>{walker.full_name}</h1>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: color, color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{walker.services === 'Both' ? '🦮 Dog Walking & 🛋️ Pet Sitting' : walker.services}</span>
                  <span style={{ background: '#F0F8FF', color: '#1A1A1A', padding: '4px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, border: '1.5px solid #1A1A1A' }}>📍 {walker.city || walker.area}{walker.locality ? ` · ${walker.locality}` : ''}</span>
                </div>
              </div>

              {/* INFO GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 10 : 14, marginBottom: 24 }}>
                {[
                  ['📍 City', walker.city || walker.area, '#FFF9E6'],
                  ['🏘️ Locality', walker.locality || 'Not specified', '#F0F8FF'],
                  ['💰 Dog Walking', 'NPR 300-400/walk · NPR 5,000-6,500/month', '#E8F9ED'],
['🏡 Day Care (9-5)', 'NPR 700/day · NPR 12,000-15,000/month', '#FFF9E6'],
['🌙 Overnight Sitting', 'NPR 1,500-2,000/night', '#F0F8FF'],
                  ['🇳🇵 ID Verified', 'ID  App', '#E8F9ED'],
                  ['⏰ Availability', 'Flexible Hours', '#FFF0F6'],
                  ['📞 Response', 'Within 2 hours', '#FFFBDE'],
                ].map(([k, v, bg]) => (
                  <div key={k} style={{ background: bg, borderRadius: 12, padding: isMobile ? '10px 12px' : '14px 16px', border: '1.5px solid #E5E7EB' }}>
                    <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#1A1A1A' }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* ABOUT */}
              {walker.experience && (
                <div style={{ background: '#FAFAFA', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #E5E7EB', marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>About {walker.full_name}</div>
                  <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.75, fontWeight: 500 }}>{walker.experience}</p>
                </div>
              )}

              {/* WHAT I OFFER */}
              <div style={{ background: '#E8F9ED', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #58CC02', marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>What I Offer</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    walker.services?.includes('Walking') || walker.services === 'Both' ? '🦮 Daily dog walks in your neighbourhood' : null,
                    walker.services?.includes('Sitting') || walker.services === 'Both' ? '🛋️ In-home pet sitting while you travel' : null,
                    '📸 Photo updates of your pet during sessions',
                    '🪪 Government ID verified via Citizenship Card',
                    '⏰ Flexible scheduling around your needs',
                    '❤️ Genuine love and care for animals',
                  ].filter(Boolean).map((item, i) => (
                    <div key={i} style={{ fontSize: isMobile ? 14 : 15, color: '#374151', fontWeight: 500 }}>{item}</div>
                  ))}
                </div>
              </div>

              {/* TRUST BADGE */}
              <div style={{ background: '#FFF9E6', borderRadius: 14, padding: isMobile ? '14px' : '18px 20px', border: '1.5px solid #FFD23F', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>🇳🇵</span>
                <div>
<div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 14, color: '#1A1A1A', marginBottom: 3 }}>Identity Verified via Citizenship Card</div>
<div style={{ fontSize: isMobile ? 12 : 13, color: '#6B7280', fontWeight: 500 }}>This walker's identity has been verified using their Nepal Government issued Citizenship Card before being listed on HamroPets.</div>
                </div>
              </div>

              {/* BOOKING FORM */}
              <BookingForm walker={walker} isMobile={isMobile} />

            </div>
          </div>

          {/* BACK */}
          <Link href="/walk-sit" style={{ background: '#fff', color: '#1A1A1A', padding: '11px 22px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>← Back to All Walkers</Link>

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
