import { LanderViewProps } from './types';
import { Lander as LanderMain } from '../../components';

export const Lander: React.FC = (props: LanderViewProps) => (<LanderMain {...props}/>);