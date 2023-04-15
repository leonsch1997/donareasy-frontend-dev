import { VisualizarDonacion as ViewMain } from "../../components";
import { ViewDonationProps } from './types';

export const View: React.FC = (props: ViewDonationProps) => (<ViewMain {...props}/>);