import { HomeViewProps } from './types';
import { InstitutionMain, DonorMain, CadetMain } from '../../components';

const userType = 'institucion'; // Hacer dinámico en base al rol devuelto por el BE

export const Home: React.FC = (props: HomeViewProps) => {
  const views = {
    cadete: <CadetMain {...props}/>,
    donante: <DonorMain {...props}/>,
    institucion: <InstitutionMain {...props}/>
  };

  return views[userType]
}
