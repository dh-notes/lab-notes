---
title: "On Study Design in Computational Humanities"
authors:
  - Dennis Yi Tenen
affiliations:
  - Department of English and Comparative Literature, Columbia University, New York NY 10027, USA
orcids:
  - name: D. Y. Tenen
    id: 0000-0001-9876-5432
corresponding: dyt2107@columbia.edu
date: 2026-01-01
status: approved
tags:
  - causal inference
  - study design
  - natural experiment
  - computational humanities
  - research methods
  - distant reading
  - corpus construction
subtitle: "Causal Inference, Natural Experiments, and the Conditions of Knowledge Production in Humanistic Research"
summary: "Causal Inference, Natural Experiments, and the Conditions of Knowledge Production in Humanistic Research"
abstract: "Reading Thad Dunning's Natural Experiments in the Social Sciences (Cambridge, 2012), this note reflects on the problem of study design in computational humanities research. Dunning's central question — how can causal inference be improved? — proves unexpectedly generative when transposed into humanistic inquiry, where causal and statistical assumptions are often difficult to explicate and defend, let alone validate. This note argues that the natural experiment framework, understood as a design-based method in which control over confounding variables emerges from research-design choices rather than ex post statistical adjustment, offers a productive model for computational approaches to literary and historical corpora."
doi: "10.1145/3674158.3674162"
volume_info: "Vol. 1, No. 1 (Winter 2026) · Article No. 4 · pp. 1–6"
publisher: "metaLAB at Harvard, Cambridge MA"
received: "03 Oct 2025"
revised: "12 Nov 2025"
accepted: "18 Nov 2025"
pdf_url: "https://dl.acm.org/doi/pdf/10.1145/3674158.3674162"
resources:
  - label: "GitHub — Replication code"
    url: "https://github.com/denten/study-design-humanities"
  - label: "OSF — Data and materials"
    url: "https://osf.io/abc123"
  - label: "DOI — Canonical record"
    url: "https://doi.org/10.1145/3674158.3674162"
  - label: "arXiv — Preprint"
    url: "https://arxiv.org/abs/2401.00000"
  - label: "Zenodo — Dataset"
    url: "https://zenodo.org/record/123456"
---

## 1. On Causal Inference in Humanistic Research

Reading Thad Dunning's *Natural Experiments in the Social Sciences* (Cambridge, 2012) I am particularly struck by his discussion of study design. "How can causal inference be improved?" he asks on page 4 and answers: "In seeking to answer such questions, I place central emphasis on natural experiments as a 'design-based' method of research — one in which control over confounding variables comes primarily from research-design choices, rather than *ex post* adjustment using parametric statistical models."<sup class="fn-ref" onclick="document.getElementById('fn1').scrollIntoView({behavior:'smooth'})">1</sup>

This approach seems particularly well-suited for computational study in the humanities, where the veracity of causal and statistical assumptions are often difficult to explicate and defend — let alone validate. The natural experiment approach seeks to shift reasoning about such assumptions from the statistical modeling phase of research to the design process, expressed in the logic of the design itself. In short, it is the research design, rather than the statistical model, that does the heavy lifting.

<div class="figure">
  <span class="figure-n">Figure 1</span>
  <div class="figure-inner" style="background:#fff;padding:0">
    <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Fragment Mono',monospace;">
      <line x1="80" y1="40" x2="80" y2="290" stroke="#0a0a0a" stroke-width="1"/><line x1="80" y1="290" x2="760" y2="290" stroke="#0a0a0a" stroke-width="1"/>
      <text x="72" y="44" text-anchor="end" font-size="9" fill="#666">high</text><text x="72" y="165" text-anchor="end" font-size="9" fill="#666">mid</text><text x="72" y="290" text-anchor="end" font-size="9" fill="#666">low</text>
      <line x1="76" y1="290" x2="80" y2="290" stroke="#0a0a0a" stroke-width="1"/><line x1="76" y1="165" x2="80" y2="165" stroke="#0a0a0a" stroke-width="1"/><line x1="76" y1="40" x2="80" y2="40" stroke="#0a0a0a" stroke-width="1"/>
      <text transform="rotate(-90)" x="-200" y="22" text-anchor="middle" font-size="9" fill="#0a0a0a" letter-spacing="1">ASSUMPTION EXPLICITNESS</text>
      <text x="420" y="318" text-anchor="middle" font-size="9" fill="#0a0a0a" letter-spacing="1">RESEARCH DESIGN STAGE</text>
      <text x="160" y="306" text-anchor="middle" font-size="8" fill="#666">Hypothesis</text><text x="300" y="306" text-anchor="middle" font-size="8" fill="#666">Corpus Selection</text><text x="460" y="306" text-anchor="middle" font-size="8" fill="#666">Method Choice</text><text x="620" y="306" text-anchor="middle" font-size="8" fill="#666">Statistical Model</text><text x="740" y="306" text-anchor="middle" font-size="8" fill="#666">Output</text>
      <polyline points="160,240 300,230 460,210 620,75 740,120" fill="none" stroke="#aaa" stroke-width="1.5" stroke-dasharray="5,3"/>
      <polyline points="160,80 300,90 460,115 620,170 740,180" fill="none" stroke="#0a0a0a" stroke-width="2"/>
      <circle cx="160" cy="80" r="4" fill="#0a0a0a"/><circle cx="300" cy="90" r="4" fill="#0a0a0a"/><circle cx="460" cy="115" r="4" fill="#0a0a0a"/><circle cx="620" cy="170" r="4" fill="#0a0a0a"/><circle cx="740" cy="180" r="4" fill="#0a0a0a"/>
      <circle cx="160" cy="240" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><circle cx="300" cy="230" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><circle cx="460" cy="210" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><circle cx="620" cy="75" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><circle cx="740" cy="120" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/>
      <line x1="90" y1="55" x2="130" y2="55" stroke="#0a0a0a" stroke-width="2"/><circle cx="110" cy="55" r="3" fill="#0a0a0a"/><text x="136" y="59" font-size="8" fill="#0a0a0a">Design-based inference</text>
      <line x1="90" y1="72" x2="130" y2="72" stroke="#aaa" stroke-width="1.5" stroke-dasharray="4,3"/><circle cx="110" cy="72" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><text x="136" y="76" font-size="8" fill="#666">Model-based inference</text>
    </svg>
  </div>
  <div class="figure-caption"><strong>Fig. 1.</strong> Schematic comparison of assumption explicitness across research design stages in design-based versus model-based approaches to causal inference.</div>
  <div class="figure-credit">Visualization: Author. Adapted from Dunning, <em>Natural Experiments in the Social Sciences</em> (Cambridge UP, 2012), Ch. 1.</div>
</div>

## 2. Design as Argument

For this reason, Dunning writes, "substantive and contextual knowledge plays an important role at every stage of natural-experimental research — from discovery to analysis to evaluation." The emphasis on context necessitates thinking about statistical concepts such as "effect" in ways that are grounded in the specific conditions of the historical or literary problem under study.<sup class="fn-ref" onclick="document.getElementById('fn2').scrollIntoView({behavior:'smooth'})">2</sup>

This has immediate implications for how we frame computational humanities projects. Too often, the adoption of statistical or machine-learning methods in literary and historical research is understood as a gesture toward scientific legitimacy — a borrowing of method that preserves the assumption structure of the original social-scientific context while discarding the disciplinary safeguards that made those assumptions defensible.

Consider corpus selection. In standard distant reading practice, the corpus is assembled according to availability, prior canonical judgment, or the outputs of digitization projects, and is then treated as the ground on which analysis proceeds. From a design-based perspective, corpus selection is instead a moment of assumption-making that must be theorized explicitly: what counterfactual is implied by this particular set of texts?<sup class="fn-ref" onclick="document.getElementById('fn3').scrollIntoView({behavior:'smooth'})">3</sup>

## 3. Toward a Design-Based Humanities

The natural experiment model is not, of course, directly transferable to the humanities. Historical and literary materials rarely permit the kind of exogenous variation that defines a true natural experiment in political science or economics. What the framework offers instead is a vocabulary for making explicit the design choices that computational humanities researchers already make implicitly.

A design-based computational humanities would begin not with a corpus and a method but with a research design: a specification of the variation to be exploited, the assumptions required to interpret that variation causally, and the limitations those assumptions impose on the conclusions that can be drawn.<sup class="fn-ref" onclick="document.getElementById('fn4').scrollIntoView({behavior:'smooth'})">4</sup>

Lab Notes is precisely the kind of venue in which such methodological reflection can take place: short, process-oriented, and uncoupled from the pressure to present finished results. A note is an appropriate form for an observation that is not yet a finding — for a moment of reading that reorganizes the assumptions of a larger project still in progress.

<div class="bibliography">
<span class="bibliography-title">References</span>
<ol class="bib-list">
<li class="bib-item">Bode, Katherine. "The Equivalence of 'Close' and 'Distant' Reading." <em>Modern Language Quarterly</em> 78.1 (2017): 77–106.</li>
<li class="bib-item">Dunning, Thad. <em>Natural Experiments in the Social Sciences: A Design-Based Approach</em>. Cambridge: Cambridge University Press, 2012.</li>
<li class="bib-item">Drucker, Johanna. "Humanities Approaches to Graphical Display." <em>Digital Humanities Quarterly</em> 5.1 (2011).</li>
<li class="bib-item">King, Gary, Robert O. Keohane, and Sidney Verba. <em>Designing Social Inquiry</em>. Princeton: Princeton University Press, 1994.</li>
<li class="bib-item">Moretti, Franco. <em>Distant Reading</em>. London: Verso, 2013.</li>
<li class="bib-item">Piper, Andrew. <em>Enumerations: Data and Literary Study</em>. Chicago: University of Chicago Press, 2018.</li>
<li class="bib-item">Underwood, Ted. <em>Distant Horizons: Digital Evidence and Literary Change</em>. Chicago: University of Chicago Press, 2019.</li>
<li class="bib-item">Tenen, Dennis Yi. <em>Plain Text: The Poetics of Computation</em>. Stanford: Stanford University Press, 2017.</li>
<li class="bib-item">Jockers, Matthew L. <em>Macroanalysis: Digital Methods and Literary History</em>. Urbana: University of Illinois Press, 2013.</li>
<li class="bib-item">Ramsay, Stephen. <em>Reading Machines: Toward an Algorithmic Criticism</em>. Urbana: University of Illinois Press, 2011.</li>
</ol>
</div>

<div class="footnotes">
<h3 class="footnotes-title">Notes</h3>
<ol class="fn-list">
<li id="fn1" class="fn-item"><span class="fn-num">1</span><span>Dunning, <em>Natural Experiments</em>, 4. The emphasis on design echoes earlier methodological discussions in King, Keohane, and Verba's <em>Designing Social Inquiry</em> (1994).</span></li>
<li id="fn2" class="fn-item"><span class="fn-num">2</span><span>Dunning, <em>Natural Experiments</em>, 7. See also Drucker's critique of quantitative data visualization in humanistic contexts.</span></li>
<li id="fn3" class="fn-item"><span class="fn-num">3</span><span>The critique of corpus construction in distant reading has been developed by Bode (2017) and others.</span></li>
<li id="fn4" class="fn-item"><span class="fn-num">4</span><span>Piper's <em>Enumerations</em> (2018) and Underwood's <em>Distant Horizons</em> (2019) both demonstrate attentiveness to research design that goes well beyond method selection.</span></li>
</ol>
</div>
