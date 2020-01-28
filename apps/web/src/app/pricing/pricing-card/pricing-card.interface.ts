import { PricingCategory } from './pricing-category.enum';
import { PricingPlan } from './pricing-plan.enum';

export interface IPricingCard {
  category: PricingCategory;
  plan: PricingPlan;
  title: string;
  description: string;
  benefits: string[];
  currency: string;
  price?: number;
  discount?: {
    code?: string;
    value?: number;
    currency?: string;
  };
}
