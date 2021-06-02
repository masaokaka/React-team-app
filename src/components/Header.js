import React, { useEffect, useState } from "react";
import { auth } from "../firebase/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { sidenav } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import { ADMIN_ID } from "../status/index";
import { db } from "../firebase/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginReft: theme.spacing(2),
  },
  Button: {
    marginLeft: theme.spacing(2),
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
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    if (user) {
      db.collection(`users/${user.uid}/userInfo`)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            setUserInfo(doc.data());
          });
        });
    }
    return () => {
      setUserInfo(null);
    };
  }, [user]);

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
            <Link to="/">
              <img src="/img/header_logo.png" alt="ロゴ" />
            </Link>
          </Typography>
          <div>
            {userInfo && <span>ようこそ{userInfo.name}さん</span>}
            {user && user.uid === ADMIN_ID && (
              <IconButton
                className={classes.Button}
                onClick={() => history.push("/admin/users")}
              >
                <SupervisorAccountIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.Button}
              onClick={() => history.push("/cart")}
            >
              <ShoppingCartIcon />
            </IconButton>
            {user && (
              <IconButton
                className={classes.Button}
                onClick={() => history.push("/orderhistory")}
              >
                <HistoryIcon />
              </IconButton>
            )}
            {user ? (
              <IconButton className={classes.Button} onClick={doLogout}>
                <MeetingRoomOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.Button}
                onClick={() => history.push("/login")}
              >
                <MeetingRoomIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
