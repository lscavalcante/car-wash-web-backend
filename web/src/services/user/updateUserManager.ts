import { AxiosError } from "axios";
import { APIException } from "../../errors";
import { UserDetailModel } from "../../models/user/userDetail";
import instance from "../../packages/http";

export interface UpdateUserManagerParams {
  cpf: string
  first_name: string
  last_name: string
  is_active: boolean
}

export async function UpdateUserManager(id: number, { ...params }: UpdateUserManagerParams) {
  const http = instance
  try {
    const response = await http.put<UserDetailModel>(`/api/v1/users/${id}/manager/`, params);

    if (response.status === 200) {
      return response.data;
    }

    throw response.data
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new APIException(e.message);
    }
    if (e instanceof APIException) {
      throw e.message;
    }
    throw new APIException(String(e) + ' unespected error when try UpdateUserManager');
  }

}