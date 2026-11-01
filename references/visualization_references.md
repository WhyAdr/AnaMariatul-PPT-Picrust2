SC visualization references and design decisions — consulted 30 October 2026.

These references guide presentation choices. They do not independently validate SC's sequences, taxonomy, ecological labels or fungal PICRUSt2 predictions. No published figure was copied into the output; all plots were generated from SC's existing tables.

| Primary source | Verified presentation practice | Adaptation for SC |
|---|---|---|
| [Nguyen et al. 2016, FUNGuild](https://doi.org/10.1016/j.funeco.2015.06.006); [author-hosted full paper](https://cbs.umn.edu/sites/cbs.umn.edu/files/migrated-files/downloads/Nguyenetal2016.pdf) | Figure 1 considers OTU richness and sequence abundance; its first panel includes unassigned data and another examines the assigned subset. The paper distinguishes confidence categories. | Show read and OTU coverage separately, keep the large unassigned fraction visible, and summarize Probable/Highly Probable calls. Mixed labels remain combined. |
| [Põlme et al. 2020, FungalTraits](https://doi.org/10.1007/s13225-020-00466-2) | Figure 1 displays the database's distribution of primary lifestyles across phyla. The schema distinguishes primary from secondary lifestyles. This is a database-level figure, not a sample-level abundance benchmark. | Plot the two lifestyle fields separately; derive proportions from SC's assigned counts and explicitly state denominators. |
| [Tanunchai et al. 2023, comparison of FungalTraits and FUNGuild](https://doi.org/10.1007/s00248-022-01973-2); [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC9958157/) | Figure 1 compares assignment coverage and overlap; other figures compare guild composition across biological samples. | Compare annotation coverage and technical workflow sensitivity. Do not transfer its biological replicate comparisons or tests to one SC sample. Database coverage is not database accuracy. |
| [Yang et al. 2023, ggpicrust2](https://doi.org/10.1093/bioinformatics/btad470); [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC10425198/) | The paper describes bar, error-bar, PCA and heatmap displays for PICRUSt2 output, alongside function-name annotation and group-comparison workflows. | Use named ranked profiles and a pathway × OTU contribution heatmap. No PCA, differential abundance, inferential error bars or significance tests are calculated for SC. The package was a presentation reference; it was not installed or run. |
| [Douglas et al. 2020, PICRUSt2](https://doi.org/10.1038/s41587-020-0548-6); [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC7365738/) | Figures 2–3 assess predictions against benchmark data, emphasizing that computational prediction and measured metagenomics differ. | Include representation and reference-distance diagnostics. The successful SC run is not itself a validation against measured functional data. |
| [PICRUSt2 official FAQ](https://github.com/picrust/picrust2/wiki/Frequently-Asked-Questions) | Discusses functional-profile visualization and stratified contributions; warns that fungal predictions have substantially lower accuracy than 16S predictions. | Present fungal PICRUSt2 as an exploratory supplement. Put retention and NSTI beside EC/pathway profiles and avoid interpreting predictions as measured activity. |
| [PICRUSt2 standard output](https://github.com/picrust/picrust2/wiki/Standard-PICRUSt2-output); [pathway inference](https://github.com/picrust/picrust2/wiki/Infer-pathway-abundances) | Defines unstratified abundances, stratified feature contributions and pathway reconstruction. | Read these native outputs directly. Validate that SC contribution sums reconcile, and label model units and per-pathway contribution percentages distinctly. |

The final SC plot selection is an inference from these practices and the dataset's constraints, rather than an assertion that one chart style is a universally prescribed standard:

- Figure 01: community and taxonomy context, with unresolved fractions.
- Figure 02: ecological assignment coverage by reads and OTUs.
- Figure 03: primary/secondary FungalTraits lifestyles and combined FUNGuild labels.
- Figure 04: sensitivity to borderline OTU_9 and alternative processing workflows.
- Figure 05: fungal PICRUSt2 retention, per-OTU NSTI and eligibility sensitivity.
- Figure 06: ranked EC predictions and broad EC classes.
- Figure 07: ranked MetaCyc pathways, identifying the borderline OTU contribution.
- Figure 08: pathway contributions from individual OTUs within the single sample.

All original plot inputs remain unchanged. A searchable offline report supplies every positive EC/pathway prediction rather than selectively presenting only biologically appealing names. Broad reaction/pathway profiles commonly include housekeeping functions; ranking is not evidence of site-specific ecological activity.

The installed EC description resources required a nomenclature audit. The primary table named 764 of the 840 original EC IDs; its bundled companion map supplied all 76 remaining descriptions. Across all IDs, that companion map labels 58 as transferred and two as deleted, with 780 named entries. The 60 transferred/deleted entries are flagged in gray in Figure 06 and in the tables. Counts and original IDs are preserved without automatic successor mapping, which could duplicate one-to-many transfers. These labels describe the bundled reference snapshot; they are not a newly verified current IUBMB nomenclature release.
