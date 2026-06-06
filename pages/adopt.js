import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps({ query }) {
  const { species, location } = query
  let supabaseQuery = supabase
    .from('pet_listings')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (species && species !== 'All') {
    supabaseQuery = supabaseQuery.ilike('species', species.slice(0, -1))
  }
  if (location && location !== 'All Nepal') {
    supabaseQuery = supabaseQuery.eq('location', location)
  }
  const { data } = await supabaseQuery
  return { props: { pets: data || [] } }
}

export default function Adopt({ pets }) {
  const [isMobile, setIsMobile] = useState(false)
  const [species, setSpecies] = useState('All')
  const [location, setLocation] = useState('All')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }
  const speciesColor = { dog: '#FF6B35', cat: '#7B5EA7', bird: '#38BDF8', rabbit: '#FF6B9D', other: '#58CC02' }

  const filtered = pets.filter(p => {
    const speciesMatch = species === 'All' || p.species.toLowerCase() === species.toLowerCase().replace('s', '')
    const locationMatch = location === 'All' || p.location === location
    return speciesMatch && locationMatch
  })

  return (
    <>
      <Head>
        <title>Adopt a Pet — HamroPets</title>
        <meta name="description" content="Browse pets available for adoption across Nepal. Always free." />
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
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Adopt' ? 800 : 600, color: label === 'Adopt' ? '#58CC02' : '#1A1A1A', background: label === 'Adopt' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
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
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'Adopt' ? 800 : 600, color: label === 'Adopt' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'Adopt' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '28px 16px' : '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🐾 Adopt</span>
          <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -1 }}>Find Your Pet</h1>
          <p style={{ color: '#6B7280', marginBottom: 24, fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>All listings reviewed · Adoption is always free · Updated daily</p>

          {/* FILTERS */}
          <div style={{ background: '#fff', borderRadius: 16, padding: isMobile ? '16px' : '20px 24px', border: '2px solid #1A1A1A', marginBottom: 24, boxShadow: '3px 3px 0px #1A1A1A' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>Species:</span>
                {['All', 'Dogs', 'Cats', 'Birds'].map(s => (
                  <button key={s} onClick={() => setSpecies(s)} style={{ padding: isMobile ? '7px 14px' : '8px 18px', borderRadius: 999, border: `2px solid ${species === s ? '#1A1A1A' : '#E5E7EB'}`, background: species === s ? '#1A1A1A' : '#fff', color: species === s ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 800, fontFamily: 'inherit' }}>{s}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>📍 Area:</span>
                {['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(l => (
                  <button key={l} onClick={() => setLocation(l)} style={{ padding: isMobile ? '7px 12px' : '8px 16px', borderRadius: 999, border: `2px solid ${location === l ? '#58CC02' : '#E5E7EB'}`, background: location === l ? '#58CC02' : '#fff', color: location === l ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit' }}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}
          <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 14, marginBottom: 20, fontWeight: 600 }}>
            Showing <strong style={{ color: '#1A1A1A' }}>{filtered.length} pet{filtered.length !== 1 ? 's' : ''}</strong> available for adoption
          </p>

          {/* PET GRID */}
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
              {filtered.map(pet => {
                const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
                const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
                const age = [pet.age_years > 0 ? `${pet.age_years}y` : '', pet.age_months > 0 ? `${pet.age_months}m` : ''].filter(Boolean).join(' ') || '?'
                return (
                  <Link key={pet.id} href={`/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                      <div style={{ height: isMobile ? 120 : 175, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 52 : 76, position: 'relative', borderBottom: '2px solid #1A1A1A' }}>
                        {pet.images && pet.images.length > 0 ? (
                          <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : emoji}
                        <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', color: '#1A1A1A', borderRadius: 999, fontSize: 10, fontWeight: 900, padding: '3px 8px', border: '1.5px solid #1A1A1A' }}>
                          {pet.vaccinated ? '💉 Vaccinated' : pet.neutered ? '✂️ Neutered' : `🐾 ${pet.species}`}
                        </div>
                      </div>
                      <div style={{ padding: isMobile ? '10px 12px' : '16px 18px' }}>
                        <div style={{ fontWeight: 900, fontSize: isMobile ? 15 : 20, color: '#1A1A1A' }}>{pet.pet_name}</div>
                        <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 13, marginTop: 2, fontWeight: 600, textTransform: 'capitalize' }}>
                          {pet.breed || pet.species} · {age}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>
                          <span style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 700 }}>📍 {pet.location}</span>
                          <span style={{ background: '#58CC02', color: '#fff', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>FREE</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: isMobile ? '48px 16px' : '80px 20px' }}>
              <div style={{ fontSize: isMobile ? 48 : 64, marginBottom: 16 }}>🐾</div>
              <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>No pets found</div>
              <div style={{ color: '#6B7280', fontSize: isMobile ? 14 : 15, fontWeight: 500, marginBottom: 28 }}>Try changing your filters or check back soon</div>
              <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '13px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', display: 'inline-block' }}>+ Submit a Pet for Adoption</Link>
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
