import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ESEWA_NUMBER = '9779851405178';
const KHALTI_NUMBER = '9779851405178';

const faqItems = [
  {
    question: 'Where does my donation go?',
    answer: 'Your donation directly supports Adopt a Dog Nepal — covering rescue operations, veterinary care (vaccinations, spaying/neutering), food, shelter, and adoption coordination for stray and abandoned dogs across Nepal.',
  },
  {
    question: 'How can I donate from Nepal?',
    answer: `You can donate instantly via eSewa or Khalti by sending to ${ESEWA_NUMBER}. Both apps are free to download and widely used across Nepal. After donating, screenshot your payment and send it to us on WhatsApp at the same number.`,
  },
  {
    question: 'Is Adopt a Dog Nepal a registered nonprofit?',
    answer: 'Yes. Adopt a Dog Nepal was founded in April 2018 and is a registered nonprofit organization in Nepal. We have rehomed 1,000+ pets since our founding and operate transparently with community support.',
  },
  {
    question: 'What is the minimum donation amount?',
    answer: 'There is no minimum! Even NPR 50 helps buy food for a rescued dog. Every rupee counts. Common donation amounts are NPR 100, 500, 1,000, and 5,000 — but give whatever you can.',
  },
  {
    question: 'Can I donate from outside Nepal?',
    answer: 'For international donors, please reach out to us via our WhatsApp channel or email at hamropets@gmail.com so we can arrange the best transfer method for your country.',
  },
  {
    question: 'Will I receive a donation receipt?',
    answer: 'Yes! After your donation, send your payment screenshot to our WhatsApp at 9779851405178 or email hamropets@gmail.com and we will send you a receipt within 24 hours.',
  },
  {
    question: 'के म दान पाउँदा रसिद पाउँछु? (Do I get a receipt?)',
    answer: 'हो! दान गरेपछि आफ्नो भुक्तानीको स्क्रिनसट हाम्रो WhatsApp 9779851405178 मा पठाउनुस् — हामी 24 घण्टाभित्र रसिद पठाउनेछौं।',
  },
  {
    question: 'How many dogs has Adopt a Dog Nepal helped?',
    answer: 'Since April 2018, we have successfully rehomed over 1,000 pets — dogs, cats, and more — across Nepal. We are one of Nepal\'s most active pet adoption communities on Facebook with thousands of members.',
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState('');

  const copyNumber = (type) => {
    navigator.clipboard.writeText(ESEWA_NUMBER).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Adopt a Dog Nepal',
    url: 'https://www.hamropets.com',
    foundingDate: '2018-04',
    description: 'Nepal\'s leading pet adoption nonprofit, rehoming 1,000+ pets since 2018.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-9851405178',
      contactType: 'Donations',
    },
    sameAs: [
      'https://www.facebook.com/groups/adoptadognepal',
      'https://www.hamropets.com',
    ],
  };

  const donationSchema = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    agent: {
      '@type': 'Person',
      name: 'Donor',
    },
    recipient: {
      '@type': 'NGO',
      name: 'Adopt a Dog Nepal',
    },
    description: 'Donate via eSewa or Khalti to support stray dog rescue in Nepal',
  };

  return (
    <>
      <Head>
        <title>Donate to Adopt a Dog Nepal | Support Stray Dog Rescue in Nepal | HamroPets</title>
        <meta
          name="description"
          content="Support Adopt a Dog Nepal's mission to rescue and rehome stray dogs. Donate via eSewa or Khalti (9779851405178). Your donation funds vet care, food, and shelter for 1,000+ rescued pets since 2018."
        />
        <meta
          name="keywords"
          content="donate adopt a dog nepal, dog rescue donation nepal, hamropets donation, esewa donation nepal dog, khalti donation stray dog, nepal pet adoption charity, आफ्नो कुकुर दत्तक लिनुस नेपाल दान"
        />
        <link rel="canonical" href="https://www.hamropets.com/donate" />

        {/* Open Graph */}
        <meta property="og:title" content="Donate to Adopt a Dog Nepal | Help Rescue Dogs in Nepal" />
        <meta
          property="og:description"
          content="Every rupee helps rescued dogs get food, vet care & a loving home. Donate via eSewa/Khalti to 9779851405178. Adopt a Dog Nepal has rehomed 1,000+ pets since 2018."
        />
        <meta property="og:url" content="https://www.hamropets.com/donate" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.hamropets.com/og-donate.jpg" />
        <meta property="og:locale" content="en_NP" />
        <meta property="og:locale:alternate" content="ne_NP" />
        <meta property="og:site_name" content="HamroPets" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate to Adopt a Dog Nepal | HamroPets" />
        <meta
          name="twitter:description"
          content="Help rescue dogs in Nepal. Donate via eSewa or Khalti to 9779851405178. 1,000+ pets rehomed since 2018."
        />

        {/* Language */}
        <meta httpEquiv="content-language" content="en-NP, ne-NP" />
        <link rel="alternate" hrefLang="en-NP" href="https://www.hamropets.com/donate" />
        <link rel="alternate" hrefLang="ne-NP" href="https://www.hamropets.com/donate" />
        <link rel="alternate" hrefLang="x-default" href="https://www.hamropets.com/donate" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donationSchema) }}
        />
      </Head>

      <div style={{ width: '100%', maxWidth: '100%', background: '#FFF9F0', minHeight: '100vh' }}>
        {/* HERO */}
        <div
          style={{
            background: '#58CC02',
            borderBottom: '3px solid #1A1A1A',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🐾</div>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: '#1A1A1A',
              margin: '0 0 12px',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            Help Us Save More Dogs 🐕
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#1A1A1A',
              maxWidth: '600px',
              margin: '0 auto 8px',
              fontWeight: 500,
            }}
          >
            Your donation funds vet care, food & rescue operations for stray dogs across Nepal.
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#2A4A00',
              fontStyle: 'italic',
            }}
          >
            कुकुरहरूको लागि दान गर्नुस् — हरेक रुपैयाँ महत्त्वपूर्ण छ।
          </p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px' }}>

          {/* IMPACT STATS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {[
              { num: '1,000+', label: 'Pets Rehomed', emoji: '🏠' },
              { num: 'Since 2018', label: 'Founded April', emoji: '📅' },
              { num: 'Free', label: 'All Adoptions', emoji: '💚' },
              { num: 'Nepal', label: 'Nationwide', emoji: '🇳🇵' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: '#fff',
                  border: '2px solid #1A1A1A',
                  boxShadow: '3px 3px 0px #1A1A1A',
                  borderRadius: '12px',
                  padding: '20px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>{stat.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#58CC02' }}>{stat.num}</div>
                <div style={{ fontSize: '13px', color: '#666', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* DONATE VIA ESEWA & KHALTI */}
          <h2
            style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 900,
              color: '#1A1A1A',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            How to Donate 💳
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {/* eSewa Card */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#60BB46',
                  padding: '20px',
                  textAlign: 'center',
                  borderBottom: '2px solid #1A1A1A',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>📱</div>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#fff' }}>eSewa</h3>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 16px', color: '#444', fontSize: '15px' }}>
                  Open eSewa app → Send Money → Enter number below → Add amount → Pay
                </p>
                <div
                  style={{
                    background: '#F0FFF0',
                    border: '2px solid #58CC02',
                    borderRadius: '10px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>eSewa ID / Mobile Number</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#1A1A1A', letterSpacing: '2px' }}>
                    {ESEWA_NUMBER}
                  </div>
                  <div style={{ fontSize: '13px', color: '#58CC02', fontWeight: 600 }}>Adopt a Dog Nepal</div>
                </div>
                <button
                  onClick={() => copyNumber('esewa')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: copied === 'esewa' ? '#58CC02' : '#1A1A1A',
                    color: '#fff',
                    border: '2px solid #1A1A1A',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {copied === 'esewa' ? '✅ Copied!' : '📋 Copy eSewa Number'}
                </button>
              </div>
            </div>

            {/* Khalti Card */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#5C2D91',
                  padding: '20px',
                  textAlign: 'center',
                  borderBottom: '2px solid #1A1A1A',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>💜</div>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#fff' }}>Khalti</h3>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ margin: '0 0 16px', color: '#444', fontSize: '15px' }}>
                  Open Khalti app → Send Money → Enter number below → Add amount → Pay
                </p>
                <div
                  style={{
                    background: '#F5F0FF',
                    border: '2px solid #5C2D91',
                    borderRadius: '10px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Khalti ID / Mobile Number</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#1A1A1A', letterSpacing: '2px' }}>
                    {KHALTI_NUMBER}
                  </div>
                  <div style={{ fontSize: '13px', color: '#5C2D91', fontWeight: 600 }}>Adopt a Dog Nepal</div>
                </div>
                <button
                  onClick={() => copyNumber('khalti')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: copied === 'khalti' ? '#5C2D91' : '#1A1A1A',
                    color: '#fff',
                    border: '2px solid #1A1A1A',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {copied === 'khalti' ? '✅ Copied!' : '📋 Copy Khalti Number'}
                </button>
              </div>
            </div>
          </div>

          {/* QR CODE SECTION */}
          <div
            style={{
              background: '#FFD23F',
              border: '2px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
              borderRadius: '16px',
              padding: '32px 24px',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>
              📲 Scan QR Code to Donate
            </h2>
            <p style={{ color: '#333', marginBottom: '24px', fontSize: '15px' }}>
              Open eSewa or Khalti → Scan → Enter amount → Done!
            </p>
            <div
              style={{
                display: 'inline-block',
                background: '#fff',
                border: '3px solid #1A1A1A',
                boxShadow: '4px 4px 0px #1A1A1A',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
              }}
            >
              {/* QR Code placeholder — replace src with actual QR code image */}
              <img
                src="/donate-qr.png"
                alt="QR Code to donate to Adopt a Dog Nepal via eSewa or Khalti - number 9779851405178"
                width={200}
                height={200}
                style={{ display: 'block', borderRadius: '8px' }}
                onError={(e) => {
                  // Fallback: show a generated QR via Google Charts API
                  e.target.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=9779851405178&choe=UTF-8`;
                  e.target.onerror = null;
                }}
              />
            </div>
            <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>
              Scan with eSewa or Khalti app • Send to <strong>{ESEWA_NUMBER}</strong>
            </p>
          </div>

          {/* AFTER DONATING */}
          <div
            style={{
              background: '#fff',
              border: '2px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
              borderRadius: '16px',
              padding: '28px 24px',
              marginBottom: '48px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px' }}>
              ✅ After You Donate
            </h2>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                `Send your payment screenshot to WhatsApp: ${ESEWA_NUMBER}`,
                'Include your name and "Donation for dogs" in the message note',
                'We\'ll send you a receipt within 24 hours',
                'Follow us on our WhatsApp Channel for updates on rescued dogs',
              ].map((step, i) => (
                <li key={i} style={{ color: '#333', fontSize: '15px', lineHeight: 1.5 }}>
                  {step}
                </li>
              ))}
            </ol>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/977${ESEWA_NUMBER.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#25D366',
                  color: '#fff',
                  border: '2px solid #1A1A1A',
                  boxShadow: '3px 3px 0px #1A1A1A',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp Us
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb9c4iz1iUxWIHkfl41i"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#FFD23F',
                  color: '#1A1A1A',
                  border: '2px solid #1A1A1A',
                  boxShadow: '3px 3px 0px #1A1A1A',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                📢 Follow Our Channel
              </a>
            </div>
          </div>

          {/* WHAT YOUR DONATION DOES */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 900,
                color: '#1A1A1A',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              What Your Donation Does 🐶
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                { emoji: '💉', title: 'NPR 500', desc: 'Covers vaccination for 1 rescued dog' },
                { emoji: '🍖', title: 'NPR 200', desc: 'Feeds a rescued dog for 1 week' },
                { emoji: '✂️', title: 'NPR 2,000', desc: 'Funds spaying/neutering surgery' },
                { emoji: '🏥', title: 'NPR 1,000', desc: 'Emergency vet consultation & medicine' },
                { emoji: '🛏️', title: 'NPR 300', desc: 'Temporary shelter & bedding for 1 dog' },
                { emoji: '📢', title: 'NPR 100', desc: 'Helps promote adoption listings online' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: '#fff',
                    border: '2px solid #1A1A1A',
                    boxShadow: '3px 3px 0px #58CC02',
                    borderRadius: '12px',
                    padding: '20px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.emoji}</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#58CC02', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BILINGUAL ABOUT */}
          <div
            style={{
              background: '#fff',
              border: '2px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
              borderRadius: '16px',
              padding: '28px 24px',
              marginBottom: '48px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A1A', margin: '0 0 16px' }}>
              About Adopt a Dog Nepal 🇳🇵
            </h2>
            <p style={{ color: '#333', lineHeight: 1.7, marginBottom: '16px', fontSize: '15px' }}>
              <strong>Adopt a Dog Nepal</strong> (part of HamroPets) is Nepal&apos;s leading pet adoption and rescue
              nonprofit, founded in April 2018. We have successfully rehomed over{' '}
              <strong>1,000 pets</strong> — dogs, cats, and more — connecting rescued animals with loving families
              across Nepal, completely free of charge. We operate through our Facebook community of thousands of
              members and our platform HamroPets.com.
            </p>
            <p
              style={{
                color: '#555',
                lineHeight: 1.7,
                fontSize: '14px',
                borderTop: '1px solid #eee',
                paddingTop: '16px',
                fontStyle: 'italic',
              }}
            >
              <strong>नेपालीमा:</strong> Adopt a Dog Nepal (HamroPets को हिस्सा) नेपालको अग्रणी पशु दत्तक र उद्धार
              गैरनाफामूलक संस्था हो, जुन अप्रिल २०१८ मा स्थापना भयो। हामीले अहिलेसम्म <strong>१,०००+ पशुहरू</strong>{' '}
              — कुकुर, बिरालो र अन्य — नेपालभर प्रेमिल परिवारहरूसँग जोडेका छौं, पूर्णतः नि:शुल्क। हाम्रो
              Facebook समुदायमा हजारौं सदस्य छन् र हाम्रो प्लेटफर्म HamroPets.com मार्फत काम गर्दछौं।
            </p>
          </div>

          {/* FAQ SECTION */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 900,
                color: '#1A1A1A',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Frequently Asked Questions ❓
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqItems.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* CTA BOTTOM */}
          <div
            style={{
              background: '#FF6B9D',
              border: '2px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
              borderRadius: '16px',
              padding: '32px 24px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>
              🐾 Every Rupee Saves a Life
            </h2>
            <p style={{ color: '#fff', fontSize: '16px', marginBottom: '20px', opacity: 0.95 }}>
              Ready to help? Donate now and make a difference for dogs across Nepal.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/pets">
                <a
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#fff',
                    color: '#1A1A1A',
                    border: '2px solid #1A1A1A',
                    boxShadow: '3px 3px 0px #1A1A1A',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  🐕 Adopt a Dog
                </a>
              </Link>
              <Link href="/submit-pet">
                <a
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#1A1A1A',
                    color: '#fff',
                    border: '2px solid #1A1A1A',
                    boxShadow: '3px 3px 0px #fff',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  🏠 List a Pet for Adoption
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
    <div
      style={{
        background: '#fff',
        border: '2px solid #1A1A1A',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: open ? '3px 3px 0px #58CC02' : '3px 3px 0px #1A1A1A',
        transition: 'box-shadow 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '15px', lineHeight: 1.4 }}>
          {question}
        </span>
        <span
          style={{
            fontSize: '20px',
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: '0 20px 16px',
            color: '#444',
            fontSize: '14px',
            lineHeight: 1.6,
            borderTop: '1px solid #eee',
          }}
        >
          <div style={{ paddingTop: '12px' }}>{answer}</div>
        </div>
      )}
    </div>
  );
}
