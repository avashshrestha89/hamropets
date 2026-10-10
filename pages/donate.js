import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SUPABASE_URL = 'https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/success-stories';

const successStories = [
  {
    img: `${SUPABASE_URL}/591136623_2212884655904492_4198644748439595867_n.jpg`,
    caption: 'Found on the streets of Kathmandu. Home within 5 days.',
    tag: 'Adopted 🏠',
  },
  {
    img: `${SUPABASE_URL}/9DC3A6E1-40CE-472D-8B24-62156481C0C1.JPG`,
    caption: 'Abandoned. Scared. Then someone said yes. Free, forever.',
    tag: 'Found a Family 💚',
  },
  {
    img: `${SUPABASE_URL}/IMG_1657.JPG`,
    caption: 'No name. No home. Now has both — thanks to HamroPets.',
    tag: 'Rehomed 🐾',
  },
  {
    img: `${SUPABASE_URL}/IMG_1658.JPG`,
    caption: 'Posted on a Tuesday. Adopted by Friday. Zero cost.',
    tag: 'Adopted 🏠',
  },
  {
    img: `${SUPABASE_URL}/IMG_1659.JPG`,
    caption: 'A stray in Lalitpur. Now the most loved dog in the family.',
    tag: 'Found a Family 💚',
  },
  {
    img: `${SUPABASE_URL}/IMG_1674.JPG`,
    caption: 'Eight years of doing this. Every single adoption: free.',
    tag: 'Rehomed 🐾',
  },
];

const faqItems = [
  {
    question: 'Where does my donation go?',
    answer: 'Every rupee keeps HamroPets.com free — hosting, platform tools, and the social media outreach that connects rescued dogs with loving families. We have never charged adopters a single rupee, and your donation is what makes that possible.',
  },
  {
    question: 'How do I donate from Nepal?',
    answer: 'Send via eSewa or Khalti to 9779851405178. After paying, WhatsApp your screenshot to the same number so we can send your receipt.',
  },
  {
    question: 'How do I donate from outside Nepal?',
    answer: 'Use PayPal at paypal.me/adoptadognp. It takes 2 minutes and works from any country. Your donation goes directly to Adopt a Dog Nepal.',
  },
  {
    question: 'Is Adopt a Dog Nepal a registered nonprofit?',
    answer: 'Yes. Founded in April 2018, Adopt a Dog Nepal is a registered nonprofit that has rehomed 1,000+ pets across Nepal — completely free of charge, always.',
  },
  {
    question: 'Will I get a receipt?',
    answer: 'Yes. Send your payment screenshot to WhatsApp 9779851405178 or email hamropets@gmail.com and we will send a receipt within 24 hours.',
  },
  {
    question: 'What is the minimum donation?',
    answer: 'There is no minimum. NPR 100 or $1 — every amount helps keep this platform free for the next person who needs to find their dog a home.',
  },
  {
    question: 'HamroPets मा कसरी सहयोग गर्ने? (How to donate in Nepali?)',
    answer: 'eSewa वा Khalti मार्फत 9779851405178 मा पठाउनुस्। भुक्तानी गरेपछि स्क्रिनसट WhatsApp मा पठाउनुस् — हामी 24 घण्टाभित्र रसिद पठाउनेछौं।',
  },
  {
    question: 'How many dogs has HamroPets helped?',
    answer: 'Since April 2018, we have rehomed over 1,000 pets across Nepal. Every single adoption was free. No fees. No commissions. Ever.',
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState('');

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Adopt a Dog Nepal',
    url: 'https://www.hamropets.com',
    foundingDate: '2018-04',
    description: "Nepal's leading pet adoption nonprofit, rehoming 1,000+ pets since 2018, completely free.",
    contactPoint: { '@type': 'ContactPoint', telephone: '+977-9779851405178', contactType: 'Donations' },
  };

  return (
    <>
      <Head>
        <title>Donate to Adopt a Dog Nepal | Keep HamroPets Free | Help Rescue Dogs in Nepal</title>
        <meta name="description" content="HamroPets has never charged a single rupee for pet adoption. Your donation keeps it that way. Support Adopt a Dog Nepal — 1,000+ pets rehomed since 2018. Donate via PayPal, eSewa or Khalti." />
        <meta name="keywords" content="donate adopt a dog nepal, hamropets donation, dog rescue nepal donate, paypal nepal dog rescue, esewa donation dog nepal, keep hamropets free" />
        <link rel="canonical" href="https://www.hamropets.com/donate" />
        <meta property="og:title" content="Help Keep HamroPets Free | Donate to Adopt a Dog Nepal" />
        <meta property="og:description" content="1,000+ dogs rehomed. Zero fees. Ever. Your donation is what makes that possible. Donate via PayPal, eSewa or Khalti." />
        <meta property="og:url" content="https://www.hamropets.com/donate" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.hamropets.com/og-donate.jpg" />
        <meta property="og:locale" content="en_NP" />
        <meta property="og:locale:alternate" content="ne_NP" />
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <link rel="alternate" hrefLang="en-NP" href="https://www.hamropets.com/donate" />
        <link rel="alternate" hrefLang="ne-NP" href="https://www.hamropets.com/donate" />
        <link rel="alternate" hrefLang="x-default" href="https://www.hamropets.com/donate" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      <div style={{ width: '100%', maxWidth: '100%', background: '#FFF9F0', minHeight: '100vh' }}>

        {/* HERO */}
        <div style={{ background: '#1A1A1A', padding: '64px 24px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: '#58CC02', color: '#fff', fontSize: '13px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Adopt a Dog Nepal · Since 2018
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-1px' }}>
              We have never charged<br />
              <span style={{ color: '#FFD23F' }}>a single rupee</span> for adoption.
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#ccc', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.6, fontWeight: 400 }}>
              1,000+ dogs found homes. Every adoption free. Your donation is what keeps it that way.
            </p>
            <a
              href="#donate-now"
              style={{ display: 'inline-block', padding: '16px 36px', background: '#58CC02', color: '#fff', border: '2px solid #fff', borderRadius: '12px', fontWeight: 900, fontSize: '18px', textDecoration: 'none', boxShadow: '4px 4px 0px #166534' }}
            >
              💚 Keep It Free — Donate Now
            </a>
          </div>
        </div>

        {/* WIKIPEDIA-STYLE BANNER */}
        <div style={{ background: '#FFF3CD', borderTop: '3px solid #1A1A1A', borderBottom: '3px solid #1A1A1A', padding: '20px 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '36px', flexShrink: 0 }}>🐾</div>
            <p style={{ margin: 0, fontSize: 'clamp(14px, 2vw, 16px)', color: '#1A1A1A', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
              <strong>To our readers in Nepal and around the world:</strong> HamroPets has no ads, no listing fees, no commissions. We are a small nonprofit running on community support. If everyone who used HamroPets this month donated just <strong>NPR 200</strong> or <strong>$2</strong>, we could keep this platform free for years. Please take a moment.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 16px' }}>

          {/* SUCCESS STORIES GALLERY */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ background: '#FF6B9D', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '1px' }}>Real Stories</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#1A1A1A', textAlign: 'center', margin: '0 0 8px' }}>
              Every photo here is a life that almost didn&apos;t make it.
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '16px', marginBottom: '32px' }}>
              These are real dogs. Real families. All adopted free through HamroPets.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {successStories.map((story, i) => (
                <div
                  key={i}
                  style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: '14px', overflow: 'hidden', boxShadow: '4px 4px 0px #1A1A1A' }}
                >
                  <div style={{ position: 'relative', paddingBottom: '100%', background: '#f0f0f0' }}>
                    <img
                      src={story.img}
                      alt={story.caption}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#58CC02', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', border: '1.5px solid #1A1A1A' }}>
                      {story.tag}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#333', fontWeight: 600, lineHeight: 1.5, fontStyle: 'italic' }}>
                      &ldquo;{story.caption}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '20px', fontStyle: 'italic' }}>
              And 1,000+ more stories just like these. All free. All because of people like you.
            </p>
          </div>

          {/* DONATE NOW SECTION */}
          <div id="donate-now" style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#1A1A1A', textAlign: 'center', margin: '0 0 8px' }}>
              Help Keep This Free 💚
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '16px', marginBottom: '32px' }}>
              Choose how you want to donate. Every amount makes a difference.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

              {/* INTERNATIONAL — PAYPAL */}
              <div style={{ background: '#fff', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #003087', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ background: '#003087', padding: '24px 20px', borderBottom: '2px solid #1A1A1A', textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', marginBottom: '8px' }}>🌍</div>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#fff' }}>International</h3>
                  <p style={{ margin: '4px 0 0', color: '#a8c4e8', fontSize: '14px' }}>US, UK, Australia & worldwide</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: '#444', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
                    Donate securely via PayPal. Works with any card or PayPal balance. Takes 2 minutes.
                  </p>
                  <a
                    href="https://paypal.me/adoptadognp"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#003087', color: '#fff', border: '2px solid #1A1A1A', borderRadius: '10px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', marginBottom: '12px', boxShadow: '3px 3px 0px #1A1A1A' }}
                  >
                    💙 Donate via PayPal
                  </a>
                  <p style={{ textAlign: 'center', fontSize: '13px', color: '#888', margin: 0 }}>
                    paypal.me/adoptadognp
                  </p>
                </div>
              </div>

              {/* NEPAL — ESEWA / KHALTI */}
              <div style={{ background: '#fff', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #58CC02', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ background: '#58CC02', padding: '24px 20px', borderBottom: '2px solid #1A1A1A', textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', marginBottom: '8px' }}>🇳🇵</div>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#fff' }}>Nepal</h3>
                  <p style={{ margin: '4px 0 0', color: '#d4f5b0', fontSize: '14px' }}>eSewa · Khalti · Mobile Banking</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: '#444', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
                    Send to our number via eSewa or Khalti. Screenshot your payment and WhatsApp it to us for a receipt.
                  </p>
                  <div style={{ background: '#F0FFF0', border: '2px solid #58CC02', borderRadius: '10px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>eSewa / Khalti Number</div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#1A1A1A', letterSpacing: '2px' }}>9779851405178</div>
                    <div style={{ fontSize: '12px', color: '#58CC02', fontWeight: 700 }}>Adopt a Dog Nepal</div>
                  </div>
                  <button
                    onClick={() => copy('9779851405178', 'nepal')}
                    style={{ width: '100%', padding: '12px', background: copied === 'nepal' ? '#58CC02' : '#1A1A1A', color: '#fff', border: '2px solid #1A1A1A', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '3px 3px 0px #1A1A1A' }}
                  >
                    {copied === 'nepal' ? '✅ Copied!' : '📋 Copy Number'}
                  </button>
                </div>
              </div>

            </div>

            {/* AFTER DONATING */}
            <div style={{ background: '#F0F9FF', border: '2px solid #1A1A1A', borderRadius: '12px', padding: '20px 24px', marginTop: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '32px', flexShrink: 0 }}>📲</div>
              <div>
                <div style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '15px', marginBottom: '4px' }}>After donating from Nepal</div>
                <div style={{ color: '#555', fontSize: '14px', lineHeight: 1.6 }}>
                  WhatsApp your payment screenshot to <strong>9779851405178</strong> with &ldquo;Donation for dogs&rdquo; — we&apos;ll send your receipt within 24 hours and personally thank you.
                </div>
              </div>
            </div>
          </div>

          {/* WHAT YOUR DONATION DOES */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#1A1A1A', textAlign: 'center', margin: '0 0 28px' }}>
              What Your Donation Keeps Free
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { emoji: '🌐', title: 'HamroPets.com', desc: 'The platform stays live, fast, and free for every adopter in Nepal' },
                { emoji: '📱', title: 'Adoption Videos', desc: 'AI-powered videos that help dogs get adopted 3x faster on TikTok & Facebook' },
                { emoji: '🐾', title: 'Zero Fees', desc: 'Every adoption listing, every search, every match — always free' },
                { emoji: '📢', title: 'Community Outreach', desc: 'Reaching thousands of Nepalis every week who can give a dog a home' },
                { emoji: '🔍', title: 'Lost & Found', desc: 'Free lost pet reporting so families can find their missing dogs' },
                { emoji: '💚', title: 'The Mission', desc: '8 years of keeping pet adoption free in Nepal — and counting' },
              ].map((item) => (
                <div key={item.title} style={{ background: '#fff', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #58CC02', borderRadius: '12px', padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#1A1A1A', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div style={{ background: '#1A1A1A', borderRadius: '20px', padding: '40px 32px', marginBottom: '64px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🐕</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#fff', margin: '0 0 16px' }}>
              About Adopt a Dog Nepal
            </h2>
            <p style={{ color: '#ccc', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 16px' }}>
              Founded in April 2018, Adopt a Dog Nepal is Nepal&apos;s oldest and most active pet rescue and rehoming nonprofit. We have connected <strong style={{ color: '#FFD23F' }}>over 1,000 pets</strong> with loving families across Nepal — completely free of charge, every single time.
            </p>
            <p style={{ color: '#aaa', fontSize: '14px', fontStyle: 'italic', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              नेपालीमा: अप्रिल २०१८ देखि हामीले नेपालभर १,०००+ पशुहरूलाई नि:शुल्क नयाँ घर दिएका छौं। तपाईंको दानले यो मिशन जारी राख्न मद्दत गर्छ।
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://paypal.me/adoptadognp" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', background: '#58CC02', color: '#fff', border: '2px solid #fff', borderRadius: '8px', fontWeight: 800, fontSize: '15px', textDecoration: 'none' }}>
                💚 Donate Now
              </a>
              <a href="https://whatsapp.com/channel/0029Vb9c4iz1iUxWIHkfl41i" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                📢 Follow Updates
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, color: '#1A1A1A', textAlign: 'center', margin: '0 0 24px' }}>
              Questions? We have answers. ❓
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqItems.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* BOTTOM CTA */}
          <div style={{ background: '#FFD23F', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A', borderRadius: '20px', padding: '40px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, color: '#1A1A1A', margin: '0 0 12px' }}>
              One donation. One dog home. 🐾
            </h2>
            <p style={{ color: '#333', fontSize: '16px', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
              Because of people like you, HamroPets has stayed free for 8 years. Help us make it 8 more.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://paypal.me/adoptadognp" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '14px 32px', background: '#003087', color: '#fff', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', borderRadius: '10px', fontWeight: 800, fontSize: '16px', textDecoration: 'none' }}>
                💙 Donate via PayPal
              </a>
              <Link href="/pets">
                <a style={{ display: 'inline-block', padding: '14px 32px', background: '#1A1A1A', color: '#fff', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #FFD23F', borderRadius: '10px', fontWeight: 800, fontSize: '16px', textDecoration: 'none' }}>
                  🐕 Adopt a Dog Instead
                </a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: '#fff', border: '2px solid #1A1A1A', borderRadius: '10px', overflow: 'hidden', boxShadow: open ? '3px 3px 0px #58CC02' : '3px 3px 0px #1A1A1A', transition: 'box-shadow 0.2s' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}
      >
        <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '15px', lineHeight: 1.4 }}>{question}</span>
        <span style={{ fontSize: '20px', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', color: '#444', fontSize: '14px', lineHeight: 1.7, borderTop: '1px solid #eee' }}>
          <div style={{ paddingTop: '12px' }}>{answer}</div>
        </div>
      )}
    </div>
  );
}
