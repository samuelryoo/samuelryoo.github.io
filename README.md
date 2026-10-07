# samuelryoo.github.io

Engineering portfolio of Samuel Ryoo: <https://samuelryoo.github.io>

The site is built with [Jekyll](https://jekyllrb.com/), which GitHub Pages runs automatically.
**Push to `main` and the site rebuilds itself in about a minute.** Nothing needs to be installed,
and everything below can be done from the GitHub website.

## Where things live

| Path | What it is |
|---|---|
| `_projects/` | One Markdown file per project. Each becomes a page at `/projects/<file-name>/` |
| `assets/projects/<file-name>/` | Photos and videos for that project |
| `_data/experience.yml` | Research, work, and leadership entries |
| `_data/skills.yml` | The toolchain table |
| `_data/focus.yml` | The four focus areas on the home page |
| `_data/nav.yml` | Top navigation |
| `index.html`, `pages/` | Home, Projects, Experience, About, Resume |
| `assets/resume/Samuel_Ryoo_Resume.pdf` | The resume shown on `/resume/` |
| `_layouts/`, `_includes/` | Page templates. Rarely need editing |
| `assets/css/main.css` | All styles. Colors and fonts are variables at the top |
| `redirects/` | Keeps the old `projects.html`, `resume.html`, `contact.html` links working |

## Add photos or videos to a project

1. Open the project's file in `_projects/` and look at the `hero:` and `media:` lists near the top.
   Each entry is a slot with a file name, alt text, and a caption.
2. Upload a file with that exact name to `assets/projects/<file-name>/`.

That is all. **A slot stays hidden until its file exists**, so the page never shows an empty box.
To add a new slot, copy an existing entry:

```yaml
media:
  - file: pcb-top.jpg                 # file in assets/projects/<file-name>/
    alt: Top side of the assembled board   # describe the picture for screen readers
    caption: Assembled board, top side.
    fit: contain                      # optional: show the whole image (diagrams, screenshots)
    wide: true                        # optional: span the full row
```

Videos (`.mp4`) work in the same list. The top of the page uses `hero.image`, or `hero.video`
with `hero.image` as its poster frame. The same `hero.image` is the thumbnail on project cards.

Keep files reasonably small: photos about 1800 px on the long side, videos 720p and under ~10 MB.

## Add a project

1. Copy an existing file in `_projects/`, for example `emg-hand.md`, to `_projects/my-project.md`.
2. Edit the block between the `---` lines:

   | Field | Purpose |
   |---|---|
   | `title`, `short_title` | Page title, and a short name for navigation |
   | `summary` | One or two sentences. Shown on cards and under the title |
   | `kind`, `role`, `team`, `timeline`, `status` | The facts table |
   | `order` | Position in lists. Lower numbers come first |
   | `featured` | `true` puts it on the home page and in the top group |
   | `stack` | Technology tags |
   | `highlights` | Up to three bullets on featured cards |
   | `specs` | Extra rows in the facts table (`label` and `value`) |
   | `chains` | Block diagrams: a list of `nodes`, each with `name`, optional `note`, and optional `link` (the label on the arrow to the next node) |
   | `tile_label` | Short code shown on the card until a hero photo exists |
   | `hero`, `media` | Photos and videos, as described above |

3. Write the case study below the second `---` in Markdown. A structure that works:
   Overview, My role, System, Decisions, Testing, Result, Limits.
4. Create `assets/projects/my-project/` and add media.

## Update the resume

Replace `assets/resume/Samuel_Ryoo_Resume.pdf` with a new file of the same name.

## Preview locally (optional)

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.
