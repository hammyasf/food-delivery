import { useMeQuery } from "../generated/graphql";

export function Home() {
  const { data, error, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });

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
      <h1>Me: {data?.me?.username}</h1>
    </div>
  );
}
