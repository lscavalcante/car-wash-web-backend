import { AxiosError } from "axios";
import { APIException } from "../../errors";
import { UserModel } from "../../models/user";
import instance from "../../packages/http";


export async function GetAllClients() {
  const http = instance
  try {
    const response = await http.get<UserModel[]>(`/api/v1/users/all-clients/`);

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
    throw new APIException(String(e) + ' unespected error when try getAllClients');
  }

}