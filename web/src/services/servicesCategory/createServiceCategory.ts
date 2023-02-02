import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface CreateServiceCategoryParams {
  title: string;
  price: number;
}

export async function CreateServiceCategory(params: CreateServiceCategoryParams) {
  const http = instance

  try {
    const response = await http.post(`/api/v1/services-category/`, params);

    if (response.status === 201) {
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
    throw new APIException(String(e) + ' unespected error when try CreateServiceCategory');
  }


}