export interface UserModel {
  id: number;
  email: string;
  cpf: string;
  tokens: TokensModel;
  is_client: boolean;
  is_employee: boolean;
}

export interface TokensModel {
  refresh: string;
  access: string;
}