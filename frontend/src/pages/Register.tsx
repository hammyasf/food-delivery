import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useMeQuery } from "../generated/graphql";
import { getIsAuthenticated } from "../utils/isAuthenticated";

export function Register() {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const { data } = useMeQuery();
  if (data?.me) {
    return <Redirect to="/" />;
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register for a new account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start orderings from the best{" "}
            <Link color={"blue.400"}>restaurants</Link>.
          </Text>
        </Stack>
        <RegisterForm />
      </Stack>
    </Flex>
  );
}
