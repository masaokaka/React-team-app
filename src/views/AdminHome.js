import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

export const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const match = useRouteMatch();

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
        <div>
          <div>
            <Link to={`${match.url}/users`}>ユーザー情報</Link>
            <Link to={`${match.url}/items`}>アイテム情報</Link>
            <Link to={`${match.url}/toppings`}>トッピング情報</Link>
          </div>
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
        </div>
      </Router>
    </React.Fragment>
  );
};
