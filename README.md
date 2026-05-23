# PuzzleHints

A static site for sharing hints and walkthroughs for puzzle games. Built with Astro 6.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build for production to `./dist/`           |
| `npm run preview` | Preview the production build locally        |

---

## How to add a new game

### Step 1 — Create the game file

Create a file at `src/content/games/your-game-slug.md`.

The filename becomes the game's URL slug (e.g. `the-room.md` → `/games/the-room`).

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

---

### Step 2 — Create a folder for the game's stages

Create a folder matching the game slug inside `src/content/stages/`:

```
src/content/stages/the-room/
```

---

### Step 3 — Add stages

Create one `.md` file per stage inside that folder. The filename becomes the URL segment (e.g. `1.md` → `/games/the-room/1`).

```md
---
game: "the-room"         # must match the game file's slug exactly
stage: 1                 # stage number — controls sort order
title: "The Study"       # display name for this stage
group: "Chapter 1"       # optional — groups stages under a heading on the game page
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
| `path`  | No       | Array of labels that define the hierarchy above this stage. Any depth is supported — see examples below. Omit or leave empty for a flat list. |
| `image` | No       | Stage screenshot shown at the top of the stage page                      |
| `hints` | Yes      | Array of hints. Each hint has a `text` (required) and `image` (optional) |

**The `path` field** controls the hierarchy displayed above the stage on the game page. It is an array of strings — each string is one level of nesting. The depth is unlimited and each game can use a completely different structure:

```yaml
path: []                              # flat — no grouping (default)
path: ["Chapter 1"]                   # 1 level:  Chapter 1 > Stage
path: ["World 1", "Chapter 2"]        # 2 levels: World 1 > Chapter 2 > Stage
path: ["Act I", "Scene 3", "Area B"]  # 3 levels: Act I > Scene 3 > Area B > Stage
```

The game page renders all levels as indented headings automatically. The stage page breadcrumb shows the full path.

**Hints** are revealed one at a time by the reader clicking "Click to reveal". Order them from vaguest to most specific so readers only spoil as much as they need.

---

### Step 4 — Add images (optional)

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

## Full example

A game with two chapters, each containing two stages:

```
src/content/
  games/
    the-room.md
  stages/
    the-room/
      1.md    ← Chapter 1, Stage 1
      2.md    ← Chapter 1, Stage 2
      3.md    ← Chapter 2, Stage 3
      4.md    ← Chapter 2, Stage 4
```

`src/content/games/the-room.md`:
```md
---
title: "The Room"
description: "Solve the mysteries of an ornate mechanical box."
genre: "Puzzle"
platform: "PC, iOS"
order: 1
---
```

`src/content/stages/the-room/1.md`:
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

`src/content/stages/the-room/3.md`:
```md
---
game: "the-room"
stage: 3
path: ["Chapter 2"]
title: "The Observatory"
hints:
  - text: "The telescope is the key object in this room."
  - text: "Point it at the painting on the north wall."
  - text: "The constellation pattern matches the rings on the safe."
---
```

The game page at `/games/the-room` will automatically show stages grouped under **Chapter 1** and **Chapter 2** headings.

For deeper hierarchies, just add more items to `path`. A 5-level game might look like:

```md
---
game: "big-game"
stage: 7
path: ["Season 2", "World 3", "Act 1", "Chapter 4"]
title: "The Final Confrontation"
hints: [...]
---
```

The game page renders all four levels as progressively indented headings. Each game can use a completely different structure — the depth is not fixed anywhere in the code.

---

## Project structure

```
src/
  content.config.ts        ← collection schemas (edit to add new fields)
  content/
    games/                 ← one .md file per game
    stages/
      [game-slug]/         ← one folder per game, one .md file per stage
  layouts/
    Layout.astro           ← base HTML layout with nav
  components/
    GameCard.astro         ← card shown on the home page
    StageCard.astro        ← card shown on the game detail page
    HintReveal.astro       ← spoiler-style hint reveal component
  styles/
    global.css             ← colors, typography, CSS variables
  pages/
    index.astro            → /                  (games list)
    games/[game].astro     → /games/:slug       (stage list)
    games/[game]/
      [stage].astro        → /games/:slug/:n    (hints page)
  public/
    images/                ← static images referenced in content
```
