import { FeedItem } from '@/types';

export const initialFeedItems: FeedItem[] = [
  // 1. Business Article: Founder Playbook
  {
    id: 'business-technical-founders-playbook',
    type: 'article',
    title: "The Technical Founder's Playbook: How Student Engineers Build Real Cash-Flow Ventures",
    excerpt:
      'Why writing clean code is only 20% of startup survival, and how Rwandan student founders master distribution, customer discovery, and unit economics before graduation.',
    content: `At Rwanda Coding Academy, education does not pause at algorithmic syntax and distributed systems. Through the Entrepreneurs & Traders Society (ENTS), students are actively fusing software development with rigorous commercial viability.

In high-velocity weekly sprints, student engineering pods formulate product theses, build functional prototypes, and deploy them across campus micro-markets. The objective is not hypothetical case studies: it is the validation of real unit economics, user retention cohorts, and transactional reliability.

"We realized early on that software without distribution or financial discipline remains an academic project," explains Cedric Mugisha, ENTS President. "By treating campus utilities as active testbeds for venture incubation, our members learn how capital flows before they ever pitch to an institutional angel investor."

Core Tenets for Student Technical Founders:
1. Fall in love with customer bottlenecks, not your codebase architecture.
2. Distribution is a feature: build organic referral loops directly into user onboarding workflows.
3. Validate willingness to pay before writing line 1,000 of backend boilerplate.
4. Establish clear cash-flow escrow mechanics to protect both customer liquidity and founder liability.

From canteen billing escrows like KuraPay to full-stack quantitative simulators like SIFS, students are proving that secondary technical institutions can be powerful incubators of scalable fintech infrastructure.`,
    author: 'Cedric Mugisha & ENTS Editorial',
    date: 'March 18, 2026',
    readTime: '5 min read',
    tags: ['Business', 'Ventures', 'Startup', 'Strategy'],
    sourceName: 'ENTS Research',
    imageUrl: '/news/coding-lab.jpg',
  },

  // 2. Business Article: Unit Economics
  {
    id: 'business-unit-economics-101',
    type: 'article',
    title: 'Unit Economics for Campus Startups: Mastering CAC, LTV, and Margins Before Pitching',
    excerpt:
      'A practical mathematical framework for evaluating customer acquisition costs, gross margin sustainability, and payback periods in early-stage student enterprises.',
    content: `Every week during ENTS pitch teardowns, technical teams present working web prototypes with high concurrent user counts. Yet the first question from the Business Handlers review panel is consistently identical: "What is your contribution margin per completed transaction?"

Many early-stage builders conflate gross transaction volume with sustainable business health. At ENTS, we require every venture team to maintain an active spreadsheet tracking three vital metrics:

1. Customer Acquisition Cost (CAC):
In a dense student environment, organic word-of-mouth creates artificial acquisition efficiency. Founders must calculate blended CAC alongside paid or incentivized acquisition costs to project true scalability outside campus gates.

2. Lifetime Value (LTV) & Churn Dynamics:
LTV is not infinite optimism; it is mathematically bounded by user lifespan and average recurring transaction frequency. We teach founders that reducing 30-day cohort churn by 5% yields higher terminal value than doubling initial top-of-funnel signups.

3. Net Contribution Margin:
After factoring in payment gateway fees (often 1.5% to 3.5% across regional mobile money rails), server hosting allocations, and merchant reconciliation costs, what remains of your nominal markup? If unit economics fail at a 100-user scale, scaling to 10,000 users simply accelerates bankruptcy.

Mastering these equations transforms student engineers from hobbyist coders into bankable enterprise operators.`,
    author: 'Patrick Cyusa & David Nshimiyimana',
    date: 'March 15, 2026',
    readTime: '6 min read',
    tags: ['Business', 'Finance', 'Unit Economics', 'Metrics'],
    sourceName: 'ENTS Treasury Desk',
    imageUrl: '/news/venture-sprint.jpg',
  },

  // 3. Business Article: Risk Management
  {
    id: 'business-1-percent-risk-management',
    type: 'article',
    title: 'The 1% Capital Preservation Doctrine: Why Risk Discipline Beats Pure Alpha',
    excerpt:
      'Inside the algorithmic risk rules that prevent account blowups: how quantitative traders and treasury leads treat drawdown limits as non-negotiable operational laws.',
    content: `In discretionary trading, human psychology is consistently the weakest link. When markets experience sudden regime shifts or volatility spikes, emotional traders double down on losing positions in an attempt to recover capital quickly.

At ENTS, every trader running algorithms through the SIFS engine operates under a strict, programmatically enforced mandate: The 1% Maximum Risk-Per-Trade Rule.

Why 1% Risk is the Mathematical Shield:
- With 1% risk per trade, a trader can endure an unprecedented streak of 10 consecutive losses and still retain over 90.4% of total equity.
- Conversely, risking 10% per trade means 5 consecutive losses wipe out nearly half the entire account, requiring a 100% net return just to return to breakeven.

Automated Enforcement:
Rather than relying on human willpower during rapid market swings, the SIFS matching engine automatically calculates required lot sizing based on distance to the defined technical stop-loss. If an order's projected liquidation loss exceeds 1.00% of nominal portfolio equity, the execution gateway rejects the ticket before execution.

Capital preservation is not the absence of ambition; it is the mathematical guarantee that you will be alive to capture tomorrow's high-probability opportunities.`,
    author: 'Aline Umutoni & Quant Committee',
    date: 'March 12, 2026',
    readTime: '4 min read',
    tags: ['Trading', 'Risk', 'Finance', 'SIFS'],
    sourceName: 'ENTS Markets Desk',
    imageUrl: '/news/trading-terminal.jpg',
  },

  // 4. Business Article: B2B Software Contracts
  {
    id: 'business-b2b-software-contracts',
    type: 'article',
    title: 'Closing Enterprise & SME Software Contracts as High-School Engineers',
    excerpt:
      'How the ENTS Business Handlers track navigates statements of work, milestone billing, service level agreements, and client relationships across Musanze and Kigali.',
    content: `Can secondary school developers execute enterprise-grade client software? In Musanze and Kigali, local hospitality venues, logistics cooperatives, and agribusinesses require custom internal tooling but face prohibitive agency retainers.

Through the ENTS Business Handlers unit, student teams bridge this gap by functioning as professional software delivery partners.

Key Lessons from Commercial Client Engagements:
1. Never bill strictly on raw hourly time; bill on agreed deliverable milestones. Milestone escrow aligns incentives and gives non-technical clients transparency.
2. The Statement of Work (SOW) is your defense against scope creep. Clear inclusion and exclusion clauses prevent a 4-week dashboard from ballooning into an uncompensated 6-month enterprise rewrite.
3. Post-Deployment Maintenance (SLA): Establish explicit maintenance retainers for server uptime, security patches, and database backups after handover.

By handling the commercial negotiations, pricing models, and contract deliverables, our Business Handlers allow developers to focus on clean execution while ensuring fair market compensation for student labor.`,
    author: 'Business Handlers Guild',
    date: 'March 08, 2026',
    readTime: '5 min read',
    tags: ['Business', 'Contracts', 'Agency', 'Sales'],
    sourceName: 'ENTS Ventures',
    imageUrl: '/news/coding-lab.jpg',
  },

  // 5. Business Article: Bootstrapping vs. Venture Capital
  {
    id: 'business-bootstrapping-vs-vc',
    type: 'article',
    title: 'Bootstrapping vs. Venture Capital: Choosing the Right Capital Path for African Tech Ventures',
    excerpt:
      'Analyzing when young founders should pursue angel funding versus building self-sustaining profitability from Day 1 in emerging markets.',
    content: `Silicon Valley headlines often celebrate multi-million dollar venture capital funding rounds as the sole hallmark of startup triumph. In African tech ecosystems, however, capital dynamics require a far more nuanced strategic assessment.

For student and early-stage founders across East Africa, customer-funded growth is frequently superior to early institutional dilution:

1. Real Customer Capital Validates Demand:
When a customer pays upfront for software access, you receive zero-dilution working capital paired with unambiguous product validation. An investor check, by contrast, merely proves you gave a compelling pitch deck presentation.

2. Preserving Strategic Autonomy:
Venture capital operates on 10x fund return horizons, requiring rapid, often unsustainable expansion into multiple geographies before unit economics stabilize. Bootstrapping allows founders to dominate a targeted regional niche, build high-margin revenue, and maintain 100% equity governance.

3. When Venture Capital Actually Makes Sense:
Venture funding is potent when the technology requires deep upfront capital expenditure (such as proprietary IoT hardware, regulatory licensing, or intensive machine learning clusters) where winning the network effect demands rapid blitzscaling.

At ENTS, we encourage our venture pods to achieve cash-flow breakeven on campus before ever scheduling a meeting with outside angels.`,
    author: 'ENTS Advisory Board',
    date: 'February 26, 2026',
    readTime: '6 min read',
    tags: ['Business', 'Venture Capital', 'Bootstrapping', 'Strategy'],
    sourceName: 'ENTS Strategy Review',
    imageUrl: '/news/venture-sprint.jpg',
  },

  // 6. Business Article: Fintech Infrastructure
  {
    id: 'business-fintech-infrastructure',
    type: 'article',
    title: 'Engineering Frictionless Fintech: Lessons from Building Campus Escrow & Micro-Payments',
    excerpt:
      'Architectural insights on designing reliable financial state machines, idempotency keys, and reconciliation pipelines in high-throughput environments.',
    content: `Building financial software differs fundamentally from typical web development: an off-by-one error or an unhandled webhook retry does not just trigger a visual bug—it duplicates withdrawals or breaks accounting ledgers.

While building student escrow pilots at Rwanda Coding Academy, the ENTS fintech engineering squad documented several non-negotiable architectural patterns:

1. Double-Entry Bookkeeping Ledgers:
Never store a simple "balance" integer on a user record. Every financial movement must exist as an immutable pair of debit and credit entries. The user's displayed balance is simply the deterministic sum of all reconciled ledger records.

2. Idempotency Keys on All Payment Gateways:
Network drops in mobile environments frequently lead to duplicate request dispatches. By attaching client-generated UUID idempotency keys to every payment intent, the server ensures that a retry will never charge a customer twice.

3. Asynchronous Webhook Reconciliation:
Third-party payment providers can delay transaction confirmation notices by seconds or minutes. Systems must implement event-driven state machines that handle pending, settling, and failed webhook transitions without leaving user orders in limbo.

Software engineers who master financial ledger integrity operate at an entirely higher standard of precision.`,
    author: 'Fintech Engineering Squad',
    date: 'February 18, 2026',
    readTime: '5 min read',
    tags: ['Fintech', 'Engineering', 'Payments', 'Software'],
    sourceName: 'ENTS Tech Desk',
    imageUrl: '/news/trading-terminal.jpg',
  },

  // 7. Upcoming Event: SIFS League Tournament
  {
    id: 'event-sifs-round-04',
    type: 'event',
    title: 'SIFS Simulated League Tournament: Round 04',
    excerpt:
      'Quant traders test momentum algorithms under strict 1% risk-per-trade rules on live campus feeds.',
    content: `Round 04 of the SIFS Paper Trading League brings together 24 qualified analysts to execute sub-50ms tick momentum strategies across synthetic foreign exchange and commodity pairs.

Participants must navigate dynamic volatility clusters while adhering strictly to the society's hard-coded 1% stop-loss guardrails. Any algorithm exceeding the maximum drawdown threshold is automatically disqualified by the matching engine.`,
    author: 'Quant Committee',
    date: 'March 22, 2026',
    readTime: '2 hours',
    tags: ['Competition', 'Trading'],
    eventDate: 'Saturday, March 28, 2026',
    eventTime: '15:00 - 17:30 CAT',
    eventLocation: 'RCA Innovation Lab',
    rsvpLink: '/about',
    imageUrl: '/events/trading-league.jpg',
    speakers: ['Aline Umutoni', 'David Nshimiyimana'],
  },

  // 8. Upcoming Event: Demo Day
  {
    id: 'event-venture-pitch-day',
    type: 'event',
    title: 'ENTS Cohort Venture Demo Day',
    excerpt:
      'Student founders pitch live software ventures and campus revenue models to faculty mentors.',
    content: `Join us for the flagship semester demo day where five student venture teams present working software, audited cash flows, and institutional roadmaps to faculty advisors and guest industry leaders.`,
    author: 'Executive Committee',
    date: 'March 10, 2026',
    readTime: '3 hours',
    tags: ['Pitch Day', 'Ventures'],
    eventDate: 'Friday, April 03, 2026',
    eventTime: '17:00 - 19:30 CAT',
    eventLocation: 'RCA Main Amphitheater',
    rsvpLink: '/about',
    imageUrl: '/events/demo-day.jpg',
    speakers: ['Cedric Mugisha', 'Eng. Christian Niyitegeka'],
  },

  // 9. Upcoming Event: Masterclass
  {
    id: 'event-macro-masterclass',
    type: 'event',
    title: 'Macroeconomic & FX Volatility Masterclass',
    excerpt:
      'Weekend deep dive into central bank rate cycles, regional liquidity, and currency hedging.',
    content: `An intensive two-hour masterclass exploring how global macroeconomic indicators impact frontier market foreign exchange stability. Led by student quantitative researchers with curated case studies.`,
    author: 'Advisory Board',
    date: 'February 20, 2026',
    readTime: '2 hours',
    tags: ['Workshop', 'Economics'],
    eventDate: 'Saturday, April 11, 2026',
    eventTime: '10:00 - 12:00 CAT',
    eventLocation: 'Virtual Session Room',
    rsvpLink: '/about',
    imageUrl: '/events/masterclass.jpg',
    speakers: ['Aline Umutoni'],
  },
];
