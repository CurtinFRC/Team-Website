# Team 4788 "Can't Control" — Researched Facts (content source of truth)

Compiled 2026-07-15 from primary sources. **Every claim has a source.** This file is the authoritative content backbone for the "finish the website" work. Rules for anyone using it:

- Facts in **CONFIDENT** are cleared to publish as the team's own copy.
- Facts in **HOLD FOR TEAM CONFIRMATION** must NOT be asserted on live pages — render as a `{/* ponytail: ... */}` flag or omit.
- Never invent beyond what's here. If a page needs a fact not in this file, flag it, don't guess.

---

## Identity & history
- Founded **2013**; rookie year confirmed (The Blue Alliance, frc-events). CONFIDENT.
- **First FIRST team in Western Australia** — team-sourced claim, used consistently on their own channels. CONFIDENT to repeat as the team's own claim (it's their line).
- The team's early-history origin story (any earlier name or how the current team came together) is not documented from a primary source. **HOLD FOR TEAM CONFIRMATION** — do not assert an origin story on the site until the team confirms it.
- Earlier competition seasons (2015–2019) and their awards are drawn from FIRST's official event record for the team's earlier Curtin history and are shown on `/seasons` as part of one continuous record.
- Motto (site-wide): **"Ignite, Improve, Innovate."**
- Mission (their words): *"Our mission is to inspire students across Western Australia through world-class robotics, hands-on engineering, and inclusive STEM outreach."*
- Vision (their words): *"...a Western Australia where every student, regardless of geography, identity, or socioeconomic background, has the opportunity to engage in meaningful STEM experiences."*
- Based at **Curtin University, Bentley campus, Perth WA**, Building 205 (engineering). Park at car park 211 ("Big Car Park").
- Open Alliance member (public build blog on Chief Delphi). CONFIDENT they post an Open Alliance build blog; "first Australian Open Alliance team" framing is HOLD.

## Competition record (source: frc-events.firstinspires.org/team/4788 + year pages; 2025 Houston detail from JCCA news article)

| Year | Game | Robot | Events | Key result | Awards |
|---|---|---|---|---|---|
| 2013 | (rookie) | — | none recorded | — | — |
| 2015 | Recycle Rush | — | Australia Regional | Regional Finalists | — |
| 2016 | Stronghold | — | Australia Regional | 2-7-1, 40/43 | — |
| 2020 | Infinite Recharge | — | SCR & South Pacific | both cancelled (COVID) | — |
| 2021 | Infinite Recharge (At-Home) | **Slinger** | virtual challenges only | no official awards; made a Chairman's video anyway | tagline "WARP Winner" |
| 2022 | Rapid React | **Mercury** | Southern Cross Regional → Champs (Carver) | qualified for Houston | **Regional Engineering Inspiration Award** |
| 2023 | Charged Up | **Whiplash** | Southern Cross Regional → Champs (Curie) | SCR 2nd pick Alliance 6 | **Regional FIRST Impact Award** (→ Houston) |
| 2024 | Crescendo | **Notedog Millionaire** | Southern Cross Regional | Captain Alliance 7, QF exit; 12/47 | **Excellence in Engineering Award** |
| 2025 | Reefscape | **Gup-X** | SCR → Champs (Archimedes) → WARP | **Impact Award** at SCR; **Impact Award Finalist** at Champs (top ~6 globally); reached **Einstein/Archimedes elimination playoffs — a historic first** | Impact Award, 2× Dean's List Finalist |
| 2026 | **Rebuilt** | *(unnamed on site yet)* | Southern Cross Regional (Mar 2026); WARP Aug 14–16 2026 | quals 5-5, 17/42, Alliance 6 (round-2 pick) | **Creativity Award** (sponsored by Rockwell Automation) |

- Robot names all CONFIRMED on team4788.com itself + code repos.
- **2026 robot has no published name/tagline/photos yet** → HOLD; page uses game "Rebuilt" + the researched results + Creativity Award, with name/tagline/photos flagged.
- Existing robot taglines (keep verbatim): Gup-X "Small, light and fast – our most successful robot yet." · Notedog Millionaire "Third placed alliance at SCR, undefeated at WARP." · Whiplash "Tipped our way to a WARP win with our first swerve drive." · Mercury "A shoe that could shoot, with a post-match climb." · Slinger "WARP Winner."

## GitHub (github.com/CurtinFRC) — real per-season code repos
- 2021: `https://github.com/CurtinFRC/2021-GameChangers` (repo name is an oddity — FRC 2021 game was Infinite Recharge; verify before labelling). HOLD the label wording; the repo URL is real.
- 2022: `https://github.com/CurtinFRC/2022-RapidReact`
- 2023: `https://github.com/CurtinFRC/2023-ChargedUp`
- 2024: `https://github.com/CurtinFRC/2024-Crescendo`
- 2025: `https://github.com/CurtinFRC/2025-Reefscape` (README: "The code for our 2025 FRC robot, GupX")
- 2026: `https://github.com/CurtinFRC/2026-Rebuilt`
- Other notable public repos worth surfacing on /resources: `Training-Site` (powers learn.team4788.com), `Wombat` (C++ framework), `Numbat` (logging lib), `DemoBot`/`ForkliftDemoRobot` (outreach demo bots), `Outreach-Pi-Image`, `CAN-over-RJ45` (PCB). Org has 43 public repos.
- No public per-robot Onshape/CAD document URLs found → CAD links stay omitted or flagged. `CAD-Published` repo exists.

## YouTube (youtube.com/@CurtinFRC4788CantControl) — reveal videos
- 2022 Mercury reveal: `https://www.youtube.com/watch?v=4lhUvuCwx9k`
- 2023 Whiplash reveal: `https://www.youtube.com/watch?v=yIm9_B4ZfY0`
- 2024 Notedog Millionaire reveal: `https://www.youtube.com/watch?v=0yjWc-IrOJA`
- 2025 Gup-X reveal: `https://www.youtube.com/watch?v=ZXojtVOLL8c`
- 2021 Chairman's video: `https://www.youtube.com/watch?v=3KD_KQ93rOo` (no traditional reveal — virtual year)
- 2023 Impact Award video: `https://www.youtube.com/watch?v=UvU8SDmH-LA`
- No 2026 reveal found yet → HOLD.

## learn.team4788.com — "Training Course"
- The site's nav labels it **"Training Course"** (NOT Roboacademy — different thing).
- Built on **Material for MkDocs**, "a heavily modified version of FRCDesign.org." Powered by repo `CurtinFRC/Training-Site` (GPL-3.0).
- Content is currently **CAD/Onshape only**: nav = Home / Website Feature Guide / Learning Course / CAD Best Practices / Other Resources. "A guided curriculum through learning Onshape applied to robot design fundamentals" + a CAD Best Practices reference.
- Use on /resources as the "Training Course" external link with an accurate one-line description. (Not building a hub — per scope decision.)

## Roboacademy — the outreach program (DISTINCT from Training Course)
- Curtin University's own STEM-outreach page describes it: a **hands-on robotics workshop for ages 8–15**, building and programming robots with **LEGO Spike Prime and Micro:bit**, guided by university students. Source: curtin.edu.au/engage/stem-outreach.
- Real prior sessions: **9 & 17 April 2025, Victoria Park Community Centre**; an earlier session "18–19 January, 10am–3pm, book at tiny.cc/RoboAcademy" (Facebook). Use as evidence the program runs; treat specific future dates as HOLD (they go stale).
- Use LEGO **Spike Prime + Micro:bit** wording (NOT "Mindstorms").

## Joining the team (recruitment page facts) — from Curtin STEM-outreach page
- "Join Team 4788 to design, build, and compete with a large-scale robot."
- **Pre-season Design Program** leading into **Build Season (Jan–Mar)**; competes in **Sydney and Perth**.
- Cost **$620 incl. GST**; registration link `https://payments.curtin.edu.au/CF2512080262`. CONFIDENT.

## WARP (WA Robotics Playoffs) — recurring offseason event
- "A collaboration between Murdoch University, DPIRD, Curtin University and participating WA high schools," held at Curtin Stadium (Murdoch Uni news). Context for the many "WARP Winner"/"undefeated at WARP" mentions. CONFIDENT as event context.

## Sponsors (source: FIRST 2026 registration, frc-events)
- CONFIRMED current: **Curtin University; West Australian Robotics Education Specialists (WARES); Paradigm Machine Tool; DNA Racing; Packaging Perth; DSM Consulting Engineers.**
- **Artifactory** — appears as a logo on the current site but no independent confirmation. HOLD.
- Historical (2016/2022) only, likely not current: WA Dept. of Education, "School Pathways Program." HOLD.
- No dollar tier amounts are public → sponsor tier $ amounts are HOLD.

## Social links (from the live site's own nav — authoritative)
- GitHub `https://github.com/CurtinFRC`
- Facebook `https://www.facebook.com/Team4788`
- Instagram `https://www.instagram.com/frcteam4788/`
- YouTube `https://www.youtube.com/@CurtinFRC4788CantControl`

## Blog / build-blog sources (Chief Delphi)
- Continuous Open Alliance build blog thread: "Can't Control 4788 | Build Blog 2024" — created Oct 2023, still active into Jan 2026 (spans Crescendo → Reefscape → Rebuilt). `https://www.chiefdelphi.com/t/cant-control-4788-build-blog-2024/442349`
- Recurring "Robot in 3 Days" threads. 2021 Chairman's video + "Awards and Outreach Binder.pdf" thread: `https://www.chiefdelphi.com/t/team-4788-cant-control-chairmans-video-and-binder-2021/394211`
- Use as a linked source ("follow our build blog on Chief Delphi"), not for wholesale copying.

## HOLD FOR TEAM CONFIRMATION (residual review list)
1. The team's early-history origin story (any earlier name / how the team came together).
2. Artifactory as a current sponsor.
3. Sponsor tier dollar amounts.
4. Exact subteam list & descriptions for /structure.
5. Handbook & downloads files.
6. 2026 "Rebuilt" robot name, tagline, photos, reveal video.
7. Whether historical sponsors (WA Dept. of Education) are still active.
8. 2013–2014, 2017–2019 competition activity (no FIRST data found).
