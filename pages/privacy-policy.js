import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PrivacyPolicy() {
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
        <title>Privacy Policy — HamroPets</title>
        <meta name="description" content="HamroPets privacy policy. Learn how we collect, use and protect your personal information on Nepal's first dedicated pet platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <link rel="canonical" href="https://www.hamropets.com/privacy-policy" />
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
            <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Privacy Policy</h1>
            <p style={{ color: '#6B7280', fontSize: 14, fontWeight: 500 }}>Last updated: September 25, 2026 · Effective immediately</p>
          </div>

          {[
            {
              title: '1. Who We Are',
              content: `HamroPets (hamropets.com) is Nepal's first dedicated pet platform, presented by Adopt a Dog Nepal — a nonprofit organization registered in Nepal and operating since April 2018. Our registered contact email is adoptadognepal@gmail.com. HamroPets serves pet owners, adopters, dog walkers, pet sitters and veterinary clinics across the Kathmandu Valley and Nepal.`
            },
            {
              title: '2. Information We Collect',
              content: `When you use HamroPets we may collect the following information:\n\n• Name, phone number, WhatsApp number and email address when you submit a pet for adoption, register as a walker or sitter, or report a lost/found pet.\n• Pet details including species, breed, age, photos and health information.\n• Location information including your area, district and city.\n• Device and browser information for analytics purposes.\n• Payment reference information (we do not store card numbers or eSewa/Khalti account credentials).`
            },
            {
              title: '3. How We Use Your Information',
              content: `We use your information to:\n\n• Display pet adoption listings and lost/found reports on HamroPets.com\n• Connect pet owners with potential adopters\n• Verify walker and sitter registrations\n• Send email notifications about your listing status\n• Improve the platform and fix technical issues\n• Comply with legal obligations in Nepal\n\nWe do not sell your personal information to third parties.`
            },
            {
              title: '4. Information We Share',
              content: `Your contact details (name and phone number) are visible to other users on the platform when you submit a pet listing or lost/found report. This is necessary for the platform to function — adopters and finders need to contact you directly.\n\nWe use the following third-party services:\n• Supabase (database and file storage)\n• Vercel (website hosting)\n• Resend (email notifications)\n• eSewa and Khalti (payment processing — we only receive confirmation of payment, not your payment credentials)`
            },
            {
              title: '5. Data Storage and Security',
              content: `Your data is stored on Supabase servers. We take reasonable steps to protect your information but no internet transmission is 100% secure. Pet listing photos are stored in Supabase Storage. We retain your data for as long as your listing is active. You may request deletion of your data at any time by contacting us.`
            },
            {
              title: '6. Cookies',
              content: `HamroPets uses minimal cookies necessary for the website to function. We use Vercel Analytics to understand how users interact with the platform. We do not use advertising cookies or tracking pixels. You can disable cookies in your browser settings but some features may not work correctly.`
            },
            {
              title: '7. Children\'s Privacy',
              content: `HamroPets is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has submitted information to our platform please contact us immediately.`
            },
            {
              title: '8. Your Rights',
              content: `You have the right to:\n\n• Access the personal information we hold about you\n• Request correction of inaccurate information\n• Request deletion of your information\n• Withdraw consent at any time\n\nTo exercise these rights contact us at adoptadognepal@gmail.com`
            },
            {
              title: '9. Changes to This Policy',
              content: `We may update this privacy policy from time to time. We will notify users of significant changes by posting a notice on the website. Continued use of HamroPets after changes constitutes acceptance of the updated policy.`
            },
            {
              title: '10. Contact Us',
              content: `For privacy-related questions or requests:\n\nEmail: adoptadognepal@gmail.com\nWhatsApp: 9851405178\nPlatform: hamropets.com\nPresented by Adopt a Dog Nepal — Kathmandu, Nepal`
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
