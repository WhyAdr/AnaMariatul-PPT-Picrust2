# PowerPoint Presentation Layout Plan & Figure Explainer
## Fungal Community, Ecological Guilds (FUNGuild & FungalTraits), and Metabolic Predictions (PICRUSt2) in Mangrove Sample SC

**Document Title:** `AnaMariatul-SC-FunGuildFungalTrait-PICRUSt2-PPTexplainer.md`  
**Dataset Reference:** Sample `SC` (`barcode13` / `N701-1`; Oxford Nanopore Technologies [ONT] Long-Read ITS Amplicon Reanalysis; single sample, `n = 1`, no negative control or site replicates)  
**Host & Compartment Metadata:**  
* *Original Host Designation:* *Sonneratia caseolaris* (source of the `SC` sample code)
* *Updated Botanical Taxonomic Assessment:* *Sonneratia alba* (pioneer seaward mangrove species adapted to high salinity and daily tidal immersion)
* *Sample Compartment:* **Cut rhizosphere root tissue and surrounding intertidal sediment** (consistent with detecting both root-associated fungi, waterlogged sediment-dwelling zoosporic fungi, and co-amplified rhizosphere microfauna)  
**Target Audience:** Research Colleague (Ana Mariatul) — new to bioinformatics; requires clear, intuitive, and well-calibrated plain-English explanations of each figure.  
**Tone & Perspective:** Educational, encouraging, and scientifically careful. Connects the sequence results to plausible *Sonneratia alba* rhizosphere and sediment biology while clearly distinguishing direct sequence observations from database-derived ecological/metabolic hypotheses in a single-sample dataset.  
**Visual Asset & Layout Standard for PPT Generation:**  
* **Images:** 240 DPI PNG files in `12_visualizations_2026-10-30/figures/01_*.png` through `08_*.png`, plus `Report/data/electrophoresis.PNG` on Slide 08.
* **Density & Text Placement Rule:** To keep 16:9 widescreen slides visually clean (especially on dense slides like Slides 08, 10, 11, and 12), place the **"Visual Elements Guide (On-Slide Callouts)"** directly on the slide canvas next to the PNG, and place the longer **"Plain-English Elaboration (Extended Companion / Notes Pane)"** in the PowerPoint notes pane (or an optional companion handout slide).
* **Table-Only Callouts:** Items explicitly tagged **`[Table Callout — From Companion TSV, Not Plotted in PNG]`** come from the underlying source tables rather than the PNG labels, so the PPT layout should format them as supplementary side-boxes rather than pointing arrows at the image.
* **Typography:** Plain text and standard Unicode symbols are used throughout (no LaTeX `$...$` wrappers) for clean automated PPT generation and bilingual adaptation.

---

## Deck Overview & Navigation Structure

```
PART 1: INTRODUCTION & BIOINFORMATICS FOUNDATIONS
├── Slide 01: Title Slide & Project Context (Welcome to Your Mangrove ITS Data)
├── Slide 02: Quick Guide to Key Concepts (OTUs, Reads vs. Biomass, Guilds & NSTI)
└── Slide 03: Overview of the Sequencing Pipeline (From 103k Raw Reads to 34 Fungal Core OTUs)

PART 2: WHO IS IN YOUR SAMPLE? (COMMUNITY TAXONOMY)
└── Slide 04: Figure 01 — Community Context & Taxonomic Resolution (Sediment Chytrids & Unresolved Fungal Taxa)

PART 3: WHAT ARE THEY DOING? (ECOLOGICAL GUILDS & LIFESTYLES)
├── Slide 05: Figure 02 — Ecological Annotation Coverage (FungalTraits vs. FUNGuild)
├── Slide 06: Figure 03 — Putative Lifestyles & Ecological Guilds (Rhizosphere vs. Sediment Roles)
├── Slide 07: Figure 04 — Sensitivity Analysis & Workflow Concordance
└── Slide 08: SPECIAL SPOTLIGHT — Demystifying OTU_9 (Gibellulopsis: Gel Band Size Match, Chimera Audit & Ecology)

PART 4: WHAT IS THEIR METABOLIC POTENTIAL? (PICRUSt2 FUNCTIONAL PREDICTIONS)
├── Slide 09: Figure 05 — PICRUSt2 Diagnostics: Representation & Reference Distance (NSTI)
├── Slide 10: Figure 06 — Predicted Enzyme Categories (Housekeeping, Nomenclature Flags & Detritus Hydrolases)
├── Slide 11: Figure 07 — Predicted MetaCyc Metabolic Pathways (Core Fungal Metabolism in an Intertidal Milieu)
└── Slide 12: Figure 08 — Deconvoluting Pathways: Which OTUs & Reference Genomes Drive Predictions?

PART 5: ECOLOGICAL SYNTHESIS & NEXT STEPS
├── Slide 13: The Sonneratia alba Rhizosphere Synthesis: Connecting Mud Chytrids, Root Associates & Core Metabolism
└── Slide 14: Practical Takeaways & Exciting Directions for Future Research
```

---

# Detailed Slide-by-Slide Layout Plan & Elaborations

---

## PART 1: INTRODUCTION & BIOINFORMATICS FOUNDATIONS

### Slide 01: Title Slide & Project Context
* **Slide Title:** Long-Read Nanopore ITS Profiling of Sample SC: Community Structure, Ecological Guilds, and Metabolic Potential
* **Subtitle:** An Explainer Walkthrough of FUNGuild, FungalTraits, and PICRUSt2 Functional Predictions in *Sonneratia alba* Rhizosphere & Sediment
* **Visual Wireframe (16:9 Widescreen):**
  * Clean, welcoming two-column layout.
  * **Left Side (50%):** Project Metadata Card
    * *Sample ID:* `SC` (`barcode13` / `N701-1`; single sample, `n = 1`)
    * *Host Tree:* *Sonneratia alba* (originally labeled `SC` for suspected *S. caseolaris*; updated via botanical consultation)
    * *Sample Type:* Cut rhizosphere root tissue + surrounding intertidal sediment (containing litter)
    * *Sequencing Platform:* Oxford Nanopore Technologies (ONT) full-length `ITS1–5.8S–ITS2` amplicon
  * **Right Side (50%):** At-a-Glance Data Snapshot
    * Delivered Raw Reads: `103,015`
    * Primer-Verified Q≥12 Preprocessed Reads: `52,404`
    * All Supported Core ITS OTUs: `41` OTUs (`48,988` reads)
    * Conservative Fungal Core OTUs: `34` OTUs (`40,364` reads)
    * PICRUSt2 Functionally Predicted OTUs: `27` OTUs (`28,587` reads)
* **Plain Description for Slide:**
  * Welcome to the sequence-level reanalysis of your fungal amplicon dataset! Using Oxford Nanopore long-read sequencing with universal `ITS1` and `ITS4` primers, we captured the complete internal transcribed spacer (`ITS1–5.8S–ITS2`) region in single reads.
  * Sequencing `ITS1` and `ITS2` together provides stronger sequence resolution for environmental fungi than short-read amplicons, and allows us to reconstruct polished consensus sequences required for guild and functional exploration.
  * Because your sample represents a composite interface—**cut rhizosphere root tissue combined with surrounding intertidal mud and litter** beneath a seaward *Sonneratia alba* mangrove—the dataset captures both root-associated fungi and waterlogged sediment-dwelling fungi.
  * This walkthrough explains each of the 8 descriptive figures prepared from your dataset, showing how to read every panel, what sequence groups were detected, and how to interpret database predictions with appropriate scientific caution.

---

### Slide 02: Quick Guide to Key Concepts (Bioinformatics 101)
* **Slide Title:** Understanding the Fundamentals: Four Key Bioinformatic Concepts
* **Subtitle:** A Quick Reference Guide to Help You Read the Figures
* **Visual Wireframe:**
  * 4 distinct visual cards (2×2 grid), each with an intuitive icon/badge:
* **Card 1: What is an OTU? (Operational Taxonomic Unit)**
  * *Plain Meaning:* Wild environmental fungi do not carry species labels, and noisy individual Nanopore reads must first be polished into accurate consensus sequences. We group polished `ITS` sequences that share ≥98% identity into operational clusters called **OTUs** (`OTU_1`, `OTU_2`, etc.)—each OTU represents an operational sequence group, not automatically a verified biological species.
* **Card 2: Reads ≠ Number of Cells or Fungal Biomass!**
  * *Plain Meaning:* If one OTU has `9,715` reads and another has `970`, it means that DNA template was amplified and sequenced ~10× more often—NOT that there is 10× more fungal biomass in the mud. Fungi vary in ribosomal gene copy numbers per cell and PCR amplification efficiency, so we always report **read proportions** within the sequenced library.
* **Card 3: What are Ecological Guilds (FUNGuild & FungalTraits)?**
  * *Plain Meaning:* These are curated literature lookup tables that match a fungus's resolved genus (or family in FUNGuild) to published lifestyle records—such as **saprotroph** (organic matter/litter decomposer), **pathotroph** (capable of host infection), or **symbiotroph** (endophyte/mycorrhizal partner). They indicate literature-reported *capacities* of matched taxa, not direct measurements of disease or decay rates in your sample.
* **Card 4: What is NSTI in PICRUSt2?**
  * *Plain Meaning:* **NSTI** (*Nearest Sequenced Taxon Index*) measures evolutionary branch distance between your amplicon OTU and the closest sequenced fungal genome in PICRUSt2's reference tree. A low NSTI (`<0.20`) means a close genome relative exists; a high NSTI (`~1.0+`) means functions are extrapolated from a distant evolutionary relative.

---

### Slide 03: Overview of the Sequencing Pipeline
* **Slide Title:** How Your Raw Data Was Transformed into High-Confidence Fungal Clusters
* **Subtitle:** Primer Verification, Rescuing Long Amplicons (>900 bp), Consensus Polishing, and Eukaryote Filtering
* **Visual Wireframe:**
  * Horizontal process flow diagram with 4 progressive steps:
    1. **Delivered Raw ONT Reads (`103,015` reads):** Starting raw basecalled reads (`300–2,000 bp`), bypassing the service provider's `400–900 bp` length cutoff and TaxID-only k-mer table so true sequence representatives could be reconstructed.
    2. **Strict Primer & Quality Gate (`52,404` reads retained):** Retained reads with canonical `ITS1` and `ITS4` terminal primers, no internal tandem-primer artifacts, trimmed length ≥200 bp, and mean read quality `Q ≥ 12`. Notably, **`13,021` retained reads were originally `>900 bp`**—retaining long amplicons that match the **`~1,100–1,150 bp` upper band visible on your PCR agarose gel** (`Report/data/electrophoresis.PNG`), which a `900 bp` ceiling discards.
    3. **Consensus Discovery, 2× Racon Polishing & ITSx Normalization (`41` core OTUs, `48,988` reads):** Using `amplicon_sorter` (`amplicon_sorter_strict`), consensuses were polished twice with Racon on training reads (`41,743` reads) and trimmed to standardized `ITS` boundaries via `ITSx`. Across the **`10,661` held-out validation reads**, **`93.18%` (`9,934` reads)** mapped uniquely (`0.01%` ambiguous); across **all `52,404` preprocessed reads**, **`93.48%` (`48,988` reads)** mapped uniquely to the `41` core OTUs (`0.01%` [`4` reads] ambiguous; `6.51%` [`3,412` reads] unmapped).
    4. **Conservative Fungal Core Extraction (`34` fungal OTUs, `40,364` reads):** Screened against the all-eukaryote UNITE database and `ITSx` origin models. Because universal `ITS1`–`ITS4` primers also amplify non-fungal soil eukaryotes, this step separated **`7` non-fungal/uncertain core OTUs (`8,624` reads, `16.46%`)**—including rhizosphere nematodes (*Cervidellus* `OTU_15`/`OTU_38` and a Chromadorea nematode match for `OTU_3`)—before running fungal guild and PICRUSt2 analyses.

---

## PART 2: WHO IS IN YOUR SAMPLE? (COMMUNITY TAXONOMY)

### Slide 04: Figure 01 — Community Context & Taxonomic Resolution
* **Visual Asset:** `12_visualizations_2026-10-30/figures/01_community_context.png`
* **Slide Title:** Figure 01: Community Context & Taxonomic Resolution
* **Subtitle:** Accounting for All 52,404 Preprocessed Reads Across Core OTUs and Fungal Phyla
* **Visual Elements Guide (On-Slide Callouts):**
  * **Shared Denominator (`52,404` preprocessed reads):** Both panels express percentages out of all `52,404` preprocessed reads (`93.48%` assigned to core OTUs + `0.01%` ambiguous + `6.51%` unassigned = `100%`).
  * **Panel A (Read Assignment — Read-to-OTU Mapping Gate: `≥85%` identity & `≥90%` span):**
    * `Fungal input OTUs` (green): **`77.02%` (`40,364` reads)** across the `34` conservative fungal core OTUs.
    * `Other or uncertain core ITS` (medium gray): **`16.46%` (`8,624` reads)** across `7` non-fungal/uncertain core OTUs (such as co-amplified rhizosphere nematodes).
    * `Ambiguous assignment`: **`0.01%` (`4` reads)** with tied alignment scores between two OTUs.
    * `No qualifying assignment` (light gray): **`6.51%` (`3,412` reads)** below the read-to-OTU mapping threshold (`≥85%` identity / `≥90%` span).
  * **Panel B (Fungal Phylum Resolution — OTU-to-UNITE Taxonomy Gate: `≥90%` identity, `≥90%` query cov, `≥80%` ref cov):**
    * `Unresolved fungal phylum` (light gray): **`45.24%` (`23,705` reads)** — confirmed fungal `ITS` sequences (`ITSx` fungal origin) that cannot be conservatively assigned a named phylum under the UNITE database taxonomy thresholds.
    * `Chytridiomycota` (green): **`26.52%` (`13,895` reads)** — zoosporic aquatic/semi-aquatic fungi.
    * `Outside fungal input` (medium gray): **`22.98%` (`12,040` reads)** — combines the non-fungal/uncertain core (`8,624`), ambiguous (`4`), and unassigned (`3,412`) reads from Panel A (`77.02% + 22.98% = 100%`).
    * `Ascomycota` (green): **`5.27%` (`2,764` reads)** — filamentous micro-ascomycetes.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Why There Are Two Different Thresholds in Panel A vs. Panel B:** Panel A maps noisy individual Nanopore reads back to our own polished OTU consensus sequences (requiring `≥85%` read identity and `≥90%` aligned length). Panel B compares those polished OTU consensus sequences against the external UNITE reference database to assign taxonomy names (requiring `≥90%` sequence identity, `≥90%` query coverage, and `≥80%` reference coverage).
  * **Chytridiomycota (`26.52%`) in Context:** Over a quarter of preprocessed reads belong to **Chytridiomycota** (led by *Lobulomycetales* `OTU_1` with `9,715` reads and *Spizellomycetaceae* `OTU_7` with `2,982` reads). Because chytrids disperse via motile flagellated zoospores in water films, a high chytrid share is consistent with waterlogged, tidally inundated mangrove sediment where zoosporic fungi colonize submerged plant detritus, algae, pollen, and chitin.
  * **What "Unresolved Fungal Phylum" (`45.24%`) Represents:** This category combines two situations: (1) OTUs that pass full-length UNITE alignment at high identity (`>97%`) against sequenced environmental fungi that still lack a formal phylum name in UNITE (such as `OTU_6`, `3,180` reads, `99.2%` identical to an `Incertae_sedis` environmental fungus), and (2) divergent fungal lineages (such as `OTU_2`/`OTU_5` at `9,600` reads and `OTU_4` at `4,650` reads) whose ribosomal `ITSx` profile is fungal, but whose rapidly evolving `ITS1`/`ITS2` spacers fall below the strict `≥90%` full-length UNITE taxonomy gate.

---

## PART 3: WHAT ARE THEY DOING? (ECOLOGICAL GUILDS & LIFESTYLES)

### Slide 05: Figure 02 — Ecological Annotation Coverage
* **Visual Asset:** `12_visualizations_2026-10-30/figures/02_guild_annotation_coverage.png`
* **Slide Title:** Figure 02: Ecological Annotation Coverage
* **Subtitle:** How Much of Your Mangrove Fungal Community Can Literature Databases Currently Explain?
* **Visual Elements Guide (On-Slide Callouts):**
  * **Panel A (Annotation Coverage — Denominator: All `52,404` Preprocessed Reads):**
    * **FungalTraits (blue):** Annotates **`4.71%` (`2,466` reads)**; **`72.3%` (`37,898` reads)** are unassigned fungal-core reads, and **`23.0%` (`12,040` reads)** lie outside the fungal input.
    * **FUNGuild Probable/Highly Probable (purple):** Annotates **`10.67%` (`5,594` reads)**; **`66.3%` (`34,770` reads)** are unassigned fungal-core reads, and **`23.0%` (`12,040` reads)** lie outside the fungal input.
  * **Panel B (Read Coverage vs. OTU Coverage — Denominator: `40,364` Fungal Reads / `34` Fungal OTUs):**
    * **FungalTraits:** Matches **`4` of `34` fungal OTUs (`11.8%`)**, accounting for **`6.1%` of fungal reads** (leaving **`93.9%` of fungal reads** unannotated).
    * **FUNGuild:** Matches **`6` of `34` fungal OTUs (`17.6%`)**, accounting for **`13.9%` of fungal reads** (leaving **`86.1%` of fungal reads** unannotated).
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Why Coverage Is Low (`6.1%–13.9%` of Fungal Reads):** FungalTraits looks up traits strictly by **genus** name, and FUNGuild looks up traits by **genus or family** name. Because the most abundant OTUs in Sample `SC` (such as *Lobulomycetales* `OTU_1` at `9,715` reads and unresolved-phylum fungal OTUs) do not have genus-level matches in UNITE, literature trait tables have no entry for >86% of your fungal reads.
  * **Why FUNGuild Annotates More Reads Than FungalTraits (`10.67%` vs. `4.71%`):** FUNGuild permits **family-level** matching—assigning guilds to family *Spizellomycetaceae* (`OTU_7`, `2,982` reads) and family *Herpotrichiellaceae* (`OTU_23`, `146` reads)—whereas FungalTraits requires a resolved genus. Higher coverage therefore reflects broader rank matching rather than higher specificity.
  * **How to Interpret These Percentages:** Keeping the unassigned bars visible in Panel A prevents a common pitfall where a guild comprising `4%` of total reads is misread as `40%–85%` of the community simply because only the annotated fraction was plotted.

---

### Slide 06: Figure 03 — Putative Lifestyles & Ecological Guilds
* **Visual Asset:** `12_visualizations_2026-10-30/figures/03_guild_lifestyle_composition.png`
* **Slide Title:** Figure 03: Putative Lifestyles & Guild Composition
* **Subtitle:** Deconstructing FungalTraits Lifestyles, FUNGuild Trophic Modes, and the Role of OTU_9
* **Visual Elements Guide (On-Slide Callouts):**
  * **All x-axes retain the `52,404`-read denominator** so bar lengths reflect true shares of preprocessed reads.
  * **The Diagonal Hatching Key:** Hatched segments indicate the contribution of **`OTU_9` (*Gibellulopsis*, `2,101` reads = `4.01%`)**, tracked separately because of an automated `?` reference-chimera flag audited on Slide 08.
  * **Panel A (FungalTraits Primary Lifestyle):** `plant pathogen` at **`4.01%` (`2,101` reads — 100% hatched, entirely `OTU_9`)** and `soil saprotroph` at **`0.70%` (`365` reads — solid**, contributed by *Wardomycopsis* `OTU_19` [`235`], *Microascus* `OTU_31` [`98`], and *Alloconiothyrium aptrootii* `OTU_41` [`32`]).
  * **Panel B (FungalTraits Secondary Lifestyle):** `litter saprotroph` at **`4.20%` (`2,199` reads** — a small **solid `0.19%` [`98`-read] left segment** from *Microascus* `OTU_31` plus **`4.01%` [`2,101` reads] hatched** from `OTU_9`) and `foliar endophyte` at **`0.45%` (`235` reads — solid**, *Wardomycopsis* `OTU_19`).
  * **Panel C (FUNGuild Combined Guild Labels):** Led by `Plant Pathogen-Undefined Parasite-Undefined Saprotroph` (**`5.69%`, `2,982` reads — solid purple**, family-level match to chytrid *Spizellomycetaceae* `OTU_7`) and `Plant Pathogen` (**`4.01%`, `2,101` reads — 100% hatched**, `OTU_9`), followed by four smaller Ascomycota saprotroph/endophyte/mixed categories (`0.45%`, `0.28%`, `0.19%`, `0.06%`).
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Broad Chytrid Guild Labels (`5.69%` in Panel C):** FUNGuild assigns family *Spizellomycetaceae* (`OTU_7`) a combined multi-guild label because described members of this chytrid family span saprotrophs on plant/pollen detritus and parasites of soil/aquatic organisms. Retaining the combined label avoids counting the same `2,982` reads multiple times.
  * **Understanding the "Plant Pathogen" Bar (`4.01%`):** Rather than indicating a broad community of plant pathogens—or proving that the sampled *Sonneratia alba* tree was diseased—the hatching shows that **100% of the single-guild `plant pathogen` bar in Panels A and C comes from one taxon (`OTU_9`, *Gibellulopsis*)**, which Panel B simultaneously lists with secondary lifestyle **`litter saprotroph`**. Primary and secondary FungalTraits fields describe alternative capacities of the same organism and are never added together.

---

### Slide 07: Figure 04 — Sensitivity Analysis & Workflow Concordance
* **Visual Asset:** `12_visualizations_2026-10-30/figures/04_guild_sensitivity.png`
* **Slide Title:** Figure 04: Sensitivity Analysis & Pipeline Stability
* **Subtitle:** Testing the Impact of Omitting OTU_9 and Comparing Three Independent Clustering Workflows
* **Visual Elements Guide (On-Slide Callouts):**
  * **Panel A (Excluding Borderline `OTU_9`):** Dumbbell comparison showing how total annotated read coverage shifts if `OTU_9` (`2,101` reads) is omitted: FungalTraits drops from **`4.71%` (`2,466` reads) to `0.70%` (`365` reads, all soil saprotrophs)**, and FUNGuild drops from **`10.67%` (`5,594` reads) to `6.67%` (`3,493` reads)**.
  * **Panel B (Alternative Processing Workflows):** Compares annotated read percentages across three independent discovery pipelines run on the same reads: `VSEARCH 90%` (**`4.89%` / `10.76%`**), `VSEARCH 95%` (**`4.87%` / `10.71%`**), and our primary `amplicon_sorter` workflow (**`4.71%` / `10.67%`**).
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Technical Stability Across Algorithms (Panel B):** Although greedy `VSEARCH` clustering splits noisy ONT reads into more low-support clusters (`72–77` OTUs vs. `41` in `amplicon_sorter`), the resulting guild totals remain virtually unchanged (`~4.7–4.9%` FungalTraits; `~10.7–10.8%` FUNGuild). This confirms that the guild summary is stable across clustering methods within this sample.
  * **Why `OTU_9` Sensitivity Matters (Panel A):** Because only `4` to `6` OTUs receive database guild assignments, `OTU_9` alone accounts for `85%` of FungalTraits-annotated reads (`2,101 / 2,466`). That makes our next slide—a closer examination of `OTU_9`—important for interpreting the guild charts.

---

### Slide 08: SPECIAL SPOTLIGHT — Demystifying OTU_9 (Gibellulopsis)
* **Visual Asset:** `Report/data/electrophoresis.PNG` (cropped to show Lane 1's multi-band PCR profile including the `~1,100–1,150 bp` upper band, paired with a schematic comparing `OTU_9`'s `520 bp` vs. `1,131 bp` consensuses and UCHIME alignment)
* **Slide Title:** Special Spotlight: What Exactly Is OTU_9 (*Gibellulopsis*)?
* **Subtitle:** Amplicon Structure, Gel Band Size Consistency, Chimera Audit, and Plausible Rhizosphere Ecology
* **Visual Elements Guide (On-Slide Callouts — Split-Screen Dossier):**
  * **Left Card (Sequence Identity, Intron Structure & Ecology):**
    * *UNITE Match:* ***Gibellulopsis*** (Ascomycota: *Plectosphaerellaceae*, `2,101` reads = `4.01%` of preprocessed reads), aligning at **`99.55%` identity (`446/448 bp`, 2 SNPs)** to *Gibellulopsis piscis* (`DQ825985`).
    * *Two Amplicon Lengths (`520 bp` & `1,131 bp`):* `OTU_9` merges an intronless `520 bp` consensus (`00012`) and a `1,131 bp` consensus (`00039`, carrying a ~600 bp `18S SSU` 3' insertion spliced out by `ITSx`) whose extracted `470 bp` `ITS` regions are `98.9%` identical. The `1,131 bp` length (alongside three minor `1,133–1,185 bp` ascomycetes `OTU_19`, `OTU_31`, `OTU_39`) **is consistent with the `~1,100–1,150 bp` upper band visible on the PCR agarose gel** (`Report/data/electrophoresis.PNG`).
    * *Literature Guilds:* FungalTraits lists primary `plant_pathogen` and secondary **`litter_saprotroph`**.
  * **Right Card (Why UCHIME-Ref Emitted `?` Instead of `N` or `Y`):**
    * *De Novo Chimera Screen:* Passed (`N`, score `0.0317`).
    * *Reference Chimera Screen (`?`):* `OTU_9` matches *Gibellulopsis piscis* (`DQ825985`) across `446/448 bp`, but GenBank record `DQ825985` is missing `22 bp` at the 5' end of `ITS1`. A related *Plectosphaerellaceae* sequence (*Verticillium dahliae* `EF377335`, `80.9%` overall identity) includes that `22 bp` 5' segment and shares `2` SNPs (`LY = 2`, `div = 0.5%`).
    * *Thresholds:* Fails VSEARCH's positive chimera requirements (`mindiffs ≥ 3` and `mindiv ≥ 0.8%`), triggering a borderline `?` flag due to reference 5' truncation rather than a clear PCR mosaic.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Why Retained with Hatching:** Under the pipeline's pre-specified rule (excluding positive `Y` chimeras while retaining `N` and `?`), `OTU_9` was kept in the fungal core and highlighted with hatching so its exact contribution remains transparent on every guild and pathway plot.
  * **Biological Interpretation Limits:** Because this dataset comes from a single composite sample of cut roots and surrounding litter-bearing sediment without host-symptom records or separate root vs. mud replicates, DNA sequence data alone cannot prove whether *Gibellulopsis* was acting as a weak vascular pathogen, an asymptomatic root endophyte, or a saprotroph on decaying root/leaf litter—though its dual `plant_pathogen` / `litter_saprotroph` trait profile shows why single-label pathogen summaries should not be over-interpreted.

---

## PART 4: WHAT IS THEIR METABOLIC POTENTIAL? (PICRUSt2 FUNCTIONAL PREDICTIONS)

### Slide 09: Figure 05 — PICRUSt2 Diagnostics: Representation & Reference Distance
* **Visual Asset:** `12_visualizations_2026-10-30/figures/05_picrust2_diagnostics.png`
* **Slide Title:** Figure 05: Fungal PICRUSt2 Diagnostics & Reference Distance
* **Subtitle:** Evaluating Read Retention (`54.55%`) and Evolutionary Distance (`Weighted NSTI = 1.047`) Before Interpreting Pathways
* **Visual Elements Guide (On-Slide Callouts):**
  * **Panel A (Representation Funnel — `% of 52,404 preprocessed reads`):**
    * `Fungal input`: **`34` OTUs (`40,364` reads = `77.02%`)**.
    * `Placed` on fungal reference tree: **`29` OTUs (`29,429` reads = `56.16%`)** — `5` divergent OTUs (`10,935` reads, including the unresolved-phylum `OTU_2`/`OTU_5` pair [`9,600` reads] with a partial `5.8S` HMM match) failed the alignment gate (`--min_align 0.5`).
    * `Used for predictions`: **`27` OTUs (`28,587` reads = `54.55%` of preprocessed reads / `27.75%` of raw reads)** after removing `2` OTUs above `NSTI = 2.0`.
  * **Panel B (Reference Distance vs. Abundance, Log Scale):** Plots each placed OTU's read count (`10²` to `10⁴`) against its per-OTU NSTI. Labeled landmarks include Ascomycota **`OTU_9`** on the upper left (`2,101` reads, **`NSTI = 0.271`**), dominant chytrid **`OTU_1`** at the top (`9,715` reads, **`NSTI = 1.383`**), and the two red `×` markers excluded past the dashed `2.0` cutoff (**`OTU_13`** at `2.17` and **`OTU_33`** at `2.42`, `842` reads total). Overall **weighted NSTI is `1.047`** (median `0.913`).
  * **Panel C (Eligibility Sensitivity Curve):** Shows read retention across hypothetical NSTI cutoffs: **`0%`** at `NSTI ≤ 0.20`, **`4.72%`** at `NSTI ≤ 0.50`, and a large vertical step from **`34.9%` to `53.5%` at `NSTI ≈ 1.38`** where `OTU_1` enters.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * Unlike bacterial 16S PICRUSt2 (backed by tens of thousands of reference genomes, where `NSTI < 0.15` is common), PICRUSt2's fungal `fungi_ITS` database relies on a small reference tree, and the tool's developers caution that fungal predictions have limited accuracy.
  * Accordingly, Figures 06–08 should be treated strictly as an **exploratory, hypothesis-generating supplement** covering `54.55%` of preprocessed reads at `Weighted NSTI = 1.047`—not as measurements of actual gene content, transcription, or enzyme activity.

---

### Slide 10: Figure 06 — Predicted Enzyme Categories (EC Profile)
* **Visual Asset:** `12_visualizations_2026-10-30/figures/06_picrust2_ec_profile.png`
* **Slide Title:** Figure 06: Predicted Enzyme Profiles (840 EC Categories)
* **Subtitle:** Core Housekeeping Machinery, Database Nomenclature Status, and Detrital Polysaccharide Hydrolases
* **Visual Elements Guide (On-Slide Callouts):**
  * **Panel A (Top 15 Predicted EC Categories — Plotted in PNG):** Ranks the `15` largest Enzyme Commission (EC) predictions (million model units).
    * **Blue bars (`11` of Top 15):** Active named EC entries in PICRUSt2's bundled description map, led by housekeeping enzymes—`EC:3.6.1.3` (*Adenosinetriphosphatase*, Rank 1), `EC:2.7.7.6` (*DNA-directed RNA polymerase*, Rank 3), `EC:5.2.1.8` (*Peptidylprolyl isomerase*, Rank 4), `EC:2.7.7.7` (*DNA-directed DNA polymerase*, Rank 5)—and polysaccharide hydrolase **`EC:3.2.1.3` (*Glucan 1,4-alpha-glucosidase*, Rank 6)**.
    * **Gray bars (`4` of Top 15 — Ranks 2, 9, 14, 15):** Older EC IDs labeled `Transferred entry ...` or `Deleted entry` (`EC:3.1.2.15` at Rank 14). Across all `840` ECs, `58` are transferred and `2` are deleted IUBMB catalog identifiers—meaning the catalog number was later merged or retired after PICRUSt2 froze its fungal map, not that the gene is missing.
  * **Panel B (Broad EC Classes — Plotted in PNG):** Sums all `840` predicted ECs into **6 IUBMB biochemical classes (`EC 1`–`EC 6`)**:
    1. **`EC 3` Hydrolases** (`14.48M` units, `238` ECs — #1 class, including ATPases cataloged under `EC 3.6.x` in older IUBMB maps alongside glycosidases, phosphatases, peptidases, and esterases)
    2. **`EC 2` Transferases** (`10.32M` units, `228` ECs)
    3. **`EC 1` Oxidoreductases** (`5.42M` units, `208` ECs)
    4. **`EC 6` Ligases** (`3.80M`, `54` ECs), **`EC 5` Isomerases** (`2.62M`, `38` ECs), and **`EC 4` Lyases** (`2.14M`, `74` ECs).
  * **`[Table Callout — From Companion TSV, Not Plotted in PNG]` Ranks 17–23 in `tables/ec_predicted_profiles.tsv`:**
    * Just below the Top-15 plot cutoff, the full 840-EC table includes conserved fungal enzymes involved in cell-wall and detrital processing: **Chitin synthase (`EC:2.4.1.16`, Rank 17)**, **Glutathione transferase (`EC:2.5.1.18`, Rank 18)**, **L-arabinose isomerase (`EC:5.3.1.4`, Rank 19)**, and **Chitinase (`EC:3.2.1.14`, Rank 23)**.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Interpreting Predicted Enzymes:** The dominance of ATPases, polymerases, chaperones, and proteasome/phosphatase enzymes in Panel A reflects universal eukaryotic housekeeping genes present in every sequenced fungal reference genome.
  * **Polysaccharide & Chitin Turnover Potential:** The presence of *Glucan 1,4-alpha-glucosidase* (`EC:3.2.1.3`, Rank 6 on the chart) and lower-rank *L-arabinose isomerase* (`EC:5.3.1.4`) and *Chitinase* (`EC:3.2.1.14`) in the companion table reflects conserved fungal capacities for breaking down starch/glucans, plant hemicellulose pentoses, and fungal/arthropod chitin—functions plausibly relevant to saprotrophic turnover in litter-bearing mangrove sediment.

---

### Slide 11: Figure 07 — Predicted MetaCyc Metabolic Pathways
* **Visual Asset:** `12_visualizations_2026-10-30/figures/07_picrust2_pathway_profile.png`
* **Slide Title:** Figure 07: Predicted MetaCyc Metabolic Pathway Profile
* **Subtitle:** Top 20 of 67 Reconstructed Fungal Pathways: Core Eukaryotic Bioenergetics & Conserved Fungal Metabolism
* **Visual Elements Guide (On-Slide Callouts):**
  * Horizontal bar chart ranking the **Top 20 MetaCyc pathways** (thousand model units) out of `67` positive pathways predicted.
  * **Solid green segments:** Combined contribution from the `26` other retained fungal OTUs.
  * **Hatched green segments:** Stratified contribution from `OTU_9` (*Gibellulopsis*, `2.4%–11.1%` across most top pathways, and `23.6%` at Rank 18).
  * **Pathway Groups on the Chart:**
    * *Ranks 1–12 (Core Energy, Nucleotide & Fatty-Acid Metabolism):* Aerobic respiration I & II (`PWY-3781`, `PWY-7279`), peroxisomal fatty-acid beta-oxidation (`PWY-7288`), de novo pyrimidine/purine nucleotide biosynthesis & phosphorylation (`PWY-7184`, `PWY-6126`, `PWY-7219`, `PWY-7229`, `PWY-7197`, `PWY-7228`), fungal TCA cycle II (`PWY-5690`), methyl ketone biosynthesis (`PWY-7007`, Rank 10), and `TRNA-CHARGING-PWY` (Rank 12).
    * *Ranks 13–15 (Cell Wall, Signaling & C2 Carbon Shunt):* **GDP-mannose biosynthesis (`PWY-5659`, Rank 13)**, **D-myo-inositol (1,4,5)-trisphosphate biosynthesis (`PWY-6351`, Rank 14)**, and the **glyoxylate cycle (`GLYOXYLATE-BYPASS`, Rank 15)**.
    * *Ranks 16–20 (Nucleoside Salvage & Branched-Chain Fermentation):* Pyrimidine/guanosine salvage and degradation (`PWY-7196`, `PWY-6606`, `PWY-7208`, `PWY-7221`) plus **`pyruvate fermentation to isobutanol (engineered) (PWY-7111)` at Rank 18**.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **How Conserved Pathways Relate to Sediment & Rhizosphere Life (Ranks 13–15):** GDP-mannose biosynthesis (`PWY-5659`) supplies precursors for cell-wall mannoproteins; inositol trisphosphate biosynthesis (`PWY-6351`) supports eukaryotic membrane/stress signaling; and the glyoxylate cycle (`GLYOXYLATE-BYPASS`, paired with Rank 3 fatty-acid beta-oxidation) allows fungi to assimilate 2-carbon compounds (such as acetate and fatty acids) without losing carbon as CO₂.
  * **Crucial Caveat Against Over-Claiming:** As shown on Slide 12, `81.5%–87.1%` of the predicted abundance of `GLYOXYLATE-BYPASS`, `PWY-5659`, and `PWY-6351` is projected from a single terrestrial soil chytrid reference genome (*Spizellomyces punctatus* `Spipu1`). Therefore, these pathways represent **universal core fungal metabolic machinery** that is plausibly useful in organic-rich intertidal sediment—**not** habitat-specific marine halotolerance genes discovered in *Sonneratia alba* strains.
  * **Why Does Rank 18 Say `(engineered)` (`PWY-7111`)?** MetaCyc names pathway entries after the experimental organism or engineered system in which the complete pathway record was curated. Wild fungi naturally possess the component enzymes (involved in valine/isoleucine biosynthesis and Ehrlich fusel-alcohol metabolism, particularly in *Gibellulopsis* reference relative `Veral1`), so PICRUSt2 scores the shared enzyme reactions—it does **not** indicate engineered organisms in the sample.

---

### Slide 12: Figure 08 — Deconvoluting Pathways: Which Fungi Drive Predictions?
* **Visual Asset:** `12_visualizations_2026-10-30/figures/08_picrust2_otu_contributions.png`
* **Slide Title:** Figure 08: Deconvoluting Pathways: Which OTUs Drive the Predictions?
* **Subtitle:** Stratified Heatmap of the Top 12 MetaCyc Pathways Across All 27 Retained Fungal OTUs
* **Visual Elements Guide (On-Slide Callouts):**
  * **Heatmap Layout (Plotted in PNG):** Rows list the Top 12 MetaCyc pathways; columns list all `27` retained OTUs ordered left-to-right by ITS-copy-normalized abundance (`*` marks `OTU_9*` in column 5). Each row sums to `100%`, with cell values `≥10%` printed directly on the plot.
  * **Top 4 Columns Carry ~72% of Predicted Reads (`70%–78%` Across Every Top-12 Pathway Row):**
    1. **`OTU_1` (`33%–37%` printed in column 1)** — Chytridiomycota (*Lobulomycetales*, `9,715` reads)
    2. **`OTU_4` (`16%–18%` printed in column 2)** — Unresolved fungal phylum (`4,650` reads)
    3. **`OTU_6` (`11%–12%` printed in column 3)** — Unresolved fungal phylum (`3,180` reads)
    4. **`OTU_7` (`10%–11%` printed in column 4)** — Chytridiomycota (*Spizellomycetaceae*, `2,982` reads)
    *(followed in column 5 by Ascomycota **`OTU_9*`**, *Gibellulopsis*, `2,101` reads, contributing `2.4%–8.1%`).*
  * **`[Table Callout — From Companion TSV, Not Plotted in PNG]` Reference Genomes & NSTI (`marker_predicted_and_nsti.tsv.gz` & `tables/otu_annotation_and_nsti.tsv`):**
    * **Predicted `ITS` copy number = `1`** for all `29` placed OTUs (draft fungal genome assemblies collapse repetitive rDNA arrays, so copy-normalized abundance order equals raw read count order).
    * **14 of the 27 retained OTUs (`24,696 / 28,587` reads = `86.4%` of predicted reads—including `OTU_1` [`NSTI = 1.38`], `OTU_4` [`0.83`], `OTU_6` [`1.11`], and `OTU_7` [`0.91`]) share the exact same closest sequenced reference genome: *Spizellomyces punctatus* (`Spipu1`)!**
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Why Columns 1–4 Look Like Uniform Vertical Stripes (`34, 16, 11, 11`):** Because `OTU_1`, `OTU_4`, `OTU_6`, and `OTU_7` all inherit their predicted enzyme counts primarily from the same nearest chytrid reference genome (`Spipu1`) with `ITS_count = 1`, their relative contributions to nearly every housekeeping pathway simply mirror their share of total predicted reads (`34.0%`, `16.3%`, `11.1%`, and `10.4%`, summing to `71.8%`).
  * This directly explains the footnote printed at the bottom of Figure 08: *"Contribution similarity can reflect shared reference predictions and organism abundance; it does not demonstrate metabolic interactions."* Note also that placement near `Spipu1` for `OTU_4` and `OTU_6` only identifies the closest genome on PICRUSt2's sparse fungal tree (`NSTI = 0.83–1.11`), not a confirmed taxonomic phylum assignment.

---

## PART 5: ECOLOGICAL SYNTHESIS & NEXT STEPS

### Slide 13: The Sonneratia alba Rhizosphere Synthesis: Putting the Pieces Together
* **Slide Title:** Ecological Synthesis: Interpreting Sample SC in a *Sonneratia alba* Context
* **Subtitle:** Connecting Sequence Observations to Plausible Roles in Cut Rhizosphere Roots and Intertidal Sediment
* **Visual Wireframe:**
  * 3 thematic summary pillars separating **Observed Sequence Evidence** from **Plausible Ecological Interpretation** in this single-sample dataset:
* **Pillar 1: Abundant Zoosporic Chytrids & Unresolved Fungal Lineages**
  * *Observed in Sample SC:* **Chytridiomycota (`26.52%`, `13,895` reads)** outnumber Ascomycota (**`5.27%`, `2,764` reads**) by 5-to-1, alongside **`45.24%` (`23,705` reads)** unresolved-phylum fungal reads and **`16.46%` (`8,624` reads)** non-fungal/uncertain eukaryotic amplicons (including rhizosphere nematodes).
  * *Plausible Ecological Context:* The high proportion of zoosporic chytrids (*Lobulomycetales* `OTU_1`, *Spizellomycetaceae* `OTU_7`) is consistent with waterlogged, tidally inundated *Sonneratia alba* mud, where flagellated fungi colonize submerged particulate detritus, algae, pollen, and chitin while remaining underrepresented at genus rank in reference databases.
* **Pillar 2: Root- and Litter-Associated Ascomycetes**
  * *Observed in Sample SC:* Detection of ***Gibellulopsis* (`OTU_9`, `4.01%`, whose `1,131 bp` intron-bearing consensus matches the size of the `~1,100–1,150 bp` upper band on the PCR gel)** alongside minor saprotrophs/endophytes (*Wardomycopsis* `OTU_19`, *Microascus* `OTU_31`, *Alloconiothyrium aptrootii* `OTU_41`, *Herpotrichiellaceae* `OTU_23`).
  * *Plausible Ecological Context:* While database lookup assigns *Gibellulopsis* a primary `plant_pathogen` label from crop literature, its secondary `litter_saprotroph` annotation is equally consistent with an asymptomatic root-associated endophyte or saprotroph in cut rhizosphere roots and litter-containing sediment.
* **Pillar 3: Conserved Core Fungal Metabolism (`Weighted NSTI = 1.047`)**
  * *Observed in PICRUSt2 Output:* `840` predicted ECs (led by `EC 3` Hydrolases, including Rank 6 glucanase `EC:3.2.1.3` and lower-rank chitinase/cell-wall/antioxidant enzymes) and `67` MetaCyc pathways (aerobic respiration, fatty-acid beta-oxidation, glyoxylate cycle, GDP-mannose, and inositol signaling) across `54.55%` of preprocessed reads.
  * *Plausible Ecological Context:* Projected largely (`86.4%`) from terrestrial chytrid reference *Spizellomyces punctatus* (`Spipu1`), these predictions reflect conserved baseline fungal pathways for C2 lipid/acetate assimilation and polysaccharide/chitin breakdown rather than direct detections of marine-specific adaptation genes.

---

### Slide 14: Practical Takeaways & Exciting Directions for Future Research
* **Slide Title:** Key Takeaways and Next Steps for Your Research Project
* **Subtitle:** What You Can Conclude Confidently Today — and How to Build on This Single-Sample Baseline
* **Visual Wireframe:**
  * Two-column split: "Conclusions Directly Supported by This Dataset" vs. "Recommended Next Steps":
* **Left Column: What You Can Conclude Confidently**
  1. *Full-Length ONT Consensus Recovery:* Rebuilding consensus OTUs from primer-verified `Q≥12` reads retained `13,021` long reads `>900 bp` (consistent with the `~1,100–1,150 bp` upper band on the PCR gel), separated `7` co-amplified non-fungal/uncertain OTUs (including rhizosphere nematodes), and defined `34` conservative fungal OTUs (`40,364` reads).
  2. *Chytrid & Unresolved-Lineage Dominance:* In this composite cut-root and sediment sample, Chytridiomycota (`26.52%`) and unresolved-phylum fungi (`45.24%`) account for the vast majority of fungal reads, while Ascomycota account for `5.27%`.
  3. *Transparent Guild Coverage & `OTU_9` Verification:* Existing trait databases annotate `4.71%` (FungalTraits) and `10.67%` (FUNGuild) of preprocessed reads (`6.1%` and `13.9%` of fungal reads). Sequence alignment confirms `OTU_9` (*Gibellulopsis*, `99.55%` match to *G. piscis*) is non-chimeric (`?` caused by reference 5' truncation) and drives `100%` of the single-guild `plant pathogen` bar while also carrying a secondary `litter_saprotroph` annotation.
  4. *Exploratory Functional Supplement:* PICRUSt2 predictions (`27` OTUs, `54.55%` of preprocessed reads, `Weighted NSTI = 1.047`, `86.4%` mapped to reference `Spipu1`) provide hypothesis-generating profiles of conserved fungal hydrolases and core metabolic pathways, not direct measurements of in situ gene expression or marine adaptation.
* **Right Column: Recommended Future Work**
  1. *Biological Replication, Controls & Compartment Separation:* Collect multi-tree replicates (`n ≥ 3–5` per site/zone) alongside DNA extraction and PCR negative controls, separating **washed surface-sterilized roots**, **rhizosphere mud**, and **bulk sediment** to test which taxa are true root endophytes versus sediment dwellers.
  2. *Targeted Culturing & Gel-Band / Salinity Assays:* Isolate root-associated ascomycetes and bait zoosporic chytrids across estuarine NaCl gradients (or excise and sequence the `~1,130 bp` gel band directly) to experimentally verify salinity tolerance and intron structure.
  3. *Shotgun Metagenomics or Metatranscriptomics (RNA-Seq):* Because fungal ITS PICRUSt2 relies on sparse reference genomes, direct shotgun metagenomics or RNA-Seq is the definitive way to measure true mangrove-adapted functional genes and active transcription in situ.

---
*Explainer layout document compiled for Ana Mariatul's ONT ITS Reanalysis (`SC` / `barcode13`). All counts, percentages, rankings, and visual descriptions reconciled against `12_visualizations_2026-10-30` PNG renders, source TSVs, and `10_picrust2` placement tables.*
