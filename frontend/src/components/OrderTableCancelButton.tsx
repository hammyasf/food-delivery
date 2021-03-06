import { DeleteIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useCancelOrderMutation } from "../generated/graphql";

interface Props {
  id: number;
  onClick?: Function;
}

export function OrderTableCancelButton({ onClick, id }: Props) {
  const [cancelOrder, { loading }] = useCancelOrderMutation();
  const toast = useToast();

  return (
    <Button
      size="sm"
      leftIcon={<DeleteIcon />}
      colorScheme={"red"}
      variant="outline"
      loadingText="Canceling"
      isLoading={loading}
      onClick={async () => {
        await cancelOrder({ variables: { id: id } });
        toast({
          title: "Order canceled.",
          description: "We've canceled the order for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onClick) {
          onClick();
        }
      }}
    >
      Cancel
    </Button>
  );
}
