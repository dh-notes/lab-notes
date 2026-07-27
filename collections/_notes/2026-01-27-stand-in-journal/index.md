---
layout: note
title: The Limits of Network Analysis
pdf_url: /notes/2026-01-27-stand-in-journal/article.pdf
date: 2026-01-27
authors:
  - Wax Meber
  - Demile Erkheim
tags:
  - computational methods
  - network analysis
  - critique
summary: >
  A methodological note on what network analysis reveals and what it occludes
  when applied to humanistic corpora — and on the quiet ways that graph-theoretic
  intuitions reshape what we consider worth asking.
---

## 1. What Network Analysis Promises

Network analysis arrives in the humanities bearing a seductive promise: that relationships between texts, people, or concepts can be rendered legible as edges and nodes, and that the resulting graph will surface patterns invisible to close reading. The method has genuine explanatory power. A correspondence network among nineteenth-century scientists can reveal collaborative structures that no single archive makes obvious. A citation graph across a century of scholarship can expose the quiet consolidation of a field. These are real findings, produced by real methods, and they have changed what we can ask of cultural corpora.[^1]

Yet the promise carries assumptions that are rarely stated. A network is an abstraction: it reduces a set of relationships to a specific formalism, and the formalism does work that the analyst often does not see. To represent two letters as an edge is to decide that the relationship they instantiate is of a single type, of comparable weight, and meaningfully distinct from the relationships it excludes. These are not neutral modeling choices. They are arguments about what counts as connection.

## 2. The Problem of Edge Definition

Consider the question of what constitutes an edge. In a letter network, the obvious answer is correspondence: person A wrote to person B, therefore an edge exists between them. But this simple criterion conceals several decisions. Does a single letter count the same as a decade of sustained correspondence? Does a letter of condolence count the same as a letter of intellectual exchange? Does a letter that survives in the archive count the same as one that is known to have existed but is now lost?[^4]

The standard response is to weight edges. A weighted graph assigns a number to each connection, and that number can reflect frequency, duration, or some other proxy for intensity. This is an improvement, but it displaces the problem rather than solving it. Now the analyst must decide what weight to assign, and on what basis.

## 3. Centrality and its Discontents

The most widely reported outputs of network analysis are centrality measures: who is the most connected, who is the most between, who is the closest. These measures are intuitive and easily communicated, which is precisely why they travel so well.[^3]

But centrality measures are artifacts of the graph's construction. An actor can appear central because they were genuinely central to the phenomenon under study, or because they left more surviving letters than their contemporaries, or because the archive that houses their correspondence has been more thoroughly digitized than other archives.[^2]

## 4. Against Graph-Theoretic Realism

The deeper problem is what we might call graph-theoretic realism: the assumption that the patterns visible in the graph correspond to patterns in the underlying reality. This assumption is rarely stated explicitly, but it is everywhere in the interpretive work that network analysis enables.

## 5. Toward Reflexive Network Analysis

A reflexive network analysis would make its choices explicit. It would specify what it means by an edge, what weighting scheme it uses and why, what the archival biases of its sources are, and what claims it is and is not making about the underlying phenomenon. It would treat its visualizations as arguments rather than discoveries.[^5]

None of this requires abandoning the method. It requires only that we practice it with the same critical attention we bring to other forms of humanistic inquiry. The graph is a tool, not an oracle.

[^1]: Granovetter, *The Strength of Weak Ties*, AJS 78:6 (1973), 1360–1380. The classic statement of the claim that novel information flows through low-intensity connections rather than tight clusters.

[^2]: See Bode (2020) on the uneven coverage of digitized corpora and the risks of treating survival as significance.

[^3]: Freeman, *Centrality in Social Networks*, Social Networks 1:3 (1978). The distinction between degree, betweenness, and closeness centrality matters a great deal here — each encodes a different theory of what it means to be important in a network.

[^4]: On corpus construction as an epistemological act, see Katherine Bode, *A World of Fiction* (Michigan, 2018), especially ch. 1.

[^5]: Watts & Strogatz, *Collective Dynamics of Small-World Networks*, Nature 393 (1998). A mathematical intuition that has been transported, sometimes uncritically, into humanistic analysis.
