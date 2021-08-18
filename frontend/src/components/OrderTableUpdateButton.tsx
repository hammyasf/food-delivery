import { CheckIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { getNextStatus, getStatusColor } from "../constants/statusColors";
import { useUpdateOrderMutation } from "../generated/graphql";

interface Props {
  id: number;
  current_status: string;
  onClick?: Function;
}

export function OrderTableUpdateButton({ onClick, id, current_status }: Props) {
  const [updateOrder, { loading }] = useUpdateOrderMutation();
  const toast = useToast();

  return (
    <Button
      size="sm"
      leftIcon={<CheckIcon />}
      colorScheme={getStatusColor(getNextStatus(current_status))}
      variant="outline"
      loadingText="Canceling"
      isLoading={loading}
      onClick={async () => {
        await updateOrder({ variables: { id: id } });
        toast({
          title: "Order Updated.",
          description: "We've updated the order for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onClick) {
          onClick();
        }
      }}
    >
      Mark {getNextStatus(current_status)}
    </Button>
  );
}
