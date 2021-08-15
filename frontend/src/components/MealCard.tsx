import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Tag,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteMealModal } from "./DeleteMealModal";
import { DeleteRestaurantModel } from "./DeleteRestaurantModal";
import { UpdateMealModal } from "./UpdateMealModal";
import { UpdateRestaurantModal } from "./UpdateRestaurantModel";

interface Props {
  title: string;
  description: string;
  price: number;
  onEdit: Function;
  onDelete: Function;
  id: number;
}

export function MealCard({
  title,
  description,
  id,
  onEdit,
  onDelete,
  price,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  return (
    <>
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
          style={{
            backgroundImage: `url('https://picsum.photos/256?${title}')`,
          }}
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
          <Flex mt={3}>
            <ButtonGroup size="xs">
              <Tag colorScheme="blue">${price}</Tag>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="green"
                onClick={onOpen2}
              >
                Edit
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={onOpen}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </Flex>
      <DeleteMealModal
        id={id}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
      <UpdateMealModal
        id={id}
        isOpen={isOpen2}
        onEdit={onEdit}
        onClose={onClose2}
        name2={title}
        description2={description}
        price2={price}
      />
    </>
  );
}
