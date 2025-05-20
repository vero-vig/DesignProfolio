import React, { useState } from 'react';
import Slider from 'react-slick';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

// Import slick carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom CSS for dots and arrows
import './imageGallery.css';

interface ImageGalleryProps {
  images: string[];
  originalImages?: string[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, originalImages, title }) => {
  // If no original images are provided, use the thumbnails for lightbox too
  const fullSizeImages = originalImages || images;
  
  // Debug log to check what images we're getting
  console.log('Gallery images:', { 
    thumbnails: images, 
    originals: originalImages,
    using: fullSizeImages
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Determine if we should show navigation elements
  const maxSlides = 4; // Maximum number of slides to show at once
  const slidesToShow = Math.min(maxSlides, images.length);
  const lastSlideIndex = Math.max(0, images.length - slidesToShow);
  
  // Should we show arrows?
  const showArrows = images.length > slidesToShow;
  const showLeftArrow = showArrows && currentSlide > 0;
  const showRightArrow = showArrows && currentSlide < lastSlideIndex;
  
  // Custom arrow components
  const NextArrow = (props: any) => {
    const { onClick } = props;
    if (!showRightArrow) return null;
    
    return (
      <div className="gallery-next-arrow" onClick={onClick}>
        <div className="bg-white/80 hover:bg-purple-100 p-2 rounded-full shadow-md transition-colors">
          <ChevronRight className="h-6 w-6 text-purple-600" />
        </div>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    if (!showLeftArrow) return null;
    
    return (
      <div className="gallery-prev-arrow" onClick={onClick}>
        <div className="bg-white/80 hover:bg-purple-100 p-2 rounded-full shadow-md transition-colors">
          <ChevronLeft className="h-6 w-6 text-purple-600" />
        </div>
      </div>
    );
  };

  // Slider settings for the carousel
  const settings: {[key: string]: any} = {
    dots: showArrows,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: showArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, images.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, images.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fullSizeImages.length);
  };

  const navigatePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + fullSizeImages.length) % fullSizeImages.length);
  };

  return (
    <div className="mb-10">
      <div className="gallery-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="px-2 focus:outline-none" onClick={() => openLightbox(index)}>
              <div className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white p-1">
                <div className="w-full aspect-square relative">
                  <OptimizedImage
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={navigatePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div className="max-w-[90vw] max-h-[80vh] relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <OptimizedImage
              src={fullSizeImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
              loading="eager"
            />
          </div>

          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={navigateNext}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;