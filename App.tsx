import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES, SlideData } from './constants';
import { SlideLayout } from './components/SlideLayout';
import { 
  CoverSlide, 
  ImageSlide,
  TableCapitalSlide,
  InfoSlide,
  TutorContentSlide,
  GridSlide,
  ObjectivesSlide,
  ClosingSlide,
  EcosystemCirclesSlide,
  WordRaffleSlide,
  DownloadSlide
} from './components/Slides';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpToSlide = useCallback((index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
  }, [currentSlideIndex]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderSlide = (data: SlideData) => {
      switch (data.type) {
        case 'cover':
          return <CoverSlide data={data} />;
        case 'image':
          return <ImageSlide data={data} />;
        case 'table-capital':
          return <TableCapitalSlide data={data} />;
        case 'info':
          return <InfoSlide data={data} />;
        case 'tutor-content':
          return <TutorContentSlide data={data} />;
        case 'grid':
          return <GridSlide data={data} />;
        case 'objectives':
          return <ObjectivesSlide data={data} />;
        case 'ecosystem-circles':
          return <EcosystemCirclesSlide data={data} />;
        case 'raffle':
          return <WordRaffleSlide data={data} />;
        case 'download':
          return <DownloadSlide data={data} />;
        case 'closing':
          return <ClosingSlide data={data} onJumpToSlide={jumpToSlide} />;
        default:
          return <div className="text-red-500">Slide type not found</div>;
      }
  };

  const currentSlideData = SLIDES[currentSlideIndex];

  // Normal View
  return (
    <SlideLayout
      currentSlide={currentSlideIndex}
      totalSlides={SLIDES.length}
      onNext={nextSlide}
      onPrev={prevSlide}
      onJumpToSlide={jumpToSlide}
      title={currentSlideData.type !== 'cover' && currentSlideData.type !== 'closing' ? currentSlideData.title : undefined}
      subtitle={currentSlideData.type !== 'cover' && currentSlideData.type !== 'closing' ? currentSlideData.subtitle : undefined}
      direction={direction}
    >
      {renderSlide(currentSlideData)}
    </SlideLayout>
  );
};

export default App;