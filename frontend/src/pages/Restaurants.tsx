import { Box, chakra, Grid, useColorModeValue, VStack } from "@chakra-ui/react";
import { Link, Redirect } from "react-router-dom";
import { Card } from "../components/Card";
import { useMeQuery, useRestaurantsQuery } from "../generated/graphql";

export function Restaurants() {
  const { data, loading, error } = useRestaurantsQuery();

  const bgValue = useColorModeValue("#F9FAFB", "gray.600");

  const { data: user } = useMeQuery();

  if (!user?.me) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return <div>Error.</div>;
  }

  return (
    <VStack spacing={4} bg={bgValue}>
      <Box textAlign="left" w="full" px={8} pt={2}>
        <chakra.h1 fontSize={"2xl"} fontWeight="bold" textAlign="left">
          {data?.restaurants?.length} Restaurant
          {data!.restaurants!.length > 1 ? "s" : ""} available right now
        </chakra.h1>
      </Box>
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
        {data?.restaurants?.map((restaurant) => (
          <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <Card
              title={restaurant.name}
              description={restaurant.description}
            />
          </Link>
        ))}
      </Grid>
    </VStack>
  );
}
