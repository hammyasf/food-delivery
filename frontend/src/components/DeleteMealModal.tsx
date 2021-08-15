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
import { useDeleteMealMutation } from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: Function;
  onDelete: Function;
  id: number;
}

export function DeleteMealModal({ isOpen, onClose, onDelete, id }: Props) {
  const [deleteRestaurant, { loading }] = useDeleteMealMutation();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Meal</ModalHeader>
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
