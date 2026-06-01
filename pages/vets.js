import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Vets() {
  const [category, setCategory] = useState('All')

  const vets = [
    { name: 'Kathmandu Veterinary Hospital', cat: 'Vets', area: 'Maharajgunj', emoji: '🏥', color: '#FF6B35', rating: '4.9', phone: '01-4521234', tier: 'featured', desc: 'Full service veterinary hospital with emergency care' },
    { name: 'Paws & Claws Grooming Studio', cat: 'Groomers', area: 'Thamel', emoji: '✂️', color: '#7B5EA7', rating: '4.8', phone: '98XXXXXXXX', tier: 'featured', desc: 'Professional grooming for all breeds' },
    { name: 'Happy Paws Pet Boarding', cat: 'Boarding', area: 'Budhanilkantha', emoji: '🏠', color: '#38BDF8', rating: '4.7', phone: '98XXXXXXXX', tier: 'featured', desc: 'Safe and comfortable boarding for your pets' },
    { name: 'K9 Training Nepal', cat: 'Trainers', area: 'Baneshwor', emoji: '🎓', color: '#56C271', rating: '4.9', phone: '98XXXXXXXX', tier: 'verified', desc: 'Certified dog trainers with 10+ years experience' },
    { name: 'Lalitpur Animal Clinic', cat: 'Vets', area: 'Patan', emoji: '🏥', color: '#FF6B35', rating: '4.6', phone: '01-5XXXXXX', tier: 'verified', desc: 'Trusted vet clinic serving Lalitpur since 2010' },
    { name: 'Pet Paradise Shop', cat: 'Pet Shops', area: 'New Road', emoji: '🛒', color: '#56C271', rating: '4.5', phone: '01-4XXXXXX', tier: 'basic', desc: 'Wide range of pet food, accessories and toys' },
    { name: 'Bhaktapur Pet Clinic', cat: 'Vets', area: 'Bhaktapur', emoji: '🏥', color: '#FF6B35', rating: '4.7', phone: '01-6XXXXXX', tier: 'verified', desc: 'Serving Bhaktapur and surrounding areas' },
    { name: 'Fluffy Grooming Salon', cat: 'Groomers', area: 'Pulchowk', emoji: '✂️', color: '#7B5EA7', rating: '4.6', phone: '98XXXXXXXX', tier: 'basic', desc: 'Affordable grooming services in Lalitpur' },
    { name: 'Pokhara Pet Care', cat: 'Vets', area: 'Pokhara', emoji: '🏥', color: '#FF6B35', rating: '4.8', phone: '061-XXXXXX', tier: 'verified', desc: 'Premier pet care in the lake city' },
  ]

  const filtered = category === 'All' ? vets : vets.filter(v => v.cat === category)
  const featured = filtered.filter(v => v.tier === 'featured')
  const rest = filtered.filter(v => v.tier !== 'featured')

  return (
    <>
      <Head>
        <title>Vets & Pet Services — HamroPets</title>
        <meta name="description" content="Find verified vets, groomers, boarding and pet services across Nepal." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FFFBF5' }}>

        {/* NAV */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', borderBottom: '2px solid #EDE8F5', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B35, #FFD23F)', di
