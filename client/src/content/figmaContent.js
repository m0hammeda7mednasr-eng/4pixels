export const figmaServices = [
  {
    id: 'shopify-stores',
    title: {
      en: 'Shopify Stores',
      ar: 'Shopify Stores'
    },
    description: {
      en: 'E-commerce solutions with premium storefronts, cleaner product journeys, and conversion-focused checkout.',
      ar: 'E-commerce solutions with premium storefronts, cleaner product journeys, and conversion-focused checkout.'
    },
    category: 'Shopify',
    price: 2200,
    deliveryTime: '10-18 days',
    features: {
      en: [
        'Custom storefront and theme sections',
        'Product and collection architecture',
        'Payment, shipping, and launch setup',
        'Conversion-focused mobile buying flow'
      ],
      ar: [
        'Custom storefront and theme sections',
        'Product and collection architecture',
        'Payment, shipping, and launch setup',
        'Conversion-focused mobile buying flow'
      ]
    },
    image: '/assets/figma-team-working.jpg',
    video: '',
    faq: [],
    active: true
  },
  {
    id: 'portfolio-sites',
    title: {
      en: 'Portfolio Sites',
      ar: 'Portfolio Sites'
    },
    description: {
      en: 'Company and portfolio websites that make the offer clear, premium, and easy to trust from the first screen.',
      ar: 'Company and portfolio websites that make the offer clear, premium, and easy to trust from the first screen.'
    },
    category: 'Portfolio',
    price: 1800,
    deliveryTime: '7-14 days',
    features: {
      en: [
        'Premium homepage and inner pages',
        'Clear service and case-study structure',
        'Responsive layouts for mobile and desktop',
        'Content hierarchy focused on trust'
      ],
      ar: [
        'Premium homepage and inner pages',
        'Clear service and case-study structure',
        'Responsive layouts for mobile and desktop',
        'Content hierarchy focused on trust'
      ]
    },
    image: '/assets/figma-team-working.jpg',
    video: '',
    faq: [],
    active: true
  },
  {
    id: 'crm-solutions',
    title: {
      en: 'CRM Solutions',
      ar: 'CRM Solutions'
    },
    description: {
      en: 'Smart dashboards and workflow layers for leads, customers, reporting, and daily operations.',
      ar: 'Smart dashboards and workflow layers for leads, customers, reporting, and daily operations.'
    },
    category: 'Systems',
    price: 1600,
    deliveryTime: '6-12 days',
    features: {
      en: [
        'CRM data structure and cleanup',
        'Pipeline views and reporting dashboards',
        'Task handoff and team workflows',
        'Google Sheets and system integrations'
      ],
      ar: [
        'CRM data structure and cleanup',
        'Pipeline views and reporting dashboards',
        'Task handoff and team workflows',
        'Google Sheets and system integrations'
      ]
    },
    image: '/assets/figma-team-working.jpg',
    video: '',
    faq: [],
    active: true
  },
  {
    id: 'ui-ux-design',
    title: {
      en: 'UI/UX Design',
      ar: 'UI/UX Design'
    },
    description: {
      en: 'User-centered interfaces with sharper hierarchy, smoother flows, and production-ready design systems.',
      ar: 'User-centered interfaces with sharper hierarchy, smoother flows, and production-ready design systems.'
    },
    category: 'Design',
    price: 1400,
    deliveryTime: '5-10 days',
    features: {
      en: [
        'Wireframes and interface direction',
        'Design system and reusable sections',
        'Mobile-first interaction flow',
        'Developer-ready handoff'
      ],
      ar: [
        'Wireframes and interface direction',
        'Design system and reusable sections',
        'Mobile-first interaction flow',
        'Developer-ready handoff'
      ]
    },
    image: '/assets/figma-team-working.jpg',
    video: '',
    faq: [],
    active: true
  }
];

export const figmaProjects = [
  {
    id: 'shopify-growth-store',
    title: {
      en: 'Shopify Growth Store',
      ar: 'Shopify Growth Store'
    },
    description: {
      en: 'A premium Shopify storefront with stronger collection hierarchy, product framing, and a faster checkout journey.',
      ar: 'A premium Shopify storefront with stronger collection hierarchy, product framing, and a faster checkout journey.'
    },
    category: 'Shopify',
    tags: ['Shopify', 'UX', 'Checkout'],
    images: ['/assets/figma-team-working.jpg'],
    videos: [],
    client: {
      en: 'Retail Brand',
      ar: 'Retail Brand'
    },
    externalLink: '',
    featured: true,
    createdAt: '2026-04-01T10:00:00.000Z'
  },
  {
    id: 'agency-portfolio-rebuild',
    title: {
      en: 'Agency Portfolio Rebuild',
      ar: 'Agency Portfolio Rebuild'
    },
    description: {
      en: 'A cleaner company website that presents services, proof, and inquiry paths with the same visual language as the homepage.',
      ar: 'A cleaner company website that presents services, proof, and inquiry paths with the same visual language as the homepage.'
    },
    category: 'Portfolio',
    tags: ['Portfolio', 'Brand', 'React'],
    images: ['/assets/figma-team-working.jpg'],
    videos: [],
    client: {
      en: 'Creative Studio',
      ar: 'Creative Studio'
    },
    externalLink: '',
    featured: true,
    createdAt: '2026-03-14T10:00:00.000Z'
  },
  {
    id: 'crm-operations-dashboard',
    title: {
      en: 'CRM Operations Dashboard',
      ar: 'CRM Operations Dashboard'
    },
    description: {
      en: 'A structured CRM layer for lead follow-up, daily visibility, reporting snapshots, and team handoff.',
      ar: 'A structured CRM layer for lead follow-up, daily visibility, reporting snapshots, and team handoff.'
    },
    category: 'Systems',
    tags: ['CRM', 'Automation', 'Reporting'],
    images: ['/assets/figma-team-working.jpg'],
    videos: [],
    client: {
      en: 'Sales Team',
      ar: 'Sales Team'
    },
    externalLink: '',
    featured: true,
    createdAt: '2026-02-18T10:00:00.000Z'
  },
  {
    id: 'ux-product-flow',
    title: {
      en: 'UX Product Flow',
      ar: 'UX Product Flow'
    },
    description: {
      en: 'A focused UX pass that reduced screen clutter and made the primary action easier to reach on mobile and desktop.',
      ar: 'A focused UX pass that reduced screen clutter and made the primary action easier to reach on mobile and desktop.'
    },
    category: 'Design',
    tags: ['UI/UX', 'Mobile', 'Design System'],
    images: ['/assets/figma-team-working.jpg'],
    videos: [],
    client: {
      en: 'Product Team',
      ar: 'Product Team'
    },
    externalLink: '',
    featured: false,
    createdAt: '2026-01-20T10:00:00.000Z'
  }
];

export const getFigmaServiceById = (id) =>
  figmaServices.find((service) => String(service.id) === String(id));

export const getFigmaProjectById = (id) =>
  figmaProjects.find((project) => String(project.id) === String(id));
