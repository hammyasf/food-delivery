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
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useParams, Link, Redirect } from "react-router-dom";
import { OrderTableCancelButton } from "../components/OrderTableCancelButton";
import { getStatusColor } from "../constants/statusColors";
import { useOrdersQuery } from "../generated/graphql";

export function Orders() {
  const { page }: { page: string } = useParams();
  const { data, loading, refetch } = useOrdersQuery({
    fetchPolicy: "network-only",
    pollInterval: 5000,
    variables: {
      page: parseInt(page),
      perPage: 5,
    },
  });
  const bgColor = useColorModeValue("gray.300", "gray.500");
  const bgColor2 = useColorModeValue("white", "gray.900");

  if (!page) {
    return <Redirect to="/orders/1" />;
  }

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
                      <OrderTableCancelButton
                        onClick={() =>
                          refetch({ page: parseInt(page), perPage: 5 })
                        }
                        id={order.id}
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
