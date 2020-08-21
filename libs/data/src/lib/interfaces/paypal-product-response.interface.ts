export interface IPayPalProductResponse {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
  category?: string;
  image_url?: string;
  home_url?: string;
  create_time?: string;
  update_time?: string;
  links?: {
    href?: string;
    rel?: string;
    method?: string;
  }[];
}
