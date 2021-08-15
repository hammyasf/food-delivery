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
import { useUpdateRestaurantMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onEdit: Function;
  id: number;
  name2: string;
  description2: string;
}

export function UpdateRestaurantModal({
  isOpen,
  onClose,
  onEdit,
  id,
  name2,
  description2,
}: Props) {
  const [addRestaurant, { loading }] = useUpdateRestaurantMutation();
  const [name, setName] = useState(name2);
  const [description, setDescription] = useState(description2);
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
      variables: { description: description, name: name, id: id },
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
