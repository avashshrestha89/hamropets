import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Advertise() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', budget: 'Starter — NPR 15,000/mo', message: '' })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.email) { alert('Please fill in your name and email.'); return }
    setSubmitted(true)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #000', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff', fontWeight: 500 }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#000', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: 0.3 }

  return (
    <>
      <Head>
        <title>Advertise — HamroPets</title>
        <meta name="description" content="Reach Nepal's most engaged pet-loving community. Advertise on HamroPets." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* NAV */}
        <nav style={{ background: '#FFFFFF', borderBottom: '3px solid #000', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: '#FFD23F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 22, color: '#000', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#58CC02', fontWeight: 800, letterSpacing: 1 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <Link href="/" style={{ color: '#666', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: '#FFD23F', padding: '64px 28px', borderBottom: '3px solid #000', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1.5px, transparent 1.5px)', backgroundSize: '26px 26px' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <span style={{ background: '#fff', color: '#000', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>💰 Advertising</span>
            <h1 style={{ fontSize: 56, fontWeight: 900, color: '#000', margin: '0 0 16px', letterSpacing: -1.5, lineHeight: 1.05 }}>
              Reach Nepal's<br />
              <span style={{ background: '#FF6B35', color: '#fff', padding: '2px 16px', borderRadius: 12, border: '2.5px solid #000', display: 'inline-block', boxShadow: '3px 3px 0px #000' }}>Pet Lovers</span>
            </h1>
            <p style={{ color: '#000', fontSize: 18, maxWidth: 560, lineHeight: 1.65, fontWeight: 600, marginBottom: 0 }}>
              Nepal's most engaged pet community — including Gulf diaspora audiences. Premium ad inventory, real results.
            </p>
            <div style={{ display: 'flex', gap: 32, marginTop: 36 }}>
              {[['10K+', 'Monthly Visitors'], ['700+', 'Pets Rehomed'], ['Nepal + Gulf', 'Audience Reach']].map(([v, l]) => (
                <div key={l} style={{ background: '#fff', borderRadius: 14, padding: '14px 20px', border: '2.5px solid #000', boxShadow: '3px 3px 0px #000' }}>
                  <div style={{ color: '#FF6B35', fontWeight: 900, fontSize: 24, lineHeight: 1 }}>{v}</div>
                  <div style={{ color: '#666', fontSize: 12, marginTop: 3, fontWeight: 700 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px' }}>

          {/* WHO SHOULD ADVERTISE */}
          <div style={{ marginBottom: 64 }}>
            <span style={{ background: '#58CC02', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>🎯 Perfect For</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: '0 0 28px', letterSpacing: -0.5 }}>Who Advertises on HamroPets?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { icon: '🐾', label: 'Pet Food Brands', desc: 'Drools, Royal Canin, Pedigree distributors targeting Nepal pet owners', color: '#FF6B35' },
                { icon: '🏥', label: 'Vet Clinics', desc: 'Get featured placement in our verified directory and reach pet owners actively searching', color: '#38BDF8' },
                { icon: '🛒', label: 'Pet Shops', desc: 'Accessories, food, toys — reach buyers right when they adopt a new pet', color: '#7B5EA7' },
                { icon: '💊', label: 'Pet Pharma', desc: 'Virbac, Zoetis Nepal — reach vets and pet owners in one platform', color: '#58CC02' },
                { icon: '🏠', label: 'Boarding & Services', desc: 'Feature your boarding, grooming or training service to a ready audience', color: '#FF6B9D' },
                { icon: '✈️', label: 'Gulf Diaspora Brands', desc: 'Nepali pet owners in UAE/Qatar sending money home for pet care — unique reach', color: '#FFD23F' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 20, border: '2px solid #000', padding: '24px', boxShadow: '4px 4px 0px #000' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '2px solid #000', marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: '#000', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ color: '#666', fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PRICING TIERS */}
          <div style={{ marginBottom: 64 }}>
            <span style={{ background: '#FF6B35', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>💎 Packages</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: '0 0 28px', letterSpacing: -0.5 }}>Advertising Packages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                {
                  tier: 'Starter', price: 'NPR 15,000', period: '/month',
                  color: '#fff', textColor: '#000', border: '#000', btnBg: '#58CC02', btnColor: '#fff',
                  tag: null,
                  features: ['Homepage sidebar banner', 'Category page banner', 'Monthly performance report', 'Email support'],
                },
                {
                  tier: 'Growth', price: 'NPR 35,000', period: '/month',
                  color: '#FF6B35', textColor: '#fff', border: '#000', btnBg: '#FFD23F', btnColor: '#000',
                  tag: '⭐ Most Popular',
                  features: ['Hero homepage banner', 'All category page banners', 'Newsletter sponsorship', 'Sponsored listing badge', 'Bi-weekly performance report', 'Priority support'],
                },
                {
                  tier: 'Partner', price: 'Custom', period: '',
                  color: '#1A3320', textColor: '#fff', border: '#000', btnBg: '#58CC02', btnColor: '#fff',
                  tag: '🤝 Enterprise',
                  features: ['Full platform exclusivity', 'Content integration', 'Social media mentions', 'Campaign co-creation', 'Dedicated account manager', 'Weekly reporting'],
                },
              ].map(t => (
                <div key={t.tier} style={{ background: t.color, borderRadius: 24, border: `3px solid ${t.border}`, boxShadow: '5px 5px 0px #000', overflow: 'hidden' }}>
                  <div style={{ padding: '32px 28px' }}>
                    {t.tag && (
                      <span style={{ background: t.color === '#fff' ? '#000' : '#FFD23F', color: t.color === '#fff' ? '#fff' : '#000', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '1.5px solid #000' }}>{t.tag}</span>
                    )}
                    <div style={{ fontSize: 13, fontWeight: 800, color: t.textColor === '#000' ? '#888' : 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{t.tier}</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: t.textColor, lineHeight: 1 }}>{t.price}</div>
                    <div style={{ fontSize: 14, color: t.textColor === '#000' ? '#888' : 'rgba(255,255,255,0.6)', marginBottom: 28, fontWeight: 600 }}>{t.period}</div>
                    {t.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                        <span style={{ color: t.textColor === '#000' ? '#58CC02' : 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: t.textColor, lineHeight: 1.5, fontWeight: 600 }}>{f}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => { update('budget', `${t.tier} — NPR ${t.price}/mo`); document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' }) }}
                      style={{ marginTop: 24, width: '100%', background: t.btnBg, color: t.btnColor, padding: '14px', borderRadius: 12, border: '2px solid #000', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #000' }}>
                      Get Started →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AD PLACEMENTS */}
          <div style={{ marginBottom: 64 }}>
            <span style={{ background: '#7B5EA7', color: '#fff', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>📍 Placements</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: '0 0 28px', letterSpacing: -0.5 }}>Where Your Ad Appears</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { spot: 'Homepage Hero', desc: 'Top banner seen by every visitor', icon: '🏠', color: '#FFD23F' },
                { spot: 'Adopt Page', desc: 'Reaches active pet adopters', icon: '🐾', color: '#FF6B35' },
                { spot: 'Vet Directory', desc: 'Pet owners searching for services', icon: '🏥', color: '#38BDF8' },
                { spot: 'Email Newsletter', desc: '2K+ engaged subscribers', icon: '📧', color: '#58CC02' },
              ].map(p => (
                <div key={p.spot} style={{ background: '#fff', borderRadius: 16, border: '2px solid #000', padding: '20px', boxShadow: '3px 3px 0px #000', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '2px solid #000', margin: '0 auto 12px' }}>{p.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 15, color: '#000', marginBottom: 6 }}>{p.spot}</div>
                  <div style={{ color: '#666', fontSize: 13, fontWeight: 500 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div id="contact-form">
            <span style={{ background: '#000', color: '#FFD23F', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 900, display: 'inline-block', marginBottom: 16, border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>📩 Get in Touch</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', margin: '0 0 8px', letterSpacing: -0.5 }}>Start Your Campaign</h2>
            <p style={{ color: '#666', fontSize: 15, fontWeight: 500, marginBottom: 32 }}>Fill in your details and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <div style={{ background: '#E8F9ED', borderRadius: 24, padding: '48px', border: '3px solid #000', boxShadow: '5px 5px 0px #000', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#000', marginBottom: 8 }}>Thanks for reaching out!</h3>
                <p style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>We'll contact you within 24 hours to discuss your campaign.</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 24, border: '3px solid #000', padding: '40px', boxShadow: '5px 5px 0px #000', maxWidth: 680 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Company / Brand</label>
                      <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your company name" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
                      {['Starter — NPR 15,000/mo', 'Growth — NPR 35,000/mo', 'Partner — Custom Budget', 'Not sure yet — let\'s talk'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Tell us about your campaign</label>
                    <textarea rows={4} value={form.message} onChange={e => update('message', e.target.value)} placeholder="What are you promoting? Any specific goals or target audience?" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                  </div>
                  <button onClick={handleSubmit} style={{ background: '#FF6B35', color: '#fff', padding: '16px', borderRadius: 14, border: '2.5px solid #000', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '4px 4px 0px #000' }}>
                    Send Enquiry →
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', marginTop: 64, padding: '32px', borderTop: '3px solid #000' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
