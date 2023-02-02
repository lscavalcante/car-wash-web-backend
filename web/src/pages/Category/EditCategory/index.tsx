import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Forms/Input";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { GetServiceCategoryById } from "../../../services/servicesCategory";
import { ServiceCategory } from "../../../models/serviceCategory";
import { UpdateServiceCategory, UpdateServiceCategoryParams } from "../../../services/servicesCategory/updateServiceCategory";
import { toast } from "react-toastify";

export default function EditCategoryPage() {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');

  let { id } = useParams();
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(
    {
      title: '',
      price: 0,
      id: 0,
    }
  );

  useEffect(() => {
    getServiceCategory()
  }, [])

  const handlePriceChange = (value: any) => {

    const instance = new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: "BRL",
    });

    return instance.format(value.replace(/\D/g, '') / 100);
  }

  const getServiceCategory = async () => {
    const result: ServiceCategory = await GetServiceCategoryById({ id: String(id) });
    setServiceCategory(result)
  }

  const toogleBack = () => navigate(-1);

  const updateServiceCategory = async (params: UpdateServiceCategoryParams) => {
    try {
      await UpdateServiceCategory(params).then()
      toast.success('Atualizado com sucesso')
      navigate(-1);
    } catch (error) {
      toast.error(String(error))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: serviceCategory.title,
      price: handlePriceChange(String(serviceCategory.price)),
    },
    onSubmit: async values => {
      try {
        const {  price, ...props } = values
        await updateServiceCategory({
          id: Number(id),
          price: parseFloat(price.replaceAll('.', '').replaceAll('R$', '').replaceAll(',', '.').trim()),
          ...props
        })
      } catch (error) {
        toast.error('Failed to edit category')
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
                  <Button type="button" onClick={toogleBack}>
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