import { Form, Formik } from "formik";
import * as yup from 'yup';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { InputFormik } from "../../../components/Forms/InputFormik";
import Button from "../../../components/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserDetailModel } from "../../../models/user/userDetail";
import { GetUserByIdManager } from "../../../services/user/getUserByIdManager";
import { UpdateUserManager, UpdateUserManagerParams } from "../../../services/user/updateUserManager";


export function EditUserPage() {

  const navigate = useNavigate()
  let { id } = useParams();
  const [user, setUser] = useState<UserDetailModel>();

  useEffect(() => {
    getUser();
  }, [])


  const getUser = async () => {
    try {
      const result = await GetUserByIdManager(Number(id))
      setUser(result)
      toast.success('User loading with success')
    } catch (error) {
      toast.error(`Error when try fetch user ${error}`);
      navigate(-1);
    }
  }
  const updateUser = async (values: UpdateUserManagerParams) => {
    try {
      const result = await UpdateUserManager(Number(id), values)
      toast.success('User updated with success')
      setUser(result)
      navigate(-1)
    } catch (error) {
      toast.success(`Error when try fetch update user ${error}`);
    }
  }

  return <div className="container mx-auto w-full h-screen max-sm:px-4 ">
    <div className="flex items-center flex-col justify-center py-4">
      <h1 className="text-white mb-4 col-start-2">
        User
      </h1>
      <div className="w-[450px]">
        <Formik
          enableReinitialize
          initialValues={
            {
              email: user?.email ?? '',
              cpf: user?.cpf ?? '',
              first_name: user?.first_name ?? '',
              last_name: user?.last_name ?? '',
              is_active: user?.is_active ?? false
            }
          }
          validationSchema={
            yup.object().shape({
              email: yup.string().email().required(),
              cpf: yup.string().required().min(14).max(14),
              first_name: yup.string().required().min(3),
              last_name: yup.string().required().min(3),
            })
          }
          onSubmit={(values: UpdateUserManagerParams) => {
            updateUser(values)
          }}
        >
          {({ errors, values, setFieldValue }) => (
            <Form autoComplete="false" className="text-black">
              <InputFormik
                disabled
                name="email"
                label="Email"
                placeholder="example@example.com"
              />
              <InputFormik
                name="cpf"
                label="Cpf"
                placeholder="999.999.99"
              />
              <InputFormik
                name="first_name"
                label="First Name"
                placeholder="Loki"
              />
              <InputFormik
                name="last_name"
                label="Last Name"
                placeholder="Jhonson"
              />
              <div className="col-span-2">
                <label className="mt-2 flex text-sm items-center justify-start gap-2 text-white cursor-pointer">
                  <Checkbox.Root
                    checked={values.is_active}
                    onCheckedChange={(checked) => {
                      setFieldValue('is_active', !values.is_active)
                    }}
                    className='flex justify-center items-center w-6 h-6 rounded bg-zinc-900'
                  >
                    <Checkbox.Indicator>
                      <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Is Active?
                </label>
              </div>
              <div className="flex  space-x-2 mt-3">
                <Button type="submit">
                  Update
                </Button>
                <Button type="button" onClick={() => { navigate(-1) }} >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
}