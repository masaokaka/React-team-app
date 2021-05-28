import React from "react";
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 280,
    height:320,
    margin:10
  },
  media: {
    height: 140,
  },
});

export const Item = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleLink = path => history.push(path);
  return (
    <React.Fragment>
     <Card className={classes.root}>
      <CardActionArea onClick={()=>handleLink(`iteminfo/${props.item.id}`)}>
        <CardMedia
          className={classes.media}
          image={props.item.img}
          title={props.item.name}
        />
        <CardContent>
          <Typography component="h2">
            {props.item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="div">
            <Grid container>
              <Grid item xs={6}><strong>M:</strong>{props.item.mprice}円(税抜)</Grid>
              <Grid item xs={6}><strong>L:</strong>{props.item.lprice}円(税抜)</Grid>
            </Grid>
        </Typography>
      </CardContent>
    </Card>
    </React.Fragment>
  );
}