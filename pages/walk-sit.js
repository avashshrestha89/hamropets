import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
  const { data } = await supabase
    .from('walker_applications')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  return { props: { walkers: data || [] } }
}
export default function WalkSit({ walkers: dbWalkers }) {
  const [isMobile, setIsMobile] = useState(false)
  const [tab, setTab] = useState('find')
  const [cityFilter, setCityFilter] = useState('All')
const [serviceFilter, setServiceFilter] = useState('All')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
 const [nagarikUrl, setNagarikUrl] = useState(null)
const [profilePhotoUrl, setProfilePhotoUrl] = useState(null)
const [uploadingPhoto, setUploadingPhoto] = useState(false)
 const [form, setForm] = useState({
    fullName: '', phone: '', city: '', locality: '', email: '', services: '🦮 Dog Walking', experience: ''
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))
const handleProfilePhotoUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  setUploadingPhoto(true)
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
        if (data.url) setProfilePhotoUrl(data.url)
        else alert('Upload failed. Please try again.')
      } catch (err) {
        alert('Upload failed: ' + err.message)
      }
      setUploadingPhoto(false)
    }
    reader.onerror = () => { alert('File read failed.'); setUploadingPhoto(false) }
    reader.readAsDataURL(file)
  } catch (err) {
    alert('Upload failed: ' + err.message)
    setUploadingPhoto(false)
  }
}
const handleNagarikUpload = async (e) => {
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
            body: JSON.stringify({ file: ev.target.result, folder: 'walkers', resourceType: 'image' }),
          })
          const data = await res.json()
          if (data.url) setNagarikUrl(data.url)
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

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.city || !form.locality) {
      alert('Please fill in your name, phone and area.')
      return
    }
    if (!nagarikUrl) {
      alert('Please upload your Nagarik App screenshot. / कृपया आफ्नो नागरिक एप स्क्रिनसट अपलोड गर्नुहोला।')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/apply-walker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ ...form, area: `${form.city}, ${form.locality}`, nagarikScreenshot: nagarikUrl, profilePhoto: profilePhotoUrl }),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

const fallbackWalkers = [
    { id: 'f1', full_name: 'Priya Shrestha', area: 'Lalitpur', services: 'Walking + Sitting', emoji: '👩', color: '#FF6B9D', rating: '4.9', jobs: 48 },
    { id: 'f2', full_name: 'Rajan Tamang', area: 'Kathmandu', services: 'Dog Walking', emoji: '👨', color: '#38BDF8', rating: '4.8', jobs: 32 },
    { id: 'f3', full_name: 'Sunita KC', area: 'Bhaktapur', services: 'Pet Sitting', emoji: '👩', color: '#7B5EA7', rating: '5.0', jobs: 21 },
    { id: 'f4', full_name: 'Bikash Rai', area: 'Boudha', services: 'Walking + Sitting', emoji: '👨', color: '#58CC02', rating: '4.7', jobs: 15 },
  ]

const walkers = dbWalkers.length > 0 ? dbWalkers.map(w => ({
    id: w.id,
    full_name: w.full_name,
    area: w.area,
    services: w.services,
    emoji: w.services?.includes('Sitting') ? '👩' : '👨',
    color: w.services?.includes('Sitting') ? '#FF6B9D' : '#38BDF8',
    rating: '5.0',
    jobs: 0,
    verified: true,
    nagarik_screenshot: w.nagarik_screenshot,
  })) : fallbackWalkers
const cities = ['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan']
const filteredWalkers = walkers.filter(w => {
    const cityMatch = cityFilter === 'All' || w.city === cityFilter || w.area?.toLowerCase().includes(cityFilter.toLowerCase())
    const serviceMatch = serviceFilter === 'All' ||
      (serviceFilter === 'Dog Walking' && (w.services === 'Dog Walking' || w.services === 'Both')) ||
      (serviceFilter === 'Pet Sitting' && (w.services === 'Pet Sitting' || w.services === 'Both')) ||
      (serviceFilter === 'Both' && w.services === 'Both')
    return cityMatch && serviceMatch
  })
  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
<Head>
  <title>Dog Walking & Pet Sitting Kathmandu — Verified & Cage-Free | HamroPets</title>
  <meta name="description" content="Find ID-verified dog walkers and cage-free pet sitters in Kathmandu and Lalitpur. From NPR 300/walk and NPR 700/day. Nepal's first verified pet sitting and dog walking service presented by Adopt a Dog Nepal." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="keywords" content="dog walking Kathmandu, pet sitting Nepal, dog walker Kathmandu, pet sitter Kathmandu, cage free pet sitting Nepal, dog walker Lalitpur, pet boarding Kathmandu, dog hostel Kathmandu, pet daycare Kathmandu, trusted dog walker Jhamsikhel, dog walker New Baneshwor, pet sitter Baluwatar, dog boarding Kathmandu, home pet sitting Kathmandu, verified pet sitter Nepal, ghar ma kukur chadne manche" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Dog Walking & Pet Sitting Kathmandu — Verified & Cage-Free | HamroPets" />
  <meta property="og:description" content="ID-verified dog walkers and cage-free pet sitters in Kathmandu and Lalitpur. NPR 300/walk · NPR 700/day. Presented by Adopt a Dog Nepal since 2018." />
  <meta property="og:url" content="https://www.hamropets.com/walk-sit" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Dog Walking & Pet Sitting Kathmandu | HamroPets" />
  <meta name="twitter:description" content="Verified dog walkers and cage-free pet sitters in Kathmandu Valley. From NPR 300/walk. Presented by Adopt a Dog Nepal." />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "HamroPets Dog Walking & Pet Sitting",
          "description": "Nepal's first verified cage-free dog walking and pet sitting service in Kathmandu Valley. ID-verified sitters and walkers.",
          "url": "https://www.hamropets.com/walk-sit",
          "areaServed": ["Kathmandu", "Lalitpur", "Bhaktapur"],
          "priceRange": "NPR 300 - NPR 15000",
          "telephone": "",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kathmandu",
            "addressCountry": "NP"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does dog walking cost in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dog walking in Kathmandu costs NPR 300 to NPR 400 per session (45-60 minutes). Monthly packages for Monday to Friday daily walks cost NPR 5,000 to NPR 6,500 per month. All walkers on HamroPets are ID-verified using their Nepal Government Citizenship Card."
              }
            },
            {
              "@type": "Question",
              "name": "How much does pet sitting cost in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pet sitting in Kathmandu costs NPR 700 per day for 9am to 5pm daycare, or NPR 1,500 to NPR 2,000 per night for overnight sitting. Monthly daycare packages cost NPR 12,000 to NPR 15,000. All sitters provide cage-free home environments with WhatsApp photo updates."
              }
            },
            {
              "@type": "Question",
              "name": "Are dog walkers and pet sitters on HamroPets verified?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Every dog walker and pet sitter on HamroPets is verified using their Nepal Government issued Citizenship Card before being listed on the platform. Only approved, ID-verified carers appear in search results."
              }
            },
            {
              "@type": "Question",
              "name": "What areas do you cover for dog walking in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HamroPets currently has verified dog walkers and pet sitters across Kathmandu Valley including Kathmandu, Lalitpur, and Bhaktapur. Areas covered include Jhamsikhel, Baluwatar, Lazimpat, New Baneshwor, Chabahil, Imadol, Thamel, Maharajgunj and surrounding neighborhoods."
              }
            },
            {
              "@type": "Question",
              "name": "Is it safe to use a dog walker in Kathmandu traffic?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Verified walkers on HamroPets are experienced in navigating Kathmandu streets safely, using proper leashes and harnesses, and choosing quieter residential routes or parks away from heavy traffic. All walkers are ID-verified before listing."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between a dog hostel and a home pet sitter?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A dog hostel is a commercial facility where multiple dogs are kept, often in cages, costing NPR 800 to NPR 1,200 per day. A HamroPets home pet sitter provides cage-free, personalized care in a real home environment at NPR 700 per day — cheaper and far less stressful for your pet."
              }
            }
          ]
        }
      ])
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
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Walk & Sit' ? 800 : 600, color: label === 'Walk & Sit' ? '#58CC02' : '#1A1A1A', background: label === 'Walk & Sit' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
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
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'Walk & Sit' ? 800 : 600, color: label === 'Walk & Sit' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'Walk & Sit' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '28px 16px' : '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🦮 New in Nepal</span>
          <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -1 }}>Dog Walking & Pet Sitting</h1>
          <p style={{ color: '#6B7280', marginBottom: 28, fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>Find trusted & Nagarik-verified walkers and sitters — or register as one</p>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 0, background: '#F3F4F6', borderRadius: 999, padding: 4, width: '100%', maxWidth: isMobile ? '100%' : 'fit-content', marginBottom: 28, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', boxSizing: 'border-box' }}>
            {[['find', '🔍 Find a Walker/Sitter'], ['register', '✋ Register as Walker/Sitter']].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: isMobile ? '10px 12px' : '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: isMobile ? 12 : 14, background: tab === key ? '#58CC02' : 'transparent', color: tab === key ? '#fff' : '#888', transition: 'all 0.2s', textAlign: 'center', lineHeight: 1.3 }}>{label}</button>
            ))}
          </div>

          {/* FIND TAB */}
          {tab === 'find' && (
            <div>
              {/* NAGARIK VERIFIED NOTICE */}
              <div style={{ background: '#E8F9ED', borderRadius: 14, padding: '14px 20px', marginBottom: 24, border: '2px solid #1A1A1A', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🇳🇵</span>
                <div>
<div style={{ fontWeight: 800, fontSize: 14, color: '#1A1A1A' }}>🪪 ID Verified Walkers & Sitters</div>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>All listed walkers and sitters have been verified using their Nepal Government Citizenship Card. Your pet is safe. / सबै सूचीबद्ध व्यक्तिहरू नागरिकता कार्डद्वारा प्रमाणित छन्।</div>
                </div>
              </div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: 12, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>Service:</span>
                {['All', 'Dog Walking', 'Pet Sitting', 'Both'].map(f => (
                    <button key={f} onClick={() => setServiceFilter(f)} style={{ padding: isMobile ? '8px 12px' : '9px 18px', borderRadius: 999, border: `2px solid ${serviceFilter === f ? '#1A1A1A' : '#E5E7EB'}`, background: serviceFilter === f ? '#58CC02' : '#fff', color: serviceFilter === f ? '#fff' : '#666', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: serviceFilter === f ? '2px 2px 0px #1A1A1A' : 'none', whiteSpace: 'nowrap' }}>{f}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: 12, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>📍 City:</span>
                  {cities.map(c => (
                    <button key={c} onClick={() => setCityFilter(c)} style={{ padding: isMobile ? '8px 12px' : '9px 18px', borderRadius: 999, border: '2px solid #1A1A1A', background: cityFilter === c ? '#1A1A1A' : '#fff', color: cityFilter === c ? '#fff' : '#666', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>{c}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>

{filteredWalkers.map(w => (
                  <a key={w.id} href={`/walker/${w.id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: isMobile ? 90 : 120, background: `linear-gradient(135deg, ${w.color}18, ${w.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 56, borderBottom: '2px solid #1A1A1A', position: 'relative' }}>
                      {w.emoji}
                      {w.verified && (
                       <div style={{ position: 'absolute', top: 8, left: 8, background: '#58CC02', color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 7px', borderRadius: 999, border: '1.5px solid #1A1A1A', display: 'flex', alignItems: 'center', gap: 3 }}>
                          🪪 ID Verified
                        </div>
                      )}
                    </div>
              <div style={{ padding: isMobile ? '12px' : '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 4 }}>
                        <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', lineHeight: 1.2 }}>{w.full_name}</div>
                        <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: isMobile ? 11 : 13, flexShrink: 0 }}>⭐ {w.rating}</span>
                      </div>
                      <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 600 }}>{w.services === 'Both' || w.services?.includes('Both') ? '🦮 Dog Walking & 🛋️ Pet Sitting' : w.services}</div>
                    <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 2, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {w.city || w.area}{w.locality ? ` · ${w.locality}` : ''}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontWeight: 900, color: '#58CC02', fontSize: isMobile ? 12 : 14 }}>From NPR 300/walk · NPR 700/day</span>
                        <a href={`/walker/${w.id}`} target="_blank" rel="noreferrer" style={{ background: '#38BDF8', color: '#fff', padding: isMobile ? '6px 12px' : '8px 20px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 800, cursor: 'pointer', textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>Book</a>
                      </div>
                    </div>
          </div>
                  </a>
                ))}

                {/* CTA 1 — BECOME A PET SITTER */}
                <button onClick={() => setTab('register')} style={{ background: '#FFFFFF', borderRadius: 16, border: '2.5px dashed #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 12px' : '24px 16px', textAlign: 'center', minHeight: isMobile ? 180 : 220, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: '#FFF0F6', border: '2.5px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10, boxShadow: '3px 3px 0px #1A1A1A' }}>🛋️</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A', marginBottom: 6 }}>Become a Pet Sitter</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 500, marginBottom: 14, lineHeight: 1.4 }}>Earn NPR 700/day caring for pets · NPR 12,000-15,000/month</div>
                  <div style={{ background: '#FF6B9D', color: '#fff', padding: '7px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 12, fontWeight: 800, boxShadow: '2px 2px 0px #1A1A1A' }}>Apply Now →</div>
                </button>

                {/* CTA 2 — BECOME A DOG WALKER */}
                <button onClick={() => setTab('register')} style={{ background: '#FFFFFF', borderRadius: 16, border: '2.5px dashed #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 12px' : '24px 16px', textAlign: 'center', minHeight: isMobile ? 180 : 220, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: '#E8F9ED', border: '2.5px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10, boxShadow: '3px 3px 0px #1A1A1A' }}>🦮</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A', marginBottom: 6 }}>Become a Dog Walker</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 500, marginBottom: 14, lineHeight: 1.4 }}>Earn NPR 300-400/walk · NPR 5,000-6,500/month package</div>
                  <div style={{ background: '#58CC02', color: '#fff', padding: '7px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 12, fontWeight: 800, boxShadow: '2px 2px 0px #166634' }}>Apply Now →</div>
                </button>

              </div>
            </div>
          )}

          {/* REGISTER TAB */}
          {tab === 'register' && (
            <div style={{ maxWidth: 560 }}>
              {submitted ? (
                <div style={{ background: '#E8F9ED', borderRadius: 24, padding: isMobile ? '32px 20px' : '48px', border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                  <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>Application Submitted!</h3>
<p style={{ color: '#6B7280', fontSize: 15, fontWeight: 500, marginBottom: 8 }}>We'll verify your citizenship card and contact you within 3–5 business days.</p>
                  <p style={{ color: '#6B7280', fontSize: 14, fontWeight: 500, marginBottom: 24 }}>तपाईंको नागरिकता कार्ड प्रमाणित गरेर ३-५ कार्य दिनभित्र सम्पर्क गर्नेछौं।</p>
                  <button onClick={() => { setSubmitted(false); setNagarikUrl(null); setForm({ fullName: '', phone: '', area: '', email: '', services: '🦮 Dog Walking', experience: '' }) }} style={{ background: '#58CC02', color: '#fff', padding: '12px 28px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>Submit Another</button>
                </div>
              ) : (
                <div style={{ background: '#fff', borderRadius: 24, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '36px 40px', boxShadow: '5px 5px 0px #1A1A1A' }}>
                  <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px' }}>Register as a Walker / Sitter</h3>
                  <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24, fontWeight: 500 }}>Join Nepal's first verified pet walker network. All applicants are Nagarik-verified before listing.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name / पूरा नाम *</label>
                      <input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your full name / तपाईंको पूरा नाम" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number / फोन नम्बर *</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                    </div>
<div>
                      <label style={labelStyle}>City / District — सहर / जिल्ला *</label>
                      <select value={form.city} onChange={e => update('city', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select your city / सहर छान्नुहोस्</option>
                        {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Biratnagar', 'Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Locality / Neighbourhood — टोल / क्षेत्र *</label>
                      <input value={form.locality} onChange={e => update('locality', e.target.value)} placeholder="e.g. Jhamsikhel, Imadol, Thamel / जस्तै: झम्सिखेल, इमाडोल, थमेल" style={inputStyle} />
                      <div style={{ fontSize: 12, color: '#888', marginTop: 4, fontWeight: 500 }}>Your neighbourhood only — short name please / केवल तपाईंको टोलको नाम — छोटो लेख्नुहोस्</div>
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address / इमेल ठेगाना</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Services you offer / सेवाहरू *</label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {['🦮 Dog Walking', '🛋️ Pet Sitting', 'Both'].map(s => (
                          <button key={s} onClick={() => update('services', s)} style={{ flex: 1, padding: '11px 8px', borderRadius: 12, border: `2px solid ${form.services === s ? '#1A1A1A' : '#E5E7EB'}`, background: form.services === s ? '#58CC02' : '#fff', color: form.services === s ? '#fff' : '#666', cursor: 'pointer', fontSize: isMobile ? 11 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: form.services === s ? '2px 2px 0px #166634' : 'none' }}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Why are you a good fit? / तपाईं किन उपयुक्त हुनुहुन्छ?</label>
                      <textarea rows={3} value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Tell us about your experience with pets... / आफ्नो पाल्तु जनावरसँगको अनुभव बताउनुहोस्..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                    </div>
{/* PROFILE PHOTO UPLOAD */}
<div>
  <label style={labelStyle}>Profile Photo / प्रोफाइल फोटो *</label>
  <div style={{ fontSize: 12, color: '#888', marginBottom: 10, fontWeight: 500 }}>Upload a clear photo of your face — this will appear on your public profile · तपाईंको अनुहार स्पष्ट देखिने फोटो अपलोड गर्नुहोस्</div>
  <div style={{ position: 'relative', border: `3px dashed ${profilePhotoUrl ? '#58CC02' : '#1A1A1A'}`, borderRadius: 16, padding: '24px 20px', textAlign: 'center', background: profilePhotoUrl ? '#E8F9ED' : '#FAFAFA', cursor: 'pointer' }}>
    <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
    {uploadingPhoto ? (
      <div style={{ fontSize: 14, fontWeight: 700, color: '#6B7280' }}>⬆️ Uploading...</div>
    ) : profilePhotoUrl ? (
      <div>
        <img src={profilePhotoUrl} alt="Profile" style={{ width: 80, height: 80, borderRadius: 999, objectFit: 'cover', border: '3px solid #1A1A1A', marginBottom: 8 }} />
        <div style={{ fontSize: 13, fontWeight: 800, color: '#58CC02' }}>Photo uploaded! ✅</div>
        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Click to replace</div>
      </div>
    ) : (
      <div>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🤳</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>Upload Profile Photo</div>
        <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>JPG or PNG · Clear face photo only</div>
      </div>
    )}
  </div>
</div>
                    {/* NAGARIK APP UPLOAD */}
                    <div>
                      <label style={labelStyle}>Citizenship Card Photo / नागरिकता कार्डको फोटो *</label>

                      {/* INSTRUCTIONS */}
                      <div style={{ background: '#F0F8FF', borderRadius: 12, padding: '14px 16px', marginBottom: 12, border: '1.5px solid #38BDF8' }}>
                   <div style={{ fontWeight: 800, fontSize: 13, color: '#1A1A1A', marginBottom: 8 }}>🪪 How to submit your Citizenship Card:</div>
                        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.8, fontWeight: 500 }}>
                          1. Take a <strong>clear photo</strong> of your citizenship card (front side)<br />
                          2. Make sure your <strong>full name, citizenship number & date of birth</strong> are visible<br />
                          3. Upload the photo below<br />
                        </div>
                        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8, paddingTop: 8, borderTop: '1px solid #E5E7EB', lineHeight: 1.8 }}>
                          <strong>नेपालीमा:</strong><br />
                          १. नागरिकता कार्डको अगाडिको भागको <strong>स्पष्ट फोटो</strong> खिच्नुहोस्<br />
                          २. तपाईंको <strong>पूरा नाम, नागरिकता नम्बर र जन्म मिति</strong> देखिने गरी फोटो खिच्नुहोस्<br />
                          ३. तल अपलोड गर्नुहोस्
                        </div>
                      </div>

                      {/* UPLOAD AREA */}
                      <div style={{ position: 'relative', border: `3px dashed ${nagarikUrl ? '#58CC02' : '#1A1A1A'}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center', background: nagarikUrl ? '#E8F9ED' : '#FAFAFA', cursor: 'pointer' }}>
                        <input type="file" accept="image/*" onChange={handleNagarikUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                        {uploading ? (
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#6B7280' }}>⬆️ Uploading... / अपलोड हुँदैछ...</div>
                        ) : nagarikUrl ? (
                          <div>
                            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#58CC02', marginBottom: 6 }}>Screenshot uploaded successfully!</div>
                            <img src={nagarikUrl} alt="Nagarik screenshot" style={{ width: '100%', maxWidth: 200, borderRadius: 10, border: '2px solid #1A1A1A', marginTop: 8 }} />
                            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>Click to replace / फेर्न क्लिक गर्नुहोस्</div>
                          </div>
                        ) : (
                          <div>
                           <div style={{ fontSize: 40, marginBottom: 8 }}>🪪</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>Upload Citizenship Card Photo</div>
                            <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>नागरिकता कार्डको फोटो अपलोड गर्नुहोस् · JPG or PNG</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* TRUST NOTE */}
                    <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#92400E', fontWeight: 600, border: '1.5px solid #FFD23F', lineHeight: 1.7 }}>
                      🔒 Your citizenship card photo is only used for identity verification and will not be shared publicly. / तपाईंको नागरिकता कार्डको फोटो केवल पहिचान प्रमाणीकरणका लागि प्रयोग गरिन्छ र सार्वजनिक गरिने छैन।
                    </div>

                    <div style={{ background: '#FAFAFA', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#374151', fontWeight: 600, border: '1.5px solid #E5E7EB' }}>
                      📋 All applicants reviewed before listing. We will contact you within 3–5 business days. / सबै आवेदकहरू सूचीबद्ध गर्नु अघि समीक्षा गरिन्छ। हामी ३-५ कार्य दिनभित्र सम्पर्क गर्नेछौं।
                    </div>

                    <button onClick={handleSubmit} disabled={submitting || uploading} style={{ background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 12, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Submitting... / सबमिट हुँदैछ...' : '🐾 Submit Application / आवेदन पेश गर्नुहोस्'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
{/* FAQ SECTION */}
<div style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', marginTop: isMobile ? 48 : 64 }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 16px' : '64px 28px' }}>
    <div style={{ marginBottom: 40, textAlign: 'center' }}>
      <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>❓ FAQ</span>
      <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Dog Walking & Pet Sitting in Kathmandu — FAQs</h2>
      <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500, margin: 0 }}>Everything you need to know about our verified pet care services</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780, margin: '0 auto' }}>
      {[
        {
          q: 'How much does dog walking cost in Kathmandu?',
          a: 'Dog walking costs NPR 300 to NPR 400 per session (45-60 minutes). Monthly packages for Monday to Friday daily walks cost NPR 5,000 to NPR 6,500 per month. All walkers on HamroPets are ID-verified using their Nepal Government Citizenship Card.'
        },
        {
          q: 'How much does pet sitting cost in Kathmandu?',
          a: 'Pet sitting costs NPR 700 per day for 9am to 5pm daycare, or NPR 1,500 to NPR 2,000 per night for overnight sitting. Monthly daycare packages cost NPR 12,000 to NPR 15,000. All sitters provide cage-free home environments with WhatsApp photo updates throughout the day.'
        },
        {
          q: 'Are dog walkers and pet sitters on HamroPets verified?',
          a: 'Yes. Every dog walker and pet sitter on HamroPets is verified using their Nepal Government issued Citizenship Card before being listed. Only approved, ID-verified carers appear in search results so your pet is always in safe hands.'
        },
        {
          q: 'What areas do you cover for dog walking in Kathmandu?',
          a: 'HamroPets currently has verified dog walkers and pet sitters across Kathmandu Valley including Kathmandu, Lalitpur and Bhaktapur. Areas covered include Jhamsikhel, Baluwatar, Lazimpat, New Baneshwor, Chabahil, Imadol, Thamel, Maharajgunj and surrounding neighborhoods.'
        },
        {
          q: 'What is the difference between a dog hostel and a home pet sitter?',
          a: 'A dog hostel is a commercial facility where multiple dogs are kept, often in cages, costing NPR 800 to NPR 1,200 per day. A HamroPets home pet sitter provides cage-free personalized care in a real home environment at NPR 700 per day — cheaper and far less stressful for your pet.'
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
