export interface Theme {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  role: string;
  theme_store_id: number;
  previewable: boolean;
  processing: boolean;
  admin_graphql_api_id: string;
}
