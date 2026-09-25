import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <Head>
        <title>About HamroPets — Nepal's First Dedicated Pet Platform</title>
        <meta name="description" content="HamroPets is Nepal's first dedicated pet platform presented by Adopt a Dog Nepal — a nonprofit that has rehomed 700+ pets since 2018. Learn about our mission, team and story." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.hamropets.com/about" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "HamroPets",
          "url": "https://www.hamropets.com",
          "logo": "https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png",
          "description": "Nepal's first dedicated pet platform for free pet adoption, dog walking, pet sitting, vet directory and lost and found pets. Presented by Adopt a Dog Nepal since 2018.",
          "foundingDate": "2018",
          "foundingLocation": "Kathmandu, Nepal",
          "areaServed": "Nepal",
          "parentOrganization": {
            "@type": "NGO",
            "name": "Adopt a Dog Nepal",
            "url": "https://www.facebook.com/AdoptaDogNepal",
            "foundingDate": "2018"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+977-9851405178",
            "contactType": "customer service",
            "availableLanguage": ["English", "Nepali"]
          },
          "sameAs": [
            "https://www.facebook.com/AdoptaDogNepal",
            "https://www.tiktok.com/@adoptadognepal",
            "https://www.instagram.com/adoptadognepal"
          ]
        })}} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, overflow: 'hidden', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png" alt="HamroPets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A' }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 2 }}>
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#1A1A1A', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            )}
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#1A3320', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>🐾 Our Story</span>
            <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: -1, lineHeight: 1.1 }}>
              Nepal's First Dedicated<br />Pet Platform
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.85)', maxWidth: 620, lineHeight: 1.7, margin: '0 0 32px', fontWeight: 500 }}>
              HamroPets is Nepal's first comprehensive pet services platform offering free pet adoption, verified dog walking, cage-free pet sitting, a vet directory and lost and found pet reporting across the Kathmandu Valley. Built on 8 years of trust from Adopt a Dog Nepal.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[['700+', 'Pets Rehomed'], ['8+', 'Years of Trust'], ['91K+', 'TikTok Followers'], ['100%', 'Free Adoption']].map(([v, l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '14px 20px', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ color: '#FFD23F', fontWeight: 900, fontSize: isMobile ? 22 : 28, lineHeight: 1 }}>{v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* MISSION */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 40, marginBottom: 64, alignItems: 'center' }}>
            <div>
              <span style={{ background: '#E8F9ED', color: '#166534', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '1.5px solid #166534' }}>Our Mission</span>
              <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', letterSpacing: -0.5 }}>Every Pet Deserves a Loving Home</h2>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: '0 0 16px' }}>
                Nepal has over 2.7 million dogs, with approximately 2 million living as street or community dogs. The Kathmandu Valley alone has an estimated 19,000 street dogs. Behind every statistic is an animal that deserves care, safety and love.
              </p>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: 0 }}>
                HamroPets exists to connect animals with caring families across Nepal — for free, always. We believe adoption should never cost money, and finding a lost pet should never require scrolling through dozens of Facebook groups.
              </p>
            </div>
            <div style={{ background: '#F0FDF4', borderRadius: 20, border: '3px solid #1A1A1A', padding: '32px', boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
              <h3 style={{ fontWeight: 900, fontSize: 20, color: '#1A1A1A', marginBottom: 12 }}>What We Offer</h3>
              {[
                ['🐕 Free Pet Adoption', 'Connect pets with loving homes across Nepal — no fees ever'],
                ['🦮 Verified Dog Walking', 'ID-verified walkers from NPR 300/walk across Kathmandu'],
                ['🛋️ Cage-Free Pet Sitting', 'Home-based pet sitting from NPR 700/day'],
                ['🏥 Vet Directory', 'Verified vet clinics across Kathmandu Valley'],
                ['🔍 Lost & Found', 'Community-powered lost and found pet reporting'],
              ].map(([title, desc]) => (
                <div key={title} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ADOPT A DOG NEPAL */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 64 }}>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '1.5px solid #1A1A1A' }}>🏆 Our Nonprofit Parent</span>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px' }}>Adopt a Dog Nepal</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
              HamroPets is presented by Adopt a Dog Nepal (ADAN) — a nonprofit organization founded in April 2018 and based in Kathmandu. Since 2018 ADAN has rehomed over 700 dogs and cats across Nepal, building one of the country's most trusted animal welfare communities.
            </p>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
              ADAN operates one of Nepal's most engaged pet communities on social media with over 91,000 TikTok followers and active Facebook and Instagram presences. Every adoption post is reviewed and verified by the ADAN team before going live on HamroPets.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://www.facebook.com/AdoptaDogNepal" target="_blank" rel="noreferrer" style={{ background: '#1877F2', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '2px solid #1A1A1A' }}>Facebook Community</a>
              <a href="https://www.tiktok.com/@adoptadognepal" target="_blank" rel="noreferrer" style={{ background: '#1A1A1A', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none', border: '2px solid #1A1A1A' }}>TikTok 91K+</a>
            </div>
          </div>

          {/* CASE STUDY */}
          <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 64 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '1.5px solid #1A1A1A' }}>📊 Real Impact</span>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#fff', margin: '0 0 24px' }}>HamroPets by the Numbers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
              {[
                ['700+', 'Pets Successfully Rehomed', '#FFD23F'],
                ['91K+', 'TikTok Community Followers', '#58CC02'],
                ['8+', 'Years of Animal Welfare Work', '#38BDF8'],
                ['100%', 'Free Pet Adoption Always', '#FF6B9D'],
              ].map(([v, l, c]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 16px', border: '2px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
                  <div style={{ color: c, fontWeight: 900, fontSize: isMobile ? 24 : 32, lineHeight: 1, marginBottom: 8 }}>{v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* VALUES */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 900, color: '#1A1A1A', margin: '0 0 32px', letterSpacing: -0.5 }}>Our Values</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { emoji: '❤️', title: 'Adoption is Always Free', desc: 'We will never charge adopters or pet owners. Every single adoption on HamroPets is 100% free, always.' },
                { emoji: '✅', title: 'Verified and Trusted', desc: 'Every pet listing is reviewed before going live. Every walker and sitter is ID-verified before appearing on the platform.' },
                { emoji: '🌍', title: 'Built for Nepal', desc: 'We understand Nepal\'s unique context — from Dashain pet purchases to Kathmandu\'s street dog crisis. We build for this reality.' },
                { emoji: '🔒', title: 'Safety First', desc: 'For paid tiers we verify payment before activation. For walkers we check citizenship IDs. We take trust seriously.' },
                { emoji: '🐾', title: 'Animals Matter', desc: 'Behind every listing is a living animal. We treat every pet on our platform as if it were our own.' },
                { emoji: '🤝', title: 'Community Powered', desc: 'HamroPets works because Nepalis care about animals. Our 91K+ community proves that compassion scales.' },
              ].map(v => (
                <div key={v.title} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', padding: '24px', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{v.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A', marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, fontWeight: 500 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: '#FFD23F', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 12px' }}>Ready to Make a Difference?</h2>
            <p style={{ fontSize: 15, color: '#374151', margin: '0 0 28px', fontWeight: 500 }}>Adopt a pet, list your pet for adoption, or join our community of verified walkers and sitters.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/adopt" style={{ background: '#1A3320', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>Adopt a Pet</Link>
              <Link href="/submit-pet" style={{ background: '#fff', color: '#1A1A1A', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>Submit a Pet</Link>
              <Link href="/walk-sit" style={{ background: '#fff', color: '#1A1A1A', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>Find a Walker</Link>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', padding: isMobile ? '24px 16px' : '32px 28px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13 }}>© 2026 HamroPets · Presented by Adopt a Dog Nepal</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="/privacy-policy" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
              <Link href="/about" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>About</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
