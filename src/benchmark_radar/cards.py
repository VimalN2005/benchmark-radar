"""Where share images live: ktwu01/benchmark-radar-cards (issue #671).

Images in this repository would grow every clone, so they are published to a
separate repository and linked by URL. Kept free of imports so the daily share
code and the static benchmark pages can both name a card without importing each
other.
"""

from __future__ import annotations

CARDS_REPOSITORY = "ktwu01/benchmark-radar-cards"
CARDS_RAW_URL = f"https://raw.githubusercontent.com/{CARDS_REPOSITORY}/refs/heads"
# One card per catalog benchmark, named by slug, so every benchmark page can
# offer a Share button whatever its score or date coverage. The `cards` branch
# is served by GitHub Pages on this domain: a CDN, unlike raw file URLs, and a
# link preview shows the site's own domain. site/assets/share-card.js builds
# the same URL in the browser.
CARDS_BRANCH = "cards"
CARDS_DOMAIN = "cards.benchmark-radar.org"
CARDS_SITE_URL = f"https://{CARDS_DOMAIN}"


def benchmark_card_name(slug: str) -> str:
    """File name of a catalog benchmark's card on the cards branch."""
    return f"{slug}.png"


def benchmark_card_url(slug: str) -> str:
    """Public URL of a catalog benchmark's card in the cards repository."""
    return f"{CARDS_SITE_URL}/{benchmark_card_name(slug)}"
