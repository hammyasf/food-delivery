import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Register } from "./pages/Register";
import { Restaurant } from "./pages/Restaurant";
import { Restaurants } from "./pages/Restaurants";

export function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/restaurants" render={() => <Restaurants />} />
        <Route exact path="/orders" render={() => <Orders />} />
        <Route exact path="/orders/:page" render={() => <Orders />} />
        <Route exact path="/restaurants/:id" render={() => <Restaurant />} />
      </Switch>
    </BrowserRouter>
  );
}
