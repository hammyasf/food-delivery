import { Redirect } from "react-router-dom";
import { CTA } from "../components/CTA";
import { useMeQuery } from "../generated/graphql";

export function Home() {
  const { data, error, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });

  if (data?.me) {
    return <Redirect to="/restaurants" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Not Authenticated</div>;
  }

  return (
    <div>
      <CTA />
    </div>
  );
}
