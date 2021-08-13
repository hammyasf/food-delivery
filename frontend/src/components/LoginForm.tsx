import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { setAccessToken } from "../utils/accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
});

export function LoginForm() {
  const [login, { loading, client }] = useLoginMutation();
  const history = useHistory();
  const formBackground = useColorModeValue("white", "gray.700");
  const toast = useToast();

  async function onSubmit(data: any) {
    const response = await login({
      variables: {
        username: data.username,
        password: data.password,
      },
      update: async (store, { data }) => {
        if (!data || !data?.login?.user) {
          toast({
            title: "Login Failed.",
            description: "Please Check your credentials and try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
          return null;
        }
        await client.resetStore();
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: {
              id: data.login.user.id,
              username: data.login.user.username,
              type: data.login.user.type,
            },
          },
        });
      },
    });

    if (response && response.data?.login.accessToken) {
      setAccessToken(response.data.login.accessToken);
      toast({
        title: "Login Successful.",
        description: "We've successfully logged you in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      history.push("/");
    }
  }

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, dirty }) => (
          <Box rounded={"lg"} bg={formBackground} boxShadow={"lg"} p={8}>
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Field
                    name="username"
                    type="input"
                    placeholder="Username"
                    as={Input}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    as={Input}
                  />
                </FormControl>
                <Button
                  disabled={
                    errors.username || errors.password || !dirty ? true : false
                  }
                  type="submit"
                  colorScheme="teal"
                  mb={6}
                  isLoading={loading}
                  loadingText={"Logging In"}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  );
}
