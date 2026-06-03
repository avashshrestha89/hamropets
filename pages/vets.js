import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
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

  return {
    props: {
      vets: data || [],
    }
  }
}

export default function Vets({ vets }) {
  const [category, setCategory] = useState('All')

  const fallbackVets = [
    { id: 'f1', business_name: 'Kathmandu Veterinary Hospital', category: 'vet_clinic', district: 'Maharajgunj', phone: '01-4521234', tier: 'featured', description: 'Full service veterinary hospital with emergency care', rating: '4.9' },
    { id: 'f2', business_name: 'Paws & Claws Grooming Studio', category: 'grooming', district: 'Thamel', phone: '98XXXXXXXX', tier: 'featured', description: 'Professional grooming for all breeds', rating: '4.8' },
    { id: 'f3', business_name: 'Happy Paws Pet Boarding', category: 'pet_boarding', district: 'Budhanilkantha', phone: '98XXXXXXXX', tier: 'featured', description: 'Safe and comfortable boarding for your pets', rating: '4.7' },
    { id: 'f4', business_name: 'K9 Training Nepal', category: 'dog_trainer', district: 'Baneshwor', phone: '98XXXXXXXX', tier: 'verified', description: 'Certified dog trainers with 10+ years experience', rating: '4.9' },
    { id: 'f5', business_name: 'Lalitpur Animal Clinic', category: 'vet_clinic', district: 'Patan', phone: '01-5XXXXXX', tier: 'verified', description: 'Trusted vet clinic serving Lalitpur since 2010', rating: '4.6' },
    { id: 'f6', business_name: 'Pet Paradise Shop', category: 'pet_shop', district: 'New Road', phone: '01-4XXXXXX', tier: 'basic', description: 'Wide range of pet food, accessories and toys', rating: '4.5' },
  ]

  const categoryEmoji = { vet_clinic: '🏥', grooming: '✂️', pet_boarding: '🏠', pet_shop: '🛒', dog_trainer: '🎓', other: '🐾' }
  const categoryColor = { vet_clinic: '#FF6B35', grooming: '#7B5EA7', pet_boarding: '#38BDF8', pet_shop: '#58CC02', dog_trainer: '#FFD23F', other: '#FF6B9D' }
  const categoryLabel = { vet_clinic: 'Vet Clinic', grooming: 'Grooming', pet_boarding: 'Boarding', pet_shop: 'Pet Shop', dog_trainer: 'Trainer', other: 'Other' }

  const vetsToShow = vets.length > 0 ? vets : fallbackVets

  const categoryMap = {
    'All': null,
    'Vets': 'vet_clinic',
    'Groomers': 'grooming',
    'Boarding': 'pet_boarding',
    'Pet Shops': 'pet_shop',
    'Trainers': 'dog_trainer',
  }

  const filtered = category === 'All' ? vetsToShow : vetsToShow.filter(v => v.category === categoryMap[category])
  const featured = filtered.filter(v => v.tier === 'featured')
  const verified = filtered.filter(v => v.tier === 'verified')
  const basic = filtered.filter(v => v.tier === 'basic')

  return (
    <>
      <Head>
        <title>Vets & Pet Services — HamroPets</title>
        <meta name="description" content="Find verified vets, groomers, boarding and pet services across Nepal." />
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
            <div style={{ display: 'flex', gap: 2 }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'Vets' ? 800 : 600, color: label === 'Vets' ? '#58CC02' : '#1A1A1A', background: label === 'Vets' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 28px' }}>

          {/* HEADER */}
          <span style={{ background: '#E0F6FF', color: '#38BDF8', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🏥 Directory</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#000', margin: '0 0 6px', letterSpacing: -1 }}>Vets & Pet Services</h1>
          <p style={{ color: '#666', marginBottom: 32, fontSize: 15, fontWeight: 500 }}>Verified businesses across Nepal</p>

          {/* FILTERS */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            <input placeholder="🔍  Search clinics, groomers..." style={{ flex: 1, minWidth: 200, padding: '10px 20px', borderRadius: 999, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', outline: 'none', boxShadow: '2px 2px 0px #000' }} />
            {['All', 'Vets', 'Groomers', 'Boarding', 'Pet Shops', 'Trainers'].map(f => (
              <button key={f} onClick={() => setCategory(f)} style={{ padding: '10px 18px', borderRadius: 999, border: '2px solid #000', background: category === f ? '#000' : '#fff', color: category === f ? '#fff' : '#666', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', boxShadow: '2px 2px 0px #000' }}>{f}</button>
            ))}
          </div>

          {/* FEATURED */}
          {featured.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>⭐ Featured</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
                {featured.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                      <div style={{ height: 130, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative', borderBottom: '2px solid #000' }}>
                        {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                        <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFD23F', color: '#000', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '3px 10px', border: '1.5px solid #000' }}>⭐ Featured</div>
                      </div>
                      <div style={{ padding: '18px 20px' }}>
                        <div style={{ background: color, color: '#fff', display: 'inline-block', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 8 }}>{label}</div>
                        <div style={{ fontWeight: 900, fontSize: 16, color: '#000', marginBottom: 4 }}>{v.business_name}</div>
                        <div style={{ fontSize: 13, color: '#666', marginBottom: 2, fontWeight: 600 }}>📍 {v.district}</div>
                        <div style={{ fontSize: 13, color: '#888', marginBottom: 14, fontWeight: 500, lineHeight: 1.5 }}>{v.description}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>📞 {v.phone}</span>
                          {v.whatsapp && <span style={{ fontSize: 13, color: '#25D366', fontWeight: 700 }}>💬 WhatsApp</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {v.whatsapp ? (
                            <a href={`https://wa.me/977${v.whatsapp.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '9px', borderRadius: 12, border: '2px solid #000', background: '#25D366', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'block' }}>💬 WhatsApp</a>
                          ) : (
                            <a href={`tel:${v.phone}`} style={{ flex: 1, padding: '9px', borderRadius: 12, border: '2px solid #000', background: '#fff', color: '#000', cursor: 'pointer', fontSize: 13, fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'block' }}>📞 Call</a>
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
                <span style={{ background: '#E8F9ED', color: '#58CC02', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>✓ Verified</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
                {verified.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '3px 3px 0px #000' }}>
                      <div style={{ height: 100, background: `linear-gradient(135deg, ${color}18, ${color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, borderBottom: '2px solid #000' }}>
                        {v.logo_url ? <img src={v.logo_url} alt={v.business_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{ background: color, color: '#fff', display: 'inline-block', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 6 }}>{label}</div>
                        <div style={{ fontWeight: 900, fontSize: 15, color: '#000', marginBottom: 3 }}>{v.business_name}</div>
                        <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>📍 {v.district}</div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 2, fontWeight: 500 }}>📞 {v.phone}</div>
                        {v.whatsapp && (
                          <a href={`https://wa.me/977${v.whatsapp.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: 10, background: '#25D366', color: '#fff', padding: '8px', borderRadius: 10, border: '1.5px solid #000', fontSize: 12, fontWeight: 800, textAlign: 'center', textDecoration: 'none' }}>💬 WhatsApp</a>
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
                <span style={{ background: '#F3F4F6', color: '#666', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>📋 All Listings</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
                {basic.map(v => {
                  const emoji = categoryEmoji[v.category] || '🐾'
                  const color = categoryColor[v.category] || '#58CC02'
                  const label = categoryLabel[v.category] || 'Service'
                  return (
                    <div key={v.id} style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', boxShadow: '3px 3px 0px #000' }}>
                      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, border: '2px solid #000' }}>{emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 900, fontSize: 14, color: '#000' }}>{v.business_name}</div>
                          <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{label} · {v.district}</div>
                          <div style={{ fontSize: 12, color: '#888' }}>📞 {v.phone}</div>
                        </div>
                        <span style={{ background: '#F3F4F6', color: '#666', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '3px 10px', border: '1px solid #E5E7EB' }}>Basic</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏥</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#000', marginBottom: 8 }}>No listings yet</div>
              <div style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>Be the first to list your pet business in this category.</div>
            </div>
          )}

          {/* LIST YOUR BUSINESS CTA */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #FFF9E6, #FFF0EB)', borderRadius: 24, padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '3px solid #000', boxShadow: '5px 5px 0px #000', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#000' }}>Own a pet business?</div>
              <div style={{ color: '#666', fontSize: 14, marginTop: 4, fontWeight: 500 }}>List free · Upgrade to Featured for NPR 4,000/month</div>
            </div>
            <Link href="/list-business" style={{ background: '#FF6B35', color: '#fff', padding: '13px 28px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>+ List Your Business</Link>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '32px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
