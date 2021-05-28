import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SideNav } from "./components/SideNav";

import { Home } from "./views/Home";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { Cart } from "./views/Cart";
import { OrderHistory } from "./views/OrderHistory";
import { OrderComp } from "./views/OrderComp";
import { ItemInfo } from "./views/ItemInfo";
import { Admin } from "./views/Admin";
import { OrderHistory } from "./views/OrderHistory";

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
            <Route path="/orderhistory" exact component={OrderHistory} />
            <Route path="/ordercomp" exact component={OrderHistory} />
            <Route path="/admin" exact component={Admin} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
