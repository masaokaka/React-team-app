import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { fetchitems } from "../../actions";
import "swiper/swiper.min.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    margin: "20px",
  },
});

export const Slider = (props) => {
  const classes = useStyles();
  const item = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchitems());
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      {item.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          className={classes.root}
        >
          {item.map((slideContent, index) => {
            return (
              <SwiperSlide key={index}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="カレー"
                      height="200"
                      width="200"
                      image={slideContent.img}
                      title="Image"
                    />
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        ""
      )}
    </Container>
  );
};
