// Execute the real metadata helpers from app.js so the test proves missing
// versus zero behavior rather than matching implementation source strings.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "..", "site", "assets", "app.js"), "utf8");
const start = source.indexOf("const RECORD_METRIC_LABELS");
const end = source.indexOf("\nfunction safeHttpUrl", start);
if (start < 0 || end < 0) throw new Error("Record metadata helpers not found");

globalThis.t = (value) => value;
globalThis.getLang = () => "en";
globalThis.formatDate = (value) => `date:${value}`;
globalThis.document = { createTextNode: (text) => ({ text }) };
globalThis.element = (tag, props = {}, children = []) => ({ tag, props, children });
const harness = `${source.slice(start, end)}
globalThis.__recordFactEntries = recordFactEntries;
globalThis.__recordDateEntries = recordDateEntries;
globalThis.__recordFacts = recordFacts;
globalThis.__cardTierClass = cardTierClass;`;
new Function(harness)();

const reportedItem = {
  organizations: ["OpenAI"],
  authors: ["Alice", "Bob", "Carol"],
  metrics: { stars: 0, forks: null },
};
const reported = globalThis.__recordFactEntries(reportedItem);
const unreported = globalThis.__recordFactEntries({
  authors: ["Deyao Hong"],
  metrics: {},
});
// A GitHub record whose connector left organizations empty still names its
// owner, because the card title no longer shows it.
const slugOwner = globalThis.__recordFactEntries({
  title: "NVIDIA-NeMo/Gym",
  organizations: [],
  metrics: {},
});
const dates = globalThis.__recordDateEntries({
  published_at: "2026-08-24T17:59:04Z",
  updated_at: "2026-08-25T17:59:04Z",
});
const rendered = globalThis.__recordFacts(reportedItem);
// Issue #994: a Hugging Face dataset past 1,000 downloads is tinted gold
// like a repository past 1,000 stars.
const tiers = Object.fromEntries(
  [
    ["downloads_282271", { downloads: 282271 }],
    ["downloads_1000", { downloads: 1000 }],
    ["downloads_500", { downloads: 500 }],
    ["stars_1001", { stars: 1001 }],
    ["stars_101", { stars: 101 }],
    ["stars_50_downloads_5000", { stars: 50, downloads: 5000 }],
    ["none", {}],
  ].map(([key, metrics]) => [key, globalThis.__cardTierClass({ metrics })]),
);

console.log(
  JSON.stringify({
    reported,
    slug_owner: slugOwner,
    unreported,
    dates,
    tiers,
    rendered: {
      tag: rendered.tag,
      className: rendered.props.className,
      role: rendered.props.attrs.role,
      ariaLabel: rendered.props.attrs["aria-label"],
    },
  }),
);
