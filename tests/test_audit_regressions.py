"""Regression checks for the UX/performance audit branch (stdlib only)."""
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]


class AuditRegressionTests(unittest.TestCase):
    def test_catalogue_filter_is_not_reset_on_refresh(self):
        js = (ROOT / "catalogue.js").read_text()
        refresh = js.split("async function loadStock(force=false)", 1)[1].split("async function prepareSelection()", 1)[0]
        self.assertNotIn("activeFilter=0;", refresh)
        self.assertIn("renderTools(pageLanguage());renderCatalogue(pageLanguage());", refresh)

    def test_selection_checks_live_stock(self):
        js = (ROOT / "catalogue.js").read_text()
        self.assertIn("const result = await loadStock(true);", js)
        self.assertIn("window.ScarlsProducts.refresh({force})", js)

    def test_generated_sync_is_kept_in_source(self):
        source = (ROOT / "catalogue-sync.js").read_text()
        generated = (ROOT / "products.js").read_text()
        self.assertTrue(generated.endswith(source))
        self.assertIn("if(!force&&lastSnapshot", source)
        self.assertIn("MIN_REFRESH_GAP_MS=15000", source)

    def test_chatbot_polling_is_throttled(self):
        js = (ROOT / "assistant.js").read_text()
        self.assertIn("setInterval(checkContent,120000)", js)
        self.assertIn("window.addEventListener('focus',checkContent)", js)

    def test_javascript_syntax(self):
        for name in ("catalogue.js", "products.js", "catalogue-sync.js", "assistant.js"):
            with self.subTest(name=name):
                subprocess.run(["node", "--check", str(ROOT / name)], check=True, capture_output=True)


if __name__ == "__main__":
    unittest.main()
