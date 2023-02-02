import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface SignInParams {
  email: string;
  password: string;
}

export async function SingIn(params: SignInParams) {
  const http = instance


  try {
    const response = await http.post(`/api/v1/users/login/`, { 'email': params.email, 'password': params.password });
    if (response.status === 200) {
      return response.data;
    }

    const error = 'detail' in response.data ? response.data['detail'] : 'Error when singIn';
    throw new APIException(error)
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new APIException(e.message);
    }
    if (e instanceof APIException) {
      throw e.message;
    }
    throw new APIException(String(e) + ' unespected error when try singIn');
  }

}