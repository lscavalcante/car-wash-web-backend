import { AxiosError } from "axios";
import { APIException } from "../../errors";
import PaginationModel from "../../models/pagination";
import { VehicleModel } from "../../models/vehicle";
import instance from "../../packages/http";

export interface CreateVehicleParams {
  name: string;
  board: string;
  year: string;
  owner: number
}

export async function CreateVehicle(props: CreateVehicleParams) {
  const http = instance;
  try {
    const response = await http.post(`/api/v1/vehicles/`, props);

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
    throw new APIException(String(e) + ' unespected error when try CreateVehicle');
  }
}