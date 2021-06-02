import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { ADMIN_ID } from "../status/index";
import { AdminItems } from "../components/admins/AdminItems";
import { AdminUsers } from "../components/admins/AdminUsers";
import { AdminUserEdit } from "../components/admins/AdminUserEdit";
import { AdminToppings } from "../components/admins/AdminToppings";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link: {
    color: "black",
    '&:hover': {
       color: "orange",
    },
    textDecoration:"none",
  },
}));

export const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const match = useRouteMatch();
  const classes = useStyles();

  //マウント時にユーザーがアドミンではなかった場合にはアクセス拒否
  useEffect(() => {
    if (user) {
      if (user.uid !== ADMIN_ID) {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      <Router>
        <ul>
          <li>
            <Link to={`${match.url}/users`} className={classes.link}>
              <h4>ユーザー情報</h4>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/items`} className={classes.link}>
              <h4>商品情報</h4>
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/toppings`} className={classes.link}>
              <h4>トッピング情報</h4>
            </Link>
          </li>
        </ul>
        <Switch>
          <Route
            path={`${match.path}/users/:userid`}
            exact
            component={AdminUserEdit}
          ></Route>
          <Route
            path={`${match.path}/items`}
            exact
            component={AdminItems}
          ></Route>
          <Route
            path={`${match.path}/toppings`}
            exact
            component={AdminToppings}
          ></Route>
          <Route path={`${match.path}/users`} component={AdminUsers}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};
