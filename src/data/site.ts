export type InternalHref = "/" | `/${string}`;

export type ServiceSlug =
  | "custom-software-development"
  | "web-experience-design"
  | "mobile-app-development"
  | "ai-workflow-automation"
  | "cloud-devops-reliability"
  | "product-technology-consulting";

export type IndustrySlug =
  | "startups-saas"
  | "retail-ecommerce"
  | "logistics-operations"
  | "healthcare-wellness"
  | "education-training"
  | "professional-services";

export interface SeoFields {
  readonly seoTitle: string;
  readonly seoDescription: string;
}

export interface SiteIdentity extends SeoFields {
  readonly name: string;
  readonly shortName: string;
  readonly url: string;
  readonly tagline: string;
  readonly positioning: string;
  readonly locale: string;
  readonly locationLabel: string;
}

export interface SiteContact {
  readonly email: string;
  readonly emailHref: `mailto:${string}`;
  readonly phone: string;
  readonly phoneHref: `tel:${string}`;
  readonly address: {
    readonly line1: string;
    readonly city: string;
    readonly country: string;
    readonly display: string;
  };
  readonly mapQuery: string;
}

export interface SiteConfig {
  readonly identity: SiteIdentity;
  readonly contact: SiteContact;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: InternalHref;
  readonly description?: string;
  readonly isCallToAction?: boolean;
  readonly children?: readonly NavigationItem[];
}

export interface ProcessStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export interface Service extends SeoFields {
  readonly slug: ServiceSlug;
  readonly name: string;
  readonly shortDescription: string;
  readonly overview: string;
  readonly capabilities: readonly string[];
  readonly outcomes: readonly string[];
  readonly process: readonly ProcessStep[];
  readonly relatedIndustrySlugs: readonly IndustrySlug[];
}

export interface Industry extends SeoFields {
  readonly slug: IndustrySlug;
  readonly name: string;
  readonly shortDescription: string;
  readonly commonChallenges: readonly string[];
  readonly solutionFocus: readonly string[];
  readonly relatedServiceSlugs: readonly ServiceSlug[];
}

export interface RepresentativeWorkItem extends SeoFields {
  readonly slug: string;
  readonly kind: "representative";
  readonly representativeLabel: "Representative engagement";
  readonly disclosure: string;
  readonly title: string;
  readonly industrySlug: IndustrySlug;
  readonly summary: string;
  readonly scenario: string;
  readonly approach: readonly string[];
  readonly deliverables: readonly string[];
  readonly intendedValue: readonly string[];
  readonly relatedServiceSlugs: readonly ServiceSlug[];
}

export interface InsightSection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface InsightArticle extends SeoFields {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly readingMinutes: number;
  readonly keyTakeaways: readonly string[];
  readonly sections: readonly InsightSection[];
}

export type CourseLevel = "Beginner" | "Beginner to intermediate" | "Intermediate";

export interface Course extends SeoFields {
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly audience: string;
  readonly level: CourseLevel;
  readonly duration: string;
  readonly delivery: string;
  readonly availabilityNotice: string;
  readonly modules: readonly string[];
  readonly learningOutcomes: readonly string[];
  readonly prerequisites: readonly string[];
}

export interface EngagementModel {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly bestFor: string;
  readonly howItWorks: string;
  readonly includes: readonly string[];
  readonly clientInputs: readonly string[];
  readonly commercialApproach: string;
}

export type FaqCategory = "Services" | "Delivery" | "Learning" | "Company";

export interface FaqItem {
  readonly id: string;
  readonly category: FaqCategory;
  readonly question: string;
  readonly answer: string;
}

export interface TalentNetworkRole {
  readonly slug: string;
  readonly title: string;
  readonly discipline: string;
  readonly seniority: string;
  readonly location: string;
  readonly availability: "talent-network";
  readonly notice: string;
  readonly summary: string;
  readonly responsibilities: readonly string[];
  readonly skills: readonly string[];
}

export interface InternshipTimelineItem {
  readonly month: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly focus: string;
  readonly activities: readonly string[];
  readonly milestone: string;
}

export const siteIdentity = {
  name: "DevSectors",
  shortName: "DS",
  url: "https://devsectors.site",
  tagline: "Thoughtful software for real-world operations.",
  positioning:
    "DevSectors helps teams plan, design, build, and improve dependable digital products without unnecessary complexity.",
  locale: "en-PK",
  locationLabel: "Bahawalpur, Punjab, Pakistan",
  seoTitle: "DevSectors | Custom Software and Digital Product Studio",
  seoDescription:
    "DevSectors plans, designs, and builds custom software, web platforms, mobile apps, automation, and reliable cloud systems for growing teams.",
} as const satisfies SiteIdentity;

// TODO(owner): Verify this email, phone number, and address before production launch.
export const siteContact = {
  email: "devsectors@gmail.com",
  emailHref: "mailto:devsectors@gmail.com",
  phone: "+92 344 4625292",
  phoneHref: "tel:+923444625292",
  address: {
    line1: "",
    city: "Bahawalpur",
    country: "Pakistan",
    display: "Bahawalpur, Punjab, Pakistan",
  },
  mapQuery: "Bahawalpur, Punjab, Pakistan",
} as const satisfies SiteContact;

export const siteConfig = {
  identity: siteIdentity,
  contact: siteContact,
} as const satisfies SiteConfig;

export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    description: "Explore our product, engineering, automation, and cloud capabilities.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "See how we adapt delivery to different operating environments.",
  },
  {
    label: "Work",
    href: "/work",
    description: "Review clearly labeled examples of the problems we are equipped to solve.",
  },
  {
    label: "Insights",
    href: "/insights",
    description: "Practical guidance for planning and operating digital products.",
  },
  {
    label: "Learning",
    href: "/courses",
    children: [
      { label: "Courses", href: "/courses" },
      { label: "Internship", href: "/internship" },
      { label: "Talent Network", href: "/talent" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "How We Engage", href: "/engagement" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact", isCallToAction: true },
] as const satisfies readonly NavigationItem[];

export const services = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    seoTitle: "Custom Software Development Services | DevSectors",
    seoDescription:
      "Plan and build maintainable web software tailored to your workflows, users, integrations, and long-term operating needs.",
    shortDescription:
      "Purpose-built platforms that turn complex workflows into clear, maintainable software.",
    overview:
      "We shape custom systems around the work your team actually performs. The engagement covers product definition, interface design, engineering, integration, quality assurance, and a practical path into production.",
    capabilities: [
      "Business portals and operational dashboards",
      "SaaS products and multi-tenant applications",
      "Internal workflow and approval systems",
      "API design and third-party integrations",
      "Data migration and legacy application renewal",
      "Role-based access and administrative tooling",
    ],
    outcomes: [
      "A shared source of truth for important workflows",
      "Less repetitive work and fewer hand-off gaps",
      "Software that can evolve as requirements become clearer",
      "Documented architecture that a future team can maintain",
    ],
    process: [
      {
        step: 1,
        title: "Understand the operation",
        description:
          "Map users, decisions, data, exceptions, and existing tools before choosing a solution shape.",
      },
      {
        step: 2,
        title: "Define the product",
        description:
          "Turn the highest-value workflow into testable requirements, user journeys, and a delivery sequence.",
      },
      {
        step: 3,
        title: "Build in usable increments",
        description:
          "Design, implement, and review working slices so feedback arrives while change is still inexpensive.",
      },
      {
        step: 4,
        title: "Release and improve",
        description:
          "Prepare production, documentation, monitoring, and a prioritized improvement backlog.",
      },
    ],
    relatedIndustrySlugs: [
      "startups-saas",
      "logistics-operations",
      "healthcare-wellness",
      "education-training",
      "professional-services",
    ],
  },
  {
    slug: "web-experience-design",
    name: "Web Experience Design",
    seoTitle: "Web Design and Development Services | DevSectors",
    seoDescription:
      "Create fast, accessible, SEO-ready websites and web experiences with clear messaging, thoughtful UX, and maintainable frontend systems.",
    shortDescription:
      "Fast, accessible websites that explain your value clearly and guide visitors toward the next step.",
    overview:
      "A strong website aligns content, interaction, performance, and search visibility. We bring those decisions together in one process, from information architecture and wireframes to reusable components and launch preparation.",
    capabilities: [
      "B2B marketing websites and landing pages",
      "Information architecture and conversion journeys",
      "Responsive interface and interaction design",
      "Design systems and reusable frontend components",
      "Technical SEO and structured content planning",
      "Accessibility and performance-focused implementation",
    ],
    outcomes: [
      "A clearer story for prospective customers",
      "Consistent experiences across screen sizes",
      "A maintainable foundation for new pages and campaigns",
      "Better technical conditions for search discovery",
    ],
    process: [
      {
        step: 1,
        title: "Content and audience audit",
        description:
          "Clarify who the site serves, what they need to understand, and where the current journey loses momentum.",
      },
      {
        step: 2,
        title: "Structure and prototype",
        description:
          "Create the page hierarchy, conversion paths, wireframes, and content priorities before visual polish.",
      },
      {
        step: 3,
        title: "Design and build",
        description:
          "Develop an original visual system and responsive components with accessibility and performance in view.",
      },
      {
        step: 4,
        title: "Validate and launch",
        description:
          "Review content, devices, forms, metadata, analytics, and redirects before release.",
      },
    ],
    relatedIndustrySlugs: [
      "startups-saas",
      "retail-ecommerce",
      "healthcare-wellness",
      "education-training",
      "professional-services",
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    seoTitle: "Mobile App Design and Development | DevSectors",
    seoDescription:
      "Design and develop focused mobile applications for customer, workforce, and field-service experiences across modern devices.",
    shortDescription:
      "Focused mobile products for customers, field teams, and operations that need to move.",
    overview:
      "We approach mobile work as a product decision rather than a screen-replication exercise. The scope considers device context, intermittent connectivity, notifications, permissions, backend services, release operations, and the smallest experience worth maintaining.",
    capabilities: [
      "Cross-platform product development",
      "Customer and workforce mobile experiences",
      "Offline-aware workflows and data synchronization",
      "Push notifications and device capabilities",
      "Backend APIs and secure session flows",
      "App-store release preparation and maintenance planning",
    ],
    outcomes: [
      "A mobile experience designed around real usage context",
      "Consistent product behavior across supported devices",
      "A clear relationship between the app and its backend",
      "An achievable plan for releases and ongoing maintenance",
    ],
    process: [
      {
        step: 1,
        title: "Validate the mobile need",
        description:
          "Identify the device-specific value and decide which workflows truly benefit from an installed application.",
      },
      {
        step: 2,
        title: "Prototype critical journeys",
        description:
          "Test navigation, permissions, offline behavior, and high-frequency tasks before full implementation.",
      },
      {
        step: 3,
        title: "Build product and services",
        description:
          "Develop the application, APIs, data rules, and release environments as one connected system.",
      },
      {
        step: 4,
        title: "Test and prepare release",
        description:
          "Validate target devices, failure states, privacy expectations, and store submission requirements.",
      },
    ],
    relatedIndustrySlugs: [
      "startups-saas",
      "retail-ecommerce",
      "logistics-operations",
      "healthcare-wellness",
      "education-training",
    ],
  },
  {
    slug: "ai-workflow-automation",
    name: "AI and Workflow Automation",
    seoTitle: "AI and Business Workflow Automation | DevSectors",
    seoDescription:
      "Automate repeatable business workflows with practical integrations, clear controls, and human review where judgment still matters.",
    shortDescription:
      "Practical automation that removes busywork while keeping important decisions visible and controlled.",
    overview:
      "Automation is most useful when the workflow, source data, exceptions, and ownership are understood. We identify stable steps first, then combine rules, integrations, and AI-assisted tasks where each approach is appropriate.",
    capabilities: [
      "Workflow mapping and automation opportunity assessment",
      "System-to-system integrations and event-driven flows",
      "Document intake, classification, and extraction",
      "Knowledge search and assisted content workflows",
      "Human review queues and approval controls",
      "Automation monitoring, audit trails, and fallback paths",
    ],
    outcomes: [
      "Reduced time spent on repeatable coordination tasks",
      "Clearer ownership of exceptions and approvals",
      "More consistent movement of data between tools",
      "Automation boundaries that teams can understand and govern",
    ],
    process: [
      {
        step: 1,
        title: "Map the current workflow",
        description:
          "Document triggers, inputs, decisions, exceptions, and the cost of the existing process.",
      },
      {
        step: 2,
        title: "Select safe automation points",
        description:
          "Separate deterministic rules from judgment-heavy work and define where human review is required.",
      },
      {
        step: 3,
        title: "Pilot one complete path",
        description:
          "Connect a narrow end-to-end workflow, test real edge cases, and capture operational feedback.",
      },
      {
        step: 4,
        title: "Measure and expand",
        description:
          "Review quality, handling time, exceptions, and ownership before extending the automation footprint.",
      },
    ],
    relatedIndustrySlugs: [
      "retail-ecommerce",
      "logistics-operations",
      "healthcare-wellness",
      "education-training",
      "professional-services",
    ],
  },
  {
    slug: "cloud-devops-reliability",
    name: "Cloud, DevOps and Reliability",
    seoTitle: "Cloud, DevOps and Platform Reliability | DevSectors",
    seoDescription:
      "Improve release safety, cloud visibility, recovery readiness, and day-to-day reliability for modern web and software platforms.",
    shortDescription:
      "Clearer cloud operations, safer releases, and systems your team can understand under pressure.",
    overview:
      "Reliable systems come from repeatable delivery, observable behavior, controlled access, and rehearsed recovery. We help teams improve those foundations without introducing infrastructure complexity that exceeds the product's needs.",
    capabilities: [
      "Cloud architecture and environment reviews",
      "Continuous integration and deployment pipelines",
      "Infrastructure configuration and release automation",
      "Application monitoring, logs, and alert design",
      "Backup, recovery, and incident-readiness planning",
      "Performance and cloud-cost visibility",
    ],
    outcomes: [
      "More repeatable and reviewable releases",
      "Faster diagnosis when a production issue occurs",
      "Clearer recovery responsibilities and procedures",
      "Infrastructure choices aligned with the product stage",
    ],
    process: [
      {
        step: 1,
        title: "Establish the baseline",
        description:
          "Review environments, dependencies, deployment steps, access, monitoring, and known failure modes.",
      },
      {
        step: 2,
        title: "Prioritize operational risk",
        description:
          "Rank improvements by customer impact, likelihood, recovery difficulty, and team capacity.",
      },
      {
        step: 3,
        title: "Automate and document",
        description:
          "Implement the highest-value changes with versioned configuration and understandable runbooks.",
      },
      {
        step: 4,
        title: "Exercise the system",
        description:
          "Validate deployments, alerts, backups, and recovery paths rather than assuming the configuration works.",
      },
    ],
    relatedIndustrySlugs: [
      "startups-saas",
      "retail-ecommerce",
      "logistics-operations",
      "healthcare-wellness",
      "education-training",
      "professional-services",
    ],
  },
  {
    slug: "product-technology-consulting",
    name: "Product and Technology Consulting",
    seoTitle: "Product Strategy and Technology Consulting | DevSectors",
    seoDescription:
      "Turn an idea, operational bottleneck, or aging platform into a grounded product roadmap and technology decision plan.",
    shortDescription:
      "Independent product and technical guidance before your team commits to a costly build direction.",
    overview:
      "Not every problem needs new software, and not every idea is ready for implementation. We help teams clarify the decision, investigate constraints, compare options, and create an actionable path that engineering and business stakeholders can share.",
    capabilities: [
      "Product discovery and opportunity framing",
      "MVP definition and roadmap planning",
      "Architecture and codebase assessment",
      "Build, buy, integrate, or automate analysis",
      "Technical due diligence and delivery-risk review",
      "Vendor briefs and implementation planning",
    ],
    outcomes: [
      "A better-defined problem and decision boundary",
      "A prioritized roadmap tied to user and business needs",
      "Visible assumptions, risks, and technical dependencies",
      "A delivery brief that teams can estimate and execute",
    ],
    process: [
      {
        step: 1,
        title: "Frame the decision",
        description:
          "Agree on the business question, stakeholders, constraints, and evidence needed to move forward.",
      },
      {
        step: 2,
        title: "Investigate",
        description:
          "Review workflows, users, systems, data, and alternatives through focused research and technical analysis.",
      },
      {
        step: 3,
        title: "Compare options",
        description:
          "Make trade-offs explicit across value, cost, risk, maintainability, and organizational readiness.",
      },
      {
        step: 4,
        title: "Create the action plan",
        description:
          "Deliver recommendations, scope boundaries, sequencing, and next-step acceptance criteria.",
      },
    ],
    relatedIndustrySlugs: [
      "startups-saas",
      "retail-ecommerce",
      "logistics-operations",
      "healthcare-wellness",
      "education-training",
      "professional-services",
    ],
  },
] as const satisfies readonly Service[];

export const industries = [
  {
    slug: "startups-saas",
    name: "Startups and SaaS",
    seoTitle: "Software Product Development for Startups and SaaS | DevSectors",
    seoDescription:
      "Shape, validate, and build focused SaaS products with clear scope, maintainable foundations, and room to learn from real users.",
    shortDescription:
      "Focused product delivery for teams moving from an idea, prototype, or early platform toward dependable use.",
    commonChallenges: [
      "Choosing an MVP boundary that tests the business rather than only the technology",
      "Balancing delivery speed with a foundation that can be maintained",
      "Turning founder knowledge into shared product and engineering decisions",
      "Preparing onboarding, billing, permissions, and operations for real customers",
    ],
    solutionFocus: [
      "Discovery and product definition",
      "SaaS application architecture",
      "Onboarding and account workflows",
      "Release, observability, and iteration practices",
    ],
    relatedServiceSlugs: [
      "product-technology-consulting",
      "custom-software-development",
      "web-experience-design",
      "mobile-app-development",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail and eCommerce",
    seoTitle: "eCommerce and Retail Software Solutions | DevSectors",
    seoDescription:
      "Improve digital storefronts, product operations, integrations, and customer journeys with practical retail software solutions.",
    shortDescription:
      "Connected storefront and operational experiences built around catalog, order, and customer workflows.",
    commonChallenges: [
      "Keeping product, inventory, order, and customer data aligned",
      "Maintaining performance across image-rich catalog experiences",
      "Connecting commerce platforms with operational tools",
      "Reducing friction without obscuring policies or delivery expectations",
    ],
    solutionFocus: [
      "Storefront experience and performance",
      "Catalog and order integrations",
      "Operational dashboards and automation",
      "Customer self-service journeys",
    ],
    relatedServiceSlugs: [
      "web-experience-design",
      "custom-software-development",
      "mobile-app-development",
      "ai-workflow-automation",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "logistics-operations",
    name: "Logistics and Operations",
    seoTitle: "Logistics and Operations Software Development | DevSectors",
    seoDescription:
      "Design operational software for scheduling, field activity, hand-offs, tracking, and exception management across distributed teams.",
    shortDescription:
      "Operational tools that make assignments, status, exceptions, and accountability easier to see.",
    commonChallenges: [
      "Coordinating work across dispatch, field, and administrative teams",
      "Capturing timely status updates outside the office",
      "Managing exceptions that do not fit a standard workflow",
      "Replacing fragmented spreadsheets and message threads with shared context",
    ],
    solutionFocus: [
      "Scheduling and assignment workflows",
      "Field-friendly mobile experiences",
      "Status, exception, and evidence capture",
      "Operational reporting and system integrations",
    ],
    relatedServiceSlugs: [
      "custom-software-development",
      "mobile-app-development",
      "ai-workflow-automation",
      "cloud-devops-reliability",
      "product-technology-consulting",
    ],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare and Wellness",
    seoTitle: "Healthcare and Wellness Software Experiences | DevSectors",
    seoDescription:
      "Create considered healthcare and wellness software for administrative, scheduling, communication, and service-delivery workflows.",
    shortDescription:
      "Human-centered administrative and service experiences designed with privacy and operational context in view.",
    commonChallenges: [
      "Designing clear experiences for users with different levels of digital confidence",
      "Coordinating scheduling, communication, and administrative follow-up",
      "Handling sensitive information with project-appropriate controls",
      "Integrating new workflows without disrupting essential service delivery",
    ],
    solutionFocus: [
      "Accessible scheduling and intake experiences",
      "Administrative workflow tools",
      "Service communication and follow-up",
      "Project-specific privacy and access requirements",
    ],
    relatedServiceSlugs: [
      "custom-software-development",
      "web-experience-design",
      "mobile-app-development",
      "ai-workflow-automation",
      "product-technology-consulting",
    ],
  },
  {
    slug: "education-training",
    name: "Education and Training",
    seoTitle: "Education and Training Platform Development | DevSectors",
    seoDescription:
      "Build learning and training platforms that make enrollment, content, progress, communication, and administration easier to manage.",
    shortDescription:
      "Learning experiences and administrative tools that support participants, instructors, and program teams.",
    commonChallenges: [
      "Keeping enrollment, content, progress, and communication connected",
      "Supporting learners across devices and connectivity conditions",
      "Giving instructors useful visibility without excessive administration",
      "Adapting programs without rebuilding the platform each time",
    ],
    solutionFocus: [
      "Learning portals and participant dashboards",
      "Enrollment and cohort administration",
      "Progress and assessment workflows",
      "Content organization and communication tools",
    ],
    relatedServiceSlugs: [
      "custom-software-development",
      "web-experience-design",
      "mobile-app-development",
      "ai-workflow-automation",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    seoTitle: "Digital Solutions for Professional Service Firms | DevSectors",
    seoDescription:
      "Improve lead, client, document, approval, and delivery workflows with well-structured websites and internal software.",
    shortDescription:
      "Clear digital journeys and internal workflows for expertise-led businesses serving complex client needs.",
    commonChallenges: [
      "Explaining specialist value to prospective clients",
      "Coordinating documents, approvals, and delivery milestones",
      "Turning expert knowledge into a repeatable client experience",
      "Connecting relationship management with day-to-day service work",
    ],
    solutionFocus: [
      "Authority-building websites and content architecture",
      "Client portals and document workflows",
      "Intake, approval, and hand-off automation",
      "Operational reporting and knowledge access",
    ],
    relatedServiceSlugs: [
      "web-experience-design",
      "custom-software-development",
      "ai-workflow-automation",
      "product-technology-consulting",
      "cloud-devops-reliability",
    ],
  },
] as const satisfies readonly Industry[];

const representativeDisclosure =
  "This is a representative, anonymized scenario that illustrates DevSectors' approach. It is not presented as a named client case study, and it contains no claimed performance metrics.";

export const workItems = [
  {
    slug: "distributed-field-operations-platform",
    kind: "representative",
    representativeLabel: "Representative engagement",
    disclosure: representativeDisclosure,
    title: "A clearer operating system for distributed field work",
    industrySlug: "logistics-operations",
    seoTitle: "Representative Field Operations Software Engagement",
    seoDescription:
      "See a representative approach to planning a field operations platform for assignments, status updates, evidence, and exceptions.",
    summary:
      "A representative platform concept for a service business coordinating office staff and teams working across changing locations.",
    scenario:
      "Assignments live in spreadsheets, updates arrive through calls and messages, and administrators spend time reconstructing what happened. The proposed product needs to improve visibility without slowing field teams down.",
    approach: [
      "Map assignment, arrival, completion, evidence, and exception journeys",
      "Prototype a low-friction mobile flow for frequent field actions",
      "Define an operations dashboard around decisions rather than raw activity",
      "Introduce notifications and escalation rules in controlled stages",
    ],
    deliverables: [
      "Role-based operations web application",
      "Field-focused mobile experience",
      "Assignment and status API",
      "Exception queues and audit history",
      "Deployment and operational runbook",
    ],
    intendedValue: [
      "Shared visibility across office and field teams",
      "Less manual reconstruction of job status",
      "A more consistent path for handling exceptions",
    ],
    relatedServiceSlugs: [
      "product-technology-consulting",
      "custom-software-development",
      "mobile-app-development",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "saas-onboarding-workspace",
    kind: "representative",
    representativeLabel: "Representative engagement",
    disclosure: representativeDisclosure,
    title: "From product sign-up to a confident first outcome",
    industrySlug: "startups-saas",
    seoTitle: "Representative SaaS Onboarding Product Engagement",
    seoDescription:
      "Explore a representative SaaS onboarding engagement covering product structure, permissions, guidance, and operational readiness.",
    summary:
      "A representative redesign and build plan for a young B2B SaaS product whose capabilities have outgrown its onboarding journey.",
    scenario:
      "New users can create an account but struggle to understand setup order, invite colleagues, and reach the product's first useful result. Support conversations are carrying knowledge that the interface should provide.",
    approach: [
      "Define the first-value journey for each account role",
      "Sequence setup tasks around dependencies and user confidence",
      "Create reusable empty states, guidance, and recovery patterns",
      "Add product events that help the team observe onboarding friction",
    ],
    deliverables: [
      "Onboarding journey and product requirements",
      "Responsive workspace interface",
      "Account, invitation, and permission workflows",
      "Guidance and lifecycle messaging rules",
      "Product analytics event plan",
    ],
    intendedValue: [
      "A clearer route from account creation to useful work",
      "More consistent guidance for different account roles",
      "Better evidence for future onboarding decisions",
    ],
    relatedServiceSlugs: [
      "product-technology-consulting",
      "web-experience-design",
      "custom-software-development",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "connected-commerce-operations",
    kind: "representative",
    representativeLabel: "Representative engagement",
    disclosure: representativeDisclosure,
    title: "Connecting the storefront with daily commerce operations",
    industrySlug: "retail-ecommerce",
    seoTitle: "Representative eCommerce Modernization Engagement",
    seoDescription:
      "Review a representative eCommerce modernization approach for storefront performance, catalog data, orders, and support workflows.",
    summary:
      "A representative modernization path for a retailer whose storefront and back-office processes have evolved separately.",
    scenario:
      "Customers need a faster, clearer buying journey, while the operations team needs product and order data to move reliably between systems. A full platform replacement would create unnecessary disruption.",
    approach: [
      "Audit the customer journey and the operational data path together",
      "Prioritize high-impact storefront and integration constraints",
      "Introduce a stable integration layer around existing systems",
      "Release changes in sections that can be validated independently",
    ],
    deliverables: [
      "Responsive storefront component system",
      "Catalog and order integration services",
      "Operational exception dashboard",
      "Performance and technical SEO baseline",
      "Phased migration plan",
    ],
    intendedValue: [
      "A more coherent journey from product discovery to order support",
      "Clearer ownership when commerce data does not synchronize",
      "Modernization without an all-at-once replacement",
    ],
    relatedServiceSlugs: [
      "web-experience-design",
      "custom-software-development",
      "ai-workflow-automation",
      "cloud-devops-reliability",
    ],
  },
  {
    slug: "cohort-learning-operations-portal",
    kind: "representative",
    representativeLabel: "Representative engagement",
    disclosure: representativeDisclosure,
    title: "One workspace for learners, instructors, and program operations",
    industrySlug: "education-training",
    seoTitle: "Representative Learning Operations Platform Engagement",
    seoDescription:
      "See a representative learning platform approach for enrollment, cohorts, content, progress, and instructor administration.",
    summary:
      "A representative portal concept for a training provider managing recurring cohorts with disconnected enrollment and progress records.",
    scenario:
      "Learners receive content through several channels, instructors maintain separate progress sheets, and program staff repeat the same communication for every cohort. The goal is a simpler shared workflow, not a feature-heavy generic LMS.",
    approach: [
      "Map the cohort lifecycle from enquiry through completion",
      "Separate learner, instructor, and administrator decisions",
      "Design reusable program templates with controlled flexibility",
      "Build communication and progress views around timely action",
    ],
    deliverables: [
      "Enrollment and cohort administration portal",
      "Learner workspace and content structure",
      "Instructor progress and follow-up views",
      "Notification and reminder rules",
      "Program reporting model",
    ],
    intendedValue: [
      "A shared view of each learner and cohort",
      "Less repeated coordination for program staff",
      "A clearer experience for participants and instructors",
    ],
    relatedServiceSlugs: [
      "product-technology-consulting",
      "web-experience-design",
      "custom-software-development",
      "ai-workflow-automation",
    ],
  },
] as const satisfies readonly RepresentativeWorkItem[];

export const insights = [
  {
    slug: "plan-custom-software-mvp-without-forcing-a-rewrite",
    title: "How to plan a custom software MVP without forcing an early rewrite",
    seoTitle: "How to Plan a Custom Software MVP | DevSectors",
    seoDescription:
      "Learn how to define a useful custom software MVP, protect the critical architecture, and create evidence for the next product decision.",
    excerpt:
      "A useful MVP is not the smallest pile of features. It is the smallest complete workflow that can produce trustworthy learning.",
    category: "Product Strategy",
    readingMinutes: 8,
    keyTakeaways: [
      "Start with a decision the MVP must inform, not a feature inventory.",
      "Protect data, permissions, and integration boundaries before polishing secondary features.",
      "Plan how the team will observe use and decide what happens after release.",
    ],
    sections: [
      {
        id: "define-the-decision",
        heading: "Begin with the decision, not the backlog",
        paragraphs: [
          "Teams often call the first release an MVP after trimming a larger feature list. That creates a smaller build, but it does not guarantee useful learning. A better starting point is the decision the release must help the business make: whether a workflow is valuable, whether a user group will adopt it, or whether an operational model is practical.",
          "Write the decision in plain language and list the evidence that would change your mind. This immediately separates essential product behavior from ideas that can wait. It also gives design, engineering, and business stakeholders the same definition of progress.",
        ],
        bullets: [
          "Which user and recurring problem are in scope?",
          "What behavior would indicate that the workflow is useful?",
          "What result would cause the team to stop, change direction, or invest further?",
        ],
      },
      {
        id: "smallest-complete-workflow",
        heading: "Choose the smallest complete workflow",
        paragraphs: [
          "A collection of disconnected screens is difficult to evaluate. Select one journey that begins with a real trigger and ends with a meaningful outcome. Include the awkward middle: validation, permissions, exceptions, and the administrative work required to keep the experience operating.",
          "This vertical slice may look narrower than a conventional roadmap, but it exposes more useful risk. The team learns whether the full service works, not only whether a user can click through an ideal path.",
        ],
        bullets: [
          "Include the user-facing action and the operational follow-up.",
          "Define what happens when data is missing or an integration is unavailable.",
          "Keep optional roles, reports, and customization outside the first boundary.",
        ],
      },
      {
        id: "architecture-runway",
        heading: "Protect the architecture that is expensive to reverse",
        paragraphs: [
          "An MVP does not need an enterprise architecture, but a few decisions deserve care because they shape every later feature. Data ownership, account boundaries, authorization, integration contracts, and deployment environments are costly to untangle when they are implicit.",
          "Document those boundaries briefly and build the simplest version that preserves them. In contrast, defer abstraction, infrastructure scale, and customization that the product has not yet earned. The aim is not future-proofing; it is avoiding preventable traps while keeping change affordable.",
        ],
      },
      {
        id: "feedback-system",
        heading: "Design the feedback system with the product",
        paragraphs: [
          "A release cannot create evidence if the team cannot see what happened. Define a small set of product events, operational observations, and user conversations before launch. Numbers reveal patterns, while direct feedback explains the context behind them.",
          "Assign an owner and review rhythm for each signal. Otherwise analytics becomes a dashboard that everyone can access and nobody uses. The feedback plan should end with a scheduled decision, not an indefinite period of watching.",
        ],
        bullets: [
          "Capture completion and abandonment at meaningful workflow stages.",
          "Record recurring support questions and manual interventions.",
          "Review evidence against the original product decision at an agreed date.",
        ],
      },
      {
        id: "rewrite-question",
        heading: "Make the rewrite question explicit",
        paragraphs: [
          "Some MVP code will change, but a rewrite should be a decision rather than a surprise. At the end of the first release, evaluate whether the core model still represents the business, whether the chosen platform supports the observed workflow, and whether delivery friction comes from temporary shortcuts or a structural mismatch.",
          "When the architecture still fits, improve it incrementally. When evidence invalidates a foundational assumption, replacing a contained part may be sensible. This is different from planning a disposable system from the beginning, which often creates operational debt before the team has learned anything useful.",
        ],
      },
    ],
  },
  {
    slug: "b2b-website-redesign-brief-that-improves-decisions",
    title: "A B2B website redesign brief that leads to better decisions",
    seoTitle: "How to Write a B2B Website Redesign Brief | DevSectors",
    seoDescription:
      "Create a practical B2B website redesign brief covering audience, content, proof, conversion journeys, SEO, performance, and governance.",
    excerpt:
      "A redesign brief should describe the business decision and visitor journey—not prescribe a new coat of paint.",
    category: "Web Experience",
    readingMinutes: 7,
    keyTakeaways: [
      "Define audiences by the questions they must answer, not only by job title.",
      "Inventory proof and content ownership before designing pages.",
      "Treat performance, accessibility, SEO, and measurement as requirements from the start.",
    ],
    sections: [
      {
        id: "business-context",
        heading: "Explain why the site must change now",
        paragraphs: [
          "A useful brief starts with business context. Describe the change that made the current site insufficient: a new market, a more focused offer, a longer sales cycle, weak lead quality, difficult content maintenance, or a product that the old structure cannot explain.",
          "Avoid leading with visual preferences. Design direction matters later, but the team first needs to understand the decision the website should improve. This gives every page and component a reason to exist.",
        ],
        bullets: [
          "What has changed in the business or audience?",
          "Which commercial or communication problem should improve?",
          "What must remain stable during migration?",
        ],
      },
      {
        id: "audience-questions",
        heading: "Describe audiences through their questions",
        paragraphs: [
          "Job titles alone do not reveal what a visitor needs. For each priority audience, document their situation, what they already know, their main concern, the evidence they trust, and the next action they can realistically take.",
          "This question-based view helps teams avoid generic pages that try to persuade everyone at once. It also reveals when one audience needs a dedicated journey, such as a service buyer, implementation partner, applicant, or existing customer.",
        ],
      },
      {
        id: "content-and-proof",
        heading: "Inventory content and proof before layout",
        paragraphs: [
          "Many redesigns stall because layouts are approved before the organization knows what it can truthfully say. List existing pages, useful material, outdated claims, evidence that can be published, and gaps that require interviews or subject-matter review.",
          "Proof should be specific and verifiable. If client names or metrics cannot be disclosed, use process artifacts, representative examples with clear labeling, technical detail, or direct explanations of how decisions are made. Never turn anonymity into invented precision.",
        ],
        bullets: [
          "Assign an owner and approver to every high-value page.",
          "Identify claims that require evidence or legal review.",
          "Plan original visuals instead of treating stock photography as proof.",
        ],
      },
      {
        id: "experience-requirements",
        heading: "Set experience requirements before visual design",
        paragraphs: [
          "The brief should state the journeys the site must support and the quality bar for those journeys. Include navigation expectations, forms, mobile behavior, content editing, accessibility, performance budgets, search metadata, analytics, and integrations.",
          "These requirements shape the information architecture and component system. Adding them after design usually creates compromise: oversized imagery, unclear focus states, fragile page templates, or tracking that cannot answer the original business question.",
        ],
      },
      {
        id: "success-and-governance",
        heading: "Define success and post-launch ownership",
        paragraphs: [
          "Choose measures that match the site's purpose, such as qualified enquiries, completion of a priority journey, search visibility for relevant topics, or fewer content-maintenance bottlenecks. A traffic increase by itself may not indicate a better website.",
          "Name the people responsible for content quality, technical maintenance, analytics review, and future releases. A website is an operating product. The redesign is complete only when the organization knows how it will keep the experience accurate and useful.",
        ],
      },
    ],
  },
  {
    slug: "when-to-automate-a-business-workflow",
    title: "When to automate a business workflow—and when to simplify it first",
    seoTitle: "When Should You Automate a Business Workflow? | DevSectors",
    seoDescription:
      "Use a practical framework to identify automation-ready workflows, separate rules from judgment, and reduce risk before connecting systems.",
    excerpt:
      "Automation amplifies the process you give it. Make the work understandable before making it faster.",
    category: "Automation",
    readingMinutes: 8,
    keyTakeaways: [
      "Stabilize ownership and decision rules before automating hand-offs.",
      "Use deterministic automation for rules and controlled assistance for judgment-heavy work.",
      "Pilot a complete narrow workflow with visible exceptions and rollback paths.",
    ],
    sections: [
      {
        id: "automation-readiness",
        heading: "Look for repetition with stable meaning",
        paragraphs: [
          "Volume alone does not make a workflow ready for automation. A good candidate repeats often enough to matter, has recognizable inputs and outcomes, and follows rules that the team can explain. The people doing the work should broadly agree on what a correct result looks like.",
          "If every case requires a new interpretation, the first improvement may be clearer policy, better data capture, or a simpler service design. Automating an unresolved process tends to hide disagreement inside code and move the confusion downstream.",
        ],
        bullets: [
          "The trigger and owner are identifiable.",
          "Most normal cases follow an explainable path.",
          "Exceptions can be named and routed rather than ignored.",
        ],
      },
      {
        id: "map-current-work",
        heading: "Map the work at decision level",
        paragraphs: [
          "Document what causes the workflow to start, which data is required, where people make decisions, how systems are updated, and what closes the loop. Pay particular attention to rework: missing fields, duplicated entry, status chasing, and approvals that arrive without context.",
          "A useful map distinguishes a required control from a habit created by an old tool. This prevents the automated version from preserving steps that no longer protect the customer or the business.",
        ],
      },
      {
        id: "rules-versus-judgment",
        heading: "Separate rules, assistance, and judgment",
        paragraphs: [
          "Deterministic rules are appropriate when the same input should reliably produce the same action. AI-assisted steps can help summarize, classify, extract, or draft when variation is expected, but their output needs a defined quality threshold and review path. High-impact judgment should remain visible to an accountable person.",
          "Do not describe an AI feature only by the model it uses. Define the job, acceptable error, sensitive data boundary, reviewer, fallback, and how the team will detect quality drift.",
        ],
        bullets: [
          "Automate stable routing and validation rules directly.",
          "Use assistance where a person can efficiently verify the result.",
          "Keep consequential approvals attributable and reversible.",
        ],
      },
      {
        id: "integration-readiness",
        heading: "Check data and integration readiness",
        paragraphs: [
          "An automation depends on the systems around it. Confirm that source fields are consistently populated, identifiers match across tools, APIs or export paths are available, and someone owns each system when a connection fails.",
          "Where the data foundation is weak, a short cleanup or capture redesign may create more value than an elaborate workflow engine. Build monitoring and an exception queue into the first release so failures become visible work rather than silent data loss.",
        ],
      },
      {
        id: "pilot-and-expand",
        heading: "Pilot one narrow path and earn expansion",
        paragraphs: [
          "Choose a bounded workflow with enough volume to observe and low enough risk to recover manually. Measure handling time, correction rate, exceptions, and the burden placed on reviewers. Interview the people upstream and downstream, not only the automation sponsor.",
          "Expand when the pilot improves the whole service, including exception handling. If it merely moves work to a hidden review queue, revisit the process. Sustainable automation reduces coordination while keeping responsibility clear.",
        ],
      },
    ],
  },
  {
    slug: "cloud-reliability-checklist-for-growing-web-apps",
    title: "A practical cloud reliability checklist for growing web applications",
    seoTitle: "Cloud Reliability Checklist for Web Applications | DevSectors",
    seoDescription:
      "Review deployment safety, monitoring, backups, access, recovery, and operating routines for a growing production web application.",
    excerpt:
      "Reliability is less about owning every tool and more about knowing how the system behaves, fails, and recovers.",
    category: "Cloud and DevOps",
    readingMinutes: 9,
    keyTakeaways: [
      "Make deployments repeatable before making infrastructure elaborate.",
      "Monitor customer-impacting behavior and give every alert an owner.",
      "Test backups and recovery procedures; configuration alone is not evidence.",
    ],
    sections: [
      {
        id: "operational-baseline",
        heading: "Write down the operational baseline",
        paragraphs: [
          "Begin with a simple system map: applications, data stores, queues, scheduled work, third-party dependencies, environments, domains, and the people who can change each part. Record how a release reaches production and which manual steps are easy to forget.",
          "This baseline is not architecture theatre. It gives the team a shared model during an incident and reveals single-person knowledge, unmanaged credentials, and services that have no clear owner.",
        ],
        bullets: [
          "Keep production configuration and dependencies discoverable.",
          "Identify data that cannot be recreated from another source.",
          "Document third-party failure behavior and contact paths.",
        ],
      },
      {
        id: "release-safety",
        heading: "Make releases boring and reversible",
        paragraphs: [
          "A reliable release process produces the same artifact from reviewed source, runs automated checks, applies configuration predictably, and records what changed. Separate environments should be similar enough that testing provides useful evidence.",
          "Every team also needs a recovery choice. That may be a rollback, a forward fix, or a feature control that limits exposure. The correct mechanism depends on data changes and architecture, but the decision should be made before the release is under pressure.",
        ],
      },
      {
        id: "observable-behavior",
        heading: "Observe behavior that customers can feel",
        paragraphs: [
          "Infrastructure metrics are useful, but they do not always reveal whether a customer can sign in, complete a transaction, or receive an expected update. Combine application logs and service metrics with a small number of checks that represent critical user journeys.",
          "An alert should indicate a condition that needs action, link to useful context, and reach someone able to respond. Alerts without owners or response guidance teach teams to ignore the monitoring system.",
        ],
        bullets: [
          "Use consistent request and job identifiers across services.",
          "Protect logs from sensitive data that is not needed for diagnosis.",
          "Review noisy alerts and missing signals after every incident.",
        ],
      },
      {
        id: "backup-and-recovery",
        heading: "Test recovery, not only backup creation",
        paragraphs: [
          "A successful backup job proves that data was written somewhere. It does not prove that the team can restore the right data within a useful period. Define which systems need backups, how much data loss is tolerable, how long recovery can take, and who is authorized to perform it.",
          "Schedule restore exercises and record what was confusing or slow. Include configuration, encryption keys, file storage, and external dependencies in the recovery plan—not only the primary database.",
        ],
      },
      {
        id: "operating-rhythm",
        heading: "Create a lightweight reliability rhythm",
        paragraphs: [
          "Reliability improves through regular maintenance rather than occasional infrastructure projects. Review access, dependency updates, cloud cost changes, backup evidence, alert quality, and recent incidents on a cadence the team can sustain.",
          "Prioritize work by customer impact and recovery difficulty. A growing application rarely needs every platform feature, but it does need repeatable releases, visible failures, controlled access, and a recovery path that people have practiced.",
        ],
      },
    ],
  },
] as const satisfies readonly InsightArticle[];

export const courses = [
  {
    slug: "modern-frontend-foundations",
    title: "Modern Frontend Foundations",
    seoTitle: "Modern Frontend Development Course | DevSectors",
    seoDescription:
      "Build practical HTML, CSS, JavaScript, TypeScript, and React foundations through guided exercises and a responsive web project.",
    shortDescription:
      "Learn how accessible interfaces move from semantic HTML and responsive CSS into maintainable React components.",
    audience:
      "Learners who understand basic computer use and want a structured route into modern frontend development.",
    level: "Beginner",
    duration: "8 weeks",
    delivery: "Instructor-led sessions with guided practice",
    availabilityNotice: "Ask about the next planned cohort and confirmed schedule.",
    modules: [
      "Semantic HTML and accessible page structure",
      "Responsive CSS, layout, and design tokens",
      "JavaScript fundamentals and browser behavior",
      "TypeScript for safer application code",
      "React components, state, and data flow",
      "Project review, testing basics, and deployment",
    ],
    learningOutcomes: [
      "Build a responsive multi-page interface from a structured brief",
      "Use semantic and accessible patterns for common interactions",
      "Create typed React components with clear responsibilities",
      "Explain and review the decisions made in a frontend project",
    ],
    prerequisites: ["No professional coding experience required", "Regular access to a laptop and internet connection"],
  },
  {
    slug: "full-stack-web-applications",
    title: "Full-Stack Web Applications",
    seoTitle: "Full-Stack Web Application Course | DevSectors",
    seoDescription:
      "Learn how a typed web application connects user interfaces, server logic, databases, authentication, testing, and deployment.",
    shortDescription:
      "Build a complete web application while learning how product, frontend, backend, data, and release decisions connect.",
    audience:
      "Developers with frontend fundamentals who want to understand and build a complete web application.",
    level: "Intermediate",
    duration: "10 weeks",
    delivery: "Instructor-led workshops, labs, and project reviews",
    availabilityNotice: "Ask about the next planned cohort and confirmed schedule.",
    modules: [
      "Application architecture and product requirements",
      "Server routes, validation, and error handling",
      "Relational data modeling and queries",
      "Authentication, authorization, and secure defaults",
      "API integration and asynchronous workflows",
      "Testing, deployment, monitoring, and handover",
    ],
    learningOutcomes: [
      "Model and implement one complete business workflow",
      "Build typed boundaries between interface, server, and database",
      "Handle validation, permissions, and failure states explicitly",
      "Deploy and document an application for ongoing maintenance",
    ],
    prerequisites: [
      "Comfort with HTML, CSS, and JavaScript fundamentals",
      "Basic familiarity with Git and command-line workflows",
    ],
  },
  {
    slug: "ui-ux-digital-products",
    title: "UI/UX for Digital Products",
    seoTitle: "UI/UX Design for Digital Products Course | DevSectors",
    seoDescription:
      "Learn practical product design through research, journey mapping, wireframes, accessible interface systems, and prototype critique.",
    shortDescription:
      "Turn user and business context into clear journeys, accessible interfaces, and prototypes that support better decisions.",
    audience:
      "Aspiring designers, developers, and product contributors who want a practical foundation in digital product design.",
    level: "Beginner to intermediate",
    duration: "6 weeks",
    delivery: "Studio-style sessions with critique and guided project work",
    availabilityNotice: "Ask about the next planned cohort and confirmed schedule.",
    modules: [
      "Problem framing and lightweight user research",
      "Task flows, information architecture, and journey mapping",
      "Wireframes and interaction states",
      "Typography, color, spacing, and visual hierarchy",
      "Accessible components and responsive systems",
      "Prototyping, critique, and developer handoff",
    ],
    learningOutcomes: [
      "Frame a product problem without jumping directly to screens",
      "Design and explain a coherent end-to-end user journey",
      "Create reusable interface patterns with accessibility in view",
      "Present a prototype and respond constructively to critique",
    ],
    prerequisites: ["No professional design experience required", "Access to a modern design or prototyping tool"],
  },
  {
    slug: "cloud-devops-fundamentals",
    title: "Cloud and DevOps Fundamentals",
    seoTitle: "Cloud and DevOps Fundamentals Course | DevSectors",
    seoDescription:
      "Understand cloud application delivery through Linux basics, containers, CI/CD, monitoring, access, backups, and recovery practice.",
    shortDescription:
      "Learn the operating foundations behind repeatable releases and observable web applications.",
    audience:
      "Developers and technical learners who can build a basic web application and want to operate one more confidently.",
    level: "Intermediate",
    duration: "8 weeks",
    delivery: "Instructor-led labs with a small deployment project",
    availabilityNotice: "Ask about the next planned cohort and confirmed schedule.",
    modules: [
      "Linux, networking, and cloud service fundamentals",
      "Containers and application configuration",
      "Continuous integration and delivery pipelines",
      "Secrets, identity, and access basics",
      "Logs, metrics, alerts, and operational diagnosis",
      "Backups, recovery exercises, and release documentation",
    ],
    learningOutcomes: [
      "Package and configure a small web application consistently",
      "Create a basic automated build and deployment workflow",
      "Add useful logging, health checks, and monitoring signals",
      "Document and exercise a simple recovery path",
    ],
    prerequisites: [
      "Basic programming and web application knowledge",
      "Comfort using a terminal and version control",
    ],
  },
] as const satisfies readonly Course[];

export const engagementModels = [
  {
    slug: "discovery-and-definition",
    name: "Discovery and Definition",
    summary:
      "A focused engagement that turns an idea, bottleneck, or uncertain technology decision into an evidence-based delivery brief.",
    bestFor:
      "Teams that know change is needed but are not ready to estimate or commission a responsible build.",
    howItWorks:
      "We investigate the workflow and users, compare practical options, surface assumptions, and define a prioritized path with clear boundaries.",
    includes: [
      "Stakeholder and workflow discovery",
      "User journeys and problem framing",
      "Solution options and trade-off analysis",
      "Scope, risks, architecture direction, and delivery sequence",
    ],
    clientInputs: [
      "Access to relevant stakeholders and current process material",
      "Timely review of findings and open decisions",
      "Clear ownership for commercial and operational priorities",
    ],
    commercialApproach:
      "Defined scope and fee based on the questions, systems, and stakeholders included in discovery.",
  },
  {
    slug: "focused-product-delivery",
    name: "Focused Product Delivery",
    summary:
      "A bounded design-and-build engagement for a clearly defined product release, platform improvement, or website outcome.",
    bestFor:
      "Teams with an agreed problem and decision-maker who want one accountable path from definition through release.",
    howItWorks:
      "We plan the release, work in reviewable increments, test critical journeys, and prepare the product and team for operation after launch.",
    includes: [
      "Delivery plan and acceptance criteria",
      "UX, interface, and technical implementation",
      "Quality assurance and stakeholder reviews",
      "Launch preparation, documentation, and handover",
    ],
    clientInputs: [
      "A product owner able to make timely scope decisions",
      "Access to users, systems, content, and brand inputs",
      "Review participation at agreed checkpoints",
    ],
    commercialApproach:
      "A phased proposal tied to an agreed scope; material changes are evaluated openly before they enter delivery.",
  },
  {
    slug: "continuous-product-partnership",
    name: "Continuous Product Partnership",
    summary:
      "Ongoing capacity for teams that need regular product improvements, engineering support, and operational care after the first release.",
    bestFor:
      "Organizations with a live product and a prioritized stream of meaningful work rather than a single fixed endpoint.",
    howItWorks:
      "A shared backlog, regular planning rhythm, visible delivery, and operational review keep effort focused on the highest-value next change.",
    includes: [
      "Product and technical planning cadence",
      "Design, engineering, testing, and releases",
      "Reliability, maintenance, and dependency work",
      "Documentation and periodic roadmap review",
    ],
    clientInputs: [
      "A maintained priority order and available product owner",
      "Access to product feedback and operational evidence",
      "Agreement on response expectations and out-of-scope support",
    ],
    commercialApproach:
      "Reserved recurring capacity with scope, cadence, and service expectations documented for the partnership.",
  },
] as const satisfies readonly EngagementModel[];

export const faqs = [
  {
    id: "project-start",
    category: "Delivery",
    question: "How does a software or website project begin?",
    answer:
      "We begin by clarifying the business problem, users, current workflow, constraints, and the decision the project must support. If the scope is still uncertain, a discovery engagement comes before a build proposal so assumptions are visible rather than hidden inside an estimate.",
  },
  {
    id: "project-estimate",
    category: "Delivery",
    question: "Can DevSectors provide a fixed price immediately?",
    answer:
      "A responsible estimate needs a defined outcome, scope boundary, dependencies, and review process. We can price a well-understood phase or recommend a short discovery first. We do not publish generic prices for custom work because two projects with similar page or feature counts can carry very different integration and operational risks.",
  },
  {
    id: "existing-product",
    category: "Services",
    question: "Can you improve an existing product instead of rebuilding it?",
    answer:
      "Yes. We first assess the current product, code, data, user pain points, and release process. The result may be focused improvement, gradual modernization, replacement of one constrained area, or a rebuild only when evidence shows the existing foundation cannot support the required direction.",
  },
  {
    id: "technology-selection",
    category: "Services",
    question: "Which technology stack do you use?",
    answer:
      "We favor well-supported web and cloud technologies, but the specific choice follows the product's users, integrations, team skills, operating environment, and maintenance needs. The proposal documents important technology choices and trade-offs before implementation begins.",
  },
  {
    id: "security-privacy",
    category: "Services",
    question: "How are security and privacy handled?",
    answer:
      "Security and privacy requirements are identified during discovery and reflected in data handling, access, architecture, testing, deployment, and operational documentation. Regulatory or certification requirements must be confirmed for the specific project; the website does not claim blanket compliance for every solution.",
  },
  {
    id: "ownership-handover",
    category: "Delivery",
    question: "What happens after launch?",
    answer:
      "The agreed handover can include source access, deployment guidance, system documentation, known limitations, and a prioritized improvement backlog. Ongoing support can be scoped separately. Ownership, licensing, infrastructure accounts, and responsibilities are documented in the proposal and contract before work begins.",
  },
  {
    id: "location-remote",
    category: "Company",
    question: "Where is DevSectors based, and can projects be delivered remotely?",
    answer:
      "The listed contact location is Housing Society, Bahawalpur, Pakistan. Project communication and delivery can be organized remotely when the engagement, time-zone overlap, and access requirements are suitable. Contact details should be confirmed before an in-person visit.",
  },
  {
    id: "representative-work",
    category: "Company",
    question: "Are the work examples named client case studies?",
    answer:
      "No. The current work examples are clearly labeled representative, anonymized scenarios designed to explain our approach. They do not claim named clients, delivered results, or performance metrics. Verified case studies should replace or supplement them only with client permission and supporting evidence.",
  },
  {
    id: "course-enrollment",
    category: "Learning",
    question: "When do courses begin, and how do I enroll?",
    answer:
      "Course pages describe the intended curriculum and format. Cohort dates, fees, seats, instructors, and delivery arrangements must be confirmed directly before enrollment. Submitting an enquiry does not itself reserve a place.",
  },
  {
    id: "internship-availability",
    category: "Learning",
    question: "Is the three-month internship always open?",
    answer:
      "No. The timeline describes the intended structure of a three-month internship when a cohort is active. Application windows, capacity, selection criteria, schedule, compensation if any, and placement expectations must be stated for each confirmed cohort.",
  },
  {
    id: "talent-network",
    category: "Company",
    question: "Are talent-network roles current vacancies?",
    answer:
      "Not necessarily. Talent-network profiles describe capabilities DevSectors may need for future projects. Joining the network is an expression of interest, not a job offer or promise of work. Any active vacancy or contract opportunity should have its own confirmed scope and terms.",
  },
] as const satisfies readonly FaqItem[];

const talentNetworkNotice =
  "Talent network profile only — this is not a current vacancy or a promise of employment or contract work.";

export const talentRoles = [
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    discipline: "Web Engineering",
    seniority: "Mid-level or senior",
    location: "Location and work mode discussed per opportunity",
    availability: "talent-network",
    notice: talentNetworkNotice,
    summary:
      "Engineers who can turn structured product and design decisions into accessible, performant, and maintainable web interfaces.",
    responsibilities: [
      "Build typed, responsive component systems",
      "Implement complete journeys, including loading and failure states",
      "Collaborate on accessibility, performance, testing, and review",
      "Document decisions that affect future maintenance",
    ],
    skills: ["TypeScript", "React or Next.js", "HTML and CSS", "Accessibility", "Frontend testing"],
  },
  {
    slug: "backend-full-stack-engineer",
    title: "Backend or Full-Stack Engineer",
    discipline: "Software Engineering",
    seniority: "Mid-level or senior",
    location: "Location and work mode discussed per opportunity",
    availability: "talent-network",
    notice: talentNetworkNotice,
    summary:
      "Engineers who model business workflows carefully and build understandable APIs, data boundaries, integrations, and operational tools.",
    responsibilities: [
      "Translate workflow rules into maintainable application behavior",
      "Design APIs, data models, validation, and authorization",
      "Integrate external systems with visible error handling",
      "Contribute to testing, deployment, and production diagnosis",
    ],
    skills: ["TypeScript or Python", "API design", "SQL", "Authentication and authorization", "Automated testing"],
  },
  {
    slug: "mobile-product-engineer",
    title: "Mobile Product Engineer",
    discipline: "Mobile Engineering",
    seniority: "Mid-level or senior",
    location: "Location and work mode discussed per opportunity",
    availability: "talent-network",
    notice: talentNetworkNotice,
    summary:
      "Engineers who design for real device context and can connect reliable mobile journeys with secure backend services.",
    responsibilities: [
      "Build responsive cross-platform mobile experiences",
      "Handle device permissions, offline states, and synchronization",
      "Test critical flows across supported devices",
      "Prepare releases and maintain clear operational notes",
    ],
    skills: ["React Native or comparable framework", "TypeScript", "Mobile UX", "API integration", "Release workflows"],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    discipline: "Product and Experience Design",
    seniority: "Mid-level or senior",
    location: "Location and work mode discussed per opportunity",
    availability: "talent-network",
    notice: talentNetworkNotice,
    summary:
      "Designers who can investigate a workflow, simplify the decision path, and produce accessible systems rather than isolated screens.",
    responsibilities: [
      "Frame user and operational problems with the delivery team",
      "Create journeys, wireframes, prototypes, and interaction states",
      "Build or extend coherent design systems",
      "Participate in critique, implementation review, and user feedback",
    ],
    skills: ["Product discovery", "Interaction design", "Responsive UI", "Accessibility", "Design systems"],
  },
  {
    slug: "quality-reliability-engineer",
    title: "Quality and Reliability Engineer",
    discipline: "Quality, Cloud, and DevOps",
    seniority: "Mid-level or senior",
    location: "Location and work mode discussed per opportunity",
    availability: "talent-network",
    notice: talentNetworkNotice,
    summary:
      "Engineers who improve delivery confidence through useful tests, repeatable releases, observable systems, and practical recovery preparation.",
    responsibilities: [
      "Define risk-based test and release strategies",
      "Automate critical quality and deployment checks",
      "Improve logs, monitoring, alerts, and incident context",
      "Document and exercise backup and recovery procedures",
    ],
    skills: ["Test automation", "CI/CD", "Cloud fundamentals", "Observability", "Incident and recovery practices"],
  },
] as const satisfies readonly TalentNetworkRole[];

export const internshipTimeline = [
  {
    month: 1,
    label: "Month 1",
    title: "Foundations and team practice",
    focus:
      "Build a shared understanding of product delivery, code quality, collaboration, and the tools used in the learning project.",
    activities: [
      "Environment setup, version control, and issue workflow",
      "Small exercises in the participant's selected discipline",
      "Reading existing requirements and asking precise questions",
      "Pairing, feedback, and introductory review practice",
    ],
    milestone:
      "Complete a small reviewed feature or design task and explain the decisions, trade-offs, and follow-up work.",
  },
  {
    month: 2,
    label: "Month 2",
    title: "Guided product contribution",
    focus:
      "Contribute to a bounded project workflow while practicing estimation, implementation, testing, communication, and iteration.",
    activities: [
      "Break a requirement into reviewable tasks",
      "Implement or design a complete journey, including edge states",
      "Participate in critique, code review, or quality review",
      "Document progress, blockers, and assumptions clearly",
    ],
    milestone:
      "Deliver a working project increment that meets agreed acceptance criteria and has been improved through feedback.",
  },
  {
    month: 3,
    label: "Month 3",
    title: "Ownership and portfolio reflection",
    focus:
      "Take greater ownership of a contained outcome, prepare it for handover, and turn the learning into evidence of professional practice.",
    activities: [
      "Plan and lead a small final project increment",
      "Address quality, accessibility, documentation, or operational gaps",
      "Present the outcome and respond to structured review",
      "Prepare a truthful portfolio narrative and personal learning plan",
    ],
    milestone:
      "Present the completed contribution, supporting evidence, known limitations, and the next skills to develop.",
  },
] as const satisfies readonly InternshipTimelineItem[];
