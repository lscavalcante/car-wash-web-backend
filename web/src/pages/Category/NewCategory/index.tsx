import { useFormik } from "formik";
import { ChangeMeta, NumberFormatBase, NumericFormat } from "react-number-format";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Forms/Input";
import * as yup from 'yup';
import { CreateServiceCategory, CreateServiceCategoryParams } from "../../../services/servicesCategory/createServiceCategory";
import { toast } from "react-toastify";

export default function NewCategoryPage() {

  const navigate = useNavigate();

  const cancel = () => navigate(-1);

  const priceToDouble = (value: string): number => {
    if (value.length <= 0) return 0.00

    return Number(value.replaceAll('R$', '').replaceAll('.', '').replaceAll(',', '.').trim());
  }

  const handlePriceChange = (value: any) => {

    const instance = new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: "BRL",
    });

    return instance.format(value.replace(/\D/g, '') / 100);
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      price: handlePriceChange('0'),
    },
    onSubmit: async values => {
      try {
        const { price, ...props } = values
        await CreateServiceCategory({
          price: parseFloat(price.replaceAll('.', '').replaceAll('R$', '').replaceAll(',', '.').trim()),
          ...props
        })
        toast.success('Category created successfully')
        navigate(-1);
      } catch (error) {
        toast.error('Erro when try create a new category')
      }

    },
    validationSchema: yup.object().shape({
      title: yup.string().required('O campo é obrigatório').min(5, 'Min length 5 digits'),
      price: yup.string()
        .test('is-valid-price', 'O valor não pode ser menor ou igual a 0', function (value: any) {
          const newValue = value.replace(/\D/g, '');
          if (newValue <= 0 || newValue == undefined || newValue == null) {
            return false;
          }
          return true;
        })
        .required('Price is required'),
    })
  });

  return <>
    <div className="h-screen w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-[450px] py-10 mx-auto">
          <h1 className="text-white mb-4 col-start-2">
            Category
          </h1>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-3 w-full">
            <div className="col-span-2">
              <Input
                placeholder="Title"
                id='title'
                name="title"
                errors={`${formik.touched.title && formik.errors.title ? formik.errors.title : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Price"
                id='price'
                name="price"
                errors={`${formik.touched.price && formik.errors.price ? formik.errors.price : ''}`}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                onChange={(e) => {
                  const price = handlePriceChange(e.target.value)
                  formik.setFieldValue('price', price);
                }}
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