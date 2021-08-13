import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation } from "./generated/graphql";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export function Routes() {
  const [logout, { client }] = useLogoutMutation();
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client!.resetStore();
          }}
        >
          Logout
        </button>
      </div>
      <Switch>
        <Route exact path="/" render={() => <Home></Home>} />
        <Route exact path="/register" render={() => <Register></Register>} />
        <Route exact path="/login" render={() => <Login></Login>} />
      </Switch>
    </BrowserRouter>
  );
}
