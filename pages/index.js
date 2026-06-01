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

      {/* Main Container - Swapped from pale cream to crisp white for ultra contrast */}
      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* 1. GLOBAL NAVIGATION (With Permanent Studio Channel Integration) */}
        <nav style={{ background: '#FFFFFF', borderBottom: '4px solid #000000', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '3px solid #000000', boxShadow: '3px 3px 0px #000000' }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 24, color: '#000000', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 11, color: '#FF4B4B', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S JOYFUL PET HUB</div>
              </div>
            </Link>

            {/* Main Links */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[
                ['Adopt', '/adopt'],
                ['Vets & Clinics', '/vets'],
                ['Walk & Sit Gigs', '/walk-sit'],
                ['Lost & Found', '/lost-found'],
                ['AI Vet Bot', '/ai-vet'],
              ].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 16px', borderRadius: 12, fontSize: 14, fontWeight: 800, color: '#000000', textDecoration: 'none', border: '2px solid transparent', transition: 'all 0.1s' }}>
                  {label}
                </Link>
              ))}
              
              {/* Permanent MeroAd Studio Ecosystem Native Link */}
              <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFEDF2', color: '#FF4B4B', padding: '8px 14px', borderRadius: 12, fontSize: 12, fontWeight: 800, textDecoration: 'none', border: '2px dashed #FF4B4B', marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                ⚡ Studio: <span style={{ textDecoration: 'underline' }}>MeroAd.ai</span>
              </a>
            </div>

            <Link href="/submit-pet" style={{ background: '#FF4B4B', color: '#FFFFFF', padding: '12px 24px', borderRadius: 14, fontSize: 14, fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000', transition: 'transform 0.1s' }}>
              + List a Pet Free
            </Link>
          </div>
        </nav>

        {/* 2. THE HERO SECTION (Stripped Forest Green ➔ Swapped to High-Energy Sunny Yellow) */}
        <div style={{ background: '#FFD23F', padding: '80px 24px', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #000000' }}>
          {/* Duolingo style playful dot matrix texture */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
          
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', position: 'relative' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '3px solid #000000', borderRadius: 999, padding: '8px 20px', marginBottom: 28, boxShadow: '3px 3px 0px #000000' }}>
                <span style={{ fontSize: 16 }}>🇳🇵</span>
                <span style={{ color: '#000000', fontSize: 14, fontWeight: 900, letterSpacing: 0.3 }}>NEPAL'S INTERACTIVE PET WORLD</span>
              </div>
              
              <h1 style={{ color: '#000000', fontSize: 64, fontWeight: 950, margin: '0 0 24px', lineHeight: 1.0, letterSpacing: -2 }}>
                Every Pet <br />
                <span style={{ background: '#FFFFFF', padding: '0 12px', borderRadius: 16, border: '3px solid #000000', display: 'inline-block', transform: 'rotate(-2deg)', boxShadow: '4px 4px 0px #000000', color: '#FF4B4B' }}>Deserves</span> <br />
                a Joyful Home! 🐶
              </h1>
              
              <p style={{ color: '#000000', fontSize: 19, lineHeight: 1.6, marginBottom: 36, maxWidth: 480, fontWeight: 700 }}>
                700+ tails wagging in loving local families. Swipe through adoptable pets based right in your neighborhood.
              </p>
              
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#00A3FF', color: '#FFFFFF', padding: '18px 36px', borderRadius: 16, fontSize: 18, fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', boxShadow: '5px 5px 0px #000000', display: 'inline-block' }}>
                  🐾 Find Pets Near Me
                </Link>
                <Link href="/ai-vet" style={{ background: '#FFFFFF', color: '#000000', padding: '18px 36px', borderRadius: 16, fontSize: 18, fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', boxShadow: '5px 5px 0px #000000', display: 'inline-block' }}>
                  🤖 Ask Gemini AI Vet
                </Link>
              </div>

              {/* Hard Stat Badges */}
              <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
                {[
                  ['700+', 'Adopted Hub', '#58CC02'], 
                  ['100% Free', 'No Hidden Fees', '#00A3FF'], 
                  ['24 Hours', 'Verified Listings', '#FF4B4B']
                ].map(([value, label, badgeColor]) => (
                  <div key={label} style={{ background: '#FFFFFF', borderRadius: 16, padding: '14px 20px', border: '3px solid #000000', boxShadow: '3px 3px 0px #000000' }}>
                    <div style={{ color: badgeColor, fontWeight: 950, fontSize: 24, lineHeight: 1 }}>{value}</div>
                    <div style={{ color: '#000000', fontSize: 13, marginTop: 4, fontWeight: 800 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Game-Style Pet Cards */}
            <div style={{ position: 'relative', height: 420 }}>
              {[
                { emoji: '🐕', name: 'Bruno', label: 'Jhamsikhel', color: '#FF4B4B', top: 10, left: 30, rotate: -6 },
                { emoji: '🐈', name: 'Luna', label: 'Baluwatar', color: '#7B5EA7', top: 50, right: 10, rotate: 6 },
                { emoji: '🐦', name: 'Tweety', label: 'Thamel', color: '#FFD23F', bottom: 60, left: 0, rotate: -4 },
                { emoji: '🐶', name: 'Kalu', label: 'Maharajgunj', color: '#58CC02', bottom: 10, right: 40, rotate: 8 },
              ].map((c, i) => (
                <div key={i} style={{ position: 'absolute', top: c.top, bottom: c.bottom, left: c.left, right: c.right, background: '#FFFFFF', borderRadius: 24, padding: '20px', border: '3px solid #000000', boxShadow: '5px 5px 0px #000000', transform: `rotate(${c.rotate}deg)`, width: 145 }}>
                  <div style={{ fontSize: 56, textAlign: 'center' }}>{c.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 18, color: '#000000', textAlign: 'center', marginTop: 6 }}>{c.name}</div>
                  <div style={{ background: c.color, color: '#FFFFFF', borderRadius: 999, fontSize: 11, fontWeight: 800, textAlign: 'center', padding: '4px 10px', marginTop: 8, border: '2px solid #000000' }}>📍 {c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. LOCATION & SPECIES INTERACTIVE SEARCH (Crucial Core Hub) */}
        <div style={{ background: '#FFFFFF', padding: '36px 24px', borderBottom: '4px solid #000000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Species Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#000000', textTransform: 'uppercase' }}>1. Pick Species:</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  ['🐕 Dogs Only', '#FF4B4B'], 
                  ['🐈 Cozy Cats', '#7B5EA7'], 
                  ['🐦 Vocal Birds', '#00A3FF'], 
                  ['🐾 Show All Animals', '#58CC02']
                ].map(([label, color]) => (
                  <Link key={label} href="/adopt" style={{ padding: '12px 24px', borderRadius: 16, border: '3px solid #000000', background: color, color: '#FFFFFF', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: '3px 3px 0px #000000' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dedicated High-Priority Location Hub Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', borderTop: '2px dashed #000000', paddingTop: 20 }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#000000', textTransform: 'uppercase' }}>2. Browse by Location Hub:</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['📍 View All Nepal', 'Jhamsikhel', 'Baluwatar', 'Maharajgunj', 'Thamel', 'Chshapati', 'Pokhara Hub'].map((loc, idx) => (
                  <Link key={loc} href={`/adopt?location=${loc}`} style={{ padding: '10px 20px', borderRadius: 14, border: '3px solid #000000', background: idx === 0 ? '#FFD23F' : '#FFFFFF', color: '#000000', fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '3px 3px 0px #000000' }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 4. PETS WAITING FOR YOU GRID */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
            <div>
              <span style={{ background: '#58CC02', color: '#FFFFFF', padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000' }}>⚡ FRESH ADOPTIONS NOW OPEN</span>
              <h2 style={{ fontSize: 40, fontWeight: 950, color: '#000000', margin: 0, letterSpacing: -1 }}>Meet Pups Looking For A Home</h2>
            </div>
            <Link href="/adopt" style={{ background: '#FFFFFF', color: '#000000', padding: '14px 28px', borderRadius: 16, border: '3px solid #000000', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: '4px 4px 0px #000000' }}>View Every Single Pet →</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { name: 'Bruno', breed: 'Labrador Retriever', age: '2 Years', loc: 'Jhamsikhel', emoji: '🐕', color: '#FF4B4B', tag: 'Fully Vaccinated 💉' },
              { name: 'Luna', breed: 'Persian Calico', age: '1 Year', loc: 'Baluwatar', emoji: '🐈', color: '#7B5EA7', tag: 'Neutered Verified ✓' },
              { name: 'Kalu', breed: 'Local Rescue Dog', age: '6 Months', loc: 'Maharajgunj', emoji: '🐶', color: '#58CC02', tag: 'High Energy 🎾' },
              { name: 'Tweety', breed: 'Budgerigar Bird', age: '8 Months', loc: 'Thamel', emoji: '🐦', color: '#00A3FF', tag: 'Enjoys Talking! 🗣' },
            ].map(pet => (
              <Link key={pet.name} href="/adopt" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 24, border: '3px solid #000000', overflow: 'hidden', boxShadow: '4px 4px 0px #000000' }}>
                  <div style={{ height: 190, background: `linear-gradient(135deg, ${pet.color}22, ${pet.color}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, position: 'relative', borderBottom: '3px solid #000000' }}>
                    {pet.emoji}
                    <div style={{ position: 'absolute', top: 14, left: 14, background: '#FFFFFF', color: '#000000', borderRadius: 999, fontSize: 11, fontWeight: 900, padding: '4px 12px', border: '2px solid #000000', boxShadow: '2px 2px 0px #000000' }}>{pet.tag}</div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontWeight: 950, fontSize: 22, color: '#000000' }}>{pet.name}</div>
                    <div style={{ color: '#000000', fontSize: 14, marginTop: 4, fontWeight: 700 }}>{pet.breed} · {pet.age}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTop: '2px dashed #E5E7EB', paddingTop: 12 }}>
                      <span style={{ fontSize: 13, color: '#000000', fontWeight: 800 }}>📍 {pet.loc}</span>
                      <span style={{ background: '#58CC02', color: '#FFFFFF', fontSize: 11, fontWeight: 900, padding: '4px 12px', borderRadius: 999, border: '2px solid #000000' }}>ADOPT FREE</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. NEW GIG ECONOMY: DOG WALKING & PET SITTING REGISTRATION CARD COMPONENT */}
        <div style={{ maxWidth: 1200, margin: '64px auto 0', padding: '0 24px' }}>
          <div style={{ background: '#00A3FF', borderRadius: 28, padding: '48px', border: '4px solid #000000', boxShadow: '6px 6px 0px #000000', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
              <div>
                <span style={{ background: '#FFD23F', color: '#000000', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, border: '2px solid #000000', display: 'inline-block', marginBottom: 16 }}>💼 WORK WITH PETS IN NEPAL</span>
                <h2 style={{ color: '#FFFFFF', fontSize: 38, fontWeight: 950, margin: '0 0 16px', lineHeight: 1.1 }}>Become a Certified Dog Walker or Pet Sitter</h2>
                <p style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                  Want to offer dog walking, pet exercises, or overnight home boarding services? We are building Nepal's premier pet gig infrastructure. Sign up as a candidate today to join our vetting pipeline.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF', padding: '28px', borderRadius: 24, border: '3px solid #000000', boxShadow: '4px 4px 0px #000000' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 900, color: '#000000' }}>Register as Pet Candidate</h4>
                <Link href="/register-walker" style={{ background: '#FF4B4B', color: '#FFFFFF', padding: '14px', borderRadius: 14, textHeading: 'center', textDecoration: 'none', fontWeight: 900, fontSize: 14, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000', textAlign: 'center' }}>
                  🏃‍♂️ Apply for Dog Walking Gigs
                </Link>
                <Link href="/register-sitter" style={{ background: '#58CC02', color: '#FFFFFF', padding: '14px', borderRadius: 14, textHeading: 'center', textDecoration: 'none', fontWeight: 900, fontSize: 14, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000', textAlign: 'center' }}>
                  🏠 Apply for Pet Sitting Gigs
                </Link>
                <div style={{ fontSize: 11, color: '#6B7C99', textAlign: 'center', fontWeight: 700, marginTop: 4 }}>Due Diligence and Trust Verification Required.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TRUSTED VETS & MEDICAL CLINICS (Upgraded to High-Fidelity Visual Image Profiles) */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span style={{ background: '#FFD23F', color: '#000000', padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 12, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000' }}>🏥 MEDICAL DIRECTORY</span>
              <h2 style={{ fontSize: 40, fontWeight: 950, color: '#000000', margin: 0, letterSpacing: -1 }}>Verified Vets & Medical Clinics</h2>
            </div>
            <Link href="/vets" style={{ background: '#FFFFFF', color: '#000000', padding: '14px 28px', borderRadius: 16, border: '3px solid #000000', fontSize: 15, fontWeight: 900, textDecoration: 'none', boxShadow: '4px 4px 0px #000000' }}>Full Clinic Index →</Link>
          </div>

          {/* Grid Layout Representing Real Clinics and Veterinary Images */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { name: 'Kathmandu Vet Hospital', cat: 'Emergency & Surgery', area: 'Maharajgunj Hub', phone: '01-441XXXX', imgBg: '#FFEAE6', emoji: '🏥', rating: '4.9 (180+ Reviews)' },
              { name: 'Paws & Claws Care', cat: 'Professional Grooming', area: 'Thamel Market', phone: '01-421XXXX', imgBg: '#EBF5FF', emoji: '✂️', rating: '4.8 (94 Reviews)' },
              { name: 'Happy Paws Stay & Boarding', cat: 'Overnight Kennel Care', area: 'Budhanilkantha', phone: '98510XXXXX', imgBg: '#EAFCE0', emoji: '🏠', rating: '4.7 (112 Reviews)' },
              { name: 'K9 Training Academy', cat: 'Obedience & Behavioral', area: 'Baneshwor Chowk', phone: '98412XXXXX', imgBg: '#FFF9E6', emoji: '🎓', rating: '4.9 (230 Reviews)' },
            ].map(v => (
              <Link key={v.name} href="/vets" style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 24, border: '3px solid #000000', overflow: 'hidden', boxShadow: '4px 4px 0px #000000' }}>
                  {/* Hero Image Container for Vet Profiles */}
                  <div style={{ height: 140, background: v.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 54, borderBottom: '3px solid #000000', position: 'relative' }}>
                    <div style={{ position: 'absolute', background: '#000000', color: '#FFFFFF', fontSize: 11, fontWeight: 900, padding: '4px 10px', top: 12, right: 12, borderRadius: 8 }}>PREMIUM</div>
                    {v.emoji}
                  </div>
                  <div style={{ padding: '18px' }}>
                    <div style={{ background: '#FF4B4B', color: '#FFFFFF', display: 'inline-block', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 6, marginBottom: 8, border: '1.5px solid #000000' }}>{v.cat}</div>
                    <h4 style={{ fontWeight: 900, fontSize: 16, color: '#000000', margin: '0 0 6px', lineHeight: 1.2 }}>{v.name}</h4>
                    <div style={{ fontSize: 13, color: '#000000', fontWeight: 700, marginBottom: 2 }}>📍 {v.area}</div>
                    <div style={{ fontSize: 13, color: '#6B7C99', fontWeight: 600 }}>📞 {v.phone}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 14, paddingTop: 10, borderTop: '2px dashed #E5E7EB', fontSize: 13, fontWeight: 900, color: '#F59E0B' }}>
                      ⭐ {v.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 7. QUICK SERVICES UTILITY LINK BLOCKS */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '✂️', label: 'Pet Grooming & Spa', desc: 'Book trusted hair styling appointments.', color: '#7B5EA7', href: '/vets' },
              { icon: '🏠', label: 'Long Term Boarding', desc: 'Secure local stays while travelling.', color: '#00A3FF', href: '/vets' },
              { icon: '🎓', label: 'Expert Behavioral Training', desc: 'Certified k9 master coaches.', color: '#FFD23F', href: '/vets' },
            ].map(s => (
              <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 24, border: '3px solid #000000', boxShadow: '4px 4px 0px #000000', padding: '24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000' }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: '#000000' }}>{s.label}</div>
                    <div style={{ color: '#6B7C99', fontSize: 13, marginTop: 2, fontWeight: 600 }}>{s.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 8. NEXT-GEN CHAT INTERFACE: GEMINI PRO API AI VET CHATBOT BANNER */}
        <div style={{ maxWidth: 1200, margin: '64px auto 0', padding: '0 24px' }}>
          <div style={{ background: '#7B5EA7', borderRadius: 28, padding: '44px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', border: '4px solid #000000', boxShadow: '6px 6px 0px #000000' }}>
            <div>
              <span style={{ background: '#FFFFFF', color: '#7B5EA7', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 14, border: '2px solid #000000' }}>🤖 ADVANCED GEMINI PRO API INTERACTION</span>
              <h3 style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 950, margin: '0 0 10px', letterSpacing: -0.5 }}>Instant AI Diagnoses Vet Chatbot 💬</h3>
              <p style={{ color: 'rgba(255,255,255,0.95)', margin: 0, fontSize: 16, fontWeight: 700, maxWidth: 520 }}>
                Unsure about symptoms, food habits, or minor behavioral issues? Get instant feedback using our intelligent diagnostic chatbot before physical appointments.
              </p>
            </div>
            <Link href="/ai-vet" style={{ background: '#FFD23F', color: '#000000', padding: '18px 36px', borderRadius: 16, fontSize: 16, fontWeight: 950, textDecoration: 'none', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000' }}>Launch Chat Interface →</Link>
          </div>
        </div>

        {/* 9. LOST & FOUND RED/GREEN SYSTEM EMERGENCY STRIP */}
        <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 24px' }}>
          <div style={{ background: '#FFF0F6', borderRadius: 28, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, border: '4px solid #000000', boxShadow: '6px 6px 0px #000000', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 44, marginBottom: 6 }}>🚨</div>
              <h3 style={{ fontSize: 26, fontWeight: 950, margin: '0 0 6px', color: '#000000' }}>Community Pet Broadcast Tracker</h3>
              <p style={{ color: '#6B7C99', margin: 0, fontSize: 15, fontWeight: 700 }}>Missing animal alerts or found rescues needing scanning across Nepal neighborhoods.</p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link href="/lost-found" style={{ background: '#FF4B4B', color: '#FFFFFF', padding: '14px 28px', borderRadius: 16, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', boxShadow: '3px 3px 0px #000000' }}>🔴 Broadcast Lost Pet</Link>
              <Link href="/lost-found" style={{ background: '#58CC02', color: '#FFFFFF', padding: '14px 28px', borderRadius: 16, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '3px solid #000000', boxShadow: '3px 3px 0px #000000' }}>🟢 I Found Stray Animal</Link>
            </div>
          </div>
        </div>

        {/* 10. STUDIO MARKETING ECOSYSTEM SHOWCASE: SWOR AI VOICEOVER PRODUCER BANNER */}
        <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 24px' }}>
          <div style={{ background: '#FF4B4B', borderRadius: 28, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', border: '4px solid #000000', boxShadow: '6px 6px 0px #000000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '3px solid #000000', boxShadow: '3px 3px 0px #000000', flexShrink: 0 }}>🎙️</div>
              <div>
                <span style={{ background: '#FFFFFF', color: '#FF4B4B', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 8, border: '2px solid #000000' }}>OFFICIAL PARTNER HUB</span>
                <h3 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 950, margin: '0 0 6px' }}>Swor AI — Elite Audio Engineering For Nepali Creators</h3>
                <p style={{ color: 'rgba(255,255,255,0.95)', margin: 0, fontSize: 14, fontWeight: 700 }}>Generate localized audio vectors and lifelike speech logic · Developed by MeroAd.ai</p>
              </div>
            </div>
            <a href="https://meroadai.com" target="_blank" rel="noreferrer" style={{ background: '#FFD23F', color: '#000000', padding: '16px 32px', borderRadius: 16, fontSize: 15, fontWeight: 950, textDecoration: 'none', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000' }}>Open Swor AI Engine →</a>
          </div>
        </div>

        {/* 11. FOOTER OVERHAUL (Ditched Dark Slate ➔ Styled with Crisp Contrasted Grounding Lines) */}
        <footer style={{ background: '#FFFFFF', marginTop: 80, padding: '64px 24px 40px', borderTop: '4px solid #000000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '2px solid #000000', boxShadow: '2px 2px 0px #000000' }}>🐾</div>
                  <span style={{ fontWeight: 950, fontSize: 22, color: '#000000' }}>HamroPets</span>
                </div>
                <p style={{ color: '#6B7C99', fontSize: 14, lineHeight: 1.6, maxWidth: 300, fontWeight: 600 }}>
                  Nepal's hyper-visual, advanced digital ecosystem. Built hand-in-hand with trust protocols from Adopt a Dog Nepal.
                </p>
                <div style={{ marginTop: 20 }}>
                  <span style={{ color: '#000000', fontSize: 12, fontWeight: 800, background: '#FFF0F6', padding: '6px 12px', borderRadius: 8, border: '1.5px solid #000000' }}>🚀 A Product of MeroAd.ai Studio</span>
                </div>
              </div>
              
              {[
                ['Core Services', ['Adopt Pet Matchmaker', 'Vet Medical Map', 'Dog Walker Listings', 'Lost & Found Tracker', 'Gemini Diagnoses Chat']],
                ['Monetization Paths', ['Advertise Banners', 'Premium Clinic Spaces', 'Affiliate Sponsorships', 'Corporate Brand Kits']],
                ['Ecosystem Matrix', ['About Platform Roots', 'Adopt a Dog Nepal', 'Swor AI Audio Matrix', 'Contact Architecture']],
              ].map(([heading, items]) => (
                <div key={heading}>
                  <div style={{ fontWeight: 900, fontSize: 13, color: '#000000', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>{heading}</div>
                  {items.map(item => (
                    <div key={item} style={{ color: '#6B7C99', fontSize: 14, marginBottom: 12, cursor: 'pointer', fontWeight: 700, transition: 'color 0.1s' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '3px solid #000000', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7C99', fontSize: 13, fontWeight: 700 }}>© 2026 HamroPets · Empowered via Custom Cloud Architectures</span>
              <span style={{ color: '#000000', fontSize: 13, fontWeight: 900, background: '#FFEDF2', padding: '4px 12px', borderRadius: 8, border: '2px solid #000000' }}>Built with 💖 in Kathmandu, Nepal 🇳🇵</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
