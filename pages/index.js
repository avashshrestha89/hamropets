import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
  const [{ data: featuredPets }, { data: featuredVets }] = await Promise.all([
    supabase.from('pet_listings').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(4),
    supabase.from('vet_listings').select('*').eq('status', 'approved').in('tier', ['featured', 'verified']).order('created_at', { ascending: false }).limit(3),
  ])
  return { props: { featuredPets: featuredPets || [], featuredVets: featuredVets || [] } }
}
function Slideshow({ slides }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', cursor: 'pointer' }}>
      {slides.map((slide, i) => (
        <Link key={i} href={slide.href} style={{ textDecoration: 'none' }}>
          <img
            src={slide.url}
            alt={slide.alt}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              borderRadius: 17,
            }}
          />
        </Link>
      ))}

      {/* PREV BUTTON */}
      <button
        onClick={e => { e.preventDefault(); prev() }}
        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: '2px solid #1A1A1A', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, fontWeight: 900, zIndex: 10, boxShadow: '2px 2px 0px #1A1A1A' }}
      >←</button>

      {/* NEXT BUTTON */}
      <button
        onClick={e => { e.preventDefault(); next() }}
        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: '2px solid #1A1A1A', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, fontWeight: 900, zIndex: 10, boxShadow: '2px 2px 0px #1A1A1A' }}
      >→</button>

      {/* DOTS */}
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.preventDefault(); setCurrent(i) }}
            style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 999, background: i === current ? '#58CC02' : 'rgba(255,255,255,0.7)', border: '1.5px solid #1A1A1A', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
          />
        ))}
      </div>
    </div>
  )
}
export default function Home({ featuredPets, featuredVets }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }
  const speciesColor = { dog: '#FF6B35', cat: '#7B5EA7', bird: '#38BDF8', rabbit: '#FF6B9D', other: '#58CC02' }
  const categoryEmoji = { vet_clinic: '🏥', grooming: '✂️', pet_boarding: '🏠', dog_trainer: '🎓', pet_shop: '🛒', other: '🐾' }
  const categoryBg = { vet_clinic: '#FFEAE6', grooming: '#EBF5FF', pet_boarding: '#EAFCE0', dog_trainer: '#FFF9E6', pet_shop: '#F0FDF4', other: '#F9FAFB' }
  const categoryLabel = { vet_clinic: 'Vet Clinic', grooming: 'Grooming', pet_boarding: 'Boarding', dog_trainer: 'Training', pet_shop: 'Pet Shop', other: 'Service' }

  const fallbackPets = [
    { id: 'demo-1', pet_name: 'Bruno', breed: 'Labrador Mix', age_years: 2, age_months: 0, location: 'Lalitpur', species: 'dog', vaccinated: true, images: [] },
    { id: 'demo-2', pet_name: 'Luna', breed: 'Persian Mix', age_years: 1, age_months: 0, location: 'Kathmandu', species: 'cat', neutered: true, images: [] },
    { id: 'demo-3', pet_name: 'Kalu', breed: 'Street Dog', age_years: 0, age_months: 6, location: 'Bhaktapur', species: 'dog', images: [] },
    { id: 'demo-4', pet_name: 'Tweety', breed: 'Budgerigar', age_years: 0, age_months: 8, location: 'Patan', species: 'bird', images: [] },
  ]

  const fallbackVets = [
    { id: 'fv1', business_name: 'Kathmandu Vet Hospital', category: 'vet_clinic', district: 'Maharajgunj', logo_url: null, rating: '4.9' },
    { id: 'fv2', business_name: 'Paws & Claws Care', category: 'grooming', district: 'Thamel', logo_url: null, rating: '4.8' },
    { id: 'fv3', business_name: 'Chobhar Animal Hospital', category: 'vet_clinic', district: 'Kirtipur', logo_url: null, rating: '4.9' },
  ]

  const petsToShow = featuredPets.length > 0 ? featuredPets : fallbackPets
  const vetsToShow = featuredVets.length > 0 ? featuredVets : fallbackVets

  return (
    <>
      <Head>
        <title>HamroPets — Nepal's First Dedicated Pet Platform</title>
        <meta name="description" content="Adopt pets, find vets, dog walking and pet sitting across Nepal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflowX: 'hidden', maxWidth: '100vw' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 22, border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', flexShrink: 0 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
                {!isMobile && <div style={{ fontSize: 9, color: '#888', fontWeight: 600 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>}
              </div>
            </Link>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#1A1A1A', textDecoration: 'none' }}>{label}</Link>
                ))}
                <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFF0EB', color: '#FF6B35', padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #FF6B35', marginLeft: 6 }}>🎙️ Swor AI</a>
              </div>
            )}
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 14px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', whiteSpace: 'nowrap' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* MOBILE NAV */}
        {isMobile && (
          <div style={{ background: '#FFFFFF', borderBottom: '2px solid #1A1A1A', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#1A1A1A', textDecoration: 'none', background: '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        {/* HERO */}
        <div style={{ background: '#FFFFFF', padding: isMobile ? '40px 16px 48px' : '72px 28px 80px', borderBottom: '3px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFD23F', border: '2.5px solid #1A1A1A', borderRadius: 999, padding: '7px 18px', marginBottom: 20, boxShadow: '3px 3px 0px #B45309' }}>
                <span>🇳🇵</span>
                <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 800, color: '#1A1A1A' }}>Nepal's First Dedicated Pet Platform</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 38 : 58, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: -2, color: '#1A1A1A' }}>
                Every Pet<br />
                <span style={{ background: '#fff', padding: '2px 14px', borderRadius: 14, border: '2.5px solid #1A1A1A', display: 'inline-block', transform: 'rotate(-1.5deg)', boxShadow: '3px 3px 0px #1A1A1A', color: '#FF6B35' }}>Deserves</span><br />
                a Loving Home 🐾
              </h1>
              <p style={{ color: '#374151', fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 28, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>700+ dogs rehomed since 2018. Find your perfect companion across Nepal.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '13px 24px' : '15px 30px', borderRadius: 14, fontSize: isMobile ? 15 : 16, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534', display: 'inline-block' }}>🐾 Adopt a Pet</Link>
                <Link href="/submit-pet" style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '13px 24px' : '15px 30px', borderRadius: 14, fontSize: isMobile ? 15 : 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #555', display: 'inline-block' }}>+ Submit a Pet</Link>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                {[['700+', 'Pets Rehomed', '#58CC02'], ['100% Free', 'Adoption Forever', '#FF6B35'], ['24hr', 'Review Time', '#7B5EA7']].map(([v, l, c]) => (
                  <div key={l} style={{ background: '#fff', borderRadius: 14, padding: '10px 16px', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                    <div style={{ color: c, fontWeight: 900, fontSize: isMobile ? 18 : 22, lineHeight: 1 }}>{v}</div>
                    <div style={{ color: '#6B7280', fontSize: 11, marginTop: 3, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
           {/* HERO SLIDESHOW */}
<div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '3px solid #1A1A1A', boxShadow: '6px 6px 0px #1A1A1A' }}>
  {(() => {
    const slides = [
      { url: 'https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png', alt: 'HamroPets — Nepal First Pet Platform', href: '/adopt' },
      { url: 'https://res.cloudinary.com/dkxxscyei/image/upload/v1780734064/Woman_with_dogs_in_living_202606061405_pybvmm.jpg', alt: 'Pet Sitting in Kathmandu', href: '/walk-sit' },
      { url: 'https://res.cloudinary.com/dkxxscyei/image/upload/v1780734061/List_your_business_Kathmandu_202606061405_jnb2r2.jpg', alt: 'List Your Business on HamroPets', href: '/list-business' },
    ]
    return (
      <Slideshow slides={slides} />
    )
  })()}
</div>
          </div>
        </div>

        {/* SPECIES + LOCATION FILTER */}
        <div style={{ background: '#FFFFFF', padding: isMobile ? '20px 16px' : '24px 28px', borderBottom: '2px solid #E5E7EB' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 14, flexWrap: 'wrap', alignItems: isMobile ? 'flex-start' : 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: 12, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>Species:</span>
              {[['Dogs', '#FF6B35'], ['Cats', '#7B5EA7'], ['Birds', '#38BDF8'], ['All Pets', '#58CC02']].map(([label, color]) => (
                <Link key={label} href="/adopt" style={{ padding: isMobile ? '7px 14px' : '8px 18px', borderRadius: 10, border: '2px solid #1A1A1A', background: color, color: '#fff', fontSize: isMobile ? 12 : 13, fontWeight: 700, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', display: 'inline-block' }}>{label}</Link>
              ))}
            </div>
            {!isMobile && <div style={{ width: 2, height: 28, background: '#1A1A1A', margin: '0 10px' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: 12, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5 }}>📍 Area:</span>
              {['All Nepal', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(loc => (
                <Link key={loc} href={`/adopt?location=${loc}`} style={{ padding: isMobile ? '7px 12px' : '8px 16px', borderRadius: 10, border: '2px solid #1A1A1A', background: '#fff', color: '#1A1A1A', fontSize: isMobile ? 12 : 13, fontWeight: 600, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', display: 'inline-block' }}>{loc}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED PETS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '60px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🐾 Available Now</span>
              <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Pets Waiting for You</h2>
              <p style={{ color: '#6B7280', margin: '6px 0 0', fontSize: isMobile ? 13 : 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>All reviewed & approved · Adoption is always free</p>
            </div>
            <Link href="/adopt" style={{ background: '#fff', color: '#1A1A1A', padding: '10px 18px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {petsToShow.map(pet => {
              const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
              const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
              const age = [pet.age_years > 0 ? `${pet.age_years}y` : '', pet.age_months > 0 ? `${pet.age_months}m` : ''].filter(Boolean).join(' ') || '?'
              return (
                <Link key={pet.id} href={pet.id.startsWith('demo') ? '/adopt' : `/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                    <div style={{ height: isMobile ? 120 : 170, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 52 : 72, position: 'relative', borderBottom: '2px solid #1A1A1A' }}>
                      {pet.images && pet.images.length > 0 ? <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                      <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', color: '#1A1A1A', borderRadius: 999, fontSize: 10, fontWeight: 800, padding: '3px 8px', border: '1.5px solid #1A1A1A' }}>
                        {pet.vaccinated ? '💉 Vaccinated' : `🐾 ${pet.species}`}
                      </div>
                    </div>
                    <div style={{ padding: isMobile ? '10px 12px' : '14px 16px' }}>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 18, color: '#1A1A1A' }}>{pet.pet_name}</div>
                      <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 13, marginTop: 2, fontWeight: 500, textTransform: 'capitalize', fontFamily: "'DM Sans', sans-serif" }}>{pet.breed || pet.species} · {age}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 600 }}>📍 {pet.location}</span>
                        <span style={{ background: '#58CC02', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>FREE</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* SERVICES GRID */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🏥 Services</span>
            <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Everything Your Pet Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, label: 'Vets & Clinics', desc: 'Find verified vets near you', color: '#FF6B35', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v18M18 3v18M3 6h18M3 18h18"/></svg>, label: 'Grooming', desc: 'Professional pet groomers', color: '#7B5EA7', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Pet Boarding', desc: 'Safe stays while you travel', color: '#38BDF8', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58CC02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, label: 'Dog Walking', desc: 'Trusted walkers near you', color: '#58CC02', href: '/walk-sit' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, label: 'Pet Sitting', desc: 'Home care for your pet', color: '#FF6B9D', href: '/walk-sit' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, label: 'Training', desc: 'Certified trainers in Nepal', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', padding: isMobile ? '16px' : '22px 26px', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 18 }}>
                  <div style={{ width: isMobile ? 44 : 58, height: isMobile ? 44 : 58, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${s.color}50` }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, color: '#1A1A1A' }}>{s.label}</div>
                    <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 13, marginTop: 2, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</div>
                  </div>
                  {!isMobile && <div style={{ marginLeft: 'auto', color: '#6B7280', fontSize: 16, fontWeight: 700 }}>→</div>}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED VETS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>⭐ Top Rated</span>
              <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>Trusted Vets & Services</h2>
            </div>
            <Link href="/vets" style={{ background: '#fff', color: '#1A1A1A', padding: '10px 18px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>Full Directory →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {vetsToShow.map(v => {
              const emoji = categoryEmoji[v.category] || '🐾'
              const bg = categoryBg[v.category] || '#F9FAFB'
              const label = categoryLabel[v.category] || 'Service'
              return (
                <Link key={v.id} href="/vets" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                    <div style={{ height: isMobile ? 90 : 120, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 36 : 48, borderBottom: '2px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
                      {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                      <div style={{ position: 'absolute', top: 8, right: 8, background: '#1A1A1A', color: '#FFD23F', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 4 }}>FEATURED</div>
                    </div>
                    <div style={{ padding: isMobile ? '10px 12px' : '14px 16px' }}>
                      <div style={{ background: '#FF6B35', color: '#fff', display: 'inline-block', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, marginBottom: 6 }}>{label}</div>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 12 : 14, color: '#1A1A1A', marginBottom: 3, lineHeight: 1.3 }}>{v.business_name}</div>
                      <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 500 }}>📍 {v.district}</div>
                      <div style={{ fontSize: isMobile ? 11 : 12, color: '#F59E0B', fontWeight: 800, marginTop: 8, paddingTop: 6, borderTop: '1.5px dashed #E5E7EB' }}>⭐ {v.rating || '5.0'}</div>
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* 4TH SLOT — LIST YOUR BUSINESS */}
            <Link href="/list-business" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2.5px dashed #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', textAlign: 'center', minHeight: isMobile ? 180 : 220 }}>
                <div style={{ width: 52, height: 52, borderRadius: 999, background: '#F9FAFB', border: '2.5px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 12, boxShadow: '3px 3px 0px #1A1A1A' }}>+</div>
                <div style={{ fontWeight: 900, fontSize: 14, color: '#1A1A1A', marginBottom: 6 }}>List Your Business Here</div>
                <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Get discovered by pet owners across Nepal</div>
                <div style={{ background: '#FFD23F', color: '#1A1A1A', padding: '7px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 12, fontWeight: 800, boxShadow: '2px 2px 0px #B45309' }}>+ List for Free</div>
              </div>
            </Link>
          </div>
        </div>

        {/* AI VET BANNER */}
        <div style={{ maxWidth: 1200, margin: isMobile ? '32px auto 0' : '56px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#7B5EA7', borderRadius: 20, padding: isMobile ? '28px 20px' : '44px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A' }}>
            <div>
              <span style={{ background: '#fff', color: '#7B5EA7', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 12, border: '1.5px solid #1A1A1A' }}>🤖 Powered by Gemini Pro</span>
              <h3 style={{ color: '#fff', fontSize: isMobile ? 22 : 28, fontWeight: 900, margin: '0 0 10px', letterSpacing: -0.5 }}>AI Vet — Ask Anything</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: isMobile ? 13 : 15, fontWeight: 500, maxWidth: 480, fontFamily: "'DM Sans', sans-serif" }}>Instant answers about your pet's health, nutrition and behaviour. Available 24/7.</p>
            </div>
            <Link href="/ai-vet" style={{ background: '#FFD23F', color: '#1A1A1A', padding: isMobile ? '13px 24px' : '15px 30px', borderRadius: 14, fontSize: isMobile ? 14 : 15, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #B45309', display: 'inline-block', whiteSpace: 'nowrap' }}>Launch AI Vet →</Link>
          </div>
        </div>

        {/* LOST & FOUND */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#FFF0F6', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, margin: '0 0 6px', color: '#1A1A1A' }}>Lost or Found a Pet?</h3>
              <p style={{ color: '#6B7280', margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Our community reunites pets with their families across Nepal.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>🔴 I Lost My Pet</Link>
              <Link href="/lost-found" style={{ background: '#58CC02', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', display: 'inline-block' }}>🟢 I Found a Pet</Link>
            </div>
          </div>
        </div>

        {/* SWOR AI BANNER */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#FF6B35', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: isMobile ? 52 : 68, height: isMobile ? 52 : 68, borderRadius: 16, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 24 : 32, border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', flexShrink: 0 }}>🎙️</div>
              <div>
                <span style={{ background: '#fff', color: '#FF6B35', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 800, display: 'inline-block', marginBottom: 6, border: '1.5px solid #1A1A1A' }}>A MeroAD.ai Product</span>
                <h3 style={{ color: '#fff', fontSize: isMobile ? 16 : 20, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: isMobile ? 12 : 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Generate authentic Nepali AI voices · meroadai.com</p>
                <a href="https://tiktok.com/@meroadai" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, background: '#1A1A1A', color: '#fff', padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #fff' }}>📱 Watch on TikTok</a>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#1A1A1A', padding: isMobile ? '12px 20px' : '14px 28px', borderRadius: 14, fontSize: isMobile ? 13 : 15, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #B45309', display: 'inline-block', whiteSpace: 'nowrap' }}>Try Swor AI →</a>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <span style={{ background: '#1A1A1A', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #555' }}>📱 Follow Us</span>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>Follow Adopt a Dog Nepal</h2>
            <p style={{ color: '#6B7280', fontSize: 14, fontWeight: 500, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>Stay updated with our latest rescues, adoptions and stories</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 20 }}>

            <a href="https://www.tiktok.com/@adoptadognepal" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#1A1A1A', borderRadius: 20, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #555', overflow: 'hidden' }}>
                <div style={{ height: isMobile ? 160 : 200, background: 'linear-gradient(135deg, #010101, #69C9D0)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 64 }}>🎵</div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800, color: '#1A1A1A' }}>TikTok</div>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: '#69C9D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #fff' }}>🐕</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>@adoptadognepal</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Adopt a Dog Nepal</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>700+</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Rescues</div></div>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>2018</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Since</div></div>
                  </div>
                  <div style={{ background: '#69C9D0', color: '#1A1A1A', padding: '10px', borderRadius: 10, border: '2px solid #fff', fontSize: 13, fontWeight: 800, textAlign: 'center' }}>Follow on TikTok →</div>
                </div>
              </div>
            </a>

            <a href="https://www.facebook.com/AdoptaDogNepal" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#1877F2', borderRadius: 20, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', overflow: 'hidden' }}>
                <div style={{ height: isMobile ? 160 : 200, background: 'linear-gradient(135deg, #1877F2, #0a5bc4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 64 }}>📘</div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800, color: '#1877F2' }}>Facebook</div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>1.4M+ Views</div>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #1A1A1A' }}>🐾</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>Adopt a Dog Nepal</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Animal Rescue · Kathmandu</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>1.4M+</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Views</div></div>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>Active</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Daily posts</div></div>
                  </div>
                  <div style={{ background: '#fff', color: '#1877F2', padding: '10px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, textAlign: 'center' }}>Follow on Facebook →</div>
                </div>
              </div>
            </a>

            <a href="https://www.instagram.com/adoptadognepal" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)', borderRadius: 20, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', overflow: 'hidden' }}>
                <div style={{ height: isMobile ? 160 : 200, background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: 64 }}>📸</div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800, color: '#833AB4' }}>Instagram</div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#fff' }}>Appeal Filed</div>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #1A1A1A' }}>🐕</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>@adoptadognepal</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Coming back soon</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>2018</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Since</div></div>
                    <div><div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>700+</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Rehomed</div></div>
                  </div>
                  <div style={{ background: '#fff', color: '#833AB4', padding: '10px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 800, textAlign: 'center' }}>Follow on Instagram →</div>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', marginTop: isMobile ? 48 : 72, padding: isMobile ? '40px 16px 28px' : '56px 28px 36px', borderTop: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.6fr 1fr 1fr 1fr', gap: isMobile ? 24 : 48, marginBottom: 36 }}>
              <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🐾</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: '#1A1A1A' }}>HamroPets</div>
                    <div style={{ fontSize: 10, color: '#888', fontWeight: 500 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>
                  </div>
                </div>
                <p style={{ color: '#6B7280', fontSize: 13, lineHeight: 1.7, maxWidth: 280, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Nepal's first dedicated pet platform. Built on 8 years of trust from Adopt a Dog Nepal.</p>
                <div style={{ marginTop: 12, display: 'inline-block', background: '#FFF0EB', padding: '5px 12px', borderRadius: 8, border: '1.5px solid #1A1A1A', fontSize: 11, fontWeight: 800, color: '#FF6B35' }}>🚀 A MeroAD.ai Product</div>
              </div>
              {[
                ['Platform', [['Adopt a Pet', '/adopt'], ['Vet Directory', '/vets'], ['Dog Walking', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']]],
                ['For Businesses', [['Advertise', '/advertise'], ['List Your Clinic', '/list-business'], ['Partner with Us', '/advertise']]],
                ['Company', [['About HamroPets', '/'], ['Adopt a Dog Nepal', 'https://www.facebook.com/AdoptaDogNepal'], ['Swor AI', 'https://meroadai.com'], ['Contact Us', '/advertise']]],
              ].map(([heading, items]) => (
                <div key={heading}>
                  <div style={{ fontWeight: 800, fontSize: 11, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{heading}</div>
                  {items.map(([label, href]) => {
                    const isExternal = href.startsWith('http')
                    return isExternal ? (
                      <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'block', color: '#6B7280', fontSize: isMobile ? 12 : 13, marginBottom: 8, fontWeight: 500, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>{label}</a>
                    ) : (
                      <Link key={label} href={href} style={{ display: 'block', color: '#6B7280', fontSize: isMobile ? 12 : 13, marginBottom: 8, fontWeight: 500, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>{label}</Link>
                    )
                  })}
                </div>
              ))}
            </div>
            
<div style={{ borderTop: '2px solid #1A1A1A', paddingTop: 20, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
              <span style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>© 2025 HamroPets · All rights reserved</span>
              <span style={{ color: '#1A1A1A', fontSize: 12, fontWeight: 800, background: '#FFF0F6', padding: '4px 12px', borderRadius: 8, border: '2px solid #1A1A1A' }}>Built with ❤️ in Kathmandu 🇳🇵</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
