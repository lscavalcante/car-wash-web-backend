import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, GameController, Plus, Trash } from 'phosphor-react';
import * as yup from 'yup';
import { useState } from "react";
import Input from "../../components/Forms/Input";
import { InputFormik } from "../../components/Forms/InputFormik";
import Button from "../../components/Buttons/Button";
import SelectCustom from "../../components/Forms/SelectCustom";
import { UserModel } from "../../models/user";
import SelectFormik from "../../components/Forms/SelectFormik";
import { VehicleModel } from "../../models/vehicle";

export default function FormPage() {

  const [price, setPrice] = useState('');
  const validationSchema = yup.object().shape({
    title: yup.string().required('O campo é obrigatório').min(5, 'Min length 5 digits'),
    price: yup.string()
      .test('is-valid-price', 'O valor não pode ser menor ou igual a 0', function (value: any) {
        const newValue = value?.replace(/\D/g, '');
        if (newValue <= 0 || newValue == undefined || newValue == null) {
          return false;
        }
        return true;
      }),
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
  const initialValue = {
    title: '',
    client: 0,
    price: '',
    finish: false,
    date_start: '',
    date_end: '',
    vehicle: 0,
    services: [
      {
        title: '',
        price: 0
      }
    ]
  }
  const handleOnSubmit = (values: any) => {

  }
  const currencyFormatter = (value: any) => {

    const instance = new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: "BRL",
    });

    return instance.format(value.replace(/\D/g, '') / 100);
  }

  return <div className="w-full min-h-screen">
    <div className="h-full flex flex-col items-center justify-center text-white">
      <div className="w-[458px] mb-10">

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values: any) => handleOnSubmit(values)
          }>
          {({ values, errors, isSubmitting, isValid, setFieldValue }) => (
            <Form autoComplete="false" className="text-black">
              <InputFormik
                name="title"
                label="Title"
                placeholder="Full Title"
              />
              <InputFormik
                name="price"
                label="Price"
                placeholder="Full Price"
                onChange={(e) => {
                  setFieldValue('price', currencyFormatter(e.target.value))
                }}
              />
              <SelectFormik<UserModel>
                label="Client"
                name="client"
                placeholder="Select a client..."
                optionDefault={0}
                options={[]}
                getName={(item: UserModel) => item.email}
                getValue={(item: UserModel) => {
                  return item.id
                }}
                onChange={(e: any) => {
                  setFieldValue('client', Number(e.target.value))
                }}
              />
              <InputFormik
                type={'date'}
                name="date_start"
                label="date_start"
                placeholder="Date Start"
              />
              <InputFormik
                type={'date'}
                name="date_end"
                label="date_end"
                placeholder="Date End"
              />
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
              <SelectFormik<VehicleModel>
                label="vehicle"
                name="vehicle"
                placeholder="Select a vehicle..."
                optionDefault={0}
                options={[]}
                getName={(item: VehicleModel) => item.name}
                getValue={(item: VehicleModel) => {
                  return item.id
                }}
                onChange={(e: any) => {
                  setFieldValue('vehicle', Number(e.target.value))
                }}
              />
              <h1 className="text-white text-2xl mt-8 mb-2">
                Service
              </h1>
              <FieldArray name="services">
                {({ push, remove }) => (
                  <>
                    {values.services.map((_: any, index: any) => (
                      <div className="col-span-full space-y-2" key={index}>
                        <div className="col-span-2">
                          <InputFormik
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
                        price: 0
                      })}>
                        Add new service
                      </Button>
                    </div>
                  </>
                )}
              </FieldArray>
              <Button type="submit">Register</Button>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  </div>
}