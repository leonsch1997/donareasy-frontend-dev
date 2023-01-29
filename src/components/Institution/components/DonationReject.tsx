import { Button } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { initialValues, rejectDonationFields } from '../constants';
import { createField, formatRejectDonationFormData, validateRejectDonationFields } from '../utils';
import { RejectDonationFields } from '../types';
import axios from 'axios';
import { endpoints } from "../../../api";
import { useCookies } from 'react-cookie';

export const RejectDonation = ({idDonacion}: {idDonacion: number}) => {
  const [cookies] = useCookies();
  const fields = [...rejectDonationFields];

  const handleSubmit = async (formValues: RejectDonationFields, actions: FormikHelpers<RejectDonationFields>) => {
    const erroredFields = validateRejectDonationFields(formValues);
    if (erroredFields.length <= 0) {
      try {
        const formattedData = formatRejectDonationFormData(formValues);
        const res = await axios.put(
          endpoints.donacionesPendientes+idDonacion.toString()+'/rechazar/',
          formattedData,
          {
            withCredentials: true, headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': cookies["csrftoken"] ?? 'ERROR CRF TOKEN', // added the csrf cookie header
          },}).then((res) => res.data);
        console.log(res);
        console.log(formattedData);
      } catch (e) {
        console.log(e)
      }
    } else {
      erroredFields.forEach(({ name }) => {
        actions.setFieldError(name, `${name}-has an error`)
      }) 
    }
  };
  
  return (
    <div>
      <p>Componente de rechazo de donacion</p>
      <p>Ingrese Motivo de Rechazo: </p>
      <p>{idDonacion}</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          {fields.map((fieldData, idx) => createField({...fieldData, idx }))}
          <Button
            mt={4}
            colorScheme='pink'
            type='submit'
            isLoading={isSubmitting}
          >
            Rechazar
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
}
