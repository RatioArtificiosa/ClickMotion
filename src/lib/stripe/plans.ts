import { plans } from '@/config/plans';

export function getPlan(planId: string) {
  return plans.find(p => p.id === planId);
}

export function canAccessPrompt(userPlan: string, promptTier: string): boolean {
  const tierHierarchy = ['free', 'starter', 'pro', 'agency'];
  const userLevel = tierHierarchy.indexOf(userPlan);
  const promptLevel = tierHierarchy.indexOf(promptTier);
  return userLevel >= promptLevel;
}

export function getMonthlyPrice(plan: typeof plans[number]): number {
  if (plan.interval === 'lifetime') return plan.price;
  if (plan.interval === 'year') return Math.round(plan.price / 12);
  return plan.price;
}
