import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useCancelOrderMutation } from "../generated/graphql";

interface Props {
  id: number;
  onClick?: Function;
}

export function OrderTableCancelButton({ onClick, id }: Props) {
  const [cancelOrder, { loading }] = useCancelOrderMutation();

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
        if (onClick) {
          onClick();
        }
      }}
    >
      Cancel
    </Button>
  );
}
