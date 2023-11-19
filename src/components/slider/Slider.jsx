import "./slider.scss";

import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { Link } from "react-router-dom";

import firstSlideDesktop from "../../resources/images/slide1.jpg";
import firstSlideMobile from "../../resources/images/slide1Mobile.jpg";
import secondSlideDesktop from "../../resources/images/slide2.jpg";
import secondSlideMobile from "../../resources/images/slide2Mobile.jpg";

export default function Slider() {
  const swiperRef = useRef(null);
  const arr = [
    {
      desktopUrl: firstSlideDesktop,
      targetUrl: "https://www.google.com/",
      mobileUrl: firstSlideMobile,
      alt: "some_alt",
    },
    {
      desktopUrl: secondSlideDesktop,
      targetUrl: "https://www.google.com/",
      mobileUrl: secondSlideMobile,
      alt: "some_alt",
    },
  ];

  useEffect(() => {
    // Register Swiper web component
    register();
    // object with parameters
    const params = {
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: true,
      slidesPerView: 1,
      loop: true,

      //test adaptive config
      breakpoints: {
        0: {
          spaceBetween: 5,
        },
        320: {
          spaceBetween: 8,
        },
        480: {
          spaceBetween: 10,
        },
        600: {
          spaceBetween: 15,
        },
        801: {
          spaceBetween: 20,
        },
        1025: {
          spaceBetween: 30,
        },
      },

      injectStyles: [
        `.swiper-button-next,
         .swiper-button-prev {
          top: 47%;
          color: #FF7020;
          height: 54px;
          width: 54px;
          
        }
        .swiper-button-next svg path {
          transform: scale(0.8) translateY(1.5px);
        }

        .swiper-button-prev svg path{
          transform: scale(0.8) rotate(180deg);
        }

        .swiper-button-next svg path,
         .swiper-button-prev svg path {
          stroke: #FF7020;
          stroke-width: 1px !important;
          filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
        }
  
        .swiper-pagination-bullet{
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          background-color: #22C580 !important;
        }
         `,
      ],
    };
    // assign it to swiper element
    Object.assign(swiperRef.current, params);
    // initialize swiper
    swiperRef.current.initialize();
  }, []);

  const slides = arr.map((item, i) => {
    return (
      <swiper-slide class="slide" key={i}>
        <Link to={`${item.targetUrl}`}>
          <picture>
            <source
              height="496"
              width="894"
              media="(max-width: 1024px)"
              srcSet={item.mobileUrl}
            />
            <img
              src={item.desktopUrl}
              height="426"
              width="1264"
              alt={item.alt}
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          </picture>
        </Link>
      </swiper-slide>
    );
  });

  return (
    <div className="slider-container">
      <swiper-container init="false" ref={swiperRef} class="mySwiper">
        {slides}
      </swiper-container>
    </div>
  );
}
