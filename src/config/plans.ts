export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year' | 'lifetime';
  stripePriceId: string;
  features: string[];
  limits: {
    promptsPerMonth: number | 'unlimited';
    teamSeats: number;
    apiAccess: boolean;
    mcpAccess: boolean;
    prioritySupport: boolean;
    videoAssets: boolean;
  };
  popular?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Explore the library',
    price: 0,
    interval: 'month',
    stripePriceId: '',
    features: [
      'Browse full gallery with previews',
      '3 free listing downloads (total on Free)',
      'Paid Pro listings require Starter or higher',
      'Community access',
    ],
    limits: {
      /** Free listings only — total unlocks on Free plan, not paid Pro SKUs. */
      promptsPerMonth: 3,
      teamSeats: 1,
      apiAccess: false,
      mcpAccess: false,
      prioritySupport: false,
      videoAssets: false,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individual builders',
    price: 69,
    interval: 'year',
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    features: [
      '25 prompt downloads per month',
      'Basic sections & heroes',
      'React framework output',
      'Email support',
      'Commercial license',
    ],
    limits: {
      promptsPerMonth: 25,
      teamSeats: 1,
      apiAccess: false,
      mcpAccess: false,
      prioritySupport: false,
      videoAssets: false,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious builders & freelancers',
    price: 149,
    interval: 'year',
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited prompt downloads',
      'Full library access',
      'All frameworks (React, Vue, Svelte, HTML)',
      'Video background assets',
      'Priority access to new drops',
      'MCP Server access',
      'Pre-prompt customizer',
      'Priority email support',
      'Commercial license',
    ],
    limits: {
      promptsPerMonth: 'unlimited',
      teamSeats: 1,
      apiAccess: true,
      mcpAccess: true,
      prioritySupport: true,
      videoAssets: true,
    },
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'lifetime',
    name: 'Lifetime Pro',
    description: 'One-time payment, forever access',
    price: 349,
    interval: 'lifetime',
    stripePriceId: process.env.STRIPE_LIFETIME_PRICE_ID || '',
    features: [
      'Everything in Pro, forever',
      'Lifetime updates & new drops',
      'Early access to beta features',
      'Founding member badge',
      'Direct support channel',
    ],
    limits: {
      promptsPerMonth: 'unlimited',
      teamSeats: 1,
      apiAccess: true,
      mcpAccess: true,
      prioritySupport: true,
      videoAssets: true,
    },
    badge: 'Best Value',
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For teams building client sites',
    price: 399,
    interval: 'year',
    stripePriceId: process.env.STRIPE_AGENCY_PRICE_ID || '',
    features: [
      'Everything in Pro',
      'Up to 5 team seats',
      'Shared team library & favorites',
      'Client project management',
      'White-label license',
      'Dedicated account support',
      'Custom prompt requests (2/month)',
    ],
    limits: {
      promptsPerMonth: 'unlimited',
      teamSeats: 5,
      apiAccess: true,
      mcpAccess: true,
      prioritySupport: true,
      videoAssets: true,
    },
  },
];
