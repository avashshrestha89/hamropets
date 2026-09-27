import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AvashShrestha() {
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
        <title>Avash Shrestha — Founder of HamroPets & Adopt a Dog Nepal</title>
        <meta name="description" content="Avash Shrestha is the founder of HamroPets.com and Adopt a Dog Nepal — Nepal's most trusted pet adoption platform and animal welfare nonprofit. MBA, California University. Based in Kathmandu, Nepal." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.hamropets.com/avash-shrestha" />
        <meta property="og:title" content="Avash Shrestha — Founder of HamroPets & Adopt a Dog Nepal" />
        <meta property="og:description" content="Avash Shrestha founded Adopt a Dog Nepal in 2018 and HamroPets.com in 2026 — reshaping animal welfare and pet adoption across Nepal." />
        <meta property="og:url" content="https://www.hamropets.com/avash-shrestha" />
        <meta property="og:type" content="profile" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Avash Shrestha",
          "jobTitle": "Founder & Executive Director",
          "worksFor": [
            {
              "@type": "Organization",
              "name": "HamroPets",
              "url": "https://www.hamropets.com"
            },
            {
              "@type": "NGO",
              "name": "Adopt a Dog Nepal",
              "url": "https://www.facebook.com/AdoptaDogNepal"
            }
          ],
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "California University",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "California",
              "addressCountry": "US"
            }
          },
          "knowsAbout": ["Animal Welfare", "Pet Adoption", "Digital Transformation", "IT Compliance", "Financial Services"],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kathmandu",
            "addressCountry": "NP"
          },
          "url": "https://www.hamropets.com/avash-shrestha"
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
            <Link href="/" style={{ background: '#fff', color: '#1A1A1A', padding: '8px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A' }}>← Home</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#1A3320', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #B45309' }}>👤 Founder Profile</span>
            <h1 style={{ fontSize: isMobile ? 30 : 48, fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: -1, lineHeight: 1.1 }}>
              Avash Shrestha
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: '#FFD23F', fontWeight: 700, margin: '0 0 20px' }}>
              Founder & Executive Director — HamroPets & Adopt a Dog Nepal
            </p>
            <p style={{ fontSize: isMobile ? 14 : 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0, maxWidth: 680, fontWeight: 500 }}>
              Avash Shrestha founded Adopt a Dog Nepal in April 2018 and HamroPets.com in 2026 — building Nepal's most trusted animal welfare community and its first dedicated pet services platform from the ground up.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* FAST FACTS */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '20px' : '32px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 48 }}>
            <div style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A', marginBottom: 20 }}>📋 At a Glance</div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              {[
                ['Current Role', 'Founder & Executive Director, HamroPets.com'],
                ['Nonprofit', 'Founder & Executive Director, Adopt a Dog Nepal (Est. April 2018)'],
                ['Education', 'MBA — California University, California, USA'],
                ['Expertise', 'Digital Transformation · IT Compliance · Animal Welfare Operations · Financial Services'],
                ['Based In', 'Kathmandu, Nepal'],
                ['Impact', '1,000+ pets rehomed · 91K+ TikTok followers · 8+ years of animal welfare work'],
              ].map(([label, value]) => (
                <div key={label} style={{ background: '#F9FAFB', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #E5E7EB' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* SECTION 1 */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', paddingBottom: 12, borderBottom: '3px solid #FFD23F' }}>
                Recognizing What Was Already There
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                When Adopt a Dog Nepal was founded in April 2018, the street dog population in Kathmandu was viewed primarily as a municipal nuisance. Poisoning campaigns, culling and complaints to ward offices were the default responses. Animal welfare was treated as an imported concern — relevant elsewhere, not here.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                After working in financial services across the US and Nepal, Avash Shrestha recognized a gap in the local animal welfare ecosystem. Young Nepalis — urban professionals, students, families in Kathmandu and Lalitpur — cared deeply about street animals. What they lacked was an organized, transparent outlet to act on that care.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8 }}>
                He did not bring a foreign model and apply it to Nepal. He built around what was already present — community care, social media fluency and a generation ready to change how their city treated its animals.
              </p>
            </div>

            {/* SECTION 2 */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', paddingBottom: 12, borderBottom: '3px solid #58CC02' }}>
                Building Adopt a Dog Nepal
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Adopt a Dog Nepal launched in April 2018 — not as a shelter, not as a registered NGO with donor reports and grant cycles, but as a community. A TikTok page. A Facebook group. A WhatsApp network of people who wanted to help animals find homes.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                The model was simple by design: find the animal, tell its story honestly, match it with the right family, follow up. No money exchanged. No bureaucracy. Each adoption was free.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8 }}>
                Within eight years ADAN had rehomed over 1,000 dogs and cats across Nepal. The TikTok community grew to 91,000+ followers — one of the largest animal welfare audiences on social media in Nepal. But the more significant outcome was not the numbers. It was the shift in how a generation of Nepalis thought about adoption.
              </p>
            </div>

            {/* STATS */}
            <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '36px 40px', boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#FFD23F', marginBottom: 20 }}>📊 Impact by the Numbers</div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
                {[
                  ['1,000+', 'Pets Rehomed', '#FFD23F'],
                  ['8+', 'Years of Work', '#58CC02'],
                  ['91K+', 'TikTok Followers', '#38BDF8'],
                  ['100%', 'Free Adoption', '#FF6B9D'],
                ].map(([v, l, c]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 14px', border: '2px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
                    <div style={{ color: c, fontWeight: 900, fontSize: isMobile ? 24 : 30, lineHeight: 1, marginBottom: 6 }}>{v}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3 */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', paddingBottom: 12, borderBottom: '3px solid #38BDF8' }}>
                A Cultural Shift in Kathmandu
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Adopt a Dog Nepal changed the framing around street dogs in Kathmandu by telling individual stories — this dog was found injured near Ratnapark, this puppy was abandoned outside a temple in Lalitpur, this senior dog waited three months before finding a home. Each animal had a name, a face, a personality.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                The new generation of Kathmandu pet owners grew up watching these stories. Many adopted their first pet through ADAN. Many now volunteer, foster and share. Adoption became a legitimate — even aspirational — choice for young Nepali families.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8 }}>
                The culture did not shift because of a single campaign or government policy. It shifted because 91,000 people chose, consistently over eight years, to tell a different story about the animals in their city.
              </p>
            </div>

            {/* SECTION 4 */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', paddingBottom: 12, borderBottom: '3px solid #7B5EA7' }}>
                HamroPets — Building the Infrastructure
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                In 2026 Avash launched HamroPets.com — Nepal's first dedicated pet services platform. Leveraging his background in IT system validation, compliance and digital transformation, he built the infrastructure that ADAN's community-driven model had always needed.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Where ADAN operated through decentralized social media and WhatsApp groups, HamroPets provides verified, searchable, Google-indexed infrastructure. Drawing on his academic background in Management Information Systems and his professional experience in financial services compliance, Avash designed a platform where every pet listing is manually reviewed, every dog walker is verified with a Nepal citizenship card, and every adoption is free.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8 }}>
                HamroPets does not replace the community ADAN built. It gives that community a permanent home on the open web — discoverable by anyone searching for pet adoption, dog walking or lost pets in Nepal.
              </p>
            </div>

            {/* SECTION 5 */}
            <div style={{ background: '#FFF9E6', borderRadius: 20, border: '3px solid #FFD23F', padding: isMobile ? '24px 20px' : '36px 40px', boxShadow: '4px 4px 0px #B45309' }}>
              <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px' }}>
                What Changed — and Who Changed It
              </h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Kathmandu still has street dogs. Nepal still has animal welfare challenges. But the conversation has shifted in ways that were not visible eight years ago.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Adoption is now discussed openly in Nepali households. The idea of paying NPR 80,000 for a breed while 1,000 animals wait for homes is being questioned — by young people, publicly, on TikTok.
              </p>
              <p style={{ fontSize: isMobile ? 14 : 16, color: '#374151', lineHeight: 1.8 }}>
                Avash Shrestha built the bridge. The 91,000+ community members walked across it — and kept building on the other side.
              </p>
            </div>

            {/* CREDENTIALS */}
            <div>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 20px', paddingBottom: 12, borderBottom: '2px solid #E5E7EB' }}>
                Background & Credentials
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['🎓', 'MBA — California University, California, USA · Management Information Systems & Knowledge Management'],
                  ['🏦', 'Financial Services — Wells Fargo, Silicon Valley · High-net-worth portfolio management and BSA/AML compliance'],
                  ['🏦', 'Standard Chartered Bank, Kathmandu · Banking operations and digital transformation'],
                  ['💻', 'IT System Validation & Compliance — enterprise digital transformation across fintech and banking'],
                  ['📜', 'FINRA Series 6 & 66 licensed · Pursuing CAMS certification'],
                  ['🐾', 'Founder & Executive Director, Adopt a Dog Nepal — April 2018 to present'],
                  ['🌐', 'Founder, HamroPets.com — Nepal\'s first dedicated pet services platform, 2026'],
                  ['🚀', 'Founder, Swor AI (sworai.com) — Nepal\'s first Nepali AI voice platform'],
                ].map(([emoji, text]) => (
                  <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#F9FAFB', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #E5E7EB' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{emoji}</span>
                    <span style={{ fontSize: isMobile ? 13 : 14, color: '#374151', fontWeight: 500, lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
              <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Explore HamroPets</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>Nepal's first dedicated pet platform — built on 8 years of trust from Adopt a Dog Nepal.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534' }}>Adopt a Pet →</Link>
                <Link href="/about" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>About HamroPets</Link>
              </div>
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
