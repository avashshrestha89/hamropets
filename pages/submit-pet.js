import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function SubmitPet() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [videoFile, setVideoFile] = useState(null)
  const [imagePreviews, setImagePreviews] = useState([])
  const [form, setForm] = useState({
    petName: '', breed: '', species: 'Dog', gender: 'Male',
    ageYears: '', ageMonths: '', location: 'Kathmandu',
    vaccinated: false, neutered: false, description: '',
    submitterName: '', phone: '', email: '',
  })

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 5)
    setImageFiles(files)
    const previews = files.map(f => URL.createObjectURL(f))
    setImagePreviews(previews)
  }

  const handleVideoSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 20 * 1024 * 1024) {
      alert('Video must be under 20MB')
      return
    }
    setVideoFile(file || null)
  }

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const uploadFile = async (file, folder, resourceType = 'image') => {
    const base64 = await fileToBase64(file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: base64, folder, resourceType }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  }

  const handleSubmit = async () => {
    if (!form.submitterName || !form.phone) {
      alert('Please fill in your name and phone number.')
      return
    }
    setSubmitting(true)
    setUploading(true)

    try {
      // Upload images
      const imageUrls = []
      for (const file of imageFiles) {
        const url = await uploadFile(file, 'hamropets/pets', 'image')
        imageUrls.push(url)
      }

      // Upload video
      let videoUrl = null
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'hamropets/pets', 'video')
      }

      setUploading(false)

      // Submit to Supabase
      const res = await fetch('/api/submit-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: imageUrls,
          videoUrl,
        }),
      })

      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')

    } catch (err) {
      console.error(err)
      alert('Upload failed. Please check your files and try again.')
    }

    setSubmitting(false)
    setUploading(false)
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
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#000', marginBottom: 12 }}>Submission Received!</h1>
            <p style={{ color: '#666', fontSize: 16, lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>
              Thank you! Your pet listing is now under review. We'll approve it within 24 hours.
            </p>
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px', border: '2px solid #000', marginBottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>✅ What happens next?</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 8, lineHeight: 1.7 }}>
                Our team reviews your photos, video and details.<br />
                Once approved, your listing goes live on HamroPets.<br />
                Interested adopters will contact you directly.
              </div>
            </div>
            <Link href="/" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>← Back to Home</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>List a Pet for Adoption — HamroPets</title>
        <meta name="description" content="List your pet for adoption on HamroPets. Free forever." />
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
            <Link href="/" style={{ color: '#666', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 28px 80px' }}>

          {/* HEADER */}
          <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Free Forever</span>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: '#000', margin: '0 0 8px', letterSpacing: -1 }}>List a Pet for Adoption</h1>
          <p style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>Reviewed within 24 hours · Nothing goes live without your approval</p>

          {/* STEP INDICATOR */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 36, border: '2px solid #000', borderRadius: 14, overflow: 'hidden', boxShadow: '3px 3px 0px #000', marginTop: 24 }}>
            {['1. Pet Info', '2. Photos & Video', '3. Your Contact'].map((s, i) => (
              <div key={s} onClick={() => i + 1 < step && setStep(i + 1)} style={{ flex: 1, padding: '13px 8px', textAlign: 'center', background: step === i + 1 ? '#58CC02' : step > i + 1 ? '#E8F9ED' : '#fff', color: step === i + 1 ? '#fff' : step > i + 1 ? '#58CC02' : '#888', fontSize: 13, fontWeight: 800, cursor: i + 1 < step ? 'pointer' : 'default', borderRight: i < 2 ? '2px solid #000' : 'none', transition: 'all 0.2s' }}>
                {step > i + 1 ? '✓ ' : ''}{s}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Pet Name</label>
                    <input value={form.petName} onChange={e => update('petName', e.target.value)} placeholder="e.g. Bruno" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Breed (if known)</label>
                    <input value={form.breed} onChange={e => update('breed', e.target.value)} placeholder="e.g. Labrador Mix" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Species</label>
                    <select value={form.species} onChange={e => update('species', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Gender</label>
                    <select value={form.gender} onChange={e => update('gender', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {['Male', 'Female', 'Unknown'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Age (Years)</label>
                    <input type="number" min="0" max="30" value={form.ageYears} onChange={e => update('ageYears', e.target.value)} placeholder="0" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Age (Months)</label>
                    <input type="number" min="0" max="11" value={form.ageMonths} onChange={e => update('ageMonths', e.target.value)} placeholder="6" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <select value={form.location} onChange={e => update('location', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Biratnagar', 'Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                  {[['💉 Vaccinated', 'vaccinated'], ['✂️ Neutered / Spayed', 'neutered']].map(([label, field]) => (
                    <label key={field} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#000', fontWeight: 700 }}>
                      <input type="checkbox" checked={form[field]} onChange={e => update(field, e.target.checked)} style={{ width: 20, height: 20, accentColor: '#58CC02', cursor: 'pointer' }} />
                      {label}
                    </label>
                  ))}
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea rows={5} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Tell us about this pet — personality, story, why they need a new home, any special needs..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <button onClick={() => { if (!form.petName || !form.description) { alert('Please fill in Pet Name and Description.'); return } setStep(2) }} style={{ background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                  Next: Add Photos & Video →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={labelStyle}>Photos (up to 5)</label>
                  <div style={{ border: '3px dashed #58CC02', borderRadius: 16, padding: '32px', textAlign: 'center', background: '#F0FDF4', cursor: 'pointer', position: 'relative' }}>
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} onChange={handleImageSelect} />
                    <div style={{ fontSize: 44, marginBottom: 10 }}>📸</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#58CC02' }}>Click to upload photos</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 6, fontWeight: 500 }}>JPG, PNG, WEBP · Up to 5 photos · Max 10MB each</div>
                  </div>
                  {imagePreviews.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                      {imagePreviews.map((src, i) => (
                        <img key={i} src={src} alt={`preview ${i}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, border: '2px solid #000' }} />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Video (optional)</label>
                  <div style={{ border: '3px dashed #7B5EA7', borderRadius: 16, padding: '28px', textAlign: 'center', background: '#F5F0FF', cursor: 'pointer', position: 'relative' }}>
                    <input type="file" accept="video/mp4" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} onChange={handleVideoSelect} />
                    <div style={{ fontSize: 44, marginBottom: 10 }}>🎥</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#7B5EA7' }}>Click to upload a video</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 6, fontWeight: 500 }}>MP4 only · Max 20MB</div>
                    {videoFile && <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: '#7B5EA7' }}>✓ {videoFile.name}</div>}
                  </div>
                </div>
                <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #FFD23F', fontSize: 13, color: '#92400E', fontWeight: 600 }}>
                  📋 All photos and videos reviewed by admin before listing goes live.
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>Next: Contact Info →</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Your Full Name *</label>
                  <input value={form.submitterName} onChange={e => update('submitterName', e.target.value)} placeholder="Full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email (optional)</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                </div>
                <div style={{ background: '#E8F9ED', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #58CC02', fontSize: 13, color: '#166534', fontWeight: 600 }}>
                  ✅ Contact info only shared with adopters after admin approval.
                </div>
                <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #FFD23F', fontSize: 13, color: '#92400E', fontWeight: 600 }}>
                  ⚠️ HamroPets never charges adoption fees. Report suspicious requests.
                </div>
                {uploading && (
                  <div style={{ background: '#E8F9ED', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #58CC02', fontSize: 14, color: '#166534', fontWeight: 700, textAlign: 'center' }}>
                    ⬆️ Uploading your photos and video... please wait
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} disabled={submitting} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, background: '#FF6B35', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? (uploading ? '⬆️ Uploading...' : '🐾 Saving...') : '🐾 Submit for Review'}
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
