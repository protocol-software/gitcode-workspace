export interface IPayPalPlanRequest {
  product_id?: string;
  name?: string;
  description?: string;
  billing_cycles?: BillingCycle[];
  payment_preferences?: PaymentPreferences;
  taxes?: Taxes;
}

interface BillingCycle {
  frequency?: Frequency;
  tenure_type?: string;
  sequence?: number;
  total_cycles?: number;
  pricing_scheme?: PricingScheme;
}

interface Frequency {
  interval_unit?: string;
  interval_count?: number;
}

interface PricingScheme {
  fixed_price?: FixedPrice;
}

interface FixedPrice {
  value?: string;
  currency_code?: string;
}

interface PaymentPreferences {
  auto_bill_outstanding?: boolean;
  setup_fee?: SetupFee;
  setup_fee_failure_action?: string;
  payment_failure_threshold?: number;
}

interface SetupFee {
  value?: string;
  currency_code?: string;
}

interface Taxes {
  percentage?: string;
  inclusive?: boolean;
}
