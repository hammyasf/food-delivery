import { Redirect } from "react-router-dom";
import { CTA } from "../components/CTA";
import { useMeQuery } from "../generated/graphql";
import { getIsAuthenticated } from "../utils/isAuthenticated";

export function Home() {
  const { data, error, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });

  if (getIsAuthenticated()) {
    return <Redirect to="/restaurants" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Not Authenticated</div>;
  }

  if (!data) {
    return <div>No Data!</div>;
  }

  return (
    <div>
      <CTA />
    </div>
  );
}
