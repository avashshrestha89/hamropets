import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Admin() {
  const [tab, setTab] = useState('pets_pending')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'hamropets2025'

  const login = () => {
    if (password === ADMIN_PASSWORD) setAuthed(true)
    else alert('Wrong password')
  }

  const tabConfig = {
    pets_pending: { label: '⏳ Pets', api: '/api/admin/listings?status=pending', type: 'pet' },
    pets_approved: { label: '✅ Pets', api: '/api/admin/listings?status=approved', type: 'pet' },
    vets_pending: { label: '⏳ Vets', api: '/api/admin/vet-listings?status=pending', type: 'vet' },
    vets_approved: { label: '✅ Vets', api: '/api/admin/vet-listings?status=approved', type: 'vet' },
    walkers_pending: { label: '⏳ Walkers', api: '/api/admin/walker-applications?status=pending', type: 'walker' },
    walkers_approved: { label: '✅ Walkers', api: '/api/admin/walker-applications?status=approved', type: 'walker' },
    lost_found: { label: '🔍 Lost & Found', api: '/api/admin/lost-found-listings', type: 'lostfound' },
  }

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await fetch(tabConfig[tab].api)
      const data = await res.json()
      setListings(data.listings || [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => { if (authed) fetchListings() }, [authed, tab])

  const updateStatus = async (id, status, type) => {
    setActionLoading(id)
    const endpoints = {
      pet: '/api/admin/update-listing',
      vet: '/api/admin/update-vet-listing',
      walker: '/api/admin/update-walker',
      lostfound: '/api/admin/update-lost-found',
    }
    try {
      await fetch(endpoints[type], {
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
              <input type="password" placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
              <button onClick={login} style={{ background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>Login →</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const currentType = tabConfig[tab].type

  return (
    <>
      <Head><title>Admin Dashboard — HamroPets</title></Head>
      <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'system-ui, sans-serif', display: 'flex' }}>

        {/* SIDEBAR */}
        <div style={{ width: 220, background: '#1A3320', padding: '24px 12px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 8px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000' }}>🐾</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#fff', lineHeight: 1 }}>HamroPets</div>
              <div style={{ fontSize: 10, color: '#58CC02', fontWeight: 700 }}>ADMIN</div>
            </div>
          </div>

          {[
            { group: '🐾 Pet Listings', items: [['pets_pending', '⏳ Pending Pets'], ['pets_approved', '✅ Approved Pets']] },
            { group: '🏥 Vet Listings', items: [['vets_pending', '⏳ Pending Vets'], ['vets_approved', '✅ Approved Vets']] },
            { group: '🦮 Walkers', items: [['walkers_pending', '⏳ Pending Walkers'], ['walkers_approved', '✅ Approved Walkers']] },
            { group: '🔍 Lost & Found', items: [['lost_found', '🔍 All Reports']] },
          ].map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, padding: '0 8px', marginBottom: 6 }}>{group}</div>
              {items.map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)} style={{ display: 'flex', width: '100%', padding: '9px 12px', borderRadius: 10, background: tab === key ? 'rgba(255,255,255,0.12)' : 'transparent', border: 'none', cursor: 'pointer', color: tab === key ? '#fff' : 'rgba(255,255,255,0.55)', fontFamily: 'inherit', fontSize: 13, fontWeight: tab === key ? 700 : 400, marginBottom: 2, textAlign: 'left' }}>{label}</button>
              ))}
            </div>
          ))}

          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
            <Link href="/" target="_blank" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none', fontWeight: 600, padding: '0 8px', marginBottom: 8 }}>View Live Site →</Link>
            <button onClick={() => setAuthed(false)} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '7px 12px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%', textAlign: 'left' }}>Logout</button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', color: '#000' }}>{tabConfig[tab].label}</h2>
          <p style={{ color: '#888', fontSize: 14, margin: '0 0 28px', fontWeight: 500 }}>
            {tab.includes('pending') ? 'Review and approve before going live.' : 'Currently live on HamroPets.'}
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>Loading...</div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#000' }}>No listings here</div>
              <div style={{ color: '#888', fontSize: 14, marginTop: 6 }}>Nothing to review right now.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {listings.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', boxShadow: '4px 4px 0px #000', padding: '24px 28px' }}>

                  {/* PET LISTING */}
                  {currentType === 'pet' && (
                    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 16, background: '#FFF9E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0, border: '2px solid #000' }}>
                        {item.images && item.images.length > 0 ? <img src={item.images[0]} alt={item.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} /> : speciesEmoji[item.species] || '🐾'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000', margin: 0 }}>{item.pet_name}</h3>
                          <span style={{ background: item.status === 'pending' ? '#FFF9E6' : '#E8F9ED', color: item.status === 'pending' ? '#92400E' : '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #000' }}>{item.status}</span>
                          {item.vaccinated && <span style={{ background: '#E8F9ED', color: '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>💉 Vaccinated</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                          {[['Species', item.species], ['Breed', item.breed || 'Unknown'], ['Age', `${item.age_years}y ${item.age_months}m`], ['Gender', item.gender], ['Location', item.location]].map(([k, v]) => (
                            <div key={k}>
                              <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#000', textTransform: 'capitalize' }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.description}</div>
                        <div style={{ background: '#F0F8FF', borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13 }}>
                          <div><span style={{ color: '#888', fontWeight: 700 }}>By: </span><span style={{ fontWeight: 800 }}>{item.submitter_name}</span></div>
                          <div><span style={{ color: '#888', fontWeight: 700 }}>📞 </span><span style={{ fontWeight: 700 }}>{item.submitter_phone}</span></div>
                          {item.submitter_email && <div><span style={{ color: '#888', fontWeight: 700 }}>✉️ </span><span style={{ fontWeight: 700 }}>{item.submitter_email}</span></div>}
                        </div>
                        {item.status === 'pending' && (
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => updateStatus(item.id, 'approved', 'pet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>✅ Approve</button>
                            <button onClick={() => updateStatus(item.id, 'rejected', 'pet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>❌ Reject</button>
                          </div>
                        )}
                        {item.status !== 'pending' && (
                          <button onClick={() => updateStatus(item.id, 'pending', 'pet')} style={{ background: '#fff', color: '#000', padding: '9px 20px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>↩ Move to Pending</button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* VET LISTING */}
                  {currentType === 'vet' && (
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000', margin: 0 }}>{item.business_name}</h3>
                        <span style={{ background: item.tier === 'featured' ? '#FFF9E6' : item.tier === 'verified' ? '#E8F9ED' : '#F3F4F6', color: item.tier === 'featured' ? '#92400E' : item.tier === 'verified' ? '#166534' : '#666', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #000' }}>{item.tier}</span>
                        <span style={{ background: item.status === 'pending' ? '#FFF9E6' : '#E8F9ED', color: item.status === 'pending' ? '#92400E' : '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #000' }}>{item.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                        {[['Category', item.category], ['District', item.district], ['Phone', item.phone], ['WhatsApp', item.whatsapp || 'N/A']].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {item.description && <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.description}</div>}
                      <div style={{ background: '#F0F8FF', borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13 }}>
                        <div><span style={{ color: '#888', fontWeight: 700 }}>Owner: </span><span style={{ fontWeight: 800 }}>{item.owner_name}</span></div>
                        <div><span style={{ color: '#888', fontWeight: 700 }}>📞 </span><span style={{ fontWeight: 700 }}>{item.owner_phone}</span></div>
                        {item.owner_email && <div><span style={{ color: '#888', fontWeight: 700 }}>✉️ </span><span style={{ fontWeight: 700 }}>{item.owner_email}</span></div>}
                      </div>
                      {item.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => updateStatus(item.id, 'approved', 'vet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>✅ Approve</button>
                          <button onClick={() => updateStatus(item.id, 'rejected', 'vet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>❌ Reject</button>
                        </div>
                      )}
                      {item.status !== 'pending' && (
                        <button onClick={() => updateStatus(item.id, 'pending', 'vet')} style={{ background: '#fff', color: '#000', padding: '9px 20px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>↩ Move to Pending</button>
                      )}
                    </div>
                  )}

                  {/* WALKER APPLICATION */}
                  {currentType === 'walker' && (
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000', margin: 0 }}>{item.full_name}</h3>
                        <span style={{ background: item.status === 'pending' ? '#FFF9E6' : '#E8F9ED', color: item.status === 'pending' ? '#92400E' : '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #000' }}>{item.status}</span>
                        <span style={{ background: '#E8F9ED', color: '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, border: '1.5px solid #000' }}>{item.services}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                        {[['Phone', item.phone], ['Area', item.area], ['Email', item.email || 'N/A']].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {item.experience && <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.experience}</div>}
                      {item.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => updateStatus(item.id, 'approved', 'walker')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>✅ Approve</button>
                          <button onClick={() => updateStatus(item.id, 'rejected', 'walker')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>❌ Reject</button>
                        </div>
                      )}
                      {item.status !== 'pending' && (
                        <button onClick={() => updateStatus(item.id, 'pending', 'walker')} style={{ background: '#fff', color: '#000', padding: '9px 20px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>↩ Move to Pending</button>
                      )}
                    </div>
                  )}

                  {/* LOST & FOUND */}
                  {currentType === 'lostfound' && (
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                        <span style={{ background: item.type === 'lost' ? '#FFF0F6' : '#E8F9ED', color: item.type === 'lost' ? '#FF6B9D' : '#58CC02', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #000' }}>{item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}</span>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000', margin: 0 }}>{item.pet_name || 'Unknown'}</h3>
                        <span style={{ background: item.status === 'active' ? '#E8F9ED' : '#F3F4F6', color: item.status === 'active' ? '#166534' : '#666', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #000' }}>{item.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                        {[['Species', item.species || 'Unknown'], ['Area', item.area], ['Contact', item.contact_name], ['Phone', item.contact_phone]].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#000' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.description}</div>
                      {item.status === 'active' && (
                        <button onClick={() => updateStatus(item.id, 'resolved', 'lostfound')} disabled={actionLoading === item.id} style={{ background: '#58CC02', color: '#fff', padding: '10px 24px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>🎉 Mark as Resolved</button>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
