# Lab Notes

Lab Notes is a journal of methodological reflection on lab-based research in the humanities and social sciences.

This repository hosts the website and runs the journal’s public editorial workflow.

---

## Workflow

All editorial and development work happens through GitHub Issues.

There are two kinds of issues:

- **Article issues** (`article`) — submissions and peer review  
- **Website issues** — bugs, enhancements, documentation  

If an issue does not have the `article` label, it is considered website-related.

---

## Article Lifecycle

Every article issue must have:

- the label `article`
- exactly **one** status label

Status labels:

- `submitted`
- `under review`
- `revision requested`
- `accepted`
- `published`
- `rejected`

When a manuscript advances, the previous status label is removed and replaced.

The issue thread serves as the public record of peer review and editorial decision-making.

---

## Filtering

View all submissions:


is:issue label:article


Articles under review:


is:issue label:article label:"under review"


Published articles:


is:issue label:article label:published


---

Lab Notes operates through transparent, lightweight infrastructure.  
GitHub Issues function as both editorial workspace and public archive.
