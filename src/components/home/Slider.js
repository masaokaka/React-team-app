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
    const [item, setItem] = useState([]);
    useEffect(()=>{
        setItem(props.itemsData)
    },[props.itemsData])


    return (
        <React.Fragment>
            { item.length > 0 ?
                <Swiper spaceBetween={50}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                        }}>
                            { item.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                        <Card>
                                            <CardActionArea>
                                            <CardMedia 
                                                    component="img"
                                                    alt='itemImage'
                                                    height="140"
                                                    image={slideContent.img}
                                                    title='Image'/>
                                            </CardActionArea>
                                        </Card>
                                    </SwiperSlide>
                                    )
                                })
                            }    
                </Swiper> : ''
            }
        </React.Fragment>
    )
}