import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface GetAllUsersParams {
  search: string;
  page: number;
}

export async function GetAllUsers(params: GetAllUsersParams) {
  const http = instance

  try {
    const response = await http.get(`/api/v1/users/?search=${params.search}&page=${params.page}`);

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
    throw new APIException(String(e) + ' unespected error when try getAllUsers');
  }

}