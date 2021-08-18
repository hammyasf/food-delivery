import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useUpdateMealMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onEdit: Function;
  id: number;
  name2: string;
  description2: string;
  price2: number;
}

export function UpdateMealModal({
  isOpen,
  onClose,
  onEdit,
  id,
  name2,
  description2,
  price2,
}: Props) {
  const [updateMeal, { loading }] = useUpdateMealMutation();
  const [name, setName] = useState(name2);
  const [description, setDescription] = useState(description2);
  const [price, setPrice] = useState(price2.toString());
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      !name ||
      !description ||
      !price ||
      name === "" ||
      description === "" ||
      parseInt(price as any) <= 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, description, price]);

  async function onSubmit(e: any) {
    e.preventDefault();
    if (!name || !description) {
      return;
    }
    await updateMeal({
      variables: {
        description: description,
        name: name,
        id: id,
        price: parseInt(price as any),
      },
    });
    onEdit();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Add Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placehoder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placehoder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  placehoder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  value={price}
                  required
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => onClose()}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              loadingText="Updating"
              isLoading={loading}
              disabled={disabled}
              type="submit"
            >
              Update Restaurant
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
