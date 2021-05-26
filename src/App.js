import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import {Footer} from "./components/Footer";
import { SideNav } from "./components/SideNav";

import { Home } from "./views/Home";
import {Register} from "./views/Register";
import { Login } from "./views/Login";
import { Cart } from "./views/Cart";
import { OrderComp } from "./views/OrderComp";
import { ItemInfo } from "./views/ItemInfo";

import Container from "@material-ui/core/Container";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <SideNav />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/iteminfo/:itemid" exact component={ItemInfo} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/ordercomp" exact component={OrderComp} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
