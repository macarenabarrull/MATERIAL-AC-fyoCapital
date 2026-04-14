export type IconKey = 'Compass' | 'Target' | 'BrainCircuit' | 'Layers' | 'Zap' | 'ClipboardCheck' | 'Heart' | 'Sparkles' | 'Users' | 'DollarSign' | 'Briefcase' | 'Calendar' | 'GraduationCap' | 'FileText' | 'Flag' | 'PencilRuler' | 'Search' | 'FileSignature' | 'Rocket' | 'BarChart3';

export interface SlideData {
  id: string;
  type: 'cover' | 'image' | 'objectives' | 'info' | 'timeline' | 'grid' | 'table-granos' | 'table-capital' | 'mentoring-split' | 'academy-split' | 'closing' | 'tutor-content' | 'ecosystem-circles' | 'raffle' | 'download';
  title?: string;
  subtitle?: string;
  content?: any;
  theme?: 'light' | 'dark' | 'brand';
}

export const SLIDES: SlideData[] = [
  {
    id: 'cover',
    type: 'cover',
    title: 'PROGRAMA JP 25-26 🚀',
    subtitle: 'assessment center',
    theme: 'brand',
    content: {
      highlight: 'fyo',
      tags: ['Somos un equipo', 'Creamos oportunidades', 'Pensamos en grande']
    }
  },
  {
    id: 'agenda',
    type: 'table-capital',
    title: 'CRONOGRAMA DE LA JORNADA 📅',
    subtitle: 'Actividades programadas para hoy',
    theme: 'light',
    content: {
      headers: ['Horario', 'Actividad', 'Duración'],
      rows: [
        ['09:30 - 09:45', 'Presentacion institucional de fyo', '15 min'],
        ['09:45 - 10:30', 'Dinámica 1: Dime quién eres...', '45 min'],
        ['10:30 - 11:00', '¡Tomemos un break!', '30 min'],
        ['11:00 - 12:45', 'Dinamica 2: Un día como comercial', '105 min'],
        ['12:45 - 13:00', 'Entrevista individuales', '15 min']
      ]
    }
  },
  {
    id: 'que-hacemos',
    type: 'info',
    title: 'NUESTRO MANIFIESTO 📜',
    subtitle: 'La esencia que impulsa nuestra transformación',
    theme: 'light',
    content: {
      mainText: 'En fyo trabajamos para ofrecer respuestas innovadoras y a medida, adaptadas a cada cliente.\n\nBuscamos ser una solución personalizada, innovadora y única.\n\nAsí fue como nos animamos a ser digitales en el mercado más tradicional de Argentina.',
      description: 'Desafiamos lo establecido para potenciar el futuro del agro.',
      highlight: 'TRANSFORMAMOS EL PRESENTE PARA LIDERAR EL MAÑANA 🚀'
    }
  },
  {
    id: 'ecosistema',
    type: 'ecosystem-circles',
    title: 'ECOSISTEMA INTEGRAL 🌐',
    subtitle: 'Formamos lazos estratégicos para acompañar toda la cadena comercial del agro.\n\nPotenciamos negocios impulsando el trabajo con conocimiento, profesionalismo y experiencia.',
    theme: 'light',
    content: {
      items: [
        { name: 'fyoDigital', color: 'bg-blue-500' },
        { name: 'fyoFood', color: 'bg-orange-500' },
        { name: 'fyoCapital', color: 'bg-green-600' },
        { name: 'fyoAdvisory', color: 'bg-indigo-600' },
        { name: 'fyoAcopio', color: 'bg-amber-600' },
        { name: 'fyoCredits', color: 'bg-emerald-600' }
      ]
    }
  },
  {
    id: 'valores',
    type: 'tutor-content',
    title: 'CULTURA Y PROPÓSITO ✨',
    subtitle: 'Lo que nos mueve y hacia dónde vamos',
    theme: 'brand',
    content: {
      description: 'Nuestra cultura se basa en la confianza, la colaboracion y la innovación constante.\n\nImpulsamos el trabajo con conocimiento, profesionalismo y experiencia para agregar valor real en cada decisión.',
      vision: 'Ser la empresa líder en potenciar los negocios de nuestros clientes a través de servicios que desafíen sus procesos de negocios.',
      valores: [
        { title: 'Somos un equipo', icon: 'Users' },
        { title: 'Pensamos en grande', icon: 'Rocket' },
        { title: 'Creamos oportunidades', icon: 'Zap' }
      ]
    }
  },
  {
    id: 'empresa',
    type: 'grid',
    title: 'NUESTRAS EMPRESAS 🏢',
    subtitle: 'Especialización en cada eslabón del agro',
    theme: 'light',
    content: {
      items: [
        { 
          title: 'fyo 🌾', 
          desc: 'Líderes en comercialización de granos, corretaje y servicios financieros para el productor.',
          icon: 'BarChart3',
          link: 'www.fyo.com'
        },
        { 
          title: 'AMAUTA 🌱', 
          desc: 'Soluciones en nutrición vegetal y biotecnología para maximizar el rendimiento de los cultivos.',
          icon: 'Sparkles',
          link: 'www.amauta.ag'
        },
        { 
          title: 'Agrofy 💻', 
          desc: 'El mercado digital de agronegocios más importante de la región.',
          icon: 'Rocket',
          link: 'www.agrofy.com.ar'
        }
      ]
    }
  },
  {
    id: 'assessment-cover',
    type: 'cover',
    title: 'ASSESSMENT CENTER 🎯',
    subtitle: '¿Estan listos?',
    theme: 'brand',
    content: {
      highlight: 'Evaluación',
      tags: ['Dinámicas 🎨', 'Casos 💡', 'Talento ✨']
    }
  },
  {
    id: 'dinamica-1',
    type: 'raffle',
    title: 'DINÁMICA 1: Dime quién eres... 🎨',
    subtitle: 'Assessment Center fyo',
    theme: 'light',
    content: {
      url: '/dinamica1.html'
    }
  },
  {
    id: 'break-cover',
    type: 'cover',
    title: '¡Tomemos un descanso! ☕',
    theme: 'light',
    content: {
      highlight: 'Break',
      tags: ['Café ☕', 'Networking 🤝']
    }
  },
  {
    id: 'dinamica-2',
    type: 'objectives',
    title: 'DINÁMICA 2: CASO ESTRATÉGICO 💡',
    subtitle: 'Resolución de desafíos reales del agro',
    theme: 'light',
    content: {
      duration: '60 MINUTOS',
      objective: 'Evaluar visión estratégica, trabajo colaborativo y toma de decisiones bajo presión.',
      consigna: 'En equipos, analicen el escenario de mercado planteado y construyan una solución innovadora utilizando los recursos disponibles.',
      competencies: ['Visión de Negocio', 'Trabajo Colaborativo', 'Liderazgo', 'Adaptabilidad']
    }
  },
  {
    id: 'download-pdf',
    type: 'download',
    title: 'MATERIAL DE TRABAJO 📄',
    subtitle: 'Descargá la guía del candidato para comenzar la Dinámica 2',
    theme: 'light',
    content: {
      fileName: 'Guia_Candidato_Fase1.pdf',
      buttonText: 'Descargar Guía (PDF)'
    }
  },
  {
    id: 'closing',
    type: 'closing',
    title: 'MUCHAS GRACIAS 🙌',
    subtitle: 'equipo fyo',
    theme: 'brand',
    content: {
      description: 'Transformamos el futuro del agro junto a las personas que se animan a desafiar lo establecido.',
      contacts: []
    }
  }
];
