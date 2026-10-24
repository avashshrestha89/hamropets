# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

HamroPets is "Nepal's first dedicated pet platform": pet adoption, lost & found, dog walkers/sitters, vet directory, and business listings.

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint`

There is no test suite and no ESLint config checked in.

## Architecture

Next.js 13.5 **Pages Router**, plain JavaScript (no TypeScript), Tailwind CSS. There is no `components/` directory, no shared lib, and no `src/`: everything lives in `pages/`, and each page is a large self-contained file with its own inline UI (e.g. `pages/index.js` ~1100 lines, `pages/admin.js` ~950). Expect duplication across pages rather than shared helpers.

**Backend is Supabase, accessed directly from each file.** Every page and API route calls `createClient(...)` at module top. There's no central client.
- Public pages read data in `getServerSideProps` (`index`, `adopt`, `vets`, `walk-sit`, `pet/[id]`, `walker/[id]`, `lost-found/[id]`, `adopt/apply/[petId]`).
- Public form submissions go to `pages/api/*.js` (`submit-pet`, `adoption-application`, `apply-walker`, `book-walker`, `lost-found`, `list-business`, `collaborate`), which insert rows with `pending` status and email the admin via Resend.
- Moderation happens in `pages/admin.js`, which calls `pages/api/admin/*` routes (list / update / delete per entity: pet listings, lost-found, vet listings, walkers, booking inquiries, adoption applications). Listings only go live after an admin changes their `status`.
- `pages/api/upload.js` takes base64 files in a JSON body (50mb limit) and stores them in the Supabase Storage bucket `hamropets-media`, returning the public URL. Cloudinary is also a dependency (`delete-cloudinary-video`, `next.config.js` image domain) and is a legacy media path.
- `pages/api/admin/update-listing.js` is a field whitelist: adding a new editable column to `pet_listings` means adding an `if (rest.x !== undefined)` line there as well as in the admin UI.
- Listings have a monetization concept (`boost_tier`: `free` / `boost` / `shield`, plus `is_featured` / `is_super_featured`), shown on `boost-tiers.js` and in the submit flow.

**SEO landing pages** (`adopt-dog-kathmandu`, `dog-walker-kathmandu`, `lost-found-pets-nepal`, `hamrobazaar-alternative-nepal`) are static content pages. `public/sitemap.xml` is hand-maintained; update it when adding pages. `api/submit-indexnow.js` pings IndexNow.

**Styling:** custom Tailwind palette in `tailwind.config.js` (`duo-green`, `coral`, `forest`, `cream`, etc.) with a bold black-border, Duolingo-like look; `styles/globals.css` for globals.

## Environment variables

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `INDEXNOW_SECRET`, `NEXT_PUBLIC_ADMIN_PASSWORD`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.

## Gotchas

- **Admin auth is client-side only.** `pages/admin.js` compares the typed password to `NEXT_PUBLIC_ADMIN_PASSWORD` (with a hardcoded fallback) in the browser, and the `pages/api/admin/*` routes perform no auth check. Several of them use the anon key rather than the service-role key. Don't assume these routes are protected.
- `pages/api/upload.js` is unauthenticated and accepts arbitrary base64 payloads.
