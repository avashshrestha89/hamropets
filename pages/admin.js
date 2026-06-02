import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Admin() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pending')
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'hamropets2025'

  const login = () => {
    if (password === ADMIN_PASSWORD) setAuthed(true)
    else alert('Wrong password')
  }

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/listings?status=${tab}`)
      const data = await res.json()
      setListings(data.listings || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authed) fetchListings()
  }, [authed, tab])

  const updateStatus = async (id, status) => {
    setActionLoading(id)
    try {
      await fetch('/api/admin/update-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      fetchListings()
    } catch (err) {
      alert('Something went wrong')
    }
    setActionLoading(null)
  }

  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <>
        <Head><title>Admin — HamroPets</title></Head>
        <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 380, padding: '40px', background: '#fff', borderRadius: 24, border: '3px solid #000', boxShadow: '6px 6px 0px #000' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>🐾</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: '#000', margin: '0 0 6px' }}>Admin Dashboard</h1>
              <p style={{ color: '#888', fontSize: 14, fontWeight: 500, margin: 0 }}>HamroPets · Restricted Access</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
              />
              <button onClick={login} style={{ background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                Login →
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ADMIN DASHBOARD
  return (
    <>
      <Head><title>Admin Dashboard — HamroPets</title></Head>
      <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'system-ui, sans-serif' }}>

        {/* ADMIN NAV */}
        <nav style={{ background: '#1A3320', borderBottom: '3px solid #000', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000' }}>🐾</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: '#fff', lineHeight: 1 }}>HamroPets Admin</div>
              <div style={{ fontSize: 11, color: '#58CC02', fontWeight: 700 }}>DASHBOARD</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/" target="_blank" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>View Live Site →</Link>
            <button onClick={() => setAuthed(false)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '7px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Logout</button>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px' }}>

          {/* STATS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
            {[
              ['⏳', 'Pending', listings.filter(l => l.status === 'pending').length || '—', '#FFD23F'],
              ['✅', 'Approved', '—', '#58CC02'],
              ['❌', 'Rejected', '—', '#FF6B35'],
              ['🐾', 'Total', '—', '#7B5EA7'],
            ].map(([icon, label, count, color]) => (
              <div key={label} style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', padding: '20px 24px', boxShadow: '3px 3px 0px #000' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{tab === 'pending' && label === 'Pending' ? listings.length : count}</div>
                <div style={{ fontSize: 13, color: '#888', fontWeight: 600, marginTop: 4 }}>{label} listings</div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 28, border: '2px solid #000', borderRadius: 14, overflow: 'hidden', boxShadow: '3px 3px 0px #000', width: 'fit-content' }}>
            {[['pending', '⏳ Pending'], ['approved', '✅ Approved'], ['rejected', '❌ Rejected']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{ padding: '11px 24px', border: 'none', borderRight: key !== 'rejected' ? '2px solid #000' : 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: 14, background: tab === key ? '#1A3320' : '#fff', color: tab === key ? '#fff' : '#888', transition: 'all 0.15s' }}>{label}</button>
            ))}
          </div>

          {/* LISTINGS */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: 16, fontWeight: 600 }}>Loading listings...</div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>
                {tab === 'pending' ? '⏳' : tab === 'approved' ? '✅' : '❌'}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#000', marginBottom: 8 }}>No {tab} listings</div>
              <div style={{ color: '#888', fontSize: 14, fontWeight: 500 }}>
                {tab === 'pending' ? 'All caught up! No listings waiting for review.' : `No ${tab} listings yet.`}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {listings.map(listing => (
                <div key={listing.id} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', boxShadow: '4px 4px 0px #000', overflow: 'hidden' }}>
                  <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>

                      {/* EMOJI AVATAR */}
                      <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, #FFD23F33, #FFD23F66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0, border: '2px solid #000' }}>
                        {speciesEmoji[listing.species] || '🐾'}
                      </div>

                      {/* DETAILS */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#000', margin: 0 }}>{listing.pet_name}</h3>
                          <span style={{ background: listing.status === 'pending' ? '#FFF9E6' : listing.status === 'approved' ? '#E8F9ED' : '#FEE2E2', color: listing.status === 'pending' ? '#92400E' : listing.status === 'approved' ? '#166534' : '#991B1B', padding: '3px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, border: '1.5px solid #000' }}>
                            {listing.status === 'pending' ? '⏳ Pending' : listing.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                          </span>
                          {listing.vaccinated && <span style={{ background: '#E8F9ED', color: '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>💉 Vaccinated</span>}
                          {listing.neutered && <span style={{ background: '#E8F9ED', color: '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>✂️ Neutered</span>}
                        </div>

                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
                          {[
                            ['Species', listing.species],
                            ['Breed', listing.breed || 'Unknown'],
                            ['Age', `${listing.age_years}y ${listing.age_months}m`],
                            ['Gender', listing.gender],
                            ['Location', listing.location],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{k}</div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginTop: 2, textTransform: 'capitalize' }}>{v}</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '12px 16px', marginBottom: 16, border: '1px solid #E5E7EB' }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 4, textTransform: 'uppercase' }}>Description</div>
                          <p style={{ margin: 0, fontSize: 14, color: '#333', lineHeight: 1.6, fontWeight: 500 }}>{listing.description}</p>
                        </div>

                        {/* SUBMITTER INFO */}
                        <div style={{ display: 'flex', gap: 24, padding: '12px 16px', background: '#F0F8FF', borderRadius: 10, border: '1px solid #BFE0FF', marginBottom: 20, flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>Submitted By</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#000', marginTop: 2 }}>{listing.submitter_name}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>Phone</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginTop: 2 }}>📞 {listing.submitter_phone}</div>
                          </div>
                          {listing.submitter_email && (
                            <div>
                              <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>Email</div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginTop: 2 }}>✉️ {listing.submitter_email}</div>
                            </div>
                          )}
                          <div>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>Submitted</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginTop: 2 }}>🕐 {new Date(listing.created_at).toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        {listing.status === 'pending' && (
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button
                              onClick={() => updateStatus(listing.id, 'approved')}
                              disabled={actionLoading === listing.id}
                              style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '12px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000', opacity: actionLoading === listing.id ? 0.6 : 1 }}>
                              {actionLoading === listing.id ? 'Processing...' : '✅ Approve — Go Live'}
                            </button>
                            <button
                              onClick={() => updateStatus(listing.id, 'rejected')}
                              disabled={actionLoading === listing.id}
                              style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '12px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000', opacity: actionLoading === listing.id ? 0.6 : 1 }}>
                              {actionLoading === listing.id ? 'Processing...' : '❌ Reject'}
                            </button>
                          </div>
                        )}

                        {listing.status !== 'pending' && (
                          <button
                            onClick={() => updateStatus(listing.id, 'pending')}
                            style={{ background: '#fff', color: '#000', padding: '10px 24px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>
                            ↩ Move back to Pending
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
