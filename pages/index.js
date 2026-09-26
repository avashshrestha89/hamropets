import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
 const [{ data: featuredPets }, { data: featuredVets }, { data: featuredWalkers }, { data: lostFoundPets }, { data: starPets }, { data: starWalker }, { data: superPets }] = await Promise.all([
    supabase.from('pet_listings').select('*').in('status', ['approved', 'adopted']).order('created_at', { ascending: false }).limit(8),
    supabase.from('vet_listings').select('*').eq('status', 'approved').in('tier', ['featured', 'verified']).order('created_at', { ascending: false }).limit(3),
    supabase.from('walker_applications').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(6),
    supabase.from('lost_found').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(6),
   supabase.from('pet_listings').select('*').eq('is_featured', true).eq('status', 'approved').order('created_at', { ascending: false }).limit(3),
    supabase.from('walker_applications').select('*').eq('is_featured', true).eq('status', 'approved').order('created_at', { ascending: false }).limit(1),
    supabase.from('pet_listings').select('*').eq('is_super_featured', true).eq('status', 'approved').order('created_at', { ascending: false }).limit(1),
  ])
   return { props: { featuredPets: featuredPets || [], featuredVets: featuredVets || [], featuredWalkers: featuredWalkers || [], lostFoundPets: lostFoundPets || [], starPets: starPets || [], starWalker: starWalker?.[0] || null, superPet: superPets?.[0] || null } }
}
function Slideshow({ slides }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length, paused])

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent(c => (c + 1) % slides.length)

  return (
    <div style={{ width: '100%' }}>
      {/* IMAGE */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}>
        {slides.map((slide, i) => (
          <Link key={i} href={slide.href} style={{ textDecoration: 'none' }}>
            <img
              src={slide.url}
              alt={slide.alt}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                borderRadius: 17,
              }}
            />
          </Link>
        ))}
      </div>

      {/* CONTROLS BELOW IMAGE */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 }}>
        {/* PREV */}
        <button
          onClick={prev}
          style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 900, boxShadow: '2px 2px 0px #1A1A1A' }}
        >←</button>

        {/* DOTS */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? '#58CC02' : '#D1D5DB', border: '1.5px solid #1A1A1A', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
            />
          ))}
        </div>

        {/* PAUSE / PLAY */}
        <button
          onClick={() => setPaused(p => !p)}
          style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13, fontWeight: 900, boxShadow: '2px 2px 0px #1A1A1A' }}
        >{paused ? '▶' : '⏸'}</button>

        {/* NEXT */}
        <button
          onClick={next}
          style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: 999, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, fontWeight: 900, boxShadow: '2px 2px 0px #1A1A1A' }}
        >→</button>
           </div>
    </div>
  )
}

export default function Home({ featuredPets, featuredVets, featuredWalkers, lostFoundPets, starPets, starWalker, superPet }) {
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
  <title>HamroPets — Nepal's First Pet Platform | Adopt, Walk, Sit & Vet</title>
  <meta name="description" content="Nepal's first dedicated pet platform. Adopt dogs and cats, find verified dog walkers and pet sitters in Kathmandu, locate vets, and report lost pets. Presented by Adopt a Dog Nepal since 2018. 700+ pets rehomed." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://www.hamropets.com/" />
  <meta name="keywords" content="pet adoption Nepal, dog adoption Kathmandu, cat adoption Kathmandu, pet sitting Kathmandu, dog walking Kathmandu, dog walker Lalitpur, pet boarding Kathmandu, vet clinic Kathmandu, lost found pets Nepal, adopt a dog Nepal, kukur adopt garne, HamroPets, Adopt a Dog Nepal, pet care platform Nepal, dog hostel Kathmandu" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="HamroPets — Nepal's First Pet Platform | Adopt, Walk, Sit & Vet" />
  <meta property="og:description" content="Adopt pets, find verified dog walkers and pet sitters, locate vets, and report lost pets across Nepal. Presented by Adopt a Dog Nepal since 2018. 700+ pets rehomed." />
  <meta property="og:url" content="https://www.hamropets.com" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="HamroPets — Nepal's First Pet Platform" />
  <meta name="twitter:description" content="Adopt pets, find dog walkers, pet sitters and vets across Nepal. Presented by Adopt a Dog Nepal since 2018." />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "HamroPets",
          "url": "https://www.hamropets.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.hamropets.com/adopt?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "HamroPets",
          "url": "https://www.hamropets.com",
          "logo": "https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png",
          "description": "Nepal's first dedicated pet platform offering free pet adoption, verified vet directory, dog walking and cage-free pet sitting services across Kathmandu Valley. Presented by Adopt a Dog Nepal since 2018.",
          "foundingDate": "2024",
          "areaServed": "Nepal",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Adopt a Dog Nepal",
            "foundingDate": "2018",
            "url": "https://www.facebook.com/AdoptaDogNepal"
          },
          "sameAs": [
            "https://www.facebook.com/AdoptaDogNepal",
            "https://www.tiktok.com/@adoptadognepal"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Pet Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pet Adoption Nepal",
                  "description": "Free pet adoption across Nepal — dogs, cats and more"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Dog Walking Kathmandu",
                  "description": "Verified dog walking service in Kathmandu Valley from NPR 300 per walk"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pet Sitting Kathmandu",
                  "description": "Cage-free verified pet sitting in Kathmandu Valley from NPR 700 per day"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Vet Directory Nepal",
                  "description": "Verified vet clinics and pet services directory across Nepal"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Lost and Found Pets Nepal",
                  "description": "Community lost and found pet reporting service across Nepal"
                }
              }
            ]
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is HamroPets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HamroPets is Nepal's first comprehensive pet care platform, presented by Adopt a Dog Nepal — a nonprofit that has rehomed 700+ pets since 2018. The platform offers pet adoption, verified dog walking, cage-free pet sitting, a vet directory, and lost and found pet reporting across the Kathmandu Valley."
              }
            },
            {
              "@type": "Question",
              "name": "Is HamroPets operated by a nonprofit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. HamroPets is presented by Adopt a Dog Nepal, a registered nonprofit organization that has successfully rehomed over 700 pets since 2018. Adopt a Dog Nepal manages the platform's social media presence while HamroPets.com serves as the full digital pet services platform."
              }
            },
            {
              "@type": "Question",
              "name": "What services are available for pet owners in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HamroPets offers five core services: free pet adoption (dogs and cats), verified dog walking from NPR 300 per walk, cage-free pet sitting from NPR 700 per day, a comprehensive vet clinic directory across Nepal, and a lost and found pet reporting board for the community."
              }
            },
            {
              "@type": "Question",
              "name": "Are the pet sitters and dog walkers on HamroPets verified?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All dog walkers and pet sitters listed on HamroPets are verified using their Nepal Government issued Citizenship Card before being listed on the platform. Only approved, ID-verified sitters and walkers appear in search results."
              }
            },
            {
              "@type": "Question",
              "name": "Does HamroPets charge a fee for pet adoption?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Pet adoption on HamroPets is completely free. The platform connects adopters with pet owners and rescue organizations at no charge. HamroPets advocates for ethical adoption as an alternative to buying from breeders."
              }
            }
          ]
        }
      ])
    }}
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="icon" href="/favicon.ico" />
</Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px 0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, overflow: 'hidden', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', flexShrink: 0 }}>   <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png" alt="HamroPets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
                {!isMobile && <div style={{ fontSize: 9, color: '#888', fontWeight: 600 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>}
              </div>
            </Link>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found']].map(([label, href]) => (
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
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found']].map(([label, href]) => (
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
<h2 style={{ color: '#374151', fontSize: isMobile ? 15 : 17, lineHeight: 1.7, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", margin: '0 0 16px' }}>Nepal's first pet platform for free dog adoption, verified dog walking, cage-free pet sitting and vet directory across Kathmandu Valley. 700+ pets rehomed since 2018.</h2>
<p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 14, lineHeight: 1.8, fontWeight: 500, margin: '0 0 28px', fontFamily: "'DM Sans', sans-serif" }}>
  <strong style={{ color: '#1A1A1A' }}>HamroPets</strong> is Nepal's first dedicated pet services platform presented by <strong style={{ color: '#1A1A1A' }}>Adopt a Dog Nepal</strong> — a nonprofit operating since April 2018 that has rehomed over 700 dogs and cats across Nepal. HamroPets offers free pet adoption listings, ID-verified dog walkers from NPR 300 per walk, cage-free pet sitting from NPR 700 per day, a veterinary clinic directory across Kathmandu, Lalitpur and Bhaktapur, and a lost and found pet reporting system. All adoptions on HamroPets are 100% free. Payment accepted via eSewa and Khalti.
</p>              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#21a1eb', color: '#fff', padding: isMobile ? '13px 24px' : '15px 30px', borderRadius: 14, fontSize: isMobile ? 15 : 16, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534', display: 'inline-block' }}> Adopt a Pet</Link>
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
<div style={{ width: '100%' }}>
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
{/* SUPER URGENT — PRIORITY SHIELD */}
{superPet && (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '60px 28px 0' }}>
    <div style={{ marginBottom: 16 }}>
      <span style={{ background: '#FF3B30', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A', animation: 'pulse 2s infinite' }}>🚨 URGENT</span>
    </div>
    <Link href={`/pet/${superPet.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '4px solid #FF3B30', overflow: 'hidden', boxShadow: '6px 6px 0px #FF3B30', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* PHOTO */}
        <div style={{ width: isMobile ? '100%' : 320, height: isMobile ? 240 : 300, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0, borderRight: isMobile ? 'none' : '4px solid #FF3B30', borderBottom: isMobile ? '4px solid #FF3B30' : 'none', position: 'relative' }}>
          {superPet.images && superPet.images.length > 0 ? (
            <img src={superPet.images[0]} alt={superPet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#FEF2F2' }} />
          ) : (
            <span>{superPet.species === 'dog' ? '🐕' : superPet.species === 'cat' ? '🐈' : '🐾'}</span>
          )}
          <div style={{ position: 'absolute', top: 12, left: 12, background: '#FF3B30', color: '#fff', fontSize: 11, fontWeight: 900, padding: '4px 12px', borderRadius: 999, border: '2px solid #1A1A1A' }}>
            🚨 NEEDS HOME URGENTLY
          </div>
        </div>
        {/* DETAILS */}
        <div style={{ padding: isMobile ? '20px 16px' : '28px 32px', flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: isMobile ? 24 : 32, color: '#1A1A1A', marginBottom: 6, letterSpacing: -0.5 }}>{superPet.pet_name}</div>
          <div style={{ fontSize: isMobile ? 13 : 15, color: '#6B7280', fontWeight: 600, marginBottom: 12 }}>
            {superPet.breed || superPet.species} · {superPet.gender} · 📍 {superPet.location}
          </div>
          <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.7, marginBottom: 20, fontWeight: 500 }}>
            {superPet.description?.substring(0, 200)}{superPet.description?.length > 200 ? '...' : ''}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {superPet.vaccinated && <span style={{ background: '#E8F9ED', color: '#166534', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: '1.5px solid #166534' }}>💉 Vaccinated</span>}
            {superPet.neutered && <span style={{ background: '#E8F9ED', color: '#166534', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: '1.5px solid #166534' }}>✂️ Neutered</span>}
            {superPet.friendly_children === 'yes' && <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: '1.5px solid #1D4ED8' }}>👶 Kid-friendly</span>}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={`tel:${superPet.submitter_phone}`} onClick={e => e.stopPropagation()} style={{ background: '#FF3B30', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
              📞 Call Now
            </a>
            <a href={`https://wa.me/977${superPet.submitter_phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
              💬 WhatsApp
            </a>
            <span style={{ background: '#1A1A1A', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, border: '2px solid #1A1A1A' }}>
              View Full Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  </div>
)}
{/* STAR FEATURED PETS */}
{starPets && starPets.length > 0 && (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '60px 28px 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>⭐ Featured</span>
        <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Featured Pets</h2>
        <p style={{ color: '#6B7280', margin: '6px 0 0', fontSize: isMobile ? 13 : 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Hand-picked pets looking for their forever home</p>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? 12 : 20 }}>
      {starPets.map(pet => {
        const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
        const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
        return (
          <Link key={pet.id} href={`/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '3px solid #FFD23F', overflow: 'hidden', boxShadow: '4px 4px 0px #B45309' }}>
              <div style={{ height: isMobile ? 200 : 260, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 52 : 72, position: 'relative', borderBottom: '3px solid #FFD23F' }}>
                {pet.images && pet.images.length > 0 ? <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#FFFBEB' }} /> : emoji}
                <div style={{ position: 'absolute', top: 8, left: 8, background: '#FFD23F', color: '#1A1A1A', borderRadius: 999, fontSize: 10, fontWeight: 900, padding: '3px 10px', border: '1.5px solid #1A1A1A' }}>⭐ Featured</div>
              </div>
              <div style={{ padding: isMobile ? '10px 12px' : '14px 16px' }}>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 14 : 17, color: '#1A1A1A', marginBottom: 2 }}>{pet.pet_name}</div>
                <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 600 }}>{pet.breed || pet.species} · {[pet.age_years > 0 ? `${pet.age_years}y` : '', pet.age_months > 0 ? `${pet.age_months}m` : ''].filter(Boolean).join(' ') || '?'} · {pet.gender}</div>
                <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 2, fontWeight: 500 }}>📍 {pet.location}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1.5px dashed #FFD23F' }}>
                  <span style={{ background: '#FFD23F', color: '#1A1A1A', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>FREE Adoption</span>
                  <span style={{ background: '#1A1A1A', color: '#FFD23F', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>View →</span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  </div>
)}
        {/* FEATURED PETS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '60px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ background: '#58CC02', color: '#1a1a1a', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}> Available Now</span>
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
                   <div style={{ height: isMobile ? 200 : 240, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 52 : 72, position: 'relative', borderBottom: '2px solid #1A1A1A' }}>
                      {pet.images && pet.images.length > 0 ? <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} /> : emoji}
                      <div style={{ position: 'absolute', top: 8, left: 8, background: pet.status === 'adopted' ? '#FF6B9D' : '#fff', color: pet.status === 'adopted' ? '#fff' : '#1A1A1A', borderRadius: 999, fontSize: 10, fontWeight: 800, padding: '3px 8px', border: '1.5px solid #1A1A1A' }}>
  {pet.status === 'adopted' ? '🎉 ADOPTED' : pet.vaccinated ? '💉 Vaccinated' : `🐾 ${pet.species}`}
</div>
                    </div>
                <div style={{ padding: isMobile ? '10px 12px' : '14px 16px' }}>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 17, color: '#1A1A1A', marginBottom: 4 }}>{pet.pet_name}</div>
                      <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 12, fontWeight: 500, textTransform: 'capitalize', fontFamily: "'DM Sans', sans-serif" }}>{pet.breed || pet.species} · {age}</div>
                      <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 600, marginTop: 4 }}>📍 {pet.location}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
{/* STAR FEATURED WALKER */}
{starWalker && (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
    <div style={{ marginBottom: 20 }}>
      <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>⭐ Featured Sitter</span>
      <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: 0 }}>Top Rated Pet Sitter</h2>
    </div>
    <a href={`/walker/${starWalker.id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <div style={{ background: '#FFFBEB', borderRadius: 20, border: '3px solid #FFD23F', overflow: 'hidden', boxShadow: '5px 5px 0px #B45309', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <div style={{ width: isMobile ? '100%' : 220, height: isMobile ? 200 : 220, background: 'linear-gradient(135deg, #FFD23F25, #FFD23F50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, flexShrink: 0, borderRight: isMobile ? 'none' : '3px solid #FFD23F', borderBottom: isMobile ? '3px solid #FFD23F' : 'none' }}>
          {starWalker.profile_photo ? <img src={starWalker.profile_photo} alt={starWalker.full_name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#FFFBEB' }} /> : '🌟'}
        </div>
        <div style={{ padding: isMobile ? '16px' : '24px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: '#1A1A1A' }}>{starWalker.full_name}</div>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', fontSize: 10, fontWeight: 900, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>⭐ Featured</span>
          </div>
          <div style={{ fontSize: isMobile ? 13 : 14, color: '#6B7280', fontWeight: 600, marginBottom: 6 }}>{starWalker.services === 'Both' ? '🦮 Dog Walking & 🛋️ Pet Sitting' : starWalker.services}</div>
          <div style={{ fontSize: isMobile ? 12 : 13, color: '#9CA3AF', fontWeight: 500, marginBottom: 12 }}>📍 {starWalker.city || starWalker.area}{starWalker.locality ? ` · ${starWalker.locality}` : ''}</div>
          <div style={{ fontSize: isMobile ? 13 : 14, color: '#374151', lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>{starWalker.experience?.substring(0, 120)}{starWalker.experience?.length > 120 ? '...' : ''}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ background: '#E8F9ED', color: '#166534', fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🪪 ID Verified</span>
            <span style={{ background: '#fff', color: '#1A1A1A', fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>From NPR 300/walk · NPR 700/day</span>
            <span style={{ background: '#1A1A1A', color: '#FFD23F', fontSize: 12, fontWeight: 800, padding: '5px 14px', borderRadius: 999 }}>View Profile →</span>
          </div>
        </div>
      </div>
    </a>
  </div>
)}
{/* FEATURED WALKERS & SITTERS */}
        {featuredWalkers.length > 0 && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ background: '#38BDF8', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🦮 Verified</span>
                <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Dog Walkers & Pet Sitters</h2>
                <p style={{ color: '#6B7280', margin: '6px 0 0', fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>Nagarik App verified · Available across Kathmandu Valley</p>
              </div>
              <Link href="/walk-sit" style={{ background: '#fff', color: '#1A1A1A', padding: '10px 18px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? 10 : 20, width: '100%', minWidth: 0 }}>
                  {featuredWalkers.map(w => (
<a key={w.id} href={`/walker/${w.id}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: isMobile ? 200 : 240, background: w.services?.includes('Sitting') ? 'linear-gradient(135deg, #FF6B9D25, #FF6B9D50)' : 'linear-gradient(135deg, #38BDF825, #38BDF850)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 52, borderBottom: '2px solid #1A1A1A', position: 'relative' }}>
                      {w.profile_photo ? <img src={w.profile_photo} alt={w.full_name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} /> : w.services?.includes('Sitting') ? '🛋️' : '🦮'}
                      <div style={{ position: 'absolute', top: 8, left: 8, background: '#58CC02', color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 7px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🪪 ID Verified</div>
                    </div>
                    <div style={{ padding: isMobile ? '10px 12px' : '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', marginBottom: 2 }}>{w.full_name}</div>
                      <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 600 }}>{w.services === 'Both' || w.services?.includes('Both') ? '🦮 Dog Walking & 🛋️ Pet Sitting' : w.services}</div>
                      <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 2, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {w.area}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontWeight: 900, color: '#58CC02', fontSize: isMobile ? 12 : 14 }}>From NPR 300/walk · NPR 700/day</span>
                        <span style={{ background: '#38BDF8', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>View Profile</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
{/* LOST & FOUND PANEL */}
        {lostFoundPets.length > 0 && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ background: '#FF6B9D', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🔍 Help Reunite</span>
                <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Recently Lost & Found</h2>
                <p style={{ color: '#6B7280', margin: '6px 0 0', fontSize: isMobile ? 13 : 14, fontWeight: 500 }}>Help reunite pets with their families across Nepal</p>
              </div>
              <Link href="/lost-found" style={{ background: '#fff', color: '#1A1A1A', padding: '10px 18px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>View All →</Link>
            </div>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? 10 : 20, width: '100%', minWidth: 0 }}>
              {lostFoundPets.map(item => (
                <Link key={item.id} href="/lost-found" style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#FFFFFF', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                   <div style={{ height: isMobile ? 200 : 240, background: item.type === 'lost' ? '#FEF2F2' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 52, borderBottom: '2px solid #1A1A1A', position: 'relative' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.pet_name || 'Pet'} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} />
                      ) : (
                        item.species === 'Dog' ? '🐕' : item.species === 'Cat' ? '🐈' : item.species === 'Bird' ? '🐦' : '🐾'
                      )}
                      <div style={{ position: 'absolute', top: 8, left: 8, background: item.type === 'lost' ? '#FF6B9D' : '#58CC02', color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 7px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>
                        {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                      </div>
                    </div>
                    <div style={{ padding: isMobile ? '10px 12px' : '14px 16px' }}>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', marginBottom: 2 }}>{item.pet_name || 'Unknown'}</div>
                      <div style={{ fontSize: isMobile ? 10 : 12, color: '#9CA3AF', marginTop: 2, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {item.area}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontSize: isMobile ? 10 : 12, color: '#6B7280', fontWeight: 600 }}>🕐 {new Date(item.created_at).toLocaleDateString('en-NP', { day: 'numeric', month: 'short' })}</span>
                        <span style={{ background: '#FF6B9D', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* SERVICES GRID */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 0' : '56px 28px 0' }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ background: '#58CC02', color: '#1a1a1a', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🏥 Services</span>
            <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: 0, letterSpacing: -0.5 }}>Everything Your Pet Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? 12 : 20 }}>
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
              <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 10, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}> Top Rated</span>
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
                      {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} /> : emoji}
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


        {/* LOST & FOUND */}
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px 0 16px' : '0 28px' }}>
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
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px 0 16px' : '0 28px' }}>
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
        <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: isMobile ? '0 16px 0 16px' : '0 28px' }}>
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
{/* FAQ SECTION */}
<div style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', marginTop: isMobile ? 48 : 64 }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 16px' : '64px 28px' }}>
    <div style={{ marginBottom: 40, textAlign: 'center' }}>
      <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>❓ FAQ</span>
      <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Frequently Asked Questions</h2>
      <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500, margin: 0 }}>Everything you need to know about HamroPets and our services</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780, margin: '0 auto' }}>
      {[
        {
          q: 'What is HamroPets?',
          a: 'HamroPets is Nepal\'s first comprehensive pet care platform, presented by Adopt a Dog Nepal — a nonprofit that has rehomed 700+ pets since 2018. We offer free pet adoption, verified dog walking, cage-free pet sitting, a vet directory, and a lost and found board across Kathmandu Valley.'
        },
        {
          q: 'Is HamroPets connected to a nonprofit?',
          a: 'Yes. HamroPets is presented by Adopt a Dog Nepal, a trusted nonprofit active since 2018 with 700+ successful pet rehomings. Adopt a Dog Nepal manages our social media community while HamroPets.com is the full digital pet services platform.'
        },
        {
          q: 'What services are available for pet owners in Kathmandu?',
          a: 'Pet owners can access five core services: free pet adoption for dogs and cats, ID-verified dog walkers from NPR 300 per walk, cage-free pet sitters from NPR 700 per day, a vet clinic directory across Nepal, and a community lost and found pet board.'
        },
        {
          q: 'Are the pet sitters and dog walkers on HamroPets verified?',
          a: 'Yes. All dog walkers and pet sitters on HamroPets are verified using their Nepal Government issued Citizenship Card before being listed. Only approved, ID-verified carers appear in search results so your pet is always in safe hands.'
        },
        {
          q: 'Does HamroPets charge a fee for pet adoption?',
          a: 'No. Pet adoption on HamroPets is completely free. We connect adopters with pet owners and rescue organizations at no charge. We advocate for ethical adoption as an alternative to buying from breeders.'
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
['Platform', [['Adopt a Dog or Cat in Nepal', '/adopt'], ['Vet Clinics & Pet Services Kathmandu', '/vets'], ['Dog Walking & Pet Sitting Kathmandu', '/walk-sit'], ['Lost & Found Pets Nepal', '/lost-found']]],                ['For Businesses', [['Advertise on HamroPets', '/advertise'], ['List Your Vet Clinic', '/list-business'], ['Partner with Us', '/advertise']]],
                ['Company', [['About HamroPets', '/about'], ['Adopt a Dog Nepal', 'https://www.facebook.com/AdoptaDogNepal'], ['Swor AI — Nepali TTS', 'https://meroadai.com'], ['Contact Us', '/advertise']]],
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
            
<div style={{ borderTop: '2px solid #E5E7EB', paddingTop: 20, marginBottom: 16 }}>
              <p style={{ color: '#9CA3AF', fontSize: 11, lineHeight: 1.7, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", margin: 0, maxWidth: 900 }}>
                HamroPets is Nepal's first dedicated pet platform offering free dog and cat adoption, verified dog walking from NPR 300/walk, cage-free pet sitting from NPR 700/day, a vet clinic directory across Kathmandu Valley, lost and found pet reporting. Presented by Adopt a Dog Nepal — rehoming pets across Nepal since 2018. Serving Kathmandu, Lalitpur, Bhaktapur and surrounding areas. kukur adopt garne · pet sitting Kathmandu · dog walker Kathmandu.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
  <span style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>© 2026 HamroPets · All rights reserved</span>
  <div style={{ display: 'flex', gap: 16 }}>
    <Link href="/privacy-policy" style={{ color: '#9CA3AF', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
    <Link href="/terms" style={{ color: '#9CA3AF', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
                  <Link href="/about" style={{ color: '#9CA3AF', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>About</Link>
  </div>
</div>              <span style={{ color: '#1A1A1A', fontSize: 12, fontWeight: 800, background: '#FFF0F6', padding: '4px 12px', borderRadius: 8, border: '2px solid #1A1A1A' }}>Built with ❤️ in Kathmandu 🇳🇵</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
