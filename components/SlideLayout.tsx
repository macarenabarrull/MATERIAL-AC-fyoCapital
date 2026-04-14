import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Maximize, Minimize, Keyboard, X, MousePointer2, 
  Sparkles, Home, Target, Users, Info, GraduationCap, CheckCircle2, Compass,
  BrainCircuit, Layers, Zap, ClipboardCheck, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDES } from '../constants';

interface SlideLayoutProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onJumpToSlide: (index: number) => void;
  title?: string;
  subtitle?: string;
  direction?: number;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev,
  onJumpToSlide,
  title,
  subtitle,
  direction = 0
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showIndex, setShowIndex] = useState(false);
  const [showTouchHint, setShowTouchHint] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Force light mode always
  useEffect(() => {
    setIsDarkMode(false);
  }, []);
  
  // Parallax Logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if ('ontouchstart' in window) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Swipe Logic
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
        onNext();
    }
    if (isRightSwipe && currentSlide > 0) {
        onPrev();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Wake Lock Logic
  const wakeLock = useRef<any>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator && (navigator as any).wakeLock) {
          wakeLock.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err: any) {
        // Silently fail for permission errors in restricted environments (like iframes)
        if (err.name !== 'NotAllowedError' && err.name !== 'SecurityError') {
          console.warn(`WakeLock failed: ${err.name}, ${err.message}`);
        }
      }
    };

    const releaseWakeLock = () => {
      if (wakeLock.current !== null) {
        wakeLock.current.release();
        wakeLock.current = null;
      }
    };

    if (isFullscreen) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => releaseWakeLock();
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Hide shortcuts toast after 4 seconds
    const timer = setTimeout(() => setShowShortcuts(false), 4000);

    // Show touch hint on mobile
    if ('ontouchstart' in window) {
      const hintTimer = setTimeout(() => setShowTouchHint(true), 2000);
      const hideHintTimer = setTimeout(() => setShowTouchHint(false), 6000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hintTimer);
        clearTimeout(hideHintTimer);
      }
    }

    return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        clearTimeout(timer);
    }
  }, []);

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 1.02,
      filter: 'blur(10px)',
    }),
  };

  return (
    <div 
        className={`h-screen w-full flex flex-col relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-900 print:h-auto print:overflow-visible transition-colors duration-1000 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
      {/* --- PREMIUM BACKGROUND --- */}
      <div className={`absolute inset-0 w-full h-full overflow-hidden -z-10 print:hidden ${isDarkMode ? 'bg-slate-950' : 'bg-[#fcfdfe]'}`}>
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-noise z-10"></div>
          
          {/* Animated Blobs with Parallax - More subtle and larger */}
          <motion.div 
            animate={{ x: mousePos.x * 0.8, y: mousePos.y * 0.8 }}
            transition={{ type: 'spring', damping: 60, stiffness: 80 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className={`absolute top-[-10%] -left-[10%] w-[800px] h-[800px] rounded-full mix-blend-soft-light filter blur-[140px] animate-blob ${isDarkMode ? 'bg-indigo-400 opacity-[0.05]' : 'bg-indigo-100 opacity-10'}`}></div>
            <div className={`absolute top-[-5%] -right-[10%] w-[700px] h-[700px] rounded-full mix-blend-soft-light filter blur-[140px] animation-delay-2000 animate-blob ${isDarkMode ? 'bg-emerald-400 opacity-[0.03]' : 'bg-emerald-50 opacity-8'}`}></div>
            <div className={`absolute -bottom-[10%] left-[15%] w-[800px] h-[800px] rounded-full mix-blend-soft-light filter blur-[140px] animation-delay-4000 animate-blob ${isDarkMode ? 'bg-slate-300 opacity-[0.05]' : 'bg-slate-100 opacity-10'}`}></div>
            
            {/* Floating Organic Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] w-12 h-12 border-2 border-indigo-200/30 rounded-2xl rotate-12"
            />
            <motion.div 
              animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute bottom-[30%] right-[15%] w-16 h-16 border-2 border-emerald-200/20 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute top-[60%] left-[5%] w-4 h-4 bg-indigo-400/10 rounded-full"
            />
          </motion.div>
          
          {/* Large Static Gradients for depth */}
          <div className={`absolute top-[-20%] right-[-10%] w-[100vw] h-[100vw] rounded-full blur-[180px] pointer-events-none ${isDarkMode ? 'bg-gradient-to-b from-indigo-400/10 to-transparent' : 'bg-gradient-to-b from-indigo-50/20 to-transparent'}`} />
          
          {/* Grain Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* Top Progress Bar - Minimalist */}
      <div className="absolute top-0 left-0 h-1.5 bg-slate-100/50 w-full z-50 print:hidden">
          <motion.div 
            className="h-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] relative"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          >
            <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-white/80 backdrop-blur-md rounded-md border border-slate-100 shadow-sm">
                <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest whitespace-nowrap">
                    Paso {currentSlide + 1} de {totalSlides}
                </span>
            </div>
          </motion.div>
      </div>

      {/* Header - Minimalist & Elegant */}
      <header className={`flex-none px-8 py-4 md:px-12 flex justify-between items-center z-20 print:hidden h-20 md:h-24 transition-all duration-700 ${isReadingMode ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <motion.div 
          layoutId="brand-header"
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => onJumpToSlide(0)}
        >
          {/* Fyo Logo */}
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:bg-indigo-600 transition-colors">
            fyo
          </div>
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          <div className="flex flex-col leading-tight">
             <span className="text-[10px] md:text-[11px] font-black tracking-[0.25em] text-slate-900 uppercase">Jóvenes Profesionales</span>
             <span className="text-[9px] md:text-[10px] text-slate-400 font-bold tracking-widest uppercase">Assessment Center</span>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-2 md:gap-4 bg-white/60 backdrop-blur-2xl p-2 rounded-full border border-white shadow-xl">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsReadingMode(true)}
                className="p-2.5 text-slate-400 hover:text-indigo-600 transition-all rounded-full hover:bg-white border border-transparent"
                title="Modo Lectura (Foco)"
              >
                <Keyboard size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowIndex(!showIndex)}
                className={`p-2.5 transition-all rounded-full border ${
                  showIndex 
                  ? 'bg-slate-900 text-white border-slate-800 shadow-xl' 
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-white border-transparent'
                }`}
                title="Índice de diapositivas"
              >
                <Sparkles size={18} className={showIndex ? 'animate-pulse' : ''} />
              </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="p-2.5 text-slate-400 hover:text-indigo-600 transition-all rounded-full hover:bg-white border border-transparent"
              title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </motion.button>
        </div>
      </header>

      {/* Reading Mode Exit Button */}
      <AnimatePresence>
        {isReadingMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsReadingMode(false)}
            className="absolute top-6 right-6 z-[100] p-3 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-indigo-600 transition-all group"
          >
            <X size={20} />
            <span className="absolute right-full mr-3 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Salir del modo foco</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Content Area - Optimized Spacing */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto px-16 md:px-32 pt-10 md:pt-16 relative z-10 flex flex-col justify-center print:block print:max-w-none print:px-0 min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 150, damping: 25 },
                    opacity: { duration: 0.4 }
                }}
                className="w-full h-full flex flex-col justify-center"
            >
                {title && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mb-6 md:mb-10 print:mb-4 shrink-0"
                    >
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-[0.95] drop-shadow-sm font-display uppercase">
                        {title}
                        </h1>
                        {subtitle && (
                            <div className="flex items-center gap-3 mt-2">
                                <div className="h-0.5 w-6 bg-indigo-600 rounded-full"></div>
                                <p className="text-slate-400 text-xs md:text-sm font-bold tracking-wide">
                                    {subtitle}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
                <div className="w-full h-full flex flex-col justify-center print:block overflow-y-auto md:overflow-visible py-2 custom-scrollbar">
                    {children}
                </div>
            </motion.div>
        </AnimatePresence>
      </main>

      {/* Index Sidebar - Deep Glass Overlay */}
      <AnimatePresence>
        {showIndex && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIndex(false)}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] print:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-[300px] bg-white/80 backdrop-blur-2xl border-l border-white/40 z-[70] shadow-2xl flex flex-col print:hidden"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-xl font-black tracking-tight text-slate-900">Índice</h2>
                <button onClick={() => setShowIndex(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {SLIDES.map((slide, idx) => {
                  const isCurrent = idx === currentSlide;
                  // Map slide types/ids to icons
                  const getSlideIcon = () => {
                    if (slide.type === 'cover') return Home;
                    if (slide.type === 'objectives') return Target;
                    if (slide.type === 'info') return Users;
                    if (slide.type === 'academy-split') return GraduationCap;
                    if (slide.type === 'closing') return CheckCircle2;
                    if (slide.type === 'tutor-content') {
                      // Use the icon from content if it exists in our imports
                      const iconName = slide.content?.icon;
                      if (iconName === 'Compass') return Compass;
                      if (iconName === 'Target') return Target;
                      if (iconName === 'BrainCircuit') return BrainCircuit;
                      if (iconName === 'Layers') return Layers;
                      if (iconName === 'Zap') return Zap;
                      if (iconName === 'ClipboardCheck') return ClipboardCheck;
                      if (iconName === 'Heart') return Heart;
                      if (iconName === 'Sparkles') return Sparkles;
                    }
                    return Info;
                  };
                  const Icon = getSlideIcon();

                  return (
                    <button
                      key={slide.id}
                      onClick={() => {
                        onJumpToSlide(idx);
                        setShowIndex(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-4 group ${
                        isCurrent 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                        : 'hover:bg-indigo-50 text-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isCurrent ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'
                      }`}>
                        <Icon size={18} className={isCurrent ? 'text-white' : 'text-slate-400'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-black truncate leading-tight ${isCurrent ? 'text-white' : 'text-slate-800'}`}>
                          {slide.title || (slide.type === 'cover' ? 'Portada' : slide.type)}
                        </div>
                        <div className={`text-[10px] font-bold truncate opacity-70 ${isCurrent ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {slide.subtitle || slide.type}
                        </div>
                      </div>
                      {isCurrent && (
                        <motion.div layoutId="active-indicator">
                          <Sparkles size={14} className="text-white animate-pulse" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Touch Hint */}
      <AnimatePresence>
        {showTouchHint && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[55] flex flex-col items-center gap-2 pointer-events-none print:hidden"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ x: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-3 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-lg"
              >
                <MousePointer2 size={24} className="text-indigo-500 rotate-90" />
              </motion.div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full">Desliza para navegar</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcuts Toast - Deep Glass */}
      <AnimatePresence>
        {showShortcuts && (
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-24 right-8 z-50 bg-slate-900/80 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center gap-4 backdrop-blur-xl border border-white/10 pointer-events-none print:hidden"
            >
                <Keyboard size={20} className="text-indigo-400" />
                <div className="text-sm font-medium tracking-wide">
                    Usa <span className="font-mono bg-white/10 border border-white/20 px-2 py-0.5 rounded text-xs mx-1">←</span> <span className="font-mono bg-white/10 border border-white/20 px-2 py-0.5 rounded text-xs mx-1">→</span> para navegar
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Navigation Controls */}
      <footer className={`flex-none px-8 py-4 md:px-12 md:py-6 flex justify-between items-center z-20 print:hidden h-20 md:h-24 transition-all duration-500 ${isReadingMode ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        {/* Pagination Dots - Premium Style */}
        <div className="flex gap-3">
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <motion.button 
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => onJumpToSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-700 ease-out
                        ${idx === currentSlide 
                            ? 'w-10 bg-indigo-600' 
                            : 'w-2 bg-slate-200 hover:bg-indigo-200'}`}
                />
            ))}
        </div>

        {/* Navigation Buttons - Elegant Glass Style */}
        <div className="flex items-center gap-4">
            <motion.button 
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="group p-4 rounded-full glass-border bg-white/40 backdrop-blur-xl hover:bg-white/60 disabled:opacity-20 transition-all shadow-sm active:scale-90"
            >
            <ChevronLeft size={20} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </motion.button>

            <motion.button 
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="group p-4 rounded-full bg-slate-900/90 backdrop-blur-xl hover:bg-indigo-700 disabled:opacity-20 transition-all shadow-xl active:scale-90 glass-border"
            >
            <ChevronRight size={20} className="text-white transition-colors" />
            </motion.button>
        </div>
      </footer>
    </div>
  );
};