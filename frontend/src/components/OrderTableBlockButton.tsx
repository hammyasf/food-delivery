import { DeleteIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useBlockUserMutation } from "../generated/graphql";

interface Props {
  id: number;
  userId: number;
  onClick?: Function;
}

export function OrderTableBlockButton({ onClick, id, userId }: Props) {
  const [blockUser, { loading }] = useBlockUserMutation();
  const toast = useToast();

  return (
    <Button
      size="sm"
      leftIcon={<DeleteIcon />}
      colorScheme={"red"}
      variant="outline"
      loadingText="Blocking"
      isLoading={loading}
      onClick={async () => {
        await blockUser({ variables: { id: id, userId: userId } });
        toast({
          title: "User blocked.",
          description: "We've blocked the user for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onClick) {
          onClick();
        }
      }}
    >
      Block User
    </Button>
  );
}
