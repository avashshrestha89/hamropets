import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function BoostTiers() {
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
        <title>HamroPets Boost Tiers — Free vs Social Boost vs Priority Shield</title>
        <meta name="description" content="See exactly what you get with each HamroPets tier. Free Web Listing, Social Boost (NPR 199) and Priority Shield (NPR 599) — compared side by side." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <link rel="canonical" href="https://www.hamropets.com/boost-tiers" />
        <link rel="icon" href="/favicon.ico" />
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
            <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534' }}>Adopt a Pet →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#1A3320', padding: isMobile ? '40px 16px' : '64px 28px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ background: '#FFD23F', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A' }}>📊 Tier Comparison</span>
            <h1 style={{ fontSize: isMobile ? 28 : 44, fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: -1, lineHeight: 1.1 }}>
              What Does Each Tier Actually Do?
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 17, color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 500, lineHeight: 1.7 }}>
              See exactly what happens after you submit your pet or lost pet report — and why some listings get 20X more responses.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '32px 16px 60px' : '56px 28px 80px' }}>

          {/* TIER 1 — FREE */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', overflow: 'hidden', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 32 }}>
            <div style={{ background: '#F9FAFB', padding: isMobile ? '20px 16px' : '24px 32px', borderBottom: '2px solid #1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: '#1A1A1A' }}>🐾 Free Web Listing</div>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginTop: 4 }}>निःशुल्क वेब लिस्टिङ</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 24, color: '#58CC02' }}>NPR 0</div>
            </div>
            <div style={{ padding: isMobile ? '20px 16px' : '28px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  ['✅', 'Your listing goes live on HamroPets.com immediately'],
                  ['✅', 'Shareable link you can post in WhatsApp groups and Facebook'],
                  ['✅', 'Visible to anyone searching hamropets.com/adopt or /lost-found'],
                  ['✅', 'Indexed by Google — can appear in search results over time'],
                  ['❌', 'No social media posts by HamroPets team'],
                  ['❌', 'No TikTok or Instagram reach'],
                  ['❌', 'No voiceover video'],
                  ['❌', 'No featured placement on homepage'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                    <span style={{ fontSize: isMobile ? 13 : 14, color: icon === '❌' ? '#9CA3AF' : '#374151', fontWeight: icon === '❌' ? 400 : 600 }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F9FAFB', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #E5E7EB', fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
                💡 Best for: People who are active on social media themselves and plan to share their listing manually across local WhatsApp and Facebook groups.
              </div>
            </div>
          </div>

          {/* TIER 2 — SOCIAL BOOST */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #38BDF8', overflow: 'hidden', boxShadow: '5px 5px 0px #38BDF8', marginBottom: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: 20, background: '#FF6B35', color: '#fff', fontSize: 11, fontWeight: 900, padding: '4px 14px', borderRadius: '0 0 10px 10px', border: '1.5px solid #1A1A1A' }}>🔥 MOST POPULAR</div>
            <div style={{ background: '#EFF9FF', padding: isMobile ? '20px 16px' : '24px 32px', borderBottom: '2px solid #38BDF8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: '#1A1A1A' }}>📢 Social Boost</div>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginTop: 4 }}>सोसल बुस्ट — One-time payment</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 24, color: '#38BDF8' }}>NPR 199</div>
            </div>
            <div style={{ padding: isMobile ? '20px 16px' : '28px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  ['✅', 'Everything in Free Web Listing'],
                  ['✅', 'Posted to HamroPets TikTok, Instagram and Facebook — reaches 91K+ pet lovers'],
                  ['✅', 'Custom Swor AI Nepali voiceover video created for your pet'],
                  ['✅', 'High-priority feed and story placement'],
                  ['✅', 'Activated within 2-4 hours of payment confirmation'],
                  ['✅', 'Our team handles the post — you do nothing'],
                  ['❌', 'No homepage featured placement'],
                  ['❌', 'No WhatsApp broadcast to rescue networks'],
                  ['❌', 'No dedicated missing-pet flyer'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                    <span style={{ fontSize: isMobile ? 13 : 14, color: icon === '❌' ? '#9CA3AF' : '#374151', fontWeight: icon === '❌' ? 400 : 600 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* MOCK TIKTOK POST */}
              <div style={{ background: '#000', borderRadius: 16, padding: '16px', marginBottom: 16, border: '2px solid #1A1A1A' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#aaa', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Example TikTok Post</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: '#FFD23F', border: '2px solid #fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🐾</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: '#fff', marginBottom: 4 }}>@hamropets</div>
                    <div style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6 }}>
                      🐕 Buddy लाई नयाँ घर चाहिएको छ! 1 वर्षको Golden Retriever — खोप लगाइएको, बच्चाहरूसँग मिल्ने। एडप्सन निःशुल्क!<br />
                      <span style={{ color: '#38BDF8' }}>#HamroPets #DogAdoptionNepal #KathmanduDogs</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10, background: '#1A1A1A', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#9CA3AF' }}>
                  🎙️ Swor AI Nepali voiceover · 📍 Kathmandu · ❤️ 2.4K likes · 💬 89 comments
                </div>
              </div>

              <div style={{ background: '#EFF9FF', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #38BDF8', fontSize: 13, color: '#1D4ED8', fontWeight: 500 }}>
                💡 Best for: Pet owners who want maximum community reach without doing the social media work themselves. Most listings with Social Boost receive 3-5X more inquiries within 48 hours.
              </div>
            </div>
          </div>

          {/* TIER 3 — PRIORITY SHIELD */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #FFD23F', overflow: 'hidden', boxShadow: '5px 5px 0px #B45309', marginBottom: 48, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, right: 20, background: '#1A3320', color: '#FFD23F', fontSize: 11, fontWeight: 900, padding: '4px 14px', borderRadius: '0 0 10px 10px', border: '1.5px solid #1A1A1A' }}>⭐ PREMIUM</div>
            <div style={{ background: '#1A3320', padding: isMobile ? '20px 16px' : '24px 32px', borderBottom: '2px solid #FFD23F', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 18 : 22, color: '#FFD23F' }}>🛡️ Priority Shield</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: 4 }}>प्रायोरिटी शिल्ड — One-time payment</div>
              </div>
              <div style={{ fontWeight: 900, fontSize: 24, color: '#FFD23F' }}>NPR 599</div>
            </div>
            <div style={{ padding: isMobile ? '20px 16px' : '28px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  ['✅', 'Everything in Social Boost'],
                  ['✅', 'Your phone number is completely hidden — privacy protected'],
                  ['✅', 'Interested adopters submit a screening application instead of calling you directly'],
                  ['✅', 'HamroPets team reviews all applications and sends you only the top 3-5 candidates'],
                  ['✅', 'Super Urgent featured banner on HamroPets homepage'],
                  ['✅', 'Dedicated digital flyer created by our design team'],
                  ['✅', 'WhatsApp broadcast to verified local rescue and volunteer networks'],
                  ['✅', 'Maximum visibility — we handle everything for you'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                    <span style={{ fontSize: isMobile ? 13 : 14, color: '#374151', fontWeight: 600 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* MOCK SHIELD LISTING */}
              <div style={{ background: '#1A3320', borderRadius: 16, padding: '16px', marginBottom: 16, border: '2px solid #1A1A1A' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#FFD23F', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>How Your Listing Looks</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ background: '#FFD23F', color: '#1A1A1A', fontSize: 11, fontWeight: 900, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🛡️ PRIORITY SHIELD</span>
                  <span style={{ background: '#FF3B30', color: '#fff', fontSize: 11, fontWeight: 900, padding: '3px 10px', borderRadius: 999 }}>🚨 SUPER URGENT</span>
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: 12 }}>
                  To ensure your pet finds the safest forever home, the owner is personally reviewing each application. Apply in 2 minutes — we will share your profile directly with the owner.
                </div>
                <div style={{ background: '#FFD23F', color: '#1A1A1A', padding: '12px', borderRadius: 10, textAlign: 'center', fontWeight: 900, fontSize: 14, border: '2px solid #1A1A1A' }}>
                  🐾 Apply to Adopt →
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                  🔒 Owner's contact is private. Applications reviewed by HamroPets before forwarding.
                </div>
              </div>

              {/* MOCK ADMIN VIEW */}
              <div style={{ background: '#F9FAFB', borderRadius: 16, padding: '16px', marginBottom: 16, border: '2px solid #E5E7EB' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>What You Receive from HamroPets</div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
                  नमस्ते [Owner] जी! 🐾 तपाईंको कुकुरको लागि राम्रा एप्लिकेसनहरु आएका छन्।<br /><br />
                  <strong>👤 Candidate 1:</strong> Ram Sharma, 28 · Owns house with compound · Lalitpur<br />
                  ⭐ Previous dog owner, family fully supportive, clear Dashain plan<br /><br />
                  <strong>👤 Candidate 2:</strong> Priya Thapa, 32 · Nuclear family · Baneshwor<br />
                  ⭐ Works from home, vaccinated pets before, NPR budget confirmed<br /><br />
                  <span style={{ color: '#58CC02', fontWeight: 700 }}>कुन-कुन व्यक्तिसँग कुरा गर्न चाहनुहुन्छ भन्नुहोला — म नम्बर दिनेछु। 🙏</span>
                </div>
              </div>

              <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #FFD23F', fontSize: 13, color: '#92400E', fontWeight: 500 }}>
                💡 Best for: Pet owners who want complete privacy, zero spam calls, and only speak with pre-screened serious adopters. You receive a curated shortlist — not 50 random callers.
              </div>
            </div>
          </div>

          {/* COMPARISON TABLE */}
          <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', overflow: 'hidden', boxShadow: '5px 5px 0px #1A1A1A', marginBottom: 48 }}>
            <div style={{ background: '#1A1A1A', padding: '16px 24px' }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>Quick Comparison</div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>Feature</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#58CC02', textTransform: 'uppercase' }}>Free</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>Social Boost</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>Priority Shield</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Listed on HamroPets', '✅', '✅', '✅'],
                    ['Google indexed', '✅', '✅', '✅'],
                    ['TikTok + Instagram post', '❌', '✅', '✅'],
                    ['Nepali voiceover video', '❌', '✅', '✅'],
                    ['91K+ reach', '❌', '✅', '✅'],
                    ['Homepage featured', '❌', '❌', '✅'],
                    ['Phone number hidden', '❌', '❌', '✅'],
                    ['Adopter screening', '❌', '❌', '✅'],
                    ['WhatsApp broadcast', '❌', '❌', '✅'],
                    ['Digital flyer', '❌', '❌', '✅'],
                    ['Price', 'NPR 0', 'NPR 199', 'NPR 599'],
                  ].map(([feature, free, boost, shield], i) => (
                    <tr key={feature} style={{ borderBottom: '1.5px solid #E5E7EB', background: i % 2 === 0 ? '#fff' : '#F9FAFB' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#374151' }}>{feature}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13 }}>{free}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13 }}>{boost}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 13, fontWeight: feature === 'Price' ? 900 : 400, color: feature === 'Price' ? '#B45309' : 'inherit' }}>{shield}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: '#1A3320', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '32px 20px' : '48px', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Ready to Find Your Pet a Home?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px', fontWeight: 500 }}>Start free or go premium. Every listing helps Nepal's animals find loving homes.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '4px 4px 0px #166534' }}>Submit a Pet →</Link>
              <Link href="/lost-found" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2.5px solid rgba(255,255,255,0.3)' }}>Report Lost Pet</Link>
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
