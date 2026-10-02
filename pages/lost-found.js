import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LostFound() {
  const [isMobile, setIsMobile] = useState(false)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(null)
  const [formStep, setFormStep] = useState(1)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedId, setSubmittedId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [form, setForm] = useState({
    type: '', petName: '', species: '', breed: '',
    gender: '', age: '', color: '', collarDescription: '',
    distinctiveMarks: '', temperament: '', lastSeenDate: '',
    lastSeenTime: '', area: '', landmark: '', knownHaunts: '',
    rewardOffered: '', condition: '', canFoster: '',
    contactName: '', contactPhone: '', contactWhatsapp: '',
    description: '',
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
        } catch (err) { alert('Upload failed: ' + err.message) }
        setUploading(false)
      }
      reader.onerror = () => { alert('File read failed.'); setUploading(false) }
      reader.readAsDataURL(file)
    } catch (err) { alert('Upload failed: ' + err.message); setUploading(false) }
  }

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/lost-found?type=${filter}`)
      const data = await res.json()
      setListings(data.listings || [])
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  useEffect(() => { fetchListings() }, [filter])

  const resetForm = (type) => {
    setShowForm(type)
    setFormStep(1)
    setSubmitted(false)
    setSubmittedId(null)
    setImageUrl(null)
    setForm({
      type, petName: '', species: '', breed: '', gender: '', age: '',
      color: '', collarDescription: '', distinctiveMarks: '', temperament: '',
      lastSeenDate: '', lastSeenTime: '', area: '', landmark: '', knownHaunts: '',
      rewardOffered: '', condition: '', canFoster: '',
      contactName: '', contactPhone: '', contactWhatsapp: '', description: '',
      boostTier: 'free',
    })
  }

  const handleSubmit = async () => {
    if (!form.area || !form.contactName || !form.contactPhone) {
      alert('Please fill in all required fields.')
      return
    }
    // If paid tier selected — open WhatsApp with pre-filled message
    if (form.boostTier === 'boost' || form.boostTier === 'shield') {
      const amount = form.boostTier === 'boost' ? 'NPR 199' : 'NPR 499'
      const tierName = form.boostTier === 'boost' ? 'Social Boost' : 'Emergency Shield'
      const msg = encodeURIComponent(`Hi HamroPets! I want to activate the ${tierName} (${amount}) for my lost pet report.\n\nPet: ${form.petName || 'Unknown'}\nSpecies: ${form.species}\nLocation: ${form.area}\nContact: ${form.contactName} — ${form.contactPhone}\n\nI am sending payment to 9851221428 now. Please activate my boost after confirming payment.`)
      // Save the listing as pending_payment first
      setSubmitting(true)
      try {
        const res = await fetch('/api/lost-found', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, imageUrl, status: 'pending_payment' }),
        })
        if (res.ok) {
          setShowForm(null)
          setSubmitted(true)
          // Open WhatsApp
          window.open(`https://wa.me/9779851405178?text=${msg}`, '_blank')
        } else {
          alert('Something went wrong. Please try again.')
        }
      } catch (err) { alert('Something went wrong. Please try again.') }
      setSubmitting(false)
      return
    }
    // Free tier — submit normally
    setSubmitting(true)
    try {
      const res = await fetch('/api/lost-found', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageUrl }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
        setSubmittedId(data.id || null)
        setShowForm(null)
        fetchListings()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) { alert('Something went wrong. Please try again.') }
    setSubmitting(false)
  }

  const inputStyle = { width: '100%', padding: '11px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }
  const labelStyle = { fontSize: 12, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }
  const isLost = showForm === 'lost'
  const color = isLost ? '#FF6B9D' : '#58CC02'

  return (
    <>
      <Head>
        <title>Lost & Found Pets Nepal — Report Missing or Found Pets | HamroPets</title>
        <meta name="description" content="Report a lost or found pet in Nepal. Help reunite missing dogs and cats with their families across Kathmandu Valley. Free community service by Adopt a Dog Nepal since 2018." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="content-language" content="en-NP, ne-NP" />
    <link rel="canonical" href="https://www.hamropets.com/lost-found" />
        <meta name="keywords" content="lost dog Kathmandu, found dog Nepal, missing cat Kathmandu, lost pet Nepal, harayeko kukur, report lost dog Nepal, found pet Kathmandu, lost and found pets Nepal" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Lost & Found Pets Nepal — Help Reunite Pets | HamroPets" />
        <meta property="og:description" content="Report a lost or found pet in Nepal. Free community service by Adopt a Dog Nepal since 2018." />
        <meta property="og:url" content="https://www.hamropets.com/lost-found" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png" />
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
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found']].map(([label, href]) => (
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
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found']].map(([label, href]) => (
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
              <button onClick={() => resetForm('lost')} style={{ background: '#FF6B9D', color: '#fff', padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 13 : 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', whiteSpace: 'nowrap' }}>🔴 I Lost My Pet</button>
              <button onClick={() => resetForm('found')} style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 13 : 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534', whiteSpace: 'nowrap' }}>🟢 I Found a Pet</button>
            </div>
          </div>

          {/* SUCCESS MESSAGE + BOOST OFFER */}
          {submitted && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px', border: '2px solid #58CC02', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>✅</span>
                <div>
                                <div style={{ fontWeight: 900, fontSize: isMobile ? 15 : 17, color: '#1A1A1A', marginBottom: 4 }}>
                {form.boostTier === 'free' ? 'Report submitted! / रिपोर्ट पेश भयो!' : 'Payment request sent! / भुक्तानी अनुरोध पठाइयो!'}
              </div>
              <div style={{ fontSize: isMobile ? 12 : 14, color: '#6B7280', fontWeight: 500 }}>
                {form.boostTier === 'free' 
                  ? 'Our team will review and approve shortly. Share on WhatsApp/Facebook to spread the word.'
                  : 'Complete your payment on WhatsApp. We will activate your boost within 2-4 hours after payment confirmation.'}
              </div>
                </div>
              </div>

              {/* BOOST OFFER — shown after submission */}
              <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #FF6B9D', padding: isMobile ? '20px 16px' : '28px 32px', boxShadow: '5px 5px 0px #1A1A1A' }}>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 20, color: '#1A1A1A', marginBottom: 6 }}>🚀 Want to find your pet faster?</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, fontWeight: 500 }}>
                  Your report is live for free. If you want to reach our 91K+ followers urgently, choose a boost below. Every rupee supports street animal rescue. / तपाईंको रिपोर्ट निःशुल्क छ। थप मानिससम्म पुर्‍याउन Boost छान्नुहोस्।
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { id: 'free', label: '🐾 Free — Already Live', price: 'NPR 0', desc: 'Visible on HamroPets · Share yourself on WhatsApp/Facebook', color: '#58CC02' },
                    { id: 'boost', label: '📢 Social Boost', price: 'NPR 199', desc: 'TikTok + Instagram + Facebook post to 91K followers · Swor AI Nepali voiceover video', color: '#38BDF8' },
                    { id: 'shield', label: '🛡️ Emergency Shield', price: 'NPR 499', desc: 'Everything in Boost + PDF printable poster + WhatsApp broadcast + Homepage featured', color: '#FF6B9D' },
                  ].map(tier => (
                    <div key={tier.id} style={{ background: '#F9FAFB', borderRadius: 14, padding: '14px 16px', border: `2px solid ${tier.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, fontSize: 14, color: '#1A1A1A' }}>{tier.label}</span>
                        <span style={{ fontWeight: 900, fontSize: 15, color: tier.id === 'free' ? '#58CC02' : '#1A1A1A' }}>{tier.price}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{tier.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '16px', border: '2px solid #FFD23F' }}>
                  <div style={{ fontWeight: 900, fontSize: 14, color: '#1A1A1A', marginBottom: 8 }}>💳 To activate Social Boost (NPR 199) or Emergency Shield (NPR 499):</div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.8 }}>
                    Send payment to eSewa / Khalti: <strong>9851221428</strong> (HamroPets)<br />
                    Then WhatsApp your payment screenshot to <strong>9851221428</strong><br />
                    <span style={{ fontSize: 11, color: '#6B7280' }}>We will activate your boost within 2-4 hours. No payment needed for Free tier. / निःशुल्क tier को लागि भुक्तानी आवश्यक छैन।</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORT FORM */}
          {showForm && (
            <div style={{ background: '#fff', borderRadius: 20, border: `3px solid ${color}`, padding: isMobile ? '20px 16px' : '32px', marginBottom: 28, boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>
                  {isLost ? '🔴 Report a Lost Pet / हराएको पाल्तु जनावर रिपोर्ट गर्नुहोस्' : '🟢 Report a Found Pet / भेटिएको पाल्तु जनावर रिपोर्ट गर्नुहोस्'}
                </h3>
                <button onClick={() => setShowForm(null)} style={{ background: '#F3F4F6', border: '2px solid #1A1A1A', borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', fontWeight: 700, flexShrink: 0 }}>✕</button>
              </div>

              {/* STEP INDICATOR */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {['Required Info', 'More Details'].map((s, i) => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: formStep > i ? color : '#E5E7EB' }} />
                ))}
              </div>

              {/* STEP 1 — REQUIRED */}
              {formStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* PHOTO */}
                  <div>
                    <label style={labelStyle}>Pet Photo * / पाल्तु जनावरको फोटो *</label>
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
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A' }}>Upload a clear photo / स्पष्ट फोटो अपलोड गर्नुहोस्</div>
                          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>JPG or PNG</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Species * / प्रजाति *</label>
                      <select value={form.species} onChange={e => update('species', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select / छान्नुहोस्</option>
                        {['Dog / कुकुर', 'Cat / बिरालो', 'Bird / चरा', 'Rabbit / खरायो', 'Other / अन्य'].map(o => <option key={o} value={o.split('/')[0].trim()}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        {isLost ? 'Date Last Seen * / अन्तिम पटक देखिएको मिति *' : 'Date Found * / भेटिएको मिति *'}
                      </label>
                      <input type="date" value={form.lastSeenDate} onChange={e => update('lastSeenDate', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        {isLost ? 'Last Seen Location * / अन्तिम ठेगाना *' : 'Found Location * / भेटिएको ठाउँ *'}
                      </label>
                      <input value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. Lazimpat, Kathmandu" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Landmark / नजिकको चिनारी ठाउँ</label>
                      <input value={form.landmark} onChange={e => update('landmark', e.target.value)} placeholder="e.g. Near Bhatbhateni, Naxal" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Your Phone * / फोन नम्बर *</label>
                      <input type="tel" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Your Name * / तपाईंको नाम *</label>
                      <input value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Full name" style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Description * / विवरण *</label>
                    <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder={isLost ? 'Color, size, breed, any distinctive features...' : 'Describe the pet — color, size, condition...'} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                  </div>

                  <button onClick={() => setFormStep(2)} style={{ background: color, color: '#fff', padding: '13px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A' }}>
                    Next: Add More Details → / थप विवरण →
                  </button>
              
                </div>
              )}

              {/* STEP 2 — OPTIONAL DETAILS */}
              {formStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: '#F0FDF4', borderRadius: 12, padding: '12px 16px', border: '1.5px solid #58CC02', fontSize: 13, color: '#166534', fontWeight: 600 }}>
                    ✅ Required info saved! These extra details help find your pet faster. All optional. / आवश्यक जानकारी सेभ भयो! थप विवरणले छिटो खोज्न मद्दत गर्छ।
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                    {isLost && (
                      <div>
                        <label style={labelStyle}>Pet Name / पाल्तु जनावरको नाम</label>
                        <input value={form.petName} onChange={e => update('petName', e.target.value)} placeholder="e.g. Bruno" style={inputStyle} />
                      </div>
                    )}
                    <div>
                      <label style={labelStyle}>Breed / नस्ल</label>
                      <input value={form.breed} onChange={e => update('breed', e.target.value)} placeholder="e.g. Labrador, Mixed breed" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Gender / लिङ्ग</label>
                      <select value={form.gender} onChange={e => update('gender', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select</option>
                        <option value="Male">Male / नर</option>
                        <option value="Female">Female / मादा</option>
                        <option value="Unknown">Unknown / थाहा छैन</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Color & Markings / रङ र चिन्ह</label>
                      <input value={form.color} onChange={e => update('color', e.target.value)} placeholder="e.g. Brown with white patch on chest" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Collar Description / कलरको विवरण</label>
                      <input value={form.collarDescription} onChange={e => update('collarDescription', e.target.value)} placeholder="e.g. Red nylon collar with bell, No collar" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Temperament / स्वभाव</label>
                      <select value={form.temperament} onChange={e => update('temperament', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select</option>
                        <option value="Friendly">Friendly — will approach anyone / मिलनसार</option>
                        <option value="Shy">Shy — may run away / डरपोक</option>
                        <option value="Aggressive">Aggressive when scared / डर लाग्दा आक्रामक</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Time Last Seen / अन्तिम पटक देखिएको समय</label>
                      <input type="time" value={form.lastSeenTime} onChange={e => update('lastSeenTime', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp / ह्वाट्सएप</label>
                      <input type="tel" value={form.contactWhatsapp} onChange={e => update('contactWhatsapp', e.target.value)} placeholder="Same as phone or different" style={inputStyle} />
                    </div>
                  </div>

                  {isLost && (
                    <div>
                      <label style={labelStyle}>Known Haunts / दैनिक जाने ठाउँहरू</label>
                      <input value={form.knownHaunts} onChange={e => update('knownHaunts', e.target.value)} placeholder="e.g. Goes to the park near Ratnapark every evening" style={inputStyle} />
                    </div>
                  )}

                  {isLost && (
                    <div>
                      <label style={labelStyle}>Reward Offered / इनाम</label>
                      <input value={form.rewardOffered} onChange={e => update('rewardOffered', e.target.value)} placeholder="e.g. NPR 5,000 reward offered (optional)" style={inputStyle} />
                    </div>
                  )}

                  {!isLost && (
                    <>
                      <div>
                        <label style={labelStyle}>Condition of Pet / पाल्तु जनावरको अवस्था</label>
                        <select value={form.condition} onChange={e => update('condition', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option value="">Select</option>
                          <option value="Healthy">Healthy / स्वस्थ</option>
                          <option value="Injured">Injured / घाइते</option>
                          <option value="Scared">Scared / डराएको</option>
                          <option value="Hungry">Hungry / भोकाएको</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Can you temporarily hold the pet? / पाल्तु जनावर केही समय राख्न सक्नुहुन्छ?</label>
                        <select value={form.canFoster} onChange={e => update('canFoster', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option value="">Select</option>
                          <option value="Yes">Yes / हो</option>
                          <option value="Few hours">For a few hours only / केही घण्टाका लागि</option>
                          <option value="No">No / होइन</option>
                        </select>
                      </div>
                    </>
                  )}

                                {/* BOOST TIER SELECTION */}
                  <div style={{ background: '#F9FAFB', borderRadius: 16, border: '2px solid #1A1A1A', padding: '20px', marginTop: 8 }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 4 }}>🚀 Want to find your pet faster?</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14, fontWeight: 500 }}>
                      Your report goes live free. A boost reaches our 91K+ followers urgently. Every rupee supports street animal rescue.<br />
                      <span style={{ fontSize: 11 }}>तपाईंको रिपोर्ट निःशुल्क प्रकाशित हुन्छ। Boost ले ९१ हजार+ मानिससम्म छिट्टै पुर्‍याउँछ।</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                      {[
                        { id: 'free', label: '🐾 Basic Community Report', labelNp: 'साधारण रिपोर्ट (निःशुल्क)', price: 'NPR 0', desc: 'Instant website listing with a shareable lost-pet link for your neighborhood · Best if you plan to share manually. For 20X more reach, consider Social Boost or Emergency Shield below.', color: '#58CC02' },
                        { id: 'boost', label: '📢 Social Boost', labelNp: 'सोसल बुस्ट', price: 'NPR 199', desc: 'TikTok + Instagram + Facebook post to 91K followers · Swor AI Nepali voiceover video', color: '#38BDF8' },
                        { id: 'shield', label: '🛡️ Emergency Shield', labelNp: 'इमर्जेन्सी शिल्ड', price: 'NPR 499', desc: 'Everything in Boost + PDF printable poster + WhatsApp broadcast to rescue networks + Homepage featured', color: '#FF6B9D' },
                      ].map(tier => (
                        <div key={tier.id} onClick={() => update('boostTier', tier.id)} style={{ background: form.boostTier === tier.id ? `${tier.color}15` : '#fff', borderRadius: 12, padding: '12px 16px', border: `2px solid ${form.boostTier === tier.id ? tier.color : '#E5E7EB'}`, cursor: 'pointer', boxShadow: form.boostTier === tier.id ? `3px 3px 0px ${tier.color}` : 'none', transition: 'all 0.2s' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                            <div>
                              <span style={{ fontWeight: 900, fontSize: 13, color: '#1A1A1A' }}>{tier.label}</span>
                              <span style={{ fontSize: 11, color: '#6B7280', marginLeft: 6 }}>{tier.labelNp}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 900, fontSize: 14, color: tier.id === 'free' ? '#58CC02' : '#1A1A1A' }}>{tier.price}</span>
                              <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${form.boostTier === tier.id ? tier.color : '#D1D5DB'}`, background: form.boostTier === tier.id ? tier.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {form.boostTier === tier.id && <div style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{tier.desc}</div>
                        </div>
                      ))}
                    </div>

                    {/* PAYMENT INSTRUCTIONS */}
                    {(form.boostTier === 'boost' || form.boostTier === 'shield') && (
                      <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '14px 16px', border: '2px solid #FFD23F', marginBottom: 16 }}>
                        <div style={{ fontWeight: 900, fontSize: 13, color: '#1A1A1A', marginBottom: 6 }}>💳 Payment / भुक्तानी</div>
                        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.8 }}>
                          Amount: <strong>{form.boostTier === 'boost' ? 'NPR 199' : 'NPR 499'}</strong><br />
                          eSewa / Khalti: <strong>9851221428</strong> (HamroPets)<br />
                          After payment send screenshot to WhatsApp: <strong>9851405178</strong><br />
                          <span style={{ fontSize: 11, color: '#6B7280' }}>We activate your boost within 2-4 hours. / हामी २-४ घण्टाभित्र activate गर्छौं।</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setFormStep(1)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                    <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, background: color, color: '#fff', padding: '13px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Processing...' : form.boostTier === 'free' ? 'Submit Report / रिपोर्ट पेश गर्नुहोस्' : `Send Payment via WhatsApp → ${form.boostTier === 'boost' ? 'NPR 199' : 'NPR 499'}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {[['all', 'All / सबै'], ['lost', '🔴 Lost / हराएको'], ['found', '🟢 Found / भेटिएको']].map(([key, label]) => (
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
                    <div style={{ height: isMobile ? 200 : 240, background: item.type === 'lost' ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 52, position: 'relative', borderBottom: '2px solid #1A1A1A' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.pet_name || 'Pet'} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} />
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
                      <div style={{ fontSize: isMobile ? 11 : 13, color: '#555', marginTop: 6, lineHeight: 1.5, fontWeight: 500 }}>{item.description?.substring(0, 80)}{item.description?.length > 80 ? '...' : ''}</div>
                      <div style={{ marginTop: 10, background: item.type === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', padding: '8px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 800, textAlign: 'center', boxShadow: '2px 2px 0px #1A1A1A' }}>
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
                { q: 'How do I report a missing dog in Kathmandu?', a: 'Click "I Lost My Pet" on this page, upload a clear photo, provide the last known location and landmark, and your contact details. Your report goes live immediately.' },
                { q: 'What should I do if I find a lost pet in Nepal?', a: 'Secure the animal safely, take a clear photo, and click "I Found a Pet". Include where you found it, the pet\'s condition, and whether you can temporarily hold it.' },
                { q: 'Is there a fee to post a lost pet on HamroPets?', a: 'No. Posting a lost or found pet is completely free. Optional paid boosts are available to reach our 91K followers faster — but your report is always live for free.' },
                { q: 'How can I help find missing pets in my neighborhood?', a: 'Check the HamroPets Lost & Found board regularly and share listings on your local WhatsApp and Facebook groups. Every share helps.' },
                { q: 'Who do I contact to rescue an injured street dog in Kathmandu?', a: 'Contact KAT Centre (Kathmandu Animal Treatment Centre) or Sneha\'s Care. You can also post on HamroPets Lost & Found to alert the local pet community immediately.' },
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
