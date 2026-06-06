import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function AIVet() {
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Namaste! 🙏 I'm HamroPets AI Vet, powered by Gemini Pro. I can help with questions about your pet's health, nutrition, behaviour, and general care. What would you like to know today? 🐾"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', text: userMessage }])
    setLoading(true)
    try {
      const res = await fetch('/api/ai-vet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'ai', text: data.reply }])
    } catch (err) {
      setMessages(m => [...m, { role: 'ai', text: 'Sorry, I could not connect right now. Please try again in a moment.' }])
    }
    setLoading(false)
  }

  const suggestions = [
    'My dog is not eating, what should I do?',
    'How often should I vaccinate my cat?',
    'What food is toxic for dogs in Nepal?',
    'My pet is vomiting, is it serious?',
  ]

  return (
    <>
      <Head>
        <title>AI Vet Chat — HamroPets</title>
        <meta name="description" content="Free 24/7 AI pet health guidance powered by Gemini Pro." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden', maxWidth: '100vw' }}>

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
                  <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: label === 'AI Vet' ? 800 : 600, color: label === 'AI Vet' ? '#58CC02' : '#1A1A1A', background: label === 'AI Vet' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            )}
            <Link href="/submit-pet" style={{ background: '#58CC02', color: '#fff', padding: isMobile ? '8px 12px' : '11px 22px', borderRadius: 12, fontSize: isMobile ? 12 : 14, fontWeight: 900, textDecoration: 'none', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #166534', whiteSpace: 'nowrap' }}>+ Submit a Pet</Link>
          </div>
        </nav>

        {/* MOBILE NAV */}
        {isMobile && (
          <div style={{ background: '#FFFFFF', borderBottom: '2px solid #1A1A1A', padding: '10px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet']].map(([label, href]) => (
              <Link key={label} href={href} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: label === 'AI Vet' ? 800 : 600, color: label === 'AI Vet' ? '#58CC02' : '#1A1A1A', textDecoration: 'none', background: label === 'AI Vet' ? '#E8F9ED' : '#fff', border: '1.5px solid #1A1A1A', whiteSpace: 'nowrap', flexShrink: 0 }}>{label}</Link>
            ))}
          </div>
        )}

        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 32px', flex: 1, width: '100%', boxSizing: 'border-box' }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 32 }}>
            <div style={{ width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: 20, background: 'linear-gradient(135deg, #7B5EA7, #1A3320)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 26 : 34, margin: '0 auto 14px' }}>🤖</div>
            <span style={{ background: '#F0EBFF', color: '#7B5EA7', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10, border: '1.5px solid #7B5EA7' }}>✨ Powered by Gemini Pro</span>
            <h1 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, color: '#1A1A1A', margin: '8px 0 6px' }}>AI Vet Chat</h1>
            <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, fontWeight: 500 }}>Free 24/7 pet health guidance · Always consult a real vet for serious concerns</p>
          </div>

          {/* SUGGESTIONS */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, justifyContent: 'center' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => setInput(s)} style={{ padding: isMobile ? '7px 12px' : '8px 16px', borderRadius: 999, border: '1.5px solid #E5E7EB', background: '#fff', color: '#6B7280', cursor: 'pointer', fontSize: isMobile ? 11 : 13, fontFamily: 'inherit', fontWeight: 500 }}>{s}</button>
            ))}
          </div>

          {/* CHAT BOX */}
          <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #1A1A1A', boxShadow: '4px 4px 0px #1A1A1A', overflow: 'hidden' }}>
            <div style={{ height: isMobile ? 340 : 420, overflowY: 'auto', padding: isMobile ? '16px' : '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%',
                    background: m.role === 'user' ? '#7B5EA7' : '#F3F4F6',
                    color: m.role === 'user' ? '#fff' : '#1A1A1A',
                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: isMobile ? '10px 14px' : '12px 18px',
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: 1.6,
                  }}>
                    {m.role === 'ai' && <span style={{ marginRight: 6 }}>🤖</span>}
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: '#F3F4F6', borderRadius: '18px 18px 18px 4px', padding: '12px 18px', fontSize: 14, color: '#6B7280' }}>
                    🤖 Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div style={{ borderTop: '2px solid #1A1A1A', padding: isMobile ? '12px 14px' : '16px 20px', display: 'flex', gap: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={isMobile ? 'Ask about your pet...' : 'Ask about your pet... e.g. My dog is scratching a lot'}
                style={{ flex: 1, padding: isMobile ? '10px 14px' : '12px 18px', borderRadius: 999, border: '1.5px solid #E5E7EB', fontSize: isMobile ? 13 : 14, fontFamily: 'inherit', outline: 'none' }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                style={{ background: loading ? '#9CA3AF' : '#7B5EA7', color: '#fff', padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 999, border: '2px solid #1A1A1A', fontSize: isMobile ? 13 : 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxShadow: '2px 2px 0px #1A1A1A' }}
              >
                {isMobile ? '→' : 'Send →'}
              </button>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div style={{ marginTop: 14, background: '#FFFBDE', borderRadius: 12, padding: '12px 16px', fontSize: isMobile ? 12 : 13, color: '#92400E', textAlign: 'center', border: '1.5px solid #FFD23F', fontWeight: 500 }}>
            ⚠️ AI Vet provides general guidance only. Always consult a licensed veterinarian for medical decisions.
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#FFFFFF', padding: isMobile ? '24px 16px' : '32px 28px', borderTop: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 10 }}>
            <span style={{ color: '#9CA3AF', fontSize: 13, fontWeight: 600 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
