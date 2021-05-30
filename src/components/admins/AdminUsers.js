import React, { useEffect } from "react";
import　{ useSelector, useDispatch } from "react-redux";
import { fetchuserinfo } from "../../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state=>state.userinfo);
  useEffect(() => {
    dispatch(fetchuserinfo());
  }, []);
  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ユーザーID</TableCell>
          <TableCell>名前</TableCell>
          <TableCell>メールアドレス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>仮</TableCell>
            <TableCell>仮</TableCell>
            <TableCell>仮</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  </React.Fragment>);
};
