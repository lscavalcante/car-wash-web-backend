import { MagnifyingGlass, Plus } from "phosphor-react";
import jwt_decode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import Table from "../../components/Table";
import PaginationModel from "../../models/pagination";
import { ServiceCategory } from "../../models/serviceCategory";
import { GetServicesCategory } from "../../services/servicesCategory";
import { toast } from "react-toastify";

export default function CategoryPage() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams({ ['search']: '', ['page']: String(1) });
  const timeoutRef = useRef<any>()
  const [page, setPage] = useState(queryParams.get('page') ? Number(queryParams.get('page')) : 1);
  const [search, setSearch] = useState(queryParams.get('search') ?? '');
  const [pagination, setPagination] = useState<PaginationModel<ServiceCategory[]>>(
    {
      count: 1,
      results: [],
    }
  );

  useEffect(() => {
    getCategory();
  }, []);

  const toogleBack = () => navigate('/', { replace: true });

  async function getCategory(currentPage?: number) {
    try {
      const result = await GetServicesCategory(
        {
          page: currentPage ?? page,
          search: search
        }
      )
      setPagination(result)

    } catch (error) {
      toast.error('Failed to get category')
    }
  }

  const handleSearch = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      setPage(1)
      setQueryParams({ ['search']: search, ['page']: String(1) })
      await getCategory(1)
    }, 1000)
  }

  const handleNextPage = async (currentPage: number) => {
    setPage(currentPage)
    setQueryParams({ ['search']: search, ['page']: String(currentPage) })
    await getCategory(currentPage)
  }

  return <>
    <div>
      <div className="w-full container mx-auto">
        <div className="m-3 grid gap-3 grid-cols-4 justify-between max-sm:grid-cols-1">
          <Button
            onClick={toogleBack}>VOLTAR
          </Button>
          <div className="col-span-full col-start-3 max-sm:col-start-auto">
            <div className="flex flex-row items-center gap-3">
              <div className="flex-1">
                <Input
                  name="search"
                  leftIcon={<MagnifyingGlass size={20} />}
                  placeholder="Limpeza e etc..."
                  type={"search"}
                  onChange={(e) => { setSearch(e.target.value) }}
                  onKeyUp={() => handleSearch()}
                  value={search}
                />
              </div>
              <Link to='new'>
                <Plus
                  className="bg-nuPurple rounded-lg text-white cursor-pointer hover:opacity-75" size={33} weight="duotone"
                />
              </Link>
            </div>
          </div>
        </div>
        <Table
          data={pagination['results']}
          count={pagination['count']}
          onPageChange={handleNextPage}
          currentPage={page}
          tableHeaders={["id", "title", "price", "option"]}
          tableBodies={[
            'id',
            'title',
            'price',
            {
              base: "/categories",
              param: `id`,
            },
          ]}
        />
      </div>
    </div>
  </>
}