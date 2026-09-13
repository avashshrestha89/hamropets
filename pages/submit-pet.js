import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// Translation dictionary
const translations = {
  en: {
    // Step 0
    welcome_title: "Submit a Pet for Adoption",
    welcome_subtitle: "Find a loving home for your pet — free, always.",
    lang_english: "Proceed in English",
    lang_nepali: "नेपालीमा अगाडि बढ्नुहोस्",
    // Step 1
    step1_progress: "Let's start with your pet",
    step1_species_label: "What kind of pet are you rehoming?",
    step1_name_label: "What is your pet's name?",
    step1_name_placeholder: "e.g. Bruno, Luna, Milo",
    step1_age_label: "How old are they?",
    step1_age_placeholder: "e.g. 2 years, 6 months",
    step1_next: "Next →",
    // Step 2
    step2_progress: (name) => `Show us ${name}'s best side 📸`,
    step2_photo_label: (name) => `Upload a clear photo of ${name}`,838
    step2_photo_hint: "JPG or PNG · Front facing photo works best",
    step2_upload_btn: "Click to upload photo",
    step2_replace: "Click to replace photo",
    step2_skip: "Skip for now →",
    step2_next: "Continue →",
    // Step 3
    step3_progress: (name) => `Help us understand ${name}'s situation`,
    step3_reason_intro: (name) => `Life sometimes takes unexpected turns. What's making you look for a new home for ${name}?`,
    step3_reasons: {
      abroad: "🌍 I'm moving abroad",
      landlord: "🏠 Landlord / housing doesn't allow pets",
      family: "👨‍👩‍👧 Family situation changed",
      health: "🩺 Health or allergies in the family",
      financial: "💰 I can no longer afford their care",
      time: "⏰ I don't have enough time for them",
      behaviour: "🐕 Behavioural challenges I'm struggling with",
      rescued: "🐾 This isn't my pet — I found or rescued them",
      other: "✍️ I'd rather explain in my own words",
      prefer_not: "⏭️ Prefer not to say",
    },
    step3_other_placeholder: "Tell us in your own words...",
    step3_validation: (name) => `Thank you for trusting us with that. Let's make a good plan for ${name}.`,
    step3_next: "Continue →",
    // Step 4
    step4_progress: (name) => `Getting to know ${name} 🐾`,
    step4_breed_label: "Breed",
    step4_breed_placeholder: "e.g. Labrador, Golden Retriever, Mixed breed",
    step4_vaccinated_label: "Vaccination status",
    step4_neutered_label: "Spayed / Neutered?",
    step4_yes: "Yes ✅",
    step4_no: "No ❌",
    step4_unknown: "Not sure",
    step4_next: "Continue →",
    // Step 5
    step5_progress: (name) => `What is ${name} like?`,
    step5_children_label: (name) => `Is ${name} friendly with children?`,
    step5_dogs_label: (name) => `Is ${name} friendly with other dogs?`,
    step5_description_label: (name) => `Describe ${name} in one honest sentence`,
    step5_description_placeholder: (name) => `e.g. ${name} is playful, loves fetch, good with kids...`,
    step5_description_hint: "One honest sentence beats a perfect paragraph.",
    step5_reason_label: "Why are you looking for a new home?",
    step5_reason_placeholder: "Please be honest — it helps find the right family",
    step5_next: "Continue →",
    // Step 6
    step6_progress: "Almost there — how can adopters reach you?",
    step6_name_label: "Your full name",
    step6_phone_label: "Your phone number",
    step6_phone_hint: "Only shared with verified adopters — never publicly",
    step6_whatsapp_label: "WhatsApp number",
    step6_whatsapp_hint: "If different from phone",
    step6_email_label: "Email address",
    step6_address_label: "Your area / location",
    step6_next: (name) => `See ${name}'s profile →`,
    // Step 7
    step7_generating: (name) => `Generating ${name}'s official profile...`,
    step7_ready: (name) => `${name}'s profile is ready.`,
    step7_launch: (name) => `How would you like to launch ${name}'s profile?`,
    step7_free_label: "🐾 Community Listing",
    step7_free_desc: "Free forever. No catch. Your pet will still be seen by thousands.",
    step7_boost_label: "🚀 Social Boost",
    step7_boost_desc: "TikTok + Instagram + Facebook video to 91K followers · Swor AI Nepali voiceover",
    step7_shield_label: "⭐ Priority Shield",
    step7_shield_desc: "Everything in Boost + Homepage featured 14 days + Phone privacy + 5-7 verified adopter profiles",
    step7_continue_free: "Continue with Free Listing",
    step7_submit_free: "Publish Bruno's Profile — Free",
    step7_submit_paid: (tier, price) => `Activate ${tier} — ${price}`,
    step7_payment_title: "Payment Instructions",
    step7_reassurance: "Every tier — free or paid — gets the same care from our team. Paid options just reach further, faster.",
    // Terms
    terms_title: "Terms & Agreement",
    terms_free: "Adoption is 100% free. No money should exchange hands.",
    terms_agree: "I agree to these terms ✅",
    terms_contact: "I agree to be contacted by Adopt a Dog Nepal",
    // General
    back: "← Back",
    uploading: "Uploading...",
    submitting: "Publishing...",
    submitted_title: (name) => `${name} is live! 🎉`,
    submitted_desc: "Our team will review and approve shortly.",
  },
  ne: {
    // Step 0
    welcome_title: "दत्तकको लागि पाल्तु जनावर पेश गर्नुहोस्",
    welcome_subtitle: "आफ्नो पाल्तु जनावरको लागि माया गर्ने घर खोज्नुहोस् — सधैं निःशुल्क।",
    lang_english: "Proceed in English",
    lang_nepali: "नेपालीमा अगाडि बढ्नुहोस्",
    // Step 1
    step1_progress: "आफ्नो पाल्तु जनावरबारे बताउनुहोस्",
    step1_species_label: "तपाईं कस्तो पाल्तु जनावर दत्तक दिन चाहनुहुन्छ?",
    step1_name_label: "तपाईंको पाल्तु जनावरको नाम के हो?",
    step1_name_placeholder: "जस्तै: ब्रुनो, लुना, मिलो",
    step1_age_label: "उनीहरूको उमेर कति छ?",
    step1_age_placeholder: "जस्तै: २ वर्ष, ६ महिना",
    step1_next: "अर्को →",
    // Step 2
    step2_progress: (name) => `${name} को सुन्दर फोटो देखाउनुहोस् 📸`,
    step2_photo_label: (name) => `${name} को स्पष्ट फोटो अपलोड गर्नुहोस्`,
    step2_photo_hint: "JPG वा PNG · अनुहार देखिने फोटो राम्रो हुन्छ",
    step2_upload_btn: "फोटो अपलोड गर्न क्लिक गर्नुहोस्",
    step2_replace: "फोटो फेर्न क्लिक गर्नुहोस्",
    step2_skip: "अहिलेलाई छोड्नुहोस् →",
    step2_next: "जारी राख्नुहोस् →",
    // Step 3
    step3_progress: (name) => `${name} को अवस्था बुझ्न मद्दत गर्नुहोस्`,
    step3_reason_intro: (name) => `जीवनले कहिलेकाहीं अप्रत्याशित मोड लिन्छ। ${name} को लागि नयाँ घर किन खोज्दै हुनुहुन्छ?`,
    step3_reasons: {
      abroad: "🌍 म विदेश जाँदैछु",
      landlord: "🏠 घरधनी / आवासले पाल्तु जनावर राख्न दिँदैन",
      family: "👨‍👩‍👧 पारिवारिक अवस्था परिवर्तन भयो",
      health: "🩺 परिवारमा स्वास्थ्य समस्या वा एलर्जी",
      financial: "💰 अब उनीहरूको हेरचाह गर्न सक्दिनँ",
      time: "⏰ उनीहरूलाई पर्याप्त समय दिन सक्दिनँ",
      behaviour: "🐕 व्यवहार सम्बन्धी चुनौतीहरू",
      rescued: "🐾 यो मेरो पाल्तु जनावर होइन — मैले भेट्टाएँ वा उद्धार गरेँ",
      other: "✍️ म आफ्नै शब्दमा बताउन चाहन्छु",
      prefer_not: "⏭️ नबताउन चाहन्छु",
    },
    step3_other_placeholder: "आफ्नै शब्दमा बताउनुहोस्...",
    step3_validation: (name) => `हामीलाई विश्वास गर्नुभएकोमा धन्यवाद। ${name} को लागि राम्रो योजना बनाऔं।`,
    step3_next: "जारी राख्नुहोस् →",
    // Step 4
    step4_progress: (name) => `${name} लाई चिन्दैछौं 🐾`,
    step4_breed_label: "नस्ल",
    step4_breed_placeholder: "जस्तै: ल्याब्राडोर, गोल्डेन रिट्रिभर, मिश्रित",
    step4_vaccinated_label: "खोपको अवस्था",
    step4_neutered_label: "बन्ध्याकरण गरिएको छ?",
    step4_yes: "छ ✅",
    step4_no: "छैन ❌",
    step4_unknown: "थाहा छैन",
    step4_next: "जारी राख्नुहोस् →",
    // Step 5
    step5_progress: (name) => `${name} कस्तो छ?`,
    step5_children_label: (name) => `${name} बच्चाहरूसँग मिल्छ?`,
    step5_dogs_label: (name) => `${name} अन्य कुकुरहरूसँग मिल्छ?`,
    step5_description_label: (name) => `${name} लाई एक इमानदार वाक्यमा वर्णन गर्नुहोस्`,
    step5_description_placeholder: (name) => `जस्तै: ${name} खेल्न मन पराउँछ, बच्चाहरूसँग राम्रो छ...`,
    step5_description_hint: "एक इमानदार वाक्य उत्तम अनुच्छेदभन्दा राम्रो हुन्छ।",
    step5_reason_label: "नयाँ घर किन खोज्दै हुनुहुन्छ?",
    step5_reason_placeholder: "कृपया इमानदार हुनुहोस् — यसले सही परिवार खोज्न मद्दत गर्छ",
    step5_next: "जारी राख्नुहोस् →",
    // Step 6
    step6_progress: "लगभग भयो — दत्तककर्ताले तपाईंलाई कसरी सम्पर्क गर्न सक्छन्?",
    step6_name_label: "तपाईंको पूरा नाम",
    step6_phone_label: "तपाईंको फोन नम्बर",
    step6_phone_hint: "केवल प्रमाणित दत्तककर्तासँग साझा — कहिल्यै सार्वजनिक होइन",
    step6_whatsapp_label: "WhatsApp नम्बर",
    step6_whatsapp_hint: "फोनभन्दा फरक भएमा",
    step6_email_label: "इमेल ठेगाना",
    step6_address_label: "तपाईंको क्षेत्र / स्थान",
    step6_next: (name) => `${name} को प्रोफाइल हेर्नुहोस् →`,
    // Step 7
    step7_generating: (name) => `${name} को आधिकारिक प्रोफाइल तयार गर्दैछौं...`,
    step7_ready: (name) => `${name} को प्रोफाइल तयार छ।`,
    step7_launch: (name) => `${name} को प्रोफाइल कसरी सुरु गर्न चाहनुहुन्छ?`,
    step7_free_label: "🐾 सामुदायिक सूचीकरण",
    step7_free_desc: "सधैं निःशुल्क। कुनै शर्त छैन। तपाईंको पाल्तु जनावर हजारौंले देख्नेछन्।",
    step7_boost_label: "🚀 सोसल बुस्ट",
    step7_boost_desc: "९१ हजार+ फलोअरलाई TikTok + Instagram + Facebook भिडियो · Swor AI नेपाली भ्वाइसओभर",
    step7_shield_label: "⭐ प्रायोरिटी शिल्ड",
    step7_shield_desc: "बुस्टका सबै सुविधा + १४ दिन होमपेजमा + फोन गोपनीयता + ५-७ प्रमाणित दत्तककर्ता",
    step7_continue_free: "निःशुल्क सूचीकरणसँग जारी राख्नुहोस्",
    step7_reassurance: "निःशुल्क होस् वा सशुल्क — हाम्रो टोलीले समान हेरचाह गर्छ। सशुल्क विकल्पले थप टाढासम्म, छिटो पुग्छ।",
    // Terms
    terms_title: "सर्तहरू र सहमति",
    terms_free: "दत्तक प्रक्रिया १००% निःशुल्क छ। पैसाको कुनै लेनदेन हुनु हुँदैन।",
    terms_agree: "म यी सर्तहरूमा सहमत छु ✅",
    terms_contact: "म Adopt a Dog Nepal द्वारा सम्पर्क गर्न सहमत छु",
    // General
    back: "← पछि",
    uploading: "अपलोड हुँदैछ...",
    submitting: "प्रकाशन हुँदैछ...",
    submitted_title: (name) => `${name} लाइभ छ! 🎉`,
    submitted_desc: "हाम्रो टोलीले छिट्टै समीक्षा गरी स्वीकृत गर्नेछ।",
  }
}

// Adaptive pitch based on reason
const getAdaptivePitch = (reason, name, lang) => {
  const pitches = {
    en: {
      abroad: `Your flight is booked — Priority Shield gets verified adopters for ${name} in days, not months.`,
      landlord: `Need a verified home quickly? Priority Shield accelerates the entire vetting process for ${name}.`,
      family: `Many families go through this. Let us reach the right family for ${name} fast.`,
      health: `We understand. Social Boost puts ${name} in front of 91K animal lovers immediately.`,
      financial: `You've already done so much for ${name}. NPR 299 gets them in front of 91K people this week.`,
      time: `A boost means ${name} finds the right home faster — less time managing inquiries for you.`,
      behaviour: `${name} needs the right match. Priority Shield helps us find verified, experienced adopters.`,
      rescued: `You've already done so much. NPR 599 gets ${name} in front of 91K people this week.`,
      other: `${name} can reach 91,000+ animal lovers on our TikTok and Instagram.`,
      prefer_not: `${name} can reach 91,000+ animal lovers on our TikTok and Instagram.`,
      default: `${name} can reach 91,000+ animal lovers on our TikTok and Instagram.`,
    },
    ne: {
      abroad: `तपाईंको उडान तय भइसक्यो — Priority Shield ले ${name} का लागि दिनभित्र प्रमाणित दत्तककर्ता खोज्छ।`,
      landlord: `छिटो प्रमाणित घर चाहिन्छ? Priority Shield ले ${name} को प्रक्रिया छिटो बनाउँछ।`,
      family: `धेरै परिवारले यस्तो अवस्था सामना गर्छन्। ${name} को लागि सही परिवार छिटो खोजौं।`,
      health: `हामी बुझ्छौं। Social Boost ले ${name} लाई ९१ हजार+ पशु प्रेमीसामु राख्छ।`,
      financial: `तपाईंले ${name} को लागि धेरै गर्नुभयो। NPR २९९ ले यही हप्ता ९१ हजारसामु पुर्‍याउँछ।`,
      time: `Boost ले ${name} छिटो सही घर पाउँछ — तपाईंले कम सोधपुछ व्यवस्थापन गर्नुपर्छ।`,
      behaviour: `${name} लाई सही मिलान चाहिन्छ। Priority Shield ले अनुभवी दत्तककर्ता खोज्छ।`,
      rescued: `तपाईंले धेरै गर्नुभयो। NPR ५९९ ले ${name} लाई यही हप्ता ९१ हजारसामु पुर्‍याउँछ।`,
      other: `${name} हाम्रो TikTok र Instagram मार्फत ९१,००० + पशु प्रेमीसम्म पुग्न सक्छ।`,
      prefer_not: `${name} हाम्रो TikTok र Instagram मार्फत ९१,००० + पशु प्रेमीसम्म पुग्न सक्छ।`,
      default: `${name} हाम्रो TikTok र Instagram मार्फत ९१,००० + पशु प्रेमीसम्म पुग्न सक्छ।`,
    }
  }
  return pitches[lang][reason] || pitches[lang].default
}

export default function SubmitPet() {
  const [lang, setLang] = useState(null) // null = Step 0
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showGenerating, setShowGenerating] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [boostTier, setBoostTier] = useState('free')
  const [isMobile, setIsMobile] = useState(false)
  const [form, setForm] = useState({
    species: '',
    petName: '',
    petAge: '',
    reason: '',
    reasonOther: '',
    breed: '',
    vaccinated: '',
    neutered: '',
    friendlyChildren: '',
    friendlyDogs: '',
    description: '',
    reasonForAdoption: '',
    ownerName: '',
    ownerPhone: '',
    ownerWhatsapp: '',
    ownerEmail: '',
    ownerAddress: '',
    agreeTerms: false,
    agreeContact: false,
  })

  const t = (key, ...args) => {
    const val = translations[lang || 'en'][key]
    if (typeof val === 'function') return val(...args)
    return val || key
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const petName = form.petName || (lang === 'ne' ? 'तपाईंको पाल्तु जनावर' : 'your pet')

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const maxSize = 1000
        let w = img.width, h = img.height
        if (w > maxSize || h > maxSize) {
          if (w > h) { h = (h / w) * maxSize; w = maxSize }
          else { w = (w / h) * maxSize; h = maxSize }
        }
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })), 'image/jpeg', 0.7)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }

  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setImageFile(file)
  }

  const uploadImage = async (file) => {
    const processed = await compressImage(file)
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: e.target.result, folder: 'pets', resourceType: 'image' }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error || 'Upload failed')
          resolve(data.url)
        } catch (err) { reject(err) }
      }
      reader.onerror = () => reject(new Error('File read failed'))
      reader.readAsDataURL(processed)
    })
  }

  const goToStep7 = () => {
    setShowGenerating(true)
    setTimeout(() => {
      setShowGenerating(false)
      setStep(7)
    }, 2000)
  }

  const handleSubmit = async () => {
    if (!form.agreeTerms || !form.agreeContact) {
      alert(lang === 'ne' ? 'कृपया दुवै सर्तहरूमा सहमत हुनुहोला।' : 'Please agree to both terms before submitting.')
      return
    }
    setSubmitting(true)
    try {
      let uploadedUrl = imageUrl
      if (imageFile && !imageUrl) {
        setUploading(true)
        uploadedUrl = await uploadImage(imageFile)
        setImageUrl(uploadedUrl)
        setUploading(false)
      }
      if (boostTier !== 'free') {
        const amount = boostTier === 'boost' ? 'NPR 299' : 'NPR 599'
        const tierName = boostTier === 'boost' ? 'Social Boost' : 'Priority Shield'
        const msg = encodeURIComponent(`Hi HamroPets! I want to activate ${tierName} (${amount}) for ${petName}.\n\nSpecies: ${form.species}\nLocation: ${form.ownerAddress}\nContact: ${form.ownerName} — ${form.ownerPhone}\n\nSending payment to 9851221428 now.`)
        const res = await fetch('/api/submit-pet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            petName: form.petName, breed: form.breed, species: form.species,
            gender: '', ageYears: '', ageMonths: '', petAge: form.petAge,
            location: form.ownerAddress, vaccinated: form.vaccinated === 'yes',
            neutered: form.neutered === 'yes', friendlyChildren: form.friendlyChildren,
            friendlyDogs: form.friendlyDogs, description: form.description,
            reasonForAdoption: form.reasonForAdoption || form.reason,
            submitterName: form.ownerName, phone: form.ownerPhone,
            whatsapp: form.ownerWhatsapp, email: form.ownerEmail,
            address: form.ownerAddress, images: uploadedUrl ? [uploadedUrl] : [],
            videoUrl: null, boostTier, status: 'pending_payment',
          }),
        })
        if (res.ok) {
          setSubmitted(true)
          window.open(`https://wa.me/9779851405178?text=${msg}`, '_blank')
        }
      } else {
        const res = await fetch('/api/submit-pet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            petName: form.petName, breed: form.breed, species: form.species,
            gender: '', ageYears: '', ageMonths: '', petAge: form.petAge,
            location: form.ownerAddress, vaccinated: form.vaccinated === 'yes',
            neutered: form.neutered === 'yes', friendlyChildren: form.friendlyChildren,
            friendlyDogs: form.friendlyDogs, description: form.description,
            reasonForAdoption: form.reasonForAdoption || form.reason,
            submitterName: form.ownerName, phone: form.ownerPhone,
            whatsapp: form.ownerWhatsapp, email: form.ownerEmail,
            address: form.ownerAddress, images: uploadedUrl ? [uploadedUrl] : [],
            videoUrl: null, boostTier,
          }),
        })
        if (res.ok) setSubmitted(true)
        else alert('Something went wrong. Please try again.')
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
    setSubmitting(false)
  }

  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', background: '#fff' }
  const labelStyle = { fontSize: 13, fontWeight: 800, color: '#1A1A1A', display: 'block', marginBottom: 8 }

  // LIVE PREVIEW CARD
  const PreviewCard = () => (
    <div style={{ background: '#fff', borderRadius: 20, border: '3px solid #1A1A1A', overflow: 'hidden', boxShadow: '6px 6px 0px #1A1A1A' }}>
      <div style={{ height: 200, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '3px solid #1A1A1A', position: 'relative' }}>
        {imagePreview ? (
          <img src={imagePreview} alt={petName} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#F9FAFB' }} />
        ) : (
          <div style={{ fontSize: 64 }}>{form.species === 'Dog' ? '🐕' : form.species === 'Cat' ? '🐈' : form.species === 'Bird' ? '🐦' : '🐾'}</div>
        )}
        <div style={{ position: 'absolute', top: 10, left: 10, background: '#58CC02', color: '#fff', fontSize: 10, fontWeight: 900, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>
          {lang === 'ne' ? 'दत्तकको लागि उपलब्ध' : 'Available for Adoption'}
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: '#1A1A1A', marginBottom: 4 }}>
          {form.petName || (lang === 'ne' ? 'नाम...' : 'Name...')}
        </div>
        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
          {[form.breed, form.species, form.petAge].filter(Boolean).join(' · ') || (lang === 'ne' ? 'विवरण आउँदैछ...' : 'Details coming...')}
        </div>
        {form.description && (
          <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 10, fontStyle: 'italic' }}>"{form.description}"</div>
        )}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {form.vaccinated === 'yes' && <span style={{ background: '#E8F9ED', color: '#166534', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #166534' }}>💉 Vaccinated</span>}
          {form.neutered === 'yes' && <span style={{ background: '#E8F9ED', color: '#166534', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #166534' }}>✂️ Neutered</span>}
          {form.friendlyChildren === 'yes' && <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, border: '1.5px solid #1D4ED8' }}>👶 Kid-friendly</span>}
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#F9FAFB', borderRadius: 10, fontSize: 12, color: '#6B7280' }}>
          📍 {form.ownerAddress || (lang === 'ne' ? 'स्थान...' : 'Location...')}
        </div>
      </div>
    </div>
  )

  // STEP 0 — LANGUAGE SELECTION
  if (!lang) {
    return (
      <>
        <Head>
          <title>Submit a Pet for Adoption — HamroPets</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
              <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png" alt="HamroPets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#1A1A1A', letterSpacing: -0.5 }}>HamroPets</div>
              <div style={{ fontSize: 10, color: '#58CC02', fontWeight: 800 }}>NEPAL'S PET HOME</div>
            </div>
          </Link>

          <div style={{ textAlign: 'center', marginBottom: 40, maxWidth: 480 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🐾</div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', margin: '0 0 8px' }}>Welcome to HamroPets</h1>
            <p style={{ fontSize: 16, color: '#6B7280', margin: 0, fontWeight: 500 }}>हाम्रो पेट्समा स्वागत छ। हामी तपाईंलाई मद्दत गर्न यहाँ छौँ।</p>
          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 16, width: '100%', maxWidth: 480 }}>
            <button onClick={() => { setLang('en'); setStep(1) }} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '20px 24px', borderRadius: 16, border: '3px solid #1A1A1A', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '4px 4px 0px #1A1A1A', textAlign: 'center' }}>
              🇬🇧 Proceed in English
            </button>
            <button onClick={() => { setLang('ne'); setStep(1) }} style={{ flex: 1, background: '#58CC02', color: '#fff', padding: '20px 24px', borderRadius: 16, border: '3px solid #1A1A1A', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '4px 4px 0px #166534', textAlign: 'center' }}>
              🇳🇵 नेपालीमा अगाडि बढ्नुहोस्
            </button>
          </div>

          <div style={{ marginTop: 24, fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>
            Basic rehoming is always completely free · निःशुल्क सूचीकरण सधैं उपलब्ध
          </div>
        </div>
      </>
    )
  }

  // SUBMITTED
  if (submitted) {
    return (
      <>
        <Head><title>Submitted — HamroPets</title></Head>
        <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: 520 }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1A1A1A', marginBottom: 12 }}>{t('submitted_title', petName)}</h1>
            <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 32 }}>{t('submitted_desc')}</p>
            <Link href="/" style={{ background: '#58CC02', color: '#fff', padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 900, textDecoration: 'none', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A', display: 'inline-block' }}>← {lang === 'ne' ? 'गृहपृष्ठमा फर्कनुहोस्' : 'Back to Home'}</Link>
          </div>
        </div>
      </>
    )
  }

  // GENERATING SCREEN (mobile step 7 reveal)
  if (showGenerating) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 24, animation: 'pulse 1s infinite' }}>🐾</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', textAlign: 'center' }}>{t('step7_generating', petName)}</div>
        <div style={{ marginTop: 20, display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 999, background: '#58CC02', opacity: 0.4 }} />
          ))}
        </div>
      </div>
    )
  }

  // MAIN FORM LAYOUT
  const FormContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* STEP 1 — SPECIES, NAME, AGE */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={labelStyle}>{t('step1_species_label')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[['Dog', '🐕'], ['Cat', '🐈'], ['Bird', '🐦'], ['Rabbit', '🐇'], ['Other', '🐾']].map(([val, emoji]) => (
                <button key={val} onClick={() => update('species', val)} style={{ padding: '14px', borderRadius: 14, border: `2.5px solid ${form.species === val ? '#58CC02' : '#E5E7EB'}`, background: form.species === val ? '#E8F9ED' : '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, boxShadow: form.species === val ? '3px 3px 0px #166534' : 'none' }}>
                  <span style={{ fontSize: 28 }}>{emoji}</span>
                  <span>{val}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t('step1_name_label')}</label>
            <input value={form.petName} onChange={e => update('petName', e.target.value)} placeholder={t('step1_name_placeholder')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('step1_age_label')}</label>
            <input value={form.petAge} onChange={e => update('petAge', e.target.value)} placeholder={t('step1_age_placeholder')} style={inputStyle} />
          </div>
          <button onClick={() => { if (!form.species || !form.petName) { alert(lang === 'ne' ? 'कृपया प्रजाति र नाम भर्नुहोस्।' : 'Please select species and enter name.'); return } setStep(2) }} style={{ background: '#58CC02', color: '#fff', padding: '15px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 16, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>
            {t('step1_next')}
          </button>
        </div>
      )}

      {/* STEP 2 — PHOTO */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 15, color: '#374151', fontWeight: 500, lineHeight: 1.6 }}>
            {lang === 'ne' ? `${petName} को फोटो अपलोड गर्दा दत्तककर्ताले उनीहरूलाई तुरुन्त माया गर्छन्। 📸` : `A photo of ${petName} helps adopters fall in love immediately. 📸`}
          </div>
          <div>
            <label style={labelStyle}>{t('step2_photo_label', petName)}</label>
            <div style={{ position: 'relative', border: `3px dashed ${imagePreview ? '#58CC02' : '#1A1A1A'}`, borderRadius: 16, padding: '32px', textAlign: 'center', background: imagePreview ? '#E8F9ED' : '#FAFAFA', cursor: 'pointer' }}>
              <input type="file" accept="image/*" onChange={handleImageSelect} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt={petName} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 14, border: '3px solid #1A1A1A', marginBottom: 10 }} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#58CC02' }}>{petName} {lang === 'ne' ? 'को फोटो राम्रो छ! साँच्चै।' : 'looks great in that photo. Seriously.'} ✅</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{t('step2_replace')}</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A', marginBottom: 4 }}>{t('step2_upload_btn')}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{t('step2_photo_hint')}</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
            <button onClick={() => setStep(3)} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>
              {imagePreview ? t('step2_next') : t('step2_skip')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — REASON */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 15, color: '#374151', fontWeight: 500, lineHeight: 1.7, padding: '16px', background: '#FFF9E6', borderRadius: 14, border: '1.5px solid #FFD23F' }}>
            {t('step3_reason_intro', petName)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(translations[lang].step3_reasons).map(([key, label]) => (
              <button key={key} onClick={() => update('reason', key)} style={{ padding: '14px 16px', borderRadius: 14, border: `2px solid ${form.reason === key ? '#1A1A1A' : '#E5E7EB'}`, background: form.reason === key ? '#F9FAFB' : '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: form.reason === key ? 800 : 500, textAlign: 'left', boxShadow: form.reason === key ? '3px 3px 0px #1A1A1A' : 'none' }}>
                {label}
              </button>
            ))}
          </div>
          {form.reason === 'other' && (
            <textarea rows={3} value={form.reasonOther} onChange={e => update('reasonOther', e.target.value)} placeholder={t('step3_other_placeholder')} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          )}
          {form.reason && (
            <div style={{ background: '#E8F9ED', borderRadius: 12, padding: '14px 16px', border: '1.5px solid #58CC02', fontSize: 14, color: '#166534', fontWeight: 600, lineHeight: 1.6 }}>
              ❤️ {t('step3_validation', petName)}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
            <button onClick={() => { if (!form.reason) { alert(lang === 'ne' ? 'कृपया एउटा विकल्प छान्नुहोस्।' : 'Please select a reason.'); return } setStep(4) }} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>
              {t('step3_next')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — THEIR STORY */}
      {step === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('step4_breed_label')}</label>
            <input value={form.breed} onChange={e => update('breed', e.target.value)} placeholder={t('step4_breed_placeholder')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('step4_vaccinated_label')}</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['yes', t('step4_yes')], ['no', t('step4_no')], ['unknown', t('step4_unknown')]].map(([val, label]) => (
                <button key={val} onClick={() => update('vaccinated', val)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `2px solid ${form.vaccinated === val ? '#1A1A1A' : '#E5E7EB'}`, background: form.vaccinated === val ? '#1A1A1A' : '#fff', color: form.vaccinated === val ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t('step4_neutered_label')}</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['yes', t('step4_yes')], ['no', t('step4_no')], ['unknown', t('step4_unknown')]].map(([val, label]) => (
                <button key={val} onClick={() => update('neutered', val)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `2px solid ${form.neutered === val ? '#1A1A1A' : '#E5E7EB'}`, background: form.neutered === val ? '#1A1A1A' : '#fff', color: form.neutered === val ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(3)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
            <button onClick={() => setStep(5)} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>
              {t('step4_next')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 — PERSONALITY */}
      {step === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('step5_children_label', petName)}</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['yes', t('step4_yes')], ['no', t('step4_no')], ['unknown', t('step4_unknown')]].map(([val, label]) => (
                <button key={val} onClick={() => update('friendlyChildren', val)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `2px solid ${form.friendlyChildren === val ? '#1A1A1A' : '#E5E7EB'}`, background: form.friendlyChildren === val ? '#1A1A1A' : '#fff', color: form.friendlyChildren === val ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t('step5_dogs_label', petName)}</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['yes', t('step4_yes')], ['no', t('step4_no')], ['unknown', t('step4_unknown')]].map(([val, label]) => (
                <button key={val} onClick={() => update('friendlyDogs', val)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: `2px solid ${form.friendlyDogs === val ? '#1A1A1A' : '#E5E7EB'}`, background: form.friendlyDogs === val ? '#1A1A1A' : '#fff', color: form.friendlyDogs === val ? '#fff' : '#6B7280', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t('step5_description_label', petName)}</label>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>{t('step5_description_hint')}</div>
            <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} placeholder={t('step5_description_placeholder', petName)} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <div>
            <label style={labelStyle}>{t('step5_reason_label')}</label>
            <textarea rows={3} value={form.reasonForAdoption} onChange={e => update('reasonForAdoption', e.target.value)} placeholder={t('step5_reason_placeholder')} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          {form.description && (
            <div style={{ background: '#EFF6FF', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#1D4ED8', fontWeight: 600 }}>
              ✨ {lang === 'ne' ? `${petName} एकदम राम्रो साथी लाग्छ। कोही बाहिर उनीहरूलाई खोज्दैछन्।` : `Sounds like a wonderful companion. Someone out there is looking for exactly this.`}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(4)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
            <button onClick={() => { if (!form.description) { alert(lang === 'ne' ? `कृपया ${petName} को बारेमा एक वाक्य लेख्नुहोस्।` : `Please describe ${petName} in one sentence.`); return } setStep(6) }} style={{ flex: 2, background: '#58CC02', color: '#fff', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #166534' }}>
              {t('step5_next')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 — YOUR DETAILS */}
      {step === 6 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('step6_name_label')}</label>
            <input value={form.ownerName} onChange={e => update('ownerName', e.target.value)} placeholder="Full name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('step6_phone_label')}</label>
            <input type="tel" value={form.ownerPhone} onChange={e => update('ownerPhone', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{t('step6_phone_hint')}</div>
          </div>
          <div>
            <label style={labelStyle}>{t('step6_whatsapp_label')}</label>
            <input type="tel" value={form.ownerWhatsapp} onChange={e => update('ownerWhatsapp', e.target.value)} placeholder="98XXXXXXXX" style={inputStyle} />
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{t('step6_whatsapp_hint')}</div>
          </div>
          <div>
            <label style={labelStyle}>{t('step6_email_label')}</label>
            <input type="email" value={form.ownerEmail} onChange={e => update('ownerEmail', e.target.value)} placeholder="your@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('step6_address_label')}</label>
            <input value={form.ownerAddress} onChange={e => update('ownerAddress', e.target.value)} placeholder="e.g. Lalitpur, Kathmandu" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(5)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
            <button onClick={() => { if (!form.ownerName || !form.ownerPhone) { alert(lang === 'ne' ? 'कृपया नाम र फोन नम्बर भर्नुहोस्।' : 'Please enter your name and phone number.'); return } goToStep7() }} style={{ flex: 2, background: '#1A1A1A', color: '#FFD23F', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #555' }}>
              {t('step6_next', petName)}
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 — PROFILE REVEAL + TIER SELECTION */}
      {step === 7 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Mobile: show full profile card as reveal */}
          {isMobile && (
            <div style={{ marginBottom: 8 }}>
              <PreviewCard />
            </div>
          )}

          <div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#1A1A1A', marginBottom: 4 }}>{t('step7_ready', petName)}</div>
            <div style={{ fontSize: 15, color: '#6B7280', fontWeight: 500, marginBottom: 16 }}>{t('step7_launch', petName)}</div>

            {/* Adaptive pitch */}
            <div style={{ background: '#FFF9E6', borderRadius: 14, padding: '14px 16px', border: '2px solid #FFD23F', marginBottom: 20, fontSize: 14, color: '#92400E', fontWeight: 600, lineHeight: 1.6 }}>
              💡 {getAdaptivePitch(form.reason, petName, lang)}
            </div>

            {/* Tier cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { id: 'free', label: t('step7_free_label'), desc: t('step7_free_desc'), price: 'NPR 0', color: '#58CC02', shadow: '#166534' },
                { id: 'boost', label: t('step7_boost_label'), desc: t('step7_boost_desc'), price: 'NPR 299', color: '#38BDF8', shadow: '#0284C7', badge: lang === 'ne' ? 'धेरैले रोजेको' : 'Most chosen' },
                { id: 'shield', label: t('step7_shield_label'), desc: t('step7_shield_desc'), price: 'NPR 599', color: '#FFD23F', shadow: '#B45309' },
              ].map(tier => (
                <div key={tier.id} onClick={() => setBoostTier(tier.id)} style={{ background: boostTier === tier.id ? `${tier.color}18` : '#FAFAFA', borderRadius: 14, padding: '14px 16px', border: `2.5px solid ${boostTier === tier.id ? tier.color : '#E5E7EB'}`, cursor: 'pointer', boxShadow: boostTier === tier.id ? `3px 3px 0px ${tier.shadow}` : 'none', position: 'relative', transition: 'all 0.2s' }}>
                  {tier.badge && <div style={{ position: 'absolute', top: -10, left: 16, background: '#FF6B35', color: '#fff', fontSize: 10, fontWeight: 900, padding: '2px 10px', borderRadius: 999, border: '1.5px solid #1A1A1A' }}>🔥 {tier.badge}</div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 900, fontSize: 14, color: '#1A1A1A' }}>{tier.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 900, fontSize: 15, color: tier.id === 'free' ? '#58CC02' : '#1A1A1A' }}>{tier.price}</span>
                      <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${boostTier === tier.id ? tier.color : '#D1D5DB'}`, background: boostTier === tier.id ? tier.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {boostTier === tier.id && <div style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{tier.desc}</div>
                </div>
              ))}
            </div>

            {/* Payment instructions for paid tiers */}
            {(boostTier === 'boost' || boostTier === 'shield') && (
              <div style={{ background: '#FFF9E6', borderRadius: 12, padding: '14px 16px', border: '2px solid #FFD23F', marginBottom: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#1A1A1A', marginBottom: 6 }}>💳 {lang === 'ne' ? 'भुक्तानी' : 'Payment'}</div>
                <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.8 }}>
                  {lang === 'ne' ? 'रकम' : 'Amount'}: <strong>{boostTier === 'boost' ? 'NPR 299' : 'NPR 599'}</strong><br />
                  eSewa / Khalti: <strong>9851221428</strong><br />
                  WhatsApp: <strong>9851405178</strong><br />
                  <span style={{ fontSize: 11, color: '#6B7280' }}>{lang === 'ne' ? 'भुक्तानी पछि screenshot पठाउनुहोस्। हामी २-४ घण्टाभित्र activate गर्छौं।' : 'Send payment screenshot to WhatsApp. We activate within 2-4 hours.'}</span>
                </div>
              </div>
            )}

            {/* Terms */}
            <div style={{ background: '#F9FAFB', borderRadius: 14, padding: '16px', border: '1.5px solid #E5E7EB', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>{t('terms_title')}</div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 10 }}>
                <input type="checkbox" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#58CC02', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{t('terms_free')} — {t('terms_agree')}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.agreeContact} onChange={e => update('agreeContact', e.target.checked)} style={{ width: 18, height: 18, accentColor: '#58CC02', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{t('terms_contact')} ✅</span>
              </label>
            </div>

            <div style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginBottom: 16 }}>{t('step7_reassurance')}</div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(6)} style={{ flex: 1, background: '#fff', color: '#1A1A1A', padding: '13px', borderRadius: 14, border: '2px solid #1A1A1A', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>{t('back')}</button>
              <button onClick={handleSubmit} disabled={submitting} style={{ flex: 2, background: boostTier === 'free' ? '#FF6B35' : '#FFD23F', color: boostTier === 'free' ? '#fff' : '#1A1A1A', padding: '13px', borderRadius: 14, border: '2.5px solid #1A1A1A', fontSize: 15, fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '3px 3px 0px #1A1A1A', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? t('submitting') : boostTier === 'free' ? `Publish ${petName}'s Profile — Free` : `Activate ${boostTier === 'boost' ? 'Social Boost' : 'Priority Shield'} — ${boostTier === 'boost' ? 'NPR 299' : 'NPR 599'}`}
              </button>
            </div>

            {boostTier !== 'free' && (
              <button onClick={() => setBoostTier('free')} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', marginTop: 8, display: 'block', textAlign: 'center', width: '100%' }}>
                {t('step7_continue_free')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )

  // PROGRESS LABELS
  const progressLabels = {
    1: t('step1_progress'),
    2: t('step2_progress', petName),
    3: t('step3_progress', petName),
    4: t('step4_progress', petName),
    5: t('step5_progress', petName),
    6: t('step6_progress'),
    7: t('step7_ready', petName),
  }

  return (
    <>
      <Head>
        <title>Submit a Pet for Adoption — HamroPets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'system-ui, sans-serif' }}>

        {/* NAV */}
        <nav style={{ background: '#fff', borderBottom: '3px solid #1A1A1A', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px', height: isMobile ? 60 : 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: isMobile ? 34 : 42, height: isMobile ? 34 : 42, borderRadius: 10, overflow: 'hidden', border: '2.5px solid #1A1A1A', boxShadow: '3px 3px 0px #1A1A1A' }}>
                <img src="https://elfqryasvlhawhrlwhvn.supabase.co/storage/v1/object/public/hamropets-media/ChatGPT%20Image%20Sep%209,%202026,%2012_25_32%20PM.png" alt="HamroPets" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: isMobile ? 16 : 22, color: '#1A1A1A' }}>HamroPets</div>
                <div style={{ fontSize: 9, color: '#58CC02', fontWeight: 800 }}>NEPAL'S PET HOME</div>
              </div>
            </Link>
            {/* Language toggle */}
            <div style={{ display: 'flex', gap: 4, background: '#F3F4F6', borderRadius: 999, padding: 4, border: '1.5px solid #1A1A1A' }}>
              {['en', 'ne'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: '5px 12px', borderRadius: 999, border: 'none', background: lang === l ? '#1A1A1A' : 'transparent', color: lang === l ? '#fff' : '#6B7280', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {l === 'en' ? 'EN' : 'ने'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* PROGRESS BAR */}
        <div style={{ background: '#fff', borderBottom: '2px solid #E5E7EB', padding: isMobile ? '12px 16px' : '14px 28px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{progressLabels[step]}</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5, 6, 7].map(s => (
                <div key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: step >= s ? '#58CC02' : '#E5E7EB', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '40px 28px 80px' }}>
          {!isMobile && step >= 1 && step <= 6 ? (
            // Desktop: 60/40 split with live preview
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'start' }}>
              <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #1A1A1A', padding: '32px', boxShadow: '4px 4px 0px #1A1A1A' }}>
                <FormContent />
              </div>
              <div style={{ position: 'sticky', top: 100 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                  {lang === 'ne' ? `${petName} को प्रोफाइल` : `${petName}'s Profile Preview`}
                </div>
                <PreviewCard />
                <div style={{ marginTop: 12, fontSize: 12, color: '#9CA3AF', textAlign: 'center', fontStyle: 'italic' }}>
                  {lang === 'ne' ? 'तपाईं भर्दा प्रोफाइल अपडेट हुन्छ' : 'Updates as you fill in details'}
                </div>
              </div>
            </div>
          ) : (
            // Mobile OR Step 7: full width
            <div style={{ maxWidth: step === 7 ? 680 : 560, margin: '0 auto', background: '#fff', borderRadius: 20, border: '2px solid #1A1A1A', padding: isMobile ? '20px 16px' : '32px', boxShadow: '4px 4px 0px #1A1A1A' }}>
              <FormContent />
            </div>
          )}
        </div>

      </div>
    </>
  )
}
