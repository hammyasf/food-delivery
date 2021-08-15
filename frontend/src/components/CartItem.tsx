import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  useColorModeValue,
  Heading,
  Flex,
  IconButton,
} from "@chakra-ui/react";

interface Props {
  name: string;
  description: string;
  price: number;
  onRemove: Function;
}

export function CartItem({ name, description, price, onRemove }: Props) {
  return (
    <Flex
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="2xl"
      rounded={"md"}
      overflow="hidden"
      height={"100px"}
    >
      <Box
        w={1 / 3}
        bgSize="cover"
        style={{ backgroundImage: `url('https://picsum.photos/256?${name}')` }}
      ></Box>
      <Box w={"full"}>
        <Stack p={6}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"lg"}
            fontFamily={"body"}
          >
            {name}
          </Heading>
          {/* <Text color={"gray.500"} fontSize="sm">
          {description}
        </Text> */}
          <Box fontSize="lg" color={useColorModeValue("gray.800", "white")}>
            <Box as="span" color={"gray.600"} fontSize="lg">
              £
            </Box>
            {price.toFixed(2)}
          </Box>
        </Stack>
      </Box>
      <Box w={1 / 4} alignSelf="center" justifySelf="center" mr={2}>
        <IconButton
          w={6}
          bg="red.500"
          color="white"
          aria-label={"Remove Item"}
          icon={<DeleteIcon />}
          onClick={() => onRemove()}
        />
      </Box>
    </Flex>
  );
}
