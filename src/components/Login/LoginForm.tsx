import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
  Container,
  Center,
  Link,
  Alert,
  AlertIcon,
  Heading,
} from "@chakra-ui/react";

import { LoginFormValues } from "./types";
import { useLogin } from "../../hooks/useLogin";

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

export const LoginForm: React.FC = () => {
  const { logUser, error } = useLogin();
  const handleSubmit = (formValues: LoginFormValues) => logUser(formValues);

  return (
    <Container mt={50}>
      <Center>
        <Heading as="h3" size="xl">
          Iniciar sesión
        </Heading>
      </Center>

      <Box borderRadius={5} shadow={"lg"} p={5}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name="username">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="username">Usuario</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Usuario"
                      mb={3}
                    />
                    <FormErrorMessage mb={3}>
                      {form.errors?.[field.name] ?? ""}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <Input
                      type={"password"}
                      {...field}
                      id="password"
                      placeholder="password"
                      mb={error ? 3 : 0}
                    />
                    <FormErrorMessage mb={3}>
                      {form.errors?.[field.name] ?? ""}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Center>
                <Button
                  mt={4}
                  colorScheme="pink"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
      <Box borderRadius={5} shadow={"md"} p={5}>
        Ingrese sus credenciales para acceder al sistema. <br />
        Si no tienes cuenta puedes{" "}
        <Link color={"blue"} href="/logup">
          crear una aquí
          <ExternalLinkIcon mb={1} ml={1} />
        </Link>
        <br />
        Puede recuperar sus credenciales en caso de olvido{" "}
        <Link color={"blue"} href="/forgot-password">
          aquí
          <ExternalLinkIcon mb={1} ml={1} />
        </Link>
      </Box>
    </Container>
  );
};
