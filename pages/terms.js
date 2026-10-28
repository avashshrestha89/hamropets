import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Terms() {
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
        <title>Terms of Service — HamroPets</title>
        <meta name="description" content="HamroPets terms of service. Rules and guidelines for using Nepal's first dedicated pet platform for adoption, walking, sitting and vet services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <link rel="canonical" href="https://www.hamropets.com/terms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, sans-serif' }}>
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

        <div style={{ maxWidth: 780, margin: '0 auto', padding: isMobile ? '32px 16px 60px' : '56px 28px 80px' }}>
          <div style={{ marginBottom: 40 }}>
            <span style={{ background: '#E8F9ED', color: '#166534', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>📄 Legal</span>
            <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Terms of Service</h1>
            <p style={{ color: '#6B7280', fontSize: 14, fontWeight: 500 }}>Last updated: September 25, 2026 · Effective immediately</p>
          </div>

          {[
            {
              title: '1. Acceptance of Terms',
              content: `By using HamroPets (hamropets.com) you agree to these Terms of Service. If you do not agree, please do not use the platform. HamroPets is presented by Adopt a Dog Nepal, a nonprofit organization operating since 2018. These terms apply to all users including pet owners, adopters, walkers, sitters and visitors.`
            },
            {
              title: '2. What HamroPets Is',
              content: `HamroPets is an online platform that connects:\n\n• Pet owners looking to rehome pets with potential adopters\n• Dog walkers and pet sitters with pet owners\n• Pet owners with veterinary clinics and pet services\n• Communities reporting lost and found pets\n\nHamroPets is a marketplace and does not directly own, house or transport any animals. We are not responsible for the outcome of any adoption, service arrangement or lost/found report.`
            },
            {
              title: '3. Pet Adoption Rules',
              content: `All pet adoptions on HamroPets must be:\n\n• 100% FREE. You may not charge any fee for adopting a pet through this platform.\n• Honest. All information about the pet including health, temperament and history must be accurate.\n• Ethical. Pets must be rehomed to suitable, caring homes. We reserve the right to remove any listing that appears to facilitate animal cruelty or exploitation.\n\nHamroPets reviews all pet listings before they go live. Approval typically takes 24 hours. We may reject any listing without explanation.`
            },
            {
              title: '4. Walker and Sitter Registration',
              content: `To register as a dog walker or pet sitter on HamroPets you must:\n\n• Provide a valid Nepal citizenship card (Nagarik Pramaan Patra) for identity verification\n• Provide accurate information about your services, availability and service areas\n• Be at least 18 years of age\n• Agree to treat all animals in your care with kindness and responsibility\n\nHamroPets verifies identity documents but does not conduct criminal background checks. Users should exercise their own judgment when hiring walkers and sitters.`
            },
            {
              title: '5. Paid Services',
              content: `HamroPets offers optional paid packages including Social Boost (NPR 299) and Priority Shield (NPR 599) for pet adoption listings, and similar packages for lost pet reports.\n\nPayments are accepted via eSewa (9851405178) and Khalti. Paid packages are activated manually after payment confirmation via WhatsApp (9851405178).\n\nRefunds are available if your package has not yet been activated. Once activated, refunds are not available. Contact us within 24 hours of payment if you have concerns.`
            },
            {
              title: '6. Lost and Found Pets',
              content: `Lost and found pet reports are posted as a free community service. HamroPets does not guarantee that lost pets will be found or returned. We are not responsible for the actions of anyone who responds to a lost/found report.\n\nAlways meet in a public place when reuniting or handing over a found pet. Never pay anyone to return a found pet — this is a scam.`
            },
            {
              title: '7. Prohibited Conduct',
              content: `You may not use HamroPets to:\n\n• Sell or buy pets (all adoptions must be free)\n• Post fraudulent, misleading or inaccurate listings\n• Harass, spam or threaten other users\n• Collect personal information from other users beyond what is needed to complete a transaction\n• Facilitate animal cruelty, neglect or exploitation\n• Operate commercial breeding operations\n• Violate any laws of Nepal\n\nViolations may result in immediate removal of your listings and permanent ban from the platform.`
            },
            {
              title: '8. Intellectual Property',
              content: `All content on HamroPets including the platform design, logo, text and features is owned by HamroPets and Adopt a Dog Nepal. You may not copy, reproduce or redistribute any part of the platform without written permission.\n\nBy submitting photos or content to HamroPets you grant us a non-exclusive license to display that content on the platform and our social media channels (TikTok, Instagram, Facebook) for the purpose of promoting pet adoption.`
            },
            {
              title: '9. Limitation of Liability',
              content: `HamroPets is provided "as is" without warranties of any kind. We are not liable for:\n\n• The health, temperament or suitability of any pet listed on the platform\n• The conduct or reliability of walkers, sitters or adopters\n• Any loss, injury or damage resulting from use of the platform\n• Technical outages or data loss\n\nOur total liability to any user shall not exceed NPR 5,000.`
            },
            {
              title: '10. Governing Law',
              content: `These terms are governed by the laws of Nepal. Any disputes shall be resolved in the courts of Kathmandu Metropolitan City, Nepal.`
            },
            {
              title: '11. Contact Us',
              content: `For questions about these terms:\n\nEmail: adoptadognepal@gmail.com\nWhatsApp: 9851405178\nPlatform: hamropets.com\nPresented by Adopt a Dog Nepal — Kathmandu, Nepal`
            },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 900, color: '#1A1A1A', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #E5E7EB' }}>{section.title}</h2>
              <p style={{ fontSize: isMobile ? 14 : 15, color: '#374151', lineHeight: 1.8, fontWeight: 400, whiteSpace: 'pre-line', margin: 0 }}>{section.content}</p>
            </div>
          ))}
        </div>

        <footer style={{ background: '#FFFFFF', borderTop: '3px solid #1A1A1A', padding: isMobile ? '24px 16px' : '32px 28px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13 }}>© 2026 HamroPets · Presented by Adopt a Dog Nepal</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="/privacy-policy" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
