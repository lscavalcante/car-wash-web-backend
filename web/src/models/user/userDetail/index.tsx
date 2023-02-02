export interface UserDetailModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  cpf?: string;
  is_active: boolean;
}