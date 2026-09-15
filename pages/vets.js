import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('vet_listings')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  return { props: { vets: data || [] } }
}

export default function Vets({ vets }) {
  const [isMobile, setIsMobile] = useState(false)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fallbackVets = [
    { id: 'f1', business_name: 'Kathmandu Veterinary Hospital', category: 'vet_clinic', district: 'Maharajgunj', phone: '01-4521234', tier: 'featured', description: 'Full service veterinary hospital with emergency care', logo_url: null },
    { id: 'f2', business_name: 'Paws & Claws Grooming Studio', category: 'grooming', district: 'Thamel', phone: '98XXXXXXXX', tier: 'featured', description: 'Professional grooming for all breeds', logo_url: null },
    { id: 'f3', business_name: 'Happy Paws Pet Boarding', category: 'pet_boarding', district: 'Budhanilkantha', phone: '98XXXXXXXX', tier: 'featured', description: 'Safe and comfortable boarding for your pets', logo_url: null },
    { id: 'f4', business_name: 'K9 Training Nepal', category: 'dog_trainer', district: 'Baneshwor', phone: '98XXXXXXXX', tier: 'verified', description: 'Certified dog trainers with 10+ years experience', logo_url: null },
  ]

  const categoryEmoji = { vet_clinic: '🏥', grooming: '✂️', pet_boarding: '🏠', pet_shop: '🛒', dog_trainer: '🎓', other: '🐾' }
  const categoryColor = { vet_clinic: '#FF6B35', grooming: '#7B5EA7', pet_boarding: '#38BDF8', pet_shop: '#58CC02', dog_trainer: '#FFD23F', other: '#FF6B9D' }
  const categoryLabel = { vet_clinic: 'Vet Clinic', grooming: 'Grooming', pet_boarding: 'Boarding', pet_shop: 'Pet Shop', dog_trainer: 'Trainer', other: 'Other' }

  const vetsToShow = vets.length > 0 ? vets : fallbackVets
  const categoryMap = { 'All': null, 'Vets': 'vet_clinic', 'Groomers': 'grooming', 'Boarding': 'pet_boarding', 'Pet Shops': 'pet_shop', 'Trainers': 'dog_trainer' }
  const filtered = category === 'All' ? vetsToShow : vetsToShow.filter(v => v.category === categoryMap[category])
  const featured = filtered.filter(v => v.tier === 'featured')
  const verified = filtered.filter(v => v.tier === 'verified')
  const basic = filtered.filter(v => v.tier === 'basic')

  return (
    <>
 <Head>
  <title>Vet Clinics & Pet Services Kathmandu — Find Trusted Vets | HamroPets</title>
  <meta name="description" content="Find verified vet clinics, groomers, pet boarding and pet services across Nepal. Browse the most comprehensive vet directory in Kathmandu Valley. Presented by Adopt a Dog Nepal since 2018." />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://www.hamropets.com/vets" />
  <meta name="keywords" content="vet clinic Kathmandu, veterinary hospital Nepal, best vet Kathmandu, 24 hour vet Kathmandu, dog vet Kathmandu, cat vet Nepal, pet grooming Kathmandu, ramro vet clinic kathmandu, emergency vet Kathmandu, pet boarding Nepal, vet near me Kathmandu, animal hospital Kathmandu, dog vaccination Kathmandu, online vet consultation Nepal" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Vet Clinics & Pet Services Kathmandu | HamroPets" />
  <meta property="og:description" content="Find verified vet clinics, groomers and pet services across Nepal. Nepal's most comprehensive pet services directory presented by Adopt a Dog Nepal." />
  <meta property="og:url" content="https://www.hamropets.com/vets" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://res.cloudinary.com/dkxxscyei/image/upload/v1780649873/hamro_2_gsifdx.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Vet Clinics & Pet Services Kathmandu | HamroPets" />
  <meta name="twitter:description" content="Find verified vets, groomers and pet services across Nepal. Presented by Adopt a Dog Nepal since 2018." />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Veterinary Clinics and Pet Services in Nepal",
          "description": "Comprehensive directory of verified vet clinics, groomers, pet boarding and pet services across Kathmandu Valley.",
          "url": "https://www.hamropets.com/vets"
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where can I find a 24-hour emergency vet in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HamroPets provides a directory of veterinary clinics in Kathmandu Valley including emergency services. Major institutions like Central Referral Veterinary Hospital operate extended hours. Browse the HamroPets vet directory and filter by category to find emergency services near you."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a vet consultation cost in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Routine veterinary consultations in Kathmandu generally cost NPR 500 to NPR 1,500, excluding medications, vaccinations or specialized diagnostics. Prices vary depending on the clinic, the type of animal, and the complexity of the consultation."
              }
            },
            {
              "@type": "Question",
              "name": "Do vets in Kathmandu offer home visits for pets?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, several veterinary professionals and clinics listed on HamroPets provide home visit or ambulatory services for emergencies and routine vaccinations. Check individual clinic listings for home visit availability."
              }
            },
            {
              "@type": "Question",
              "name": "Where can I get my dog vaccinated against Rabies in Kathmandu?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rabies vaccinations are available at almost all registered vet clinics on HamroPets. Many animal welfare organizations in Kathmandu also conduct free or subsidized vaccination camps periodically. Core vaccines for dogs include Rabies, Canine Distemper, and Parvovirus."
              }
            },
            {
              "@type": "Question",
              "name": "What is the best veterinary hospital in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best vet depends on your pet's specific needs and your location. Kathmandu has several highly regarded institutions including advanced private clinics across Lalitpur, Kathmandu and Bhaktapur. Browse the HamroPets vet directory to find top-rated clinics near you with verified contact details."
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
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Vets' ? 800 : 600, color: label === 'Vets' ? '#58CC02' : '#1A1A1A', background: label === 'Vets' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
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
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'Vets' ? 800 : 600, color: label === 'Vets' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'Vets' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '28px 16px' : '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#E0F6FF', color: '#38BDF8', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🏥 Directory</span>
          <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -1 }}>Vets & Pet Services</h1>
          <p style={{ color: '#6B7280', marginBottom: 28, fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>Verified businesses across Nepal</p>

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
            <input placeholder="🔍  Search clinics, groomers..." style={{ flex: 1, minWidth: isMobile ? 140 : 200, padding: '10px 16px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxShadow: '2px 2px 0px #1A1A1A' }} />
            {['All', 'Vets', 'Groomers', 'Boarding', 'Pet Shops', 'Trainers'].map(f => (
              <button key={f} onClick={() => setCategory(f)} style={{ padding: isMobile ? '8px 12px' : '10px 18px', borderRadius: 999, border: '2px solid #1A1A1A', background: category === f ? '#1A1A1A' : '#fff', color: category === f ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: isMobile ? 12 : 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: '2px 2px 0px #1A1A1A' }}>{f}</button>
            ))}
          </div>

          {/* FEATURED */}
          {featured.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>⭐ Featured</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20, marginBottom: 40 }}>
                {featured.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}>
                      <div style={{ height: isMobile ? 100 : 130, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 40 : 56, position: 'relative', borderBottom: '2px solid #1A1A1A', overflow: 'hidden' }}>
                        {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                        <div style={{ position: 'absolute', top: 8, right: 8, background: '#FFD23F', color: '#1A1A1A', borderRadius: 999, fontSize: 9, fontWeight: 900, padding: '2px 8px', border: '1.5px solid #1A1A1A' }}>⭐ Featured</div>
                      </div>
                      <div style={{ padding: isMobile ? '12px' : '18px 20px' }}>
                        <div style={{ background: color, color: '#fff', display: 'inline-block', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 6 }}>{label}</div>
                        <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', marginBottom: 3, lineHeight: 1.3 }}>{v.business_name}</div>
                        <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', marginBottom: 2, fontWeight: 600 }}>📍 {v.district}</div>
                        {!isMobile && <div style={{ fontSize: 13, color: '#888', marginBottom: 12, fontWeight: 500, lineHeight: 1.5 }}>{v.description}</div>}
                        <div style={{ fontSize: isMobile ? 11 : 13, color: '#6B7280', fontWeight: 600, marginBottom: 10 }}>📞 {v.phone}</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {v.whatsapp ? (
                            <a href={`https://wa.me/977${v.whatsapp.replace(/^0/, '').replace(/^\+977/, '')}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '8px', borderRadius: 10, border: '2px solid #1A1A1A', background: '#25D366', color: '#fff', fontSize: isMobile ? 11 : 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', display: 'block' }}>💬 WhatsApp</a>
                          ) : (
                            <a href={`tel:${v.phone}`} style={{ flex: 1, padding: '8px', borderRadius: 10, border: '2px solid #1A1A1A', background: '#fff', color: '#1A1A1A', fontSize: isMobile ? 11 : 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', display: 'block' }}>📞 Call</a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* VERIFIED */}
          {verified.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>✓ Verified</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 16, marginBottom: 32 }}>
                {verified.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', overflow: 'hidden', boxShadow: '3px 3px 0px #1A1A1A' }}>
                      <div style={{ height: isMobile ? 80 : 100, background: `linear-gradient(135deg, ${color}18, ${color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 32 : 44, borderBottom: '2px solid #1A1A1A', overflow: 'hidden' }}>
                        {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                      </div>
                      <div style={{ padding: isMobile ? '10px 12px' : '16px 18px' }}>
                        <div style={{ background: color, color: '#fff', display: 'inline-block', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 6 }}>{label}</div>
                        <div style={{ fontWeight: 900, fontSize: isMobile ? 12 : 15, color: '#1A1A1A', marginBottom: 2, lineHeight: 1.3 }}>{v.business_name}</div>
                        <div style={{ fontSize: isMobile ? 10 : 12, color: '#6B7280', fontWeight: 600 }}>📍 {v.district}</div>
                        <div style={{ fontSize: isMobile ? 10 : 12, color: '#888', marginTop: 2, fontWeight: 500 }}>📞 {v.phone}</div>
                        {v.whatsapp && (
                          <a href={`https://wa.me/977${v.whatsapp.replace(/^0/, '').replace(/^\+977/, '')}`} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: 8, background: '#25D366', color: '#fff', padding: '7px', borderRadius: 10, border: '1.5px solid #1A1A1A', fontSize: isMobile ? 11 : 12, fontWeight: 800, textAlign: 'center', textDecoration: 'none' }}>💬 WhatsApp</a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* BASIC */}
          {basic.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#F3F4F6', color: '#6B7280', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>📋 All Listings</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 10 : 16, marginBottom: 32 }}>
                {basic.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 14, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 20 : 24, flexShrink: 0, border: '2px solid #1A1A1A' }}>{emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 14, color: '#1A1A1A' }}>{v.business_name}</div>
                          <div style={{ fontSize: isMobile ? 11 : 12, color: '#6B7280', fontWeight: 600 }}>{label} · {v.district}</div>
                          <div style={{ fontSize: isMobile ? 11 : 12, color: '#888' }}>📞 {v.phone}</div>
                        </div>
                        <span style={{ background: '#F3F4F6', color: '#6B7280', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '3px 10px', border: '1px solid #E5E7EB', flexShrink: 0 }}>Basic</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🏥</div>
              <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>No listings yet</div>
              <div style={{ color: '#6B7280', fontSize: 14, fontWeight: 500 }}>Be the first to list your pet business in this category.</div>
            </div>
          )}

          {/* LIST YOUR BUSINESS CTA */}
          <div style={{ marginTop: 40, background: 'linear-gradient(135deg, #FFF9E6, #FFF0EB)', borderRadius: 20, padding: isMobile ? '24px 20px' : '32px 40px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: '#1A1A1A' }}>Own a pet business?</div>
              <div style={{ color: '#6B7280', fontSize: isMobile ? 13 : 14, marginTop: 4, fontWeight: 500 }}>List free · Upgrade to Featured for NPR 4,000/month</div>
            </div>
            <Link href="/list-business" style={{ background: '#FF6B35', color: '#fff', padding: isMobile ? '12px 20px' : '13px 28px', borderRadius: 12, fontSize: isMobile ? 13 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block', whiteSpace: 'nowrap' }}>+ List Your Business</Link>
          </div>

        </div>
{/* FAQ SECTION */}
<div style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', marginTop: isMobile ? 48 : 64 }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 16px' : '64px 28px' }}>
    <div style={{ marginBottom: 40, textAlign: 'center' }}>
      <span style={{ background: '#F0F8FF', color: '#38BDF8', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>❓ FAQ</span>
      <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Vet Clinics & Pet Services in Nepal — FAQs</h2>
      <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500, margin: 0 }}>Everything you need to know about finding vets and pet services in Kathmandu</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780, margin: '0 auto' }}>
      {[
        {
          q: 'Where can I find a 24-hour emergency vet in Kathmandu?',
          a: 'HamroPets provides a directory of veterinary clinics in Kathmandu Valley including emergency services. Major institutions like Central Referral Veterinary Hospital operate extended hours. Browse the HamroPets vet directory above to find emergency services near you.'
        },
        {
          q: 'How much does a vet consultation cost in Nepal?',
          a: 'Routine veterinary consultations in Kathmandu generally cost NPR 500 to NPR 1,500, excluding medications, vaccinations or specialized diagnostics. Prices vary depending on the clinic, the type of animal, and the complexity of the consultation.'
        },
        {
          q: 'Do vets in Kathmandu offer home visits for pets?',
          a: 'Yes, several veterinary professionals and clinics listed on HamroPets provide home visit or ambulatory services for emergencies and routine vaccinations. Check individual clinic listings for home visit availability.'
        },
        {
          q: 'Where can I get my dog vaccinated against Rabies in Kathmandu?',
          a: 'Rabies vaccinations are available at almost all registered vet clinics on HamroPets. Many animal welfare organizations in Kathmandu also conduct free or subsidized vaccination camps periodically. Core vaccines for dogs include Rabies, Canine Distemper and Parvovirus.'
        },
        {
          q: 'What is the best veterinary hospital in Nepal?',
          a: 'The best vet depends on your pet\'s specific needs and your location. Kathmandu has several highly regarded institutions across Lalitpur, Kathmandu and Bhaktapur. Browse the HamroPets vet directory to find top-rated clinics near you with verified contact details and direct call buttons.'
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
