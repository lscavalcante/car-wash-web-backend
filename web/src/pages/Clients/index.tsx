import { FileSearch, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import Table from "../../components/Table";
import PaginationModel from "../../models/pagination";
import { UserModel } from "../../models/user";
import { GetClients } from "../../services/user";

export default function ClientsPage() {
  const navigate = useNavigate();
  const toogleBack = () => navigate('/', { replace: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllClients();
  }, [currentPage]);

  const [paginationClients, setPaginationClients] = useState<PaginationModel<UserModel[]>>(
    {
      count: 1,
      results: [],
    }
  );

  async function getAllClients() {
    try {
      const result = await GetClients({
        page: currentPage,
        search: search,
      });
      setPaginationClients(result)

    } catch (error) {
      toast.error('Failed to get categories')
    }
  }

  return <>
    <div>
      <div className="w-full container mx-auto">
        <div className="m-3 grid gap-3 grid-cols-4 justify-between max-sm:grid-cols-1">
          <div className="">
            <Button
              onClick={toogleBack}>VOLTAR
            </Button>
          </div>
          <div className="col-span-full col-start-3 max-sm:col-start-auto">
            <Input
              leftIcon={<MagnifyingGlass size={20} />}
              placeholder="admin@admin.com, client@client.com ...."
              type={"search"}
            />
          </div>
        </div>
        <Table
          data={paginationClients['results']}
          count={paginationClients['count']}
          onPageChange={(page: number) => setCurrentPage(page)}
          currentPage={currentPage}
          tableBodies={
            ['id', 'email', 'cpf',
              {
                base: "/user",
                param: `id`,
                // icon: <VisibilityIcon />
              },
            ]
          }
          tableHeaders={["id", "email", 'cpf', 'option']}
        />
      </div>


    </div>
  </>
}