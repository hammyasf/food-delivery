import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Grid,
  HStack,
  Spinner,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { AddMealModal } from "../components/AddMealModal";
import { Card } from "../components/Card";
import { CartItem } from "../components/CartItem";
import { MealCard } from "../components/MealCard";
import {
  useMeQuery,
  usePlaceOrderMutation,
  useRestaurantQuery,
} from "./../generated/graphql";

export function Restaurant() {
  const { id }: any = useParams();
  const {
    data,
    loading: restaurantLoading,
    refetch,
  } = useRestaurantQuery({
    variables: { id: parseInt(id) },
  });
  const [placeOrder, { loading }] = usePlaceOrderMutation();
  const bgValue = useColorModeValue("#F9FAFB", "gray.600");

  const [cart, setCart]: any = useState([]);
  const [cartCost, setCartCost] = useState(0);
  const [hasOrdered, setHasOrdered] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: user } = useMeQuery();

  useEffect(() => {
    let total_cost = 0;

    cart.forEach((c: any) => {
      total_cost += c.price;
    });
    setCartCost(total_cost);
  }, [cart]);

  if (!user?.me) {
    return <Redirect to="/" />;
  }

  function removeItem(e: any) {
    let array = [...cart];
    let index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);
    }
  }

  async function makeOrder() {
    const meals = cart.map((c: any) => c.id);
    await placeOrder({
      variables: {
        meals: meals,
        restaurantId: data!.restaurant!.id,
        total: cartCost,
      },
    });
    setHasOrdered(true);
  }

  if (hasOrdered) {
    return <Redirect to="/orders" />;
  }

  if (restaurantLoading) {
    return (
      <Box p={30} bg={bgValue} h={"calc(100vh - 70px)"}>
        <Box rounded="md" bg={"gray.900"} h={96}>
          <Center h="full">
            <Spinner />
          </Center>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <HStack bg={bgValue} alignItems="start" h={"calc(100vh - 70px)"}>
        <VStack spacing={4} w={"full"}>
          <Flex alignItems="center" justifyContent="end" w="full" p={6}>
            <Box textAlign="left" w="full" px={8} pt={2}>
              <chakra.h1 fontSize={"2xl"} fontWeight="bold" textAlign="left">
                {data?.restaurant?.meals?.length} Meal
                {data!.restaurant!.meals!.length === 1 ? "" : "s"} available
                right now
              </chakra.h1>
            </Box>
            {user.me.type === "RESTAURANT_OWNER" && (
              <Box>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  onClick={onOpen}
                >
                  Add Meal
                </Button>
              </Box>
            )}
          </Flex>
          <Grid
            px={30}
            py={15}
            w={"full"}
            gap={6}
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            autoRows="min-content"
            justifyContent="start"
          >
            {data?.restaurant?.meals?.map((meal, i) => {
              if (user!.me!.type === "RESTAURANT_OWNER") {
                return (
                  <MealCard
                    key={`meal-card-${meal.id}`}
                    title={meal.name}
                    description={meal.description}
                    price={meal.price}
                    onEdit={() => {
                      refetch();
                    }}
                    onDelete={() => {
                      refetch();
                    }}
                    id={meal.id}
                  />
                );
              } else {
                return (
                  <Card
                    key={i}
                    title={meal.name}
                    description={meal.description}
                    buttonText="Add To Cart"
                    price={meal.price}
                    onButtonClick={() => setCart([meal, ...cart])}
                  />
                );
              }
            })}
          </Grid>
        </VStack>
        {cart.length > 0 && (
          <Box
            overflowY="auto"
            p={"40px"}
            color={"white"}
            mt={4}
            bg="gray.500"
            shadow="md"
            w={1 / 4}
            minW="250px"
            h={"calc(100vh - 70px)"}
          >
            {cart.map((c: any, i: number) => {
              return (
                <div key={`cart-item-${i}`}>
                  <CartItem
                    name={c.name}
                    description={c.description}
                    price={c.price}
                    onRemove={() => removeItem(c)}
                  />
                  <Box h={2} />
                </div>
              );
            })}
            <Button
              bg={"green.500"}
              color="white"
              w="full"
              onClick={makeOrder}
              loadingText="Ordering"
              isLoading={loading}
            >
              Order Now ${cartCost}
            </Button>
          </Box>
        )}
      </HStack>
      <AddMealModal
        isOpen={isOpen}
        onClose={onClose}
        onCreate={() => refetch()}
        restrauantId={id}
      />
    </>
  );
}
