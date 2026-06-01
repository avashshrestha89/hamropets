import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Adopt() {
  const [species, setSpecies] = useState('All')
  const [location, setLocation] = useState('All')

  const pets = [
    { name: 'Bruno', breed: 'Labrador Mix', age: '2 yrs', loc: 'Lalitpur', emoji: '🐕', color: '#FF6B35', tag: 'Vaccinated', species: 'Dogs' },
    { name: 'Luna', breed: 'Persian Mix', age: '1 yr', loc: 'Kathmandu', emoji: '🐈', color: '#7B5EA7', tag: 'Neutered', species: 'Cats' },
    { name: 'Kalu', breed: 'Street Dog', age: '6 mo', loc: 'Bhaktapur', emoji: '🐕', color: '#56C271', tag: 'Friendly', species: 'Dogs' },
    { name: 'Tweety', breed: 'Budgerigar', age: '8 mo', loc: 'Patan', emoji: '🐦', color: '#38BDF8', tag: 'Talks!', species: 'Birds' },
    { name: 'Sita', breed: 'Spitz Mix', age: '3 yrs', loc: 'Boudha', emoji: '🐕', color: '#FFD23F', tag: 'Trained', species: 'Dogs' },
    { name: 'Raja', breed: 'Street Cat', age: '4 mo', loc: 'Thamel', emoji: '🐈', color: '#FF6B9D', tag: 'Playful', species: 'Cats' },
    { name: 'Ginger', breed: 'Golden Mix', age: '1 yr', loc: 'Baneshwor', emoji: '🐕', color: '#FF6B35', tag: 'Good with kids', species: 'Dogs' },
    { name: 'Coco', breed: 'Canary', age: '6 mo', loc: 'Pulchowk', emoji: '🐦', color: '#56C271', tag: 'Sings!', species: 'Birds' },
  ]

  const filtered = pets.filter(p => {
    const speciesMatch = species === 'All' || p.species === species
    const locationMatch = location === 'All' || p.loc === location
    return speciesMatch && locationMatch
  })

  return (
    <>
      <Head>
        <title>Adopt a Pet — HamroPets</title>
        <meta name="description" content="Browse pets available for adoption across Nepal. Always free." />
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
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: label === 'Adopt' ? 700 : 500, color: label === 'Adopt' ? '#58CC02' : '#6B7C99', background: label === 'Adopt' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>

          {/* HEADER */}
          <span style={{ background: '#FFF0EB', color: '#FF6B35', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>🐾 Adopt</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1A3320', margin: '0 0 6px', letterSpacing: -1 }}>Find Your Pet</h1>
          <p style={{ color: '#6B7C99', marginBottom: 32, fontSize: 15 }}>All listings reviewed · Adoption is always free · Updated daily</p>

          {/* FILTERS */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '20px 24px', border: '1.5px solid #EDE8F5', marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input placeholder="🔍  Search pets..." style={{ flex: 1, minWidth: 180, padding: '10px 16px', borderRadius: 999, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                {['All', 'Dogs', 'Cats', 'Birds'].map(s => (
                  <button key={s} onClick={() => setSpecies(s)} style={{ padding: '8px 18px', borderRadius: 999, border: `2px solid ${species === s ? '#FF6B35' : '#EDE8F5'}`, background: species === s ? '#FF6B35' : '#fff', color: species === s ? '#fff' : '#6B7C99', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>{s}</button>
                ))}
              </div>
              <div style={{ width: 1, height: 28, background: '#EDE8F5' }} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(l => (
                  <button key={l} onClick={() => setLocation(l)} style={{ padding: '8px 16px', borderRadius: 999, border: `2px solid ${location === l ? '#1A3320' : '#EDE8F5'}`, background: location === l ? '#1A3320' : '#fff', color: location === l ? '#fff' : '#6B7C99', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>📍 {l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}
          <p style={{ color: '#6B7C99', fontSize: 14, marginBottom: 20 }}>Showing <strong style={{ color: '#1A3320' }}>{filtered.length} pets</strong> available for adoption</p>

          {/* PET GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {filtered.map(pet => (
              <Link key={pet.name} href={`/pet/${pet.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                  <div style={{ height: 160, background: `linear-gradient(135deg, ${pet.color}22, ${pet.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 68, position: 'relative' }}>
                    {pet.emoji}
                    <div style={{ position: 'absolute', top: 10, left: 10, background: pet.color, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '3px 10px' }}>{pet.tag}</div>
                  </div>
                  <div style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#1A3320' }}>{pet.name}</div>
                    <div style={{ color: '#6B7C99', fontSize: 13, marginTop: 2 }}>{pet.breed} · {pet.age}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: '#A0AFCC' }}>📍 {pet.loc}</span>
                      <span style={{ background: '#E8F9ED', color: '#56C271', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999 }}>FREE</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🐾</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1A3320', marginBottom: 8 }}>No pets found</div>
              <div style={{ color: '#6B7C99', fontSize: 14 }}>Try changing your filters</div>
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
