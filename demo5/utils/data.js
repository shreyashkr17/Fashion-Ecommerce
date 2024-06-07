import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`{
    from {
        opacity:0;
    }
  
    to {
        opacity:1;
    }
}`

export const fadeInRightShorter = keyframes`
from {
  opacity: 0;
  transform: translate(-50px,0);
  transform-origin: 0 0;
}

to {
  opacity: 1;
  transform: none
}`;

export const fadeInRight = keyframes`
0% {
    -webkit-transform: translate3d(100%,0,0);
    opacity: 0;
    transform: translate3d(100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInLeftShorter = keyframes`{
    from {
        opacity: 0;
        transform: translate(50px,0);
        transform-origin: 0 0;
    }
    to {
        opacity: 1;
        transform: none
    }
}`

export const fadeInLeft = keyframes`
0% {
    -webkit-transform: translate3d(-100%,0,0);
    opacity: 0;
    transform: translate3d(-100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInUpShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,50px);
    transform-origin: 0 0;
}
to {
    opacity:1;
    transform:none
}`

export const fadeInUp = keyframes`
0% {
    -webkit-transform: translate3d( 0, 100%, 0 );
    opacity: 0;
    transform: translate3d( 0, 100 %, 0 )
}

to {
    -webkit-transform: translateZ( 0 );
    opacity: 1;
    transform: translateZ( 0 )
}`

export const fadeInDownShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,-50px);
    transform-origin: 0 0;
}

to {
    opacity: 1;
    transform: none
}`

export const blurIn = keyframes`{
    from {
        opacity: 0;
        filter: blur(20px);
        transform: scale(1.2);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: none 
    }
}`

export const grayOut = keyframes`{
    from {
        opacity: 1;
        filter: grayscale(0);
    }
    15% {
        filter: grayscale(100%);
    }
    to {
        opacity: .0;
        filter: grayscale(100%);
    }
}`

export const dotPulse = keyframes`{
    from {
        opacity:1;
        transform:scale(.2)
    }
  
    to {
        opacity:0;
        transform:scale(1)
    }
}`

export const maskUp = keyframes`{
    from {
        transform: translate(0,100%)
    }
  
    to {
        transform: translate(0,0)
    }
}`

export const maskRight = keyframes`{
    from {
        transform: translate(-100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`

export const maskDown = keyframes`{
    from {
        transform: translate(0,-100%)
    }
    to {
        transform: translate(0,0)
    }
}`

export const maskLeft = keyframes`{
    from {
        transform: translate(100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`

export const slideInUp = keyframes`{
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`

export const slideInDown = keyframes`{
    0% {
        transform: translate3d(0, -100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`

export const slideInLeft = keyframes`{
    0% {
        transform: translate3d(-100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`

export const slideInRight = keyframes`{
    0% {
        transform: translate3d(100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`

export const flipInX = keyframes`{
    0% {
        animation-timing-function: ease-in;
        opacity: 0;
        transform: perspective(400px) rotateX(90deg)
    }
  
    to {
        transform: perspective(400px)
    }
}`

export const flipInY = keyframes`{
  0% {
      animation-timing-function: ease-in;
      opacity: 0;
      transform: perspective(400px) rotateY(90deg);
  }

  to {
      transform: perspective(400px);
  }
}`

export const flipOutY = keyframes`{
    0% {
        animation-timing-function: ease-out;
        transform: perspective(400px)
    }

    to {
        opacity: 0;
        transform: perspective(400px) rotateY(90deg)
    }
}`

export const brightIn = keyframes` {
    0% {
        animation-timing-function: ease-in;
        filter: brightness(0%)
    }
  
    to {
        filter: brightness(100%)
    }
}`

export const zoomInShorter = keyframes`{
    0%{
        -webkit-transform:scale3d(.8,.8,.8);
        opacity:0;
        transform:scale3d(.8,.8,.8)
    }
    50%{
        opacity:1
    }
}`

export const bounceInUp = keyframes`{
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    from {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}`

export const slideZoomIn = keyframes`{
    0%{
        transform:scale3d(1,1,1);
        opacity: 1;
    }
    100% {
        transform:scale3d(1.1,1.1,1);
        opacity: 1;
    }
}`

export const careers = {
    "type":[
        {
            name:'Full Time',
            slug:'fulltime',
            count:8
        },
        {
            name:'Part Time',
            slug:'parttime',
            count:8
        },
        {
            name:'Internship',
            slug:'internship',
            count:8
        }
    ],
    "category":[
        {
            name:'Sales, Advertising & Accounting Management',
            count:6
        },
        {
            name:'Administrative Support',
            count:8
        },
        {
            name:'Software Enginner',
            count:1
        }
    ]
}

export const shopData = {
    "sizes": [
        {
            size: 'Extra Small',
            slug: 'xs'
        },
        {
            size: 'Small',
            slug: 'sm'
        },
        {
            size: 'Medium',
            slug: 'md'
        },
        {
            size: 'Large',
            slug: 'l'
        },
        {
            size: 'Extra Large',
            slug: 'xl'
        }
    ],

    "colors": [
        {
            color: '#cc9966',
            color_name: 'Brown'
        },
        {
            color: '#3399cc',
            color_name: 'Blue'
        },
        {
            color: '#9966cc',
            color_name: 'Purple'
        },
        {
            color: '#333333',
            color_name: 'Black'
        },
        {
            color: '#669933',
            color_name: 'Green'
        },
        {
            color: '#cc3333',
            color_name: 'Red'
        },
        {
            color: '#999999',
            color_name: 'Grey'
        }
    ],

    "categories": [
        {
            name: "All",
            slug: "furniture",
            count: 8
        },
        {
            name: "Tops",
            slug: "furniture",
            count: 8
        },
        {
            name: "Jumpsuits",
            slug: "coffee-and-tables",
            count: 1
        },
        {
            name: "Dresses",
            slug: "lighting",
            count: 3
        },
        {
            name: "Bottoms",
            slug: "decoration",
            count: 5
        },
        {
            name: "Vests & Jackets",
            slug: "electronics",
            count: 1
        }
    ],
    "occasions":[
        {
            name:"Diwali",
            slug:"diwali",
            count: 5
        },
        {
            name:"Holi",
            slug:"holi",
            count: 3
        },
        {
            name:"Christmas",
            slug:"christmas",
            count: 3
        },
        {
            name:"Eid",
            slug:"eid",
            count: 3
        },
        {
            name:"New Year",
            slug:"new-year",
            count: 3
        }
    ],
    "materials":[
        {
            name:"Cotton",
            slug:"cotton",
            count: 3
        },
        {
            name:"Silk",
            slug:"silk",
            count: 3
        },
        {
            name:"Denim",
            slug:"denim",
            count: 3
        },
        {
            name:"Leather",
            slug:"leather",
            count: 3
        },
        {
            name:"Wool",
            slug:"wool",
            count: 3
        }
    ],

    "prices": [
        {
            min: '0',
            max: '25',
            name: 'Under $25'
        },
        {
            min: '25',
            max: '50',
            name: '$25 to $50'
        },
        {
            min: '50',
            max: '100',
            name: '$50 to $100'
        },
        {
            min: '100',
            max: '200',
            name: '$100 to $200'
        },
        {
            min: '200',
            max: '9999',
            name: '$200 & Above'
        },
    ]
}

export const homeData = {
    brands: [
        {
            "name": "brand",
            "image": "images/brands/Schiaparelli.png",
            "width": 100,
            "height": 23
        },
        {
            "name": "brand",
            "image": "images/brands/LouisVuitton.png",
            "width": 80,
            "height": 34
        },
        {
            "name": "brand",
            "image": "images/brands/Vogue.png",
            "width": 100,
            "height": 30
        },
        {
            "name": "brand",
            "image": "images/brands/Gucci.png",
            "width": 110,
            "height": 39
        },
        {
            "name": "brand",
            "image": "images/brands/Cartier.png",
            "width": 100,
            "height": 48
        },
        {
            "name": "brand",
            "image": "images/brands/Armani.png",
            "width": 100,
            "height": 23
        },
        {
            "name": "brand",
            "image": "images/brands/CalvinKlein.png",
            "width": 63,
            "height": 32
        }
    ],
    instagrams: [
        {
            "img": "images/home/instagrams/1.jpg",
            "likes": 387,
            "comments": 45
        },
        {
            "img": "images/home/instagrams/2.jpg",
            "likes": 691,
            "comments": 87
        },
        {
            "img": "images/home/instagrams/3.jpg",
            "likes": 321,
            "comments": 54
        },
        {
            "img": "images/home/instagrams/4.jpg",
            "likes": 44,
            "comments": 55
        },
        {
            "img": "images/home/instagrams/5.jpg",
            "likes": 128,
            "comments": 99
        },
        {
            "img": "images/home/instagrams/6.jpg",
            "likes": 433,
            "comments": 25
        },
        {
            "img": "images/home/instagrams/7.jpg",
            "likes": 588,
            "comments": 44
        },
        {
            "img": "images/home/instagrams/8.jpg",
            "likes": 87,
            "comments": 23
        },
        {
            "img": "images/home/instagrams/9.jpg",
            "likes": 87,
            "comments": 23
        }
    ]
}

export const mainSlider1 = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3,
            dots: true
        }
    }
}

export const mainSlider2 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
}

export const mainSlider3 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            nav: true,
            items: 4
        }
    }
}

export const mainSlider4 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}

export const mainSlider5 = {
    nav: false,
    dots: true,
    margin: 20,
    loop: true,
    responsive: {
        1200: {
            nav: true
        }
    }
}

export const mainSlider6 = {
    nav: false,
    dots: true,
    margin: 20,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 2,
            nav: true
        }
    }
}

export const mainSlider7 = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 3,
            nav: true
        }
    }
}

export const mainSlider8 = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    items: 2,
    responsive: {
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 4
        },
        1400: {
            nav: true,
            items: 4
        }
    }
}

export const mainSlider9 = {
    nav: true,
    dots: false,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        992: {
            items: 3
        }
    }
}

export const mainSlider10 = {
    loop: false,
    dots: false,
    responsive: {
        772: {
            nav: true
        }
    }
}

export const mainSlider11 = {
    nav: false,
    dots: true,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6,
            nav: true,
            dots: false
        }
    }
}


export const mainSlider12 = {
    nav: true,
    dots: false,
    margin: 20,
    loop: false,
    autoplay: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
}

export const featuredSlider = {
    nav: true,
    dots: true,
    margin: 20,
    loop: false,
    autoPlay: false,
    responsive: {
        0: {
            items: 2,
        },
        576: {
            items: 3
        },
        992: {
            items: 4
        }
    }
}

export const introSlider = {
    nav: false,
    dots: false,
    loop: false,
    responsive: {
        1200: {
            nav: false,
            dots: true
        }
    }
}

export const brandSlider = {
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1360: {
            items: 7
        }
    }
}

export const productSlider = {
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    autoHeight: true,
    responsive: {
        320: {
            items: 2
        },
        768: {
            items: 3
        },
        1200: {
            items: 4
        },
        1600: {
            items: 5,
            nav: true,
            dots: false
        }
    }
}

export const blogSlider = {
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    autoHeight: true,
    autoplay: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3,
            dots: true
        }
    }
}

export const trendingSlider = {
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        320: {
            items: 2,
            margin: 10,
            dots: true
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 4,
            nav: true,
        }
    }
}