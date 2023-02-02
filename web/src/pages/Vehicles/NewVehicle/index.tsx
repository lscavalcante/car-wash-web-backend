import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Forms/Input";
import * as yup from 'yup';
import SelectCustom from "../../../components/Forms/SelectCustom";
import { GetAllClients } from "../../../services/user";
import { toast } from "react-toastify";
import { UserModel } from "../../../models/user";
import { useEffect, useState } from "react";
import { CreateVehicle, CreateVehicleParams } from "../../../services/vehicles/";


export default function NewVehiclePage() {
  const navigate = useNavigate();
  const cancel = () => navigate(-1);
  const [clients, setClients] = useState<UserModel[]>();

  useEffect(() => {
    getAllClients();
  }, [])

  const getAllClients = async () => {
    try {
      const clients = await GetAllClients()
      setClients((prev) => [...clients])
    } catch (error) {
      toast.error(String(error));
    }
  }

  const createVehicle = async (params: CreateVehicleParams) => {
    try {
      const result = await CreateVehicle(params)
      navigate(-1);
      toast.success('Vehicle criado com sucesso')
    } catch (error) {
      toast.error(String(error));
    }
  }

  const formik = useFormik<CreateVehicleParams>({
    initialValues: {
      name: '',
      board: '',
      year: '',
      owner: 0
    },
    onSubmit: async values => {
      createVehicle(values)
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('O campo é obrigatório').min(5, 'Min length 5 digits'),
      board: yup.string().required('O campo é obrigatório').min(3, 'Min length 5 digits'),
      year: yup.number().required('O campo é obrigatório').min(4),
      owner: yup.number().required('O campo é obrigatório').min(1, 'The field is required'),
    })
  });

  return <>
    <div className="h-screen w-screen">
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