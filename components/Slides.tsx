import React from 'react';
import { SlideData } from '../constants';
import { 
  Users, Calendar, GraduationCap, FileText, Flag, Heart, 
  BrainCircuit, Zap, ClipboardCheck, PencilRuler, Search, FileSignature, 
  Rocket, BarChart3, Compass, Target, Layers, Sparkles, DollarSign, Briefcase,
  Mail, RotateCcw, Clock, Lightbulb, Quote, Download
} from 'lucide-react';
import { motion } from "framer-motion";
import { jsPDF } from 'jspdf';

interface SlideProps {
  data: SlideData;
  onPrint?: () => void;
  onJumpToSlide?: (index: number) => void;
}

const IconMap: Record<string, any> = {
  Compass, Target, BrainCircuit, Layers, Zap, ClipboardCheck, Heart, Sparkles,
  Users, DollarSign, Briefcase, Calendar, GraduationCap, FileText, Flag,
  PencilRuler, Search, FileSignature, Rocket, BarChart3, Clock, Lightbulb
};

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 200, damping: 20 } }
};

// --- Reusable Premium Components ---
const OrganicShape: React.FC<{ children: React.ReactNode, bg: string, color: string, className?: string }> = ({ children, bg, color, className = "" }) => (
    <div className={`relative flex items-center justify-center ${bg} ${color} p-5 shadow-xl transition-all duration-700 rounded-[1.5rem] md:rounded-[2rem] ${className} group-hover:scale-110 group-hover:rotate-3`}>
        <div className={`absolute inset-0 ${bg} blur-2xl opacity-30 rounded-full -z-10 animate-pulse`} />
        <div className="absolute inset-0 glass-border rounded-[inherit] pointer-events-none" />
        {children}
    </div>
);

const GlowIcon: React.FC<{ icon: any, color: string, bg: string, size?: number }> = ({ icon: Icon, color, bg, size = 24 }) => (
    <OrganicShape bg={bg} color={color}>
        <div className="relative">
            <Icon size={size} strokeWidth={2.5} className="relative z-10" />
            <Icon size={size} strokeWidth={2.5} className="absolute inset-0 blur-sm opacity-50" />
        </div>
    </OrganicShape>
);

const GlassCard: React.FC<{ children?: React.ReactNode, className?: string, hover?: boolean, theme?: 'light' | 'dark' | 'brand' }> = ({ children, className = "", hover = false, theme = 'light' }) => {
    const themeClasses = {
        light: 'bg-white/70 border-white/80 shadow-sm glass-border',
        dark: 'bg-slate-900/90 border-slate-700/50 shadow-2xl text-white glass-border',
        brand: 'bg-indigo-600/5 border-indigo-500/20 shadow-md glass-border'
    };

    return (
        <div className={`
            backdrop-blur-2xl 
            rounded-2xl md:rounded-3xl
            relative overflow-hidden
            ${themeClasses[theme]}
            ${hover ? 'transition-all duration-500 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-2' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};

// 1. Cover Slide
export const CoverSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full text-center relative z-10"
        initial="hidden" animate="show" variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-4 relative w-full max-w-4xl px-6">
        {/* Universe Effect Background */}
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        rotate: { repeat: Infinity, duration: 20 + i * 10, ease: "linear" },
                        scale: { repeat: Infinity, duration: 5 + i, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div 
                        className="w-1 h-1 bg-indigo-400/40 rounded-full absolute"
                        style={{ 
                            top: `${20 + i * 15}%`, 
                            left: `${10 + i * 20}%`,
                            boxShadow: '0 0 8px #4f46e5'
                        }}
                    />
                </motion.div>
            ))}
        </div>

        <GlassCard theme={data.theme} className="p-10 md:p-16 flex flex-col items-center border-white/40 shadow-2xl relative overflow-visible bg-white/60 backdrop-blur-3xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent rounded-b-full" />
            
            <motion.div 
                layoutId="brand-tag"
                variants={itemVariants} 
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-100 bg-white shadow-xl text-slate-400 text-[9px] font-black tracking-[0.4em] uppercase mb-8"
            >
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                fyo
            </motion.div>
            
            <motion.h1 
                layoutId="slide-title"
                variants={itemVariants} 
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.85] font-display uppercase drop-shadow-sm"
            >
                {(data.title || '').split(' ').map((word, i) => {
                    const isSpecial = word.toUpperCase().includes('JP') || word.toUpperCase().includes('FYO');
                    return (
                        <span key={i} className={i % 2 === 1 && !isSpecial ? 'italic text-indigo-600 font-serif lowercase' : ''}>
                            {word}{' '}
                        </span>
                    );
                })}
            </motion.h1>
            
            <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-slate-500 font-bold tracking-widest mb-10 max-w-2xl leading-relaxed uppercase opacity-80"
            >
              {data.subtitle}
            </motion.p>

            {data.content?.tags && (
              <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-3">
                  {data.content.tags.map((tag: string, idx: number) => (
                  <motion.div 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ y: -5, borderColor: '#4f46e5', color: '#4f46e5' }}
                    className="px-6 py-3 bg-white text-slate-900 text-[10px] font-black tracking-[0.2em] uppercase rounded-2xl border border-slate-100 shadow-lg transition-all cursor-default"
                  >
                      {tag}
                  </motion.div>
                  ))}
              </motion.div>
            )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 2. Image Slide
export const ImageSlide: React.FC<SlideProps> = ({ data }) => {
  const [error, setError] = React.useState(false);
  
  return (
    <motion.div 
        className="flex flex-col justify-center items-center h-full relative z-10"
        initial="hidden" animate="show" variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full h-full flex flex-col items-center justify-center p-4">
        <GlassCard theme={data.theme} className="w-full max-w-4xl aspect-video overflow-hidden border-white/40 shadow-2xl relative flex items-center justify-center bg-slate-50 group">
          {!error ? (
            <img 
              src={data.content.imageUrl} 
              alt={data.content.alt || data.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-6 text-slate-300">
              <OrganicShape bg="bg-slate-100" color="text-slate-200" className="w-24 h-24">
                <Layers size={48} />
              </OrganicShape>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Ecosistema fyo</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          {data.title && (
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <motion.h2 
                layoutId="slide-title"
                className="text-white text-xl md:text-2xl font-black tracking-tighter font-display"
              >
                {data.title}
              </motion.h2>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 3. Agenda Slide (Table)
export const TableCapitalSlide: React.FC<SlideProps> = ({ data }) => {
    const { headers, rows } = data.content;
    const colCount = headers.length;
    
    return (
        <motion.div className="w-full flex flex-col items-center justify-center py-4" initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={itemVariants} className="w-full max-w-4xl">
                <GlassCard className="overflow-hidden shadow-2xl relative bg-white/60 backdrop-blur-2xl rounded-[2rem]">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 animate-gradient-x" />
                    <div 
                        className="grid border-b border-slate-100/50 text-[9px] font-black uppercase tracking-[0.3em] font-display bg-slate-50/80"
                        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                    >
                        {headers.map((header: string, i: number) => (
                            <div key={i} className={`p-4 md:p-5 ${i > 0 ? 'text-center' : ''} text-slate-400`}>{header}</div>
                        ))}
                    </div>
                    {rows.map((row: string[], idx: number) => (
                        <div 
                            key={idx} 
                            className="grid border-b border-slate-50/50 hover:bg-white/80 transition-all duration-500 text-[11px] md:text-xs group"
                            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
                        >
                            <div className="p-4 md:p-5 font-mono flex items-center font-black text-indigo-600 bg-indigo-50/40 group-hover:bg-indigo-100/60 transition-colors border-r border-slate-50/50">{row[0]}</div>
                            {row.slice(1).map((cell, i) => (
                                <div key={i} className={`p-4 md:p-5 flex items-center ${i === 0 ? 'justify-start pl-6 md:pl-10' : 'justify-center'} border-l border-slate-50/50 text-center font-bold tracking-tight text-slate-600 group-hover:text-slate-900`}>
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </GlassCard>
            </motion.div>
        </motion.div>
    );
};

// 4. Info Slide (Manifiesto)
export const InfoSlide: React.FC<SlideProps> = ({ data }) => {
  const { mainText, description, highlight } = data.content;
  return (
    <motion.div className="flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="w-full mb-6 text-center">
        <motion.div variants={itemVariants} className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[8px] font-black tracking-[0.4em] uppercase mb-3 border border-indigo-100 shadow-sm">
            Nuestra Esencia
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter font-display uppercase leading-none drop-shadow-sm">
            {data.title}
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-12 gap-5 items-stretch w-full">
        <motion.div variants={itemVariants} className="md:col-span-7 flex">
            <GlassCard theme={data.theme} className="p-6 md:p-8 border-white shadow-2xl relative overflow-visible flex flex-col justify-center bg-white/80 backdrop-blur-2xl rounded-[2rem]">
                <div className="absolute -top-4 -left-4">
                    <OrganicShape bg="bg-indigo-600" color="text-white" className="w-10 h-10 shadow-2xl">
                        <Quote size={20} fill="currentColor" />
                    </OrganicShape>
                </div>
                <div className="text-base md:text-lg font-bold text-slate-700 leading-relaxed mb-4 tracking-tight font-display italic whitespace-pre-line">
                    "{mainText}"
                </div>
                <div className="h-1 w-16 bg-indigo-600 mb-4 rounded-full" />
                <p className="text-[10px] md:text-xs text-indigo-600 font-black leading-relaxed tracking-[0.1em] uppercase">
                    {description}
                </p>
            </GlassCard>
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-5 flex">
            <div className="relative p-6 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group flex flex-col justify-center w-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                
                <div className="relative z-10">
                    <Sparkles className="text-indigo-400 mb-4 animate-pulse" size={24} />
                    <p className="text-lg md:text-xl font-black text-white leading-[1.1] tracking-tighter font-display uppercase mb-6">
                        {highlight}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-[10px] shadow-lg">fyo</div>
                        <div>
                            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-0.5">Compromiso</span>
                            <span className="block text-[7px] font-bold text-slate-400 uppercase tracking-widest">Soluciones a medida</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 5. Culture Slide
export const TutorContentSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-4 max-w-4xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7">
          <motion.div variants={itemVariants}>
            <GlassCard className="p-1 bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 rounded-[2rem] shadow-2xl overflow-visible">
                <div className="bg-white rounded-[1.9rem] p-6 md:p-8 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl -mr-24 -mt-24 opacity-50" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <OrganicShape bg="bg-indigo-600" color="text-white" className="w-8 h-8">
                                <Compass size={16} />
                            </OrganicShape>
                            <h3 className="text-slate-900 font-black text-[9px] uppercase tracking-[0.4em] font-display">Nuestra Cultura</h3>
                        </div>
                        <div className="text-base md:text-lg text-slate-600 font-bold leading-relaxed tracking-tight mb-6 italic border-l-4 border-indigo-100 pl-5 whitespace-pre-line">
                            {data.content.description}
                        </div>
                        
                        <div className="h-px w-full bg-slate-100 mb-6" />
                        
                        <div className="flex items-center gap-3 mb-3">
                            <OrganicShape bg="bg-emerald-500" color="text-white" className="w-7 h-7">
                                <Target size={14} />
                            </OrganicShape>
                            <h3 className="text-slate-900 font-black text-[9px] uppercase tracking-[0.4em] font-display">Visión de Futuro</h3>
                        </div>
                        <p className="text-lg md:text-xl font-black text-slate-900 leading-[1.1] tracking-tighter font-display uppercase">
                            {data.content.vision}
                        </p>
                    </div>
                </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-2">
          <motion.div variants={itemVariants} className="mb-4 pl-4 border-l-2 border-indigo-600">
            <h4 className="text-[8px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-0.5">ADN Organizacional</h4>
            <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase font-display leading-none">Valores fyo</h2>
          </motion.div>
          {data.content.valores.map((valor: any, i: number) => {
            const Icon = IconMap[valor.icon] || Sparkles;
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="p-4 flex items-center gap-4 bg-white/80 backdrop-blur-xl glass-border rounded-[1rem] shadow-xl hover:-translate-x-2 transition-all duration-700 group cursor-default border border-white">
                  <GlowIcon icon={Icon} color="text-indigo-600" bg="bg-indigo-50" size={16} />
                  <span className="text-base font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase font-display">
                    {valor.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
;

// 6. Grid Slide (Companies) - Reverted to standard grid
export const GridSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 h-full items-center max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      {data.content.items.map((item: any, idx: number) => {
        const Icon = IconMap[item.icon] || Users;
        const colors = [
          { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', glow: 'shadow-indigo-500/20' },
          { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'shadow-emerald-500/20' },
          { text: 'text-slate-900', bg: 'bg-slate-100', border: 'border-slate-200', glow: 'shadow-slate-500/20' }
        ];
        const style = colors[idx % colors.length];

        // Extract emoji from title if present
        const titleParts = item.title.split(' ');
        const emoji = titleParts.length > 1 ? titleParts[titleParts.length - 1] : '';
        const cleanTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(' ') : item.title;

        return (
          <motion.div variants={itemVariants} key={idx} className="h-full">
            <GlassCard className={`p-8 flex flex-col h-full bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl group hover:-translate-y-3 transition-all duration-700 border border-white relative overflow-hidden`}>
              {/* Animated Glow Background */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${style.bg}`} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <GlowIcon icon={Icon} color={style.text} bg={style.bg} size={28} />
                <motion.span 
                    animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                    className="text-3xl drop-shadow-md"
                >
                    {emoji}
                </motion.span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tighter font-display group-hover:text-indigo-600 transition-colors uppercase leading-[0.9]">
                {cleanTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed mb-8 flex-grow tracking-tight opacity-80">
                {item.desc}
              </p>
              <div className="pt-6 border-t border-slate-100 flex justify-between items-center relative z-10">
                <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${style.text} opacity-30 group-hover:opacity-100 transition-opacity`}>{item.link}</span>
                <motion.div 
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg"
                >
                    <Rocket size={18} />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// 9. Ecosystem Circles Slide
export const EcosystemCirclesSlide: React.FC<SlideProps> = ({ data }) => {
    const { items } = data.content;
    return (
        <motion.div className="flex flex-col justify-center items-center h-full py-4 max-w-5xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
                <div className="lg:col-span-5 space-y-5">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-[0.9] tracking-tighter font-display mb-5 uppercase drop-shadow-sm">
                            {data.title}
                        </h2>
                        <div className="relative p-6 rounded-[1.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-500/5 rounded-full -ml-10 -mb-10 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-700" />
                            
                            <div className="relative z-10">
                                <Quote className="text-indigo-600/20 mb-3" size={28} fill="currentColor" />
                                <div className="text-sm md:text-base text-slate-600 font-bold leading-relaxed tracking-tight italic whitespace-pre-line">
                                    {data.subtitle}
                                </div>
                                <div className="mt-5 flex items-center gap-3">
                                    <div className="h-px w-6 bg-indigo-200" />
                                    <span className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em]">Propuesta de Valor</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-7 relative min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-visible">
                    {/* Background Decorative Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[80%] h-[80%] border border-slate-100 rounded-full" />
                        <div className="w-[50%] h-[50%] border border-slate-50 rounded-full" />
                    </div>

                    {/* Central Hub */}
                    <motion.div 
                        variants={itemVariants}
                        className="relative z-20"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse scale-150" />
                        
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-base md:text-xl shadow-[0_0_30px_rgba(79,70,229,0.3)] border-4 md:border-5 border-white glass-border relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.span
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                fyo
                            </motion.span>
                            
                            {/* Inner Shine */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 -skew-y-12" />
                        </div>
                        
                        {/* Orbiting Particles */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10 + i * 5, ease: "linear" }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <div 
                                    className="w-1 h-1 bg-indigo-400 rounded-full absolute"
                                    style={{ 
                                        top: '50%', 
                                        left: '100%',
                                        transform: `translate(-50%, -50%)`,
                                        boxShadow: '0 0 6px #4f46e5'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Static Nodes with Connecting Lines */}
                    {items.map((item: any, i: number) => {
                        const angle = (i * (360 / items.length) - 90) * (Math.PI / 180);
                        const radius = window.innerWidth > 768 ? 140 : 100;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <React.Fragment key={i}>
                                {/* Connecting Line */}
                                <motion.div 
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 0.2 }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                    style={{ 
                                        width: radius,
                                        left: '50%',
                                        top: '50%',
                                        transformOrigin: 'left center',
                                        rotate: `${(i * (360 / items.length) - 90)}deg`
                                    }}
                                    className="absolute h-px bg-gradient-to-r from-slate-900 to-transparent z-0"
                                />
                                
                                {/* Node */}
                                <motion.div
                                    variants={itemVariants}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1, x, y }}
                                    whileHover={{ scale: 1.1, y: y - 5 }}
                                    className="absolute z-30"
                                >
                                    <div className={`px-2.5 py-1 md:px-4 md:py-2 rounded-full ${item.color} text-white font-black text-[7px] md:text-[9px] shadow-xl border-2 md:border-3 border-white glass-border whitespace-nowrap uppercase tracking-tighter`}>
                                        {item.name}
                                    </div>
                                </motion.div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

// 7. Activity Slide (Objectives Type)
export const ObjectivesSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div className="flex flex-col justify-center h-full py-4 max-w-4xl mx-auto px-6" initial="hidden" animate="show" variants={containerVariants}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-slate-500 font-bold leading-relaxed mb-6 tracking-tight">
              {data.content.objective}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard theme={data.theme} className="p-6 md:p-8 border-indigo-100 bg-indigo-50/20 rounded-[2rem]">
              <h3 className="text-indigo-900 font-black text-[10px] mb-4 flex items-center gap-3 uppercase tracking-[0.2em]">
                <Lightbulb className="text-indigo-500" size={16} />
                Consigna
              </h3>
              <p className="text-slate-700 font-bold leading-relaxed text-sm md:text-base tracking-tight">
                {data.content.consigna}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div variants={itemVariants}>
            <GlassCard theme={data.theme} className="p-6 md:p-8 border-slate-100 bg-white shadow-2xl rounded-[2rem]">
              <h3 className="text-slate-900 font-black text-[9px] mb-6 uppercase tracking-[0.25em] flex items-center gap-3">
                <ClipboardCheck className="text-slate-300" size={14} />
                Competencias
              </h3>
              <div className="space-y-2">
                {data.content.competencies.map((comp: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm group hover:border-indigo-200 hover:bg-white transition-all duration-500">
                    <div className="w-1 h-1 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform" />
                    <span className="font-black text-slate-700 uppercase text-[9px] tracking-widest group-hover:text-indigo-600 transition-colors">{comp}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// 8. Closing Slide
export const ClosingSlide: React.FC<SlideProps> = ({ data, onJumpToSlide }) => {
    const { contacts, description } = data.content;

    return (
        <motion.div 
            className="flex flex-col justify-center items-center h-full text-center relative max-w-4xl mx-auto px-6 py-4" 
            initial="hidden" 
            animate="show" 
            variants={containerVariants}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

            <motion.div variants={itemVariants} className="mb-8 relative z-10">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-8 shadow-xl mx-auto"
                >
                    fyo
                </motion.div>
                <motion.h1 
                    layoutId="slide-title"
                    className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-[0.9] drop-shadow-sm font-display"
                >
                    {data.title}
                </motion.h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="h-0.5 w-10 bg-indigo-100 rounded-full" />
                    <p className="text-base text-indigo-600 font-black tracking-[0.3em] uppercase">
                        {data.subtitle}
                    </p>
                    <div className="h-0.5 w-10 bg-indigo-100 rounded-full" />
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10 max-w-2xl">
                <p className="text-base md:text-lg font-bold text-slate-500 leading-relaxed tracking-tight">
                    {description}
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-3xl relative z-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contacts.map((contact: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 hover:bg-slate-50 transition-all duration-500">
                            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                                <Mail className="text-indigo-600" size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{contact.role}</span>
                                <span className="block text-xs font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{contact.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {onJumpToSlide && (
                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onJumpToSlide(0)}
                    className="mt-12 flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-full font-black text-[10px] transition-all shadow-xl hover:bg-indigo-700 active:scale-95 font-display tracking-[0.2em] uppercase group"
                >
                    <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                    Reiniciar Presentación
                </motion.button>
            )}
        </motion.div>
    );
};

// 10. Word Raffle Slide
export const WordRaffleSlide: React.FC<SlideProps> = ({ data }) => {
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center py-4"
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full h-full max-w-6xl px-6 min-h-[600px]">
        <GlassCard className="w-full h-full overflow-hidden shadow-2xl relative bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white/40">
          <iframe 
            src={data.content.url} 
            className="w-full h-full border-none"
            title="Word Raffle Tool"
          />
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// 11. Download Slide
export const DownloadSlide: React.FC<SlideProps> = ({ data }) => {
  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Helper to add header
    const addHeader = (title: string) => {
      doc.setFillColor(79, 70, 229); // Indigo 600
      doc.rect(0, 0, 297, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('fyo | Programa JP 25-26', 10, 14);
      doc.text(title, 287, 14, { align: 'right' });
    };

    // Slide 1: Title
    addHeader('MATERIAL DE EVALUACIÓN');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(36);
    doc.text('GUÍA PARA ASSESSMENT CENTER', 148.5, 90, { align: 'center' });
    doc.setFontSize(18);
    doc.setTextColor(100, 116, 139);
    doc.text('Material exclusivo para evaluadores', 148.5, 105, { align: 'center' });

    // Slide 2: ¿QUÉ EVALUAMOS?
    doc.addPage();
    addHeader('MINDSET DEL EVALUADOR');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(24);
    doc.text('¿QUE ESTAMOS EVALUANDO REALMENTE?', 20, 40);
    
    doc.setFontSize(14);
    doc.text('¿QUE EVALUAMOS?', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const evaluamos = [
      '- Pensamiento de negocio (rentabilidad vs cliente)',
      '- Capacidad de priorizacion bajo presion',
      '- Toma de decisiones en incertidumbre',
      '- Influencia y trabajo en equipo',
      '- Comunicacion ejecutiva',
      '- Gestion de crisis y resiliencia'
    ];
    evaluamos.forEach((text, i) => doc.text(text, 25, 75 + (i * 10)));

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('MINDSET DEL EVALUADOR', 150, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(220, 38, 38); // Red
    doc.text('[X] No evaluar "al que mas habla"', 150, 75);
    doc.text('[X] No enamorarse de ideas creativas sin sustento', 150, 85);
    doc.text('[X] No buscar perfeccion tecnica (son juniors)', 150, 95);
    
    doc.setTextColor(22, 163, 74); // Green
    doc.text('[V] Observar como piensan, no que dicen', 150, 115);
    doc.text('[V] Detectar trade-offs (cliente vs negocio)', 150, 125);
    doc.text('[V] Evaluar comportamientos sostenidos, no momentos aislados', 150, 135);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.text('REGLA DE ORO:', 150, 160);
    doc.setFont('helvetica', 'italic');
    doc.text('"Si lo contrato, ¿me acompanaria a una reunion con clientes manana?"', 150, 170);

    // Slide 3: Competencias 1
    doc.addPage();
    addHeader('EVALUACION POR COMPETENCIAS (1/2)');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Observen quien de los chicos...', 20, 40);

    let y = 60;
    const addCompetencia = (title: string, points: string[], xOffset = 20) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(title, xOffset, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      points.forEach((p, i) => {
        doc.text(`- ${p}`, xOffset + 5, y + 8 + (i * 6));
      });
      y += 35;
    };

    addCompetencia('Pensamiento de negocio', [
      'Habla de ingresos, costos o rentabilidad (aunque sea basico)',
      'Prioriza (ej: "no podemos hacer todo, enfoquemonos en...")',
      'Conecta decisiones (marca, producto, precio) con impacto en negocio'
    ]);
    
    addCompetencia('Orientacion a resultados', [
      'Empuja a cerrar definiciones (evita discusiones infinitas)',
      'Baja ideas a algo accionable ("ok, entonces hacemos X")',
      'Cuida el tiempo (advierte que se estan yendo de foco)'
    ]);

    addCompetencia('Trabajo en equipo', [
      'Escucha y retoma ideas de otros ("como dijo X, podriamos...")',
      'Construye sobre lo que ya esta (no reinventa todo)',
      'Da espacio a otros (no monopoliza)'
    ]);

    addCompetencia('Influencia', [
      'Logra que el equipo adopte su idea (no solo la dice)',
      'Argumenta con logica (no con volumen o insistencia)',
      'Lee al grupo y ajusta su approach'
    ]);

    // Slide 4: Competencias 2
    doc.addPage();
    addHeader('EVALUACION POR COMPETENCIAS (2/2)');
    y = 40;

    addCompetencia('Organizacion y estructuracion', [
      'Ordena la discusion (ej: "dividamos en 3 temas...")',
      'Propone metodo (roles, pasos, prioridades)',
      'Evita que el equipo se pierda en detalles irrelevantes'
    ]);

    addCompetencia('Toma de decisiones', [
      'Define un curso de accion claro (aunque no sea perfecto)',
      'Plantea opciones y elige una',
      'Se hace cargo de la decision (no la patea al grupo)'
    ]);

    addCompetencia('Manejo de presion', [
      'No entra en panico ante el problema',
      'Sostiene foco en solucion, no en el problema',
      'Ayuda a bajar la ansiedad del equipo'
    ]);

    addCompetencia('Orientacion al cliente', [
      'Propone que decirle al cliente (no solo que hacer internamente)',
      'Tiene en cuenta impacto reputacional',
      'Muestra empatia (no minimiza el problema)'
    ]);

    // Slide 5: Competencias 3 & Disparadoras
    doc.addPage();
    addHeader('COMPETENCIAS Y PREGUNTAS DISPARADORAS');
    y = 40;

    addCompetencia('Negociacion (cliente vs negocio)', [
      'No regala todo ni se pone rigido',
      'Propone escenarios intermedios',
      'Piensa en el impacto a largo plazo'
    ]);

    addCompetencia('Adaptabilidad', [
      'Cambia rapido de enfoque cuando el contexto cambia',
      'Abandona ideas iniciales sin aferrarse',
      'Integra nueva informacion sin bloquearse'
    ]);

    y = 120;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Preguntas disparadoras para lideres', 20, y);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('(usarlas si el equipo se estanca o para profundizar)', 20, y + 6);
    doc.setFont('helvetica', 'normal');
    const pregLideres = [
      '- ¿Cual es el modelo de ingresos de esta agencia?',
      '- Si tuvieran que elegir: ¿experiencia premium o ahorro?',
      '- ¿Que los hace diferentes de la competencia?',
      '- ¿Donde pierden plata en este modelo?',
      '- ¿Que decision tomarian si solo tuvieran 1 semana para lanzar?'
    ];
    pregLideres.forEach((p, i) => doc.text(p, 25, y + 14 + (i * 6)));

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Preguntas disparadoras (gestion de crisis)', 150, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const pregCrisis = [
      '- ¿Que priorizan: reputacion o rentabilidad?',
      '- ¿Que le dicen HOY al cliente?',
      '- ¿A quien llaman primero internamente?',
      '- ¿Que decisiones son reversibles y cuales no?',
      '- ¿Como evitan que esto escale a algo mayor?'
    ];
    pregCrisis.forEach((p, i) => doc.text(p, 155, y + 14 + (i * 6)));

    doc.save(data.content.fileName || 'Guia_Evaluador_Assessment.pdf');
  };

  return (
    <motion.div 
      className="flex flex-col justify-center items-center h-full text-center relative max-w-4xl mx-auto px-6 py-4" 
      initial="hidden" 
      animate="show" 
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8 relative z-10 w-full max-w-2xl">
        <GlassCard theme={data.theme} className="p-12 flex flex-col items-center border-indigo-100 shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[2.5rem]">
          <OrganicShape bg="bg-indigo-50" color="text-indigo-600" className="w-24 h-24 mb-8">
            <FileText size={40} strokeWidth={1.5} />
          </OrganicShape>
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter font-display uppercase">
            {data.title}
          </h2>
          
          <p className="text-base md:text-lg text-slate-500 font-bold mb-10 tracking-tight">
            {data.subtitle}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-4 px-10 py-4 bg-indigo-600 text-white rounded-full font-black text-sm transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)] font-display tracking-[0.2em] uppercase group"
          >
            <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
            {data.content.buttonText}
          </motion.button>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

// Placeholder for missing types
export const MentoringSplitSlide = () => null;
export const AcademySplitSlide = () => null;
