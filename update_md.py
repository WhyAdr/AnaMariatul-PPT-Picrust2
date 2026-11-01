import re, sys
P='/home/claude/AnaMariatul-PPT-Picrust2/AnaMariatul-SC-FunGuildFungalTrait-PICRUSt2-PPTexplainer.md'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert a in s, 'missing: '+a[:70]
    s=s.replace(a,b,1)

# ---- 1. renumber slide headings + in-text references (old -> new)
M={'01':'01','02':'02','03':'03','04':'04','05':'06','06':'07','07':'08','08':'09','09':'11','10':'12','11':'13','12':'14','13':'16','14':'17'}
tree_start=s.index('```\nPART 1'); tree_end=s.index('```',tree_start+4)+3
head,tree,tail=s[:tree_start],s[tree_start:tree_end],s[tree_end:]
sub=lambda t: re.sub(r'Slide (\d\d)', lambda m:'Slide '+M[m.group(1)], t)
head=sub(head); tail=sub(tail)
NEWTREE='''```
PART 1: INTRODUCTION & BIOINFORMATICS FOUNDATIONS
├── Slide 01: Title Slide & Project Context (Welcome to Your Mangrove ITS Data)
├── Slide 02: Quick Guide to Key Concepts (OTUs, Reads vs. Biomass, Guilds & NSTI)
└── Slide 03: Overview of the Sequencing Pipeline (From 103k Raw Reads to 34 Fungal Core OTUs)

PART 2: WHO IS IN YOUR SAMPLE? (COMMUNITY TAXONOMY)
├── Slide 04: Figure 01 — Community Context & Taxonomic Resolution (Sediment Chytrids & Unresolved Fungal Taxa)
└── Slide 05: [NEW NARRATIVE 1] Thesis Draft — Community Composition, Chytrids & Dark Taxa

PART 3: WHAT ARE THEY DOING? (ECOLOGICAL GUILDS & LIFESTYLES)
├── Slide 06: Figure 02 — Ecological Annotation Coverage (FungalTraits vs. FUNGuild)
├── Slide 07: Figure 03 — Putative Lifestyles & Ecological Guilds (Rhizosphere vs. Sediment Roles)
├── Slide 08: Figure 04 — Sensitivity Analysis & Workflow Concordance
├── Slide 09: SPECIAL SPOTLIGHT — Demystifying OTU_9 (Gibellulopsis: Gel Band Size, Chimera Audit & Ecology)
└── Slide 10: [NEW NARRATIVE 2] Thesis Draft — Ecological Guilds, the OTU_9 Factor & Root Endophytes

PART 4: WHAT IS THEIR METABOLIC POTENTIAL? (PICRUSt2 FUNCTIONAL PREDICTIONS)
├── Slide 11: Figure 05 — PICRUSt2 Diagnostics: Representation & Reference Distance (NSTI)
├── Slide 12: Figure 06 — Predicted Enzyme Categories (Housekeeping, Nomenclature Flags & Detritus Hydrolases)
├── Slide 13: Figure 07 — Predicted MetaCyc Metabolic Pathways (Core Fungal Metabolism in an Intertidal Milieu)
├── Slide 14: Figure 08 — Deconvoluting Pathways: Which OTUs & Reference Genomes Drive Predictions?
└── Slide 15: [NEW NARRATIVE 3] Thesis Draft — Predicted Functional Repertoire & Reference Limits

PART 5: ECOLOGICAL SYNTHESIS & NEXT STEPS
├── Slide 16: The Sonneratia alba Rhizosphere Synthesis: Connecting Mud Chytrids, Root Associates & Core Metabolism
└── Slide 17: Practical Takeaways & Exciting Directions for Future Research

PART 6: ACTION AT THE BENCH & THE THESIS DEFENSE
├── Slide 18: [NEW PROTOCOL] Experimental Validation Blueprint — Testing Inferred Functions in the Wet Lab
└── Slide 19: [NEW DEFENSE] Thesis Defense Cheat Sheet — Navigating Tough Committee Questions
```'''
s=head+NEWTREE+tail

# ---- 2. header / provenance
rep("* *Sample Compartment:*","* *Habitat & Provenance:* Habitat confirmed by the project owner on 1 November 2026 (earlier RESULTS.md text still calls it unconfirmed). Record the collection and host-identification details in the final thesis methods.\n* *Sample Compartment:*")
rep("(`Report/data/electrophoresis.PNG`).\n    * *Literature Guilds","(`Report/data/electrophoresis.PNG`).\n    * *Literature Guilds") if False else None
rep("`Report/data/electrophoresis.PNG` on Slide 09.","`Report/data/electrophoresis.PNG` on Slide 09. The deck has 19 slides: the original 14 explainer slides plus five thesis-drafting, protocol and defense slides (5, 10, 15, 18, 19).")

# ---- 3. inherited-claim reconciliation
rep("(*Cervidellus* `OTU_15`/`OTU_38` and a Chromadorea nematode match for `OTU_3`)","(two OTUs have full-query UNITE matches within Nematoda, one of them a *Cervidellus* match)")
rep("(such as co-amplified rhizosphere nematodes)","(including two with nematode matches)")
rep("that match the **`~1,100–1,150 bp` upper band visible on your PCR agarose gel**","in a size class similar to the **`~1,100–1,150 bp` upper band visible on your PCR agarose gel**")
rep("1,131 bp` consensuses and UCHIME alignment)","1,129 bp` consensuses and UCHIME alignment)")
rep("Sequence Identity, Intron Structure & Ecology","Sequence Identity, Amplicon Structure & Ecology")
rep("to *Gibellulopsis piscis* (`DQ825985`).\n    * *Two Amplicon Lengths (`520 bp` & `1,131 bp`):*","to *Gibellulopsis piscis* (`DQ825985`). The study assigns the OTU to genus *Gibellulopsis*; the species is not confirmed.\n    * *Two Amplicon Lengths (`520 bp` & `1,129 bp`):*")
i=s.index("* *Two Amplicon Lengths"); j=s.index("\n",i)
s=s[:i]+"* *Two Amplicon Lengths (`520 bp` & `1,129 bp`):* `OTU_9` merges a `520 bp` consensus (`00012`) and a longer stored `1,129 bp` consensus (`00039`) whose extracted `470 bp` `ITS` regions are `98.9%` identical. The roughly `610 bp` difference suggests an insertion (a Group I intron is a testable possibility, not a confirmed structure; its identity and location are untested). The `1,129 bp` length is similar in size to the `~1,100–1,150 bp` upper band on the PCR gel, but gel-band size alone does not establish OTU identity."+s[j:]
rep("triggering a borderline `?` flag due to reference 5' truncation rather than a clear PCR mosaic.","triggering a borderline `?` flag. A truncated 5' reference is a plausible explanation for the borderline alignment, but it does not prove the absence of a mosaic.")
# caveat, slide 13
i=s.index("  * **Crucial Caveat Against Over-Claiming:**"); j=s.index("\n",i)
s=s[:i]+"  * **Crucial Caveat Against Over-Claiming:** As shown on Slide 14, OTUs whose nearest sequenced reference genome is *Spizellomyces punctatus* (`Spipu1`) supply about `84%–93%` of the predicted abundance of each of the top-12 pathways (recomputed from `tables/top_pathways_otu_contribution_percent.tsv`). An earlier draft reported `81.5%–87.1%` for `GLYOXYLATE-BYPASS`, `PWY-5659`, and `PWY-6351` (ranks 13–15), but the stratified rows for those ranks are not in the repository tables, so re-check that figure before citing it. A nearest-genome concentration is not a literal transfer of pathways from `Spipu1`. These pathways therefore represent **conserved core fungal metabolic machinery** that is plausibly useful in organic-rich intertidal sediment, **not** habitat-specific marine halotolerance genes discovered in *Sonneratia alba* strains."+s[j:]
rep("share the exact same closest sequenced reference genome","have the same closest sequenced reference genome")
i=s.index("  * **Why Columns 1–4 Look Like"); j=s.index("\n",i)
s=s[:i]+"  * **Why Columns 1–4 Look Like Uniform Vertical Stripes (`34, 16, 11, 11`):** `OTU_1`, `OTU_4`, `OTU_6`, and `OTU_7` all have the same nearest sequenced reference genome (`Spipu1`) and `ITS_count = 1`, so their contributions to nearly every housekeeping pathway closely track their share of total predicted reads (`34.0%`, `16.3%`, `11.1%`, and `10.4%`, summing to `71.8%`). PICRUSt2 infers traits across its reference tree, so this is a nearest-genome concentration, not a literal transfer of pathways from `Spipu1`."+s[j:]
rep("(including rhizosphere nematodes).\n  * *Plausible Ecological Context:* The high proportion","(including two nematode-matching OTUs).\n  * *Plausible Ecological Context:* The high proportion")
rep("whose `1,131 bp` intron-bearing consensus matches the size of the `~1,100–1,150 bp` upper band on the PCR gel)","whose longer `1,129 bp` consensus is similar in size to the `~1,100–1,150 bp` upper band on the PCR gel; size alone does not establish identity)")
rep("Projected largely (`86.4%`) from terrestrial chytrid reference *Spizellomyces punctatus* (`Spipu1`), these predictions reflect","Fourteen of the 27 retained OTUs (`86.4%` of predicted-input reads) have the terrestrial chytrid *Spizellomyces punctatus* (`Spipu1`) as their nearest sequenced reference, so these predictions reflect")
rep("(consistent with the `~1,100–1,150 bp` upper band on the PCR gel), separated `7` co-amplified non-fungal/uncertain OTUs (including rhizosphere nematodes)","(a length class similar to the `~1,100–1,150 bp` upper band on the PCR gel), separated `7` co-amplified non-fungal/uncertain OTUs (including two with nematode matches)")
rep("Sequence alignment confirms `OTU_9` (*Gibellulopsis*, `99.55%` match to *G. piscis*) is non-chimeric (`?` caused by reference 5' truncation) and drives","`OTU_9` (genus *Gibellulopsis*; `99.55%` match to *G. piscis*) carries a borderline `?` reference-chimera flag (a truncated 5' reference is a plausible explanation, not proof of no mosaic) and supplies")
rep("`86.4%` mapped to reference `Spipu1`)","`14` of `27` retained OTUs, `86.4%` of predicted-input reads, have `Spipu1` as nearest reference)")
rep("(or excise and sequence the `~1,130 bp` gel band directly) to experimentally verify salinity tolerance and intron structure.","and repeat the `ITS1`/`ITS4` PCR with a negative control to sequence the longer band afresh (the historical gel photograph cannot itself be excised); see Slide 18.")

# ---- 4. Slide 01 provenance bullet
rep("with appropriate scientific caution.\n\n---","with appropriate scientific caution.\n  * Provenance: the *Sonneratia alba* rhizosphere/sediment habitat was confirmed by the project owner on 1 November 2026. Record the collection and host-identification details in the thesis methods.\n\n---",)

# ---- 5. new slide sections
S5='''
### Slide 05: [NEW NARRATIVE 1] Thesis Draft: Community Context & Taxonomic Resolution
* **Header Tag:** `PART 2 · WHO IS IN YOUR SAMPLE? · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: Community Context & Taxonomic Resolution
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):** Two equal-width cards with ribbons: **RESULTS PARAGRAPH (Objective Sequence Findings)** (blue) and **DISCUSSION & ECOLOGICAL INTERPRETATION** (green).
* **Card 1: Draft Results Text:**
  > "Oxford Nanopore ITS1–ITS4 amplicon sequencing of the *Sonneratia alba* cut rhizosphere root and sediment composite (sample SC) yielded 103,015 raw reads. Primer matching, quality filtering, and trimming retained 52,404 preprocessed reads (Q ≥ 12; trimmed length ≥ 200 bp). De novo clustering with amplicon_sorter resolved 41 supported ITS operational taxonomic units (OTUs), accounting for 48,988 reads (93.48% of preprocessed reads; 0.01% ambiguous; 6.51% unmapped). UNITE all-eukaryote taxonomy together with ITSx origin evidence separated 7 other or uncertain core OTUs (8,624 reads, 16.46%); two of these have full-query nematode matches (688 reads). The conservative fungal input comprised 34 OTUs and 40,364 reads (77.02% of preprocessed reads). Chytridiomycota was the largest classified fungal phylum (26.52%, 13,895 reads across 5 OTUs), followed by Ascomycota (5.27%, 2,764 reads across 6 OTUs). Another 45.24% of preprocessed reads (23,705 reads across 23 fungal-origin OTUs) lacked a named phylum under the study's conservative UNITE assignment criteria (≥ 90% identity, ≥ 90% query coverage, and ≥ 80% reference coverage)."
* **Card 2: Draft Discussion Text:**
  > "Chytridiomycota outnumbered Ascomycota by about five to one in sequenced reads. This pattern fits the confirmed intertidal, waterlogged setting: motile chytrid zoospores can exploit water films, and chytrid lineages may colonize submerged detritus, pollen, and chitin. These are ecological interpretations of the sequence profile, not measurements of decomposition or a test of what caused the read ratio. The large unresolved fungal-origin fraction makes this sample especially interesting for tropical mangrove mycology. Some OTUs match environmental fungal references yet lack a named phylum; others do not meet the conservative full-query assignment gates. Database gaps are a plausible contributor, while partial ITSx boundaries and the lack of controls prevent declaring every unresolved sequence a novel lineage or excluding every technical explanation."
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **How to use this slide:** The left card reports measured read and OTU counts under the study's stated gates; the right card is interpretation. Keep that separation when adapting the text. Add literature and dataset citations before reusing it outside the deck, and record the collection and host-identification details in the methods.
  * **OTU counts recomputed from the repository table:** `tables/otu_annotation_and_nsti.tsv` gives 5 Chytridiomycota OTUs (13,895 reads), 6 Ascomycota OTUs (2,764 reads), and 23 unresolved-phylum fungal OTUs (23,705 reads), which sum to the 34 fungal OTUs. An earlier plan draft listed 7, 12, and 15; those were corrected here.
  * **Not verifiable from the repository:** The nematode figure (two OTUs, 688 reads) comes from the plan and the 41-OTU taxonomy table (`taxonomy_and_quality.tsv`, not in this repo). `RESULTS.md` confirms two full-query Nematoda matches, one of them a *Cervidellus* match. Check the 688 against that table before citing it.

---
'''
S10='''
### Slide 10: [NEW NARRATIVE 2] Thesis Draft: Ecological Annotation & Gibellulopsis (OTU_9)
* **Header Tag:** `PART 3 · WHAT ARE THEY DOING? · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: Ecological Annotation & *Gibellulopsis* (OTU_9)
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):** Two equal-width cards with ribbons: **RESULTS PARAGRAPH (Objective Sequence Findings)** and **DISCUSSION & ECOLOGICAL INTERPRETATION**.
* **Card 1: Draft Results Text:**
  > "Ecological guild annotation of the 34 conservative fungal OTUs using FungalTraits (v1.2) and FUNGuild (v1.1) covered a minority of the community. FungalTraits assigned primary lifestyles to 4 OTUs (11.76% of fungal OTUs), representing 2,466 reads (4.71% of 52,404 preprocessed reads; 6.11% of 40,364 fungal-core reads). FUNGuild assigned probable or highly probable guilds to 6 OTUs (17.65% of fungal OTUs), representing 5,594 reads (10.67% of preprocessed reads; 13.86% of fungal-core reads). Thus 86.14% of fungal-core reads lacked a probable/highly probable FUNGuild label; accepted genus or family placements and database entries were insufficient to annotate most OTUs. FungalTraits primary lifestyles comprised putative plant pathogen (4.01% of preprocessed reads) and soil saprotroph (0.70%) labels. All of its primary plant pathogen reads came from OTU_9 (*Gibellulopsis*, 2,101 reads), which also had a secondary litter saprotroph label. Omitting OTU_9 from the existing annotation summary reduced FungalTraits coverage from 4.71% to 0.70%. Across VSEARCH 90%, VSEARCH 95%, and amplicon_sorter workflow settings, aggregate FungalTraits coverage was similar (4.71%–4.89%)."
* **Card 2: Draft Discussion Text:**
  > "Low annotation coverage (<14% of fungal-core reads) reflects the limits of matching this sample's taxonomic placements to literature trait databases: FungalTraits uses genus-level matching, while FUNGuild can also match families. OTU_9's closest listed UNITE hit is a *Gibellulopsis piscis* reference at 99.55% identity, but the study assigns the OTU to *Gibellulopsis* rather than confirming a species. In this cut-root and sediment setting, a root-associated endophytic or litter-saprotrophic role is a useful ecological hypothesis; neither the sequence nor its trait labels establish host infection, tissue localization, or a change of lifestyle. The reference-chimera screen marked OTU_9 borderline ('?'), not positive ('Y'). A short 5′ reference relative to the study sequence offers a plausible explanation for the borderline alignment, but does not prove the absence of a mosaic. Showing both its primary plant pathogen and secondary litter saprotroph labels avoids equating one database category with disease in the host."
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **How to use this slide:** Results sentences give counts under stated denominators (52,404 preprocessed reads, 40,364 fungal-core reads, or 34 fungal OTUs); never swap them. Discussion sentences are hypotheses. Add citations for FungalTraits (Põlme et al. 2020) and FUNGuild (Nguyen et al. 2016) before reuse.
  * **Checked against the tables:** 4 and 6 mapped OTUs, 2,466 and 5,594 reads, and the 4.71%–4.89% workflow range all match `tables/guild_coverage.tsv`, `tables/guild_borderline_sensitivity.tsv`, and `RESULTS.md`.
  * **Mixed FUNGuild labels:** only OTU_9 supplies the single-label FUNGuild "Plant Pathogen" bar. OTU_7 (Spizellomycetaceae) and OTU_31 (*Microascus*) carry separate combined labels that also contain plant pathogen; mixed labels stay combined and are not counted twice.

---
'''
S15='''
### Slide 15: [NEW NARRATIVE 3] Thesis Draft: PICRUSt2 Diagnostics & Predicted Functions
* **Header Tag:** `PART 4 · METABOLIC POTENTIAL · THESIS & MANUSCRIPT NARRATIVE`
* **Slide Title:** Thesis Draft: PICRUSt2 Diagnostics & Predicted Functions
* **Subtitle:** Results and Discussion Drafts to Adapt for a Thesis or Manuscript
* **Visual Wireframe (16:9 Widescreen):** Two equal-width cards with ribbons: **RESULTS PARAGRAPH (Objective Sequence Findings)** and **DISCUSSION & ECOLOGICAL INTERPRETATION**.
* **Card 1: Draft Results Text:**
  > "Exploratory fungal PICRUSt2 profiling placed 29 of 34 fungal OTUs on the reference tree (56.16% of preprocessed reads); five OTUs, including the unresolved OTU_2/OTU_5 complex, failed alignment. The default nearest sequenced taxon index cutoff (NSTI ≤ 2.0) retained 27 OTUs representing 28,587 reads (54.55% of preprocessed reads; 27.75% of raw reads). Their abundance-weighted NSTI was 1.047 (median eligible OTU NSTI = 0.913). The pipeline reported 840 predicted enzyme categories (ECs) and 67 predicted MetaCyc pathways. Broad predicted EC totals were led by EC 3 Hydrolases (14.48 million model units; 238 ECs), EC 2 Transferases (10.32 million), and EC 1 Oxidoreductases (5.42 million). The leading EC predictions included ATPases and polymerases; leading pathways included aerobic respiration I and II (ranks 1–2), peroxisomal fatty-acid β-oxidation (rank 3), and TCA cycle II (rank 8). Pathway ranks 13–15 were GDP-mannose biosynthesis (PWY-5659), D-myo-inositol trisphosphate biosynthesis (PWY-6351), and the glyoxylate cycle (GLYOXYLATE-BYPASS). Fourteen of the 27 retained OTUs, representing 24,696 of 28,587 predicted-input reads (86.4%), had *Spizellomyces punctatus* (Spipu1) as their closest sequenced reference genome."
* **Card 2: Draft Discussion Text:**
  > "The weighted NSTI of 1.047 and concentrated nearest-reference assignments show how far this sample sits from the fungal genome references. PICRUSt2 infers traits across a reference tree; the 86.4% figure identifies a nearest-genome concentration, not a literal transfer of pathways from Spipu1. Predicted glucan 1,4-α-glucosidase (EC:3.2.1.3, rank 6) and chitinase (EC:3.2.1.14, rank 23) give a plausible detrital-processing hypothesis in mangrove sediment. Predicted L-arabinose isomerase (EC:5.3.1.4, rank 19) belongs to sugar isomerization, not the hydrolase group. The glyoxylate cycle and fatty-acid β-oxidation suggest possible carbon-use routes, but do not establish activity, hypoxic survival, or marine adaptation. Given the developers' caution about fungal predictive accuracy, these profiles should guide targeted experiments rather than serve as evidence of measured gene content, expression, or enzyme activity."
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **How to use this slide:** These are exploratory predictions. Keep the sentence that PICRUSt2 results are hypothesis-generating when you adapt the text, and cite the PICRUSt2 paper and the developers' fungal FAQ.
  * **Edited for accuracy:** the plan listed "TCA cycle II" among the leading pathways without a rank; the table puts aerobic respiration I and II at ranks 1–2, peroxisomal β-oxidation at 3, and TCA cycle II (PWY-5690) at 8, and the text now says so. Ranks 13–15 and EC ranks 6, 19, and 23 match `tables/metacyc_predicted_profiles.tsv` and `tables/ec_predicted_profiles.tsv`.
  * **Spipu1:** 14 of 27 retained OTUs (24,696 / 28,587 reads) list Spipu1 as the closest reference genome in `tables/marker_predicted_and_nsti.tsv`. That statement is about nearest-reference assignment only.

---
'''
S18='''
## PART 6: ACTION AT THE BENCH & THE THESIS DEFENSE

### Slide 18: [NEW PROTOCOL] Experimental Validation Blueprint — Testing Inferred Functions in the Wet Lab
* **Header Tag:** `PART 6 · ACTION & DEFENSE · EXPERIMENTAL BLUEPRINT`
* **Slide Title:** Experimental Validation Blueprint: Testing Inferred Functions in the Wet Lab
* **Subtitle:** Proposed Follow-up Experiments for Amplicon Structure, Root Associates, and Salinity Responses
* **Visual Wireframe (16:9 Widescreen):** Three vertical protocol cards.
* **Card 1: Testing the Longer OTU_9-Associated Amplicon:**
  * *Objective:* Determine whether the stored `1,129 bp` consensus `00039` contains an insertion relative to the `520 bp` OTU_9-associated consensus `00012`, and establish its identity and location. A Group I intron is a testable possibility, not a confirmed structure.
  * *Proposed experiment:*
    1. Repeat `ITS1`/`ITS4` PCR from available source material with a negative PCR control; run a fresh gel and record the band pattern. The photographed historical gel cannot itself be excised.
    2. Excise and purify the appropriate fresh band; obtain overlapping bidirectional sequence coverage of the entire product, adding internal sequencing primers if needed.
    3. Align the assembled product to `00039`, `00012`, and reference sequences; document insertion boundaries and sequence evidence before assigning an intron type. Gel-band size alone does not establish OTU identity.
* **Card 2: Testing Putative *Sonneratia alba* Root Associates:**
  * *Objective:* Test whether culturable *Gibellulopsis* (`OTU_9`) or *Wardomycopsis* (`OTU_19`) can be recovered from root tissue rather than adhering sediment.
  * *Proposed experiment:*
    1. Collect replicate root and adjacent sediment samples separately, with collection and processing controls.
    2. Wash roots and apply a root-tissue surface-sterilization procedure validated by the local lab; include a final-rinse or tissue-imprint control to check surface carryover.
    3. Culture root sections on appropriate medium with lab-approved antibacterial supplementation, identify isolates by `ITS` sequencing, and compare their sequences with the target OTUs. Culture recovery alone does not prove an in-plant lifestyle.
* **Card 3: Sediment Chytrid Baiting & Salinity Assays:**
  * *Objective:* Recover zoosporic fungi and test isolate growth across a defined salt gradient.
  * *Proposed experiment:*
    1. Bait replicate fresh sediment subsamples in defined brackish medium with pollen or chitin substrates; include uninoculated and substrate controls, then document sporangia and sequence any recovered isolates.
    2. Compare replicate isolates on a constant base medium with 0%, 2%, 4%, and 6% added NaCl, recording total medium salinity and growth endpoints. These percentages describe added NaCl, not automatically total salinity or an in situ tolerance limit.
  * *Protocol status:* These are study-design starting points. Select exact sterilization, medium, incubation, and control conditions from a cited method and the local laboratory SOP before bench work.
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Length discrepancy to settle:** The plan and this slide use `1,129 bp` for consensus `00039`; the earlier explainer draft said `1,131 bp`. The consensus FASTA is not in this repository, so confirm the length against the stored sequence before submitting the thesis.
  * **Why replication matters here:** SC is a single unreplicated sample without controls, so every experiment above also doubles as the first biological replication step.
  * **Order of work:** the amplicon check (Card 1) is cheapest and tells you whether OTU_9 is one organism with an insertion or two products; Cards 2 and 3 need fresh field sampling.

---

### Slide 19: [NEW DEFENSE] Thesis Defense Cheat Sheet — Navigating Tough Committee Questions
* **Header Tag:** `PART 6 · ACTION & DEFENSE · THESIS DEFENSE CHEAT SHEET`
* **Slide Title:** Thesis Defense Cheat Sheet: Navigating Tough Committee Questions
* **Subtitle:** Evidence-Based Answers to Four Likely Examiner Questions
* **Visual Wireframe (16:9 Widescreen):** Four horizontal Q&A blocks pairing the Likely Concern with an Evidence-Based Response.
* **Box 1: "Your sample is unreplicated (n = 1). How can you draw scientific conclusions?"**
  * *Likely Concern:* Claiming regional generalizability or seasonal stability.
  * *Evidence-Based Response:* *"SC describes one confirmed cut-root and sediment sample under defined processing gates. We make no site-wide or seasonal claim. A read-ID train/held-out split gave 93.18% unique assignment of held-out reads, and VSEARCH at two thresholds plus amplicon_sorter gave similar aggregate guild-annotation coverage. These checks show technical consistency within this sample; biological replication remains future work."*
* **Box 2: "Why is your ecological guild coverage below 11% of preprocessed reads?"**
  * *Likely Concern:* Treating unannotated reads as lacking ecological roles.
  * *Evidence-Based Response:* *"FungalTraits annotated 4.71% and probable/highly probable FUNGuild annotated 10.67% of all 52,404 preprocessed reads, or 6.11% and 13.86% of fungal-core reads. Chytridiomycota plus unresolved-phylum fungi account for 71.75% of preprocessed reads (93.15% of fungal-core reads). Many OTUs lack an accepted genus or family match in the trait tables; unresolved classification does not mean they are functionless or necessarily uncultured. We retain conservative assignment gates rather than inflate coverage."*
* **Box 3: "FUNGuild shows 4% Plant Pathogens. Is the mangrove tree dying or diseased?"**
  * *Likely Concern:* Diagnosing disease from a trait label.
  * *Evidence-Based Response:* *"The sequence data cannot diagnose disease in the host. OTU_9 (Gibellulopsis) supplies all of the FungalTraits primary plant-pathogen reads and the exact single-label FUNGuild 'Plant Pathogen' bar; OTU_7 and OTU_31 have separate combined FUNGuild labels that also include plant pathogen. OTU_9's secondary litter-saprotroph label and this root/sediment setting make alternative ecological roles plausible, but host symptoms and root localization were not measured."*
* **Box 4: "PICRUSt2 was designed for bacterial 16S. Can you trust it for fungal ITS?"**
  * *Likely Concern:* Treating inferred pathways as verified fungal activity.
  * *Evidence-Based Response:* *"We used the fungal ITS reference and present PICRUSt2 only as an exploratory supplement. Weighted NSTI is 1.047, and 14 of 27 retained OTUs representing 86.4% of predicted-input reads have Spipu1 as their nearest sequenced reference. PICRUSt2 infers functions across the tree rather than copying that one genome. Its developers caution that fungal predictions have limited accuracy. These pathways motivate experiments; they are not direct measurements of genes, transcription, or enzyme activity."*
* **Plain-English Elaboration (Extended Companion / Notes Pane):**
  * **Edited for accuracy:** the plan named OTU_7 alone as having a combined FUNGuild label that includes plant pathogen. `tables/otu_annotation_and_nsti.tsv` shows OTU_31 (*Microascus*, 98 reads, Probable) does too, so Box 3 names both.
  * **Rehearsal tip:** answer in two sentences (what the data show, then what they do not show), and only then give the supporting numbers. The numbers in Boxes 2 and 4 were recomputed from the tables: (13,895 + 23,705) / 52,404 = 71.75% and / 40,364 = 93.15%.
  * **Where to look if pushed:** Slide 08 (workflow concordance), Slide 09 (OTU_9 audit), Slide 11 (NSTI diagnostics), and Slide 14 (reference-genome concentration).
'''
def insert_before(anchor, block):
    global s
    k=s.index(anchor); s=s[:k]+block.lstrip('\n')+'\n'+s[k:] if False else s[:k]+block+s[k:]
# part boundaries: each slide section ends with '\n---\n\n## PART n'
for part,block in (('## PART 3','S5'),('## PART 4','S10'),('## PART 5','S15')):
    a=s.index(part); k=s.rfind('\n---\n',0,a)  # the '---' just before this part header
    blk={'S5':S5,'S10':S10,'S15':S15}[block]
    s=s[:k]+'\n'+blk.rstrip('\n').rstrip('-').rstrip()+'\n'+s[k:]
# final: add Part 6 before the closing footer
k=s.rindex('\n---\n*Explainer layout document')
s=s[:k]+'\n---\n'+S18.rstrip('\n')+'\n'+s[k:]
s=s.replace("*Explainer layout document compiled for Ana Mariatul's ONT ITS Reanalysis","*Explainer layout document (19-slide interleaved architecture, per IMPLEMENTATION_PLAN_ADDITIONAL_SLIDES.md) compiled for Ana Mariatul's ONT ITS Reanalysis")
open(P,'w',encoding='utf8').write(s)
print('ok', s.count('### Slide'))
