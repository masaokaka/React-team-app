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
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
        <Box>
          <Grid container>
            <Grid item>
              <Link to={`${match.url}/users`}>ユーザー情報管理</Link>
            </Grid>
            <Grid item>
              <Link to={`${match.url}/items`}>商品情報管理</Link>
            </Grid>
            <Grid item>
              <Link to={`${match.url}/toppings`}>トッピング情報管理</Link>
            </Grid>
          </Grid>
        </Box>
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
