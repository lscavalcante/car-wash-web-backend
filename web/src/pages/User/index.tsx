import debounce from "lodash.debounce";
import { FileSearch, MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Forms/Input";
import Table from "../../components/Table";
import PaginationModel from "../../models/pagination";
import { UserModel } from "../../models/user";
import { GetAllUsers } from "../../services/user";

export default function UserPage() {
  const navigate = useNavigate();
  const timeoutRef = useRef<any>()
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [paginationUser, setPaginationUser] = useState<PaginationModel<UserModel[]>>(
    {
      count: 1,
      results: [],
    }
  );

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const handleSearch = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      const result = await getAllUsers()
    }, 1000)
  }

  const getAllUsers = async () => {
    try {
      const result: PaginationModel<UserModel[]> = await GetAllUsers(
        {
          page: currentPage,
          search: search
        }
      )


      setPaginationUser({
        ...result,
      })

    } catch (error) {
      toast.error('Failed to get users')
    }
  }

  const toogleBack = () => navigate('/', { replace: true });

  return (
    <div className="w-full container mx-auto">
      <div className="m-3 grid gap-3 grid-cols-4 justify-between max-sm:grid-cols-1">
        <Button
          onClick={toogleBack}>VOLTAR
        </Button>
        <div className="col-span-full col-start-3 max-sm:col-start-auto">
          <Input
            leftIcon={<MagnifyingGlass size={20} />}
            placeholder="Camaro, Bulgatti, Ferrari, Uno ...."
            type={"search"}
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <Table
        data={paginationUser['results']}
        count={paginationUser['count']}
        onPageChange={(page: number) => setCurrentPage(page)}
        currentPage={currentPage}
        tableBodies={[
          "id",
          "first_name",
          "last_name",
          "email",
          "is_client",
          "is_employee",
          {
            base: "/users",
            param: `id`,
          },
        ]}
        tableHeaders={["id", "first_name", "last_name", "email", "Client", "Employee", "Option"]}
      />
    </div>
  )
}