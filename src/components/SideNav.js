import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { sidenav } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import { ADMIN_ID } from "../status/index";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export const SideNav = () => {
  const toggle = useSelector((state) => state.sidenav.navOnOff);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={toggle}
        onClose={() => {
          dispatch(sidenav(false));
        }}
      >
        {toggle && <SideNavContent />}
      </Drawer>
    </React.Fragment>
  );
};

const SideNavContent = () => {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const dispatch = useDispatch();

  const menu = [
    { text: "ホーム", icon: <HomeIcon />, link: "/" },
    { text: "カート", icon: <ShoppingCartIcon />, link: "/cart" },
  ];
  const userMenu = [
    ...menu,
    {
      text: "注文履歴",
      icon: <HistoryIcon />,
      link: "/orderhistory",
    },
  ];
  const adminMenu = [
    ...userMenu,
    {
      text: "管理画面",
      icon: <AdminIcon />,
      link: "/admin/users",
    },
  ];
  const link = (link) => {
    dispatch(sidenav(false));
    handleLink(link);
  };
  return (
    <div className={classes.list}>
      <List>
        <ListItem>
          <ListItemText primary="メニュー" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user === null
          ? menu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  link(item.link);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
              </ListItem>
            ))
          : user.uid === ADMIN_ID
          ? adminMenu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  link(item.link);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
              </ListItem>
            ))
          : userMenu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  link(item.link);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
              </ListItem>
            ))}
      </List>
    </div>
  );
};
