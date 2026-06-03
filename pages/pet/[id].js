import Head from 'next/head'
import Link from 'next/link'
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
    .eq('status', 'approved')
    .single()

  if (error || !data) {
    return { notFound: true }
  }

  return { props: { pet: data } }
}

export default function PetDetail({ pet }) {
  const speciesEmoji = { dog: '🐕', cat: '🐈', bird: '🐦', rabbit: '🐰', other: '🐾' }
  const speciesColor = { dog: '#FF6B35', cat: '#7B5EA7', bird: '#38BDF8', rabbit: '#FF6B9D', other: '#58CC02' }
  const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
  const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'

  const age = [
    pet.age_years > 0 ? `${pet.age_years} year${pet.age_years > 1 ? 's' : ''}` : '',
    pet.age_months > 0 ? `${pet.age_months} month${pet.age_months > 1 ? 's' : ''}` : '',
  ].filter(Boolean).join(', ') || 'Unknown'

  return (
    <>
      <Head>
        <title>{pet.pet_name} — Adopt on HamroPets</title>
        <meta name="description" content={`Adopt ${pet.pet_name}, a ${pet.species} in ${pet.location}. Free adoption on HamroPets.`} />
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
            <Link href="/adopt" style={{ background: '#fff', color: '#000', padding: '9px 20px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '2px 2px 0px #000' }}>← Back to Listings</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

            {/* LEFT — PHOTOS */}
            <div>
              {/* Main photo */}
              <div style={{ height: 360, borderRadius: 24, border: '3px solid #000', boxShadow: '5px 5px 0px #000', overflow: 'hidden', background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120 }}>
                {pet.images && pet.images.length > 0 ? (
                  <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  emoji
                )}
              </div>

              {/* Thumbnail row */}
              {pet.images && pet.images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  {pet.images.slice(0, 4).map((img, i) => (
                    <div key={i} style={{ flex: 1, height: 80, borderRadius: 12, border: `2.5px solid ${i === 0 ? '#000' : '#E5E7EB'}`, overflow: 'hidden', cursor: 'pointer', boxShadow: i === 0 ? '2px 2px 0px #000' : 'none' }}>
                      <img src={img} alt={`${pet.pet_name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Video */}
              {pet.video_url && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#000', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>🎥 Video</div>
                  <video controls style={{ width: '100%', borderRadius: 16, border: '2px solid #000', boxShadow: '3px 3px 0px #000' }}>
                    <source src={pet.video_url} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>

            {/* RIGHT — DETAILS */}
            <div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                <span style={{ background: color, color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #000', textTransform: 'capitalize' }}>{pet.species}</span>
                <span style={{ background: '#E8F9ED', color: '#166534', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #000' }}>✅ Available</span>
                <span style={{ background: '#58CC02', color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #000' }}>FREE</span>
              </div>

              {/* Name */}
              <h1 style={{ fontSize: 48, fontWeight: 900, color: '#000', margin: '0 0 6px', letterSpacing: -1.5 }}>{pet.pet_name}</h1>
              <p style={{ color: '#666', fontSize: 16, marginBottom: 28, fontWeight: 600 }}>
                {pet.breed || pet.species} · {pet.gender} · {age}
              </p>

              {/* Info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {[
                  ['📍 Location', pet.location, '#FFF9E6'],
                  ['🎂 Age', age, '#F0F8FF'],
                  ['💉 Vaccinated', pet.vaccinated ? 'Yes ✓' : 'Not confirmed', pet.vaccinated ? '#E8F9ED' : '#FFF'],
                  ['✂️ Neutered', pet.neutered ? 'Yes ✓' : 'Not confirmed', pet.neutered ? '#E8F9ED' : '#FFF'],
                  ['🐾 Species', pet.species, '#FFF0EB'],
                  ['⚥ Gender', pet.gender, '#F5F0FF'],
                ].map(([k, v, bg]) => (
                  <div key={k} style={{ background: bg, borderRadius: 14, padding: '12px 16px', border: '1.5px solid #E5E7EB' }}>
                    <div style={{ fontSize: 12, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{k}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#000', marginTop: 3, textTransform: 'capitalize' }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ background: '#FAFAFA', borderRadius: 16, padding: '20px', border: '1.5px solid #E5E7EB', marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>About {pet.pet_name}</div>
                <p style={{ margin: 0, fontSize: 15, color: '#333', lineHeight: 1.75, fontWeight: 500 }}>{pet.description}</p>
              </div>

              {/* Contact buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`tel:${pet.submitter_phone}`} style={{ background: '#58CC02', color: '#fff', padding: '16px', borderRadius: 14, border: '2.5px solid #000', fontSize: 16, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #000', display: 'block' }}>
                  📞 Call Owner — {pet.submitter_phone}
                </a>
                <a href={`https://wa.me/977${pet.submitter_phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '14px', borderRadius: 14, border: '2.5px solid #000', fontSize: 15, fontWeight: 900, textDecoration: 'none', textAlign: 'center', boxShadow: '3px 3px 0px #000', display: 'block' }}>
                  💬 WhatsApp Owner
                </a>
              </div>

              {/* Warning */}
              <div style={{ marginTop: 16, background: '#FFFBDE', borderRadius: 12, padding: '14px 18px', border: '1.5px solid #FFD23F', fontSize: 13, color: '#92400E', fontWeight: 600 }}>
                ⚠️ HamroPets never charges adoption fees. Report suspicious requests immediately.
              </div>

            </div>
          </div>

          {/* BACK LINK */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '2px solid #E5E7EB' }}>
            <Link href="/adopt" style={{ background: '#fff', color: '#000', padding: '12px 24px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>← Browse More Pets</Link>
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
