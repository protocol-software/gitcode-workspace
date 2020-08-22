export interface IPayPalPlanResponse {
  id?: string;
  product_id?: string;
  name?: string;
  status?: string;
  description?: string;
  billing_cycles?: BillingCycle[];
  payment_preferences?: PaymentPreferences;
  taxes?: Taxes;
  quantity_supported?: boolean;
  create_time?: string;
  update_time?: string;
  links?: Link[];
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
  currency_code?: string;
  value?: string;
}

interface PaymentPreferences {
  auto_bill_outstanding?: boolean;
  setup_fee?: SetupFee;
  setup_fee_failure_action?: string;
  payment_failure_threshold?: number;
}

interface SetupFee {
  currency_code?: string;
  value?: string;
}

interface Taxes {
  percentage?: string;
  inclusive?: boolean;
}

interface Link {
  href?: string;
  rel?: string;
  method?: string;
}
