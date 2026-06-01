import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Vets() {
  const [category, setCategory] = useState('All')

  const vets = [
    { name: 'Kathmandu Veterinary Hospital', cat: 'Vets', area: 'Maharajgunj', emoji: '🏥', color: '#FF6B35', rating: '4.9', phone: '01-4521234', tier: 'featured', desc: 'Full service veterinary hospital with emergency care' },
    { name: 'Paws & Claws Grooming Studio', cat: 'Groomers', area: 'Thamel', emoji: '✂️', color: '#7B5EA7', rating: '4.8', phone: '98XXXXXXXX', tier: 'featured', desc: 'Professional grooming for all breeds' },
    { name: 'Happy Paws Pet Boarding', cat: 'Boarding', area: 'Budhanilkantha', emoji: '🏠', color: '#38BDF8', rating: '4.7', phone: '98XXXXXXXX', tier: 'featured', desc: 'Safe and comfortable boarding for your pets' },
    { name: 'K9 Training Nepal', cat: 'Trainers', area: 'Baneshwor', emoji: '🎓', color: '#56C271', rating: '4.9', phone: '98XXXXXXXX', tier: 'verified', desc: 'Certified dog trainers with 10+ years experience' },
    { name: 'Lalitpur Animal Clinic', cat: 'Vets', area: 'Patan', emoji: '🏥', color: '#FF6B35', rating: '4.6', phone: '01-5XXXXXX', tier: 'verified', desc: 'Trusted vet clinic serving Lalitpur since 2010' },
    { name: 'Pet Paradise Shop', cat: 'Pet Shops', area: 'New Road', emoji: '🛒', color: '#56C271', rating: '4.5', phone: '01-4XXXXXX', tier: 'basic', desc: 'Wide range of pet food, accessories and toys' },
    { name: 'Bhaktapur Pet Clinic', cat: 'Vets', area: 'Bhaktapur', emoji: '🏥', color: '#FF6B35', rating: '4.7', phone: '01-6XXXXXX', tier: 'verified', desc: 'Serving Bhaktapur and surrounding areas' },
    { name: 'Fluffy Grooming Salon', cat: 'Groomers', area: 'Pulchowk', emoji: '✂️', color: '#7B5EA7', rating: '4.6', phone: '98XXXXXXXX', tier: 'basic', desc: 'Affordable grooming services in Lalitpur' },
    { name: 'Pokhara Pet Care', cat: 'Vets', area: 'Pokhara', emoji: '🏥', color: '#FF6B35', rating: '4.8', phone: '061-XXXXXX', tier: 'verified', desc: 'Premier pet care in the lake city' },
  ]

  const filtered = category === 'All' ? vets : vets.filter(v => v.cat === category)
  const featured = filtered.filter(v => v.tier === 'featured')
  const rest = filtered.filter(v => v.tier !== 'featured')

  return (
    <>
      <Head>
        <title>Vets & Pet Services — HamroPets</title>
        <meta name="description" content="Find verified vets, groomers, boarding and pet services across Nepal." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFBF5' }}>

        {/* NAV */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '2px solid #EDE8F5', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#1A3320', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#6B7C99', fontWeight: 600, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet'], ['Advertise', '/advertise']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: label === 'Vets' ? 700 : 500, color: label === 'Vets' ? '#58CC02' : '#6B7C99', background: label === 'Vets' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px' }}>

          {/* HEADER */}
          <span style={{ background: '#E0F6FF', color: '#38BDF8', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>🏥 Directory</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1A3320', margin: '0 0 6px', letterSpacing: -1 }}>Vets & Pet Services</h1>
          <p style={{ color: '#6B7C99', marginBottom: 32, fontSize: 15 }}>Verified businesses across Nepal</p>

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            <input placeholder="🔍  Search clinics, groomers..." style={{ flex: 1, minWidth: 200, padding: '10px 20px', borderRadius: 999, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
            {['All', 'Vets', 'Groomers', 'Boarding', 'Pet Shops', 'Trainers'].map(f => (
              <button key={f} onClick={() => setCategory(f)} style={{ padding: '10px 18px', borderRadius: 999, border: `2px solid ${category === f ? '#FF6B35' : '#EDE8F5'}`, background: category === f ? '#FF6B35' : '#fff', color: category === f ? '#fff' : '#6B7C99', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>{f}</button>
            ))}
          </div>

          {/* FEATURED */}
          {featured.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#FFFBDE', color: '#B8860B', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>⭐ Featured</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
                {featured.map(v => (
                  <div key={v.name} style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                    <div style={{ height: 130, background: `linear-gradient(135deg, ${v.color}18, ${v.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative' }}>
                      {v.emoji}
                      <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFD23F', color: '#1A3320', borderRadius: 999, fontSize: 11, fontWeight: 800, padding: '3px 10px' }}>⭐ Featured</div>
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#1A3320', marginBottom: 4 }}>{v.name}</div>
                      <div style={{ fontSize: 13, color: '#6B7C99', marginBottom: 2 }}>{v.cat}</div>
                      <div style={{ fontSize: 13, color: '#A0AFCC', marginBottom: 6 }}>📍 {v.area}</div>
                      <div style={{ fontSize: 13, color: '#6B7C99', marginBottom: 14 }}>{v.desc}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, color: '#6B7C99' }}>📞 {v.phone}</span>
                        <span style={{ fontWeight: 700, color: '#F59E0B', fontSize: 13 }}>⭐ {v.rating}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{ flex: 1, padding: '9px', borderRadius: 999, border: '2px solid #FF6B35', background: '#fff', color: '#FF6B35', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>View Profile</button>
                        <button style={{ padding: '9px 16px', borderRadius: 999, border: 'none', background: '#E8F9ED', color: '#56C271', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>💬</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ALL LISTINGS */}
          {rest.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#E8ECF5', color: '#1A3320', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>📋 All Listings</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {rest.map(v => (
                  <div key={v.name} style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                    <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: `${v.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{v.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: '#1A3320' }}>{v.name}</div>
                        <div style={{ fontSize: 12, color: '#6B7C99' }}>{v.cat} · {v.area}</div>
                        <div style={{ fontSize: 12, color: '#6B7C99' }}>📞 {v.phone}</div>
                      </div>
                      <span style={{ background: v.tier === 'verified' ? '#E8F9ED' : '#F3F4F6', color: v.tier === 'verified' ? '#56C271' : '#6B7C99', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '3px 10px' }}>{v.tier === 'verified' ? '✓ Verified' : 'Basic'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* LIST YOUR BUSINESS CTA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #FFF0EB, #FFFBDE)', borderRadius: 24, padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #FFD6B0', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 20, color: '#1A3320' }}>Own a pet business?</div>
              <div style={{ color: '#6B7C99', fontSize: 14, marginTop: 4 }}>List free · Upgrade to Featured for NPR 4,000/month</div>
            </div>
            <button style={{ background: '#FF6B35', color: '#fff', padding: '12px 28px', borderRadius: 999, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(255,107,53,0.3)' }}>+ List Your Business</button>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
