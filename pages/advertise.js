import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Advertise() {
  const [isMobile, setIsMobile] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', budget: 'Starter — NPR 15,000/mo', message: '' })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.email) { alert('Please fill in your name and email.'); return }
    setSubmitted(true)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff', fontWeight: 500 }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
      <Head>
        <title>Advertise — HamroPets</title>
        <meta name="description" content="Reach Nepal's most engaged pet-loving community. Advertise on HamroPets." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden', maxWidth: '100vw' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 22, border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', flexShrink: 0 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 2 }}>
                {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#1A1A1A', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            )}
            <Link href="/" style={{ background: '#fff', color: '#1A1A1A', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: 12, fontSize: isMobile ? 12 : 13, fontWeight: 800, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A', whiteSpace: 'nowrap' }}>← Home</Link>
          </div>
        </nav>

        {/* MOBILE NAV */}
        {isMobile && (
          <div style={{ background: '#FFFFFF', borderBottom: '2px solid #1A1A1A', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#1A1A1A', textDecoration: 'none', background: '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        {/* HERO */}
        <div style={{ background: '#FFD23F', padding: isMobile ? '40px 16px' : '64px 28px', borderBottom: '3px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <span style={{ background: '#fff', color: '#1A1A1A', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>💰 Advertising</span>
            <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px', letterSpacing: -1.5, lineHeight: 1.05 }}>
              Reach Nepal's<br />
              <span style={{ background: '#FF6B35', color: '#fff', padding: '2px 16px', borderRadius: 12, border: '2.5px solid #1A1A1A', display: 'inline-block', boxShadow: '3px 3px 0px #1A1A1A' }}>Pet Lovers</span>
            </h1>
            <p style={{ color: '#1A1A1A', fontSize: isMobile ? 15 : 18, maxWidth: 560, lineHeight: 1.65, fontWeight: 600, marginBottom: 0 }}>
              Nepal's most engaged pet community — including Gulf diaspora audiences. Premium ad inventory, real results.
            </p>
            <div style={{ display: 'flex', gap: isMobile ? 12 : 32, marginTop: 28, flexWrap: 'wrap' }}>
              {[['10K+', 'Monthly Visitors'], ['700+', 'Pets Rehomed'], ['Nepal + Gulf', 'Audience Reach']].map(([v, l]) => (
                <div key={l} style={{ background: '#fff', borderRadius: 14, padding: isMobile ? '10px 14px' : '14px 20px', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                  <div style={{ color: '#FF6B35', fontWeight: 900, fontSize: isMobile ? 18 : 24, lineHeight: 1 }}>{v}</div>
                  <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 12, marginTop: 3, fontWeight: 700 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '36px 16px' : '64px 28px' }}>

          {/* WHO SHOULD ADVERTISE */}
          <div style={{ marginBottom: isMobile ? 48 : 64 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #166534' }}>🎯 Perfect For</span>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px', letterSpacing: -0.5 }}>Who Advertises on HamroPets?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
              {[
                { icon: '🐾', label: 'Pet Food Brands', desc: 'Drools, Royal Canin, Pedigree distributors targeting Nepal pet owners', color: '#FF6B35' },
                { icon: '🏥', label: 'Vet Clinics', desc: 'Get featured placement and reach pet owners actively searching', color: '#38BDF8' },
                { icon: '🛒', label: 'Pet Shops', desc: 'Reach buyers right when they adopt a new pet', color: '#7B5EA7' },
                { icon: '💊', label: 'Pet Pharma', desc: 'Reach vets and pet owners in one platform', color: '#58CC02' },
                { icon: '🏠', label: 'Boarding & Services', desc: 'Feature your service to a ready audience', color: '#FF6B9D' },
                { icon: '✈️', label: 'Gulf Diaspora Brands', desc: 'Nepali pet owners in UAE/Qatar — unique reach', color: '#FFD23F' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 16, border: '2px solid #1A1A1A', padding: isMobile ? '16px' : '24px', boxShadow: '4px 4px 0px #1A1A1A' }}>
                  <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 20 : 26, border: '2px solid #1A1A1A', marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 16, color: '#1A1A1A', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 13, lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PRICING TIERS */}
          <div style={{ marginBottom: isMobile ? 48 : 64 }}>
            <span style={{ background: '#FF6B35', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>💎 Packages</span>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px', letterSpacing: -0.5 }}>Advertising Packages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
              {[
                {
                  tier: 'Starter', price: 'NPR 15,000', period: '/month',
                  color: '#fff', textColor: '#1A1A1A', btnBg: '#58CC02', btnColor: '#fff',
                  tag: null,
                  features: ['Homepage sidebar banner', 'Category page banner', 'Monthly performance report', 'Email support'],
                },
                {
                  tier: 'Growth', price: 'NPR 35,000', period: '/month',
                  color: '#FF6B35', textColor: '#fff', btnBg: '#FFD23F', btnColor: '#1A1A1A',
                  tag: '⭐ Most Popular',
                  features: ['Hero homepage banner', 'All category page banners', 'Newsletter sponsorship', 'Sponsored listing badge', 'Bi-weekly performance report', 'Priority support'],
                },
                {
                  tier: 'Partner', price: 'Custom', period: '',
                  color: '#1A3320', textColor: '#fff', btnBg: '#58CC02', btnColor: '#fff',
                  tag: '🤝 Enterprise',
                  features: ['Full platform exclusivity', 'Content integration', 'Social media mentions', 'Campaign co-creation', 'Dedicated account manager', 'Weekly reporting'],
                },
              ].map(t => (
                <div key={t.tier} style={{ background: t.color, borderRadius: 20, border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', overflow: 'hidden' }}>
                  <div style={{ padding: isMobile ? '24px 20px' : '32px 28px' }}>
                    {t.tag && (
                      <span style={{ background: t.color === '#fff' ? '#1A1A1A' : '#FFD23F', color: t.color === '#fff' ? '#fff' : '#1A1A1A', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '1.5px solid #1A1A1A' }}>{t.tag}</span>
                    )}
                    <div style={{ fontSize: 13, fontWeight: 800, color: t.textColor === '#1A1A1A' ? '#888' : 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{t.tier}</div>
                    <div style={{ fontSize: isMobile ? 32 : 40, fontWeight: 900, color: t.textColor, lineHeight: 1 }}>{t.price}</div>
                    <div style={{ fontSize: 14, color: t.textColor === '#1A1A1A' ? '#888' : 'rgba(255,255,255,0.6)', marginBottom: 24, fontWeight: 600 }}>{t.period}</div>
                    {t.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <span style={{ color: t.textColor === '#1A1A1A' ? '#58CC02' : 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: isMobile ? 12 : 13, color: t.textColor, lineHeight: 1.5, fontWeight: 600 }}>{f}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => { update('budget', `${t.tier} — NPR ${t.price}/mo`); document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' }) }}
                      style={{ marginTop: 20, width: '100%', background: t.btnBg, color: t.btnColor, padding: '13px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A' }}>
                      Get Started →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AD PLACEMENTS */}
          <div style={{ marginBottom: isMobile ? 48 : 64 }}>
            <span style={{ background: '#7B5EA7', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #1A1A1A' }}>📍 Placements</span>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 24px', letterSpacing: -0.5 }}>Where Your Ad Appears</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 16 }}>
              {[
                { spot: 'Homepage Hero', desc: 'Top banner seen by every visitor', icon: '🏠', color: '#FFD23F' },
                { spot: 'Adopt Page', desc: 'Reaches active pet adopters', icon: '🐾', color: '#FF6B35' },
                { spot: 'Vet Directory', desc: 'Pet owners searching for services', icon: '🏥', color: '#38BDF8' },
                { spot: 'Email Newsletter', desc: '2K+ engaged subscribers', icon: '📧', color: '#58CC02' },
              ].map(p => (
                <div key={p.spot} style={{ background: '#fff', borderRadius: 14, border: '2px solid #1A1A1A', padding: isMobile ? '16px 12px' : '20px', boxShadow: '3px 3px 0px #1A1A1A', textAlign: 'center' }}>
                  <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 12, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 20 : 24, border: '2px solid #1A1A1A', margin: '0 auto 10px' }}>{p.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: isMobile ? 13 : 15, color: '#1A1A1A', marginBottom: 4 }}>{p.spot}</div>
                  <div style={{ color: '#6B7280', fontSize: isMobile ? 11 : 13, fontWeight: 500 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div id="contact-form">
            <span style={{ background: '#1A1A1A', color: '#FFD23F', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #1A1A1A', boxShadow: '2px 2px 0px #555' }}>📩 Get in Touch</span>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: -0.5 }}>Start Your Campaign</h2>
            <p style={{ color: '#6B7280', fontSize: isMobile ? 14 : 15, fontWeight: 500, marginBottom: 28 }}>Fill in your details and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <div style={{ background: '#E8F9ED', borderRadius: 20, padding: isMobile ? '32px 20px' : '48px', border: '3px solid #1A1A1A', boxShadow: '5px 5px 0px #1A1A1A', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? 48 : 64, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>Thanks for reaching out!</h3>
                <p style={{ color: '#6B7280', fontSize: isMobile ? 14 : 15, fontWeight: 500 }}>We'll contact you within 24 hours to discuss your campaign.</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', padding: isMobile ? '24px 16px' : '40px', boxShadow: '5px 5px 0px #1A1A1A', maxWidth: 680 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Company / Brand</label>
                      <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your company name" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Budget / Package</label>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {['Starter — NPR 15,000/mo', 'Growth — NPR 35,000/mo', 'Partner — Custom Budget', "Not sure yet — let's talk"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Tell us about your campaign</label>
                    <textarea rows={4} value={form.message} onChange={e => update('message', e.target.value)} placeholder="What are you promoting? Any specific goals or target audience?" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                  </div>
                  <button onClick={handleSubmit} style={{ background: '#FF6B35', color: '#fff', padding: '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: isMobile ? 15 : 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '4px 4px 0px #1A1A1A' }}>
                    Send Enquiry →
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', marginTop: isMobile ? 48 : 64, padding: isMobile ? '24px 16px' : '32px 28px', borderTop: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
