type Address = {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  country_code: string;
  country_name: string;
  customer_id: number;
  default: boolean;
  first_name: string;
  id: number;
  last_name: string;
  name?: string;
  phone?: string;
  province?: string;
  province_code?: string;
  zip: string;
};
type EmailConsent = {
  consent_updated_at?: string;
  opt_in_level?: string;
  state?: string;
};
export default interface ListShopifyCustomerRes {
  accepts_marketing: boolean;
  accepts_marketing_updated_at: string;
  addresses: Address[];
  admin_graphql_api_id: string;
  created_at: string;
  currency: string;
  default_address: Address;
  email: string;
  email_marketing_consent: EmailConsent;
  first_name: string;
  id: number;
  last_name: string;
  last_order_id?: string | number;
  last_order_name?: string;
  marketing_opt_in_level?: string | number;
  multipass_identifier?: string | any;
  note?: string;
  orders_count?: number;
  phone?: string;
  sms_marketing_consent?: any;
  state?: string;
  tags?: string;
  tax_exempt: boolean;
  tax_exemptions: any[];
  total_spent: string;
  updated_at: string;
  verified_email: boolean;
}
export default interface ResultCustomerShopifySearch {}
