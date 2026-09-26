import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdoptDogKathmandu() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const faqs = [
    {
      q: 'Where can I adopt a dog in Kathmandu for free?',
      a: 'HamroPets is Nepal\'s first dedicated pet adoption platform where all adoptions are 100% free. Browse verified dog and cat listings from Kathmandu, Lalitpur and Bhaktapur at hamropets.com/adopt. Presented by Adopt a Dog Nepal — a nonprofit that has rehomed 700+ pets since 2018.'
    },
    {
      q: 'How do I adopt a dog in Nepal?',
      a: 'Visit hamropets.com/adopt to browse available pets. Find a pet you love, contact the owner directly via phone or WhatsApp, arrange a meeting to ensure the pet is a good fit for your family, and complete the adoption — all for free. HamroPets reviews all listings before they go live to ensure they are genuine.'
    },
    {
      q: 'What dogs are available for adoption in Kathmandu?',
      a: 'HamroPets regularly has dogs of all breeds available for adoption including Labrador Retrievers, German Shepherds, Huskies, Pomeranians, Shih Tzus, Golden Retrievers and mixed breed dogs. All pets are listed by verified owners across Kathmandu Valley.'
    },
    {
      q: 'Is pet adoption free in Nepal?',
      a: 'Yes. All pet adoptions on HamroPets are 100% free — always. You should never pay money to adopt a pet. If anyone asks you to pay for adopting a pet through HamroPets, please report it to us immediately at 9851405178.'
    },
    {
      q: 'Can I adopt a cat in Kathmandu too?',
      a: 'Yes. HamroPets has both dogs and cats available for adoption across Kathmandu Valley. Visit hamropets.com/adopt and filter by species to find cats, kittens, dogs and puppies available near you.'
    },
    {
      q: 'How long does pet adoption take in Nepal?',
      a: 'Once you find a pet on HamroPets, the process is quick. Contact the owner, arrange a meeting, and if it is a good match the adoption can be completed the same day. HamroPets reviews new listings within 24 hours of submission.'
    },
    {
      q: 'What should I check before adopting a dog in Nepal?',
      a: 'Before adopting a dog in Nepal check the vaccination status, whether the dog is neutered or spayed, its temperament with children and other pets, and whether it suits your living situation. HamroPets listings include all this information to help you make the right choice.'
    },
    {
      q: 'Can I adopt a puppy in Kathmandu?',
      a: 'Yes. HamroPets regularly has puppies available for adoption in Kathmandu. All puppy adoptions are free. Browse available puppies at hamropets.com/adopt. We recommend adopting rescued puppies rather than buying from breeders to help reduce Nepal\'s street dog population.'
    },
  ]

  return (
    <>
      <Head>
        <title>Adopt a Dog in Kathmandu — Free Pet Adoption Nepal | HamroPets</title>
        <meta name="description" content="Adopt a dog or cat in Kathmandu for free. Browse verified pet adoption listings across Kathmandu, Lalitpur and Bhaktapur. 700+ pets rehomed since 2018 by Adopt a Dog Nepal." />
        <meta name="keywords" content="adopt a dog kathmandu, dog adoption nepal, free pet adoption kathmandu, adopt cat nepal, kukur adopt garne, pet adoption kathmandu valley, adopt dog lalitpur" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Adopt a Dog in Kathmandu — Free Pet Adoption Nepal | HamroPets" />
        <meta property="og:description" content="Adopt a dog or cat in Kathmandu for free. 700+ pets rehomed since 2018 by Adopt a Dog Nepal." />
        <meta property="og:url" content="https://www.hamropets.com/adopt-dog-kathmandu" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.hamropets.com/adopt-dog-kathmandu" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
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
            <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534' }}>Adopt Now →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#1A3320', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🐕 Free Pet Adoption in Nepal</span>
            <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: -1, lineHeight: 1.1 }}>
              Adopt a Dog in Kathmandu<br />
              <span style={{ color: '#FFD23F' }}>100% Free. Always.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.85)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 32px', fontWeight: 500 }}>
              HamroPets is Nepal's first dedicated pet adoption platform. Browse verified dogs, cats and puppies available for free adoption across Kathmandu, Lalitpur and Bhaktapur. Presented by Adopt a Dog Nepal — rehoming pets across Nepal since April 2018.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534' }}>Browse Pets for Adoption →</Link>
              <Link href="/submit-pet" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Submit a Pet for Adoption</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* ABOUT SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 40, marginBottom: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', letterSpacing: -0.5 }}>Pet Adoption in Kathmandu — How It Works</h2>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
                Adopting a pet in Kathmandu has never been easier. HamroPets connects pet owners who need to rehome their animals with loving families across the Kathmandu Valley. Every listing is reviewed and approved by our team before going live — so you can trust what you see.
              </p>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
                Unlike Hamrobazaar or Facebook groups where scams are common, HamroPets is a curated, moderated platform. All adoptions are 100% free. We never allow pet sales. Every owner submitting a pet must provide accurate health and temperament information.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['1', 'Browse verified pets', 'Filter by species, breed and location across Kathmandu Valley'],
                  ['2', 'Contact the owner', 'Call or WhatsApp the owner directly from the listing'],
                  ['3', 'Meet the pet', 'Arrange a meeting to ensure it is a good fit for your family'],
                  ['4', 'Complete adoption', 'Take your new family member home — for free'],
                ].map(([n, title, desc]) => (
                  <div key={n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 999, background: '#58CC02', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0, border: '2px solid #1A1A1A' }}>{n}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A', marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { emoji: '🐕', title: 'Dogs & Puppies', desc: 'Labradors, Huskies, German Shepherds, Pomeranians, mixed breeds and more' },
                { emoji: '🐈', title: 'Cats & Kittens', desc: 'Persian cats, domestic shorthairs, rescued kittens across Kathmandu' },
                { emoji: '✅', title: 'All Listings Verified', desc: 'Every pet listing is reviewed by our team within 24 hours before going live' },
                { emoji: '💰', title: '100% Free Always', desc: 'No fees, no deposits, no charges. Adoption on HamroPets is always free' },
                { emoji: '📍', title: 'Kathmandu Valley Wide', desc: 'Pets available across Kathmandu, Lalitpur, Bhaktapur and surrounding areas' },
                { emoji: '🏥', title: 'Health Info Included', desc: 'Vaccination status, neutering and temperament listed for every pet' },
              ].map(item => (
                <div key={item.title} style={{ background: '#fff', borderRadius: 14, border: '2px solid #1A1A1A', padding: '16px 20px', boxShadow: '3px 3px 0px #1A1A1A', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div style={{ background: '#FFD23F', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '28px 20px' : '40px 48px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px' }}>Why Adopt from HamroPets?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
              {[
                ['700+', 'Pets Successfully Rehomed'],
                ['100%', 'Free — No Hidden Fees'],
                ['24hr', 'Listing Review Time'],
                ['91K+', 'Community Followers'],
              ].map(([v, l]) => (
                <div key={l} style={{ background: '#fff', borderRadius: 14, border: '2px solid #1A1A1A', padding: '16px', textAlign: 'center', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 22 : 28, color: '#1A1A1A', lineHeight: 1, marginBottom: 6 }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Everything you need to know about adopting a dog or cat in Kathmandu</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {faqs.map((faq, i) => (
                <article key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', padding: isMobile ? '16px' : '20px 24px', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <h3 itemProp="name" style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, color: '#1A1A1A', marginBottom: 8, margin: '0 0 8px' }}>❓ {faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" style={{ fontSize: isMobile ? 13 : 14, color: '#6B7280', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{faq.a}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Ready to Adopt a Pet in Kathmandu?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>Browse verified pet listings — free forever. Presented by Adopt a Dog Nepal since 2018.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534' }}>Browse All Pets →</Link>
              <Link href="/submit-pet" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Submit a Pet for Adoption</Link>
            </div>
          </div>

          {/* INTERNAL LINKS */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>More Services on HamroPets</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['🦮 Dog Walking Kathmandu', '/walk-sit'],
                ['🔍 Lost & Found Pets Nepal', '/lost-found'],
                ['🏥 Vet Clinics Kathmandu', '/vets'],
                ['🐾 About HamroPets', '/about'],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ background: '#fff', color: '#1A1A1A', padding: '10px 16px', borderRadius: 10, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '2px 2px 0px #1A1A1A' }}>{label}</Link>
              ))}
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
