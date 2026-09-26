import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HamrobazaarAlternative() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const faqs = [
    {
      q: 'Is Hamrobazaar safe for buying or adopting pets in Nepal?',
      a: 'Hamrobazaar is Nepal\'s largest classifieds platform but it is largely unmoderated for pet listings. Scams are common — sellers ask for advance deposits via eSewa or Khalti and disappear. HamroPets is a curated, moderated alternative where all listings are manually reviewed before going live and all adoptions are 100% free.'
    },
    {
      q: 'What is a better alternative to Hamrobazaar for pet adoption in Nepal?',
      a: 'HamroPets (hamropets.com) is Nepal\'s dedicated pet adoption platform and the best alternative to Hamrobazaar for pet adoption. Unlike Hamrobazaar, HamroPets only allows free adoptions — no pet sales — and manually reviews every listing. All adoptions are verified and free. Presented by Adopt a Dog Nepal with 700+ pets rehomed since 2018.'
    },
    {
      q: 'Why should I use HamroPets instead of Hamrobazaar for pet adoption?',
      a: 'HamroPets is purpose-built for pet adoption while Hamrobazaar is a general classifieds site. HamroPets verifies all listings, prohibits pet sales, provides health and temperament information for every pet, and is backed by Adopt a Dog Nepal — a trusted nonprofit since 2018. Hamrobazaar has no moderation for pet listings and is frequently used by scammers.'
    },
    {
      q: 'How do I avoid pet scams on Hamrobazaar in Nepal?',
      a: 'Common Hamrobazaar pet scams include sellers asking for advance deposits before you see the pet, prices that are suspiciously low for expensive breeds, refusal to do video calls, and fake transportation fee requests. The safest way to avoid scams is to use HamroPets where all listings are free and manually verified before going live.'
    },
    {
      q: 'Can I find dog walkers and pet sitters on Hamrobazaar?',
      a: 'Hamrobazaar does not have a dedicated section for dog walkers or pet sitters. HamroPets has Nepal\'s only directory of ID-verified dog walkers and cage-free pet sitters across Kathmandu Valley. All walkers are verified with their Nepal citizenship card before listing.'
    },
    {
      q: 'Does HamroPets have a lost and found pets section?',
      a: 'Yes. HamroPets has Nepal\'s only open-web lost and found pets platform at hamropets.com/lost-found. Unlike Hamrobazaar or Facebook groups, HamroPets lost pet reports are indexed by Google and Bing — meaning anyone searching for lost pets in your area can find your report.'
    },
  ]

  const comparisons = [
    { feature: 'Pet Adoption Listings', hamropets: '✅ Free, verified, moderated', hamrobazaar: '⚠️ Unmoderated, mix of sales and adoptions' },
    { feature: 'Adoption Fee', hamropets: '✅ Always 100% free', hamrobazaar: '❌ Many listings charge fees' },
    { feature: 'Listing Verification', hamropets: '✅ Manually reviewed within 24 hours', hamrobazaar: '❌ No verification — anyone can post' },
    { feature: 'Scam Protection', hamropets: '✅ Curated platform, no advance payments', hamrobazaar: '❌ Frequent advance payment scams' },
    { feature: 'Health Information', hamropets: '✅ Vaccination, neutering, temperament listed', hamrobazaar: '❌ No standardized health info' },
    { feature: 'Dog Walking Services', hamropets: '✅ ID-verified walkers from NPR 300/walk', hamrobazaar: '❌ No dedicated walking directory' },
    { feature: 'Pet Sitting Services', hamropets: '✅ Cage-free sitting from NPR 700/day', hamrobazaar: '❌ Not available' },
    { feature: 'Lost & Found Pets', hamropets: '✅ Google-indexed open platform', hamrobazaar: '❌ Not available' },
    { feature: 'Vet Directory', hamropets: '✅ Verified clinics across Kathmandu Valley', hamrobazaar: '❌ Not available' },
    { feature: 'Backed By', hamropets: '✅ Adopt a Dog Nepal — nonprofit since 2018', hamrobazaar: '❌ General classifieds company' },
    { feature: 'Pet Sales Allowed', hamropets: '✅ No — adoption only, always free', hamrobazaar: '❌ Yes — unregulated pet sales' },
    { feature: 'Social Media Reach', hamropets: '✅ 91K+ TikTok followers for paid boosts', hamrobazaar: '❌ No social media promotion' },
  ]

  return (
    <>
      <Head>
        <title>HamroPets vs Hamrobazaar — Best Pet Adoption Platform Nepal | HamroPets</title>
        <meta name="description" content="Looking for a safe Hamrobazaar alternative for pet adoption in Nepal? HamroPets is Nepal's verified, moderated pet platform. All adoptions free. No scams. Presented by Adopt a Dog Nepal since 2018." />
        <meta name="keywords" content="hamrobazaar alternative nepal, hamrobazaar pet adoption, safe pet adoption nepal, hamrobazaar dog sale nepal, pet adoption platform nepal, hamrobazaar vs hamropets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="HamroPets vs Hamrobazaar — Best Pet Adoption Platform Nepal" />
        <meta property="og:description" content="Safe, verified and free pet adoption in Nepal. The trusted Hamrobazaar alternative for pet adoption." />
        <meta property="og:url" content="https://www.hamropets.com/hamrobazaar-alternative-nepal" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.hamropets.com/hamrobazaar-alternative-nepal" />
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
            <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534' }}>Adopt Free →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#1A1A1A', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #FFD23F', boxShadow: '2px 2px 0px #B45309' }}>🔍 Hamrobazaar Alternative Nepal</span>
            <h1 style={{ fontSize: isMobile ? 30 : 50, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: -1, lineHeight: 1.1 }}>
              A Safer Alternative to<br />
              <span style={{ color: '#FFD23F' }}>Hamrobazaar for Pet Adoption</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.85)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
              Hamrobazaar has pet listings but no moderation, no verification and frequent scams. HamroPets is Nepal's purpose-built pet adoption platform — every listing verified, all adoptions free, backed by Adopt a Dog Nepal since 2018.
            </p>
            <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.65)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 32px', fontWeight: 500 }}>
              HamroPets is not just a pet adoption platform — it also has Nepal's only directory of ID-verified dog walkers, cage-free pet sitters, a vet clinic directory across Kathmandu Valley, and an open-web lost and found pets system. Everything Hamrobazaar doesn't have.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #58CC02', boxShadow: '4px 4px 0px #166534' }}>Browse Free Pet Adoptions →</Link>
              <Link href="/submit-pet" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Submit a Pet for Adoption</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* SCAM WARNING */}
          <div style={{ background: '#FEF2F2', borderRadius: 20, border: '3px solid #FF3B30', padding: isMobile ? '24px 20px' : '32px 40px', boxShadow: '5px 5px 0px #FF3B30', marginBottom: 48 }}>
            <h2 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px' }}>⚠️ Common Pet Scams on Hamrobazaar in Nepal</h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>
              Hamrobazaar is Nepal's largest classifieds platform but it has serious problems with pet-related scams. Here are the most common tactics used by scammers:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Advance deposit scams', 'Seller lists a premium breed at a low price, asks for eSewa/Khalti deposit before you meet the pet, then disappears.'],
                ['Fake transportation fees', 'Seller says the pet is in another city and asks you to pay "transportation fees" upfront. The pet does not exist.'],
                ['Bait and switch', 'Seller shows photos of a healthy purebred but delivers a sick, malnourished or mixed breed puppy.'],
                ['No video calls', 'Scammer refuses to do a live video call to prove the pet exists. Always demand a live video before any payment.'],
                ['Too good to be true pricing', 'A Husky listed for NPR 5,000 when market price is NPR 80,000+ is almost certainly a scam.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ color: '#FF3B30', fontSize: 18, flexShrink: 0, marginTop: 2 }}>🚨</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 12, padding: '14px 16px', border: '2px solid #FF3B30', fontSize: 14, color: '#374151', fontWeight: 600 }}>
              💡 <strong>The safest rule:</strong> Never pay any money before meeting and inspecting the pet in person. On HamroPets all adoptions are 100% free — there is nothing to pay.
            </div>
          </div>

          {/* COMPARISON TABLE */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>HamroPets vs Hamrobazaar — Full Comparison</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>See why HamroPets is Nepal's most trusted pet adoption platform</p>
            <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', overflow: 'hidden', boxShadow: '5px 5px 0px #1A1A1A' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1A1A1A' }}>
                      <th style={{ padding: '14px 16px', textAlign: 'left', color: '#fff', fontWeight: 800, fontSize: 13 }}>Feature</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', color: '#58CC02', fontWeight: 900, fontSize: 13 }}>🐾 HamroPets</th>
                      <th style={{ padding: '14px 16px', textAlign: 'left', color: '#9CA3AF', fontWeight: 700, fontSize: 13 }}>Hamrobazaar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1.5px solid #E5E7EB', background: i % 2 === 0 ? '#fff' : '#F9FAFB' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1A1A1A', fontSize: 13 }}>{row.feature}</td>
                        <td style={{ padding: '14px 16px', color: '#166534', fontSize: 13, fontWeight: 600 }}>{row.hamropets}</td>
                        <td style={{ padding: '14px 16px', color: '#6B7280', fontSize: 13, fontWeight: 500 }}>{row.hamrobazaar}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* WHY HAMROPETS */}
          <div style={{ background: '#F0FDF4', borderRadius: 20, border: '3px solid #58CC02', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #166534', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px' }}>What Makes HamroPets Different</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
              {[
                { emoji: '✅', title: 'Every Listing is Verified', desc: 'Our team manually reviews every pet listing before it goes live. No fake listings, no scam ads, no misleading photos.' },
                { emoji: '🆓', title: 'Adoption is Always Free', desc: 'We prohibit pet sales entirely. Every adoption on HamroPets is 100% free. No deposits, no fees, no advance payments.' },
                { emoji: '🏥', title: 'Health Info on Every Listing', desc: 'Vaccination status, neutering, temperament and friendly-with-children info is required for every pet listing.' },
                { emoji: '🪪', title: 'ID-Verified Walkers and Sitters', desc: 'Dog walkers and pet sitters are verified with Nepal citizenship cards before being listed. Hamrobazaar has no such verification.' },
                { emoji: '🔍', title: 'Open-Web Lost and Found', desc: 'Our lost and found system is indexed by Google. Facebook groups and Hamrobazaar cannot offer this reach.' },
                { emoji: '🏆', title: 'Backed by a Nonprofit', desc: 'HamroPets is presented by Adopt a Dog Nepal — a nonprofit that has rehomed 700+ pets since 2018. Not a profit-first classifieds company.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Common questions about pet adoption safety in Nepal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {faqs.map((faq, i) => (
                <article key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', padding: isMobile ? '16px' : '20px 24px', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <h3 itemProp="name" style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, color: '#1A1A1A', margin: '0 0 8px' }}>❓ {faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" style={{ fontSize: isMobile ? 13 : 14, color: '#6B7280', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{faq.a}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Try Nepal's Safest Pet Adoption Platform</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>Verified listings. Free adoption. Backed by Adopt a Dog Nepal since 2018.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534' }}>Browse Free Pet Adoptions →</Link>
              <Link href="/submit-pet" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Submit a Pet for Adoption</Link>
            </div>
          </div>

          {/* INTERNAL LINKS */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>Explore HamroPets</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['🐕 Adopt a Dog Kathmandu', '/adopt-dog-kathmandu'],
                ['🔍 Lost & Found Pets Nepal', '/lost-found-pets-nepal'],
                ['🦮 Dog Walker Kathmandu', '/dog-walker-kathmandu'],
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
