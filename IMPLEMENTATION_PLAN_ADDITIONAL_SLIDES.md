# Implementation Blueprint: The Interleaved 19-Slide Presentation & Thesis Drafting Kit
## Integration of Figures, Adaptable Thesis Narratives, Follow-up Experiments, and Defense Prompts

**Document Identifier:** `PPT-explainer-SC-ITS-AnaMariatul/IMPLEMENTATION_PLAN_ADDITIONAL_SLIDES.md`
**Target PPT File:** `AnaMariatul-SC-PICRUSt2-FUNGuild-Explainer.pptx` (expanding from 14 slides to 19 slides)
**Parent Markdown Plan:** `AnaMariatul-SC-FunGuildFungalTrait-PICRUSt2-PPTexplainer.md`
**Sample Provenance:** `SC` (`barcode13` / `N701-1`; *Sonneratia alba* cut rhizosphere root tissue + surrounding intertidal sediment; habitat confirmed by the project owner on 1 November 2026). Record the collection and host-identification details in the final thesis methods.
**Design Philosophy:** **The Interleaved Architecture.** Each visual figure cluster is followed by a dedicated, two-column slide containing verbose draft **Results** and **Discussion** paragraphs for Ana to adapt to her thesis or a manuscript. Keep these slides as reading slides; retain the explanatory ecological voice while separating measured sequence results from proposed biological mechanisms. The presentation concludes with prospective bench experiments and a committee defense aid.

---

## 1. Complete 19-Slide Deck Architecture

```
PART 1: INTRODUCTION & BIOINFORMATICS FOUNDATIONS
├── Slide 01: Title Slide & Project Metadata (Welcome to Your Mangrove ITS Data)
├── Slide 02: Quick Guide to Key Concepts (Bioinformatics 101: OTUs, Reads vs. Biomass, Guilds, NSTI)
└── Slide 03: Overview of the Sequencing Pipeline (From 103k Raw Reads to 34 Fungal Core OTUs)

PART 2: WHO IS IN YOUR SAMPLE? (COMMUNITY TAXONOMY)
├── Slide 04: Figure 01 — Community Context & Taxonomic Resolution (Read Fates & Phylum Distribution)
└── Slide 05: [NEW NARRATIVE 1] Thesis Drafting Text: Community Composition, Chytrids & Dark Taxa

PART 3: WHAT ARE THEY DOING? (ECOLOGICAL GUILDS & LIFESTYLES)
├── Slide 06: Figure 02 — Ecological Annotation Coverage (FungalTraits vs. FUNGuild)
├── Slide 07: Figure 03 — Putative Lifestyles & Ecological Guilds (Rhizosphere vs. Sediment Roles)
├── Slide 08: Figure 04 — Sensitivity Analysis & Workflow Concordance
├── Slide 09: Special Spotlight — Demystifying OTU_9 (Gibellulopsis: Gel Band, Chimera Audit & Ecology)
└── Slide 10: [NEW NARRATIVE 2] Thesis Drafting Text: Ecological Guilds, the OTU_9 Factor & Root Endophytes

PART 4: WHAT IS THEIR METABOLIC POTENTIAL? (PICRUSt2 FUNCTIONAL PREDICTIONS)
├── Slide 11: Figure 05 — PICRUSt2 Diagnostics: Representation & Reference Distance (NSTI)
├── Slide 12: Figure 06 — Predicted Enzyme Profiles (Top 15 ECs, Nomenclature Flags & Detrital Hydrolases)
├── Slide 13: Figure 07 — Predicted MetaCyc Pathways (Housekeeping, Glyoxylate Bypass & Osmolytes)
├── Slide 14: Figure 08 — Deconvoluting Pathways: Which OTUs & Reference Genomes Drive Predictions?
└── Slide 15: [NEW NARRATIVE 3] Thesis Drafting Text: Predicted Functional Repertoire & Reference Limits

PART 5: ECOLOGICAL SYNTHESIS & SYSTEM RECOVERY
├── Slide 16: The Sonneratia alba Rhizosphere Synthesis: Root Endophytes, Mud Chytrids & Marine Stress
└── Slide 17: Practical Takeaways & Research Directions (Supported Findings vs. Next Steps)

PART 6: ACTION AT THE BENCH & THE THESIS DEFENSE
├── Slide 18: [NEW PROTOCOL] Experimental Validation Blueprint: Culturing, Gel Band Verification & Salinity
└── Slide 19: [NEW DEFENSE] Thesis Defense Cheat Sheet: Navigating Tough Committee Questions
```

---

## 2. Detailed Specifications for the 5 New Slides

---

### SLIDE 05: [NEW NARRATIVE 1] Thesis Drafting Text: Community Composition, Chytrids & Dark Taxa
* **Slide Category:** Thesis / Manuscript Drafting Companion (Interleaved after Figure 01)
* **Header Tag:** `PART 2 · WHO IS IN YOUR SAMPLE? · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: Community Context & Taxonomic Resolution
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):**
  * Two equal-width cards side-by-side with distinct colored header ribbons:
  * **Left Card (Navy Ribbon):** `RESULTS PARAGRAPH (Objective Sequence Findings)`
  * **Right Card (Green Ribbon):** `DISCUSSION & ECOLOGICAL INTERPRETATION`
* **Card 1: Draft Results Text:**
  > "Oxford Nanopore ITS1–ITS4 amplicon sequencing of the *Sonneratia alba* cut rhizosphere root and sediment composite (sample SC) yielded 103,015 raw reads. Primer matching, quality filtering, and trimming retained 52,404 preprocessed reads (Q ≥ 12; trimmed length ≥ 200 bp). De novo clustering with amplicon_sorter resolved 41 supported ITS operational taxonomic units (OTUs), accounting for 48,988 reads (93.48% of preprocessed reads; 0.01% ambiguous; 6.51% unmapped). UNITE all-eukaryote taxonomy together with ITSx origin evidence separated 7 other or uncertain core OTUs (8,624 reads, 16.46%); two of these have full-query nematode matches (688 reads). The conservative fungal input comprised 34 OTUs and 40,364 reads (77.02% of preprocessed reads). Chytridiomycota was the largest classified fungal phylum (26.52%, 13,895 reads across 7 OTUs), followed by Ascomycota (5.27%, 2,764 reads across 12 OTUs). Another 45.24% of preprocessed reads (23,705 reads across 15 fungal-origin OTUs) lacked a named phylum under the study's conservative UNITE assignment criteria (≥ 90% identity, ≥ 90% query coverage, and ≥ 80% reference coverage)."
* **Card 2: Draft Discussion Text:**
  > "Chytridiomycota outnumbered Ascomycota by about five to one in sequenced reads. This pattern fits the confirmed intertidal, waterlogged setting: motile chytrid zoospores can exploit water films, and chytrid lineages may colonize submerged detritus, pollen, and chitin. These are ecological interpretations of the sequence profile, not measurements of decomposition or a test of what caused the read ratio. The large unresolved fungal-origin fraction makes this sample especially interesting for tropical mangrove mycology. Some OTUs match environmental fungal references yet lack a named phylum; others do not meet the conservative full-query assignment gates. Database gaps are a plausible contributor, while partial ITSx boundaries and the lack of controls prevent declaring every unresolved sequence a novel lineage or excluding every technical explanation."

---

### SLIDE 10: [NEW NARRATIVE 2] Thesis Drafting Text: Ecological Guilds, the OTU_9 Factor & Root Endophytes
* **Slide Category:** Thesis / Manuscript Drafting Companion (Interleaved after Figures 02–04 & Spotlight)
* **Header Tag:** `PART 3 · WHAT ARE THEY DOING? · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: Ecological Annotation & *Gibellulopsis* (OTU_9)
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):**
  * Two equal-width cards side-by-side:
* **Card 1: Draft Results Text:**
  > "Ecological guild annotation of the 34 conservative fungal OTUs using FungalTraits (v1.2) and FUNGuild (v1.1) covered a minority of the community. FungalTraits assigned primary lifestyles to 4 OTUs (11.76% of fungal OTUs), representing 2,466 reads (4.71% of 52,404 preprocessed reads; 6.11% of 40,364 fungal-core reads). FUNGuild assigned probable or highly probable guilds to 6 OTUs (17.65% of fungal OTUs), representing 5,594 reads (10.67% of preprocessed reads; 13.86% of fungal-core reads). Thus 86.14% of fungal-core reads lacked a probable/highly probable FUNGuild label; accepted genus or family placements and database entries were insufficient to annotate most OTUs. FungalTraits primary lifestyles comprised putative plant pathogen (4.01% of preprocessed reads) and soil saprotroph (0.70%) labels. All of its primary plant pathogen reads came from OTU_9 (*Gibellulopsis*, 2,101 reads), which also had a secondary litter saprotroph label. Omitting OTU_9 from the existing annotation summary reduced FungalTraits coverage from 4.71% to 0.70%. Across VSEARCH 90%, VSEARCH 95%, and amplicon_sorter workflow settings, aggregate FungalTraits coverage was similar (4.71%–4.89%)."
* **Card 2: Draft Discussion Text:**
  > "Low annotation coverage (<14% of fungal-core reads) reflects the limits of matching this sample's taxonomic placements to literature trait databases: FungalTraits uses genus-level matching, while FUNGuild can also match families. OTU_9's closest listed UNITE hit is a *Gibellulopsis piscis* reference at 99.55% identity, but the study assigns the OTU to *Gibellulopsis* rather than confirming a species. In this cut-root and sediment setting, a root-associated endophytic or litter-saprotrophic role is a useful ecological hypothesis; neither the sequence nor its trait labels establish host infection, tissue localization, or a change of lifestyle. The reference-chimera screen marked OTU_9 borderline ('?'), not positive ('Y'). A short 5′ reference relative to the study sequence offers a plausible explanation for the borderline alignment, but does not prove the absence of a mosaic. Showing both its primary plant pathogen and secondary litter saprotroph labels avoids equating one database category with disease in the host."

---

### SLIDE 15: [NEW NARRATIVE 3] Thesis Drafting Text: Predicted Functional Repertoire & Reference Limits
* **Slide Category:** Thesis / Manuscript Drafting Companion (Interleaved after Figures 05–08)
* **Header Tag:** `PART 4 · METABOLIC POTENTIAL · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: PICRUSt2 Diagnostics & Predicted Functions
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):**
  * Two equal-width cards side-by-side:
* **Card 1: Draft Results Text:**
  > "Exploratory fungal PICRUSt2 profiling placed 29 of 34 fungal OTUs on the reference tree (56.16% of preprocessed reads); five OTUs, including the unresolved OTU_2/OTU_5 complex, failed alignment. The default nearest sequenced taxon index cutoff (NSTI ≤ 2.0) retained 27 OTUs representing 28,587 reads (54.55% of preprocessed reads; 27.75% of raw reads). Their abundance-weighted NSTI was 1.047 (median eligible OTU NSTI = 0.913). The pipeline reported 840 predicted enzyme categories (ECs) and 67 predicted MetaCyc pathways. Broad predicted EC totals were led by EC 3 Hydrolases (14.48 million model units; 238 ECs), EC 2 Transferases (10.32 million), and EC 1 Oxidoreductases (5.42 million). The leading EC predictions included ATPases and polymerases; leading pathways included TCA cycle II and peroxisomal fatty-acid β-oxidation. Pathway ranks 13–15 were GDP-mannose biosynthesis (PWY-5659), D-myo-inositol trisphosphate biosynthesis (PWY-6351), and the glyoxylate cycle (GLYOXYLATE-BYPASS). Fourteen of the 27 retained OTUs, representing 24,696 of 28,587 predicted-input reads (86.4%), had *Spizellomyces punctatus* (Spipu1) as their closest sequenced reference genome."
* **Card 2: Draft Discussion Text:**
  > "The weighted NSTI of 1.047 and concentrated nearest-reference assignments show how far this sample sits from the fungal genome references. PICRUSt2 infers traits across a reference tree; the 86.4% figure identifies a nearest-genome concentration, not a literal transfer of pathways from Spipu1. Predicted glucan 1,4-α-glucosidase (EC:3.2.1.3, rank 6) and chitinase (EC:3.2.1.14, rank 23) give a plausible detrital-processing hypothesis in mangrove sediment. Predicted L-arabinose isomerase (EC:5.3.1.4, rank 19) belongs to sugar isomerization, not the hydrolase group. The glyoxylate cycle and fatty-acid β-oxidation suggest possible carbon-use routes, but do not establish activity, hypoxic survival, or marine adaptation. Given the developers' caution about fungal predictive accuracy, these profiles should guide targeted experiments rather than serve as evidence of measured gene content, expression, or enzyme activity."

---

### SLIDE 18: [NEW PROTOCOL] Experimental Validation Blueprint: Bench Action
* **Slide Category:** Laboratory Action & Bench Protocols (Following Takeaways)
* **Header Tag:** `PART 6 · ACTION & DEFENSE · EXPERIMENTAL BLUEPRINT`
* **Slide Title:** Experimental Validation Blueprint: Testing Inferred Functions in the Wet Lab
* **Subtitle:** Proposed Follow-up Experiments for Amplicon Structure, Root Associates, and Salinity Responses
* **Visual Wireframe (16:9 Widescreen):**
  * 3 vertical protocol cards across the slide canvas:
* **Card 1: Testing the Longer `OTU_9`-Associated Amplicon:**
  * *Objective:* Determine whether the stored 1,129 bp consensus `00039` contains an insertion relative to the 520 bp OTU_9-associated consensus `00012`, and establish its identity and location. A Group I intron is a testable possibility, not a confirmed structure.
  * *Proposed experiment:*
    1. Repeat ITS1/ITS4 PCR from available source material with a negative PCR control; run a fresh gel and record the band pattern. The photographed historical gel cannot itself be excised.
    2. Excise and purify the appropriate fresh band; obtain overlapping bidirectional sequence coverage of the entire product, adding internal sequencing primers if needed.
    3. Align the assembled product to `00039`, `00012`, and reference sequences; document insertion boundaries and sequence evidence before assigning an intron type. Gel-band size alone does not establish OTU identity.
* **Card 2: Testing Putative *Sonneratia alba* Root Associates:**
  * *Objective:* Test whether culturable *Gibellulopsis* (`OTU_9`) or *Wardomycopsis* (`OTU_19`) can be recovered from root tissue rather than adhering sediment.
  * *Proposed experiment:*
    1. Collect replicate root and adjacent sediment samples separately, with collection and processing controls.
    2. Wash roots and apply a root-tissue surface-sterilization procedure validated by the local lab; include a final-rinse or tissue-imprint control to check surface carryover.
    3. Culture root sections on appropriate medium with lab-approved antibacterial supplementation, identify isolates by ITS sequencing, and compare their sequences with the target OTUs. Culture recovery alone does not prove an in-plant lifestyle.
* **Card 3: Sediment Chytrid Baiting & Salinity Assays:**
  * *Objective:* Recover zoosporic fungi and test isolate growth across a defined salt gradient.
  * *Proposed experiment:*
    1. Bait replicate fresh sediment subsamples in defined brackish medium with pollen or chitin substrates; include uninoculated and substrate controls, then document sporangia and sequence any recovered isolates.
    2. Compare replicate isolates on a constant base medium with 0%, 2%, 4%, and 6% added NaCl, recording total medium salinity and growth endpoints. These percentages describe added NaCl, not automatically total salinity or an in situ tolerance limit.
  * *Protocol status:* These are study-design starting points. Select exact sterilization, medium, incubation, and control conditions from a cited method and the local laboratory SOP before bench work.

---

### SLIDE 19: [NEW DEFENSE] Thesis Defense Cheat Sheet: Committee Inquiries
* **Slide Category:** Scientific Defense & Committee Preparation (Final Slide)
* **Header Tag:** `PART 6 · ACTION & DEFENSE · THESIS DEFENSE CHEAT SHEET`
* **Slide Title:** Thesis Defense Cheat Sheet: Navigating Tough Committee Questions
* **Subtitle:** Evidence-Based Answers to Four Likely Examiner Questions
* **Visual Wireframe (16:9 Widescreen):**
  * 4 horizontal Q&A blocks pairing the **Likely Concern** with an **Evidence-Based Response** and its limit:
* **Box 1: "Your sample is unreplicated (n = 1). How can you draw scientific conclusions?"**
  * *Likely Concern:* Claiming regional generalizability or seasonal stability.
  * *Evidence-Based Response:* *"SC describes one confirmed cut-root and sediment sample under defined processing gates. We make no site-wide or seasonal claim. A read-ID train/held-out split gave 93.18% unique assignment of held-out reads, and VSEARCH at two thresholds plus amplicon_sorter gave similar aggregate guild-annotation coverage. These checks show technical consistency within this sample; biological replication remains future work."*
* **Box 2: "Why is your ecological guild coverage below 11% of preprocessed reads?"**
  * *Likely Concern:* Treating unannotated reads as lacking ecological roles.
  * *Evidence-Based Response:* *"FungalTraits annotated 4.71% and probable/highly probable FUNGuild annotated 10.67% of all 52,404 preprocessed reads, or 6.11% and 13.86% of fungal-core reads. Chytridiomycota plus unresolved-phylum fungi account for 71.75% of preprocessed reads (93.15% of fungal-core reads). Many OTUs lack an accepted genus or family match in the trait tables; unresolved classification does not mean they are functionless or necessarily uncultured. We retain conservative assignment gates rather than inflate coverage."*
* **Box 3: "FUNGuild shows 4% Plant Pathogens. Is the mangrove tree dying or diseased?"**
  * *Likely Concern:* Diagnosing disease from a trait label.
  * *Evidence-Based Response:* *"The sequence data cannot diagnose disease in the host. OTU_9 (*Gibellulopsis*) supplies all of the FungalTraits primary plant-pathogen reads and the exact single-label FUNGuild 'Plant Pathogen' bar; OTU_7 has a separate combined FUNGuild label that also includes plant pathogen. OTU_9's secondary litter-saprotroph label and this root/sediment setting make alternative ecological roles plausible, but host symptoms and root localization were not measured."*
* **Box 4: "PICRUSt2 was designed for bacterial 16S. Can you trust it for fungal ITS?"**
  * *Likely Concern:* Treating inferred pathways as verified fungal activity.
  * *Evidence-Based Response:* *"We used the fungal ITS reference and present PICRUSt2 only as an exploratory supplement. Weighted NSTI is 1.047, and 14 of 27 retained OTUs representing 86.4% of predicted-input reads have Spipu1 as their nearest sequenced reference. PICRUSt2 infers functions across the tree rather than copying that one genome. Its developers caution that fungal predictions have limited accuracy. These pathways motivate experiments; they are not direct measurements of genes, transcription, or enzyme activity."*

---

## 3. Implementation and Acceptance Instructions for Claude

1. **Update the Markdown source and deck:** Merge these five definitions into `AnaMariatul-SC-FunGuildFungalTrait-PICRUSt2-PPTexplainer.md` and expand the existing 14-slide PPTX to 19 slides. Preserve existing figures and explanatory notes. Update old slide-number references in the Markdown source, slide text, and speaker notes after insertion; for example, the OTU_9 spotlight moves from Slide 08 to 09 and Figure 08 moves from Slide 12 to 14. Keep the confirmed habitat in the narrative, and record its collection/host-identification provenance in the final thesis methods.
2. **Scientific copy checks across all 19 slides:** Reconcile both the five new slides and inherited slide text/notes against `RESULTS.md`, `FIGURE_GUIDE.md`, and the companion TSVs. Preserve the exact denominators for percentages; distinguish the FungalTraits single primary `plant_pathogen` label from FUNGuild's mixed labels; retain OTU_9's borderline `?` chimera flag and genus-level assignment; call `Spipu1` the closest reference for 14 retained OTUs rather than the source of all predicted pathways. In particular, update inherited claims on the former OTU_9 spotlight (now Slide 09), PICRUSt2 deconvolution (now Slide 14), and synthesis/takeaways (now Slides 16–17), as well as their notes. Keep ecological mechanisms as clearly signaled interpretations. Add literature and dataset citations to the thesis/manuscript drafts before they are reused outside the deck.
3. **Presentation text and style:** Preserve the intentionally verbose reading-slide format. Convert Markdown and LaTeX wrappers to presentation-safe text or rendered equations before placing them in PowerPoint. Use the following style as a starting point and adjust only after visual review:
   * Slide background: `#FFFFFF` with cards in `#F8FAFC`.
   * Borders: 1 pt solid `#E2E8F0`.
   * Title font: Segoe UI / Arial Bold (`#23313A`, 20–22 pt).
   * Body font: Segoe UI / Calibri Regular (`#334155`, 10–11 pt, 1.25 line spacing); confirm legibility in the rendered deck at normal reading size.
   * Headers: Ribbon badge in `#216B91` (Results) and `#268675` (Discussion).
4. **Render and verify:** Produce a candidate `AnaMariatul-SC-PICRUSt2-FUNGuild-Explainer.pptx` with exactly 19 slides. Render every slide and inspect the long paragraphs, figure crops, labels, and notes for clipping and readability. Confirm that all eight figure assets and the gel photograph appear where intended, that slide-number references and speaker notes match the new order, and that the PPTX opens successfully. Compare the candidate with the source deck before replacement; record its final hash after acceptance.
