import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DogWalkerKathmandu() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const faqs = [
    {
      q: 'How much does a dog walker cost in Kathmandu?',
      a: 'Dog walkers in Kathmandu typically charge NPR 300 to NPR 400 per walk, or NPR 700 per day for full-day sitting. Monthly packages range from NPR 5,000 to NPR 6,500. All walkers on HamroPets are ID-verified with Nepal citizenship cards and have transparent, fixed pricing.'
    },
    {
      q: 'Where can I find a verified dog walker in Kathmandu?',
      a: 'HamroPets has Nepal\'s only directory of ID-verified dog walkers and pet sitters across Kathmandu, Lalitpur and Bhaktapur. All walkers are verified with Nepal citizenship cards. Browse available walkers at hamropets.com/walk-sit and contact them directly.'
    },
    {
      q: 'Are dog walkers in Kathmandu trustworthy?',
      a: 'All dog walkers listed on HamroPets are ID-verified with their Nepal Nagarik Pramaan Patra (citizenship card) before being approved on the platform. This verification process ensures you know exactly who is caring for your pet. We recommend meeting the walker before the first walk.'
    },
    {
      q: 'What areas in Kathmandu do dog walkers cover?',
      a: 'HamroPets dog walkers cover most areas across Kathmandu Valley including Kathmandu, Lalitpur and Bhaktapur. Popular areas include Naxal, Lazimpat, Baluwatar, Jhamsikhel, Kupondole, Patan, Thamel, Baneshwor, Koteshwor and surrounding neighborhoods. Each walker lists their specific service areas.'
    },
    {
      q: 'Can I find a pet sitter in Kathmandu too?',
      a: 'Yes. HamroPets has cage-free pet sitters across Kathmandu who care for your pet in their own home. Pet sitting rates start from NPR 700 per day. All pet sitters are verified and reviewed. Browse available sitters at hamropets.com/walk-sit.'
    },
    {
      q: 'How do I become a dog walker in Kathmandu?',
      a: 'Register as a dog walker on HamroPets at hamropets.com/walk-sit. You need a valid Nepal citizenship card for ID verification, your service areas and pricing, and a profile photo. Once approved by our team your profile goes live and pet owners can contact you directly.'
    },
    {
      q: 'Is cage-free pet sitting available in Kathmandu?',
      a: 'Yes. HamroPets offers cage-free pet sitting across Kathmandu where sitters care for your pet in their own home environment — not in a cage or kennel. This is better for your pet\'s wellbeing and reduces stress. Rates start from NPR 700 per day.'
    },
    {
      q: 'Can I pay for dog walking in Kathmandu with eSewa or Khalti?',
      a: 'Payment arrangements are made directly between you and the dog walker. Most walkers on HamroPets accept cash, eSewa and Khalti. Discuss payment preferences with your walker when booking.'
    },
  ]

  return (
    <>
      <Head>
        <title>Dog Walker Kathmandu — Verified Pet Sitting Nepal | HamroPets</title>
        <meta name="description" content="Find verified dog walkers and pet sitters in Kathmandu from NPR 300 per walk. ID-verified with Nepal citizenship cards. Cage-free pet sitting from NPR 700 per day across Kathmandu Valley." />
        <meta name="keywords" content="dog walker kathmandu, pet sitter kathmandu, dog walking nepal, pet sitting kathmandu, dog walker lalitpur, cage free pet sitting nepal, kukur walk kathmandu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dog Walker Kathmandu — Verified Pet Sitting Nepal | HamroPets" />
        <meta property="og:description" content="Find verified dog walkers in Kathmandu from NPR 300 per walk. ID-verified with Nepal citizenship cards." />
        <meta property="og:url" content="https://www.hamropets.com/dog-walker-kathmandu" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.hamropets.com/dog-walker-kathmandu" />
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
            <Link href="/walk-sit" style={{ background: '#7B5EA7', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>Find a Walker →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#2D1B69', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ background: '#7B5EA7', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🦮 Dog Walker Kathmandu</span>
            <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: -1, lineHeight: 1.1 }}>
              Verified Dog Walkers<br />
              <span style={{ color: '#FFD23F' }}>in Kathmandu from NPR 300</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.85)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 16px', fontWeight: 500 }}>
              HamroPets has Nepal's only directory of ID-verified dog walkers and cage-free pet sitters across Kathmandu Valley. Every walker is verified with their Nepal citizenship card before being listed. Transparent pricing. Direct contact. No middleman fees.
            </p>
            <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.7)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 32px', fontWeight: 500 }}>
              Dog walking in Kathmandu starts from NPR 300 per walk. Cage-free pet sitting starts from NPR 700 per day. Monthly packages available from NPR 5,000. All walkers and sitters serve specific neighborhoods across Kathmandu, Lalitpur and Bhaktapur.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/walk-sit" style={{ background: '#7B5EA7', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>Find a Dog Walker →</Link>
              <Link href="/walk-sit#register" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Register as a Walker</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* PRICING */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Dog Walking Prices in Kathmandu</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Transparent pricing from verified walkers. No hidden fees.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
              {[
                { label: '🦮 Per Walk', price: 'NPR 300–400', desc: 'Single 30-60 minute walk in your neighborhood', features: ['Leash walk only', 'Your area', 'Direct contact'] },
                { label: '🌅 Full Day', price: 'NPR 700', desc: 'Full day care at the sitter\'s home — cage free', features: ['Cage-free environment', 'Multiple walks included', 'Home environment'], recommended: true },
                { label: '📅 Monthly', price: 'NPR 5,000–6,500', desc: 'Regular daily walks throughout the month', features: ['Daily walks', 'Best value', 'Fixed schedule'] },
              ].map(tier => (
                <div key={tier.label} style={{ background: '#fff', borderRadius: 16, border: `2.5px solid ${tier.recommended ? '#7B5EA7' : '#1A1A1A'}`, padding: '24px', boxShadow: `4px 4px 0px ${tier.recommended ? '#7B5EA7' : '#1A1A1A'}`, position: 'relative' }}>
                  {tier.recommended && <div style={{ position: 'absolute', top: -12, left: 16, background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 900, padding: '2px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🔥 MOST POPULAR</div>}
                  <div style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A', marginBottom: 4 }}>{tier.label}</div>
                  <div style={{ fontWeight: 900, fontSize: 26, color: '#7B5EA7', marginBottom: 8 }}>{tier.price}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16, fontWeight: 500 }}>{tier.desc}</div>
                  {tier.features.map(f => (
                    <div key={f} style={{ fontSize: 13, color: '#374151', fontWeight: 600, marginBottom: 6 }}>✓ {f}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* WHY HAMROPETS */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px' }}>Why Choose HamroPets for Dog Walking in Kathmandu?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
              {[
                { emoji: '🪪', title: 'ID Verified Walkers', desc: 'Every walker is verified with their Nepal Nagarik Pramaan Patra before being listed. You know exactly who is caring for your pet.' },
                { emoji: '💰', title: 'Transparent Pricing', desc: 'All prices are listed upfront. No surprise fees. Rates start from NPR 300 per walk and NPR 700 per day.' },
                { emoji: '📱', title: 'Direct Contact', desc: 'Contact walkers directly via phone or WhatsApp. No middleman, no booking fees, no commission.' },
                { emoji: '🏠', title: 'Cage-Free Sitting', desc: 'Our pet sitters care for animals in their home environment — not in cages or kennels. Better for your pet\'s wellbeing.' },
                { emoji: '📍', title: 'Neighborhood Specific', desc: 'Each walker serves specific areas of Kathmandu Valley. Find someone in your exact neighborhood.' },
                { emoji: '⭐', title: 'Presented by Adopt a Dog Nepal', desc: 'HamroPets is backed by Adopt a Dog Nepal — a trusted animal welfare nonprofit since 2018 with 700+ rehomed pets.' },
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

          {/* AREAS */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Areas Covered by Dog Walkers in Kathmandu</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24, fontWeight: 500 }}>HamroPets walkers cover most neighborhoods across Kathmandu Valley</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Naxal', 'Lazimpat', 'Baluwatar', 'Jhamsikhel', 'Kupondole', 'Patan', 'Thamel', 'Baneshwor', 'Koteshwor', 'Bhaisepati', 'Sanepa', 'Jawalakhel', 'Maharajgunj', 'Bouddha', 'Kapan', 'Tokha', 'Sitapaila', 'Bhaktapur', 'Thaiba', 'Imadol'].map(area => (
                <span key={area} style={{ background: '#fff', color: '#1A1A1A', padding: '8px 16px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: 13, fontWeight: 700, boxShadow: '2px 2px 0px #1A1A1A' }}>📍 {area}</span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Everything about dog walking and pet sitting in Kathmandu</p>
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
          <div style={{ background: '#2D1B69', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Find a Dog Walker in Kathmandu Today</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>ID-verified walkers and cage-free sitters across Kathmandu Valley. From NPR 300 per walk.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/walk-sit" style={{ background: '#7B5EA7', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>Browse Dog Walkers →</Link>
              <Link href="/walk-sit" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Register as a Walker</Link>
            </div>
          </div>

          {/* INTERNAL LINKS */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>More Services on HamroPets</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['🐕 Adopt a Dog Kathmandu', '/adopt-dog-kathmandu'],
                ['🔍 Lost & Found Pets Nepal', '/lost-found-pets-nepal'],
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
