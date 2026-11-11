# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session opened in
this folder. It changes identity and words only, so it finishes in one short session.

```text
Customize this interior design & styling studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
What I design, how I work and my personality in a few words: <e.g. small apartments and family living rooms, warm modern, practical and calm>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, the line above the headline, headline, introduction, the "Not sure where to begin?"
   title and small print, the photo captions, my approach (statement and principles), the gallery
   title and introduction (describe the KIND of rooms I work on — not invented projects), where to
   begin (situations in my clients' words, each with the EXACT name of one of my services), the
   consultations intro, the three "How booking works" facts, the three kind notes, what a
   consultation covers and what only a design project includes, the note about fees, how it works
   (steps, what to prepare, how to share photos), design projects (what a project can include and
   how it is agreed), the studio text and facts (where consultations happen, home visits, the rooms
   I work on), Questions (my real policies), the finding-us note and the search title and
   description. Keep field ids, types, limits and photos. Keep the sample photos (they stay
   labelled "Sample" until I upload my own). Headlines may set a few words in italics using
   *asterisks* — keep that style.
   Keep the honesty rules: one booking is one consultation; a consultation is advice, not a design
   project, drawings, sourcing or a mood board (a written recap only if my service says so);
   projects are quoted individually and agreed in writing; a free discovery call is not free
   design advice; nothing is paid online; video-call links are emailed by me after confirming;
   no consultation lengths or fees written into the copy; no invented clients, projects, budgets
   or before/after results.
4. Only if bottle green clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a deep colour that keeps white text at 4.5:1 —
   ink blue, oxblood, deep umber, slate), the colours in src/admin-theme.css and the colour in
   public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent consultations, fees, opening hours, qualifications, memberships, years of
experience, awards, press, completed projects, client names, reviews or testimonials I haven't
told you about — consultations, fees and hours are set in the dashboard. When done, run
npm run build and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your consultations:** dashboard → Services. One booking is one appointment with you.
  - **Kinds.** The page sorts services by the words in their names: *discovery / initial / first /
    introductory / intro* → **Getting started**; *follow-up / second / check-in* → **Continuing the
    conversation**; *styling / colour / color / materials / furniture / layout / lighting /
    consultation / review / session* → **Focused design advice**. Otherwise the description decides,
    then "More appointments".
  - **Where it happens.** End a description with `Format:` and your own words — `Format: At the
    studio`, `Format: By video call — I email you the link after confirming`, `Format: By phone — I
    call the number you give`. The page shows a small studio / video / phone mark and your sentence;
    the booking summary and confirmation repeat it. The engine creates no video links: you send them.
  - **Best for and You receive:** add `Best for:` and `You receive:`, items separated by `·` — for
    example `Best for: renters · small spaces. You receive: layout recommendations during the call`.
    Only list what the consultation really includes. If you add a written recap, say exactly what it
    is and when you send it.
  - **The featured consultation and call.** The first screen's "Not sure where to begin?" offers your
    *initial / first / introductory consultation* and your *discovery / intro call*, with their
    current length, fee and format. **Renamed one so it no longer matches?** Type its exact new name
    in Website → Welcome → *Featured consultation* / *Featured introductory call*. Hidden or deleted?
    The box simply offers "See which consultation suits you" — no stale name or fee is ever shown.
  - **Where to begin.** Each situation names one service, exactly as it is called in Services. If you
    rename that service, update the name here too; until then that situation shows "See all
    consultations".
  - **Fee** is for the consultation, paid after it. A fee of 0 shows as "Free" (keep a free call
    short, and describe it as an introduction). Leave *Starting price* off unless it really varies.
  - **Length** is the conversation itself. The buffer after it is your time to reset the sample table
    or write up notes.
- **Design projects:** Website → Design projects. Describe what your projects can include and how
  you agree them. Inquiries go to your business email as plain emails — the website does not store
  or track them.
- **Your photographs:** dashboard → Website → Welcome (one wide 3:2 photo — phones show it 4:3, keep
  the subject near the middle), Approach (upright), Inspiration gallery (two wide, two upright, three
  square details) and The studio (upright). Remove a photo to show the section without it — the
  gallery closes up. Each stays labelled "Sample" until you replace it. Use photos of your own
  completed work (with your clients' permission) or images you are licensed to use; caption them
  honestly.
- **Policies:** Questions is labelled "Sample policies" until you edit it — write your own
  rescheduling, payment and project answers.
