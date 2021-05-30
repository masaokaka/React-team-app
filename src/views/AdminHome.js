import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { ADMIN_ID } from "../status/index";
import { AdminItems } from "../components/admins/AdminItems";
import { AdminUsers } from "../components/admins/AdminUsers";
import { AdminUserEdit } from "../components/admins/AdminUserEdit";
import { AdminToppings } from "../components/admins/AdminToppings";

export const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
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
            <Link to={`/admin`}>ユーザー情報</Link>
            <Link to={`/admin/items`}>アイテム情報</Link>
            <Link to={`/admin/toppings`}>トッピング情報</Link>
          </div>
          <Switch>
            <Route path={`/admin`} exact component={AdminUsers}></Route>
            <Route path={`/admin/edit/:userid`} exact component={AdminUserEdit}></Route>
            <Route path={`/admin/items`} exact component={AdminItems}></Route>
            <Route
              path={`/admin/toppings`}
              exact
              component={AdminToppings}
            ></Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};
