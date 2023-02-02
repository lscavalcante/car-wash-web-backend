import { AxiosError } from "axios";
import { APIException } from "../../errors";
import { ServiceCategory } from "../../models/serviceCategory";
import instance from "../../packages/http";

export async function GetAllServicesCategory() {
  const http = instance
  try {
    const response = await http.get<ServiceCategory[]>(`/api/v1/services-category/all-services-category/`);

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
    throw new APIException(String(e) + ' unespected error when try GetAllServicesCategory');
  }

}