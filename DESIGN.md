---
name: Stuti Pandya
description: A new-grad backend engineer's portfolio, set as an append-only record stream on cool ruled paper.
colors:
  cobalt: "#1C3FE0"
  cobalt-deep: "#1430BA"
  cobalt-night: "#3858F0"
  cobalt-tint: "#8298FF"
  ack-green: "#0B7A52"
  pending-amber: "#A64D06"
  cool-paper: "#EEF1F4"
  raised-paper: "#F7F8FA"
  ledger-ink: "#0E1726"
  ink-secondary: "#424E60"
  ink-tertiary: "#586475"
  hairline-rule: "#C8CFD8"
  strong-rule: "#96A0AE"
  night-paper: "#0A0E15"
  night-raised: "#111620"
  night-ink: "#E6EAF0"
  night-ack: "#3DDC97"
  night-pending: "#F5B04A"
  ink-band-raised: "#162134"
  cobalt-band-ink-2: "#DEE5FF"
  cobalt-band-ack: "#8CF5C4"
  cobalt-band-pending: "#FFD282"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112.5"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112.5"
  section-title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112.5"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 112.5"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 87.5"
rounded:
  pip: "1px"
  sm: "2px"
  DEFAULT: "4px"
spacing:
  row-tight: "10px"
  row: "24px"
  gutter-mobile: "20px"
  gutter: "32px"
  column-gap: "48px"
  section-mobile: "56px"
  section: "80px"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ledger-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.DEFAULT}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.ledger-ink}"
    textColor: "{colors.cool-paper}"
  button-ghost:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    height: "36px"
  tier-chip-built:
    backgroundColor: "{colors.ledger-ink}"
    textColor: "{colors.cool-paper}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  tier-chip-used:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  input-field:
    backgroundColor: "{colors.raised-paper}"
    textColor: "{colors.ledger-ink}"
    rounded: "{rounded.DEFAULT}"
    padding: "10px 14px"
  record-row:
    textColor: "{colors.white}"
    padding: "10px 20px"
  record-row-hover:
    backgroundColor: "#264AE8"
  nav-bar:
    backgroundColor: "{colors.cool-paper}"
    textColor: "{colors.ink-secondary}"
    height: "56px"
---

# Design System: Stuti Pandya

## Overview

**Creative North Star: "The Record Stream"**

The site is set as an append-only, partitioned log of real work. Every fact is a record with an offset, a key and a year; the visitor is the consumer reading it to zero lag. The system draws its whole vocabulary from that metaphor: ruled 1px lines instead of boxes, monospaced offsets and stacks set in a narrowed mono, a single drenched cobalt that owns the log and the actions, and two state colours (ack green, pending amber) that mean exactly what they mean in a message system.

Density is that of a well-kept ledger: tight data rows inside generous section spacing, a narrow left heading column (14rem) that keeps the content column aligned down the page, and type that does the hierarchy without containers. The page alternates ground three times at most: cool paper, one ink band for the flagship, and cobalt for the record panel and the closing call to action. Colour regions are re-scoped token sets, never one-off fills, so everything inside a band (including the ledger simulation) reads correctly on its ground.

The world is flat and square. No gradients, no glass, no glow, no decorative imagery; the only motion that carries meaning is the consumer catching up (acks sweeping pending to committed, lag falling to zero), and it collapses to the final state under reduced motion.

**Key Characteristics:**
- Ruled 1px hairlines are the containers; a full-strength ink rule opens every section.
- One drenched accent (cobalt) that owns regions and actions, not decoration.
- Archivo stretched wide for display, Martian Mono narrowed for data only.
- State colour is semantic: green is committed, amber is pending or retry.
- Every colour is a scoped token; themes and bands swap the set, not the classes.
- Square-ish 4px corners throughout; flat at rest.

## Colors

Cool, low-chroma paper and blue-black ink carry almost everything; one saturated cobalt owns the regions that matter, and two state hues report status.

### Primary
- **Record Cobalt** (#1C3FE0): The primary action fill (Resume, Read the case study, Send transactions), the record-stream panel ground, the closing Contact band, the active nav underline, selection highlight and focus ring. On light paper it is also accent text (case-study links, project-title hover).
- **Deep Cobalt** (#1430BA): Light-theme hover tint for cobalt text links.
- **Night Cobalt** (#3858F0) and **Cobalt Tint** (#8298FF): Dark-theme and ink-band versions. The fill stays deep enough for white labels; accent-coloured text switches to the tint to hold 4.5:1.

### Secondary
- **Ack Green** (#0B7A52; #3DDC97 at night; #8CF5C4 on cobalt): Committed state only: the ack column, a lag of zero, the ledger's consistent-balance status, case-study evidence checks.
- **Pending Amber** (#A64D06; #F5B04A at night; #FFD282 on cobalt): Pending, retry and warning state only: un-acked records, the "offer" record, the armed-crash control, warning log lines.

### Neutral
- **Cool Paper** (#EEF1F4): Page ground and the opaque nav bar.
- **Raised Paper** (#F7F8FA): Input fields, the command palette, row hover on dark grounds.
- **Ledger Ink** (#0E1726): Primary text, section-opening rules, the secondary button outline, the Built chip fill, and the ground of the flagship ink band.
- **Ink Secondary** (#424E60) and **Ink Tertiary** (#586475): Supporting copy, then offsets, stacks and metadata.
- **Hairline Rule** (#C8CFD8): Every row divider and fact-table line.
- **Strong Rule** (#96A0AE): Input strokes, link underline decoration, scrollbar thumb.
- **Night Paper / Night Raised / Night Ink** (#0A0E15 / #111620 / #E6EAF0): The dark theme's paper, raised and ink roles.

### Named Rules
**The Scoped Ground Rule.** A coloured region is a token scope (`.band-ink`, `.band-cobalt`, `.dark`) that redefines paper, raised, ink, rule, ack and pending together. Never paint a region with a literal colour and then patch its children.

**The Semantic State Rule.** Green means committed and amber means pending or retry. Neither appears as decoration, and nothing else uses them.

**The One Drench Rule.** Cobalt is the only colour allowed to own a region. At most the record panel and the closing band are cobalt; the flagship gets ink. Everything else is paper.

## Typography

**Display Font:** Archivo (variable width, set at 112.5% via the `.display` class) with system-ui fallback
**Body Font:** Archivo at normal width
**Label/Mono Font:** Martian Mono (set at 87.5% width with tabular figures via the `.data` class) with ui-monospace fallback

**Character:** A wide, heavy grotesque gives the name and section titles a confident, engineered stance; the narrowed mono reads like log output. The two never trade jobs.

### Hierarchy
- **Display** (800, clamp(3rem, 7.2vw, 6rem), 0.95, -0.035em): The name in the hero and the case-study title. One per page.
- **Headline** (800, clamp(2.25rem, 4.6vw, 3.75rem), 1.02, -0.03em): Band headlines: the flagship project title, the Contact close.
- **Section title** (700, clamp(1.5rem, 2.6vw, 2.125rem), 1.12, -0.02em): Section headings in the left column; also the "Next case study" link.
- **Title** (700, 1.5rem, tight): Project, company and school names in index rows; case-study part headings step to 1.25rem on mobile.
- **Body** (400, 15px, 1.625): Row descriptions, bullets, case-study prose capped at 68 to 72ch. Lead paragraphs rise to 1.125 to 1.25rem.
- **Label** (600, 0.875rem): Buttons, sub-headings inside sections ("Decisions that carry it", "Also built"), fact-table terms. Sentence case.
- **Data** (400, 11px, mono, tabular): Offsets, partitions, keys, dates, periods, stacks, GPA, the ⌘K hint. Uppercase with wide tracking only for status words (ack, pending, offer) and tier chips (10px).

### Named Rules
**The Data-Only Mono Rule.** Martian Mono is reserved for machine-shaped values: offsets, dates, keys, numbers and stacks. Prose, places and labels stay in Archivo.

**The Width Axis Rule.** Hierarchy is carried by Archivo's width and weight (wide 800 at display, normal 400 to 600 in text), not by colour or decoration.

## Layout

A single centred container (max 72rem, 20px gutters on mobile, 32px from 640px). Sections are spaced 56px top and bottom on mobile and 80px from 640px; bands use 64 to 112px. Every titled section is a two-column ledger from 1024px: a 14rem heading column and a fluid content column with a 48px gap, opened by a full-width ink rule with 32px above the content. Inside, dated rows (experience, school, community) use an 11rem date column; the project index uses 5rem year, fluid body, and an auto action column.

Hero and flagship split on a 12-column grid, 5 columns of text to 7 of instrument (the record stream, the ledger simulation); Contact splits 6 / 5. Below 1024px everything stacks text-first, instrument second. The record stream drops its partition/key column under 640px and folds that metadata above each record's text.

Data rows are dense (10px vertical padding in the stream, 10 to 12px in lists); content rows breathe (24 to 32px). Breakpoints are Tailwind's defaults (640, 768, 1024, 1280).

## Elevation & Depth

Flat by default. Depth is tonal: raised paper sits a step lighter than the ground, and inverted bands change the ground entirely. There are no shadows on page surfaces.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 24px 48px -12px rgb(14 23 38 / 0.35)`): The command palette only, over a 40% ink scrim. It is the single floating layer in the system.

### Named Rules
**The Flat Ledger Rule.** Surfaces never lift. Hover answers with a tonal row tint (ink at 3 to 4%, or raised paper on dark grounds) or an underline, never a shadow or translation of the surface.

## Shapes

Square-ish and ruled. The default corner is 4px (buttons, inputs, the record panel, photos, the palette). Tier chips and the evidence check use 2px; status pips are 8px squares at 1px radius, filled when committed and outlined when pending. Lines are 1px: hairline rule between rows, full ink for section openers and emphasis frames (the retrospective is boxed top and bottom in ink). Dashed borders appear only on the Touched tier chip, where "dashed" literally means partial.

## Components

### Buttons
Compact, square and plain: weight and fill do the work.
- **Shape:** 4px corners, 44px minimum height (36px for the nav Resume), 20px horizontal padding, 8px icon gap, 14px semibold label.
- **Primary:** Cobalt fill with white label. Used for the one action that matters in a region (Resume, Read the case study, View source).
- **Hover / Focus:** Fill drops to 90% over 150ms. Focus is a 2px cobalt outline at 3px offset (white on cobalt grounds).
- **Secondary:** 1px ink outline at 80%, ink label; hover inverts to an ink fill with paper text.
- **Ghost:** Text-only link in ink secondary with a strong-rule underline; hover takes ink colour and an ink underline. On cobalt grounds the primary inverts to a white fill with cobalt text.

### Chips
- **Style:** Tier chips (Built / Used / Touched) in 10px uppercase mono, 2px corners. Built is an ink fill; Used a solid tertiary outline; Touched a dashed tertiary outline in tertiary text.
- **State:** Static; they state depth, they do not filter.

### Cards / Containers
The system has no cards. Lists are ruled indexes: a hairline under each row, the whole row is the link, hover tints the row at 3% ink and turns the title cobalt, and a trailing arrow nudges up-right over 200ms. The only framed panels are the record stream (cobalt, 4px) and the command palette (raised paper, hairline border, the overlay shadow).

### Inputs / Fields
- **Style:** Raised-paper fill, 1px strong-rule stroke, 4px corners, 10px by 14px padding, 15px text, tertiary placeholder; labels sit above in 14px secondary ink.
- **Focus:** Stroke turns cobalt (plus the global focus outline).
- **Disabled:** Submit drops to 60% opacity.

### Navigation
A 56px opaque paper bar fixed to the top; its bottom hairline appears only after 8px of scroll. Name at left in wide 800 display, links centred in 14px secondary ink. The active section (derived from scroll position) is semibold ink with a 2px cobalt underline at a 10px offset. Right side: ⌘K hint in mono, theme toggle, cobalt Resume button. Under 768px links collapse into a full-width ruled list with a full-width Download resume button.

### Record Stream (signature)
The hero instrument. A cobalt panel with a mono header line (topic, partition count, consumer, lag) and one ruled row per record: zero-padded four-digit offset, partition and key with year, the record text in Archivo, and a status cell (uppercase mono word plus square pip). On load, after 450ms, acks sweep down at 110ms per row while the lag counter falls to zero (amber, then green). Every row links to its evidence; hover or focus raises the row to the band's raised tone. A final pending row, offset 12, states the role being sought. Reduced motion renders fully committed.

### Ledger Simulation (signature)
Lives inside the ink band and re-uses the record vocabulary: ruled partition rows with mono balances, a scrolling mono log with offsets, a cobalt primary, an amber outlined toggle for arming a crash, and a pip-led status line in ack green.

## Do's and Don'ts

### Do:
- **Do** separate content with 1px hairline rules (#C8CFD8) and open each section with a full-ink rule.
- **Do** put a new coloured region behind a token scope that redefines paper, raised, ink, rule, ack and pending together.
- **Do** set offsets, dates, keys, stacks and numbers in Martian Mono at 87.5% width with tabular figures, usually at 11px.
- **Do** keep cobalt for primary actions, the record panel, active nav, focus and selection.
- **Do** keep the two-column ledger section (14rem heading column, 48px gap) for any new titled section.
- **Do** give every motion a state meaning and a reduced-motion final state.

### Don't:
- **Don't** use gradients, glassmorphism, glows or backdrop blur.
- **Don't** add drop shadows to page surfaces; the command palette overlay is the only shadowed layer.
- **Don't** build grids of same-size cards; use ruled index rows where the whole row is the link.
- **Don't** use ack green or pending amber decoratively, or introduce other state hues ad hoc.
- **Don't** set prose, place names or labels in the mono face.
- **Don't** round corners past 4px or use pill shapes.
