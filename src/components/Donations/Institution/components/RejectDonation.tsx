import { Text, Button } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { initialValues, rejectDonationFields } from '../constants';
import { createField, formatRejectDonationFormData, getCookie, validateRejectDonationFields } from '../utils';
import { RejectDonationFields } from '../types';
import axios from 'axios';
import { endpoints } from "../../../../api";

export const RejectDonation = ({idDonacion}: {idDonacion: number}) => {
  const fields = [...rejectDonationFields];

  const handleSubmit = async (formValues: RejectDonationFields, actions: FormikHelpers<RejectDonationFields>) => {
    const erroredFields = validateRejectDonationFields(formValues);
    if (erroredFields.length <= 0) {
      try {
        const formattedData = formatRejectDonationFormData(formValues);
        console.log(formattedData);
        const res = await axios.put(
          endpoints.donacionesPendientes+idDonacion.toString()+'/rechazar/',
          formattedData,
          {
            withCredentials: true, headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': getCookie("csrftoken"), // added the csrf cookie header
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
      <Text>Componente de rechazo de donacion</Text>
      <Text>Ingrese Motivo de Rechazo: </Text>
      <Text>{idDonacion}</Text>
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
