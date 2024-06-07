import React, { useRef, useEffect } from 'react';
import Carousel from 'react-owl-carousel2';

function OwlCarousel ( props ) {
    const { adClass, options, events, isTheme = true } = props;
    const carouselRef = useRef( null );
    const defaultOptions = {
        items: 1,
        loop: false,
        margin: 0,
        responsiveClass: "true",
        nav: true,
        navText: [ '<i class="icon-angle-left">', '<i class="icon-angle-right">' ],
        dots: true,
        smartSpeed: 400,
        autoplay: false,
        responsive: {
            320: {
                nav: false
            },
            375: {
                nav: false
            }
        }
    };

    useEffect( () => {
        if ( props.onChangeRef ) {
            props.onChangeRef( carouselRef );
        }
    }, [ carouselRef ] );

    let settings = Object.assign( {}, defaultOptions, options );

    return (
        props.children !== undefined ?
            props.children.length > 0 || ( props.children && props.children.length === undefined ) ?
                <Carousel ref={ carouselRef } className={ `owl-carousel ${isTheme ? 'owl-theme' : ''} ${adClass}` } options={ settings } events={ events }>
                    { props.children }
                </Carousel >
                : ""
            : ""
    );
}

export default React.memo( OwlCarousel );