import { PayPalSubscriptionStatus } from '../..';

export interface IPaypalSubscriptionResponse {
  id?: string;
  plan_id?: string;
  start_time?: string;
  subscriber?: Subscriber;
  create_time?: string;
  links?: Link[];
  status?: PayPalSubscriptionStatus;
  status_update_time?: string;
}

interface Subscriber {
  name?: Name;
  email_address?: string;
}

interface Name {
  given_name?: string;
  surname?: string;
}

interface Link {
  href?: string;
  rel?: string;
  method?: string;
}
