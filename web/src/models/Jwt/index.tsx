export interface JwtModel {
  user_id: string;
  email: string;
  token_type: string;
  is_employee: boolean;
  is_client: boolean;
}