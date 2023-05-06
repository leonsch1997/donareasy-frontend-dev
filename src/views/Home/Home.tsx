import { HomeViewProps } from "./types";
import { InstitutionMain, DonorMain, CadetMain } from "../../components";
import { useCookies } from "react-cookie";

enum UserType {
  cadete = "cadete",
  donantes = "donantes",
  Instituciones = "Instituciones",
}

export const Home: React.FC = (props: HomeViewProps) => {
  const [
    {
      clientSession: { group },
    },
  ] = useCookies();

  const views = {
    cadete: <CadetMain {...props} />,
    donantes: <DonorMain {...props} />,
    Instituciones: <InstitutionMain {...props} />,
  };

  return views[group as UserType];
};
