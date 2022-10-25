import { CadetHomeView } from './Cadet';
import { DonorHomeView } from './Donor';
import { HomeViewProps } from './types';
import { InstitutionHomeView } from './Institution';

const userType = 'donante';

export const HomeView: React.FC = (props: HomeViewProps) => {
  const views = {
    cadete: <CadetHomeView {...props}/>,
    donante: <DonorHomeView {...props}/>,
    institucion: <InstitutionHomeView {...props}/>
  };

  return views[userType]
}
