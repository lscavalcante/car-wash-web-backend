import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface UpdateServiceCategoryParams {
  id: number;
  title: string;
  price: number;
}

export async function UpdateServiceCategory(params: UpdateServiceCategoryParams) {
  const http = instance
  try {
    const response = await http.put(`/api/v1/services-category/${params.id}/`, params);

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
    throw new APIException(String(e) + ' unespected error when try UpdateServiceCategory');
  }

}