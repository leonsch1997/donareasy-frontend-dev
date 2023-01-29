import { CadetHomeView } from './Cadet';
import { DonorHomeView } from './Donor';
import { HomeViewProps } from './types';
import { InstitutionMain } from '../../components';

const userType = 'institucion'; // Hacer dinámico en base al rol devuelto por el BE

export const HomeView: React.FC = (props: HomeViewProps) => {
  const views = {
    cadete: <CadetHomeView {...props}/>,
    donante: <DonorHomeView {...props}/>,
    institucion: <InstitutionMain {...props}/>
  };

  return views[userType]
}
