import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useDeleteRestaurantMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onDelete: Function;
  id: number;
}

export function DeleteRestaurantModel({
  isOpen,
  onClose,
  onDelete,
  id,
}: Props) {
  const [deleteRestaurant, { loading }] = useDeleteRestaurantMutation();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Restaurant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">Are you Sure?</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => onClose()}>
            Close
          </Button>
          <Button
            colorScheme="red"
            loadingText="Deleting"
            isLoading={loading}
            onClick={async () => {
              await deleteRestaurant({ variables: { id: id } });
              onDelete();
              onClose();
            }}
          >
            Delete Restaurant
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
