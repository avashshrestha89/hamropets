import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function LostFound() {
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(null)

  const listings = [
    { type: 'lost', name: 'Max', species: '🐕', area: 'Lazimpat, Kathmandu', date: '3 days ago', contact: '98XXXXXXXX', desc: 'Brown Labrador, wearing blue collar, very friendly' },
    { type: 'found', name: 'Unknown Cat', species: '🐈', area: 'Patan Durbar Square', date: '1 day ago', contact: '98XXXXXXXX', desc: 'White and orange cat, appears well fed, no collar' },
    { type: 'lost', name: 'Coco', species: '🐦', area: 'Thamel, Kathmandu', date: '5 days ago', contact: '98XXXXXXXX', desc: 'Green parrot, says his own name, reward offered' },
    { type: 'found', name: 'Unknown Dog', species: '🐕', area: 'Baneshwor', date: '2 days ago', contact: '98XXXXXXXX', desc: 'Small white dog, limping slightly, very scared' },
    { type: 'reunited', name: 'Whiskers', species: '🐈', area: 'Boudha', date: 'Reunited! 🎉', contact: '', desc: 'Reunited with family after 4 days. Thank you HamroPets community!' },
    { type: 'found', name: 'Puppy', species: '🐕', area: 'Maharajgunj', date: 'Today', contact: '98XXXXXXXX', desc: 'Tiny black puppy, around 2 months old, found alone' },
    { type: 'lost', name: 'Tommy', species: '🐕', area: 'Ekantakuna, Lalitpur', date: '1 week ago', contact: '98XXXXXXXX', desc: 'German Shepherd mix, answers to Tommy, microchipped' },
    { type: 'reunited', name: 'Goldie', species: '🐕', area: 'Balaju', date: 'Reunited! 🎉', contact: '', desc: 'Found safe after 2 days. Community helped locate her!' },
    { type: 'found', name: 'Unknown Bird', species: '🐦', area: 'Jawalakhel', date: '3 days ago', contact: '98XXXXXXXX', desc: 'Yellow canary, very tame, likely escaped from home' },
  ]

  const filtered = filter === 'All' ? listings : listings.filter(l => l.type === filter.toLowerCase())

  return (
    <>
      <Head>
        <title>Lost & Found Pets — HamroPets</title>
        <meta name="description" content="Help reunite lost pets with their families across Nepal." />
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
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: label === 'Lost & Found' ? 700 : 500, color: label === 'Lost & Found' ? '#58CC02' : '#6B7C99', background: label === 'Lost & Found' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>

          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ background: '#FFF0F6', color: '#FF6B9D', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>🔍 Lost & Found</span>
              <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1A3320', margin: 0, letterSpacing: -1 }}>Help Reunite Pets</h1>
              <p style={{ color: '#6B7C99', marginTop: 6, fontSize: 15 }}>Nepal's pet community comes together when it matters most</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowForm('lost')} style={{ background: '#FF6B9D', color: '#fff', padding: '12px 24px', borderRadius: 999, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(255,107,157,0.3)' }}>🔴 I Lost My Pet</button>
              <button onClick={() => setShowForm('found')} style={{ background: '#56C271', color: '#fff', padding: '12px 24px', borderRadius: 999, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(86,194,113,0.3)' }}>🟢 I Found a Pet</button>
            </div>
          </div>

          {/* REPORT FORM */}
          {showForm && (
            <div style={{ background: '#fff', borderRadius: 24, border: `2px solid ${showForm === 'lost' ? '#FF6B9D' : '#56C271'}`, padding: '32px', marginBottom: 36, boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1A3320', margin: 0 }}>
                  {showForm === 'lost' ? '🔴 Report a Lost Pet' : '🟢 Report a Found Pet'}
                </h3>
                <button onClick={() => setShowForm(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: 999, width: 32, height: 32, cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' }}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  ['Pet Name', 'text', showForm === 'lost' ? "Pet's name" : 'Unknown if not sure'],
                  ['Species', 'text', 'Dog, Cat, Bird...'],
                  ['Area / Location', 'text', 'Where lost/found'],
                  ['Your Phone *', 'tel', '98XXXXXXXX'],
                ].map(([label, type, placeholder]) => (
                  <div key={label}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#1A3320', display: 'block', marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '11px 16px', borderRadius: 12, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#1A3320', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea rows={3} placeholder="Colour, size, distinctive features, collar, microchip..." style={{ width: '100%', padding: '11px 16px', borderRadius: 12, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <button style={{ marginTop: 16, background: showForm === 'lost' ? '#FF6B9D' : '#56C271', color: '#fff', padding: '12px 32px', borderRadius: 999, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Submit Report
              </button>
            </div>
          )}

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {['All', 'Lost', 'Found', 'Reunited'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 20px', borderRadius: 999, border: `2px solid ${filter === f ? '#FF6B35' : '#EDE8F5'}`, background: filter === f ? '#FF6B35' : '#fff', color: filter === f ? '#fff' : '#6B7C99', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>{f === 'Reunited' ? '🎉 Reunited' : f}</button>
            ))}
          </div>

          {/* LISTINGS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                <div style={{ height: 110, background: item.type === 'lost' ? '#FEF2F2' : item.type === 'reunited' ? '#E8F9ED' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
                  {item.species}
                  <div style={{ position: 'absolute', top: 10, left: 10 }}>
                    <span style={{
                      background: item.type === 'lost' ? '#FF6B9D' : item.type === 'reunited' ? '#56C271' : '#56C271',
                      color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '3px 10px'
                    }}>
                      {item.type === 'lost' ? '🔴 LOST' : item.type === 'reunited' ? '🎉 REUNITED' : '🟢 FOUND'}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#1A3320' }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: '#6B7C99', marginTop: 3 }}>📍 {item.area}</div>
                  <div style={{ fontSize: 12, color: '#A0AFCC', marginTop: 2 }}>🕐 {item.date}</div>
                  <div style={{ fontSize: 13, color: '#6B7C99', marginTop: 6, lineHeight: 1.5 }}>{item.desc}</div>
                  {item.type !== 'reunited' && (
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <button style={{ flex: 1, padding: '8px', borderRadius: 999, border: '2px solid #EDE8F5', background: '#fff', color: '#1A3320', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>📞 {item.contact}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

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
