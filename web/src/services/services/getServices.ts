import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface GetServicesParams {
  search: string;
  page: number;
}

export async function GetServices(params: GetServicesParams) {
  const http = instance

  try {
    const response = await http.get(`/api/v1/services/?search=${params.search}&page=${params.page}`);

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
    throw new APIException(String(e) + ' unespected error when try GetService');
  }

}