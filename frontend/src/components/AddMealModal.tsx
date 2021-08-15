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
import { useAddMealMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onCreate: Function;
  restrauantId: number;
}

export function AddMealModal({
  isOpen,
  onClose,
  onCreate,
  restrauantId,
}: Props) {
  const [addMeal, { loading }] = useAddMealMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      !name ||
      !description ||
      !price ||
      name === "" ||
      description === "" ||
      parseInt(price) <= 0
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
    await addMeal({
      variables: {
        description: description,
        name: name,
        restaurantId: parseInt(restrauantId as any),
        price: parseInt(price),
      },
    });
    onCreate();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Add Meal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placehoder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placehoder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  placehoder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
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
              loadingText="Creating"
              isLoading={loading}
              disabled={disabled}
              type="submit"
            >
              Create Meal
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
