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
