import { AxiosError } from "axios";
import { APIException } from "../../errors";
import PaginationModel from "../../models/pagination";
import { VehicleModel } from "../../models/vehicle";
import instance from "../../packages/http";

export async function GetVehicles(props: { search: string, page: 1 | number }): Promise<PaginationModel<VehicleModel[]>> {
  const http = instance;
  try {
    const response = await http.get(`/api/v1/vehicles/?search=${props.search}&page=${props.page}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new APIException('detail' in response.data ? response.data['detail'] : 'unexpected error when get vehicles');
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new APIException(e.message);
    }
    if (e instanceof APIException) {
      throw e.message;
    }
    throw new APIException(String(e) + ' unespected error when try getVehicles');
  }
}