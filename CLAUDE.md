# CLAUDE.md

## Tech Stack
- Plain HTML, CSS, and JavaScript only.
- No frameworks, no build step. Files open directly in a browser.

## Project Structure
The repository is nearly empty for now; it only contains `README.md` and this file.
Update this section as files are added.

## Key Requirements
1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Feature Plan
A portal where visitors try small web tools. Audience: students and learners. Subject: Electrical Engineering.

### Portal structure
- **Homepage (`index.html`):** a short intro and a grid of tool cards, one card per tool.
- **Opening a tool:** the visitor clicks a card and lands on that tool's own page under `tools/`.
- **Getting back:** every tool page has an "All tools" link and a site title that both return to the homepage.
- **Adding a tool later:** add one page in `tools/`, one script in `js/`, and one new card on the homepage. Nothing else changes.

### Phases
1. **Phase 1: portal + first tool.** The homepage, the light/dark toggle, and one tool: an Ohm's law calculator. The visitor enters any two of voltage, current, resistance and power, and gets the other two, with the formula shown.
2. **Phase 2: more tools.** To be decided after phase 1.

## Rules for Claude
- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess.
