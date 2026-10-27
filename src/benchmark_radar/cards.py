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
# offer a Share button whatever its score or date coverage. site/assets/
# share-card.js builds the same URL in the browser.
CARDS_BRANCH = "cards"


def benchmark_card_name(slug: str) -> str:
    """File name of a catalog benchmark's card on the cards branch."""
    return f"{slug}.png"


def benchmark_card_url(slug: str) -> str:
    """Public URL of a catalog benchmark's card in the cards repository."""
    return f"{CARDS_RAW_URL}/{CARDS_BRANCH}/{benchmark_card_name(slug)}"
