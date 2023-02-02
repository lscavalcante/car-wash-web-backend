import { AxiosError } from "axios";
import { APIException } from "../../errors";
import PaginationModel from "../../models/pagination";
import { VehicleModel } from "../../models/vehicle";
import instance from "../../packages/http";

export async function GetVehicleById(id: number) {
  const http = instance;
  try {
    const response = await http.get<VehicleModel>(`/api/v1/vehicles/${id}/`);

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
    throw new APIException(String(e) + ' unespected error when try GetVehicleById');
  }
}