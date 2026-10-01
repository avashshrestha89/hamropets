import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps({ params }) {
  const { data: pet } = await supabase
    .from('pet_listings')
    .select('id, pet_name, species, breed, images, location, boost_tier')
    .eq('id', params.petId)
    .eq('status', 'approved')
    .single()

  if (!pet) return { notFound: true }
  return { props: { pet } }
}

export default function AdoptApply({ pet }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [form, setForm] = useState({
    fullName: '', age: '', phone: '', whatsapp: '', location: '',
    housingType: '', landlordConsent: '', hasCompound: '',
    householdType: '', familyConsensus: '',
    previousPet: '', previousPetDetail: '', dashainPlan: '',
    financialReady: '', whyThisPet: '',
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.location) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/adoption-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, petId: pet.id, petName: pet.pet_name }),
      })
      if (res.ok) setSubmitted(true)
      else alert('Something went wrong. Please try again.')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #1A1A1A', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 8 }
  const btnPrimary = { background: '#58CC02', color: '#fff', padding: '14px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534', width: '100%' }
  const btnSecondary = { background: '#fff', color: '#1A1A1A', padding: '14px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }

  const optionButtons = (field, value, options) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map(([val, label]) => (
        <button key={val} onClick={() => update(field, val)} style={{ padding: '12px 16px', borderRadius: 12, border: `2px solid ${value === val ? '#1A1A1A' : '#E5E7EB'}`, background: value === val ? '#F9FAFB' : '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: value === val ? 800 : 500, textAlign: 'left', boxShadow: value === val ? '2px 2px 0px #1A1A1A' : 'none' }}>
          {label}
        </button>
      ))}
    </div>
  )

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🐾</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>
            Thank you, {form.fullName}!
          </h1>
          <div style={{ background: '#E8F9ED', borderRadius: 16, padding: '24px', border: '2px solid #58CC02', marginBottom: 24, textAlign: 'left' }}>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: 0 }}>
              We have received your application for <strong>{pet.pet_name}</strong>. Because we want to ensure {pet.pet_name} finds the safest forever home, our team manually reviews every single application. 🐾
              <br /><br />
              We are sending the strongest profiles to {pet.pet_name}'s owner this week. If your profile is selected, the owner will reach out to you directly within 48 hours.
              <br /><br />
              <strong>Thank you for choosing to adopt and not shop! ❤️</strong>
              <br />— The HamroPets Team
            </p>
          </div>
          <Link href="/adopt" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>
            Browse More Pets →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Apply to Adopt {pet.pet_name} — HamroPets</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, sans-serif', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>

        {/* NAV */}
        <nav style={{ background: '#fff', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, overflow: 'hidden', border: '2px solid #1A1A1A' }}>
                <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png" alt="HamroPets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontWeight: 900, fontSize: 16, color: '#1A1A1A' }}>HamroPets</span>
            </Link>
            <Link href={`/pet/${pet.id}`} style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', fontWeight: 700 }}>← Back to {pet.pet_name}</Link>
          </div>
        </nav>

        {/* PET HEADER */}
        <div style={{ background: '#1A3320', padding: '24px 20px', borderBottom: '3px solid #1A1A1A' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            {pet.images?.[0] && (
              <img src={pet.images[0]} alt={pet.pet_name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', border: '3px solid #FFD23F', flexShrink: 0 }} />
            )}
            <div>
              <div style={{ fontSize: 11, color: '#58CC02', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>🛡️ Priority Shield Application</div>
              <div style={{ fontWeight: 900, fontSize: 20, color: '#fff' }}>Apply to Adopt {pet.pet_name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{pet.breed || pet.species} · {pet.location}</div>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div style={{ background: '#fff', borderBottom: '2px solid #E5E7EB', padding: '12px 20px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 6 }}>
              {step === 1 ? 'Step 1 of 3 — Your Details' : step === 2 ? 'Step 2 of 3 — Your Home & Family' : 'Step 3 of 3 — Your Commitment'}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: step >= s ? '#58CC02' : '#E5E7EB', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '40px 20px 80px' }}>
          <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #1A1A1A', padding: isMobile ? '20px 16px' : '32px', boxShadow: '4px 4px 0px #1A1A1A' }}>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: '0 0 4px' }}>Tell us about yourself</h2>
                  <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 20px' }}>{pet.pet_name}'s owner will only see profiles we shortlist — so be honest.</p>
                </div>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Your full name" style={inputStyle} autoFocus />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Age *</label>
                    <input type="number" value={form.age} onChange={e => update('age', e.target.value)} placeholder="Must be 18+" style={inputStyle} min="18" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp *</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Your Area / Tole *</label>
                  <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Bhaisepati, Jhamsikhel, Naxal" style={inputStyle} />
                </div>
                <button onClick={() => { if (!form.fullName || !form.phone || !form.location) { alert('Please fill in all required fields.'); return } setStep(2) }} style={btnPrimary}>
                  Next — Your Home & Family →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: '0 0 4px' }}>Your home & family</h2>
                  <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 20px' }}>This helps us understand if {pet.pet_name} will thrive in your home.</p>
                </div>
                <div>
                  <label style={labelStyle}>Housing Type *</label>
                  {optionButtons('housingType', form.housingType, [
                    ['own_house', '🏠 Own house'],
                    ['rented_flat', '🏢 Rented flat / apartment'],
                    ['family_home', '👨‍👩‍👧 Living with family (their home)'],
                  ])}
                </div>
                {form.housingType === 'rented_flat' && (
                  <div>
                    <label style={labelStyle}>Does your landlord explicitly allow pets?</label>
                    {optionButtons('landlordConsent', form.landlordConsent, [
                      ['yes', '✅ Yes — confirmed'],
                      ['no', '❌ No'],
                      ['not_sure', '🤔 Not sure yet'],
                    ])}
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Do you have a walled compound or safe walking area nearby?</label>
                  {optionButtons('hasCompound', form.hasCompound, [
                    ['yes_compound', '✅ Yes — walled compound'],
                    ['yes_walking', '✅ Yes — safe park/walking area nearby'],
                    ['no', '❌ No — limited outdoor space'],
                  ])}
                </div>
                <div>
                  <label style={labelStyle}>Who do you live with?</label>
                  {optionButtons('householdType', form.householdType, [
                    ['alone', '🧍 I live alone'],
                    ['partner', '👫 Partner / spouse only'],
                    ['nuclear', '👨‍👩‍👧 Nuclear family (partner + kids)'],
                    ['joint', '👨‍👩‍👧‍👦 Joint family'],
                    ['roommates', '🏠 Roommates'],
                  ])}
                </div>
                <div>
                  <label style={labelStyle}>Is every person in your household aware and supportive of bringing {pet.pet_name} home?</label>
                  {optionButtons('familyConsensus', form.familyConsensus, [
                    ['yes_all', '✅ Yes — everyone is excited'],
                    ['mostly', '🤔 Most are — one or two are neutral'],
                    ['no', '❌ Not everyone knows yet'],
                  ])}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(1)} style={{ ...btnSecondary, flex: 1 }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ ...btnPrimary, flex: 2 }}>Next — Your Commitment →</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', margin: '0 0 4px' }}>Your commitment to {pet.pet_name}</h2>
                  <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 20px' }}>These questions help us understand if you are truly ready.</p>
                </div>
                <div>
                  <label style={labelStyle}>Have you owned a pet before?</label>
                  {optionButtons('previousPet', form.previousPet, [
                    ['yes_still_have', '✅ Yes — I still have them'],
                    ['yes_passed', '✅ Yes — they passed away naturally'],
                    ['yes_rehomed', '🔄 Yes — I had to rehome them'],
                    ['no', '🐾 No — this would be my first pet'],
                  ])}
                </div>
                {(form.previousPet === 'yes_rehomed' || form.previousPet === 'yes_passed') && (
                  <div>
                    <label style={labelStyle}>Tell us briefly what happened</label>
                    <textarea rows={2} value={form.previousPetDetail} onChange={e => update('previousPetDetail', e.target.value)} placeholder="Brief explanation..." style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                )}
                <div>
                  <label style={labelStyle}>What is your plan for {pet.pet_name} when you travel for Dashain or out-of-town events?</label>
                  <textarea rows={3} value={form.dashainPlan} onChange={e => update('dashainPlan', e.target.value)} placeholder="e.g. My sister will look after them / I will use a pet boarding service..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={labelStyle}>Quality pet food, vaccines and vet care cost roughly NPR 3,000–5,000+ per month. Are you prepared for this?</label>
                  {optionButtons('financialReady', form.financialReady, [
                    ['yes', '✅ Yes — I have budgeted for this'],
                    ['yes_researched', '✅ Yes — I have researched the costs'],
                    ['not_sure', '🤔 I am not fully sure yet'],
                  ])}
                </div>
                <div>
                  <label style={labelStyle}>Why do you want to adopt {pet.pet_name} specifically?</label>
                  <textarea rows={3} value={form.whyThisPet} onChange={e => update('whyThisPet', e.target.value)} placeholder={`Tell us why ${pet.pet_name} is the right fit for your family...`} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>

                {/* SUMMARY */}
                <div style={{ background: '#F9FAFB', borderRadius: 14, padding: '16px', border: '1.5px solid #E5E7EB' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#1A1A1A', marginBottom: 8 }}>📋 Your Application Summary</div>
                  {[
                    ['Name', form.fullName],
                    ['Phone', form.phone],
                    ['Location', form.location],
                    ['Housing', form.housingType?.replace(/_/g, ' ')],
                    ['Family', form.householdType?.replace(/_/g, ' ')],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}><strong style={{ color: '#1A1A1A' }}>{k}:</strong> {v}</div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setStep(2)} style={{ ...btnSecondary, flex: 1 }}>← Back</button>
                  <button onClick={handleSubmit} disabled={submitting} style={{ ...btnPrimary, flex: 2, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                    {submitting ? 'Submitting...' : `Submit Application for ${pet.pet_name} →`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
