import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide }from 'swiper/react'
import SwiperCore, {Navigation, Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { makeStyles } from '@material-ui/core/styles'
import { Card,
         CardActionArea,
         CardActions,
         CardContent,
         CardMedia 
         } from '@material-ui/core'
SwiperCore.use([Navigation])
SwiperCore.use([Autoplay])

const useStyles = makeStyles({
    root: {
        width: 200,
        alignItems: 'center',
    }
})

export const Slider = (props) =>{
    const classes = useStyles();
    const [item, setItem] = useState([]);
    useEffect(()=>{
        setItem(props.itemsData)
    },[props.itemsData])


    return (
        <React.Fragment>
            { item.length > 0 ?
                <Swiper spaceBetween={50}
                        slidesPerView={5}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                        }}>
                            { item.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                        <Card>
                                            <CardActionArea>
                                            <CardMedia 
                                                    className={classes.root}
                                                    component="img"
                                                    alt='itemImage'
                                                    height='100'
                                                    width='20'
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