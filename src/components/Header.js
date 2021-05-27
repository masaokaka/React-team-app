import React from "react";
import { useDispatch } from "react-redux";
import { sidenav } from "../actions";
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
  const dispatch = useDispatch();

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
            <img src="/img/header_logo.png"/>
          </Typography>
          <div>
            <span>ようこそ 〇〇 さん</span>
            <Button variant="contained">
              カート
            </Button>
            <Button variant="contained">
              注文履歴
            </Button>
            <Button variant="contained">
              ログアウト
            </Button>
            <Button variant="contained">
              ログイン
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
