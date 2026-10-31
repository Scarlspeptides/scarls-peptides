# scarls-peptides
    Scarl’s Peptides


## Brand system — October 2026

Edit `tokens.css`, `base.css` and `components.css`; `style.css` is their generated bundle.
The homepage layout lives in `home.css`. Product names, formats, numeric prices, images
and translated descriptions are defined once in `products.json`. Homepage translations
are in `home-copy.json`. Shared navigation and footer are in `partials/`.

After editing these sources, run `python3 scripts/build_site.py`. Commit the generated
HTML, CSS and JavaScript together with their sources. This keeps the existing GitHub
Pages deployment working without a new framework or external build dependency.

Run `node scripts/test_catalogue.cjs` to check selection focus, stock controls, search
normalization and multilingual product data. Preview on an iPhone to check real layout,
keyboard focus and touch gestures. The build also includes a read-only static catalogue
for JavaScript failures; current stock and selection actions require JavaScript.

## Assistant FAQ — October 2026

`assistant-data.js` contains the short French editorial answers, aliases and sources.
`assistant.js` builds the floating chat on the six public pages after age acknowledgement;
`assistant.css` controls its responsive layout. The build installs these assets in each
page. This is explicitly a keyword-based FAQ, with no generative AI or API calls.
Conversation is held only in page memory, never sent or stored by this module.
WhatsApp opens only on a separate user click, without a prefilled order or message.
This information module neither processes orders nor estimates shipping, and does not
collect an address. Keep research findings separate from claimed clinical benefits.

Validation: `node scripts/test_assistant.cjs`. Update sources and editorial answers
together when the catalogue or medical evidence changes.

The FAQ topics and KLOW composition incorporate the owner’s catalogue notes (version 44, 2026-10-31). Medical effects retain their study context and linked evidence; raw admin descriptions are not automatically used as clinical claims.
