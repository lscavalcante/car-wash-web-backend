import { ErrorMessage, Field, FieldArray, Formik, FormikProvider, getIn, useFormik, Form, FormikHelpers } from "formik";
import { ChangeMeta, NumberFormatBase, NumericFormat } from "react-number-format";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, GameController, Plus, Trash } from 'phosphor-react';
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import * as yup from 'yup';
import { CreateServiceCategory, CreateServiceCategoryParams } from "../../../services/servicesCategory/createServiceCategory";
import SelectCustom from "../../../components/Forms/SelectCustom";
import { UserModel } from "../../../models/user";
import { VehicleModel } from "../../../models/vehicle";
import { InputFormik } from "../../../components/Forms/InputFormik";
import SelectFormik from "../../../components/Forms/SelectFormik";
import { GetAllClients } from "../../../services/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetAllVehicles } from "../../../services/vehicles/getAllVehicles";
import { GetAllServicesCategory } from "../../../services/servicesCategory/getAllServicesCategory";
import { ServiceCategory } from "../../../models/serviceCategory";
import { CreateService, CreateServiceParams } from "../../../services/services/createService";
import priceStringToDouble from "../../../format/priceStringToDouble";

export default function NewServicePage() {
  const [clients, setClients] = useState<UserModel[]>([]);
  const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
  const [servicesCategory, setServicesCategory] = useState<ServiceCategory[]>([]);
  const navigate = useNavigate();
  const cancel = () => navigate(-1);
  const currencyFormatter = (value: any) => {
    const instance = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const amount = instance.format(value.replace(/\D/g, '') / 100);

    return `${amount}`;
  }
  const validationSchema = yup.object().shape({
    title: yup.string().required('O campo é obrigatório').min(5, 'Min length 5 digits'),
    client: yup.number().required().min(1, 'The field is required'),
    date_start: yup.date()
      .min(new Date(),)
      .required(),
    date_end: yup.date()
      .min(new Date(),)
      .required(),
    vehicle: yup.number().required().min(1, 'The field is required'),
    services: yup.array().of(
      yup.object().shape({
        title: yup.string().required("Title is a required field"),
        service_category: yup.number().nullable(true).transform((_, val) => val === Number(val) ? val : null),
        price: yup.string()
          .test('is-valid-price', 'O valor não pode ser menor ou igual a 0', function (value: any) {
            const newValue = value.replace(/\D/g, '');
            if (newValue <= 0 || newValue == undefined || newValue == null) {
              return false;
            }
            return true;
          })
          .required('Price is required'),
      }))
  })
  const initialValues: CreateServiceParams = {
    title: '',
    client: 0,
    finish: false,
    date_start: '',
    date_end: '',
    vehicle: 0,
    services: [
      {
        title: '',
        price: 0,
        service_category: 0
      }
    ]
  }

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await getAllClients();
    await getAllVehicles();
    await getAllServicesCategory();
  }

  const getAllClients = async () => {
    try {
      const _clients = await GetAllClients()
      setClients([..._clients])
    } catch (error) {
      toast.error(String(error))
    }
  }

  const getAllVehicles = async () => {
    try {
      const _vehicles = await GetAllVehicles()
      setVehicles([..._vehicles])
    } catch (error) {
      toast.error(String(error))
    }
  }

  const getAllServicesCategory = async () => {
    try {
      const _servicesCategory = await GetAllServicesCategory()
      setServicesCategory([..._servicesCategory])
    } catch (error) {
      toast.error(String(error))
    }
  }

  const createService = async (value: CreateServiceParams, formikHelpers: FormikHelpers<CreateServiceParams>) => {
    try {

      // Exemplo 1
      const modiedServiceArray = value.services.reduce((newList: any, service) => {
        // newList e sempre a nova lista
        newList.push({
          ...service,
          service_category: service.service_category == 0 ? null : Number(service.service_category),
          price: priceStringToDouble(String(service.price)),
        })
        return newList
        // caso eu quero adicionar algo na primeira posição eu coloco dentro do []
      }, [])

      // Exemplo 2
      // const modiedServiceArray = value.services.map(({ service_category, ...p }) => ({ ...p, service_category: service_category == 0 ? null : Number(service_category) })) as any

      const data: CreateServiceParams = {
        ...value,
        vehicle: Number(value.vehicle),
        client: Number(value.client),
        services: modiedServiceArray
      }

      await CreateService(data)
      toast.success('Created Successfully')
      formikHelpers.resetForm()
      // navigate(-1)

    } catch (error) {
      toast.error(String(error))
    }
  }

  return <>
    <div className="h-screen w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-[450px] py-10 mx-auto">
          <h1 className="text-white mb-4 col-start-2">
            Service
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: CreateServiceParams, formikHelpers: FormikHelpers<CreateServiceParams>) => createService(values, formikHelpers)}
          >
            {({ values, errors, isSubmitting, isValid, setFieldValue }) => (
              <Form autoComplete="false" className="grid grid-cols-2 gap-3 w-full">
                <div className="col-span-2">
                  <InputFormik
                    name="title"
                    label="Title"
                    placeholder="Full Title"
                  />
                </div>
                <div className="col-span-2">
                  <SelectFormik<UserModel>
                    label="Client"
                    name="client"
                    placeholder="Select a client..."
                    optionDefault={0}
                    options={clients}
                    getName={(item: UserModel) => item.email}
                    getValue={(item: UserModel) => {
                      return item.id
                    }}
                    onChange={(e: any) => {
                      setFieldValue('client', Number(e.target.value))
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <InputFormik
                    type={'date'}
                    name="date_start"
                    label="Date Start"
                    placeholder="Date Start"
                  />
                </div>
                <div className="col-span-2">
                  <InputFormik
                    type={'date'}
                    name="date_end"
                    label="Date End"
                    placeholder="Date End"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mt-2 flex text-sm items-center justify-start gap-2 text-white cursor-pointer">
                    <Checkbox.Root
                      checked={values.finish}
                      onCheckedChange={(checked) => {
                        setFieldValue('finish', !values.finish)
                      }}
                      className='flex justify-center items-center w-6 h-6 rounded bg-zinc-900'
                    >
                      <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400' />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    Finish?
                  </label>
                </div>
                <div className="col-span-2">
                  <SelectFormik<VehicleModel>
                    label="vehicle"
                    name="vehicle"
                    placeholder="Select a vehicle..."
                    optionDefault={0}
                    options={vehicles}
                    getName={(item: VehicleModel) => item.name}
                    getValue={(item: VehicleModel) => {
                      return item.id
                    }}
                    onChange={(e: any) => {
                      setFieldValue('vehicle', Number(e.target.value))
                    }}
                  />
                </div>
                <div className="h-[1px] text-gray-300 bg-gray-300 w-full col-span-full my-3"></div>
                <h1 className="text-white text-2xl mb-2">
                  Service
                </h1>
                <FieldArray name="services">
                  {({ push, remove }) => (
                    <>
                      {values.services.map((_: any, index: any) => (
                        <div className="col-span-full space-y-2" key={index}>
                          <div className="col-span-2">
                            <SelectFormik<ServiceCategory>
                              label="service_category"
                              name={`services[${index}].service_category`}
                              placeholder="Select a service category..."
                              optionDefault={0}
                              options={servicesCategory}
                              getName={(item: ServiceCategory) => item.title}
                              getValue={(item: ServiceCategory) => {
                                return item.id
                              }}
                              onChangeCapture={(value: any) => {
                                const result = servicesCategory.find((e) => e.id == value.target.value)
                                if (result) {
                                  setFieldValue(`services[${index}].title`, result.title);
                                  setFieldValue(`services[${index}].price`, currencyFormatter(result.price));
                                } else {
                                  setFieldValue(`services[${index}].title`, '');
                                  setFieldValue(`services[${index}].price`, 0);
                                }
                              }}
                            />
                          </div>
                          <div className="col-span-2">
                            <InputFormik
                              disabled={values.services![index].service_category == null || values.services![index].service_category! > 0 ? true : false}
                              label="Title"
                              placeholder="Title"
                              name={`services[${index}].title`}
                            />
                          </div>
                          <div className="col-span-2">
                            <InputFormik
                              label="Price"
                              placeholder="Price"
                              name={`services[${index}].price`}
                              disabled={values.services![index].service_category == null || values.services![index].service_category! > 0 ? true : false}
                              onChange={(e: any) => {
                                setFieldValue(`services[${index}].price`, currencyFormatter(e.target.value));
                              }}
                            />
                          </div>
                          <div className="col-span-full flex items-end justify-end">
                            <Trash
                              onClick={() => {
                                if (values.services.length > 1) {
                                  remove(index)
                                }
                              }}
                              className="bg-nuPurple rounded-lg text-white cursor-pointer hover:opacity-75 my-2" size={33} weight="duotone"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="col-span-full mb-2">
                        <Button type="button" onClick={() => push({
                          title: '',
                          price: 0,
                          service_category: 0
                        })}>
                          Add new service
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  </>
}
