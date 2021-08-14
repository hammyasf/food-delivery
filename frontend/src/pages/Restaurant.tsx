import {
  Box,
  Button,
  Grid,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { CartItem } from "../components/CartItem";
import { useRestaurantQuery } from "./../generated/graphql";

export function Restaurant() {
  const { id }: any = useParams();
  const { data } = useRestaurantQuery({
    variables: { id: parseInt(id) },
    fetchPolicy: "network-only",
  });
  const bgValue = useColorModeValue("#F9FAFB", "gray.600");

  const [cart, setCart]: any = useState([]);
  const [cartCost, setCartCost] = useState(0);

  function removeItem(e: any) {
    let array = [...cart];
    let index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);
    }
  }

  useEffect(() => {
    let total_cost = 0;
    //@ts-ignore
    cart.map((c) => {
      total_cost += c.price;
    });
    setCartCost(total_cost);
  }, [cart]);

  return (
    <HStack bg={bgValue} alignItems="start" h={"calc(100vh - 70px)"}>
      <VStack spacing={4} w={"full"}>
        <Box textAlign="left" w="full" px={8} pt={2}></Box>
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
          {data?.restaurant?.meals?.map(
            (meal, i) =>
              meal && (
                <Card
                  key={i}
                  title={meal.name}
                  description={meal.description}
                  buttonText="Add To Card"
                  price={meal.price}
                  onButtonClick={() => setCart([meal, ...cart])}
                />
              )
          )}
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
          <Button bg={"green.500"} color="white" w="full">
            Order Now ${cartCost}
          </Button>
        </Box>
      )}
    </HStack>
  );
}
