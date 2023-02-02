import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const backtoHome = () => navigate(-1);


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-w-[300px] text-center">
        <h1 className="text-nuWhite font-bold text-5xl leading-[64px] text-nuGray max-[450px]:text-[30px] max-[450px]:leading-10 mb-10">
          Pagina nāo encontrada...
        </h1>
        <Button onClick={backtoHome}>
          Clique aqui para voltar
        </Button>
      </div>
    </div>
  )
}