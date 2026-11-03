// Tiers that hide the owner's phone, WhatsApp, name and address on public pages.
// 'boost_private' = Social Boost + the Private Contact add-on.
export const PRIVATE_TIERS = ['shield', 'private', 'boost_private']
export const hidesContact = (tier) => PRIVATE_TIERS.includes(tier)
