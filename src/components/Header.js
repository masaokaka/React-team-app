import React from "react";
import { auth } from "../firebase/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sidenav, logout } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(1, 1),
    backgroundColor: "orange",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    auth.signOut().then(() => {
      history.push('/')
    })
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            onClick={() => dispatch(sidenav())}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <img src="/img/header_logo.png" alt="ロゴ" />
          </Typography>
          <div>
            {user && <span>ようこそ{user.email}さん</span>}
            <Button variant="contained" onClick={() => history.push("/admin")}>
              管理画面
            </Button>
            <Button variant="contained" onClick={() => history.push("/cart")}>
              カート
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push("/orderhistory")}
            >
              注文履歴
            </Button>
            <Button variant="contained" onClick={doLogout}>
              ログアウト
            </Button>
            <Button variant="contained" onClick={() => history.push("/login")}>
              ログイン
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
