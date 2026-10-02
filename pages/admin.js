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
const [editingId, setEditingId] = useState(null)
const [editForm, setEditForm] = useState({})
const [editUploading, setEditUploading] = useState(false)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'hamropets2025'

  const login = () => {
    if (password === ADMIN_PASSWORD) setAuthed(true)
    else alert('Wrong password')
  }

const tabConfig = {
    pets_pending: { label: '⏳ Pets', api: '/api/admin/listings?status=pending', type: 'pet' },
    pets_approved: { label: '✅ Pets', api: '/api/admin/listings?status=approved,adopted', type: 'pet' },
    vets_pending: { label: '⏳ Vets', api: '/api/admin/vet-listings?status=pending', type: 'vet' },
    vets_approved: { label: '✅ Vets', api: '/api/admin/vet-listings?status=approved', type: 'vet' },
    walkers_pending: { label: '⏳ Walkers', api: '/api/admin/walker-applications?status=pending', type: 'walker' },
    walkers_approved: { label: '✅ Walkers', api: '/api/admin/walker-applications?status=approved', type: 'walker' },
   lostfound_pending: { label: '⏳ Lost & Found', api: '/api/admin/lost-found-listings?status=pending', type: 'lostfound' },
    lostfound_approved: { label: '✅ Lost & Found', api: '/api/admin/lost-found-listings?status=approved,resolved', type: 'lostfound' },
bookings: { label: '📅 Bookings', api: '/api/admin/booking-inquiries', type: 'booking' },
    applications: { label: '🐾 Applications', api: '/api/admin/adoption-applications', type: 'application' },
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
      booking: '/api/admin/update-booking',
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
const startEdit = (item) => {
  setEditingId(item.id)
  setEditForm({
    pet_name: item.pet_name || '',
    breed: item.breed || '',
    species: item.species || '',
    gender: item.gender || '',
    pet_age: item.pet_age || '',
    location: item.location || '',
    description: item.description || '',
    reason_for_adoption: item.reason_for_adoption || '',
    other_info: item.other_info || '',
    vaccinated: item.vaccinated || false,
    neutered: item.neutered || false,
    friendly_children: item.friendly_children || '',
    friendly_dogs: item.friendly_dogs || '',
    submitter_name: item.submitter_name || '',
    submitter_phone: item.submitter_phone || '',
    submitter_whatsapp: item.submitter_whatsapp || '',
    submitter_email: item.submitter_email || '',
    images: item.images || [],
    video_url: item.video_url || '',
  })
}

const saveEdit = async (id) => {
  setActionLoading(id)
  try {
    const res = await fetch('/api/admin/update-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...editForm }),
    })
    if (res.ok) {
      setEditingId(null)
      fetchListings()
    } else {
      alert('Failed to save changes.')
    }
  } catch (err) {
    alert('Something went wrong.')
  }
  setActionLoading(null)
}

const uploadEditPhoto = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  setEditUploading(true)
  try {
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: ev.target.result, folder: 'admin', resourceType: 'image' }),
        })
        const data = await res.json()
        if (data.url) {
          setEditForm(f => ({ ...f, images: [...(f.images || []), data.url] }))
        } else {
          alert('Upload failed. Please try again.')
        }
      } catch (err) {
        alert('Upload failed: ' + err.message)
      }
      setEditUploading(false)
    }
    reader.onerror = () => { alert('File read failed.'); setEditUploading(false) }
    reader.readAsDataURL(file)
  } catch (err) {
    alert('Upload failed: ' + err.message)
    setEditUploading(false)
  }
}

const removeEditPhoto = (index) => {
  setEditForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
}
  const deleteLostFound = async (id) => {
  if (!confirm('Delete this report permanently? This cannot be undone.')) return
  setActionLoading(id)
  try {
    const res = await fetch('/api/admin/delete-lost-found', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) fetchListings()
    else alert('Failed to delete.')
  } catch (err) {
    alert('Something went wrong.')
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
          { group: '🔍 Lost & Found', items: [['lostfound_pending', '⏳ Pending Reports'], ['lostfound_approved', '✅ Approved Reports']] },
{ group: '📅 Bookings', items: [['bookings', '📅 All Inquiries']] },
{ group: '🐾 Adoptions', items: [['applications', '🐾 Adopter Applications']] },
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
      {item.video_url && (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 6 }}>📹 Uploaded Video</div>
    <video
      src={item.video_url}
      controls
      style={{ width: '100%', maxWidth: 400, borderRadius: 12, border: '2px solid #1A1A1A' }}
    />
    <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <a href={item.video_url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#38BDF8', fontWeight: 700 }}>🔗 Open in Cloudinary</a>
      <button onClick={() => {
        navigator.clipboard.writeText(item.video_url)
        alert('Video URL copied!')
      }} style={{ background: '#F3F4F6', border: '1.5px solid #1A1A1A', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📋 Copy URL</button>
      <button onClick={async () => {
        if (!confirm('Delete this video permanently from Cloudinary? This cannot be undone.')) return
        try {
          const res = await fetch('/api/admin/delete-cloudinary-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.id, video_url: item.video_url }),
          })
          if (res.ok) {
            alert('Video deleted successfully!')
            fetchListings()
          } else {
            alert('Failed to delete video.')
          }
        } catch (err) {
          alert('Something went wrong.')
        }
      }} style={{ background: '#FF3B30', color: '#fff', border: '1.5px solid #1A1A1A', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🗑️ Delete Video</button>
    </div>
  </div>
)}
                        <div style={{ background: '#F0F8FF', borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13 }}>
                          <div><span style={{ color: '#888', fontWeight: 700 }}>By: </span><span style={{ fontWeight: 800 }}>{item.submitter_name}</span></div>
                          <div><span style={{ color: '#888', fontWeight: 700 }}>📞 </span><span style={{ fontWeight: 700 }}>{item.submitter_phone}</span></div>
                          {item.submitter_email && <div><span style={{ color: '#888', fontWeight: 700 }}>✉️ </span><span style={{ fontWeight: 700 }}>{item.submitter_email}</span></div>}
                        </div>
{/* EDIT BUTTON */}
        <div style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
          <button
            onClick={() => editingId === item.id ? setEditingId(null) : startEdit(item)}
            style={{ background: editingId === item.id ? '#F3F4F6' : '#38BDF8', color: editingId === item.id ? '#666' : '#fff', padding: '9px 18px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}
          >{editingId === item.id ? '✕ Cancel Edit' : '✏️ Edit Listing'}</button>
        </div>

        {/* INLINE EDIT FORM */}
        {editingId === item.id && (
          <div style={{ background: '#F0F8FF', borderRadius: 16, border: '2px solid #38BDF8', padding: '20px', marginBottom: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 16 }}>✏️ Edit Listing</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['Pet Name', 'pet_name'], ['Breed', 'breed'], ['Age', 'pet_age'], ['Location', 'location'], ['Gender', 'gender'], ['Species', 'species']].map(([label, key]) => (
                <div key={key}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <input value={editForm[key] || ''} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Description</div>
              <textarea rows={3} value={editForm.description || ''} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Reason for Adoption</div>
              <textarea rows={2} value={editForm.reason_for_adoption || ''} onChange={e => setEditForm(f => ({ ...f, reason_for_adoption: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>
                            {/* Vaccination, Neutered, Kids, Dogs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[
                ['Vaccinated', 'vaccinated', ['true', 'false', '']],
                ['Neutered', 'neutered', ['true', 'false', '']],
                ['Good with Kids', 'friendly_children', ['yes', 'no', 'unknown', '']],
                ['Good with Dogs', 'friendly_dogs', ['yes', 'no', 'unknown', '']],
              ].map(([label, key, options]) => (
                <div key={key}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <select value={editForm[key] !== undefined ? String(editForm[key]) : ''} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', cursor: 'pointer' }}>
                    <option value="">Not specified</option>
                    {options.filter(o => o !== '').map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Other Info</div>
              <textarea rows={2} value={editForm.other_info || ''} onChange={e => setEditForm(f => ({ ...f, other_info: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['Owner Name', 'submitter_name'], ['Owner Phone', 'submitter_phone'], ['Owner WhatsApp', 'submitter_whatsapp'], ['Owner Email', 'submitter_email']].map(([label, key]) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['Owner Name', 'submitter_name'], ['Owner Phone', 'submitter_phone'], ['Owner WhatsApp', 'submitter_whatsapp'], ['Owner Email', 'submitter_email']].map(([label, key]) => (
                <div key={key}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <input value={editForm[key] || ''} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                </div>
              ))}
                    </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>Photos</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {(editForm.images || []).map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={url} alt={`photo ${i}`} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '2px solid #1A1A1A' }} />
                    <button onClick={() => removeEditPhoto(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#FF6B35', color: '#fff', border: '1.5px solid #1A1A1A', borderRadius: 999, width: 20, height: 20, fontSize: 10, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
                  </div>
                ))}
                <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 10, border: '2px dashed #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff', flexShrink: 0 }}>
                  <input type="file" accept="image/*" onChange={uploadEditPhoto} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                  {editUploading ? <span style={{ fontSize: 10, color: '#666' }}>...</span> : <span style={{ fontSize: 24, color: '#58CC02' }}>+</span>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => saveEdit(item.id)} disabled={actionLoading === item.id} style={{ flex: 2, background: '#38BDF8', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
                {actionLoading === item.id ? 'Saving...' : '💾 Save Changes'}
              </button>
              <button onClick={() => setEditingId(null)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        )}
                  {/* COPY FOR GEMINI */}
<div style={{ marginBottom: 12 }}>
  <button
    onClick={() => {
const locationKeywords = item.location ? `${item.location}, Nepal` : 'Kathmandu, Nepal'
const breedKeyword = item.breed ? `${item.breed} Adoption Nepal` : 'Dog Adoption Nepal'
const petUrl = `https://www.hamropets.com/pet/${item.id}`

const text = `ADOPTION LISTING — PLEASE GENERATE FULL SOCIAL MEDIA PACKAGE WITH SEO OPTIMIZATION:

OWNER DETAILS:
Name: ${item.submitter_name}
Phone: ${item.submitter_phone}
WhatsApp: ${item.submitter_whatsapp || 'Same as phone'}
Email: ${item.submitter_email || 'Not provided'}
Address: ${item.submitter_address || item.location}

PET DETAILS:
Pet Name: ${item.pet_name}
Species: ${item.species}
Breed: ${item.breed || 'Unknown'}
Age: ${item.pet_age || `${item.age_years}y ${item.age_months}m`}
Gender: ${item.gender}
Vaccinated: ${item.vaccinated ? 'Yes ✅' : 'No ❌'}
Neutered/Spayed: ${item.neutered ? 'Yes ✅' : 'No ❌'}
Friendly with Children: ${item.friendly_children || 'Not specified'}
Friendly with Other Dogs: ${item.friendly_dogs || 'Not specified'}

DESCRIPTION / TEMPERAMENT:
${item.description}

REASON FOR ADOPTION:
${item.reason_for_adoption || 'Not provided'}

OTHER INFO:
${item.other_info || 'None'}

SUBMITTED: ${new Date(item.created_at).toLocaleDateString('en-NP')}

DIRECT LISTING URL (include this in Facebook/Instagram post):
${petUrl}

LOCATION FOR SEO: ${locationKeywords}

---
SYSTEM & GENERATION INSTRUCTIONS:
1. Generate clean plain-text copy-paste ready output. NO raw markdown symbols like **, ##, or *** in social captions or messages.
2. Strict NO BREEDING and FREE ADOPTION messaging throughout. Adoption is always 100% free.
3. For TikTok: Bilingual English + Nepali caption using safe non-flagged terminology (new home / loving family). Use emoji block for phone numbers. Do NOT include any website URL in TikTok caption.
4. For Facebook/Instagram: Include the direct listing URL ${petUrl} naturally in the caption so people can see the full profile.
5. Include ElevenLabs voiceover script with appropriate emotion tags like [warm] [emotional] [hopeful].
6. Include a contextual SEO & Discoverability Block at the end of the Facebook and Instagram post only — not TikTok. Format it as:

📍 Location: ${item.location || 'Kathmandu'}, Nepal
🏷️ Category: Dog Adoption & Pet Care Nepal
🌐 Find more pets at: hamropets.com/adopt
🔍 Search terms: ${breedKeyword} | Free Pet Adoption ${item.location || 'Kathmandu'} | Rescue Dog Nepal | Pet Rehoming Nepal | HamroPets

PLEASE GENERATE:
1. Instagram & Facebook adoption post (bilingual English/Nepali + SEO Block + listing URL)
2. TikTok caption (bilingual English/Nepali — TikTok safe, no URL)
3. ElevenLabs voiceover script in Nepali (warm friendly tone with emotion tags)
4. Message to owner (bilingual English/Nepali)
5. Safety & verification guide for owner (bilingual)`
      navigator.clipboard.writeText(text)
      alert('✅ Copied! Paste directly into Gemini Pro.')
    }}
    style={{ background: '#7B5EA7', color: '#fff', padding: '10px 20px', borderRadius: 10, border: '2px solid #000', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}
  >
    ✨ Copy for Gemini Pro
  </button>
</div>

{item.status === 'pending' && (
  <div style={{ display: 'flex', gap: 10 }}>
    <button onClick={() => updateStatus(item.id, 'approved', 'pet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>✅ Approve</button>
    <button onClick={() => updateStatus(item.id, 'rejected', 'pet')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #000', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>❌ Reject</button>
  </div>
)}
{item.status !== 'pending' && (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
    <button onClick={() => updateStatus(item.id, 'pending', 'pet')} style={{ background: '#fff', color: '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>↩ Move to Pending</button>
    {item.status === 'approved' && (
      <button onClick={() => updateStatus(item.id, 'adopted', 'pet')} style={{ background: '#FF6B9D', color: '#fff', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>🎉 Mark as Adopted</button>
    )}
    {item.status === 'approved' && (
      <button onClick={async () => {
        const res = await fetch('/api/admin/update-listing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, is_featured: !item.is_featured }),
        })
        if (res.ok) fetchListings()
      }} style={{ background: item.is_featured ? '#FFD23F' : '#fff', color: '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
        {item.is_featured ? '⭐ Unfeature' : '☆ Mark as Featured'}
{item.status === 'approved' && (
  <button onClick={async () => {
    const res = await fetch('/api/admin/update-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, is_super_featured: !item.is_super_featured }),
    })
    if (res.ok) fetchListings()
  }} style={{ background: item.is_super_featured ? '#FF3B30' : '#fff', color: item.is_super_featured ? '#fff' : '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
    {item.is_super_featured ? '🚨 Remove Urgent' : '🚨 Mark as Urgent'}
  </button>
)}
      </button>
    )}
  </div>
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
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>{item.full_name}</h3>
                        <span style={{ background: item.status === 'pending' ? '#FFF9E6' : '#E8F9ED', color: item.status === 'pending' ? '#92400E' : '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{item.status}</span>
                        <span style={{ background: '#E8F9ED', color: '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, border: '1.5px solid #1A1A1A' }}>{item.services}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                        {[['Phone', item.phone], ['City', item.city || 'Not set'], ['Locality', item.locality || 'Not set'], ['Email', item.email || 'N/A']].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {item.experience && <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.experience}</div>}

                      {/* EDIT BUTTON */}
                      <div style={{ marginBottom: 12 }}>
                        <button
                          onClick={() => {
                            if (editingId === item.id) {
                              setEditingId(null)
                            } else {
                              setEditingId(item.id)
                              setEditForm({ full_name: item.full_name || '', phone: item.phone || '', city: item.city || '', locality: item.locality || '', area: item.area || '', services: item.services || '', experience: item.experience || '', email: item.email || '', profile_photo: item.profile_photo || '' })
                            }
                          }}
                          style={{ background: editingId === item.id ? '#F3F4F6' : '#38BDF8', color: editingId === item.id ? '#666' : '#fff', padding: '9px 18px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}
                        >{editingId === item.id ? '✕ Cancel' : '✏️ Edit Walker'}</button>
                      </div>

                      {/* INLINE EDIT FORM */}
                      {editingId === item.id && (
                        <div style={{ background: '#F0F8FF', borderRadius: 16, border: '2px solid #38BDF8', padding: '20px', marginBottom: 16 }}>
                          <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 16 }}>✏️ Edit Walker</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                            {[['Full Name', 'full_name'], ['Phone', 'phone'], ['Email', 'email'], ['Services', 'services']].map(([label, key]) => (
                              <div key={key}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                                <input value={editForm[key] || ''} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                              </div>
                            ))}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>City</div>
                              <select value={editForm.city || ''} onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}>
                                <option value="">Select city</option>
                                {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Biratnagar', 'Other'].map(c => <option key={c}>{c}</option>)}
                              </select>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Locality</div>
                              <input value={editForm.locality || ''} onChange={e => setEditForm(f => ({ ...f, locality: e.target.value }))} placeholder="e.g. Thamel, Imadol" style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                            </div>
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Experience / About</div>
                            <textarea rows={3} value={editForm.experience || ''} onChange={e => setEditForm(f => ({ ...f, experience: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
                                                   </div>
                         <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Profile Photo</div>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                              {editForm.profile_photo && (
                                <img src={editForm.profile_photo} alt="Profile" style={{ width: 60, height: 60, borderRadius: 999, objectFit: 'cover', border: '2px solid #1A1A1A', flexShrink: 0 }} />
                              )}
                              <div style={{ position: 'relative', flex: 1 }}>
                                <input type="file" accept="image/*" onChange={async (e) => {
                                  const file = e.target.files[0]
                                  if (!file) return
                                  try {
                                    const reader = new FileReader()
                                    reader.onload = async (ev) => {
                                      try {
                                        const res = await fetch('/api/upload', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({ file: ev.target.result, folder: 'walkers', resourceType: 'image' }),
                                        })
                                        const data = await res.json()
                                        if (data.url) setEditForm(f => ({ ...f, profile_photo: data.url }))
                                        else alert('Upload failed. Try again.')
                                      } catch (err) { alert('Upload failed: ' + err.message) }
                                    }
                                    reader.readAsDataURL(file)
                                  } catch (err) { alert('Upload failed: ' + err.message) }
                                }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                                <div style={{ padding: '9px 12px', borderRadius: 10, border: '2px dashed #1A1A1A', fontSize: 13, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', background: '#F9FAFB', cursor: 'pointer' }}>
                                  {editForm.profile_photo ? '📷 Click to replace photo' : '📷 Click to upload photo'}
                                </div>
                              </div>
                            </div>
                            {editForm.profile_photo && (
                              <input value={editForm.profile_photo} onChange={e => setEditForm(f => ({ ...f, profile_photo: e.target.value }))} placeholder="Or paste URL directly" style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #E5E7EB', fontSize: 11, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', color: '#888' }} />
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={async () => {
                              setActionLoading(item.id)
                              try {
                                await fetch('/api/admin/update-walker', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ id: item.id, ...editForm }),
                                })
                                setEditingId(null)
                                fetchListings()
                              } catch (err) { alert('Failed to save') }
                              setActionLoading(null)
                            }} style={{ flex: 2, background: '#38BDF8', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
                              💾 Save Changes
                            </button>
                            <button onClick={() => setEditingId(null)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                          </div>
                        </div>
                      )}

                      {item.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button onClick={() => updateStatus(item.id, 'approved', 'walker')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>✅ Approve</button>
                          <button onClick={() => updateStatus(item.id, 'rejected', 'walker')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>❌ Reject</button>
                        </div>
                      )}
                                           {item.status !== 'pending' && (
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          <button onClick={() => updateStatus(item.id, 'pending', 'walker')} style={{ background: '#fff', color: '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>↩ Move to Pending</button>
                          {item.status === 'approved' && (
                            <button onClick={async () => {
                              const res = await fetch('/api/admin/update-walker', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: item.id, is_featured: !item.is_featured }),
                              })
                              if (res.ok) fetchListings()
                            }} style={{ background: item.is_featured ? '#FFD23F' : '#fff', color: '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
                              {item.is_featured ? '⭐ Unfeature' : '☆ Mark as Featured'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

   {/* LOST & FOUND */}
                  {currentType === 'lostfound' && (
                    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div style={{ width: 80, height: 80, borderRadius: 16, background: item.type === 'lost' ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0, border: '2px solid #1A1A1A', overflow: 'hidden' }}>
                        {item.image_url ? <img src={item.image_url} alt={item.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (item.species === 'Dog' ? '🐕' : item.species === 'Cat' ? '🐈' : '🐾')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                          <span style={{ background: item.type === 'lost' ? '#FFF0F6' : '#E8F9ED', color: item.type === 'lost' ? '#FF6B9D' : '#58CC02', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #1A1A1A' }}>{item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}</span>
                          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>{item.pet_name || 'Unknown'}</h3>
                          <span style={{ background: item.status === 'pending' ? '#FFF9E6' : item.status === 'approved' ? '#E8F9ED' : '#F3F4F6', color: item.status === 'pending' ? '#92400E' : item.status === 'approved' ? '#166534' : '#666', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{item.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                          {[['Species', item.species || 'Unknown'], ['Area', item.area], ['Contact', item.contact_name], ['Phone', item.contact_phone]].map(([k, v]) => (
                            <div key={k}>
                              <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.description}</div>

                        {/* EDIT BUTTON */}
                        <div style={{ marginBottom: 12 }}>
                          <button
                            onClick={() => {
                              if (editingId === item.id) {
                                setEditingId(null)
                              } else {
                                setEditingId(item.id)
                                setEditForm({
                                  pet_name: item.pet_name || '',
                                  species: item.species || '',
                                  area: item.area || '',
                                  description: item.description || '',
                                  contact_name: item.contact_name || '',
                                  contact_phone: item.contact_phone || '',
                                  image_url: item.image_url || '',
                                  video_url: item.video_url || '',
                                })
                              }
                            }}
                            style={{ background: editingId === item.id ? '#F3F4F6' : '#38BDF8', color: editingId === item.id ? '#666' : '#fff', padding: '9px 18px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}
                          >{editingId === item.id ? '✕ Cancel Edit' : '✏️ Edit Report'}</button>
                        </div>

                        {/* INLINE EDIT FORM */}
                        {editingId === item.id && (
                          <div style={{ background: '#F0F8FF', borderRadius: 16, border: '2px solid #38BDF8', padding: '20px', marginBottom: 16 }}>
                            <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 16 }}>✏️ Edit Report</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                              {[['Pet Name', 'pet_name'], ['Species', 'species'], ['Area', 'area'], ['Contact Name', 'contact_name'], ['Contact Phone', 'contact_phone']].map(([label, key]) => (
                                <div key={key}>
                                  <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                                  <input value={editForm[key] || ''} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                                </div>
                              ))}
                            </div>
                            <div style={{ marginBottom: 12 }}>
                              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Description</div>
                              <textarea rows={3} value={editForm.description || ''} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }} />
                            </div>

                            {/* PHOTO */}
                            <div style={{ marginBottom: 12 }}>
                              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>Photo</div>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                {editForm.image_url && (
                                  <div style={{ position: 'relative' }}>
                                    <img src={editForm.image_url} alt="preview" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, border: '2px solid #1A1A1A' }} />
                                    <button onClick={() => setEditForm(f => ({ ...f, image_url: '' }))} style={{ position: 'absolute', top: -6, right: -6, background: '#FF6B35', color: '#fff', border: '1.5px solid #1A1A1A', borderRadius: 999, width: 20, height: 20, fontSize: 10, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
                                  </div>
                                )}
                                <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 10, border: '2px dashed #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff', flexShrink: 0 }}>
                                  <input type="file" accept="image/*" onChange={async (e) => {
                                    const file = e.target.files[0]
                                    if (!file) return
                                    setEditUploading(true)
                                    try {
                                      const reader = new FileReader()
                                      reader.onload = async (ev) => {
                                        try {
                                          const res = await fetch('/api/upload', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ file: ev.target.result, folder: 'lost-found', resourceType: 'image' }),
                                          })
                                          const data = await res.json()
                                          if (data.url) setEditForm(f => ({ ...f, image_url: data.url }))
                                          else alert('Upload failed.')
                                        } catch (err) { alert('Upload failed: ' + err.message) }
                                        setEditUploading(false)
                                      }
                                      reader.onerror = () => { alert('File read failed.'); setEditUploading(false) }
                                      reader.readAsDataURL(file)
                                    } catch (err) {
                                      alert('Upload failed: ' + err.message)
                                      setEditUploading(false)
                                    }
                                  }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                                  {editUploading ? <span style={{ fontSize: 10, color: '#666' }}>...</span> : <span style={{ fontSize: 24, color: '#58CC02' }}>+</span>}
                                </div>
                              </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 11, fontWeight: 800, color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Video URL (optional)</div>
                              <input value={editForm.video_url || ''} onChange={e => setEditForm(f => ({ ...f, video_url: e.target.value }))} placeholder="https://..." style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', gap: 10 }}>
                              <button onClick={async () => {
                                setActionLoading(item.id)
                                try {
                                  const res = await fetch('/api/admin/update-lost-found', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: item.id, ...editForm }),
                                  })
                                  if (res.ok) { setEditingId(null); fetchListings() }
                                  else alert('Failed to save changes.')
                                } catch (err) { alert('Something went wrong.') }
                                setActionLoading(null)
                              }} style={{ flex: 2, background: '#38BDF8', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>
                                {actionLoading === item.id ? 'Saving...' : '💾 Save Changes'}
                              </button>
                              <button onClick={() => setEditingId(null)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                            </div>
                          </div>
                        )}

                {item.status === 'pending' && (
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button onClick={() => updateStatus(item.id, 'approved', 'lostfound')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>✅ Approve</button>
                            <button onClick={() => updateStatus(item.id, 'rejected', 'lostfound')} disabled={actionLoading === item.id} style={{ flex: 1, background: '#FF6B35', color: '#fff', padding: '11px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>❌ Reject</button>
                            <button onClick={() => deleteLostFound(item.id)} disabled={actionLoading === item.id} style={{ background: '#fff', color: '#FF3B30', padding: '11px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>🗑️</button>
                          </div>
                        )}
                        {item.status === 'approved' && (
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button onClick={() => updateStatus(item.id, 'resolved', 'lostfound')} disabled={actionLoading === item.id} style={{ background: '#58CC02', color: '#fff', padding: '10px 24px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>🎉 Mark as Resolved</button>
                            <button onClick={() => deleteLostFound(item.id)} disabled={actionLoading === item.id} style={{ background: '#fff', color: '#FF3B30', padding: '10px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>🗑️ Delete</button>
                          </div>
                        )}
                        {item.status === 'resolved' && (
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <button onClick={() => updateStatus(item.id, 'approved', 'lostfound')} style={{ background: '#fff', color: '#1A1A1A', padding: '9px 20px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>↩ Move back to Approved</button>
                            <button onClick={() => deleteLostFound(item.id)} disabled={actionLoading === item.id} style={{ background: '#fff', color: '#FF3B30', padding: '9px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>🗑️ Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
{/* BOOKING INQUIRY */}
                  {currentType === 'booking' && (
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>{item.client_name}</h3>
                        <span style={{ background: item.status === 'pending' ? '#FFF9E6' : '#E8F9ED', color: item.status === 'pending' ? '#92400E' : '#166534', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{item.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                        {[['Walker', item.walker_name], ['Service', item.service], ['Date', item.preferred_date || 'Not specified'], ['Phone', item.client_phone]].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {item.pet_details && <div style={{ background: '#F0F8FF', borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13, color: '#444', lineHeight: 1.6 }}><strong>Pet:</strong> {item.pet_details}</div>}
                      {item.message && <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#444', lineHeight: 1.6 }}><strong>Message:</strong> {item.message}</div>}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <a href={`tel:${item.client_phone}`} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '10px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #166534' }}>📞 Call Client</a>
                        <a href={`https://wa.me/977${item.client_phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ flex: 1, background: '#25D366', color: '#fff', padding: '10px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A' }}>💬 WhatsApp</a>
                        {item.status === 'pending' && <button onClick={() => updateStatus(item.id, 'confirmed', 'booking')} style={{ flex: 1, background: '#38BDF8', color: '#fff', padding: '10px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>✅ Confirm</button>}
                      </div>
                    </div>
                                    )}

                  {currentType === 'application' && (
                    <div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>{item.full_name}</h3>
                        <span style={{ background: item.status === 'pending' ? '#FFF9E6' : item.status === 'shortlisted' ? '#E8F9ED' : '#FEF2F2', color: item.status === 'pending' ? '#92400E' : item.status === 'shortlisted' ? '#166534' : '#991B1B', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>{item.status}</span>
                        {item.score && <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800, border: '1.5px solid #1A1A1A' }}>Score: {item.score}/5</span>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#7B5EA7', marginBottom: 10 }}>🐾 Applying for: {item.pet_name}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
                        {[
                          ['Phone', item.phone],
                          ['Location', item.location],
                          ['Age', item.age],
                          ['Housing', item.housing_type?.replace(/_/g, ' ')],
                          ['Household', item.household_type?.replace(/_/g, ' ')],
                          ['Family OK?', item.family_consensus?.replace(/_/g, ' ')],
                          ['Previous Pet', item.previous_pet?.replace(/_/g, ' ')],
                          ['Financial Ready', item.financial_ready?.replace(/_/g, ' ')],
                        ].filter(([, v]) => v).map(([k, v]) => (
                          <div key={k} style={{ background: '#F9FAFB', borderRadius: 8, padding: '8px 12px' }}>
                            <div style={{ fontSize: 10, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      {item.dashain_plan && <div style={{ background: '#FFF9E6', borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13, color: '#92400E', lineHeight: 1.6 }}><strong>Dashain Plan:</strong> {item.dashain_plan}</div>}
                      {item.why_this_pet && <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#166534', lineHeight: 1.6 }}><strong>Why this pet:</strong> {item.why_this_pet}</div>}
                      {item.landlord_consent && <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '8px 14px', marginBottom: 8, fontSize: 13, color: '#1D4ED8' }}><strong>Landlord consent:</strong> {item.landlord_consent}</div>}
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <a href={`https://wa.me/977${item.phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '9px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, textDecoration: 'none' }}>💬 WhatsApp</a>
                        {item.status === 'pending' && (
                          <>
                            <button onClick={async () => {
                              await fetch('/api/admin/update-application', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, status: 'shortlisted' }) })
                              fetchListings()
                            }} style={{ background: '#58CC02', color: '#fff', padding: '9px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>✅ Shortlist</button>
                            <button onClick={async () => {
                              await fetch('/api/admin/update-application', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, status: 'rejected' }) })
                              fetchListings()
                            }} style={{ background: '#FF3B30', color: '#fff', padding: '9px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit' }}>❌ Reject</button>
                          </>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>Score:</span>
                          {[1,2,3,4,5].map(n => (
                            <button key={n} onClick={async () => {
                              await fetch('/api/admin/update-application', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, score: n }) })
                              fetchListings()
                            }} style={{ width: 28, height: 28, borderRadius: 6, border: `2px solid ${item.score >= n ? '#FFD23F' : '#E5E7EB'}`, background: item.score >= n ? '#FFD23F' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 900, fontFamily: 'inherit' }}>{n}</button>
                          ))}
                        </div>
                      </div>
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
