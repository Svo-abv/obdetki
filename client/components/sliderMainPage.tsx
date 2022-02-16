import Image from 'next/image';
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import classes from '../styles/sliderMainPage.module.css'

const SliderMainPage = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className={classes.sliderContainer} activeIndex={index} onSelect={handleSelect} fade>
            <Carousel.Item>
                <Image
                    src="/images/slide1.jpg"
                    alt="First slide"
                    width={1000}
                    height={500}
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    src="/images/slide2.png"
                    alt="Third slide"
                    width={1000}
                    height={500}
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default SliderMainPage;