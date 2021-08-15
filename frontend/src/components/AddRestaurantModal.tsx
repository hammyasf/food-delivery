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
import { useAddRestaurantMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onCreate: Function;
}

export function AddRestaurantModal({ isOpen, onClose, onCreate }: Props) {
  const [addRestaurant, { loading }] = useAddRestaurantMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!name || !description || name === "" || description === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, description]);

  async function onSubmit(e: any) {
    e.preventDefault();
    if (!name || !description) {
      return;
    }
    await addRestaurant({
      variables: { description: description, name: name },
    });
    onCreate();
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
              Create Restaurant
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
