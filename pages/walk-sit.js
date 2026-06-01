import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function WalkSit() {
  const [tab, setTab] = useState('find')

  const walkers = [
    { name: 'Priya Shrestha', area: 'Lalitpur', service: 'Walking + Sitting', rate: 'NPR 300/hr', emoji: '👩', color: '#FF6B9D', rating: '4.9', jobs: 48 },
    { name: 'Rajan Tamang', area: 'Kathmandu', service: 'Dog Walking', rate: 'NPR 250/hr', emoji: '👨', color: '#38BDF8', rating: '4.8', jobs: 32 },
    { name: 'Sunita KC', area: 'Bhaktapur', service: 'Pet Sitting', rate: 'NPR 500/day', emoji: '👩', color: '#7B5EA7', rating: '5.0', jobs: 21 },
    { name: 'Bikash Rai', area: 'Boudha', service: 'Walking + Sitting', rate: 'NPR 280/hr', emoji: '👨', color: '#56C271', rating: '4.7', jobs: 15 },
    { name: 'Anita Gurung', area: 'Thamel', service: 'Pet Sitting', rate: 'NPR 450/day', emoji: '👩', color: '#FFD23F', rating: '4.9', jobs: 27 },
    { name: 'Suman Lama', area: 'Pokhara', service: 'Dog Walking', rate: 'NPR 200/hr', emoji: '👨', color: '#FF6B35', rating: '4.6', jobs: 19 },
  ]

  return (
    <>
      <Head>
        <title>Dog Walking & Pet Sitting — HamroPets</title>
        <meta name="description" content="Find trusted dog walkers and pet sitters across Nepal, or register as one." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFBF5' }}>

        {/* NAV */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '2px solid #EDE8F5', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#1A3320', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#6B7C99', fontWeight: 600, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet'], ['Advertise', '/advertise']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: label === 'Walk & Sit' ? 700 : 500, color: label === 'Walk & Sit' ? '#58CC02' : '#6B7C99', background: label === 'Walk & Sit' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>

          {/* HEADER */}
          <span style={{ background: '#E8F9ED', color: '#56C271', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>🦮 New Service</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1A3320', margin: '0 0 6px', letterSpacing: -1 }}>Dog Walking & Pet Sitting</h1>
          <p style={{ color: '#6B7C99', marginBottom: 32, fontSize: 15 }}>Find trusted walkers & sitters near you — or register as one</p>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 0, background: '#EDE8F5', borderRadius: 999, padding: 4, width: 'fit-content', marginBottom: 36 }}>
            {[['find', '🔍 Find a Walker/Sitter'], ['register', '✋ Register as Walker/Sitter']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{ padding: '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, background: tab === key ? '#56C271' : 'transparent', color: tab === key ? '#fff' : '#6B7C99', transition: 'all 0.2s' }}>{label}</button>
            ))}
          </div>

          {/* FIND TAB */}
          {tab === 'find' && (
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
                <input placeholder="📍  Your area..." style={{ flex: 1, minWidth: 160, padding: '10px 20px', borderRadius: 999, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                {['All', 'Dog Walking', 'Pet Sitting', 'Both'].map(f => (
                  <button key={f} style={{ padding: '10px 18px', borderRadius: 999, border: `2px solid ${f === 'All' ? '#56C271' : '#EDE8F5'}`, background: f === 'All' ? '#56C271' : '#fff', color: f === 'All' ? '#fff' : '#6B7C99', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>{f}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {walkers.map(w => (
                  <div key={w.name} style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                    <div style={{ height: 120, background: `linear-gradient(135deg, ${w.color}18, ${w.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>{w.emoji}</div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontWeight: 800, fontSize: 16, color: '#1A3320' }}>{w.name}</div>
                        <span style={{ fontWeight: 700, color: '#F59E0B', fontSize: 13 }}>⭐ {w.rating}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#6B7C99', marginTop: 3 }}>{w.service}</div>
                      <div style={{ fontSize: 12, color: '#A0AFCC', marginTop: 2 }}>📍 {w.area} · {w.jobs} jobs done</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                        <span style={{ fontWeight: 800, color: '#56C271', fontSize: 15 }}>{w.rate}</span>
                        <button style={{ background: '#56C271', color: '#fff', padding: '8px 20px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Book</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REGISTER TAB */}
          {tab === 'register' && (
            <div style={{ maxWidth: 560 }}>
              <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #EDE8F5', padding: '36px 40px', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#1A3320', margin: '0 0 6px' }}>Register as a Walker / Sitter</h3>
                <p style={{ color: '#6B7C99', fontSize: 14, marginBottom: 28 }}>Join Nepal's first pet walker network. Applications reviewed by our team.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    ['Full Name *', 'text', 'Your full name'],
                    ['Phone Number *', 'tel', '98XXXXXXXX'],
                    ['Your Area / Locality *', 'text', 'e.g. Lalitpur, Jhamsikhel'],
                    ['Email Address', 'email', 'your@email.com'],
                  ].map(([label, type, placeholder]) => (
                    <div key={label}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#1A3320', display: 'block', marginBottom: 6 }}>{label}</label>
                      <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#1A3320', display: 'block', marginBottom: 8 }}>Services you offer</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {['🦮 Dog Walking', '🛋️ Pet Sitting', 'Both'].map(s => (
                        <button key={s} style={{ flex: 1, padding: '10px', borderRadius: 12, border: '2px solid #EDE8F5', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', color: '#1A3320' }}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#1A3320', display: 'block', marginBottom: 6 }}>Why are you a good fit?</label>
                    <textarea rows={3} placeholder="Tell us about your experience with pets..." style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#92400E', border: '1px solid #FFD23F50' }}>
                    📋 All candidates reviewed before listing. We will contact you within 3–5 business days.
                  </div>
                  <button style={{ background: '#56C271', color: '#fff', padding: '14px', borderRadius: 999, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(86,194,113,0.3)' }}>
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
