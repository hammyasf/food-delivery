import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link, Redirect } from "react-router-dom";
import { AddRestaurantModal } from "../components/AddRestaurantModal";
import { Card } from "../components/Card";
import { RestaurantCard } from "../components/RestaurantCard";
import { useMeQuery, useRestaurantsQuery } from "../generated/graphql";

export function Restaurants() {
  const { data, loading, error, refetch } = useRestaurantsQuery();

  const bgValue = useColorModeValue("#F9FAFB", "gray.600");

  const { data: user } = useMeQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user?.me) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return <div>Error.</div>;
  }

  function onCreate() {
    refetch();
  }

  return (
    <>
      <VStack spacing={4} bg={bgValue}>
        <Flex alignItems="center" justifyContent="end" w="full" p={6}>
          <Box textAlign="left" w="full" px={8} pt={2}>
            <chakra.h1 fontSize={"2xl"} fontWeight="bold" textAlign="left">
              {data?.restaurants?.length} Restaurant
              {data!.restaurants!.length > 1 ? "s" : ""} available right now
            </chakra.h1>
          </Box>
          {user.me.type === "RESTAURANT_OWNER" && (
            <Box>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="green"
                onClick={onOpen}
              >
                Add Restaurant
              </Button>
            </Box>
          )}
        </Flex>
        <Grid
          p={30}
          w={"full"}
          gap={6}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          autoRows="auto"
        >
          {data?.restaurants?.map((restaurant) => {
            if (user!.me!.type === "RESTAURANT_OWNER") {
              return (
                <RestaurantCard
                  key={`restaurant-card-${restaurant.id}}`}
                  title={restaurant.name}
                  description={restaurant.description}
                  onEdit={() => {
                    refetch();
                  }}
                  onDelete={() => {
                    refetch();
                  }}
                  id={restaurant.id}
                />
              );
            } else {
              return (
                <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                  <Card
                    title={restaurant.name}
                    description={restaurant.description}
                  />
                </Link>
              );
            }
          })}
        </Grid>
      </VStack>
      {/** Modals */}
      <AddRestaurantModal
        isOpen={isOpen}
        onClose={onClose}
        onCreate={onCreate}
      />
    </>
  );
}
