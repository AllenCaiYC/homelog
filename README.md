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
| Tom Becker | Tenant | Joint tenancy (Riverside Flat 4B) |
| Lucas Silva | Tenant | Moving out soon; move-out check |
| Yuki Tanaka | Tenant | Moved out; deposit dispute over a carpet stain, decided by the deposit scheme |
| Test User | Tenant | No home yet; join with `ALDER-B2` or `RIVER-4B` |
| Priya Shah | Landlord | Two properties |
| Alex Morgan | Landlord | New landlord with no properties |

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
