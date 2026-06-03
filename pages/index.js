import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
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
              </div>
            </Link>

            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {[
                ['Adopt', '/adopt'],
                ['Vets', '/vets'],
                ['Walk & Sit', '/walk-sit'],
                ['Lost & Found', '/lost-found'],
                ['AI Vet', '/ai-vet'],
              ].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#1A1A1A', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
              <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFF0EB', color: '#FF6B35', padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #FF6B35', marginLeft: 6 }}>
                🎙️ Swor AI
              </a>
            </div>

            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>
              + List a Pet
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background: '#FFD23F', padding: '72px 28px 80px', borderBottom: '3px solid #000', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', position: 'relative' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '2.5px solid #000', borderRadius: 999, padding: '7px 18px', marginBottom: 24, boxShadow: '3px 3px 0px #000' }}>
                <span>🇳🇵</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#000' }}>Nepal's First Dedicated Pet Platform</span>
              </div>
              <h1 style={{ fontSize: 60, fontWeight: 900, margin: '0 0 20px', lineHeight: 1.05, letterSpacing: -2, color: '#000' }}>
                Every Pet<br />
                <span style={{ background: '#fff', padding: '2px 14px', borderRadius: 14, border: '2.5px solid #000', display: 'inline-block', transform: 'rotate(-1.5deg)', boxShadow: '3px 3px 0px #000', color: '#FF6B35' }}>Deserves</span><br />
                a Loving Home 🐾
              </h1>
              <p style={{ color: '#000', fontSize: 18, lineHeight: 1.65, marginBottom: 32, maxWidth: 460, fontWeight: 600 }}>
                700+ dogs rehomed since 2018. Find your perfect companion across Nepal.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '16px 32px', borderRadius: 14, fontSize: 17, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>
                  🐾 Find a Pet
                </Link>
                <Link href="/ai-vet" style={{ background: '#fff', color: '#000', padding: '16px 32px', borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>
                  🤖 Ask AI Vet
                </Link>
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

            {/* Floating pet cards */}
            <div style={{ position: 'relative', height: 400 }}>
              {[
                { emoji: '🐕', name: 'Bruno', label: 'Lalitpur', color: '#FF6B35', top: 0, left: 30, rotate: -6 },
                { emoji: '🐈', name: 'Luna', label: 'Kathmandu', color: '#7B5EA7', top: 50, right: 10, rotate: 5 },
                { emoji: '🐦', name: 'Tweety', label: 'Thamel', color: '#38BDF8', bottom: 60, left: 0, rotate: -4 },
                { emoji: '🐕', name: 'Kalu', label: 'Bhaktapur', color: '#58CC02', bottom: 0, right: 30, rotate: 7 },
              ].map((c, i) => (
                <div key={i} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, background: '#fff', borderRadius: 22, padding: '18px', border: '2.5px solid #000', boxShadow: '5px 5px 0px #000', transform: `rotate(${c.rotate}deg)`, width: 140 }}>
                  <div style={{ fontSize: 52, textAlign: 'center' }}>{c.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: '#000', textAlign: 'center', marginTop: 6 }}>{c.name}</div>
                  <div style={{ background: c.color, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 800, textAlign: 'center', padding: '4px 10px', marginTop: 8, border: '1.5px solid #000' }}>📍 {c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPECIES + LOCATION FILTER ── */}
        <div style={{ background: '#FAFAFA', padding: '28px', borderBottom: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
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
    props: {
      featuredPets: featuredPets || [],
    }
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
              </div>
            </Link>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#1A1A1A', textDecoration: 'none' }}>{label}</Link>
              ))}
              <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFF0EB', color: '#FF6B35', padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '1.5px solid #FF6B35', marginLeft: 6 }}>🎙️ Swor AI</a>
            </div>
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '11px 22px', borderRadius: 12, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>+ List a Pet</Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background: '#FFD23F', padding: '72px 28px 80px', borderBottom: '3px solid #000', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', position: 'relative' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '2.5px solid #000', borderRadius: 999, padding: '7px 18px', marginBottom: 24, boxShadow: '3px 3px 0px #000' }}>
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
                <Link href="/ai-vet" style={{ background: '#fff', color: '#000', padding: '16px 32px', borderRadius: 14, fontSize: 17, fontWeight: 800, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'inline-block' }}>🤖 Ask AI Vet</Link>
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
            <div style={{ position: 'relative', height: 400 }}>
              {[
                { emoji: '🐕', name: 'Bruno', label: 'Lalitpur', color: '#FF6B35', top: 0, left: 30, rotate: -6 },
                { emoji: '🐈', name: 'Luna', label: 'Kathmandu', color: '#7B5EA7', top: 50, right: 10, rotate: 5 },
                { emoji: '🐦', name: 'Tweety', label: 'Thamel', color: '#38BDF8', bottom: 60, left: 0, rotate: -4 },
                { emoji: '🐕', name: 'Kalu', label: 'Bhaktapur', color: '#58CC02', bottom: 0, right: 30, rotate: 7 },
              ].map((c, i) => (
                <div key={i} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, background: '#fff', borderRadius: 22, padding: '18px', border: '2.5px solid #000', boxShadow: '5px 5px 0px #000', transform: `rotate(${c.rotate}deg)`, width: 140 }}>
                  <div style={{ fontSize: 52, textAlign: 'center' }}>{c.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 17, color: '#000', textAlign: 'center', marginTop: 6 }}>{c.name}</div>
                  <div style={{ background: c.color, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 800, textAlign: 'center', padding: '4px 10px', marginTop: 8, border: '1.5px solid #000' }}>📍 {c.label}</div>
                </div>
              ))}
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

        {/* ── FEATURED PETS — REAL DATA ── */}
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
              { icon: '🏥', label: 'Vets & Clinics', desc: 'Find verified vets near you', color: '#FF6B35', href: '/vets' },
              { icon: '✂️', label: 'Grooming', desc: 'Professional pet groomers', color: '#7B5EA7', href: '/vets' },
              { icon: '🏠', label: 'Pet Boarding', desc: 'Safe stays while you travel', color: '#38BDF8', href: '/vets' },
              { icon: '🦮', label: 'Dog Walking', desc: 'Trusted walkers near you', color: '#58CC02', href: '/walk-sit' },
              { icon: '🛋️', label: 'Pet Sitting', desc: 'Home care for your pet', color: '#FF6B9D', href: '/walk-sit' },
              { icon: '🎓', label: 'Training', desc: 'Certified trainers in Nepal', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', boxShadow: '4px 4px 0px #000', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>{s.icon}</div>
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

        {/* ── SWOR AI BANNER ── */}
        <div style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 28px' }}>
          <div style={{ background: '#FF6B35', borderRadius: 24, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 68, height: 68, borderRadius: 18, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', flexShrink: 0 }}>🎙️</div>
              <div>
                <span style={{ background: '#fff', color: '#FF6B35', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 8, border: '1.5px solid #000' }}>A MeroAD.ai Product</span>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 13, fontWeight: 600 }}>Generate authentic Nepali AI voices for your business · meroadai.com</p>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#000', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Try Swor AI →</a>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: '#FFFFFF', marginTop: 72, padding: '56px 28px 36px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾</div>
                  <span style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>HamroPets</span>
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
              <Link key={pet.name} href="/adopt" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', overflow: 'hidden', boxShadow: '4px 4px 0px #000' }}>
                  <div style={{ height: 175, background: `linear-gradient(135deg, ${pet.color}25, ${pet.color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 76, position: 'relative', borderBottom: '2px solid #000' }}>
                    {pet.emoji}
                    <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', color: '#000', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '4px 12px', border: '1.5px solid #000', boxShadow: '1px 1px 0px #000' }}>{pet.tag}</div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>{pet.name}</div>
                    <div style={{ color: '#555', fontSize: 13, marginTop: 3, fontWeight: 600 }}>{pet.breed} · {pet.age}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1.5px dashed #E5E7EB' }}>
                      <span style={{ fontSize: 13, color: '#444', fontWeight: 700 }}>📍 {pet.loc}</span>
                      <span style={{ background: '#58CC02', color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 12px', borderRadius: 999, border: '1.5px solid #000' }}>FREE</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── WALK & SIT GIG BANNER ── */}
        <div style={{ maxWidth: 1200, margin: '60px auto 0', padding: '0 28px' }}>
          <div style={{ background: '#38BDF8', borderRadius: 24, padding: '44px 48px', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
              <div>
                <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '1.5px solid #000', display: 'inline-block', marginBottom: 14 }}>💼 WORK WITH PETS IN NEPAL</span>
                <h2 style={{ color: '#fff', fontSize: 34, fontWeight: 900, margin: '0 0 14px', lineHeight: 1.15, letterSpacing: -0.5 }}>Become a Certified Dog Walker or Pet Sitter</h2>
                <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 15, fontWeight: 600, margin: 0, lineHeight: 1.65 }}>
                  Build Nepal's premier pet gig network. Sign up as a candidate to join our vetting pipeline.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '28px', borderRadius: 18, border: '2.5px solid #000', boxShadow: '4px 4px 0px #000', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: '#000' }}>Register as a Candidate</h4>
                <Link href="/walk-sit" style={{ background: '#FF6B35', color: '#fff', padding: '13px', borderRadius: 12, textDecoration: 'none', fontWeight: 900, fontSize: 14, border: '2px solid #000', boxShadow: '2px 2px 0px #000', textAlign: 'center', display: 'block' }}>🏃 Apply for Dog Walking</Link>
                <Link href="/walk-sit" style={{ background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 12, textDecoration: 'none', fontWeight: 900, fontSize: 14, border: '2px solid #000', boxShadow: '2px 2px 0px #000', textAlign: 'center', display: 'block' }}>🏠 Apply for Pet Sitting</Link>
                <p style={{ fontSize: 11, color: '#888', textAlign: 'center', margin: 0, fontWeight: 600 }}>Due diligence & verification required</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── VETS DIRECTORY ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 28px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <span style={{ background: '#FFD23F', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 10, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🏥 Top Rated</span>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: 0, letterSpacing: -0.5 }}>Verified Vets & Services</h2>
            </div>
            <Link href="/vets" style={{ background: '#fff', color: '#000', padding: '11px 22px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Full Directory →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Kathmandu Vet Hospital', cat: 'Emergency & Surgery', area: 'Maharajgunj', emoji: '🏥', bg: '#FFEAE6', rating: '4.9 · 180+ reviews' },
              { name: 'Paws & Claws Care', cat: 'Grooming & Spa', area: 'Thamel', emoji: '✂️', bg: '#EBF5FF', rating: '4.8 · 94 reviews' },
              { name: 'Happy Paws Boarding', cat: 'Overnight Boarding', area: 'Budhanilkantha', emoji: '🏠', bg: '#EAFCE0', rating: '4.7 · 112 reviews' },
              { name: 'K9 Training Academy', cat: 'Obedience Training', area: 'Baneshwor', emoji: '🎓', bg: '#FFF9E6', rating: '4.9 · 230 reviews' },
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

          {/* Secondary services row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
            {[
              { icon: '✂️', label: 'Pet Grooming & Spa', desc: 'Book trusted hair styling', color: '#7B5EA7', href: '/vets' },
              { icon: '🏠', label: 'Long Term Boarding', desc: 'Secure stays while travelling', color: '#38BDF8', href: '/vets' },
              { icon: '🎓', label: 'Behavioral Training', desc: 'Certified k9 master coaches', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', boxShadow: '3px 3px 0px #000', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0, border: '2px solid #000' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#000' }}>{s.label}</div>
                    <div style={{ color: '#888', fontSize: 13, marginTop: 2, fontWeight: 600 }}>{s.desc}</div>
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
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 15, fontWeight: 600, maxWidth: 480 }}>
                Instant answers about your pet's health, nutrition and behaviour. Free 24/7 for all HamroPets users.
              </p>
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

        {/* ── SWOR AI BANNER ── */}
        <div style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 28px' }}>
          <div style={{ background: '#FF6B35', borderRadius: 24, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', border: '3px solid #000', boxShadow: '5px 5px 0px #000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 68, height: 68, borderRadius: 18, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', flexShrink: 0 }}>🎙️</div>
              <div>
                <span style={{ background: '#fff', color: '#FF6B35', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 8, border: '1.5px solid #000' }}>A MeroAD.ai Product</span>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 13, fontWeight: 600 }}>Generate authentic Nepali AI voices for your business · meroadai.com</p>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#000', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000', display: 'inline-block' }}>Try Swor AI →</a>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: '#FFFFFF', marginTop: 72, padding: '56px 28px 36px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🐾</div>
                  <span style={{ fontWeight: 900, fontSize: 20, color: '#000' }}>HamroPets</span>
                </div>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, maxWidth: 280, fontWeight: 500 }}>
                  Nepal's first dedicated pet platform. Built on 8 years of trust from Adopt a Dog Nepal.
                </p>
                <div style={{ marginTop: 16, display: 'inline-block', background: '#FFF0EB', padding: '6px 14px', borderRadius: 8, border: '1.5px solid #000', fontSize: 12, fontWeight: 800, color: '#FF6B35' }}>
                  🚀 A MeroAD.ai Product
                </div>
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
