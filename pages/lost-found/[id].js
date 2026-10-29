import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import ShareBar from '../../components/ShareBar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps({ params }) {
  const { data: item } = await supabase
    .from('lost_found')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!item) return { notFound: true }
  return { props: { item } }
}

export default function LostFoundDetail({ item }) {
  const [isMobile, setIsMobile] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0) // <--- ADD THIS LINE

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const isLost = item.type === 'lost'
  const color = isLost ? '#FF6B9D' : '#58CC02'
  const label = isLost ? '🔴 LOST' : '🟢 FOUND'

  return (
    <>
      <Head>
        <title>{item.pet_name || 'Unknown Pet'} — {isLost ? 'Lost' : 'Found'} Pet | HamroPets</title>
        <meta name="description" content={`${isLost ? 'Lost' : 'Found'} pet report for ${item.pet_name || 'Unknown'} in ${item.area}. Help reunite this pet with their family.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${item.pet_name || 'Unknown'} — ${isLost ? 'Lost' : 'Found'} Pet | HamroPets`} />
        <meta property="og:description" content={`${item.description} — Last seen in ${item.area}`} />
        {item.image_url && <meta property="og:image" content={item.image_url} />}
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 22, border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <Link href="/lost-found" style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '8px 14px' : '10px 20px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 700, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>← All Reports</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 28px' }}>

          {/* MAIN CARD */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', overflow: 'hidden', boxShadow: '6px 6px 0px #1A1A1A', marginBottom: 24 }}>

      {/* PHOTO */}
            <div>
              <div style={{ position: 'relative', height: isMobile ? 260 : 380, background: isLost ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '3px solid #1A1A1A' }}>
                {(item.images && item.images.length > 0) || item.image_url ? (
                  <img src={(item.images && item.images.length > 0) ? item.images[activePhoto] : item.image_url} alt={item.pet_name || 'Pet'} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} />
                ) : (
                  <div style={{ fontSize: 80 }}>
                    {item.species === 'Dog' ? '🐕' : item.species === 'Cat' ? '🐈' : item.species === 'Bird' ? '🐦' : '🐾'}
                  </div>
                )}
                <div style={{ position: 'absolute', top: 16, left: 16, background: color, color: '#fff', fontSize: 13, fontWeight: 900, padding: '6px 14px', borderRadius: 999, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>
                  {label}
                </div>
                <div style={{ position: 'absolute', top: 16, right: 16, background: '#fff', color: '#6B7280', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999, border: '2px solid #1A1A1A' }}>
                  🕐 {new Date(item.created_at).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              {/* ADDITIONAL PHOTOS */}
              {item.images && item.images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: '#F9FAFB', borderBottom: '2px solid #E5E7EB', overflowX: 'auto' }}>
                  {item.images.map((url, i) => (
                    <img 
                      key={i} 
                      src={url} 
                      alt={`photo ${i + 1}`} 
                      onClick={() => setActivePhoto(i)}
                      style={{ 
                        width: 72, height: 72, objectFit: 'cover', borderRadius: 10, flexShrink: 0, cursor: 'pointer',
                        border: i === activePhoto ? '3px solid #1A1A1A' : '2px solid #E5E7EB',
                        opacity: i === activePhoto ? 1 : 0.6
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div style={{ padding: isMobile ? '20px 16px' : '28px 32px' }}>
              <h1 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -0.5 }}>
                {item.pet_name || 'Unknown Pet'}
              </h1>
              <div style={{ fontSize: isMobile ? 13 : 15, color: '#6B7280', fontWeight: 600, marginBottom: 20 }}>
                {item.species && `${item.species} · `}📍 {item.area}
              </div>

              {/* INFO GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  ['📋 Type', item.type === 'lost' ? 'Lost Pet' : 'Found Pet'],
                  ['🐾 Species', item.species || 'Unknown'],
                  ['📍 Area', item.area],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: '#F9FAFB', borderRadius: 12, padding: '12px 14px', border: '1.5px solid #E5E7EB' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: '#1A1A1A' }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* DESCRIPTION */}
              <div style={{ background: '#F9FAFB', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #E5E7EB', marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>📝 Description</div>
                <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.75, fontWeight: 500 }}>{item.description}</p>
              </div>

              {/* CONTACT BUTTONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`tel:${item.contact_phone}`} style={{ display: 'block', background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, textAlign: 'center', textDecoration: 'none', boxShadow: '4px 4px 0px #166534' }}>
                  📞 Call {item.contact_name} — {item.contact_phone}
                </a>
                <a href={`https://wa.me/977${item.contact_phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ display: 'block', background: '#25D366', color: '#fff', padding: '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, textAlign: 'center', textDecoration: 'none', boxShadow: '4px 4px 0px #166534' }}>
                  💬 WhatsApp {item.contact_name}
                </a>
                <button onClick={() => {
                  const text = `${isLost ? '🔴 LOST PET' : '🟢 FOUND PET'}: ${item.pet_name || 'Unknown'} in ${item.area}. ${item.description}. Contact: ${item.contact_name} — ${item.contact_phone}. View on HamroPets: ${window.location.href}`
                  if (navigator.share) {
                    navigator.share({ title: `${isLost ? 'Lost' : 'Found'} Pet — ${item.pet_name}`, text, url: window.location.href })
                  } else {
                    navigator.clipboard.writeText(text)
                    alert('Report copied! Share it on Facebook or WhatsApp groups to help find this pet.')
                  }
                }} style={{ background: '#1877F2', color: '#fff', padding: '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, textAlign: 'center', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '4px 4px 0px #1A1A1A' }}>
                  📤 Share in WhatsApp & Facebook Groups
                </button>
              </div>

              <ShareBar
                isMobile={isMobile}
                path={`/lost-found/${item.id}`}
                title={`${isLost ? 'Lost' : 'Found'} pet: ${item.pet_name || 'Unknown'}`}
                text={`${isLost ? '🔴 LOST' : '🟢 FOUND'} ${item.species || 'pet'}${item.pet_name ? ` "${item.pet_name}"` : ''} in ${item.area}. Please share to help:`}
                heading={isLost ? '📣 Share to help bring them home' : '📣 Share to find the owner'}
                card={{
                  image: (item.images && item.images[activePhoto]) || (item.images && item.images[0]) || item.image_url,
                  emoji: item.species === 'Cat' ? '🐈' : item.species === 'Dog' ? '🐕' : '🐾',
                  color,
                  badge: isLost ? '🔴 LOST PET' : '🟢 FOUND PET',
                  title: item.pet_name || (isLost ? 'Lost pet' : 'Found pet'),
                  subtitle: [item.breed || item.species, item.area].filter(Boolean).join(' · '),
                  cta: isLost ? 'Please share. Help find them.' : 'Know this pet? Contact HamroPets.com',
                }}
              />

              {/* SAFETY NOTE */}
              <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #FFD23F', marginTop: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E' }}>⚠️ Safety Reminder</div>
                <div style={{ fontSize: 12, color: '#92400E', marginTop: 4, lineHeight: 1.6 }}>Always meet in a public place when returning a found pet. HamroPets never charges any fee for lost & found reports.</div>
              </div>
            </div>
          </div>

          {/* BACK BUTTON */}
          <Link href="/lost-found" style={{ display: 'inline-block', background: '#fff', color: '#1A1A1A', padding: '12px 24px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A' }}>
            ← Back to All Reports
          </Link>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', marginTop: isMobile ? 48 : 64, padding: isMobile ? '24px 16px' : '32px 28px', borderTop: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
