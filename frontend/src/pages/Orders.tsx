import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
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
  Stack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useParams, Link, Redirect } from "react-router-dom";
import { OrderTableCancelButton } from "../components/OrderTableCancelButton";
import { OrderTableUpdateButton } from "../components/OrderTableUpdateButton";
import { getStatusColor } from "../constants/statusColors";
import { useMeQuery, useOrdersQuery } from "../generated/graphql";

export function Orders() {
  const { page }: { page: string } = useParams();
  const { data, loading, refetch } = useOrdersQuery({
    fetchPolicy: "network-only",
    pollInterval: 2500,
    variables: {
      page: parseInt(page),
      perPage: 5,
    },
  });
  const { data: currentUser } = useMeQuery();
  const bgColor = useColorModeValue("gray.300", "gray.500");
  const bgColor2 = useColorModeValue("white", "gray.900");

  const { data: user } = useMeQuery();

  if (!user?.me) {
    return <Redirect to="/" />;
  }

  if (!page) {
    return <Redirect to="/orders/1" />;
  }

  if (loading) {
    return (
      <Box p={30} bg={bgColor} h={"calc(100vh - 70px)"}>
        <Box rounded="md" bg={bgColor2} h={96}>
          <Center h="full">
            <Spinner />
          </Center>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={30} bg={bgColor}>
      <Box rounded="md" bg={bgColor2}>
        <Table>
          {data!.orders!.length <= 0 && (
            <TableCaption>No Orders Yet!</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Meals</Th>
              <Th>Restaurant</Th>
              <Th>Total Cost</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data!.orders!.map((order) => (
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
                        {order.meals?.map((meal: any) => {
                          return (
                            <Tr key={`meal-key-${meal.meal?.name}`}>
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
                  <Tag colorScheme="green">${order.total}</Tag>
                </Td>
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
                  order.statuses![0].status === "PLACED" &&
                  currentUser?.me?.type === "USER" ? (
                    <Td>
                      <OrderTableCancelButton
                        onClick={() =>
                          refetch({ page: parseInt(page), perPage: 5 })
                        }
                        id={order.id}
                      />
                    </Td>
                  ) : order.statuses![0].status !== "CANCELED" &&
                    order.statuses![0].status !== "RECEIVED" &&
                    currentUser?.me?.type === "RESTAURANT_OWNER" ? (
                    <Td>
                      <OrderTableUpdateButton
                        id={order.id}
                        onClick={() =>
                          refetch({ page: parseInt(page), perPage: 5 })
                        }
                        //@ts-ignore
                        current_status={order!.statuses[0]!.status}
                      />
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
                <Th>Total Cost</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Tfoot>
          ) : (
            <></>
          )}
        </Table>
      </Box>
      <Flex justifyContent="flex-end" w={"full"} p={4}>
        {parseInt(page) > 1 && (
          <IconButton
            aria-label="Go To Previous Page"
            icon={<ArrowBackIcon />}
            colorScheme={"blue"}
            as={Link}
            to={`/orders/${parseInt(page) - 1}`}
          />
        )}
        <Box w={2} />
        <IconButton
          aria-label="Go To Next Page"
          icon={<ArrowForwardIcon />}
          colorScheme={"blue"}
          as={Link}
          to={`/orders/${parseInt(page) + 1}`}
        />
      </Flex>
    </Box>
  );
}
