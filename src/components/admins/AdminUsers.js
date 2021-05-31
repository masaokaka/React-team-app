import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchuserinfo } from "../../actions";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userinfo);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchuserinfo());
  }, []);

  return (
    <React.Fragment>
      {userInfo ? (
        <TableContainer>
          <h2>ユーザー情報</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ユーザーID</TableCell>
                <TableCell>名前</TableCell>
                <TableCell>メールアドレス</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userInfo.map((user) => (
                <TableRow>
                  <TableCell>{user.uid}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => history.push(`/admin/edit/${user.uid}`)}>
                      <CreateIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2>ユーザーがいません</h2>
      )}
    </React.Fragment>
  );
};
