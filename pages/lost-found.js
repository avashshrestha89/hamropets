import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LostFound() {
  const [isMobile, setIsMobile] = useState(false)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [form, setForm] = useState({
    type: '', petName: '', species: '', description: '',
    area: '', contactName: '', contactPhone: '',
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
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
          if (data.url) setImageUrl(data.url)
          else alert('Upload failed. Please try again.')
        } catch (err) {
          alert('Upload failed: ' + err.message)
        }
        setUploading(false)
      }
      reader.onerror = () => { alert('File read failed.'); setUploading(false) }
      reader.readAsDataURL(file)
    } catch (err) {
      alert('Upload failed: ' + err.message)
      setUploading(false)
    }
  }

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
        body: JSON.stringify({ ...form, imageUrl }),
      })
      if (res.ok) {
        setSubmitted(true)
        setShowForm(null)
        setImageUrl(null)
        fetchListings()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle = { width: '100%', padding: '11px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
   <Head>
  <title>Lost & Found Pets Nepal — Report Missing or Found Pets | HamroPets</title>
  <meta name="description" content="Report a lost or found pet in Nepal. Help reunite missing dogs and cats with their families across Kathmandu Valley. Free community service by Adopt a Dog Nepal since 2018." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="keywords" content="lost dog Kathmandu, found dog Nepal, missing cat Kathmandu, lost pet Nepal, harayeko kukur, report lost dog Nepal, found pet Kathmandu, lost and found pets Nepal" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Lost & Found Pets Nepal — Help Reunite Pets | HamroPets" />
  <meta property="og:description" content="Report a lost or found pet in Nepal. Free community service by Adopt a Dog Nepal since 2018." />
  <meta property="og:url" content="https://www.hamropets.com/lost-found" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png" />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I report a missing dog in Kathmandu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Visit HamroPets Lost & Found page, click 'I Lost My Pet', upload a clear photo, provide the last known location and your contact details. Your report will be reviewed and approved within hours."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if I find a lost pet in Nepal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Secure the animal safely, take a clear photo, and post a Found Pet listing on HamroPets. Include a description of the pet, the area where you found it, and your contact number so the owner can reach you."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a fee to post a lost pet on HamroPets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Posting a lost or found pet alert on HamroPets is completely free as a community service by Adopt a Dog Nepal."
            }
          },
          {
            "@type": "Question",
            "name": "How can I help find missing pets in my neighborhood?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Check the HamroPets Lost & Found board regularly, share listings on your local community Facebook groups and WhatsApp groups, and keep an eye out for described pets in your area."
            }
          },
          {
            "@type": "Question",
            "name": "Who do I contact to rescue an injured street dog in Kathmandu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For injured street dogs contact KAT Centre (Kathmandu Animal Treatment Centre) or Sneha's Care. You can also post on HamroPets Lost & Found to alert the local pet community immediately."
            }
          }
        ]
      })
    }}
  />
  <link rel="icon" href="/favicon.ico" />
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
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Lost & Found' ? 800 : 600, color: label === 'Lost & Found' ? '#58CC02' : '#1A1A1A', background: label === 'Lost & Found' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
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
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'Lost & Found' ? 800 : 600, color: label === 'Lost & Found' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'Lost & Found' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '28px 16px' : '48px 28px' }}>

          {/* HEADER */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-start', marginBottom: 28, gap: 16 }}>
            <div>
              <span style={{ background: '#FFF0F6', color: '#FF6B9D', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🔍 Lost & Found</span>
              <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -1 }}>Help Reunite Pets</h1>
              <p style={{ color: '#6B7280', marginTop: 6, fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>Nepal's pet community comes together when it matters most</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => { setShowForm('lost'); setSubmitted(false); setImageUrl(null); setForm({ type: 'lost', petName: '', species: '', description: '', area: '', contactName: '', contactPhone: '' }) }} style={{ background: '#FF6B9D', color: '#fff', padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 13 : 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', whiteSpace: 'nowrap' }}>🔴 I Lost My Pet</button>
              <button onClick={() => { setShowForm('found'); setSubmitted(false); setImageUrl(null); setForm({ type: 'found', petName: '', species: '', description: '', area: '', contactName: '', contactPhone: '' }) }} style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 13 : 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534', whiteSpace: 'nowrap' }}>🟢 I Found a Pet</button>
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '16px 20px', border: '2px solid #1A1A1A', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>✅</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 14 : 16, color: '#1A1A1A' }}>Report submitted for review!</div>
                <div style={{ fontSize: isMobile ? 12 : 14, color: '#6B7280', fontWeight: 500 }}>Our team will review and approve it shortly so it appears on the site.</div>
              </div>
            </div>
          )}

          {/* REPORT FORM */}
          {showForm && (
            <div style={{ background: '#fff', borderRadius: 20, border: `3px solid ${showForm === 'lost' ? '#FF6B9D' : '#58CC02'}`, padding: isMobile ? '20px 16px' : '32px', marginBottom: 28, boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>
                  {showForm === 'lost' ? '🔴 Report a Lost Pet' : '🟢 Report a Found Pet'}
                </h3>
                <button onClick={() => setShowForm(null)} style={{ background: '#F3F4F6', border: '2px solid #1A1A1A', borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', fontWeight: 700, flexShrink: 0 }}>✕</button>
              </div>

              {/* PHOTO UPLOAD */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Pet Photo {showForm === 'lost' ? '*' : '(recommended)'}</label>
                <div style={{ position: 'relative', border: `3px dashed ${imageUrl ? '#58CC02' : '#1A1A1A'}`, borderRadius: 16, padding: '20px', textAlign: 'center', background: imageUrl ? '#E8F9ED' : '#FAFAFA', cursor: 'pointer' }}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                  {uploading ? (
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#6B7280' }}>⬆️ Uploading...</div>
                  ) : imageUrl ? (
                    <div>
                      <img src={imageUrl} alt="Pet" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12, border: '2px solid #1A1A1A', marginBottom: 8 }} />
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#58CC02' }}>Photo uploaded ✅ — click to replace</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 32, marginBottom: 6 }}>📷</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A' }}>Upload a clear photo of the pet</div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>JPG or PNG</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
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
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Your Name *</label>
                <input value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Your full name" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Description *</label>
                <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Color, size, distinctive features, collar, any other details..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
              <button onClick={handleSubmit} disabled={submitting} style={{ background: showForm === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', padding: '13px 28px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit Report for Review'}
              </button>
            </div>
          )}

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {[['all', 'All'], ['lost', '🔴 Lost'], ['found', '🟢 Found']].map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ padding: isMobile ? '8px 16px' : '8px 20px', borderRadius: 999, border: `2px solid ${filter === key ? '#1A1A1A' : '#E5E7EB'}`, background: filter === key ? '#1A1A1A' : '#fff', color: filter === key ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit' }}>{label}</button>
            ))}
          </div>

          {/* LISTINGS */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: 16, fontWeight: 600 }}>Loading...</div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: isMobile ? '48px 16px' : '80px 20px' }}>
              <div style={{ fontSize: isMobile ? 48 : 64, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>No reports yet</div>
              <div style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500 }}>Be the first to post a lost or found pet report.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
              {listings.map(item => (
               <Link key={item.id} href={`/lost-found/${item.id}`} style={{ textDecoration: 'none' }}>
<div style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A', cursor: 'pointer' }}>
                  <div style={{ height: isMobile ? 90 : 110, background: item.type === 'lost' ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 52, position: 'relative', borderBottom: '2px solid #1A1A1A' }}>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.pet_name || 'Pet'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      item.species === 'Dog' ? '🐕' : item.species === 'Cat' ? '🐈' : item.species === 'Bird' ? '🐦' : '🐾'
                    )}
                    <div style={{ position: 'absolute', top: 8, left: 8 }}>
                      <span style={{ background: item.type === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 900, padding: '2px 8px', border: '1.5px solid #1A1A1A' }}>
                        {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: isMobile ? '10px 12px' : '14px 18px' }}>
                    <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A' }}>{item.pet_name || 'Unknown'}</div>
                    <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', marginTop: 2, fontWeight: 600 }}>📍 {item.area}</div>
                    <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 1, fontWeight: 500 }}>🕐 {new Date(item.created_at).toLocaleDateString('en-NP', { day: 'numeric', month: 'short' })}</div>
                    <div style={{ fontSize: isMobile ? 11 : 13, color: '#555', marginTop: 6, lineHeight: 1.5, fontWeight: 500 }}>{item.description}</div>
                    <div style={{ marginTop: 10, background: '#FF6B9D', color: '#fff', padding: '8px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 800, textAlign: 'center', boxShadow: '2px 2px 0px #1A1A1A' }}>
                      View Details →
                    </div>
                  </div>
                </div>
</Link>
              ))}
            </div>
  
          )}

        </div>
{/* FAQ SECTION */}
<div style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', marginTop: isMobile ? 48 : 64 }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 16px' : '64px 28px' }}>
    <div style={{ marginBottom: 40, textAlign: 'center' }}>
      <span style={{ background: '#FFF0F6', color: '#FF6B9D', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>❓ FAQ</span>
      <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Lost & Found Pets in Nepal — FAQs</h2>
      <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500, margin: 0 }}>Everything you need to know about reporting lost or found pets</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780, margin: '0 auto' }}>
      {[
        {
          q: 'How do I report a missing dog in Kathmandu?',
          a: 'Click "I Lost My Pet" on this page, upload a clear photo of your pet, provide the last known location and your contact details. Your report will be reviewed and approved by our team within hours so the community can help.'
        },
        {
          q: 'What should I do if I find a lost pet in Nepal?',
          a: 'Secure the animal safely, take a clear photo, and click "I Found a Pet" on this page. Include a description, the area where you found it, and your contact number so the owner can reach you directly.'
        },
        {
          q: 'Is there a fee to post a lost pet on HamroPets?',
          a: 'No. Posting a lost or found pet alert on HamroPets is completely free — always. This is a community service by Adopt a Dog Nepal.'
        },
        {
          q: 'How can I help find missing pets in my neighborhood?',
          a: 'Check the HamroPets Lost & Found board regularly, share listings on your local community Facebook groups and WhatsApp groups, and keep an eye out for described pets in your area.'
        },
        {
          q: 'Who do I contact to rescue an injured street dog in Kathmandu?',
          a: 'For injured street dogs contact KAT Centre (Kathmandu Animal Treatment Centre) or Sneha\'s Care. You can also post on HamroPets Lost & Found to alert the local pet community immediately.'
        },
      ].map((item, i) => (
        <div key={i} style={{ background: '#F9FAFB', borderRadius: 16, border: '2px solid #1A1A1A', padding: isMobile ? '16px' : '20px 24px', boxShadow: '3px 3px 0px #1A1A1A' }}>
          <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, color: '#1A1A1A', marginBottom: 8 }}>❓ {item.q}</div>
          <div style={{ fontSize: isMobile ? 13 : 14, color: '#6B7280', lineHeight: 1.7, fontWeight: 500 }}>{item.a}</div>
        </div>
      ))}
    </div>
  </div>
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
