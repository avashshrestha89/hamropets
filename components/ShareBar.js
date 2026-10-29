import { useState, useEffect } from 'react'

const SITE = 'https://www.hamropets.com'

export default function ShareBar({ path, title, text, heading, isMobile }) {
  const [canNative, setCanNative] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCanNative(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const link = (ref) => `${SITE}${path}?ref=${ref}`
  const msg = (ref) => `${text} ${link(ref)}`

  const btn = (bg, color = '#fff') => ({
    background: bg, color, padding: isMobile ? '10px 14px' : '10px 16px', borderRadius: 12,
    border: '2.5px solid #1A1A1A', fontSize: 14, fontWeight: 900, cursor: 'pointer',
    fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
  })

  // Buttons, not <a href>, so ad blockers that hide social-share links do not remove them.
  const openShare = (url) => {
    const w = window.open(url, '_blank', 'noopener,noreferrer')
    if (!w) window.location.href = url
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link('copy'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      window.prompt('Copy this link', link('copy'))
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text, url: link('native') })
    } catch (e) { /* user cancelled */ }
  }

  return (
    <div style={{ marginTop: 16, background: '#fff', border: '2.5px solid #1A1A1A', borderRadius: 16, padding: isMobile ? '14px' : '16px 18px', boxShadow: '4px 4px 0px #1A1A1A' }}>
      <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A', marginBottom: 10 }}>{heading || '📣 Know someone who can help? Share'}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button onClick={() => openShare(`https://wa.me/?text=${encodeURIComponent(msg('wa'))}`)} style={btn('#25D366')}>💬 WhatsApp</button>
        <button onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link('fb'))}`)} style={btn('#1877F2')}>📘 Facebook</button>
        <a href={`viber://forward?text=${encodeURIComponent(msg('viber'))}`} style={btn('#7360F2')}>📞 Viber</a>
        {isMobile && (
          <a href={`fb-messenger://share/?link=${encodeURIComponent(link('msgr'))}`} style={btn('#0084FF')}>✉️ Messenger</a>
        )}
        <button onClick={copy} style={btn('#FFD23F', '#1A1A1A')}>{copied ? '✓ Copied' : '🔗 Copy link'}</button>
        {canNative && <button onClick={nativeShare} style={btn('#fff', '#1A1A1A')}>📤 More</button>}
      </div>
    </div>
  )
}
