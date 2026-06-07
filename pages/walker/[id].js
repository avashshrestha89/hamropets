import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

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
  const isBoth = walker.services?.includes('Both') || (walker.services?.includes('Walking') && walker.services?.includes('Sitting'))
  const color = isSitter ? '#FF6B9D' : '#38BDF8'
  const emoji = isSitter ? '🛋️' : '🦮'

  return (
    <>
      <Head>
        <title>{walker.full_name} — HamroPets Walker/Sitter</title>
        <meta name="description" content={`${walker.full_name} is a verified pet walker/sitter in ${walker.area}, Nepal.`} />
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
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#58CC02', color: '#fff', fontSize: isMobile ? 11 : 13, fontWeight: 900, padding: '4px 12px', borderRadius: 999, border: '2px solid #1A1A1A', display: 'flex', alignItems: 'center', gap: 6 }}>
                🇳🇵 Nagarik Verified
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
                  <span style={{ background: color, color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 13, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{walker.services}</span>
                  <span style={{ background: '#F0F8FF', color: '#1A1A1A', padding: '4px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, border: '1.5px solid #1A1A1A' }}>📍 {walker.area}</span>
                </div>
              </div>

              {/* INFO GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 10 : 14, marginBottom: 24 }}>
                {[
                 ['📍 City', walker.city || walker.area, '#FFF9E6'],
['🏘️ Locality', walker.locality || 'Not specified', '#F0F8FF'],
                  ['🦮 Services', walker.services, '#E8F9ED'],
                  ['💰 Rate', walker.services?.includes('Sitting') ? 'NPR 400/session' : 'NPR 300/walk', '#F0F8FF'],
                  ['🇳🇵 ID Verified', 'Nagarik App', '#E8F9ED'],
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
                    walker.services?.includes('Walking') || walker.services?.includes('Both') ? '🦮 Daily dog walks in your neighbourhood' : null,
                    walker.services?.includes('Sitting') || walker.services?.includes('Both') ? '🛋️ In-home pet sitting while you travel' : null,
                    '📸 Photo updates of your pet during sessions',
                    '🇳🇵 Government ID verified via Nagarik App',
                    '⏰ Flexible scheduling around your needs',
                    '❤️ Genuine love and care for animals',
                  ].filter(Boolean).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: isMobile ? 14 : 15 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRUST BADGE */}
              <div style={{ background: '#FFF9E6', borderRadius: 14, padding: isMobile ? '14px' : '18px 20px', border: '1.5px solid #FFD23F', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>🇳🇵</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 14, color: '#1A1A1A', marginBottom: 3 }}>Identity Verified via Nagarik App</div>
                  <div style={{ fontSize: isMobile ? 12 : 13, color: '#6B7280', fontWeight: 500 }}>This walker's identity has been verified using Nepal Government's official Nagarik App before being listed on HamroPets.</div>
                </div>
              </div>

              {/* CONTACT BUTTONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`https://wa.me/977${walker.phone?.replace(/^0/, '').replace(/^\+977/, '')}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: isMobile ? '14px' : '16px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #1A1A1A', display: 'block' }}>
                  💬 WhatsApp {walker.full_name}
                </a>
                <a href={`tel:${walker.phone}`} style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '13px' : '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 14 : 15, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #1A1A1A', display: 'block' }}>
                  📞 Call {walker.phone}
                </a>
              </div>

              {/* DISCLAIMER */}
              <div style={{ marginTop: 16, background: '#FFFBDE', borderRadius: 12, padding: '12px 16px', border: '1.5px solid #FFD23F', fontSize: isMobile ? 12 : 13, color: '#92400E', fontWeight: 600 }}>
                ⚠️ HamroPets connects you with verified walkers. Always meet in a public place first and agree on terms before booking.
              </div>

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
