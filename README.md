# HomeLog

A clickable prototype for 5SSMN215 Technology and Innovation: move-in records, repairs and move-out evidence for international students renting in the UK, and for their landlords. English and Simplified Chinese.

Everything runs in the browser. Data is stored in `localStorage`, so several demo accounts can work on the same properties on one computer. There is no server.

## Run it

Open `index.html` in a browser, or serve the folder (needed for the offline / installable app):

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Demo accounts

Use the **Demo** button (bottom right) to switch accounts or start the 9-step guided tour. To sign in by email instead, every account uses the password `test`.

| Account | Role | What it shows |
|---|---|---|
| Wei Zhang | Tenant | Bedroom 1 in a shared house (12 Alder Road) |
| Aisha Khan | Tenant | Just moved in; inventory check still open |
| Tom Becker | Tenant | Joint tenancy (Riverside Flat 4B), lead tenant; his joint tenant Sofia isn't on HomeLog |
| Lucas Silva | Tenant | Moving out in 5 days; move-out checklist (own photos, meters, keys), then the landlord's move-out check with a second round |
| Chen Jing | Tenant | Harbour Court Flat 3, managed by an agency; signs off the contractor's repair |
| Yuki Tanaka | Tenant | Moved out; deposit dispute over a carpet stain, decided by the deposit scheme |
| Test User | Tenant | No home yet; join with `ALDER-B2` or `RIVER-4B` |
| Priya Shah | Landlord | Two properties |
| Olivia Grant | Agency admin | Harbour Lettings: tabs for overview, properties (filter and search), team, owners and company; manages three of the six properties |
| Sam Patel | Property manager | Harbour Lettings: only the flats assigned to him; sends contractor job links |
| Margaret Hughes | Owner | Owns Harbour Court Flat 3; approves a £320 plumbing quote over her £250 limit |
| Alex Morgan | Landlord | New landlord with no properties |

**Years of history.** The demo carries records from before the current tenants:

- **Facilities** have repairs and services on one timeline. The boiler shows its 2018 install, a 2023 pressure-valve repair and yearly services. The bathroom extractor fan shows the mould story: treated in 2024, back in 2025, fan replaced, dry at the 2026 winter check. A **Repeat repairs** tag appears from two repairs on. Smoke and carbon monoxide alarms are facilities too.
- **Older repairs** (2022–2025) have before and after photos, the contractor and the cost.
- **Earlier tenancies** of the same rooms can be opened by the landlord (Priya): Ines (no deductions, full deposit back), Mateo (Blu Tack marks judged normal wear), Priyanka (worktop scorch, £85 agreed) and Leo and Hana at Riverside (sofa stain, £150 claimed, settled at £90). They can also sign in by email (e.g. `ines@homelog.demo`).
- **Harbour Lettings** manages six properties for three owners (Maple House, Canal View, Victoria Terrace and Park Studios as well as Harbour Court), so the dashboard shows an overdue urgent repair, a vacant house and a gas check coming up.

New accounts can be created from the sign-in page: tenant, landlord, staff joining an agency with its team code (e.g. `HARB-TEAM-7K2P`, confirmed by an admin), or an owner with an invite code (e.g. `HARB-OWN-JW`). Letting agencies register separately from the card at the bottom right of the home page (the person registering becomes the agency admin). Accounts live only in this browser.

**Account → Reset all demo data** (or the Demo panel) restores the original demo.

## Files

| File | Contents |
|---|---|
| `index.html` | Page skeleton |
| `styles.css` | All styles, light and dark themes |
| `i18n.js` | Interface text in English and Simplified Chinese (`i18n.en`, `i18n['zh-CN']`) |
| `app.js` | Demo data, pages and behaviour |
| `sw.js`, `manifest.webmanifest`, `icon*` | Installable / offline app |
| `demo/` | Demo photos and floor plans |
| `asset-prompts.md` | Prompts used to generate the demo images |

### Adding a language

Copy the `en` block in `i18n.js`, give it a new code (for example `'ar'`), translate the values and keep every key and `{placeholder}`. Missing keys fall back to English. The language switch appears automatically.

## Publish on GitHub Pages

1. Create a repository on GitHub and push this folder to it.
2. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`.
3. The site appears at `https://<user>.github.io/<repository>/` after a minute or two.

## Notes

- Dates, compliance deadlines and pricing are demo values. Legal information links to GOV.UK and is not legal advice.
- Translations of user-written content are pre-written for the demo content only; a real product would use a translation service.
- Record fingerprints are checksums for demonstration; a real product would use a cryptographic hash stored on a server.
