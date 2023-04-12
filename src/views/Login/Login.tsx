import { LoginViewProps } from './types';
import { LoginForm as LoginMain } from '../../components';

export const Login: React.FC = (props: LoginViewProps) => (<LoginMain {...props}/>);