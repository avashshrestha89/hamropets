import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

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

  return {
    props: { featuredPets: featuredPets || [] }
  }
}

export default function Home({ featuredPets }) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* ── NAV ── */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #000', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: '#000', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#58CC02', fontWeight: 800, letterSpacing: 1 }}>NEPAL'S PET HOME</div>
                <div style={{ fontSize: 9, color: '#888', fontWeight: 600, letterSpacing: 0.3 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>
              </div>
            </Link>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#1A1A1A', textDecoration: 'none' }}>{label}</Link>
              ))}
              <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFF0EB', color: '#FF6B35', padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #FF6B35', marginLeft: 6 }}>🎙️ Swor AI</a>
            </div>
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background: '#FFFFFF', padding: '72px 28px 80px', borderBottom: '3px solid #000', position: 'relative', overflow: 'hidden' }}>
        
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center', position: 'relative' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFD23F', border: '2.5px solid #000', borderRadius: 999, padding: '7px 18px', marginBottom: 24, boxShadow: '3px 3px 0px #000' }}>
                <span>🇳🇵</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#000' }}>Nepal's First Dedicated Pet Platform</span>
              </div>
              <h1 style={{ fontSize: 60, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.05, letterSpacing: -2, color: '#000' }}>
                Every Pet<br />
                <span style={{ background: '#fff', padding: '2px 14px', borderRadius: 14, border: '2.5px solid #000', display: 'inline-block', transform: 'rotate(-1.5deg)', boxShadow: '3px 3px 0px #000', color: '#FF6B35' }}>Deserves</span><br />
                a Loving Home 🐾
              </h1>
              <p style={{ color: '#000', fontSize: 18, lineHeight: 1.65, marginBottom: 32, maxWidth: 460, fontWeight: 600 }}>700+ dogs rehomed since 2018. Find your perfect companion across Nepal.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '16px 32px', borderRadius: 14, fontSize: 17, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>🐾 Find a Pet</Link>
                <Link href="/submit-pet" style={{ background: '#fff', color: '#000', padding: '16px 32px', borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>+ Submit a Pet</Link>
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
                {[['700+', 'Pets Rehomed', '#58CC02'], ['Free', 'Always & Forever', '#FF6B35'], ['24hr', 'Review Time', '#7B5EA7']].map(([v, l, c]) => (
                  <div key={l} style={{ background: '#fff', borderRadius: 14, padding: '12px 18px', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>
                    <div style={{ color: c, fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{v}</div>
                    <div style={{ color: '#444', fontSize: 12, marginTop: 3, fontWeight: 700 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

         {/* HERO BANNER IMAGE */}
<div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
  <img
    src="https://res.cloudinary.com/dkxxscyei/image/upload/v1780563259/hamro_xc5517.png"
    alt="HamroPets — Presented by Adopt a Dog Nepal"
    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }}
  />
</div>
          </div>
        </div>

        {/* ── SPECIES + LOCATION FILTER ── */}
        <div style={{ background: '#FAFAFA', padding: '28px', borderBottom: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 900, fontSize: 13, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Species:</span>
            {[['🐕 Dogs', '#FF6B35'], ['🐈 Cats', '#7B5EA7'], ['🐦 Birds', '#38BDF8'], ['🐾 All', '#58CC02']].map(([label, color]) => (
              <Link key={label} href="/adopt" style={{ padding: '9px 20px', borderRadius: 10, border: '2px solid #000', background: color, color: '#fff', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'inline-block' }}>{label}</Link>
            ))}
            <div style={{ width: 2, height: 28, background: '#000', margin: '0 4px' }} />
            <span style={{ fontWeight: 900, fontSize: 13, color: '#000', textTransform: 'uppercase', letterSpacing: 0.5 }}>📍 Area:</span>
            {['All Nepal', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(loc => (
              <Link key={loc} href={`/adopt?location=${loc}`} style={{ padding: '9px 18px', borderRadius: 10, border: '2px solid #000', background: '#fff', color: '#000', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '2px 2px 0px #000', display: 'inline-block' }}>{loc}</Link>
            ))}
          </div>
        </div>

        {/* ── FEATURED PETS ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾 Available Now</span>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -0.5 }}>Pets Waiting for You</h2>
              <p style={{ color: '#666', margin: '6px 0 0', fontSize: 15, fontWeight: 500 }}>All reviewed & approved · Adoption is always free</p>
            </div>
            <Link href="/adopt" style={{ background: '#fff', color: '#000', padding: '11px 22px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>View All Pets →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {petsToShow.map(pet => {
              const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾'
              const color = speciesColor[pet.species?.toLowerCase()] || '#58CC02'
              const age = [pet.age_years > 0 ? `${pet.age_years}y` : '', pet.age_months > 0 ? `${pet.age_months}m` : ''].filter(Boolean).join(' ') || '?'
              return (
                <Link key={pet.id} href={pet.id.startsWith('demo') ? '/adopt' : `/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ height: 175, background: `linear-gradient(135deg, ${color}25, ${color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 76, position: 'relative', borderBottom: '2px solid #000' }}>
                      {pet.images && pet.images.length > 0 ? (
                        <img src={pet.images[0]} alt={pet.pet_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : emoji}
                      <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', color: '#000', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '4px 12px', border: '1.5px solid #000', boxShadow: '1px 1px 0px #000' }}>
                        {pet.vaccinated ? '💉 Vaccinated' : pet.neutered ? '✂️ Neutered' : `🐾 ${pet.species}`}
                      </div>
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                      <div style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>{pet.pet_name}</div>
                      <div style={{ color: '#666', fontSize: 13, marginTop: 3, fontWeight: 600, textTransform: 'capitalize' }}>{pet.breed || pet.species} · {age}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1.5px dashed #E5E7EB' }}>
                        <span style={{ fontSize: 13, color: '#444', fontWeight: 700 }}>📍 {pet.location}</span>
                        <span style={{ background: '#58CC02', color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 12px', borderRadius: 999, border: '1.5px solid #000' }}>FREE</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 28px 0' }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🏥 Services</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -0.5 }}>Everything Your Pet Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, label: 'Vets & Clinics', desc: 'Find verified vets near you', color: '#FF6B35', href: '/vets' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v18M18 3v18M3 6h18M3 18h18"/></svg>, label: 'Grooming', desc: 'Professional pet groomers', color: '#7B5EA7', href: '/vets' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Pet Boarding', desc: 'Safe stays while you travel', color: '#38BDF8', href: '/vets' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#58CC02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, label: 'Dog Walking', desc: 'Trusted walkers near you', color: '#58CC02', href: '/walk-sit' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, label: 'Pet Sitting', desc: 'Home care for your pet', color: '#FF6B9D', href: '/walk-sit' },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD23F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, label: 'Training', desc: 'Certified trainers in Nepal', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', boxShadow: '4px 4px 0px #000', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${s.color}40` }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#000' }}>{s.label}</div>
                    <div style={{ color: '#666', fontSize: 13, marginTop: 3, fontWeight: 500 }}>{s.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#000', fontSize: 18, fontWeight: 700 }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FEATURED VETS ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>⭐ Top Rated</span>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: 0 }}>Trusted Vets & Services</h2>
            </div>
            <Link href="/vets" style={{ background: '#fff', color: '#000', padding: '11px 22px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Full Directory →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Kathmandu Vet Hospital', cat: 'Vet Clinic', area: 'Maharajgunj', emoji: '🏥', bg: '#FFEAE6', rating: '4.9' },
              { name: 'Paws & Claws Care', cat: 'Grooming & Spa', area: 'Thamel', emoji: '✂️', bg: '#EBF5FF', rating: '4.8' },
              { name: 'Happy Paws Boarding', cat: 'Overnight Boarding', area: 'Budhanilkantha', emoji: '🏠', bg: '#EAFCE0', rating: '4.7' },
              { name: 'K9 Training Academy', cat: 'Obedience Training', area: 'Baneshwor', emoji: '🎓', bg: '#FFF9E6', rating: '4.9' },
            ].map(v => (
              <Link key={v.name} href="/vets" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                  <div style={{ height: 130, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, borderBottom: '2px solid #000', position: 'relative' }}>
                    {v.emoji}
                    <div style={{ position: 'absolute', top: 10, right: 10, background: '#000', color: '#FFD23F', fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 6 }}>FEATURED</div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ background: '#FF6B35', color: '#fff', display: 'inline-block', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 8 }}>{v.cat}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#000', marginBottom: 4, lineHeight: 1.3 }}>{v.name}</div>
                    <div style={{ fontSize: 13, color: '#555', fontWeight: 700, marginBottom: 2 }}>📍 {v.area}</div>
                    <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 800, marginTop: 10, paddingTop: 8, borderTop: '1.5px dashed #E5E7EB' }}>⭐ {v.rating}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── AI VET BANNER ── */}
        <div style={{ maxWidth: 1200, margin: '56px auto 0', padding: '0 28px' }}>
          <div style={{ background: '#7B5EA7', borderRadius: 24, padding: '44px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div>
              <span style={{ background: '#fff', color: '#7B5EA7', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '1.5px solid #000' }}>🤖 Powered by Gemini Pro</span>
              <h3 style={{ color: '#fff', fontSize: 30, fontWeight: 900, margin: '0 0 10px', letterSpacing: -0.5 }}>AI Vet — Ask Anything</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 15, fontWeight: 600, maxWidth: 480 }}>Instant answers about your pet's health, nutrition and behaviour. Available 24/7.</p>
            </div>
            <Link href="/ai-vet" style={{ background: '#FFD23F', color: '#000', padding: '16px 32px', borderRadius: 14, fontSize: 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>Launch AI Vet →</Link>
          </div>
        </div>

        {/* ── LOST & FOUND ── */}
        <div style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 28px' }}>
          <div style={{ background: '#FFF0F6', borderRadius: 24, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, border: '3px solid #000', boxShadow: '5px 5px 0px #000', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
              <h3 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', color: '#000' }}>Lost or Found a Pet?</h3>
              <p style={{ color: '#666', margin: 0, fontSize: 14, fontWeight: 600 }}>Our community reunites pets with their families across Nepal.</p>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '13px 26px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>🔴 I Lost My Pet</Link>
              <Link href="/lost-found" style={{ background: '#58CC02', color: '#fff', padding: '13px 26px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>🟢 I Found a Pet</Link>
            </div>
          </div>
        </div>

        {/* ── SWOR AI BANNER — EDGE TO EDGE IMAGE ── */}
        <div style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 28px' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '3px solid #000', boxShadow: '5px 5px 0px #000', position: 'relative', minHeight: 200, background: '#1A1A1A' }}>
            {/* PLACEHOLDER — replace src with Swor AI image URL once generated */}
            <div style={{ background: 'linear-gradient(135deg, #1A1A1A, #FF6B35)', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 48px', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', flexShrink: 0 }}>🎙️</div>
                <div>
                  <span style={{ background: '#fff', color: '#FF6B35', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 8, border: '1.5px solid #000' }}>A MeroAD.ai Product</span>
                  <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 13, fontWeight: 600 }}>Generate authentic Nepali AI voices · meroadai.com</p>
                  {/* TIKTOK LINK PLACEHOLDER */}
                  <a href="https://tiktok.com/@meroadai" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, background: '#000', color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #fff' }}>
                    <span>📱</span> Watch on TikTok
                  </a>
                </div>
              </div>
              <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#000', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Try Swor AI →</a>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: '#FFFFFF', marginTop: 72, padding: '56px 28px 36px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>HamroPets</div>
                    <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Brought to you by Adopt a Dog Nepal · Since 2018</div>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, maxWidth: 280, fontWeight: 500 }}>Nepal's first dedicated pet platform. Built on 8 years of trust from Adopt a Dog Nepal.</p>
                <div style={{ marginTop: 16, display: 'inline-block', background: '#FFF0EB', padding: '6px 14px', borderRadius: 8, border: '1.5px solid #000', fontSize: 12, fontWeight: 800, color: '#FF6B35' }}>🚀 A MeroAD.ai Product</div>
              </div>
              {[
                ['Platform', ['Adopt a Pet', 'Vet Directory', 'Dog Walking', 'Lost & Found', 'AI Vet Chat']],
                ['For Businesses', ['Advertise', 'List Your Clinic', 'Partner with Us', 'Media Kit']],
                ['Company', ['About HamroPets', 'Adopt a Dog Nepal', 'Swor AI', 'Contact Us']],
              ].map(([heading, items]) => (
                <div key={heading}>
                  <div style={{ fontWeight: 900, fontSize: 12, color: '#000', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 16 }}>{heading}</div>
                  {items.map(item => (
                    <div key={item} style={{ color: '#666', fontSize: 14, marginBottom: 10, cursor: 'pointer', fontWeight: 600 }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid #000', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · All rights reserved</span>
              <span style={{ color: '#000', fontSize: 13, fontWeight: 800, background: '#FFF0F6', padding: '5px 14px', borderRadius: 8, border: '2px solid #000' }}>Built with ❤️ in Kathmandu 🇳🇵</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
