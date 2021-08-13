import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export function Routes() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
      <Switch>
        <Route exact path="/" render={Home} />
        <Route exact path="/register" render={Register} />
        <Route exact path="/login" render={Login} />
      </Switch>
    </BrowserRouter>
  );
}
