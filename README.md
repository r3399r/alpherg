# PuzzleHints

A static site for sharing hints and walkthroughs for puzzle games. Built with Astro 6.

Supports multiple languages. Each language has its own URL prefix (`/en/`, `/zh-tw/`, `/zh-cn/`, …) and its own set of content files.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build for production to `./dist/`           |
| `npm run preview` | Preview the production build locally        |

---

## How to add a new game

Content lives under a language subfolder. Always create one file per language you support.

### Step 1 — Create the game file for each language

Create a file at `src/content/games/{lang}/your-game-slug.md` for every language.

The filename becomes the game's URL slug (e.g. `the-room.md` → `/{lang}/games/the-room`).

```
src/content/games/
  en/the-room.md
  zh-tw/the-room.md
  zh-cn/the-room.md
```

Example — `src/content/games/en/the-room.md`:

```md
---
title: "The Room"
description: "A short description shown on the games list and game detail page."
cover: "/images/games/the-room.jpg"   # optional — place image in public/images/games/
genre: "Puzzle"                        # optional
platform: "PC, iOS, Android"          # optional
order: 1                               # controls sort order on the home page
---
```

**Fields:**

| Field         | Required | Description                                      |
| :------------ | :------- | :----------------------------------------------- |
| `title`       | Yes      | Display name of the game                         |
| `description` | Yes      | Short summary shown on the list and detail pages |
| `cover`       | No       | Path to cover image (place file in `public/`)    |
| `genre`       | No       | Genre tag shown as a badge                       |
| `platform`    | No       | Platform tag shown as a badge                    |
| `order`       | No       | Sort order on home page. Lower = higher up       |

> If a game file is missing for a language, it simply won't appear on that language's page — no error.

---

### Step 2 — Create stage files for each language

Create one `.md` file per stage, under `src/content/stages/{lang}/{game-slug}/`. The filename becomes the URL segment (e.g. `1.md` → `/{lang}/games/the-room/1`).

```
src/content/stages/
  en/the-room/
    1.md
    2.md
  zh-tw/the-room/
    1.md
    2.md
  zh-cn/the-room/
    1.md
    2.md
```

Example — `src/content/stages/en/the-room/1.md`:

```md
---
game: "the-room"         # must match the game file's slug exactly
stage: 1                 # stage number — controls sort order
title: "The Study"       # display name for this stage
path: ["Chapter 1"]      # optional — see hierarchy section below
image: "/images/stages/the-room-1.jpg"  # optional stage screenshot
hints:
  - text: "Look closely at the four corners of the box."
  - text: "The engravings can be rotated. Try aligning them inward."
  - text: "Once aligned, the center panel slides open."
    image: "/images/hints/the-room-1-hint3.jpg"  # optional per-hint screenshot
---
```

**Fields:**

| Field   | Required | Description                                                              |
| :------ | :------- | :----------------------------------------------------------------------- |
| `game`  | Yes      | Must match the game's filename slug exactly                              |
| `stage` | Yes      | Stage number. Used for sorting. Can have gaps (1, 5, 10 is fine)        |
| `title` | Yes      | Display name for the stage                                               |
| `path`  | No       | Array of labels defining the hierarchy above this stage (see below)     |
| `image` | No       | Stage screenshot shown at the top of the stage page                      |
| `hints` | Yes      | Array of hints. Each hint has a `text` (required) and `image` (optional) |

**The `path` field** controls the grouping shown on the game page. Any depth, any label names — each game can use a completely different structure:

```yaml
path: []                              # flat — no grouping (default)
path: ["Chapter 1"]                   # 1 level:  Chapter 1 > Stage
path: ["World 1", "Chapter 2"]        # 2 levels: World 1 > Chapter 2 > Stage
path: ["Act I", "Scene 3", "Area B"]  # 3 levels: Act I > Scene 3 > Area B > Stage
```

**Hints** are revealed one at a time when the reader clicks. Order them from vaguest to most specific.

---

### Step 3 — Add images (optional)

Place all images in the `public/` folder. Recommended structure:

```
public/
  images/
    games/       ← game cover images
    stages/      ← stage banner screenshots
    hints/       ← per-hint screenshots
```

Reference them in frontmatter with a leading slash: `/images/games/the-room.jpg`.

---

## How to add a new language

### Step 1 — Register the locale

Open `src/i18n/translations.ts` and add the new locale in three places:

```ts
// 1. Add to the locales array
export const locales = ['en', 'zh-tw', 'zh-cn', 'ja'] as const;

// 2. Add the BCP 47 tag (used for the HTML lang attribute)
export const bcp47: Record<Locale, string> = {
  en: 'en',
  'zh-tw': 'zh-TW',
  'zh-cn': 'zh-CN',
  ja: 'ja',           // ← add
};

// 3. Add all translation strings
const translations = {
  // ... existing locales ...
  ja: {
    site_title: 'PuzzleHints',
    nav_home: 'ゲーム一覧',
    games_heading: 'パズルゲームのヒント',
    games_subtitle: '各ゲームの段階的なヒント。必要な分だけ確認できます。',
    stages_heading: 'ステージ',
    hints_heading: 'ヒント',
    hint_reveal: 'クリックして表示',
    hint_intro: '各ヒントをクリックして表示します。できるだけ前のヒントから確認してください。',
    all_stages: 'すべてのステージ',
    no_games: 'ゲームがまだ追加されていません。',
    no_stages: 'ステージがまだ追加されていません。',
    stage_label: 'ステージ',
    stage_count: (n: number) => `${n} ステージ`,
    hint_count: (n: number) => `${n} ヒント`,
    meta_description: 'パズルゲームの攻略とヒント',
    lang_label: { en: 'EN', 'zh-tw': '繁', 'zh-cn': '简', ja: '日' },
  },
};
```

> The `lang_label` object inside each locale controls what the language switcher buttons show. Make sure every existing locale also has the new key added to its own `lang_label`.

### Step 2 — Add content files

Create a `ja/` subfolder in both `games/` and `stages/` and add translated files following the same structure as `en/`:

```
src/content/
  games/
    ja/the-room.md          ← translated game description
  stages/
    ja/the-room/
      1.md                  ← translated stage title + hints
      2.md
```

That's it — routing, the language switcher, and the `<html lang>` attribute are all handled automatically.

---

## Full example

A two-language site with one game and two stages:

```
src/content/
  games/
    en/the-room.md
    zh-tw/the-room.md
  stages/
    en/the-room/
      1.md
      2.md
    zh-tw/the-room/
      1.md
      2.md
```

`src/content/games/en/the-room.md`:
```md
---
title: "The Room"
description: "Solve the mysteries of an ornate mechanical box."
genre: "Puzzle"
platform: "PC, iOS"
order: 1
---
```

`src/content/stages/en/the-room/1.md`:
```md
---
game: "the-room"
stage: 1
path: ["Chapter 1"]
title: "The Study"
hints:
  - text: "Examine the four corners of the box carefully."
  - text: "Each corner engraving can be rotated."
  - text: "Align all engravings to point inward — the center panel will open."
---
```

URLs generated:
- `/en/` — English games list
- `/en/games/the-room` — English stage list
- `/en/games/the-room/1` — English hints page
- `/zh-tw/` — Traditional Chinese games list
- `/zh-tw/games/the-room/1` — Traditional Chinese hints page

---

## Project structure

```
src/
  content.config.ts          ← collection schemas
  content/
    games/
      {lang}/                ← one folder per language
        game-slug.md         ← one file per game
    stages/
      {lang}/                ← one folder per language
        {game-slug}/         ← one folder per game
          1.md               ← one file per stage
  i18n/
    translations.ts          ← all UI strings + locale list
  layouts/
    Layout.astro             ← base HTML layout with nav + language switcher
  components/
    GameCard.astro
    StageCard.astro
    HintReveal.astro         ← spoiler-style hint reveal
  styles/
    global.css               ← colors, typography, CSS variables
  utils/
    url.ts                   ← url() and langUrl() helpers
  pages/
    index.astro              → redirects to /en/
    [lang]/
      index.astro            → /{lang}/              (games list)
      games/
        [game].astro         → /{lang}/games/:slug   (stage list)
        [game]/
          [stage].astro      → /{lang}/games/:slug/:n (hints page)
public/
  images/                    ← static images referenced in content
```
