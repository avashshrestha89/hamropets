import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function AIVet() {
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
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFBF5', display: 'flex', flexDirection: 'column' }}>

        {/* NAV */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '2px solid #EDE8F5', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🐾</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#1A3320', letterSpacing: -0.5, lineHeight: 1 }}>HamroPets</div>
                <div style={{ fontSize: 10, color: '#6B7C99', fontWeight: 600, letterSpacing: 0.5 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['Adopt', '/adopt'], ['Vets', '/vets'], ['Walk & Sit', '/walk-sit'], ['Lost & Found', '/lost-found'], ['AI Vet', '/ai-vet'], ['Advertise', '/advertise']].map(([label, href]) => (
                <Link key={label} href={href} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: label === 'AI Vet' ? 700 : 500, color: label === 'AI Vet' ? '#58CC02' : '#6B7C99', background: label === 'AI Vet' ? '#E8F9ED' : 'none', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <Link href="/submit-pet" style={{ background: '#FF6B35', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>+ List a Pet</Link>
          </div>
        </nav>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px', flex: 1, width: '100%' }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: 'linear-gradient(135deg, #7B5EA7, #1A3320)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, margin: '0 auto 16px' }}>🤖</div>
            <span style={{ background: '#F0EBFF', color: '#7B5EA7', padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>✨ Powered by Gemini Pro</span>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1A3320', margin: '8px 0 6px' }}>AI Vet Chat</h1>
            <p style={{ color: '#6B7C99', fontSize: 15 }}>Free 24/7 pet health guidance · Always consult a real vet for serious concerns</p>
          </div>

          {/* SUGGESTIONS */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, justifyContent: 'center' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => setInput(s)} style={{ padding: '8px 16px', borderRadius: 999, border: '1.5px solid #EDE8F5', background: '#fff', color: '#6B7C99', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: 500 }}>{s}</button>
            ))}
          </div>

          {/* CHAT BOX */}
          <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #EDE8F5', boxShadow: '0 4px 24px rgba(27,43,75,0.10)', overflow: 'hidden' }}>
            <div style={{ height: 420, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '78%',
                    background: m.role === 'user' ? '#FF6B35' : '#F3F4F6',
                    color: m.role === 'user' ? '#fff' : '#1A3320',
                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '12px 18px',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}>
                    {m.role === 'ai' && <span style={{ marginRight: 6 }}>🤖</span>}
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ background: '#F3F4F6', borderRadius: '18px 18px 18px 4px', padding: '12px 18px', fontSize: 14, color: '#6B7C99' }}>
                    🤖 Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div style={{ borderTop: '1.5px solid #EDE8F5', padding: '16px 20px', display: 'flex', gap: 12 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about your pet... e.g. My dog is scratching a lot"
                style={{ flex: 1, padding: '12px 18px', borderRadius: 999, border: '1.5px solid #EDE8F5', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                style={{ background: loading ? '#A0AFCC' : '#7B5EA7', color: '#fff', padding: '12px 24px', borderRadius: 999, border: 'none', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
              >
                Send →
              </button>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div style={{ marginTop: 16, background: '#FFFBDE', borderRadius: 14, padding: '12px 18px', fontSize: 13, color: '#92400E', textAlign: 'center', border: '1px solid #FFD23F50' }}>
            ⚠️ AI Vet provides general guidance only. Always consult a licensed veterinarian for medical decisions.
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{ background: '#1A3320', padding: '32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>© 2025 HamroPets · Nepal's First Pet Platform</span>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
