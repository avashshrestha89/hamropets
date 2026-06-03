import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ListBusiness() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    businessName: '', category: 'Vet Clinic', phone: '', whatsapp: '',
    email: '', address: '', district: 'Kathmandu', description: '',
    ownerName: '', ownerPhone: '', ownerEmail: '',
    googleMapsUrl: '', tier: 'basic',
  })

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/list-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff', fontWeight: 500 }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#000', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 0.3 }

  if (submitted) {
    return (
      <>
        <Head><title>Submitted — HamroPets</title></Head>
        <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 480, padding: '40px' }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#000', marginBottom: 12 }}>Application Received!</h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>
              Thank you! Your business listing is under review. We'll get back to you within 24 hours.
            </p>
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px', border: '2px solid #000', marginBottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>✅ What happens next?</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 8, lineHeight: 1.7 }}>
                Our team reviews your business details.<br />
                Once approved, your listing goes live on HamroPets.<br />
                Pet owners in your area will find you directly.
              </div>
            </div>
            <Link href="/vets" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>← Back to Directory</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>List Your Business — HamroPets</title>
        <meta name="description" content="List your vet clinic, grooming salon or pet service on HamroPets Nepal." />
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
            <Link href="/vets" style={{ color: '#666', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>← Back to Directory</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 28px 80px' }}>

          {/* HEADER */}
          <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🏥 For Businesses</span>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: '#000', margin: '0 0 8px', letterSpacing: -1 }}>List Your Business</h1>
          <p style={{ color: '#666', fontSize: 15, fontWeight: 500, marginBottom: 32 }}>Basic listing is free · Featured placement from NPR 4,000/month</p>

          {/* TIER SELECTOR */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { key: 'basic', label: 'Basic', price: 'Free', desc: 'Name, address, phone', color: '#fff' },
              { key: 'verified', label: 'Verified', price: 'NPR 1,500/mo', desc: 'Logo, hours, WhatsApp button', color: '#E8F9ED' },
              { key: 'featured', label: 'Featured', price: 'NPR 4,000/mo', desc: 'Top placement, photos, reviews', color: '#FFD23F' },
            ].map(t => (
              <div key={t.key} onClick={() => update('tier', t.key)} style={{ background: form.tier === t.key ? t.color : '#fff', borderRadius: 14, border: `2.5px solid ${form.tier === t.key ? '#000' : '#E5E7EB'}`, padding: '16px', cursor: 'pointer', boxShadow: form.tier === t.key ? '3px 3px 0px #000' : 'none', transition: 'all 0.15s' }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: '#000' }}>{t.label}</div>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#FF6B35', marginTop: 2 }}>{t.price}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4, fontWeight: 500 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* STEP INDICATOR */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 32, border: '2px solid #000', borderRadius: 14, overflow: 'hidden', boxShadow: '3px 3px 0px #000' }}>
            {['1. Business Info', '2. Location', '3. Your Contact'].map((s, i) => (
              <div key={s} onClick={() => i + 1 < step && setStep(i + 1)} style={{ flex: 1, padding: '13px 8px', textAlign: 'center', background: step === i + 1 ? '#FFD23F' : step > i + 1 ? '#FFFBDE' : '#fff', color: step === i + 1 ? '#000' : step > i + 1 ? '#92400E' : '#888', fontSize: 13, fontWeight: 800, cursor: i + 1 < step ? 'pointer' : 'default', borderRight: i < 2 ? '2px solid #000' : 'none' }}>
                {step > i + 1 ? '✓ ' : ''}{s}
              </div>
            ))}
          </div>

          {/* STEP 1 — BUSINESS INFO */}
          {step === 1 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Business Name *</label>
                  <input value={form.businessName} onChange={e => update('businessName', e.target.value)} placeholder="e.g. Kathmandu Veterinary Hospital" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select value={form.category} onChange={e => update('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Vet Clinic', 'Grooming', 'Pet Boarding', 'Pet Shop', 'Dog Trainer', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="01-XXXXXXX" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>WhatsApp</label>
                    <input type="tel" value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="clinic@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea rows={4} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Tell pet owners about your services, experience, specialties..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <button onClick={() => { if (!form.businessName || !form.phone) { alert('Please fill in Business Name and Phone.'); return } setStep(2) }} style={{ background: '#FFD23F', color: '#000', padding: '15px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                  Next: Location →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — LOCATION */}
          {step === 2 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Full Address *</label>
                  <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="e.g. Maharajgunj, near Civil Mall" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>District *</label>
                  <select value={form.district} onChange={e => update('district', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Biratnagar', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Google Maps Link (optional)</label>
                  <input value={form.googleMapsUrl} onChange={e => update('googleMapsUrl', e.target.value)} placeholder="https://maps.google.com/..." style={inputStyle} />
                  <div style={{ fontSize: 12, color: '#888', marginTop: 6, fontWeight: 500 }}>Paste your Google Maps link so customers can find you easily</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={() => { if (!form.address) { alert('Please fill in your address.'); return } setStep(3) }} style={{ flex: 2, background: '#FFD23F', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>Next: Your Contact →</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — CONTACT */}
          {step === 3 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Your Full Name *</label>
                  <input value={form.ownerName} onChange={e => update('ownerName', e.target.value)} placeholder="Owner or manager name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Phone *</label>
                  <input type="tel" value={form.ownerPhone} onChange={e => update('ownerPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input type="email" value={form.ownerEmail} onChange={e => update('ownerEmail', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                </div>
                <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #FFD23F', fontSize: 13, color: '#92400E', fontWeight: 600 }}>
                  📋 Your listing will be reviewed before going live. We'll contact you within 24 hours.
                </div>
                {form.tier !== 'basic' && (
                  <div style={{ background: '#E8F9ED', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #58CC02', fontSize: 13, color: '#166534', fontWeight: 600 }}>
                    💳 You selected <strong>{form.tier === 'verified' ? 'Verified (NPR 1,500/mo)' : 'Featured (NPR 4,000/mo)'}</strong>. Our team will contact you to arrange payment after approval.
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={() => { if (!form.ownerName || !form.ownerPhone) { alert('Please fill in your name and phone.'); return } handleSubmit() }} style={{ flex: 2, background: '#FF6B35', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                    🏥 Submit for Review
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#fff', borderTop: '3px solid #000', padding: '28px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#888', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: '#666', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
