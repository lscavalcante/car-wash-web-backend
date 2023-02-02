

import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface UpdateServiceParams {
  id: number;
  title: string,
  client: number,
  finish: boolean,
  date_start: string,
  date_end: string,
  vehicle: number,
  services: [
    {
      id?: number;
      title: string,
      price: number | string,
      service_category?: number | null
    }
  ]
}

export async function UpdateService(params: UpdateServiceParams) {
  const http = instance

  try {
    const response = await http.put(`/api/v1/services/${params.id}/`, params);

    if (response.status === 200) {
      return response.data;
    }

    throw new APIException(String(response.data));
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new APIException(e.message);
    }
    if (e instanceof APIException) {
      throw e.message;
    }
    throw new APIException(String(e) + ' unespected error when try UpdateService');
  }

}