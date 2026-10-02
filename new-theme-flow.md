NEW THEME FLOW
================
Use this file when adding a new theme the same way the Events premium theme
(template-realestate-5) was added.

Give the assistant this file plus:
1. Category name (Events, Realestate, School, Business, or a new one)
2. Source path: a local folder OR a GitHub link
3. Which template inside that source to copy (example: template-1)

Do not change other categories. Do not restyle their editors.
A new theme gets its own variant number (example Footer-8), never reuse
Footer-7 / Contact-7 / Gallery-9 unless it is the same Events theme.


WHAT THE USER SENDS
--------------------
Copy this and fill it in:

Category: Pet Services
Source path or GitHub:https://github.com/abhishekk969389/DODO-Cares/tree/main
Template inside the source:
Theme title:Dog Care Premium 1
Variant number to use (next free number, example 8):


WHAT "SAME AS EVENTS" MEANS
---------------------------
Home page and inner pages render from that theme's own React components.
Section JSON for that theme lives in categoryContent.json under one template id.

Two edit paths only:

A) Sidebar managers (do not open the section popup)
   These home cards open the matching sidebar manager.
   Data on the cards comes from that manager, not from static cards.
   Events example:
   - Popular events  -> sidebar Events
   - Team            -> sidebar Teams
   - Blog            -> sidebar Blogs
   Inner pages for Events, Teams, Gallery, Blogs also use those managers.
   "Show on website" off removes the link from header and footer.
   Opening a hidden page shows the existing 404.

B) Section popup editor (EditableSection pencil)
   Every other section (banner, about, contact, awards, FAQ, footer, and so on)
   stays on the normal editor popup.
   Headings that should be inline-edited keep the pencil.
   Cards that belong to a manager do not get an image pencil.
   Clicking those cards opens the sidebar manager.

Do not invent a new overlay. Use the editor that already exists.


STEPS
-----
1. Read the source theme.
   From the local folder or GitHub, list pages, sections, images, and the
   JSON each section already uses.
   Keep the source design. Do not redraw it.

2. Pick the next variant number.
   Look at sectionRegistry.ts and categoryContent.json.
   If 7 is Events, the new theme uses the next free number (8, 9, ...).
   One theme = one number for all of its sections
   (Header-8, Banner-8, Footer-8, AboutPage-8, ...).

3. Add components.
   Folder: apps/frontend/app/editor/layout/src/components/sections/<section>/
   Name: <Category><Section><N>.tsx
   Events example: EventsFooter1.tsx registered as Footer-7.
   Register every component in sectionRegistry.ts with its variant key.
   Copy only the sections that exist in the source. Do not add empty pages.

4. Add the template record.
   File: apps/frontend/app/editor/layout/src/data/categoryContent.json
   Add one object in "templates":
   - id: template-<category>-<number>   example template-school-8
   - title, type (single page or multi page), preview image
   - sectionVariants: each section type -> that variant key
   - variables: colors from the source theme
   - homeSectionOrder: home sections in source order
   - pages: inner pages (about, contact, ...) in source order
   Put that theme's section JSON in the same template's "sections" block,
   keyed by variant (Footer-8, Contact-8, ...).
   Copy text, images, and lists from the source. Do not leave the shared
   demo (Kickoff workshop, Alex Morgan, Studio workspace) on this theme.

5. Images.
   Copy the source images into this project's public path and point JSON
   at those files. Do not hotlink a path that only exists on the other disk
   unless that file is also copied here.

6. Sidebar data for this theme only.
   If the theme has Events, Team, Gallery, or Blog managers:
   - Put this theme's real items on that page variant as productItems
     (events, team) or galleryItems (gallery).
   - Those arrays must be on the theme variant (TeamPage-8), not only on
     the shared TeamPage default.
   - Shared defaults stay for other categories.
   - Homepage cards read the sidebar list and keep this theme's card design.
   - 3 to 5 starter items is enough when the source has a long list.
   - Each item needs title, short text, image, and category.

7. Editor fields follow the variant, not the category.
   The popup shows only fields that this variant's component renders.
   Events example: Contact-7 has its own field list. Footer-7 has logo,
   description, social (max 6), columns, contact, legal, copyright.
   Another footer must not show those fields unless its component uses them.
   Add the allowlist for the new variant. Do not add fields to the shared
   footer form for every theme.
   Form fields: add and delete, max 6, same behavior as the existing form
   editor. Features or other lists: add and delete, with the max that design
   uses.

8. Links inside the editor.
   Header, footer, and cards must stay inside the editor.
   Do not send the browser to /blog/... or /events/... (those 404).
   Blog read-more opens that post in the editor.
   Event "View event" opens that event in the editor.
   Detail layout uses this theme's detail component when it exists
   (Events blog detail, event detail, team detail).

9. Do not break the rest.
   Other templates keep their variants, field limits, and icon lists.
   A new optional field on a shared manager (Events, Teams, Blogs, Gallery)
   is allowed. A visual redesign of those shared managers is not.
   Category-only sidebar items: this theme shows only the managers it uses.


DONE WHEN
---------
- New template id opens in the editor with this theme's pages.
- Home matches the source design.
- Manager sections open the sidebar and show this theme's items and images.
- Other sections open the existing popup and only their own fields.
- Header and footer links stay in the editor.
- Realestate, School, Business, and the current Events theme still look
  and edit the same.


DO NOT RUN — ADMIN UPLOAD (reminder only)
-----------------------------------------
This step is not part of the theme build.
Do not upload the layout or the template to admin while following steps 1–9.
Run this only when the user says, in this chat, to upload the layout and
template to admin. Until that sentence, skip this section.

When the user does say to run it, then:
- Upload this theme's layout in admin.
- Upload this theme's template in admin.
- Connect that admin template to the template id created in step 4
  (example template-school-8) so the editor and admin show the same theme.