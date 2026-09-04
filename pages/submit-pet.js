import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function SubmitPet() {
  const [step, setStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imageFiles, setImageFiles] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [imagePreviews, setImagePreviews] = useState([])
  const [form, setForm] = useState({
    // Owner details
    ownerName: '',
    ownerPhone: '',
    ownerWhatsapp: '',
    ownerEmail: '',
    ownerAddress: '',
    // Pet details
    petName: '',
    petAge: '',
    breed: '',
    species: 'Dog',
    gender: 'Female',
    vaccinated: '',
    neutered: '',
    friendlyChildren: '',
    friendlyDogs: '',
    // Additional
    description: '',
    reasonForAdoption: '',
    otherInfo: '',
    // Agreements
    agreeTerms: false,
    agreeContact: false,
    // Package
    boostTier: 'free',
  })

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

const handleImageSelect = (e) => {
    const files = Array.from(e.target.files).slice(0, 5)
    if (files.length === 0) return
    setImageFiles(prev => {
      const combined = [...prev, ...files].slice(0, 5)
      return combined
    })
    setImagePreviews(prev => {
      const newPreviews = files.map(f => URL.createObjectURL(f))
      return [...prev, ...newPreviews].slice(0, 5)
    })
  }

const compressImage = (file) => {
    return new Promise((resolve) => {
      if (file.type.startsWith('video/')) { resolve(file); return }
      const canvas = document.createElement('canvas')
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const maxSize = 1000
        let width = img.width
        let height = img.height
        if (width > maxSize || height > maxSize) {
          if (width > height) { height = (height / width) * maxSize; width = maxSize }
          else { width = (width / height) * maxSize; height = maxSize }
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }))
        }, 'image/jpeg', 0.7)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }

const uploadToCloudinary = async (file, resourceType = 'image') => {
    const processedFile = resourceType === 'image' ? await compressImage(file) : file
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const base64 = e.target.result
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              file: base64,
              folder: 'pets',
              resourceType,
            }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error || 'Upload failed')
          resolve(data.url)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error('File read failed'))
      reader.readAsDataURL(processedFile)
    })
  }

  const handleSubmit = async () => {
    if (!form.agreeTerms || !form.agreeContact) {
      alert('Please agree to both terms before submitting. / सबमिट गर्नु अघि कृपया दुवै सर्तहरूमा सहमत हुनुहोला।')
      return
    }
    if (!form.ownerName || !form.ownerPhone) {
      alert('Please fill in your name and phone number. / कृपया आफ्नो नाम र फोन नम्बर भर्नुहोला।')
      return
    }
    setSubmitting(true)
    setUploading(true)
    try {
      const imageUrls = []
      for (const file of imageFiles) {
        const url = await uploadToCloudinary(file, 'image')
        imageUrls.push(url)
      }
    
      setUploading(false)
      const res = await fetch('/api/submit-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petName: form.petName,
          breed: form.breed,
          species: form.species,
          gender: form.gender,
          ageYears: '',
          ageMonths: '',
          petAge: form.petAge,
          location: form.ownerAddress,
          vaccinated: form.vaccinated === 'yes',
          neutered: form.neutered === 'yes',
          friendlyChildren: form.friendlyChildren,
          friendlyDogs: form.friendlyDogs,
          description: form.description,
          reasonForAdoption: form.reasonForAdoption,
          otherInfo: form.otherInfo,
          submitterName: form.ownerName,
          phone: form.ownerPhone,
          whatsapp: form.ownerWhatsapp,
          email: form.ownerEmail,
          address: form.ownerAddress,
          images: imageUrls,
                videoUrl,
          boostTier: form.boostTier,
        }),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again. / केही गडबड भयो। कृपया पुनः प्रयास गर्नुहोला।')
    } catch (err) {
      console.error(err)
      alert('Upload failed: ' + err.message)
    }
    setSubmitting(false)
    setUploading(false)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff', fontWeight: 500 }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#000', display: 'block', marginBottom: 7 }
  const sectionTitle = (en, np) => (
    <div style={{ marginBottom: 20, paddingBottom: 10, borderBottom: '2px solid #000' }}>
      <div style={{ fontWeight: 900, fontSize: 18, color: '#000' }}>{en}</div>
      <div style={{ fontWeight: 600, fontSize: 14, color: '#666', marginTop: 2 }}>{np}</div>
    </div>
  )
  const radioGroup = (field, options) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(([value, en, np]) => (
        <label key={value} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '10px 14px', borderRadius: 10, border: `2px solid ${form[field] === value ? '#000' : '#E5E7EB'}`, background: form[field] === value ? '#F0FDF4' : '#fff' }}>
          <input type="radio" name={field} value={value} checked={form[field] === value} onChange={() => update(field, value)} style={{ marginTop: 2, accentColor: '#58CC02', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#000' }}>{en}</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: '#666' }}>{np}</div>
          </div>
        </label>
      ))}
    </div>
  )

  if (submitted) {
    return (
      <>
        <Head><title>Submitted — HamroPets</title></Head>
        <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 520, padding: '40px' }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#000', marginBottom: 12 }}>Submission Received!</h1>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#000', marginBottom: 4 }}>सबमिसन प्राप्त भयो!</p>
            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 8, fontWeight: 500 }}>
              Thank you! Your pet listing is now under review. We'll approve it within 24 hours.
            </p>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, marginBottom: 32, fontWeight: 500 }}>
              धन्यवाद! तपाईंको पाल्तु जनावरको सूची अहिले समीक्षाधीन छ। हामी २४ घण्टाभित्र स्वीकृत गर्नेछौं।
            </p>
            <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '20px', border: '2px solid #000', marginBottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#000', marginBottom: 8 }}>✅ What happens next? / अब के हुन्छ?</div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.8, fontWeight: 500 }}>
                Our team reviews your submission · हाम्रो टोलीले तपाईंको सबमिसन समीक्षा गर्छ।<br />
                Once approved, your listing goes live · स्वीकृत भएपछि, तपाईंको सूची सार्वजनिक हुन्छ।<br />
                Interested adopters will contact you · इच्छुक दत्तकग्राहीहरूले तपाईंलाई सम्पर्क गर्नेछन्।
              </div>
            </div>
            <Link href="/" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>← Back to Home / गृहपृष्ठमा फर्कनुहोस्</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Submit a Pet for Adoption — HamroPets</title>
        <meta name="description" content="Submit your pet for adoption on HamroPets Nepal. Free forever." />
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
            <Link href="/" style={{ color: '#666', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>← Back to Home / गृहपृष्ठमा फर्कनुहोस्</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 28px 80px' }}>

          {/* HEADER */}
          <div style={{ marginBottom: 36 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Free Forever / सधैं निःशुल्क</span>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: '0 0 4px', letterSpacing: -1 }}>Submit a Pet for Adoption</h1>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#000', margin: '0 0 8px' }}>गोद दिनको लागि पाल्तु जनावर सबमिट गर्नुहोस्</p>
            <p style={{ color: '#666', fontSize: 14, fontWeight: 500 }}>Reviewed within 24 hours · Nothing goes live without approval · २४ घण्टाभित्र समीक्षा · स्वीकृति बिना केही सार्वजनिक हुँदैन</p>
          </div>

          {/* STEP INDICATOR */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 36, border: '2px solid #000', borderRadius: 14, overflow: 'hidden', boxShadow: '3px 3px 0px #000' }}>
            {['1. Owner Info', '2. Pet Details', '3. Photos & Video', '4. Submit'].map((s, i) => (
              <div key={s} onClick={() => i + 1 < step && setStep(i + 1)} style={{ flex: 1, padding: '11px 6px', textAlign: 'center', background: step === i + 1 ? '#58CC02' : step > i + 1 ? '#E8F9ED' : '#fff', color: step === i + 1 ? '#fff' : step > i + 1 ? '#58CC02' : '#888', fontSize: 12, fontWeight: 800, cursor: i + 1 < step ? 'pointer' : 'default', borderRight: i < 3 ? '2px solid #000' : 'none' }}>
                {step > i + 1 ? '✓ ' : ''}{s}
              </div>
            ))}
          </div>

          {/* STEP 1 — OWNER INFO */}
          {step === 1 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              {sectionTitle('Owner / Care-taker Details', 'मालिक / हेरचाहकर्ताको विवरण')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Full Name / पूरा नाम *</label>
                  <input value={form.ownerName} onChange={e => update('ownerName', e.target.value)} placeholder="Your full name / तपाईंको पूरा नाम" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number / फोन नम्बर *</label>
                  <input type="tel" value={form.ownerPhone} onChange={e => update('ownerPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp / Viber Number / WhatsApp/Viber नम्बर</label>
                  <input type="tel" value={form.ownerWhatsapp} onChange={e => update('ownerWhatsapp', e.target.value)} placeholder="98XXXXXXXX (if different / फरक भएमा)" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address / इमेल ठेगाना *</label>
                  <input type="email" value={form.ownerEmail} onChange={e => update('ownerEmail', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Current Address / हालको ठेगाना *</label>
                  <input value={form.ownerAddress} onChange={e => update('ownerAddress', e.target.value)} placeholder="e.g. Lalitpur, Kathmandu / जस्तै: ललितपुर, काठमाडौं" style={inputStyle} />
                </div>
                <button onClick={() => { if (!form.ownerName || !form.ownerPhone || !form.ownerEmail || !form.ownerAddress) { alert('Please fill all required fields. / कृपया सबै आवश्यक फिल्डहरू भर्नुहोला।'); return } setStep(2) }} style={{ background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                  Next: Pet Details / अर्को: पाल्तु जनावरको विवरण →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — PET DETAILS */}
          {step === 2 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              {sectionTitle('Pet / Dog Details', 'पाल्तु जनावर / कुकुरको विवरण')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Pet Name / पाल्तु जनावरको नाम *</label>
                    <input value={form.petName} onChange={e => update('petName', e.target.value)} placeholder="e.g. Bruno / जस्तै: ब्रुनो" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Age / उमेर *</label>
                    <input value={form.petAge} onChange={e => update('petAge', e.target.value)} placeholder="e.g. 6 months / जस्तै: ६ महिना" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Breed / जात</label>
                    <input value={form.breed} onChange={e => update('breed', e.target.value)} placeholder="e.g. Labrador Mix / जस्तै: ल्याब्राडोर मिक्स" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Species / प्रजाति</label>
                    <select value={form.species} onChange={e => update('species', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {[['Dog', 'कुकुर'], ['Cat', 'बिरालो'], ['Bird', 'चरा'], ['Rabbit', 'खरायो'], ['Other', 'अन्य']].map(([en, np]) => (
                        <option key={en} value={en}>{en} / {np}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Gender / लिङ्ग *</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {[['Male', 'भाले / नर'], ['Female', 'पोथी / मादा']].map(([val, np]) => (
                      <button key={val} onClick={() => update('gender', val)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `2px solid ${form.gender === val ? '#000' : '#E5E7EB'}`, background: form.gender === val ? '#58CC02' : '#fff', color: form.gender === val ? '#fff' : '#666', cursor: 'pointer', fontSize: 14, fontWeight: 800, fontFamily: 'inherit' }}>
                        {val} / {np}
                      </button>
                    ))}
                  </div>
                </div>

                {/* VACCINATION */}
                <div>
                  <label style={labelStyle}>Vaccination Status / खोपको अवस्था *</label>
                  {radioGroup('vaccinated', [
                    ['yes', 'Up to Date — All vaccines completed ✅', 'पूर्ण रूपमा लगाइएको — सबै खोपहरू पूरा भएको ✅'],
                    ['partial', 'Partially Vaccinated', 'आंशिक रूपमा खोप लगाइएको'],
                    ['no', 'Not Vaccinated ❌', 'खोप लगाइएको छैन ❌'],
                    ['unknown', "I don't know / थाहा छैन", 'थाहा छैन'],
                  ])}
                </div>

                {/* NEUTERED */}
                <div>
                  <label style={labelStyle}>Spayed / Neutered? / बाँझोपन गरिएको छ? *</label>
                  {radioGroup('neutered', [
                    ['yes', 'Yes / गरिएको छ ✅', 'गरिएको छ ✅'],
                    ['no', 'No / गरिएको छैन ❌', 'गरिएको छैन ❌'],
                    ['unknown', "I don't know / थाहा छैन", 'थाहा छैन'],
                  ])}
                </div>

                {/* FRIENDLY WITH CHILDREN */}
                <div>
                  <label style={labelStyle}>Friendly with Children? / बच्चाहरूसँग मिल्छ? *</label>
                  {radioGroup('friendlyChildren', [
                    ['yes', 'Yes, very friendly with children / छ, बच्चाहरूसँग धेरै मिल्छ', 'छ, बच्चाहरूसँग धेरै मिल्छ'],
                    ['no', 'No, not recommended with children / छैन, बच्चाहरूसँग उपयुक्त छैन', 'छैन'],
                    ['unknown', "I don't know / थाहा छैन", 'थाहा छैन'],
                  ])}
                </div>

                {/* FRIENDLY WITH DOGS */}
                <div>
                  <label style={labelStyle}>Friendly with Other Dogs? / अन्य कुकुरहरूसँग मिल्छ? *</label>
                  {radioGroup('friendlyDogs', [
                    ['yes', 'Yes, gets along well with other dogs / छ, अन्य कुकुरहरूसँग राम्रोसँग मिल्छ', 'छ'],
                    ['no', 'No, prefers to be the only pet / छैन, एक्लै बस्न मन पराउँछ', 'छैन'],
                    ['unknown', "I don't know / थाहा छैन", 'थाहा छैन'],
                  ])}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label style={labelStyle}>
                    Short Description & Temperament / छोटो विवरण र स्वभाव *
                  </label>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500 }}>
                    Describe personality, habits, known commands, special needs / व्यक्तित्व, बानीव्यहोरा, थाहा भएका आदेशहरू, विशेष आवश्यकताहरू वर्णन गर्नुहोस्
                  </p>
                  <textarea rows={5} value={form.description} onChange={e => update('description', e.target.value)} placeholder="e.g. Bruno is playful, loves fetch, good with kids... / जस्तै: ब्रुनो खेल्न मन पराउँछ, बच्चाहरूसँग राम्रो छ..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>

                {/* REASON */}
                <div>
                  <label style={labelStyle}>Why do you want to put your pet for adoption? / किन गोद दिन चाहनुहुन्छ? *</label>
                  <textarea rows={4} value={form.reasonForAdoption} onChange={e => update('reasonForAdoption', e.target.value)} placeholder="Please be honest — it helps find the right family / कृपया इमानदार हुनुहोस् — यसले सही परिवार खोज्न मद्दत गर्छ" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>

                {/* OTHER INFO */}
                <div>
                  <label style={labelStyle}>Any other information? / अन्य कुनै जानकारी?</label>
                  <textarea rows={3} value={form.otherInfo} onChange={e => update('otherInfo', e.target.value)} placeholder="Anything else we should know... / अरू केही जान्नु पर्ने छ भने..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={() => { if (!form.petName || !form.petAge || !form.vaccinated || !form.neutered || !form.friendlyChildren || !form.friendlyDogs || !form.description || !form.reasonForAdoption) { alert('Please fill all required fields. / कृपया सबै आवश्यक फिल्डहरू भर्नुहोला।'); return } setStep(3) }} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                    Next: Photos & Video / अर्को: फोटो र भिडियो →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — PHOTOS & VIDEO */}
  {step === 3 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              {sectionTitle('Photos & Video', 'फोटो र भिडियो')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={labelStyle}>Photos / फोटोहरू (up to 5 / ५ सम्म) *</label>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500 }}>Please upload social media quality photos / कृपया सामाजिक सञ्जालको गुणस्तरका फोटोहरू अपलोड गर्नुहोस्</p>
                  <div style={{ border: '3px dashed #58CC02', borderRadius: 16, padding: '32px', textAlign: 'center', background: '#F0FDF4', cursor: 'pointer', position: 'relative' }}>
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} onChange={handleImageSelect} />
                    <div style={{ fontSize: 44, marginBottom: 10 }}>📸</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#58CC02' }}>Click to upload / क्लिक गरेर अपलोड गर्नुहोस्</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 6, fontWeight: 500 }}>JPG, PNG, WEBP · Max 5 photos / ५ फोटोसम्म</div>
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
                  <label style={labelStyle}>Video Link / भिडियो लिंक (optional / ऐच्छिक)</label>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 10, fontWeight: 500 }}>Upload your video to YouTube or Google Drive first, then paste the link here · पहिले YouTube वा Google Drive मा अपलोड गर्नुहोस् र लिंक यहाँ पेस्ट गर्नुहोस्</div>
                  <input
                    type="url"
                    placeholder="https://youtube.com/... or https://drive.google.com/..."
                    value={videoUrl || ''}
                    onChange={e => setVideoUrl(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={() => setStep(4)} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                    Next: Review & Submit / अर्को: समीक्षा र सबमिट →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 — AGREEMENTS & SUBMIT */}
          {step === 4 && (
            <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '32px', boxShadow: '4px 4px 0px #000' }}>
              {sectionTitle('Agreement & Submission', 'सहमति र सबमिसन')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* BOOST TIER SELECTION */}
<div>
<div style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A', marginBottom: 6 }}>🐾 Choose How You Want to Promote Your Pet</div>
  <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700, marginBottom: 4 }}>आफ्नो पाल्तु जनावरको प्रचार कसरी गर्ने हो छान्नुहोस्</div>
  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 16, fontWeight: 500, padding: '10px 14px', background: '#F0FDF4', borderRadius: 10, border: '1.5px solid #58CC02' }}>
    ❤️ Every pet gets a free listing. Paid packages help your pet find a home faster.<br />
    <span style={{ fontSize: 11 }}>सबै जनावरको सूचीकरण निःशुल्क हुन्छ। सशुल्क प्याकेजले छिट्टै मायालु घर भेट्टाउन मद्दत गर्छ।</span>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

    {/* FREE */}
    <div onClick={() => update('boostTier', 'free')} style={{ background: form.boostTier === 'free' ? '#F0FDF4' : '#FAFAFA', borderRadius: 16, padding: '16px 20px', border: `2px solid ${form.boostTier === 'free' ? '#58CC02' : '#E5E7EB'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A' }}>🆓 Free Listing / निःशुल्क सूचीकरण</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Basic adoption listing</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: '#58CC02' }}>NPR 0</span>
          <div style={{ width: 22, height: 22, borderRadius: 999, border: `2.5px solid ${form.boostTier === 'free' ? '#58CC02' : '#D1D5DB'}`, background: form.boostTier === 'free' ? '#58CC02' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {form.boostTier === 'free' && <div style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} />}
          </div>
        </div>
      </div>
      {[
        ['HamroPets मा तपाईंको पाल्तु जनावरको प्रोफाइल राखिनेछ', 'Listed on HamroPets.com'],
        ['Facebook मा सामान्य रूपमा प्रचार गरिनेछ', 'Basic Facebook promotion'],
        ['HamroPets मा सामान्य प्राथमिकतामा देखाइनेछ', 'Standard visibility'],
      ].map(([np, en]) => (
        <div key={en} style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, marginBottom: 3 }}>✓ {np} <span style={{ color: '#9CA3AF' }}>({en})</span></div>
      ))}
    </div>

    {/* SOCIAL BOOST — RECOMMENDED */}
    <div onClick={() => update('boostTier', 'boost')} style={{ background: form.boostTier === 'boost' ? '#EFF6FF' : '#FAFAFA', borderRadius: 16, padding: '16px 20px', border: `3px solid ${form.boostTier === 'boost' ? '#38BDF8' : '#1A1A1A'}`, cursor: 'pointer', boxShadow: form.boostTier === 'boost' ? '4px 4px 0px #0284C7' : '3px 3px 0px #1A1A1A', transition: 'all 0.2s', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -12, left: 16, background: '#FF6B35', color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 12px', borderRadius: 999, border: '2px solid #1A1A1A' }}>🔥 RECOMMENDED / हाम्रो सिफारिस</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, marginTop: 8 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A' }}>🚀 Social Boost / सामाजिक प्रचार</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Get your pet seen by more people · थप मानिससम्म पुर्‍याउनुहोस्</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: '#1A1A1A' }}>NPR 299</span>
          <div style={{ width: 22, height: 22, borderRadius: 999, border: `2.5px solid ${form.boostTier === 'boost' ? '#38BDF8' : '#D1D5DB'}`, background: form.boostTier === 'boost' ? '#38BDF8' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {form.boostTier === 'boost' && <div style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} />}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 700, marginBottom: 10 }}>✓ Free का सबै सुविधा समावेश + थप:</div>
      {[
        ['तपाईंको कुकुर/बिरालोको छोटो भिडियो TikTok, Instagram र Facebook मा प्रचार', 'Social media adoption video'],
        ['स्पष्ट नेपाली आवाज (Voiceover) मा कथा वाचन — Swor AI प्रविधिद्वारा तयार पारिएको', 'Nepali voice narration powered by Swor AI'],
        ['खोज सूचीको सबैभन्दा माथि देखिने — छिट्टै नयाँ घर भेट्टाउनको लागि', 'Top of search for faster adoption'],
      ].map(([np, en]) => (
        <div key={en} style={{ fontSize: 12, color: '#374151', fontWeight: 500, marginBottom: 3 }}>✓ {np} <span style={{ color: '#9CA3AF' }}>({en})</span></div>
      ))}
    
      <a href="https://www.tiktok.com/@adoptadognepal" target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ display: 'inline-block', marginTop: 10, background: '#1A1A1A', color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>▶ उदाहरण भिडियो हेर्नुहोस् / See Example</a>
    </div>

    {/* PRIORITY SHIELD */}
    <div onClick={() => update('boostTier', 'shield')} style={{ background: form.boostTier === 'shield' ? '#FFFBEB' : '#FAFAFA', borderRadius: 16, padding: '16px 20px', border: `2.5px solid ${form.boostTier === 'shield' ? '#FFD23F' : '#E5E7EB'}`, cursor: 'pointer', boxShadow: form.boostTier === 'shield' ? '4px 4px 0px #B45309' : 'none', transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A' }}>⭐ Priority Shield / प्राथमिकता सुरक्षा</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Maximum support · adopter खोज्न थप सहयोग</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: '#1A1A1A' }}>NPR 599</span>
          <div style={{ width: 22, height: 22, borderRadius: 999, border: `2.5px solid ${form.boostTier === 'shield' ? '#FFD23F' : '#D1D5DB'}`, background: form.boostTier === 'shield' ? '#FFD23F' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {form.boostTier === 'shield' && <div style={{ width: 10, height: 10, borderRadius: 999, background: '#fff' }} />}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#B45309', fontWeight: 700, marginBottom: 10 }}>✓ Social Boost का सबै सुविधा समावेश + थप:</div>
      {[
        ['चौध दिनसम्म HamroPets को homepage मा विशेष रूपमा देखाइनेछ', 'Homepage feature for 14 days'],
        ['🔒 तपाईंको फोन नम्बर सार्वजनिक हुँदैन — Call HamroPets मार्फत जोडिन्छ', 'Phone number stays private'],
       ['तपाईंको पाल्तु जनावरसँग मिल्ने परिवार खोज्न विशेष सहयोग', 'Smart adopter matching'],
        ['पाँच देखि सात जना प्रमाणित, भरपर्दो सम्भावित परिवारको प्रोफाइल पठाइनेछ', '5–7 verified adopter profiles'],
      ].map(([np, en]) => (
        <div key={en} style={{ fontSize: 12, color: '#374151', fontWeight: 500, marginBottom: 3 }}>✓ {np} <span style={{ color: '#9CA3AF' }}>({en})</span></div>
      ))}
    </div>

  </div>
</div>
{/* COMPARISON TABLE */}
<div style={{ 
  background: '#F9FAFB', 
  borderRadius: 16, 
  border: '2px solid #1A1A1A', 
  padding: isMobile ? '16px' : '20px', 
  boxShadow: '4px 4px 0px #1A1A1A',
  marginTop: 20,
  marginBottom: 20
}}>
  <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 4 }}>
    🔍 तीनवटै प्याकेजमा के फरक छ? / Package Comparison
  </div>
  <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 14, fontWeight: 500 }}>
    निःशुल्क सूचीकरण आधारभूत हो भने सशुल्क प्याकेजले छिटो र सुरक्षित घर भेट्टाउन मद्दत गर्छ।
  </div>
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: isMobile ? 11 : 12 }}>
      <thead>
        <tr style={{ background: '#1A1A1A' }}>
          <th style={{ padding: '10px 12px', textAlign: 'left', color: '#fff', fontWeight: 800, borderRadius: '8px 0 0 0' }}>विशेषता / Feature</th>
          <th style={{ padding: '10px 8px', textAlign: 'left', color: '#9CA3AF', fontWeight: 700 }}>🆓 Free (NPR 0)</th>
          <th style={{ padding: '10px 8px', textAlign: 'left', color: '#38BDF8', fontWeight: 800 }}>🚀 Boost (NPR 299)</th>
          <th style={{ padding: '10px 8px', textAlign: 'left', color: '#FFD23F', fontWeight: 800, borderRadius: '0 8px 0 0' }}>⭐ Shield (NPR 599)</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['मुख्य फाइदा / Focus', 'आधारभूत उपस्थिति', 'उच्च प्रचार र भिडियो', 'पूर्ण गोपनीयता र सुरक्षा'],
          ['भिडियो कथा / Video', '❌ छैन', '✅ TikTok, IG, FB + Swor AI', '✅ TikTok, IG, FB + Swor AI'],
          ['फोन नम्बर / Phone', '🔓 सार्वजनिक (Public)', '🔓 सार्वजनिक (Public)', '🔒 १००% गोप्य (Private)'],
          ['अभिभावक जाँच / Screening', 'आफैंले गर्ने', 'आफैंले गर्ने', '✅ HamroPets ले जाँच गर्ने'],
          ['Homepage Banner', '❌', '❌', '✅ चौध दिन (14 days)'],
          ['उपयुक्त / Best For', 'हतार नभएका सामान्य केस', 'सक्रिय कुकुर/बिरालो, छिटो घर चाहिएमा', 'प्युरीब्रीड, व्यस्त वा महिला अभिभावक'],
        ].map(([feature, free, boost, shield], i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F3F4F6', borderBottom: '1px solid #E5E7EB' }}>
            <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1A1A1A' }}>{feature}</td>
            <td style={{ padding: '10px 8px', color: '#4B5563', fontWeight: 500 }}>{free}</td>
            <td style={{ padding: '10px 8px', color: '#1E3A8A', fontWeight: 600 }}>{boost}</td>
            <td style={{ padding: '10px 8px', color: '#854D0E', fontWeight: 700 }}>{shield}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
{/* PAYMENT INSTRUCTIONS */}
{(form.boostTier === 'boost' || form.boostTier === 'shield') && (
  <div style={{ background: '#FFF9E6', borderRadius: 16, padding: '20px', border: '2px solid #FFD23F', boxShadow: '3px 3px 0px #B45309' }}>
    <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 12 }}>💳 Payment Instructions / भुक्तानी निर्देशन</div>
    <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, fontWeight: 500 }}>
      <strong>Amount / रकम:</strong> {form.boostTier === 'boost' ? 'NPR 299' : 'NPR 599'}<br /><br />
      <strong>eSewa Account / eSewa खाता:</strong><br />
      📱 <strong>9851221428</strong> (HamroPets)<br /><br />
        <strong>Khalti / Bank Transfer:</strong><br />
      📱 <strong>9851221428</strong> (HamroPets)<br /><br />
      भुक्तानी गरेपछि screenshot WhatsApp मा पठाउनुहोस्: <strong>9851221428</strong><br />
      After payment, send screenshot to WhatsApp: <strong>9851221428</strong><br /><br />
      <span style={{ fontSize: 12, color: '#6B7280' }}>हामी २-४ घण्टाभित्र तपाईंको package सक्रिय गर्नेछौं। We will activate your package within 2-4 hours. 🐾</span>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
      {['eSewa', 'Khalti', 'Bank Transfer'].map(p => (
        <span key={p} style={{ background: '#fff', border: '1.5px solid #1A1A1A', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800, color: '#1A1A1A' }}>{p}</span>
      ))}
    </div>
  </div>
)}
                {/* TERMS */}
                <div style={{ background: '#FAFAFA', borderRadius: 14, padding: '20px', border: '1.5px solid #E5E7EB' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#000', marginBottom: 10 }}>Terms & Success Story Archive / सर्तहरू र सफलता कथा अभिलेख</div>
                  <div style={{ fontSize: 13, color: '#555', lineHeight: 1.8, fontWeight: 500 }}>
                    • The adoption process is 100% free. No money should be exchanged. / दत्तक प्रक्रिया १००% निःशुल्क छ।<br />
                    • HamroPets will keep your pet's photos on our page as a "Success Story" after adoption. / HamroPets ले तपाईंको पाल्तु जनावरको फोटो "सफलता कथा" को रूपमा राख्नेछ।<br />
                    • Your personal contact details will be deleted from the post once your pet finds a home. / घर पाएपछि तपाईंको सम्पर्क विवरण हटाइनेछ।<br />
                    • HamroPets does not take responsibility for any misinformation provided. / गलत जानकारीको लागि HamroPets जिम्मेवार हुँदैन।
                  </div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 14 }}>
                    <input type="checkbox" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#58CC02', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>
                      I agree to these terms / म यी सर्तहरूमा सहमत छु ✅
                    </span>
                  </label>
                </div>

                {/* CONSENT */}
                <div style={{ background: '#FAFAFA', borderRadius: 14, padding: '20px', border: '1.5px solid #E5E7EB' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.agreeContact} onChange={e => update('agreeContact', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#58CC02', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#000', lineHeight: 1.6 }}>
                      I agree to be contacted by Adopt a Dog Nepal or its affiliated parties and receive updates.<br />
                      <span style={{ fontWeight: 500, color: '#666' }}>म Adopt a Dog Nepal वा यसका सम्बद्ध पक्षहरूद्वारा सम्पर्क गर्न र अपडेटहरू प्राप्त गर्न सहमत छु।</span>
                    </span>
                  </label>
                </div>

                {/* SAFETY GUIDE */}
                <div style={{ background: '#FFF9E6', borderRadius: 14, padding: '20px', border: '1.5px solid #FFD23F' }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#000', marginBottom: 10 }}>⚠️ Safety & Verification Guide / सुरक्षा र प्रमाणीकरण मार्गदर्शन</div>
                  <div style={{ fontSize: 13, color: '#555', lineHeight: 1.9, fontWeight: 500 }}>
                    1. <strong>Request Government ID</strong> — Always ask for adopter's Citizenship Card (Nagarita). / नागरिकताको फोटो अनिवार्य माग्नुहोला।<br />
                    2. <strong>Social Media Check</strong> — Verify their Facebook or Instagram profile. / उनीहरूको सामाजिक सञ्जाल प्रोफाइल जाँच गर्नुहोला।<br />
                    3. <strong>No Financial Transactions</strong> — Adoption is 100% free. / एडोप्सन पूर्ण रूपमा निःशुल्क हुनुपर्छ।<br />
                    4. <strong>Home Visit / Video</strong> — Ask for a video of where the pet will stay. / पाल्तु जनावर बस्ने ठाउँको भिडियो माग्नुहोला।<br />
                    5. <strong>Follow-up</strong> — Check in after a few weeks. / केही हप्ता पछि अवस्थाबारे सोधपुछ गर्नुहोला।
                  </div>
                </div>

                {uploading && (
                  <div style={{ background: '#E8F9ED', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #58CC02', fontSize: 14, color: '#166534', fontWeight: 700, textAlign: 'center' }}>
                    ⬆️ Uploading photos and video... / फोटो र भिडियो अपलोड हुँदैछ... कृपया प्रतीक्षा गर्नुहोस्
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(3)} disabled={submitting} style={{ flex: 1, background: '#fff', color: '#000', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>← Back</button>
                  <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, background: '#FF6B35', color: '#fff', padding: '13px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? (uploading ? '⬆️ Uploading... / अपलोड हुँदैछ...' : '🐾 Saving... / सेभ हुँदैछ...') : '🐾 Submit for Review / समीक षाको लागि सबमिट गर्नुहोस्'}
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
