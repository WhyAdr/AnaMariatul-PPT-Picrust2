SC figure guide — 30 October 2026 (Asia/Jakarta).

Figures were generated from frozen outputs; classification, clustering, guild annotation and PICRUSt2 were not rerun. All panels are descriptive. PNG is 240 dpi; PDF/SVG preserve vectors and editable text. All figures are combined in SC_figures.pdf. The offline index.html embeds figures and provides searchable EC/MetaCyc predictions and an OTU audit table.



Reproduction from the workspace root:



    /home/prom/miniconda3/envs/ONT-ecoguild/bin/python SC_reanalysis_2026-10-23/12_visualizations_2026-10-30/build_figures.py



The script enforces one CPU, 6 GiB address-space limit and single-threaded numerical libraries. The final status and manifest record failures or completion. No additional package installation or network access is required for rendering.



Use the community/guild figures as descriptive main results; use the PICRUSt2 figures as an exploratory supplement with diagnostics. Read counts are not organism abundance; overlapping pathway categories are not percentages of ecological activity.



**01_community_context — SC | Community context**

Read assignment and fungal phylum resolution share the denominator of 52,404 preprocessed reads. Outside fungal input includes other/uncertain core ITS plus ambiguous and unassigned reads. Fungal origin without resolved phylum is retained explicitly. These are sequencing read proportions, not biomass or cell proportions.

Source tables: tables/read_assignment_context.tsv, tables/phylum_context.tsv



**02_guild_annotation_coverage — SC | Ecological annotation coverage**

Panel A retains the unassigned and outside-input fractions using all 52,404 preprocessed reads. Panel B separates read-weighted coverage from the percentage of 34 fungal-input OTUs annotated. Original Y-only chimera exclusion was used; borderline OTU_9 is included. Database-specific ranks and confidence schemes differ.

Source tables: tables/guild_coverage.tsv



**03_guild_lifestyle_composition — SC | Putative lifestyles and guilds**

FungalTraits primary and secondary fields are plotted separately and are not added together. FUNGuild retains combined guild labels and Probable/Highly Probable calls. Bar lengths are percentages of all preprocessed reads, not percentages of the small annotated subset. Hatching identifies the contribution of reference-chimera-borderline OTU_9. Labels are taxon-associated hypotheses, not observations of disease or activity.

Source tables: tables/guild_lifestyle_composition.tsv



**04_guild_sensitivity — SC | Sensitivity of ecological annotations**

Panel A recomputes existing annotation totals after omitting OTU_9; the underlying annotation workflow was not rerun. Both policies use the same denominator of 52,404 reads. Panel B compares the three existing clustering/refinement workflows under their original Y-only chimera exclusion rules. Similar totals across workflows are technical stability evidence, not biological replication. No error bars or significance tests are warranted.

Source tables: tables/guild_borderline_sensitivity.tsv



**05_picrust2_diagnostics — SC | PICRUSt2 representation and reference distance**

PICRUSt2 retained 27 of 34 fungal-input OTUs after excluding five alignment failures and two OTUs above NSTI 2. The 28,587 represented reads are 54.55% of preprocessed and 27.75% of delivered raw reads. NSTI is phylogenetic distance, not percent mismatch. The weighted value uses ITS-copy-normalized abundance after filtering. Panel C applies hypothetical NSTI cutoffs to existing placed OTUs; it is not a rerun or accuracy calibration.

Source tables: tables/picrust2_retention.tsv, tables/otu_annotation_and_nsti.tsv, tables/picrust2_nsti_threshold_retention.tsv



**06_picrust2_ec_profile — SC | Predicted enzyme categories**

The 15 largest EC predictions are ranked by unstratified predicted abundance. Names and entry status come from the installed PICRUSt2 description maps. Entries labelled transferred or deleted in the bundled map are gray; original IDs and counts are preserved and are not automatically reassigned to one or more successor ECs. Broad classes sum original predicted gene-family abundances; these totals are not read percentages or independent ecosystem functions. Predictions are not enzyme assays or measured gene counts. All 840 categories are provided in the source table.

Source tables: tables/ec_predicted_profiles.tsv, tables/ec_class_profile.tsv, tables/ec_reference_status_summary.tsv



**07_picrust2_pathway_profile — SC | Predicted MetaCyc pathway profile**

The top 20 MetaCyc pathways are ranked by predicted abundance from the original fungal pathway output. Descriptions come from the installed PICRUSt2 map. Hatched portions are existing stratified contributions from borderline OTU_9; their sums reconcile with unstratified abundance. Removing these portions visually is not a rerun of pathway inference. Pathways overlap in component reactions and should not be interpreted as mutually exclusive fractions of reads or activity.

Source tables: tables/metacyc_predicted_profiles.tsv



**08_picrust2_otu_contributions — SC | Which OTUs drive the pathway predictions?**

Cell values are each OTU contribution divided by the total predicted abundance of that pathway. Every row sums to 100%; this is not a heatmap comparing biological samples. OTUs are ordered by normalized abundance, not hierarchical clustering. Values at least 10% are printed; the color scale saturates above 40%. OTU_9 is marked because of its borderline reference-chimera call. Per-OTU NSTI and taxonomy are provided in the linked audit table.

Source tables: tables/top_pathways_otu_contribution_percent.tsv, tables/otu_annotation_and_nsti.tsv



**Important denominator and sensitivity rules**

Guild composition uses all 52,404 preprocessed reads; coverage within the fungal dataset uses 40,364 reads or 34 OTUs. These denominators are never interchanged. Outside fungal input combines unresolved/nonfungal core and unassigned/ambiguous reads. FUNGuild confidence is not a taxonomy probability. Primary and secondary FungalTraits annotations are separate fields and cannot be added. Mixed guild labels are kept combined.

OTU_9 (2,101 reads) has reference-chimera flag ?. The original Y-only exclusion rule retained it. Figure 04 omits its existing annotation contribution as a sensitivity summary; it does not rerun annotation or inference. Hatched pathway portions show existing OTU_9 contributions, not a recalculated community after exclusion.

The weighted NSTI is recomputed using ITS-copy-normalized eligible abundance. Hypothetical NSTI retention is based on existing placements and raw represented-read accounting; it is not an accuracy estimate. EC and pathway contribution tables were checked to sum to their corresponding unstratified predictions.

Descriptive top functions are selected solely by abundance, not manual biological interest or significance. All functions remain in tables and the searchable report. Description maps were copied from the installed PICRUSt2 environment and their hashes are recorded.



Some original EC identifiers are labelled transferred or deleted in the bundled description map. These predictions remain under their original IDs and are flagged in the EC plot and table; one-to-many successor mappings are not automatically expanded. Broad EC class totals retain original identifiers.



Literature and reference-specific adaptations are in references/visualization_references.md.
