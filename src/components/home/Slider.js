import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide }from 'swiper/react'
import SwiperCore, {Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import { Card,
         CardActionArea,
         CardActions,
         CardContent,
         CardMedia 
         } from '@material-ui/core'
SwiperCore.use([Navigation])

export const Slider = (props) =>{
    

    return (
        <React.Fragment>
                {console.log(props)}
                <Swiper spaceBetween={50} 
                        slidesPreView={1}
                        loop={true}
                        navogation={{
                            prevEl:'button_prev',
                            nextEl:'button_next',
                        }}
                >
                        <SwiperSlide>
                            <Card>
                                <CardActionArea>
                                    <CardMedia 
                                        component="img"
                                        alt='itemImage'
                                        height="140"
                                        image=""
                                        title='Image'/>
                                </CardActionArea>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide> 
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>  
                </Swiper>

        </React.Fragment>
    )
}