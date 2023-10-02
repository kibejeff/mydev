import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';


const ShopBanner =()=>  {
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
			<div className='ps-shop-banner'>
				<Slider {...carouselSetting} fade={true} className='ps-carousel'>
					<img
						src='https://res.cloudinary.com/ddntgj0zd/image/upload/v1686750176/dishwasher_ekskih.png'
						alt='powerpay-africa'
					/>
					{/* <img
						src='/static/img/slider/shop-default/2.jpg'
						alt='powerpay-africa'
					/> */}
				</Slider>
			</div>
		);
}

export default ShopBanner;
