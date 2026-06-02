import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
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

  const { data, error } = await supabaseQuery

  return {
    props: {
      pets: data || [],
    }
  }
}

export default function Adopt({ pets }) {
  const [species, setSpecies] = useState('All')
  const [location, setLocation] = useState('All')

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
            <div style={{ display: 'flex', gap: 2 }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Adopt' ? 800 : 600, color: label === 'Adopt' ? '#58CC02' : '#1A1A1A', background: label === 'Adopt' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Adopt</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#000', margin: '0 0 6px', letterSpacing: -1 }}>Find Your Pet</h1>
          <p style={{ color: '#666', marginBottom: 32, fontSize: 15, fontWeight: 500 }}>All listings reviewed · Adoption is always free · Updated daily</p>

          {/* FILTERS */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '20px 24px', border: '2px solid #000', marginBottom: 32, boxShadow: '3px 3px 0px #000' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['All', 'Dogs', 'Cats', 'Birds'].map(s => (
                  <button key={s} onClick={() => setSpecies(s)} style={{ padding: '8px 18px', borderRadius: 999, border: `2px solid ${species === s ? '#000' : '#E5E7EB'}`, background: species === s ? '#000' : '#fff', color: species === s ? '#fff' : '#666', cursor: 'pointer', fontSize: 13, fontWeight: 800, fontFamily: 'inherit' }}>{s}</button>
                ))}
              </div>
              <div style={{ width: 2, height: 28, background: '#E5E7EB' }} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(l => (
                  <button key={l} onClick={() => setLocation(l)} style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${location === l ? '#58CC02' : '#E5E7EB'}`, background: location === l ? '#58CC02' : '#fff', color: location === l ? '#fff' : '#666', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>📍 {l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}
          <p style={{ color: '#666', fontSize: 14, marginBottom: 24, fontWeight: 600 }}>
            Showing <strong style={{ color: '#000' }}>{filtered.length} pet{filtered.length !== 1 ? 's' : ''}</strong> available for adoption
          </p>

          {/* PET GRID */}
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {filtered.map(pet => {
                const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
                const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
                return (
                  <Link key={pet.id} href={`/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                      <div style={{ height: 175, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 76, position: 'relative', borderBottom: '2px solid #000' }}>
                        {pet.images && pet.images.length > 0 ? (
                          <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          emoji
                        )}
                        <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', color: '#000', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '4px 12px', border: '1.5px solid #000', boxShadow: '1px 1px 0px #000' }}>
                          {pet.vaccinated ? '💉 Vaccinated' : pet.neutered ? '✂️ Neutered' : `${pet.species}`}
                        </div>
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>{pet.pet_name}</div>
                        <div style={{ color: '#666', fontSize: 13, marginTop: 3, fontWeight: 600 }}>
                          {pet.breed || pet.species} · {pet.age_years > 0 ? `${pet.age_years}y` : ''} {pet.age_months > 0 ? `${pet.age_months}m` : ''}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1.5px dashed #E5E7EB' }}>
                          <span style={{ fontSize: 13, color: '#444', fontWeight: 700 }}>📍 {pet.location}</span>
                          <span style={{ background: '#58CC02', color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 12px', borderRadius: 999, border: '1.5px solid #000' }}>FREE</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🐾</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#000', marginBottom: 8 }}>No pets found</div>
              <div style={{ color: '#666', fontSize: 15, fontWeight: 500, marginBottom: 28 }}>Try changing your filters or check back soon</div>
              <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>+ List a Pet for Adoption</Link>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '32px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
