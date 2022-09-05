import { CodeForm, UsernameForm, CreatePasswordForm } from './Forms';

import { authSelector, recoverPasswordSelector } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const RecoverSteps = () => {
  const currentStep = useSelector(recoverPasswordSelector);
  const authToken = useSelector(authSelector);
  const navigate = useNavigate()
  console.log('currentStep', currentStep, 'authToken', authToken);

  const Wrapper = () => {
    if (currentStep === 0) return null;
    if (currentStep === 1) return <UsernameForm />;
    if (currentStep === 2) return <CodeForm />;
    if (currentStep === 3) return <CreatePasswordForm />;

    console.log('Error en paso', currentStep)
    return null;
  }

  return (
    <>
      <Wrapper />
    </>
  )
};