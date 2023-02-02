import { useFormik } from "formik";
import { ChangeMeta, NumberFormatBase, NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Forms/Input";
import * as yup from 'yup';
import Select from 'react-select';
import SelectCustom from "../../../components/Forms/SelectCustom";
import { GetAllClients, GetClients } from "../../../services/user";
import { toast } from "react-toastify";
import { UserModel } from "../../../models/user";
import { useEffect, useState } from "react";
import { CreateVehicle, CreateVehicleParams } from "../../../services/vehicles/createVehicle";
import { GetVehicleById } from "../../../services/vehicles/getVehicleById";
import { VehicleModel } from "../../../models/vehicle";
import { UpdateVehicle, UpdateVehicleParams } from "../../../services/vehicles/updateVehicle";
// import SelectCustom from "../../../components/Forms/SelectCustom";


export default function EditVehiclePage() {
  const navigate = useNavigate();
  const cancel = () => navigate(-1);
  let { id } = useParams();
  const [clients, setClients] = useState<UserModel[]>();
  const [vehicle, setVehicles] = useState<VehicleModel>();

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    getAllClients().then(async (clients) => {
      await getVehicleById()
    })
  }

  const getAllClients = async () => {
    try {
      const clients = await GetAllClients()
      setClients((prev) => [...clients])
    } catch (error) {
      toast.error(String(error));
    }
  }

  const getVehicleById = async () => {
    try {
      const vehicle = await GetVehicleById(Number(id))
      setVehicles(vehicle)
    } catch (error) {
      toast.error(String(error));
    }
  }

  const updateVehicle = async (params: UpdateVehicleParams) => {
    try {
      const result = await UpdateVehicle(params)
      navigate(-1);
      toast.success('Vehicle atualizado com sucesso')
    } catch (error) {
      toast.error(String(error));
    }
  }

  const formik = useFormik<UpdateVehicleParams>({
    enableReinitialize: true,
    initialValues: {
      id: Number(id),
      name: vehicle?.name ?? '',
      board: vehicle?.board ?? '',
      year: vehicle?.year ?? 0,
      owner: vehicle?.owner ?? Number(id)
    },
    onSubmit: async values => {
      updateVehicle(values)
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('O campo é obrigatório').min(5, 'Min length 5 digits'),
      board: yup.string().required('O campo é obrigatório').min(3, 'Min length 5 digits'),
      year: yup.number().required('O campo é obrigatório').min(4),
      owner: yup.number().required('O campo é obrigatório').min(1, 'The field is required'),
    })
  });

  return <>
    <div className="h-screen w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-[450px] py-10 mx-auto">
          <h1 className="text-white mb-4 col-start-2">
            Vehicle
          </h1>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-3 w-full">
            <div className="col-span-2">
              <Input
                placeholder="Name"
                id='name'
                name="name"
                errors={`${formik.touched.name && formik.errors.name ? formik.errors.name : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Board"
                id='board'
                name="board"
                errors={`${formik.touched.board && formik.errors.board ? formik.errors.board : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.board}
              />
            </div>
            <div className="col-span-2">
              <Input
                type={"number"}
                placeholder="Year"
                id='year'
                name="year"
                errors={`${formik.touched.year && formik.errors.year ? formik.errors.year : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
              />
            </div>
            <div className="col-span-2">
              <SelectCustom<UserModel>
                placeholder="Select a client..."
                id='owner'
                name="owner"
                optionDefault={0}
                options={clients ?? []}
                getName={(item) => item.email}
                errors={`${formik.touched.owner && formik.errors.owner ? formik.errors.owner : ''}`}
                getValue={(item) => {
                  return item.id
                }}
                onChange={(e) => {
                  formik.setFieldValue('owner', Number(e.target.value))
                }}
                onBlur={formik.handleBlur}
                value={formik.values.owner}
              />
            </div>
            <div className="col-span-full">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 max-sm:col-span-full">
                  <Button type="submit">
                    Register
                  </Button>
                </div>
                <div className="col-span-1 max-sm:col-span-full">
                  <Button type="button" onClick={() => cancel()}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}