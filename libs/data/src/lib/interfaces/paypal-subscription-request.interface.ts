export interface IPayPalSubscriptionRequest {
  plan_id?: string;
  start_time?: string;
  subscriber?: Subscriber;
  application_context?: ApplicationContext;
}

interface Subscriber {
  name?: Name;
  email_address?: string;
}

interface Name {
  given_name?: string;
  surname?: string;
}

interface ApplicationContext {
  brand_name?: string;
  locale?: string;
  shipping_preference?: string;
  user_action?: string;
  payment_method?: PaymentMethod;
  return_url?: string;
  cancel_url?: string;
}

interface PaymentMethod {
  payer_selected?: string;
  payee_preferred?: string;
}
