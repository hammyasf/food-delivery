import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useRegisterMutation } from "../generated/graphql";

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null]),
});

export function RegisterForm() {
  const [register, { loading }] = useRegisterMutation();
  const formBackground = useColorModeValue("white", "gray.700");
  const toast = useToast();
  const history = useHistory();
  const [isRestaurant, setIsRestaurant] = useState(false);

  async function onSubmit(data: any, { setSubmitting }: any) {
    setSubmitting(true);
    const response = await register({
      variables: {
        username: data.username,
        password: data.password,
        restaurant: isRestaurant,
      },
    });
    console.log({ response });
    if (response.data?.register.errors) {
      toast({
        title: "Register Failed.",
        description: "Username is already taken.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setSubmitting(false);
      return;
    }
    toast({
      title: "Register Successful.",
      description: "Login to continue.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    history.push("/login");

    return;
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirm_password: "",
          restaurant: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting, errors, dirty }) => (
          <Box rounded={"lg"} bg={formBackground} boxShadow={"lg"} p={8}>
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Stack spacing={4}>
                <pre>{JSON.stringify(values, null, 2)}</pre>
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
                <FormControl id="confirm_password">
                  <FormLabel>Confirm Password</FormLabel>
                  <Field
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    as={Input}
                  />
                </FormControl>
                <FormControl
                  display="flex"
                  alignItems="center"
                  name="restaurant"
                >
                  <FormLabel htmlFor="restaurant" mb="0">
                    Enable Restaurant User?
                  </FormLabel>
                  <Switch
                    id="restaurant"
                    name="restaurant"
                    onChange={(e) => {
                      setIsRestaurant(e.target.checked);
                    }}
                  />
                </FormControl>
                <Button
                  disabled={
                    errors.username ||
                    errors.password ||
                    errors.confirm_password ||
                    !dirty
                      ? true
                      : false
                  }
                  type="submit"
                  colorScheme="teal"
                  mb={6}
                  isLoading={loading}
                  loadingText={"Logging In"}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  );
}
