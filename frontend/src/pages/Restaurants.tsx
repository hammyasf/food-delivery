import {
  Box,
  chakra,
  Flex,
  Grid,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import { useRestaurantsQuery } from "../generated/graphql";

export function Restaurants() {
  const { data, loading, error } = useRestaurantsQuery();
  const bgValue = useColorModeValue("#F9FAFB", "gray.600");

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
        templateColumns="repeat(3, 1fr)"
        autoRows="auto"
      >
        {data?.restaurants?.map((restaurant) => (
          <Card
            key={restaurant.id}
            title={restaurant.name}
            description={restaurant.description}
            price={100}
            buttonText="Explore Now"
          />
        ))}
      </Grid>
    </VStack>
  );
}
