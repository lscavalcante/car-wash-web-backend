import { format, parseISO } from "date-fns";
import { FileSearch, MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import Table from "../../components/Table";
import PaginationModel from "../../models/pagination";
import { ServiceModel } from "../../models/service";
import { GetServices } from "../../services/services";

export default function ServicePage() {
  const navigate = useNavigate();
  const toogleBack = () => navigate('/', { replace: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllServices();
  }, [currentPage]);

  const [paginationService, setPaginationService] = useState<PaginationModel<ServiceModel[]>>(
    {
      count: 1,
      results: [],
    }
  );

  async function getAllServices() {
    try {
      const result: PaginationModel<ServiceModel[]> = await GetServices(
        {
          page: currentPage,
          search: search
        }
      )


      var formattedList = [...result.results, result.results.map(value => {
        value.date_start = format(parseISO(value.date_start), "dd/MM/yyyy"),
          value.date_end = format(parseISO(value.date_end), "dd/MM/yyyy hh:mm")
      })]


      setPaginationService(result)

    } catch (error) {
      toast.error('Failed to get services')
    }
  }
  return <>
    <div className="w-full container mx-auto">
      <div className="m-3 grid gap-3 grid-cols-4 justify-between max-sm:grid-cols-1">
        <div className="">
          <Button
            onClick={toogleBack}>VOLTAR
          </Button>
        </div>
        <div className="col-span-full col-start-3 max-sm:col-start-auto">
          <div className="flex flex-rows items-center space-x-2">
            <div className="flex-1">
              <Input
                leftIcon={<MagnifyingGlass size={20} />}
                placeholder="Reparo de carro, Limpeza de carpete, protocoloxxxxx..."
                type={"search"}

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
        data={paginationService['results']}
        count={paginationService['count']}
        onPageChange={(page: number) => setCurrentPage(page)}
        currentPage={currentPage}
        tableBodies={[
          "id",
          "title",
          "date_start",
          "date_end",
          "protocol",
          "client",
          "created_by",
          "vehicle",
          "finish",
          {
            base: "/services",
            param: `id`,
            // icon: <VisibilityIcon />
          },
        ]}
        tableHeaders={["id", "Title", "Start", "End ", "Protocol", "Client", "Created By", "vehicle", "Finish", 'Option']}
      />
    </div>
  </>
}