import { useCurrentUserQuery } from "../generated/graphql";

interface Props {}

export function Home() {
  const user = useCurrentUserQuery();
  return <div>{console.log(user)}Home</div>;
}
