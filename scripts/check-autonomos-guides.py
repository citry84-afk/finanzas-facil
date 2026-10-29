"""Check published examples and metadata without running the native apps."""

import json
import unittest
import xml.etree.ElementTree as ET
from collections import Counter
from decimal import Decimal, ROUND_HALF_UP
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GUIDES = ("cuota-autonomos-2026.html", "modelo-130-autonomos-2026.html")


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.elements = []
        self.tables = []
        self.structured = []
        self.table = None
        self.row = None
        self.cell = None
        self.script = None
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if tag == "table":
            self.table = {"id": attrs.get("id"), "rows": []}
            self.tables.append(self.table)
        elif tag == "tr" and self.table is not None:
            self.row = []
            self.table["rows"].append(self.row)
        elif tag in ("td", "th") and self.row is not None:
            self.cell = []
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.script = []

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)
        if self.script is not None:
            self.script.append(data)

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self.cell is not None:
            self.row.append("".join(self.cell).strip())
            self.cell = None
        elif tag == "tr":
            self.row = None
        elif tag == "table":
            self.table = None
        elif tag == "script" and self.script is not None:
            self.structured.append(json.loads("".join(self.script)))
            self.script = None


def amount(text):
    return Decimal(text.replace("\u20ac", "").replace(".", "").replace(",", ".").strip())


class GuideChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pages = {name: Page((ROOT / "public" / name).read_text()) for name in GUIDES}

    def test_all_fifteen_monthly_fee_examples(self):
        rows = self.pages[GUIDES[0]].tables[0]["rows"][1:]
        self.assertEqual(len(rows), 15)
        for row in rows:
            with self.subTest(bracket=row[1]):
                minimum, maximum, fee = map(amount, row[2:5])
                self.assertLessEqual(minimum, maximum)
                self.assertEqual((minimum * Decimal("0.315")).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP), fee)

    def test_quarterly_anticipos_are_cumulative(self):
        table = next(t for t in self.pages[GUIDES[1]].tables if t["id"] == "ejemplo-trimestres")
        previous = Decimal(0)
        results = []
        for row in table["rows"][1:]:
            income, costs, profit, twenty, anticipos, retained, result = map(amount, row[1:])
            with self.subTest(quarter=row[0]):
                self.assertEqual(income - costs, profit)
                self.assertEqual(profit * Decimal("0.2"), twenty)
                self.assertEqual(anticipos, previous)
                self.assertEqual(twenty - anticipos - retained, result)
            previous += result
            results.append(result)
        self.assertEqual(results, [Decimal(1100), Decimal(1350), Decimal(1450)])

    def test_metadata_and_anchors(self):
        for name, page in self.pages.items():
            with self.subTest(page=name):
                self.assertEqual(sum(tag == "h1" for tag, _ in page.elements), 1)
                ids = Counter(a["id"] for _, a in page.elements if "id" in a)
                self.assertFalse([key for key, count in ids.items() if count > 1])
                for tag, attrs in page.elements:
                    href = attrs.get("href", "")
                    if href.startswith("#"):
                        self.assertIn(href[1:], ids)
                accounts = [a["content"] for tag, a in page.elements if tag == "meta" and a.get("name") == "google-adsense-account"]
                self.assertEqual(accounts, ["ca-pub-4837743291717475"])
                article = next(d for d in page.structured if d["@type"] == "Article")
                self.assertEqual(article["dateModified"], "2026-10-28")
                self.assertEqual(article["mainEntityOfPage"], "https://finanzasmuyfacil.com/" + name)
                links = [a.get("href") for tag, a in page.elements if tag == "a"]
                self.assertIn("https://apps.apple.com/es/app/finanzasfacil/id6754602748", links)
                self.assertIn("/control-gastos", links)

    def test_sitemap_dates(self):
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = ET.parse(ROOT / "public/sitemap.xml").getroot().findall("s:url", ns)
        self.assertEqual(len(urls), 31)
        dates = {url.findtext("s:loc", namespaces=ns): url.findtext("s:lastmod", namespaces=ns) for url in urls}
        for name in GUIDES:
            self.assertEqual(dates["https://finanzasmuyfacil.com/" + name], "2026-10-28")


if __name__ == "__main__":
    unittest.main(verbosity=2)
