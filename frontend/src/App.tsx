import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { setAccessToken } from "./utils/accessToken";
import { Routes } from "./Routes";
import { setIsAuthenticated } from "./utils/isAuthenticated";

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      }).then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken);
        if (accessToken && accessToken !== "") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}
