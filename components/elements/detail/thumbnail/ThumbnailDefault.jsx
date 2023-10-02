import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import { useSelector } from 'react-redux';

function ThumbnailDefault({ product, vertical = true }) {
	const { productImages } = useSelector((state) => state.products);
	const galleryCarousel = useRef(null);
	const variantCarousel = useRef(null);
	const [gallery, setGallery] = useState(null);
	const [variant, setVariant] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);
    const [activeImage, setactiveImage] = useState(productImages)

	const handleOpenLightbox = (e, imageIndex) => {
		e.preventDefault();
		setPhotoIndex(imageIndex);
		setIsOpen(true);
	};

	useEffect(() => {
        let img = []
        if (productImages.length === 0) {
            img.push(product.image_url)
            setactiveImage(img)
        }
		setGallery(galleryCarousel.current);
		setVariant(variantCarousel.current);
	}, [product, productImages]);

	const gallerySetting = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	const variantSetting = {
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					dots: false,
					arrows: false,
					vertical: false,
					infinite: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
					dots: false,
					arrows: false,
					vertical: false,
					infinite: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4,
					dots: false,
					arrows: false,
					vertical: false,
					infinite: false,
				},
			},
		],
	};

	//Views
	let lightboxView, variantCarouselView, imagesView, galleryImagesView;
	if (productImages?.length) {
		imagesView = productImages.map((item) => (
			<div className='item' key={item}>
				<img width={56} height={57} src={item} alt={item} />
			</div>
		));
		galleryImagesView = productImages.map((item, index) => (
			<div className='item' key={item}>
				<a href='#' onClick={(e) => handleOpenLightbox(e, index)}>
					<img width={'100%'} height={353} src={item} alt={item} />
				</a>
			</div>
		));
	} else {
		imagesView = activeImage.map((item) => (
			<div className='item' key={item}>
				<img
					width={56}
					height={57}
					src={item}
					alt={item}
				/>
			</div>
		));
		galleryImagesView = activeImage.map((item, index) => (
			<div className='item' key={item}>
				<a href='#' onClick={(e) => handleOpenLightbox(e, index)}>
					<img
						width={'100%'}
						height={353}
						src={item}
						alt={item}
					/>
				</a>
			</div>
		));
	}

	if (vertical) {
		variantCarouselView = (
			<Slider
				asNavFor={gallery}
				ref={(slider) => (variantCarousel.current = slider)}
				swipeToSlide={true}
				arrows={false}
				slidesToShow={3}
				vertical={true}
				infinite={true}
				focusOnSelect={true}
				{...variantSetting}
				className='ps-product__variants'
			>
				{imagesView}
			</Slider>
		);
	} else {
		variantCarouselView = (
			<Slider
				asNavFor={gallery}
				ref={(slider) => (variantCarousel.current = slider)}
				swipeToSlide={true}
				arrows={false}
				slidesToShow={6}
				vertical={false}
				centered={true}
				infinite={false}
				focusOnSelect={true}
				className='ps-product__variants'
			>
				{imagesView}
			</Slider>
		);
	}
	if (isOpen) {
		lightboxView = (
			<Lightbox
				mainSrc={activeImage[photoIndex]}
				nextSrc={activeImage[(photoIndex + 1) % activeImage.length]}
				prevSrc={
					activeImage[
						(photoIndex + activeImage.length - 1) % activeImage.length
					]
				}
				onCloseRequest={() => {
					setIsOpen(false);
				}}
				onMovePrevRequest={() => {
					setPhotoIndex(
						(photoIndex + activeImage.length - 1) % activeImage.length,
					);
				}}
				onMoveNextRequest={() => {
					setPhotoIndex((photoIndex + 1) % activeImage.length);
				}}
			/>
		);
	}

	return (
		<div
			className='ps-product__thumbnail'
			data-vertical={vertical ? 'true' : 'false'}
		>
			<figure>
				<div className='ps-wrapper'>
					<Slider
						{...gallerySetting}
						ref={(slider) => (galleryCarousel.current = slider)}
						asNavFor={variant}
						className='ps-product__gallery ps-carousel inside'
					>
						{galleryImagesView}
					</Slider>
				</div>
			</figure>
			{variantCarouselView}
			{lightboxView}
		</div>
	);
}

export default ThumbnailDefault;
