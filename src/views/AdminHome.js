import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { ADMIN_ID } from "../status/index";
import { AdminItems } from "../components/admins/AdminItems";
import { AdminUsers } from "../components/admins/AdminUsers";
import { AdminToppings } from "../components/admins/AdminToppings";

export const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { adminId } = useParams();
  //マウント時にユーザーがアドミンではなかった場合にはアクセス拒否
  useEffect(() => {
    if (user.uid !== ADMIN_ID) {
      history.push("/");
    }
  }, []);

  return (
    <React.Fragment>
      <Router>
          <div>
            <div>
              <Link to={`/admin/users`}>ユーザー情報</Link>
              <Link to={`/admin/items`}>アイテム情報</Link>
              <Link to={`/admin/toppings`}>トッピング情報</Link>
            </div>
            <Switch>
              <Route
                path={`/admin/users`}
                component={AdminUsers}
              ></Route>
              <Route
                path={`/admin/items`}
                component={AdminItems}
              ></Route>
              <Route
                path={`/admin/toppings`}
                component={AdminToppings}
              ></Route>
            </Switch>
          </div>
      </Router>
    </React.Fragment>
  );
};
