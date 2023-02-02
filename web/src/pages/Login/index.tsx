import { Envelope, Eye, EyeSlash, Lock } from "phosphor-react";
import { useState } from "react";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import { useAuth } from "../../hooks/auth";

import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { SignInParams } from "../../services/user";
import DialogCustom from "../../components/Dialog";
import DialogInfo from "../../components/Dialog";
import { InputFormik } from "../../components/Forms/InputFormik";

export default function Login() {

  const [isVisibile, setIsVisible] = useState(false);
  const toogleVisiblePassword = () => setIsVisible((prevIsVisible) => !prevIsVisible);
  const { signIn } = useAuth();

  async function handleSingIn(values: any) {

    const result = await signIn(
      values.email,
      values.password
    )
  }

  const formik = useFormik<SignInParams>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      handleSingIn(values);
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Digite um e-mail valido').required('O campo é obrigatório'),
      password: yup.string().required('O campo é obrigatório').min(3, 'O campo precisa de no minimo 3 caracteres')
    })
  });

  return (
    <div className="bg-bg flex flex-col items-center min-h-screen">
      <div className="flex flex-1 w-full p-8 max-w-[1000px]">
        <div className="flex flex-1 flex-col justify-center w-full pt-[28px] pl-0 pb-[50px]">
          <div className="flex flex-row justify-center items-center max-md:flex-col">
            <div className="max-w-[480px] w-full self-center flex flex-col">
              <h1 className="text-nuWhite font-bold text-5xl leading-[64px] text-nuGray max-[450px]:text-[30px] max-[450px]:leading-10">
                Faça seu login na plataforma
              </h1>
            </div>
            <div className="bg-bgCard p-16 max-w-[480px] rounded w-full max-md:px-7">
              {/* <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <section className="grid grid-rows-1 gap-3">
                <Input
                  type='email'
                  placeholder='E-mail'
                  id='email'
                  name="email"
                  errors={`${formik.touched.email && formik.errors.email ? formik.errors.email : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  leftIcon={
                    <Envelope size={20} />
                  }
                />
                <Input
                  id='password'
                  name="password"
                  placeholder="Password"
                  type={isVisibile ? 'text' : 'password'}
                  rightIcon={
                    isVisibile ?
                      <Eye onClick={toogleVisiblePassword} size={20} /> :
                      <EyeSlash onClick={toogleVisiblePassword} size={20} />
                  }
                  leftIcon={
                    <Lock size={20} />
                  }
                  errors={`${formik.touched.password && formik.errors.password ? formik.errors.password : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </section>
              <DialogInfo
                  title="Forget Password"
                  message="Method not implemented yet"
                  openChild={
                    <a className="block text-sm font-semibold mt-2 mr-0 mb-6 opacity-80 transition-all ease-in text-nuPurple hover:opacity-100">Esqueci minha senha</a>
                  }
                />
              <Button>ENTRAR</Button>
              <div className="block text-nuGray text-center mt-6">
                Não tem uma conta?
                <DialogInfo
                  title="Create Account"
                  message="Method not implemented yet"
                  openChild={
                    <a className="text-sm font-semibold opacity-80 transition-all ease-in text-nuPurple hover:opacity-100"> Registre-se</a>
                  }
                />
              </div>
              <div className="text-sm text-nuGray my-6 mx-0 text-center h-[0.1px] bg-nuGray"></div>
              <div className="flex items-center">
                <div className="text-nuGray text-sm whitespace-nowrap mr-6">
                  Ou entre com
                </div>
                <DialogInfo
                  title="GITHUB"
                  message="Method not implemented yet"
                  openChild={<Button>GITHUB</Button>}
                />
              </div>
            </form> */}

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={yup.object().shape({
                  email: yup.string().email('Digite um e-mail valido').required('O campo é obrigatório'),
                  password: yup.string().required('O campo é obrigatório').min(3, 'O campo precisa de no minimo 3 caracteres')
                })}
                onSubmit={(values) => {
                  handleSingIn(values);
                }}
              >
                {({ }) => (
                  <Form>
                    <section className="grid grid-rows-1 gap-3">
                      <InputFormik
                        type='email'
                        placeholder='E-mail'
                        id='email'
                        name="email"
                        label="Email"
                        leftIcon={
                          <Envelope size={20} />
                        }
                      />
                      <InputFormik
                        id='password'
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type={isVisibile ? 'text' : 'password'}
                        rightIcon={
                          isVisibile ?
                            <Eye onClick={toogleVisiblePassword} size={20} /> :
                            <EyeSlash onClick={toogleVisiblePassword} size={20} />
                        }
                        leftIcon={
                          <Lock size={20} />
                        }
                      />
                    </section>
                    <DialogInfo
                      title="Forget Password"
                      message="Method not implemented yet"
                      openChild={
                        <a className="block text-sm font-semibold mt-2 mr-0 mb-6 opacity-80 transition-all ease-in text-nuPurple hover:opacity-100">Esqueci minha senha</a>
                      }
                    />
                    <Button type="submit">ENTRAR</Button>
                    <div className="block text-nuGray text-center mt-6">
                      Não tem uma conta?
                      <DialogInfo
                        title="Create Account"
                        message="Method not implemented yet"
                        openChild={
                          <a className="text-sm font-semibold opacity-80 transition-all ease-in text-nuPurple hover:opacity-100"> Registre-se</a>
                        }
                      />
                    </div>
                    <div className="text-sm text-nuGray my-6 mx-0 text-center h-[0.1px] bg-nuGray"></div>
                    <div className="flex items-center">
                      <div className="text-nuGray text-sm whitespace-nowrap mr-6">
                        Ou entre com
                      </div>
                      <DialogInfo
                        title="GITHUB"
                        message="Method not implemented yet"
                        openChild={
                          <div className="w-full">
                            <Button id="button" type="button">GITHUB</Button>
                          </div>
                        }
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}