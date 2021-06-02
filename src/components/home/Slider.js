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
                <Swiper spaceBetween={50}
                        slidesPerView={3}
                        virtual>
                            {
                                props.itemsData.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={slideContent} virtualIndex={index}>
                                        <Card>
                                            <CardActionArea>
                                                {console.log(slideContent.img)}
                                            </CardActionArea>
                                        </Card>
                                    </SwiperSlide>
                                    )
                                })
                                
                            }    
                </Swiper>
        </React.Fragment>
    )
}