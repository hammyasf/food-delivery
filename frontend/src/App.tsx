import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function App() {
  const { data, loading } = useQuery(gql`
    {
      currentUser {
        id
        username
        type
        orders {
          statuses {
            status
          }
          meals {
            meal {
              name
              price
            }
          }
        }
        restaurants {
          name
          description
          meals {
            name
            price
          }
        }
      }
    }
  `);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
}

export default App;
