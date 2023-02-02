import { AxiosError } from "axios";
import { APIException } from "../../errors";
import instance from "../../packages/http";

export interface UpdateVehicleParams {
  id: number;
  name: string;
  board: string;
  year: number;
  owner: number
}

export async function UpdateVehicle({ id, ...props }: UpdateVehicleParams) {
  const http = instance;
  try {
    const response = await http.put(`/api/v1/vehicles/${id}/`, props);

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
    throw new APIException(String(e) + ' unespected error when try UpdateVehicle');
  }
}