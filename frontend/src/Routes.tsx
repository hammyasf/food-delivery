import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home></Home>} />
        <Route exact path="/register" render={() => <Register></Register>} />
        <Route exact path="/login" render={() => <Login></Login>} />
      </Switch>
    </BrowserRouter>
  );
}
