import { FileSearch, MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import Table from "../../components/Table";
import PaginationModel from "../../models/pagination";
import { VehicleModel } from "../../models/vehicle";
import { GetVehicles } from "../../services/vehicles";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const timeoutRef = useRef<any>()
  const toogleBack = () => navigate('/', { replace: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [paginationVehicles, setPaginationVehicles] = useState<PaginationModel<VehicleModel[]>>(
    {
      count: 1,
      results: [],
    }
  );

  useEffect(() => {
    getVehicles();
  }, []);

  const handleSearch = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      setCurrentPage(1)
      await getVehicles(1)
    }, 1000)
  }

  const handleNextPage = async (data: number) => {
    setCurrentPage(data)
    await getVehicles(data)
  }

  async function getVehicles(page?: number) {
    try {
      const result = await GetVehicles({
        page: page ?? currentPage,
        search: search
      })
      setPaginationVehicles(result)
    } catch (error) {
      toast.error('Failed to get vehicles')
    }
  }

  return <>
    <div>
      <div className="w-full container mx-auto">
        <div className="m-3 grid gap-3 grid-cols-4 justify-between max-sm:grid-cols-1">
          <Button
            onClick={toogleBack}>VOLTAR
          </Button>
          <div className="col-span-full col-start-3 max-sm:col-start-auto">
            <div className="flex flex-row gap-3 items-center">
              <div className="flex-1">
                <Input
                  leftIcon={<MagnifyingGlass size={20} />}
                  placeholder="Teste, teste@teste.com ..."
                  type={"search"}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
              <Link to={'new'}>
                <Plus className="bg-nuPurple rounded text-white cursor-pointer hover:opacity-75" size={33} weight="duotone" />
              </Link>
            </div>
          </div>
        </div>
        <Table
          data={paginationVehicles['results']}
          count={paginationVehicles['count']}
          onPageChange={(page: number) => handleNextPage(page)}
          currentPage={currentPage}
          tableBodies={
            [
              'id',
              'owner_email',
              'owner_full_name',
              'name',
              'board',
              'year',
              'washes',
              'fix',
              {
                base: "/vehicles",
                param: `id`,
                // icon: <VisibilityIcon />
              },
            ]
          }
          tableHeaders={["id", "Owner Email", "Onwer Name", "Name", "Board", "year", "washes", "fix", "options"]}
        />
      </div>
    </div>
  </>
}