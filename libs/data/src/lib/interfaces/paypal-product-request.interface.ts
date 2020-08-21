import { PayPalProductType } from '../..';

export interface IPayPalProductRequest {
  name: string;
  description?: string;
  type: PayPalProductType;
  category?: string;
  image_url?: string;
  home_url?: string;
}
