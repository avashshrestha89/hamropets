import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LostFound() {
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    type: '', petName: '', species: '', description: '',
    area: '', contactName: '', contactPhone: '',
  })

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/lost-found?type=${filter}`)
      const data = await res.json()
      setListings(data.listings || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => { fetchListings() }, [filter])

  const handleSubmit = async () => {
    if (!form.description || !form.area || !form.contactName || !form.contactPhone) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/lost-found', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
        setShowForm(null)
        fetchListings()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle = { width: '100%', padding: '11px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#000', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
      <Head>
        <title>Lost & Found Pets — HamroPets</title>
        <meta name="description" content="Help reunite lost pets with their families across Nepal." />
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
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Lost & Found' ? 800 : 600, color: label === 'Lost & Found' ? '#58CC02' : '#1A1A1A', background: label === 'Lost & Found' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 28px' }}>

          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ background: '#FFF0F6', color: '#FF6B9D', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🔍 Lost & Found</span>
              <h1 style={{ fontSize: 40, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -1 }}>Help Reunite Pets</h1>
              <p style={{ color: '#666', marginTop: 6, fontSize: 15, fontWeight: 500 }}>Nepal's pet community comes together when it matters most</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowForm('lost'); setSubmitted(false); setForm({ type: 'lost', petName: '', species: '', description: '', area: '', contactName: '', contactPhone: '' }) }} style={{ background: '#FF6B9D', color: '#fff', padding: '12px 24px', borderRadius: 12, border: '2.5px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>🔴 I Lost My Pet</button>
              <button onClick={() => { setShowForm('found'); setSubmitted(false); setForm({ type: 'found', petName: '', species: '', description: '', area: '', contactName: '', contactPhone: '' }) }} style={{ background: '#58CC02', color: '#fff', padding: '12px 24px', borderRadius: 12, border: '2.5px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>🟢 I Found a Pet</button>
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px 24px', border: '2px solid #000', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>✅</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: 16, color: '#000' }}>Report submitted successfully!</div>
                <div style={{ fontSize: 14, color: '#555', fontWeight: 500 }}>Your report is now live. The community will help reunite the pet.</div>
              </div>
            </div>
          )}

          {/* REPORT FORM */}
          {showForm && (
            <div style={{ background: '#fff', borderRadius: 20, border: `3px solid ${showForm === 'lost' ? '#FF6B9D' : '#58CC02'}`, padding: '32px', marginBottom: 32, boxShadow: '5px 5px 0px #000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000', margin: 0 }}>
                  {showForm === 'lost' ? '🔴 Report a Lost Pet' : '🟢 Report a Found Pet'}
                </h3>
                <button onClick={() => setShowForm(null)} style={{ background: '#F3F4F6', border: '2px solid #000', borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 16, fontFamily: 'inherit', fontWeight: 700 }}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Pet Name {showForm === 'found' ? '(if known)' : '*'}</label>
                  <input value={form.petName} onChange={e => update('petName', e.target.value)} placeholder={showForm === 'found' ? 'Unknown if not sure' : "Pet's name"} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Species</label>
                  <select value={form.species} onChange={e => update('species', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select species</option>
                    {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Area / Location *</label>
                  <input value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. Lazimpat, Kathmandu" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Phone *</label>
                  <input type="tel" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Your Name *</label>
                <input value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Your full name" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Description *</label>
                <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Color, size, distinctive features, collar, any other details..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
              <button onClick={handleSubmit} disabled={submitting} style={{ background: showForm === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, border: '2.5px solid #000', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          )}

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {[['all', 'All'], ['lost', '🔴 Lost'], ['found', '🟢 Found']].map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ padding: '8px 20px', borderRadius: 999, border: `2px solid ${filter === key ? '#000' : '#E5E7EB'}`, background: filter === key ? '#000' : '#fff', color: filter === key ? '#fff' : '#666', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>{label}</button>
            ))}
          </div>

          {/* LISTINGS */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: 16, fontWeight: 600 }}>Loading...</div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#000', marginBottom: 8 }}>No reports yet</div>
              <div style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>Be the first to post a lost or found pet report.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {listings.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                  <div style={{ height: 110, background: item.type === 'lost' ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative', borderBottom: '2px solid #000' }}>
                    {item.species === 'Dog' ? '🐕' : item.species === 'Cat' ? '🐈' : item.species === 'Bird' ? '🐦' : '🐾'}
                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                      <span style={{ background: item.type === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '3px 10px', border: '1.5px solid #000' }}>
                        {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#000' }}>{item.pet_name || 'Unknown'}</div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 3, fontWeight: 600 }}>📍 {item.area}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2, fontWeight: 500 }}>🕐 {new Date(item.created_at).toLocaleDateString('en-NP', { day: 'numeric', month: 'short' })}</div>
                    <div style={{ fontSize: 13, color: '#555', marginTop: 8, lineHeight: 1.5, fontWeight: 500 }}>{item.description}</div>
                    <a href={`tel:${item.contact_phone}`} style={{ display: 'block', marginTop: 12, background: '#fff', color: '#000', padding: '9px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #000' }}>
                      📞 {item.contact_phone}
                    </a>
                  </div>
                </div>
              ))}
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
