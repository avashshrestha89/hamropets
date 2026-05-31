import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>HamroPets — Nepal's First Dedicated Pet Platform</title>
        <meta name="description" content="Adopt pets, find vets, dog walking and pet sitting services across Nepal." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen" style={{ background: '#FFFBF5' }}>

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
              {[
                ['Adopt', '/adopt'],
                ['Vets', '/vets'],
                ['Walk & Sit', '/walk-sit'],
                ['Lost & Found', '/lost-found'],
                ['AI Vet', '/ai-vet'],
                ['Advertise', '/advertise'],
              ].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: '#6B7C99', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(255,107,53,0.3)' }}>
              + List a Pet
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: 'linear-gradient(135deg, #1A3320 0%, #2D7A3A 60%, #358a41 100%)', padding: '72px 32px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
                <span>🇳🇵</span>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Nepal's First Dedicated Pet Platform</span>
              </div>
              <h1 style={{ color: '#fff', fontSize: 52, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.05, letterSpacing: -1.5 }}>
                Every Pet<br />
                <span style={{ color: '#FFD23F' }}>Deserves</span> a<br />
                Loving Home 🐾
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
                700+ dogs rehomed since 2018. Connecting Nepal's pets with families who truly care.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#FFD23F', color: '#1A3320', padding: '16px 32px', borderRadius: 999, fontSize: 16, fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>
                  🐾 Find a Pet
                </Link>
                <Link href="/submit-pet" style={{ background: 'transparent', color: '#fff', padding: '16px 32px', borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.5)' }}>
                  + List for Adoption
                </Link>
              </div>
              <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
                {[['700+', 'Pets Rehomed'], ['Free', 'Always & Forever'], ['24hr', 'Listing Review']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ color: '#58CC02', fontWeight: 900, fontSize: 26, lineHeight: 1 }}>{v}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 4, fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating pet cards */}
            <div style={{ position: 'relative', height: 380 }}>
              {[
                { emoji: '🐕', name: 'Bruno', label: 'Ready to adopt!', color: '#FF6B35', top: 0, left: 40, rotate: -6 },
                { emoji: '🐈', name: 'Luna', label: '3 months old', color: '#7B5EA7', top: 60, right: 0, rotate: 5 },
                { emoji: '🐦', name: 'Tweety', label: 'Loves to sing!', color: '#56C271', bottom: 30, left: 0, rotate: -3 },
                { emoji: '🐕', name: 'Kalu', label: 'So playful!', color: '#FF6B9D', bottom: 0, right: 40, rotate: 7 },
              ].map((c, i) => (
                <div key={i} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, background: '#fff', borderRadius: 20, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transform: `rotate(${c.rotate}deg)`, width: 140 }}>
                  <div style={{ fontSize: 48, textAlign: 'center' }}>{c.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#1A3320', textAlign: 'center', marginTop: 4 }}>{c.name}</div>
                  <div style={{ background: c.color, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, textAlign: 'center', padding: '3px 10px', marginTop: 6 }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPECIES + LOCATION FILTER */}
        <div style={{ background: '#fff', padding: '24px 32px', borderBottom: '2px solid #EDE8F5' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#1A3320' }}>Browse by:</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['🐕 Dogs', '#FF6B35'], ['🐈 Cats', '#7B5EA7'], ['🐦 Birds', '#38BDF8'], ['🐾 All Pets', '#56C271']].map(([label, color]) => (
                <Link key={label} href="/adopt" style={{ padding: '10px 20px', borderRadius: 999, border: `2px solid ${color}`, background: '#fff', fontSize: 14, fontWeight: 700, color, textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <div style={{ width: 1, height: 32, background: '#EDE8F5' }} />
            <div style={{ fontWeight: 800, fontSize: 14, color: '#1A3320' }}>📍 Location:</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'].map(loc => (
                <Link key={loc} href={`/adopt?location=${loc}`} style={{ padding: '8px 18px', borderRadius: 999, border: '2px solid #EDE8F5', background: '#fff', color: '#6B7C99', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>{loc}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED PETS */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <span style={{ background: '#FFF0EB', color: '#FF6B35', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>🐾 Available Now</span>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: '#1A3320', margin: 0, letterSpacing: -0.5 }}>Pets Waiting for You</h2>
              <p style={{ color: '#6B7C99', margin: '6px 0 0', fontSize: 15 }}>All listings reviewed & approved · Adoption is always free</p>
            </div>
            <Link href="/adopt" style={{ background: 'transparent', color: '#FF6B35', padding: '10px 20px', borderRadius: 999, border: '2px solid #FF6B35', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>View All Pets →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Bruno', breed: 'Labrador Mix', age: '2 yrs', loc: 'Lalitpur', emoji: '🐕', color: '#FF6B35', tag: 'Vaccinated ✓' },
              { name: 'Luna', breed: 'Persian Mix', age: '1 yr', loc: 'Kathmandu', emoji: '🐈', color: '#7B5EA7', tag: 'Neutered ✓' },
              { name: 'Kalu', breed: 'Street Dog', age: '6 mo', loc: 'Bhaktapur', emoji: '🐕', color: '#56C271', tag: 'Playful 🎾' },
              { name: 'Tweety', breed: 'Budgerigar', age: '8 mo', loc: 'Patan', emoji: '🐦', color: '#38BDF8', tag: 'Talks! 🗣' },
            ].map(pet => (
              <Link key={pet.name} href="/adopt" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)', transition: 'transform 0.2s' }}>
                  <div style={{ height: 170, background: `linear-gradient(135deg, ${pet.color}22, ${pet.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                    {pet.emoji}
                    <div style={{ position: 'absolute', top: 12, left: 12, background: pet.color, color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '3px 10px' }}>{pet.tag}</div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#1A3320' }}>{pet.name}</div>
                    <div style={{ color: '#6B7C99', fontSize: 13, marginTop: 2 }}>{pet.breed} · {pet.age}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      <span style={{ fontSize: 12, color: '#A0AFCC' }}>📍 {pet.loc}</span>
                      <span style={{ background: '#E8F9ED', color: '#56C271', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999 }}>FREE</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SERVICES GRID */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 0' }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ background: '#E8F9ED', color: '#56C271', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>🏥 Services</span>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: '#1A3320', margin: 0, letterSpacing: -0.5 }}>Everything Your Pet Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: '🏥', label: 'Vets & Clinics', desc: 'Find verified vets near you', color: '#FF6B35', href: '/vets' },
              { icon: '✂️', label: 'Grooming', desc: 'Professional pet groomers', color: '#7B5EA7', href: '/vets' },
              { icon: '🏠', label: 'Pet Boarding', desc: 'Safe stays while you travel', color: '#38BDF8', href: '/vets' },
              { icon: '🦮', label: 'Dog Walking', desc: 'Trusted walkers near you', color: '#56C271', href: '/walk-sit' },
              { icon: '🛋️', label: 'Pet Sitting', desc: 'Home care for your pet', color: '#FF6B9D', href: '/walk-sit' },
              { icon: '🎓', label: 'Training', desc: 'Certified trainers in Nepal', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', boxShadow: '0 4px 24px rgba(27,43,75,0.10)', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#1A3320' }}>{s.label}</div>
                    <div style={{ color: '#6B7C99', fontSize: 13, marginTop: 3 }}>{s.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#A0AFCC', fontSize: 18 }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED VETS */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <span style={{ background: '#E0F6FF', color: '#38BDF8', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>⭐ Top Rated</span>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: '#1A3320', margin: 0 }}>Trusted Vets & Services</h2>
            </div>
            <Link href="/vets" style={{ background: 'transparent', color: '#FF6B35', padding: '10px 20px', borderRadius: 999, border: '2px solid #FF6B35', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Full Directory →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { name: 'Kathmandu Vet Hospital', cat: 'Vet Clinic', area: 'Maharajgunj', emoji: '🏥', color: '#FF6B35', rating: '4.9' },
              { name: 'Paws & Claws', cat: 'Grooming', area: 'Thamel', emoji: '✂️', color: '#7B5EA7', rating: '4.8' },
              { name: 'Happy Paws Boarding', cat: 'Boarding', area: 'Budhanilkantha', emoji: '🏠', color: '#38BDF8', rating: '4.7' },
              { name: 'K9 Training Nepal', cat: 'Trainer', area: 'Baneshwor', emoji: '🎓', color: '#56C271', rating: '4.9' },
            ].map(v => (
              <Link key={v.name} href="/vets" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #EDE8F5', overflow: 'hidden', boxShadow: '0 4px 24px rgba(27,43,75,0.10)' }}>
                  <div style={{ height: 110, background: `linear-gradient(135deg, ${v.color}18, ${v.color}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{v.emoji}</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#1A3320', lineHeight: 1.3 }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7C99', marginTop: 3 }}>{v.cat}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: '#A0AFCC' }}>📍 {v.area}</span>
                      <span style={{ fontWeight: 700, color: '#F59E0B', fontSize: 13 }}>⭐ {v.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI VET BANNER */}
        <div style={{ maxWidth: 1100, margin: '48px auto 0', padding: '0 32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #7B5EA7 0%, #1A3320 100%)', borderRadius: 28, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>✨ Powered by Gemini Pro</span>
              <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 8px' }}>AI Vet — Ask Anything 🤖</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', margin: 0, fontSize: 15, maxWidth: 400 }}>Instant answers about your pet's health, nutrition and behaviour. Free for all HamroPets users.</p>
            </div>
            <Link href="/ai-vet" style={{ background: '#FFD23F', color: '#1A3320', padding: '16px 32px', borderRadius: 999, fontSize: 16, fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}>Chat with AI Vet →</Link>
          </div>
        </div>

        {/* LOST & FOUND STRIP */}
        <div style={{ maxWidth: 1100, margin: '40px auto 0', padding: '0 32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #FFF1F1, #FFF8F1)', borderRadius: 28, padding: '36px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, border: '1.5px solid #FFD6D6', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', color: '#1A3320' }}>Lost or Found a Pet?</h3>
              <p style={{ color: '#6B7C99', margin: 0, fontSize: 14 }}>Our community reunites pets with their families across Nepal.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '12px 24px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>🔴 I Lost My Pet</Link>
              <Link href="/lost-found" style={{ background: '#56C271', color: '#fff', padding: '12px 24px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>🟢 I Found a Pet</Link>
            </div>
          </div>
        </div>

        {/* SWOR AI BANNER */}
        <div style={{ maxWidth: 1100, margin: '40px auto 0', padding: '0 32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #1A3320 0%, #2D7A3A 100%)', borderRadius: 28, padding: '36px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🎙️</div>
              <div>
                <span style={{ background: 'rgba(255,107,53,0.25)', color: '#FFD23F', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 6 }}>Powered by MeroAD.ai</span>
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: '0 0 4px' }}>Swor AI — Nepal's First Nepali Voice Generator</h3>
                <p style={{ color: 'rgba(255,255,255,0.60)', margin: 0, fontSize: 13 }}>Generate authentic Nepali AI voices for your business · meroadai.com</p>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FF6B35', color: '#fff', padding: '12px 24px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(255,107,53,0.3)' }}>Try Swor AI →</a>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '48px 32px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🐾</div>
                  <span style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>HamroPets</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Nepal's first dedicated pet platform. Built on 8 years of trust from Adopt a Dog Nepal.</p>
                <div style={{ marginTop: 16 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>A MeroAD.ai product · Kathmandu 🇳🇵</span>
                </div>
              </div>
              {[
                ['Platform', ['Adopt a Pet', 'Vet Directory', 'Dog Walking', 'Lost & Found', 'AI Vet Chat']],
                ['For Businesses', ['Advertise', 'List Your Clinic', 'Partner with Us', 'Media Kit']],
                ['Company', ['About HamroPets', 'Adopt a Dog Nepal', 'Swor AI', 'Contact Us']],
              ].map(([heading, items]) => (
                <div key={heading}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{heading}</div>
                  {items.map(item => (
                    <div key={item} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginBottom: 10, cursor: 'pointer' }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>© 2025 HamroPets · All rights reserved</span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Built with ❤️ in Kathmandu</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
