import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LostFoundPetsNepal() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const faqs = [
    {
      q: 'Where can I report a lost dog in Kathmandu?',
      a: 'Report your lost dog on HamroPets Lost & Found at hamropets.com/lost-found. Upload a clear photo, provide the last known location and landmark, and your contact number. Your report goes live immediately and is visible to the entire HamroPets community across Kathmandu Valley.'
    },
    {
      q: 'What should I do if I find a lost pet in Nepal?',
      a: 'If you find a lost pet in Nepal, secure the animal safely, take a clear photo, and report it on HamroPets at hamropets.com/lost-found. Include the exact location where you found the pet, a description, and your contact details. The owner may already have a lost pet report on the platform.'
    },
    {
      q: 'Is reporting a lost pet on HamroPets free?',
      a: 'Yes. Reporting a lost or found pet on HamroPets is completely free. Optional paid boosts (Social Boost NPR 199 and Emergency Shield NPR 499) are available to reach our 91K+ followers urgently — but your report goes live for free immediately. Payment accepted via eSewa and Khalti at 9851221428.'
    },
    {
      q: 'How do I find my lost dog in Kathmandu?',
      a: 'Report your lost dog immediately on HamroPets, share the listing on your local WhatsApp groups and Facebook community groups, put up physical posters in your neighborhood, check with local vets and shelters, and contact KAT Centre and Sneha\'s Care. Acting within the first 24 hours significantly increases your chances of finding your pet.'
    },
    {
      q: 'Are there any Facebook groups for lost pets in Kathmandu?',
      a: 'Yes, there are several Facebook groups for lost pets in Kathmandu. However, Facebook groups are closed ecosystems that are not searchable on Google. HamroPets Lost & Found is indexed by Google and Bing, meaning your report can be found by anyone searching for lost pets in your area — giving you much wider reach.'
    },
    {
      q: 'What information should I include in a lost pet report?',
      a: 'Include a clear photo, species and breed, last seen date and time, exact location and nearby landmark (e.g. near Bhatbhateni Naxal), collar description, distinctive markings, temperament (friendly or scared of strangers), your phone number and WhatsApp, and whether you are offering a reward.'
    },
    {
      q: 'How can I help find lost pets in my neighborhood in Nepal?',
      a: 'Check HamroPets Lost & Found regularly at hamropets.com/lost-found, share listings on your local WhatsApp and Facebook groups, keep an eye out for described pets in your area, and contact the owner directly if you spot a match. Every share helps reunite a family with their pet.'
    },
    {
      q: 'Who do I contact for injured street dogs in Kathmandu?',
      a: 'For injured street dogs in Kathmandu contact KAT Centre (Kathmandu Animal Treatment Centre), Sneha\'s Care, or Animal Nepal. You can also post on HamroPets Lost & Found to alert the local pet community immediately. The Kathmandu Metropolitan City also runs an animal welfare hotline.'
    },
  ]

  return (
    <>
      <Head>
        <title>Lost & Found Pets Nepal — Report Missing Pets Kathmandu | HamroPets</title>
        <meta name="description" content="Report a lost or found pet in Nepal. Free community service covering Kathmandu, Lalitpur and Bhaktapur. Get your lost pet report seen by 91K+ animal lovers. Presented by Adopt a Dog Nepal since 2018." />
        <meta name="keywords" content="lost dog kathmandu, found pet nepal, missing cat kathmandu, lost pet nepal, harayeko kukur, report lost dog nepal, found dog kathmandu, lost and found pets nepal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Lost & Found Pets Nepal — Report Missing Pets Kathmandu | HamroPets" />
        <meta property="og:description" content="Report a lost or found pet in Nepal for free. Reach 91K+ animal lovers across Kathmandu Valley." />
        <meta property="og:url" content="https://www.hamropets.com/lost-found-pets-nepal" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.hamropets.com/lost-found-pets-nepal" />
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
            <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>Report Lost Pet →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#7B1C1C', padding: isMobile ? '48px 16px' : '72px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span style={{ background: '#FF6B9D', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 20, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>🔍 Lost & Found Pets Nepal</span>
            <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 900, color: '#fff', margin: '0 0 20px', letterSpacing: -1, lineHeight: 1.1 }}>
              Lost a Pet in Nepal?<br />
              <span style={{ color: '#FFD23F' }}>We Can Help Find Them.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.85)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 32px', fontWeight: 500 }}>
              HamroPets Lost & Found is Nepal's only open-web platform for reporting lost and found pets. Unlike Facebook groups, your report is indexed by Google and Bing — meaning anyone searching for lost pets in your area can find it. Free, immediate and community-powered.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>🔴 Report Lost Pet →</Link>
              <Link href="/lost-found" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>🟢 Report Found Pet</Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px 60px' : '64px 28px 80px' }}>

          {/* WHY HAMROPETS */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Why Report on HamroPets Instead of Facebook?</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Facebook groups are closed ecosystems. HamroPets is indexed by Google — giving you far wider reach.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
              {[
                { emoji: '🌐', title: 'Google Indexed', desc: 'Your lost pet report appears in Google search results. Anyone searching "lost dog Kathmandu" can find it.' },
                { emoji: '📢', title: 'Reach 91K+ Followers', desc: 'Optional Social Boost puts your report in front of our 91K TikTok and Instagram community for NPR 199.' },
                { emoji: '🆓', title: 'Free and Immediate', desc: 'Your report goes live immediately for free. No account needed. No waiting for group admin approval.' },
                { emoji: '📍', title: 'Landmark-Based Search', desc: 'Reports are searchable by area and landmark — making it easy for finders in your neighborhood to find your report.' },
                { emoji: '📋', title: 'Structured Reports', desc: 'Include photo, description, collar details, temperament and reward — everything needed to identify your pet.' },
                { emoji: '🛡️', title: 'Emergency Shield', desc: 'For urgent cases — NPR 499 gets you a Swor AI voiceover TikTok video, WhatsApp broadcast and homepage feature.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', padding: '24px', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, fontWeight: 500 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BOOST TIERS */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Find Your Pet Faster with a Boost</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28, fontWeight: 500 }}>Your report is always free. A boost helps you reach more people faster.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
              {[
                { label: '🆓 Free Report', price: 'NPR 0', features: ['Live on HamroPets immediately', 'Google and Bing indexed', 'Shareable link for WhatsApp'], color: '#58CC02' },
                { label: '📢 Social Boost', price: 'NPR 199', features: ['Everything in Free', 'TikTok + Instagram + Facebook post', 'Swor AI Nepali voiceover video', 'Reaches 91K+ followers'], color: '#38BDF8', recommended: true },
                { label: '🛡️ Emergency Shield', price: 'NPR 499', features: ['Everything in Social Boost', 'PDF printable poster', 'WhatsApp broadcast to rescue networks', 'Homepage featured listing'], color: '#FF6B9D' },
              ].map(tier => (
                <div key={tier.label} style={{ borderRadius: 16, padding: '20px', border: `2.5px solid ${tier.color}`, background: `${tier.color}10`, position: 'relative' }}>
                  {tier.recommended && <div style={{ position: 'absolute', top: -12, left: 16, background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 900, padding: '2px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🔥 RECOMMENDED</div>}
                  <div style={{ fontWeight: 900, fontSize: 15, color: '#1A1A1A', marginBottom: 4 }}>{tier.label}</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: tier.color, marginBottom: 16 }}>{tier.price}</div>
                  {tier.features.map(f => (
                    <div key={f} style={{ fontSize: 13, color: '#374151', fontWeight: 500, marginBottom: 6 }}>✓ {f}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
              Payment via eSewa / Khalti: <strong>9851221428</strong> · WhatsApp: <strong>9851405178</strong> · Activated within 2-4 hours
            </div>
          </div>

          {/* TIPS */}
          <div style={{ background: '#FFF9E6', borderRadius: 20, border: '3px solid #FFD23F', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '5px 5px 0px #B45309', marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px' }}>What to Do When Your Pet Goes Missing in Nepal</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Act immediately', 'The first 24 hours are the most critical. Report on HamroPets and start searching your neighborhood right away.'],
                ['Report on HamroPets', 'Go to hamropets.com/lost-found and submit a report with a clear photo, exact location and contact details.'],
                ['Share on WhatsApp', 'Share your HamroPets listing link on your building, neighborhood and community WhatsApp groups immediately.'],
                ['Put up physical posters', 'Print posters and put them up within a 1km radius of where your pet was last seen. Include a photo and your number.'],
                ['Contact local vets', 'Call vet clinics in your area — people often bring found animals to vets first.'],
                ['Contact rescue organizations', 'Reach out to KAT Centre, Sneha\'s Care and Animal Nepal — they may have your pet or know who does.'],
                ['Offer a reward', 'A reward motivates people to look actively. Add the reward amount to your HamroPets report.'],
              ].map(([title, desc], i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: '#FFD23F', color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, flexShrink: 0, border: '2px solid #1A1A1A' }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>Everything about reporting lost and found pets in Nepal</p>
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
          <div style={{ background: '#7B1C1C', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Report Your Lost Pet Now</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>Free, immediate and Google-indexed. Every minute counts.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/lost-found" style={{ background: '#FF6B9D', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A' }}>🔴 Report Lost Pet →</Link>
              <Link href="/lost-found" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>🟢 Report Found Pet</Link>
            </div>
          </div>

          {/* INTERNAL LINKS */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 16 }}>More Services on HamroPets</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                ['🐕 Adopt a Dog Kathmandu', '/adopt-dog-kathmandu'],
                ['🦮 Dog Walking Kathmandu', '/walk-sit'],
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
