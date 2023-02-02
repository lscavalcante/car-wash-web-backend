import { AxiosError } from "axios";
import { APIException } from "../../errors";
import { UserDetailModel } from "../../models/user/userDetail";
import instance from "../../packages/http";

export async function GetUserByIdManager(id: number) {
  const http = instance
  try {
    const response = await http.get<UserDetailModel>(`/api/v1/users/${id}/manager/`);

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
    throw new APIException(String(e) + ' unespected error when try GetUserByIdManager');
  }

}