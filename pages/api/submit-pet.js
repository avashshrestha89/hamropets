const { data, error } = await supabase
  .from('pet_listings')
  .insert([{
    pet_name: petName,
    breed: breed || null,
    species: species?.toLowerCase(),
    gender: gender?.toLowerCase(),
    age_years: parseInt(ageYears) || 0,
    age_months: parseInt(ageMonths) || 0,
    pet_age: req.body.petAge || null,
    location: req.body.address || location,
    vaccinated: vaccinated || false,
    neutered: neutered || false,
    description,
    submitter_name: submitterName,
    submitter_phone: phone,
    submitter_whatsapp: req.body.whatsapp || null,
    submitter_email: email || null,
    submitter_address: req.body.address || null,
    friendly_children: req.body.friendlyChildren || null,
    friendly_dogs: req.body.friendlyDogs || null,
    reason_for_adoption: req.body.reasonForAdoption || null,
    other_info: req.body.otherInfo || null,
    status: 'pending',
    images: req.body.images || [],
    video_url: req.body.videoUrl || null,
  }])
  .select()
