import { Formik, Form } from "formik";
import Button from "../../components/Buttons/Button";
import { InputFormik } from "../../components/Forms/InputFormik";
import { useAuth } from "../../hooks/auth";

export default function SearchPage() {

  const { signOut } = useAuth()

  function handleSigOut() {
    signOut()
  }

  return <div className="min-h-screen w-full">
    <div className="container mx-auto">
      <Formik
        initialValues={{
          cod_search: ''
        }}
        onSubmit={() => { }}
      >
        {({ }) => (
          <Form autoComplete="false" className="min-h-screen px-3 flex flex-col justify-center w-full space-y-7">
            <h1 className="text-white text-2xl text-center">
              Digite o seu código de busca para que possamos trazer os seus chamados em aberto.
            </h1>
            <InputFormik
              name="cod_search"
              label="Código de busca"
              placeholder="Digite o seu código de busca..."
            />
            <section className="flex flex-col space-y-3">
              <Button type="submit">
                Pesquisar
              </Button>
              <Button type="button" onClick={handleSigOut}>
                Exit
              </Button>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  </div>
}