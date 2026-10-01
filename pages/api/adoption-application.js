import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    petId, petName, fullName, age, phone, whatsapp, location,
    housingType, landlordConsent, hasCompound, householdType,
    familyConsensus, previousPet, previousPetDetail, dashainPlan,
    financialReady, whyThisPet,
  } = req.body

  if (!petId || !fullName || !phone || !location) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const { error } = await supabase
    .from('adoption_applications')
    .insert([{
      pet_id: petId,
      pet_name: petName,
      full_name: fullName,
      age: parseInt(age) || null,
      phone,
      whatsapp: whatsapp || phone,
      location,
      housing_type: housingType,
      landlord_consent: landlordConsent,
      has_compound: hasCompound,
      household_type: householdType,
      family_consensus: familyConsensus,
      previous_pet: previousPet,
      previous_pet_detail: previousPetDetail,
      dashain_plan: dashainPlan,
      financial_ready: financialReady,
      why_this_pet: whyThisPet,
      status: 'pending',
    }])

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true })
}
