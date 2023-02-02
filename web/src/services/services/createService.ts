

import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface CreateServiceParams {
  title: string,
  client: number,
  finish: boolean,
  date_start: string,
  date_end: string,
  vehicle: number,
  services: [
    {
      title: string,
      price: number,
      service_category?: number | null
    }
  ]
}

export async function CreateService(params: CreateServiceParams) {
  const http = instance

  try {
    const response = await http.post(`/api/v1/services/`, params);

    if (response.status === 201) {
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
    throw new APIException(String(e) + ' unespected error when try CreateService');
  }

}