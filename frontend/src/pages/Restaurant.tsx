import { useParams } from "react-router-dom";
import { useRestaurantQuery } from "./../generated/graphql";

export function Restaurant() {
  const { id }: any = useParams();
  const { data } = useRestaurantQuery({ variables: { id: parseInt(id) } });
  return (
    <div>
      Hi This Is Restaurant Page with ID: {id} - {data?.restaurant?.name} with{" "}
      {data?.restaurant?.meals?.length} Meal(s).
      <ul>
        {data?.restaurant?.meals?.map((meal) => (
          <li key={meal.name}>
            {meal.name} - {meal.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
