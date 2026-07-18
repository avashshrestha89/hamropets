import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps({ params }) {
  const { id } = params
  const { data, error } = await supabase
    .from('pet_listings')
    .select('*')
    .eq('id', id)
    .in('status', ['approved', 'adopted'])
    .single()
  if (error || !data) return { notFound: true }
  return { props: { pet: data } }
}

export default function PetDetail({ pet }) {
  const [isMobile, setIsMobile] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }
  const speciesColor = { dog: '#FF6B35', cat: '#7B5EA7', bird: '#38BDF8', rabbit: '#FF6B9D', other: '#58CC02' }
  const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
  const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
  const isAdopted = pet.status === 'adopted'

  const age = [
    pet.age_years > 0 ? `${pet.age_years} year${pet.age_years > 1 ? 's' : ''}` : '',
    pet.age_months > 0 ? `${pet.age_months} month${pet.age_months > 1 ? 's' : ''}` : '',
  ].filter(Boolean).join(', ') || pet.pet_age || 'Unknown'

  return (
    <>
      <Head>
        <title>{pet.pet_name} — {isAdopted ? 'Adopted' : 'Adopt on HamroPets'}</title>
        <meta name="description" content={`${isAdopted ? `${pet.pet_name} has been adopted!` : `Adopt ${pet.pet_name}, a ${pet.species} in ${pet.location}. Free adoption on HamroPets.`}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            <Link href="/adopt" style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '7px 14px' : '9px 20px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: isMobile ? 12 : 14, fontWeight: 800, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>← Back to Listings</Link>
          </div>
        </nav>

        {/* ADOPTED BANNER */}
        {isAdopted && (
          <div style={{ background: '#FF6B9D', padding: isMobile ? '14px 16px' : '16px 28px', borderBottom: '3px solid #1A1A1A', textAlign: 'center' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: isMobile ? 24 : 32 }}>🎉</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 20, color: '#fff' }}>{pet.pet_name} has found a loving home!</div>
                <div style={{ fontSize: isMobile ? 12 : 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>This pet has been successfully adopted through HamroPets · Presented by Adopt a Dog Nepal</div>
              </div>
              <span style={{ fontSize: isMobile ? 24 : 32 }}>🐾</span>
            </div>
          </div>
        )}

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48 }}>

            {/* LEFT — PHOTOS */}
            <div>
              <div style={{ position: 'relative', height: isMobile ? 280 : 360, borderRadius: 20, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', overflow: 'hidden', background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120 }}>
                {pet.images && pet.images.length > 0 ? (
                  <img src={pet.images[activePhoto]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : emoji}

                {/* ADOPTED OVERLAY */}
                {isAdopted && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 107, 157, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#FF6B9D', color: '#fff', padding: '12px 28px', borderRadius: 999, fontSize: isMobile ? 18 : 24, fontWeight: 900, border: '3px solid #fff', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', transform: 'rotate(-8deg)' }}>
                      🎉 ADOPTED
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {pet.images && pet.images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  {pet.images.slice(0, 4).map((img, i) => (
                    <div key={i} onClick={() => setActivePhoto(i)} style={{ flex: 1, height: isMobile ? 60 : 80, borderRadius: 10, border: `2.5px solid ${i === activePhoto ? '#1A1A1A' : '#E5E7EB'}`, overflow: 'hidden', cursor: 'pointer', boxShadow: i === activePhoto ? '2px 2px 0px #1A1A1A' : 'none' }}>
                      <img src={img} alt={`${pet.pet_name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Video */}
              {pet.video_url && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>🎥 Video</div>
                  <video controls style={{ width: '100%', borderRadius: 14, border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                    <source src={pet.video_url} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>

            {/* RIGHT — DETAILS */}
            <div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <span style={{ background: color, color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #1A1A1A', textTransform: 'capitalize' }}>{pet.species}</span>
                {isAdopted ? (
                  <span style={{ background: '#FF6B9D', color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #1A1A1A' }}>🎉 ADOPTED</span>
                ) : (
                  <span style={{ background: '#E8F9ED', color: '#166534', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #1A1A1A' }}>✅ Available</span>
                )}
                {!isAdopted && <span style={{ background: '#58CC02', color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #1A1A1A' }}>FREE</span>}
              </div>

              {/* Name */}
              <h1 style={{ fontSize: isMobile ? 36 : 48, fontWeight: 900, color: '#1A1A1A', margin: '0 0 6px', letterSpacing: -1.5 }}>{pet.pet_name}</h1>
              <p style={{ color: '#6B7280', fontSize: isMobile ? 14 : 16, marginBottom: 24, fontWeight: 600 }}>
                {pet.breed || pet.species} · {pet.gender} · {age}
              </p>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 12, marginBottom: 20 }}>
                {[
                  ['📍 Location', pet.location, '#FFF9E6'],
                  ['🎂 Age', age, '#F0F8FF'],
                  ['💉 Vaccinated', pet.vaccinated ? 'Yes ✓' : 'Not confirmed', pet.vaccinated ? '#E8F9ED' : '#fff'],
                  ['✂️ Neutered', pet.neutered ? 'Yes ✓' : 'Not confirmed', pet.neutered ? '#E8F9ED' : '#fff'],
                  ['👶 Good with kids', pet.friendly_children === 'yes' ? 'Yes ✓' : pet.friendly_children === 'no' ? 'No' : 'Unknown', pet.friendly_children === 'yes' ? '#E8F9ED' : '#fff'],
                  ['🐕 Good with dogs', pet.friendly_dogs === 'yes' ? 'Yes ✓' : pet.friendly_dogs === 'no' ? 'No' : 'Unknown', pet.friendly_dogs === 'yes' ? '#E8F9ED' : '#fff'],
                ].map(([k, v, bg]) => (
                  <div key={k} style={{ background: bg, borderRadius: 12, padding: isMobile ? '10px 12px' : '12px 16px', border: '1.5px solid #E5E7EB' }}>
                    <div style={{ fontSize: isMobile ? 10 : 12, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{k}</div>
                    <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: '#1A1A1A', marginTop: 3, textTransform: 'capitalize' }}>{v}</div>
                  </div>
                ))}
              </div>

             {/* Description */}
              <div style={{ background: '#FAFAFA', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #E5E7EB', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>About {pet.pet_name}</div>
                <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.75, fontWeight: 500 }}>{pet.description}</p>
              </div>

              {/* Reason for Adoption */}
              {pet.reason_for_adoption && (
                <div style={{ background: '#FFF9E6', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #FFD23F', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>💛 Reason for Adoption</div>
                  <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.75, fontWeight: 500 }}>{pet.reason_for_adoption}</p>
                </div>
              )}

              {/* Other Info */}
              {pet.other_info && (
                <div style={{ background: '#F0F8FF', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #38BDF8', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>ℹ️ Additional Info</div>
                  <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.75, fontWeight: 500 }}>{pet.other_info}</p>
                </div>
              )}

              {/* Owner Info */}
              {!isAdopted && (
                <div style={{ background: '#F9FAFB', borderRadius: 14, padding: isMobile ? '14px' : '20px', border: '1.5px solid #E5E7EB', marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>👤 Owner Details</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {pet.submitter_name && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 600, minWidth: 80 }}>Name:</span>
                        <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{pet.submitter_name}</span>
                      </div>
                    )}
                    {pet.submitter_phone && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 600, minWidth: 80 }}>Phone:</span>
                        <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{pet.submitter_phone}</span>
                      </div>
                    )}
                    {pet.submitter_address && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 600, minWidth: 80 }}>Address:</span>
                        <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 700 }}>{pet.submitter_address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact buttons or Adopted message */}
              {isAdopted ? (
                <div style={{ background: '#FFF0F6', borderRadius: 16, padding: '24px', border: '2px solid #FF6B9D', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🎉</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 18, color: '#1A1A1A', marginBottom: 6 }}>{pet.pet_name} has been adopted!</div>
                  <div style={{ fontSize: isMobile ? 13 : 14, color: '#6B7280', fontWeight: 500, marginBottom: 16 }}>This pet has found a loving home through HamroPets.</div>
                  <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', display: 'inline-block' }}>Find Other Pets →</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href={`tel:${pet.submitter_phone}`} style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '14px' : '16px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #166534', display: 'block' }}>
                    📞 Call Owner — {pet.submitter_phone}
                  </a>
                  <a href={`https://wa.me/977${(pet.submitter_whatsapp || pet.submitter_phone)?.replace(/^0/, '').replace(/^\+977/, '')}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: isMobile ? '12px' : '14px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 14 : 15, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #1A1A1A', display: 'block' }}>
                    💬 WhatsApp Owner
                  </a>
                 <div style={{ background: '#FFFBDE', borderRadius: 12, padding: '12px 16px', border: '1.5px solid #FFD23F', fontSize: isMobile ? 12 : 13, color: '#92400E', fontWeight: 600 }}>
                    ⚠️ HamroPets never charges adoption fees. Report suspicious requests immediately.
                  </div>

                  {/* Swor AI Cross-Promotion Banner */}
                  <a href="https://meroadai.com/voiceover" target="_blank" rel="nofollow noreferrer" style={{display:'block',textDecoration:'none'}}>
                    <div style={{background:'linear-gradient(135deg,#1a0a0a 0%,#3d0f0f 100%)',borderRadius:12,padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:34,height:34,borderRadius:8,background:'linear-gradient(135deg,#DC143C,#FF6B8A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#fff',fontWeight:800,flexShrink:0}}>S</div>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:'#fff'}}>Swor AI — Nepal's #1 Nepali AI Voiceover</div>
                          <div style={{fontSize:11,color:'rgba(255,255,255,.6)',marginTop:2}}>Nepali text to speech · AI voice generator · TikTok & YouTube voiceover</div>
                        </div>
                      </div>
                      <div style={{background:'#DC143C',color:'#fff',padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:700,flexShrink:0,whiteSpace:'nowrap'}}>Try Free →</div>
                    </div>
                  </a>
                      
                </div>
              )}
            </div>
          </div>

          {/* BACK LINK */}
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '2px solid #E5E7EB' }}>
            <Link href="/adopt" style={{ background: '#fff', color: '#1A1A1A', padding: '11px 22px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>← Browse More Pets</Link>
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
