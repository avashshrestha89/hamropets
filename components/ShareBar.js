import { useState, useEffect } from 'react'

const SITE = 'https://www.hamropets.com'

// Draws a 1080x1350 share card (good for Instagram Story/feed, TikTok photo, WhatsApp status).
function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

function wrapText(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
      if (lines.length === maxLines) break
    } else line = test
  }
  if (lines.length < maxLines && line) lines.push(line)
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'
  }
  return lines
}

async function buildCard(card) {
  const W = 1080, H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

  ctx.fillStyle = '#FFF9E6'
  ctx.fillRect(0, 0, W, H)

  // photo frame
  const px = 60, py = 60, pw = 960, ph = 800
  ctx.fillStyle = '#1A1A1A'
  ctx.fillRect(px + 10, py + 10, pw, ph)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(px, py, pw, ph)

  const img = await loadImage(card.image)
  if (img) {
    // cover fit
    const r = Math.max(pw / img.width, ph / img.height)
    const sw = pw / r, sh = ph / r
    ctx.save()
    ctx.beginPath()
    ctx.rect(px, py, pw, ph)
    ctx.clip()
    ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, px, py, pw, ph)
    ctx.restore()
  } else {
    ctx.fillStyle = (card.color || '#58CC02')
    ctx.globalAlpha = 0.25
    ctx.fillRect(px, py, pw, ph)
    ctx.globalAlpha = 1
    ctx.font = `220px ${font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#1A1A1A'
    ctx.fillText(card.emoji || '🐾', px + pw / 2, py + ph / 2)
  }
  ctx.lineWidth = 8
  ctx.strokeStyle = '#1A1A1A'
  ctx.strokeRect(px, py, pw, ph)

  // badge
  if (card.badge) {
    ctx.font = `900 40px ${font}`
    const bw = ctx.measureText(card.badge).width + 56
    ctx.fillStyle = card.color || '#58CC02'
    ctx.fillRect(px + 30, py + 30, bw, 76)
    ctx.lineWidth = 6
    ctx.strokeRect(px + 30, py + 30, bw, 76)
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(card.badge, px + 58, py + 69)
  }

  // title
  ctx.fillStyle = '#1A1A1A'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  let size = 96
  ctx.font = `900 ${size}px ${font}`
  while (ctx.measureText(card.title).width > 960 && size > 52) {
    size -= 4
    ctx.font = `900 ${size}px ${font}`
  }
  ctx.fillText(card.title, 60, 960)

  // subtitle lines
  ctx.font = `600 44px ${font}`
  ctx.fillStyle = '#4B5563'
  const sub = wrapText(ctx, card.subtitle, 960, 2)
  sub.forEach((l, i) => ctx.fillText(l, 60, 1030 + i * 58))

  // footer bar
  ctx.fillStyle = '#58CC02'
  ctx.fillRect(0, 1190, W, 160)
  ctx.lineWidth = 8
  ctx.strokeStyle = '#1A1A1A'
  ctx.beginPath()
  ctx.moveTo(0, 1190)
  ctx.lineTo(W, 1190)
  ctx.stroke()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = `900 54px ${font}`
  ctx.textBaseline = 'middle'
  ctx.fillText(card.cta || 'See more on HamroPets.com', 60, 1245)
  ctx.font = `700 34px ${font}`
  ctx.fillText('🐾 Nepal’s pet platform · by Adopt a Dog Nepal', 60, 1303)

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
}

export default function ShareBar({ path, title, text, card, heading, isMobile }) {
  const [canNative, setCanNative] = useState(false)
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')

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

  const shareImage = async () => {
    if (busy) return
    setBusy(true)
    setNote('')
    try {
      const blob = await buildCard(card)
      if (!blob) throw new Error('no blob')
      const file = new File([blob], 'hamropets-share.png', { type: 'image/png' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title, text: `${text} ${link('image')}` })
          setBusy(false)
          return
        } catch (e) {
          if (e && e.name === 'AbortError') { setBusy(false); return }
        }
      }
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'hamropets-share.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(a.href), 4000)
      setNote('Image saved. Post it to your Instagram, TikTok or Facebook.')
    } catch (e) {
      setNote('Could not make the image. Try the link buttons instead.')
    }
    setBusy(false)
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
        {card && (
          <button onClick={shareImage} disabled={busy} style={btn('#E1306C')}>{busy ? 'Making image…' : '📸 Instagram / TikTok image'}</button>
        )}
      </div>
      {note && <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: '#166534' }}>{note}</div>}
    </div>
  )
}
