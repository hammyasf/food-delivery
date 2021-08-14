import { Box, chakra, Flex, useColorModeValue } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  price?: number;
  buttonText?: string;
}

export function Card({ title, description, price, buttonText }: Props) {
  const priceColor = useColorModeValue("gray.800", "white");
  return (
    <Flex
      width="full"
      maxW={"md"}
      bg={useColorModeValue("white", "gray.800")}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <Box
        w={1 / 3}
        bgSize="cover"
        style={{ backgroundImage: `url('https://picsum.photos/256?${title}')` }}
      ></Box>

      <Box w={2 / 3} p={{ base: 4, md: 4 }}>
        <chakra.h1
          fontSize="2xl"
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
        >
          {title}
        </chakra.h1>
        <chakra.p
          mt={2}
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {description}
        </chakra.p>
        {price && buttonText ? (
          <Flex mt={3} alignItems="center" justifyContent="space-between">
            <chakra.h1 color={priceColor} fontWeight="bold" fontSize="lg">
              ${price}
            </chakra.h1>
            <chakra.button
              px={2}
              py={1}
              bg="white"
              fontSize="xs"
              color="gray.900"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "gray.200",
              }}
              _focus={{
                bg: "gray.400",
              }}
            >
              {buttonText}
            </chakra.button>
          </Flex>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
}
