# myrealtorriley — v0.7 launch

A fast, static, multipage real-estate website for Riley Hoagland.

## Current pages
- Home
- About
- Buy
- Sell
- Listings
- Lincoln City
- Contact

## Brand
**Coastal Brutalist + Warm Editorial**
Modern Oregon Coast, grounded masculine warmth, strong typography, real Riley.

## Launch philosophy
This version is intentionally shippable now. Better photography, automated listings,
additional area guides, reviews and deeper resources can be added without redesigning
the site.

## Deployment
GitHub Pages from `main` / `(root)`.

## v0.7 launch change
Removed the bathroom/full-body photo entirely. The About page now opens with a strong text-led editorial section instead.

## v0.7 launch
- Added four permanent property pages.
- Listings page now links first to Riley's local property pages.
- Each property page has a prominent direct link to the official MLS listing.
- Zillow is no longer used as the property destination.

## v0.7 launch
- Increased desktop page gutters so the editorial alignment has more breathing room.
- Added one real listing photo to every listing card.
- Added the same listing image to each individual property page.
- Corrected Unit 403 to 1 bath based on the current live MLS-syndicated listing.
- Coastal listing photos are temporarily loaded from public listing-image CDNs and can be swapped for local originals later without changing page URLs.

## v0.7 launch
- Tightened the Lincoln City Home Base section.
- Removed the oversized vertical dead space before the topic cards.
- Inset the Lincoln City topic grid so its outer border aligns with the site's editorial gutters rather than the browser edge.

## v0.7 launch
- Removed the entire “Useful local pages, not keyword farms” section from the Lincoln City page.
- The six local-property topic cards now flow directly into the Lincoln City contact CTA.

## v0.9 — Site Capture
Forms added to:
- every individual listing page
- Buy
- Sell
- Contact

Submissions POST to `/api/lead`, a Cloudflare Pages Function.
The Function stores leads in a D1 database bound as `LEADS_DB`.
`schema.sql` creates the lead inbox table.

This is Step #2. Follow Up Boss is intentionally not connected yet.

## v1.0 — Compliance / representation pass
- Added a prominent brokerage/identity bar to every public page:
  Riley Hoagland · Oregon Broker · Oregon Life Homes · license #201226143 · Se habla español.
- Strengthened the footer with Oregon Life Homes, license information, Equal Housing Opportunity language, Spanish-language representation, and current-information disclaimer.
- Added visible Spanish-language welcome sections to Home and Contact.
- Removed stale homepage copy that incorrectly described the Listings page as routing to Zillow.
