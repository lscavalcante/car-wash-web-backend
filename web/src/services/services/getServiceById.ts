import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";
import { ServiceDetailModel } from '../../models/service/ServiceDetail';


export async function GetServiceById(id: number): Promise<ServiceDetailModel> {
  const http = instance

  try {
    const response = await http.get<ServiceDetailModel>(`/api/v1/services/${id}/`);

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
    throw new APIException(String(e) + ' unespected error when try GetServiceById');
  }

}