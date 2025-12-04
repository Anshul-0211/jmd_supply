import React, { useState, useEffect, useRef, useMemo } from 'react';
import img1 from '../images/bg1.jpg';

const BackgroundCarousel = ({ onTitleChange }) => {
  // --- Original Slides Data ---
  const slides = useMemo(() => [
    {
      image: img1,
      title: 'Global Logistics Network'
    },
    {
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Warehouse Solutions'
    },
    {
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Supply Chain Excellence'
    }
  ], []); // useMemo ensures slides array doesn't change unnecessarily

  // --- Constants ---
  const SLIDE_DURATION = 3500; // Time each slide is visible
  const TRANSITION_DURATION = 700; // Duration of the slide animation (ms)

  // --- State ---
  // activeIndex tracks the current slide in the extendedSlides array
  // Starts at 1, which corresponds to the *first actual* slide
  const [activeIndex, setActiveIndex] = useState(1);
  // Flag to prevent multiple transitions at once
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Flag to enable/disable CSS transition for instant jumps
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  // Progress bar state
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);

  // --- Derived Data: Extended Slides for Infinite Loop ---
  // Clone last slide to the beginning, clone first slide to the end
  const extendedSlides = useMemo(() => [
    slides[slides.length - 1], // Clone of last slide
    ...slides,
    slides[0]                  // Clone of first slide
  ], [slides]);

  // --- Handlers ---
  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionEnabled(true); // Ensure transition is on for normal slide change
    setActiveIndex(prev => prev + 1);
    setProgress(0); // Reset progress on manual navigation
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionEnabled(true); // Ensure transition is on for normal slide change
    setActiveIndex(prev => prev - 1);
    setProgress(0); // Reset progress on manual navigation
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
  };

  const handleDotClick = (originalIndex) => {
    const newActiveIndex = originalIndex + 1; // Map original index to extended index
    if (newActiveIndex === activeIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTransitionEnabled(true); // Ensure transition is on for dot click
    setActiveIndex(newActiveIndex);
    setProgress(0); // Reset progress on manual navigation
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
  };

  // --- Effects ---

  // Effect for Auto-play and Progress Bar
  useEffect(() => {
    // Clear previous intervals/timeouts
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);

    // Don't start new timers if currently transitioning (e.g., during jump)
    if (isTransitioning && !transitionEnabled) return;

    // Start progress bar interval
    setProgress(0); // Reset progress when slide changes
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100; // Cap at 100
        }
        // Calculate increment based on desired total duration
        return prevProgress + (100 / (SLIDE_DURATION / 50)); // 50ms interval
      });
    }, 50);

    // Start auto-play timeout
    autoPlayTimeoutRef.current = setTimeout(() => {
      // Check isTransitioning again before auto-advancing
      if (!isTransitioning) {
        handleNextSlide();
      }
    }, SLIDE_DURATION);

    // Cleanup function
    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(autoPlayTimeoutRef.current);
    };
    // Rerun when the active slide index changes (excluding jumps) or when transitioning state finishes
  }, [activeIndex, isTransitioning, transitionEnabled, SLIDE_DURATION]); // Added dependencies

  // Effect to handle the "jump" when reaching cloned slides
  useEffect(() => {
    // If we have transitioned to the first clone (index 0)
    if (activeIndex === 0) {
      // Wait for the slide transition animation to finish
      const jumpTimer = setTimeout(() => {
        setTransitionEnabled(false); // Disable CSS transition
        setActiveIndex(slides.length); // Jump to the *real* last slide's index
      }, TRANSITION_DURATION);
      return () => clearTimeout(jumpTimer);
    }

    // If we have transitioned to the last clone (index extendedSlides.length - 1)
    if (activeIndex === extendedSlides.length - 1) {
      // Wait for the slide transition animation to finish
      const jumpTimer = setTimeout(() => {
        setTransitionEnabled(false); // Disable CSS transition
        setActiveIndex(1); // Jump to the *real* first slide's index
      }, TRANSITION_DURATION);
      return () => clearTimeout(jumpTimer);
    }

  }, [activeIndex, slides.length, extendedSlides.length, TRANSITION_DURATION]);

  // Effect to re-enable transitions and reset isTransitioning flag
  useEffect(() => {
      // If transition was disabled (meaning a jump just happened)
      if (!transitionEnabled) {
          // Use a microtask or minimal timeout to allow the state update (jump)
          // to render *before* re-enabling the transition CSS.
          const enableTransitionTimer = setTimeout(() => {
              setTransitionEnabled(true);
              setIsTransitioning(false); // Allow new transitions *after* jump completes
          }, 50); // Short delay
          return () => clearTimeout(enableTransitionTimer);
      }
      // If it was a normal transition (not a jump)
      else if (isTransitioning) {
          // Reset isTransitioning after the normal animation duration
          const transitionEndTimer = setTimeout(() => {
             setIsTransitioning(false);
          }, TRANSITION_DURATION);
          return () => clearTimeout(transitionEndTimer);
      }
  }, [transitionEnabled, isTransitioning, TRANSITION_DURATION]);


  // Effect to call the onTitleChange callback
  useEffect(() => {
    if (onTitleChange) {
      // Calculate the index corresponding to the *original* slides array
      // Adjust for the prepended clone: (activeIndex - 1)
      // Handle wrap around: % slides.length
      // Ensure positive result: + slides.length
      const originalIndex = (activeIndex - 1 + slides.length) % slides.length;

      // Only call if the index is valid for the original slides
      if (originalIndex >= 0 && originalIndex < slides.length) {
         onTitleChange(slides[originalIndex].title);
      }
    }
  }, [activeIndex, onTitleChange, slides]);

  // --- Render ---
  return (
    // Outermost container ensures absolute positioning context if needed
    <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col">
       {/* Progress Bar */}
       <div className="w-full h-1 bg-transparent z-30 relative">
         <div
           className="h-full bg-white transition-width duration-50 ease-linear" // Use transition-width
           style={{ width: `${progress}%` }}
         ></div>
       </div>

       {/* Carousel Viewport */}
       <div className="flex-1 relative overflow-hidden"> {/* Added overflow-hidden here */}
         {/* Inner container that moves */}
         <div
           className={`flex h-full`} // Use flexbox
           style={{
             width: `${extendedSlides.length * 100}%`, // Full width for all slides
             transform: `translateX(-${activeIndex * (100 / extendedSlides.length)}%)`, // Calculate offset
             transition: transitionEnabled
               ? `transform ${TRANSITION_DURATION}ms ease-in-out`
               : 'none', // Apply transition conditionally
             maxWidth: `${extendedSlides.length * 100}%`,  // Ensure container doesn't exceed its intended width
           }}
         >
           {/* Map over the EXTENDED slides */}
           {extendedSlides.map((slide, index) => (
             <div
               key={index} // Use index for keys as content might repeat
               className="w-full h-full flex-shrink-0" // Ensure each slide takes full width
               style={{
                 width: `${100 / extendedSlides.length}%`, // Set individual slide width
                 backgroundImage: `url(${slide.image})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 maxWidth: `${100 / extendedSlides.length}%`, // Ensure no slide exceeds its allocation
               }}
             />
           ))}
         </div>

         {/* Navigation Buttons */}
         <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20 pointer-events-none"> {/* Disable pointer events on container */}
           <button
             onClick={handlePrevSlide}
             className="bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center group backdrop-blur-sm pointer-events-auto" // Enable pointer events on button
             aria-label="Previous slide"
             disabled={isTransitioning} // Disable button during transition
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
             </svg>
           </button>

           <button
             onClick={handleNextSlide}
             className="bg-black/30 hover:bg-black/50 text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center group backdrop-blur-sm pointer-events-auto" // Enable pointer events on button
             aria-label="Next slide"
             disabled={isTransitioning} // Disable button during transition
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
             </svg>
           </button>
         </div>

         {/* Removed Title Display from Carousel - Handled by onTitleChange prop */}
         {/* <div className="absolute bottom-24 left-0 right-0 text-center z-20"></div> */}

         {/* Navigation Dots */}
         <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 z-20">
           {/* Map over the ORIGINAL slides for dots */}
           {slides.map((_, index) => {
             // Calculate which original slide index corresponds to the current activeIndex
             const originalIndexCorrespondsToActive = (activeIndex - 1 + slides.length) % slides.length;
             const isActive = index === originalIndexCorrespondsToActive;

             return (
               <button
                 key={index}
                 onClick={() => handleDotClick(index)}
                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
                   isActive
                     ? 'bg-white scale-110'
                     : 'bg-white/50 hover:bg-white/80'
                 }`}
                 aria-label={`Go to slide ${index + 1}`}
                 disabled={isTransitioning} // Disable dots during transition
               />
             );
           })}
         </div>
       </div>
     </div>
  );
};

export default BackgroundCarousel;
