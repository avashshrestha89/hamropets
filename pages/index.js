import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
  const { data: featuredPets } = await supabase
    .from('pet_listings')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(4)
  return { props: { featuredPets: featuredPets || [] } }
}

export default function Home({ featuredPets }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }
  const speciesColor = { dog: '#FF6B35', cat: '#7B5EA7', bird: '#38BDF8', rabbit: '#FF6B9D', other: '#58CC02' }

  const fallbackPets = [
    { id: 'demo-1', pet_name: 'Bruno', breed: 'Labrador Mix', age_years: 2, age_months: 0, location: 'Lalitpur', species: 'dog', vaccinated: true, images: [] },
    { id: 'demo-2', pet_name: 'Luna', breed: 'Persian Mix', age_years: 1, age_months: 0, location: 'Kathmandu', species: 'cat', neutered: true, images: [] },
    { id: 'demo-3', pet_name: 'Kalu', breed: 'Street Dog', age_years: 0, age_months: 6, location: 'Bhaktapur', species: 'dog', images: [] },
    { id: 'demo-4', pet_name: 'Tweety', breed: 'Budgerigar', age_years: 0, age_months: 8, location: 'Patan', species: 'bird', images: [] },
  ]

  const petsToShow = featuredPets.length > 0 ? featuredPets : fallbackPets

  return (
    <>
      <Head>
        <title>HamroPets — Nepal's First Dedicated Pet Platform</title>
        <meta name="description" content="Adopt pets, find vets, dog walking and pet sitting across Nepal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden', maxWidth: '100vw' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #000', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 22, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', flexShrink: 0 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#000', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
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
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 14px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', whiteSpace: 'nowrap' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* MOBILE NAV LINKS */}
        {isMobile && (
          <div style={{ background: '#FAFAFA', borderBottom: '2px solid #000', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: '#000', textDecoration: 'none', background: '#fff', border: '1.5px solid #000', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        {/* HERO */}
        <div style={{ background: '#FFFFFF', padding: isMobile ? '40px 16px 48px' : '72px 28px 80px', borderBottom: '3px solid #000', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFD23F', border: '2.5px solid #000', borderRadius: 999, padding: '7px 18px', marginBottom: 20, boxShadow: '3px 3px 0px #000' }}>
                <span>🇳🇵</span>
                <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 800, color: '#000' }}>Nepal's First Dedicated Pet Platform</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 38 : 60, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: -2, color: '#000' }}>
                Every Pet<br />
                <span style={{ background: '#fff', padding: '2px 14px', borderRadius: 14, border: '2.5px solid #000', display: 'inline-block', transform: 'rotate(-1.5deg)', boxShadow: '3px 3px 0px #000', color: '#FF6B35' }}>Deserves</span><br />
                a Loving Home 🐾
              </h1>
              <p style={{ color: '#000', fontSize: isMobile ? 15 : 18, lineHeight: 1.65, marginBottom: 28, fontWeight: 600 }}>700+ dogs rehomed since 2018. Find your perfect companion across Nepal.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '13px 24px' : '16px 32px', borderRadius: 14, fontSize: isMobile ? 15 : 17, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>🐾 Adopt a Pet</Link>
                <Link href="/submit-pet" style={{ background: '#fff', color: '#000', padding: isMobile ? '13px 24px' : '16px 32px', borderRadius: 14, fontSize: isMobile ? 15 : 17, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>+ Submit a Pet</Link>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                {[['700+', 'Pets Rehomed', '#58CC02'], ['100% Free', 'Adoption Forever', '#FF6B35'], ['24hr', 'Review Time', '#7B5EA7']].map(([v, l, c]) => (
                  <div key={l} style={{ background: '#fff', borderRadius: 14, padding: '10px 16px', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>
                    <div style={{ color: c, fontWeight: 900, fontSize: isMobile ? 18 : 22, lineHeight: 1 }}>{v}</div>
                    <div style={{ color: '#444', fontSize: 11, marginTop: 3, fontWeight: 700 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO IMAGE */}
            <div style={{ borderRadius: 20, overflow: 'hidden' }}>
              <img
                src="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png"
                alt="HamroPets — Presented by Adopt a Dog Nepal"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }}
              />
            </div>
          </div>
        </div>

        {/* SPECIES + LOCATION FILTER */}
        <div style={{ background: '#FAFAFA', padding: isMobile ? '20px 16px' : '28px', borderBottom: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 900, fontSize: 12, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Species:</span>
              {[['Dogs', '#FF6B35'], ['Cats', '#7B5EA7'], ['Birds', '#38BDF8'], ['All Pets', '#58CC02']].map(([label, color]) => (
                <Link key={label} href="/adopt" style={{ padding: isMobile ? '7px 14px' : '9px 20px', borderRadius: 10, border: '2px solid #000', background: color, color: '#fff', fontSize: isMobile ? 12 : 14, fontWeight: 800, textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'inline-block' }}>{label}</Link>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {!isMobile && <div style={{ width: 2, height: 28, background: '#000', margin: '0 10px' }} />}
                <span style={{ fontWeight: 900, fontSize: 12, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>📍 Area:</span>
              {['All Nepal', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(loc => (
                <Link key={loc} href={`/adopt?location=${loc}`} style={{ padding: isMobile ? '7px 12px' : '9px 18px', borderRadius: 10, border: '2px solid #000', background: '#fff', color: '#000', fontSize: isMobile ? 12 : 13, fontWeight: 700, textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'inline-block' }}>{loc}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED PETS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '60px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Available Now</span>
              <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -0.5 }}>Pets Waiting for You</h2>
              <p style={{ color: '#666', margin: '6px 0 0', fontSize: isMobile ? 13 : 15, fontWeight: 500 }}>All reviewed & approved · Adoption is always free</p>
            </div>
            <Link href="/adopt" style={{ background: '#fff', color: '#000', padding: '10px 18px', borderRadius: 12, border: '2px solid #000', fontSize: 13, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {petsToShow.map(pet => {
              const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
              const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
              const age = [pet.age_years > 0 ? `${pet.age_years}y` : '', pet.age_months > 0 ? `${pet.age_months}m` : ''].filter(Boolean).join(' ') || '?'
              return (
                <Link key={pet.id} href={pet.id.startsWith('demo') ? '/adopt' : `/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ height: isMobile ? 120 : 175, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 52 : 76, position: 'relative', borderBottom: '2px solid #000' }}>
                      {pet.images && pet.images.length > 0 ? (
                        <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : emoji}
                      <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', color: '#000', borderRadius: 999, fontSize: 10, fontWeight: 900, padding: '3px 8px', border: '1.5px solid #000' }}>
                        {pet.vaccinated ? '💉' : `🐾`}
                      </div>
                    </div>
                    <div style={{ padding: isMobile ? '10px 12px' : '16px 18px' }}>
                      <div style={{ fontWeight: 900, fontSize: isMobile ? 15 : 20, color: '#000' }}>{pet.pet_name}</div>
                      <div style={{ color: '#666', fontSize: isMobile ? 11 : 13, marginTop: 2, fontWeight: 600, textTransform: 'capitalize' }}>{pet.breed || pet.species} · {age}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontSize: isMobile ? 11 : 13, color: '#444', fontWeight: 700 }}>📍 {pet.location}</span>
                        <span style={{ background: '#58CC02', color: '#fff', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 999, border: '1.5px solid #000' }}>FREE</span>
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
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🏥 Services</span>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -0.5 }}>Everything Your Pet Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, label: 'Vets & Clinics', desc: 'Find verified vets', color: '#FF6B35', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v18M18 3v18M3 6h18M3 18h18"/></svg>, label: 'Grooming', desc: 'Professional groomers', color: '#7B5EA7', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Pet Boarding', desc: 'Safe stays', color: '#38BDF8', href: '/vets' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#58CC02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, label: 'Dog Walking', desc: 'Trusted walkers', color: '#58CC02', href: '/walk-sit' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, label: 'Pet Sitting', desc: 'Home care', color: '#FF6B9D', href: '/walk-sit' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, label: 'Training', desc: 'Certified trainers', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', boxShadow: '3px 3px 0px #000', padding: isMobile ? '16px' : '24px 28px', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
                  <div style={{ width: isMobile ? 44 : 64, height: isMobile ? 44 : 64, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${s.color}40` }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 17, color: '#000' }}>{s.label}</div>
                    <div style={{ color: '#666', fontSize: isMobile ? 11 : 13, marginTop: 2, fontWeight: 500 }}>{s.desc}</div>
                  </div>
                  {!isMobile && <div style={{ marginLeft: 'auto', color: '#000', fontSize: 18, fontWeight: 700 }}>→</div>}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED VETS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>⭐ Top Rated</span>
              <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#000', margin: 0 }}>Trusted Vets & Services</h2>
            </div>
            <Link href="/vets" style={{ background: '#fff', color: '#000', padding: '10px 18px', borderRadius: 12, border: '2px solid #000', fontSize: 13, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Full Directory →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20 }}>
            {[
              { name: 'Kathmandu Vet Hospital', cat: 'Vet Clinic', area: 'Maharajgunj', emoji: '🏥', bg: '#FFEAE6', rating: '4.9' },
              { name: 'Paws & Claws Care', cat: 'Grooming', area: 'Thamel', emoji: '✂️', bg: '#EBF5FF', rating: '4.8' },
              { name: 'Happy Paws Boarding', cat: 'Boarding', area: 'Budhanilkantha', emoji: '🏠', bg: '#EAFCE0', rating: '4.7' },
              { name: 'K9 Training Academy', cat: 'Training', area: 'Baneshwor', emoji: '🎓', bg: '#FFF9E6', rating: '4.9' },
            ].map(v => (
              <Link key={v.name} href="/vets" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                  <div style={{ height: isMobile ? 90 : 130, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 36 : 52, borderBottom: '2px solid #000', position: 'relative' }}>
                    {v.emoji}
                    <div style={{ position: 'absolute', top: 8, right: 8, background: '#000', color: '#FFD23F', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 4 }}>FEATURED</div>
                  </div>
                  <div style={{ padding: isMobile ? '10px 12px' : '16px' }}>
                    <div style={{ background: '#FF6B35', color: '#fff', display: 'inline-block', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 4, marginBottom: 6 }}>{v.cat}</div>
                    <div style={{ fontWeight: 900, fontSize: isMobile ? 12 : 15, color: '#000', marginBottom: 3, lineHeight: 1.3 }}>{v.name}</div>
                    <div style={{ fontSize: isMobile ? 11 : 13, color: '#555', fontWeight: 700 }}>📍 {v.area}</div>
                    <div style={{ fontSize: isMobile ? 11 : 13, color: '#F59E0B', fontWeight: 800, marginTop: 8, paddingTop: 6, borderTop: '1.5px dashed #E5E7EB' }}>⭐ {v.rating}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI VET BANNER */}
        <div style={{ maxWidth: 1200, margin: isMobile ? '32px auto 0' : '56px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#7B5EA7', borderRadius: 20, padding: isMobile ? '28px 20px' : '44px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div>
              <span style={{ background: '#fff', color: '#7B5EA7', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '1.5px solid #000' }}>🤖 Powered by Gemini Pro</span>
              <h3 style={{ color: '#fff', fontSize: isMobile ? 22 : 30, fontWeight: 900, margin: '0 0 10px', letterSpacing: -0.5 }}>AI Vet — Ask Anything</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: isMobile ? 13 : 15, fontWeight: 600, maxWidth: 480 }}>Instant answers about your pet's health, nutrition and behaviour.</p>
            </div>
            <Link href="/ai-vet" style={{ background: '#FFD23F', color: '#000', padding: isMobile ? '13px 24px' : '16px 32px', borderRadius: 14, fontSize: isMobile ? 14 : 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block', whiteSpace: 'nowrap' }}>Launch AI Vet →</Link>
          </div>
        </div>

        {/* LOST & FOUND */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#FFF0F6', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
              <h3 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, margin: '0 0 6px', color: '#000' }}>Lost or Found a Pet?</h3>
              <p style={{ color: '#666', margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 600 }}>Our community reunites pets with their families across Nepal.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>🔴 I Lost My Pet</Link>
              <Link href="/lost-found" style={{ background: '#58CC02', color: '#fff', padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>🟢 I Found a Pet</Link>
            </div>
          </div>
        </div>

        {/* SWOR AI BANNER */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px' : '0 28px' }}>
          <div style={{ background: '#FF6B35', borderRadius: 20, padding: isMobile ? '28px 20px' : '40px 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 32, border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: isMobile ? 52 : 68, height: isMobile ? 52 : 68, borderRadius: 16, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 24 : 32, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', flexShrink: 0 }}>🎙️</div>
              <div>
                <span style={{ background: '#fff', color: '#FF6B35', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 900, display: 'inline-block', marginBottom: 6, border: '1.5px solid #000' }}>A MeroAD.ai Product</span>
                <h3 style={{ color: '#fff', fontSize: isMobile ? 16 : 22, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: isMobile ? 12 : 13, fontWeight: 600 }}>Generate authentic Nepali AI voices · meroadai.com</p>
                <a href="https://tiktok.com/@meroadai" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, background: '#000', color: '#fff', padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #fff' }}>📱 Watch on TikTok</a>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#000', padding: isMobile ? '12px 20px' : '14px 28px', borderRadius: 14, fontSize: isMobile ? 13 : 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block', whiteSpace: 'nowrap' }}>Try Swor AI →</a>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', marginTop: isMobile ? 48 : 72, padding: isMobile ? '40px 16px 28px' : '56px 28px 36px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.6fr 1fr 1fr 1fr', gap: isMobile ? 24 : 48, marginBottom: 36 }}>
              <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: '#000' }}>HamroPets</div>
                    <div style={{ fontSize: 10, color: '#888', fontWeight: 600 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, maxWidth: 280, fontWeight: 500 }}>Nepal's first dedicated pet platform. Built on 8 years of trust from Adopt a Dog Nepal.</p>
                <div style={{ marginTop: 12, display: 'inline-block', background: '#FFF0EB', padding: '5px 12px', borderRadius: 8, border: '1.5px solid #000', fontSize: 11, fontWeight: 800, color: '#FF6B35' }}>🚀 A MeroAD.ai Product</div>
              </div>
              {[
                ['Platform', ['Adopt a Pet', 'Vet Directory', 'Dog Walking', 'Lost & Found', 'AI Vet']],
                ['For Businesses', ['Advertise', 'List Your Clinic', 'Partner with Us']],
                ['Company', ['About HamroPets', 'Adopt a Dog Nepal', 'Swor AI', 'Contact Us']],
              ].map(([heading, items]) => (
                <div key={heading}>
                  <div style={{ fontWeight: 900, fontSize: 11, color: '#000', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{heading}</div>
                  {items.map(item => (
                    <div key={item} style={{ color: '#666', fontSize: isMobile ? 12 : 14, marginBottom: 8, cursor: 'pointer', fontWeight: 600 }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid #000', paddingTop: 20, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
              <span style={{ color: '#888', fontSize: 12, fontWeight: 600 }}>© 2025 HamroPets · All rights reserved</span>
              <span style={{ color: '#000', fontSize: 12, fontWeight: 800, background: '#FFF0F6', padding: '4px 12px', borderRadius: 8, border: '2px solid #000' }}>Built with ❤️ in Kathmandu 🇳🇵</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
