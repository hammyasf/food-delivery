import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Text,
  Spinner,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { getStatusColor } from "../constants/statusColors";
import { useOrdersQuery } from "../generated/graphql";

export function Orders() {
  const { data, loading } = useOrdersQuery({
    fetchPolicy: "network-only",
  });
  const bgColor = useColorModeValue("gray.300", "gray.900");

  if (loading) {
    return (
      <Box h={"calc(100vh - 60px)"}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }
  return (
    <Box p={30}>
      <Box rounded="md" bg={bgColor}>
        <Table>
          {data!.orders!.length <= 0 && (
            <TableCaption>No Orders Yet!</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Meals</Th>
              <Th>Restaurant</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.orders?.map((order) => (
              <Tr key={order.id}>
                <Td>
                  <Tag colorScheme={getStatusColor(order.statuses![0].status)}>
                    #{order.id}
                  </Tag>
                </Td>
                <Td>
                  <Stack spacing="2">
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Quanitity</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.meals?.map((meal) => {
                          return (
                            <Tr>
                              <Td>{meal.meal?.name}</Td>
                              <Td>{meal.quantity}</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </Stack>
                </Td>
                <Td>{order.restaurant.name}</Td>
                <Td>
                  {order.statuses!.length > 0 ? (
                    <Tag
                      colorScheme={getStatusColor(order.statuses![0].status)}
                      variant="outline"
                    >
                      {order.statuses![0].status}
                    </Tag>
                  ) : (
                    ""
                  )}
                </Td>
                {order.statuses!.length > 0 ? (
                  order.statuses![0].status === "PLACED" ? (
                    <Td>
                      <Button
                        leftIcon={<DeleteIcon />}
                        colorScheme={"red"}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </Td>
                  ) : (
                    <Td>
                      <Text
                        fontSize="xs"
                        textTransform="uppercase"
                        color="gray.500"
                      >
                        No Actions Available
                      </Text>
                    </Td>
                  )
                ) : (
                  <></>
                )}
              </Tr>
            ))}
          </Tbody>
          {data!.orders!.length > 0 ? (
            <Tfoot>
              <Tr>
                <Th>Order ID</Th>
                <Th>Meals</Th>
                <Th>Restaurant</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Tfoot>
          ) : (
            <></>
          )}
        </Table>
      </Box>
    </Box>
  );
}
