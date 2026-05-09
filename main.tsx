import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Leaf,
  Droplets,
  MapPin,
  Truck,
  Star,
  Globe,
  Heart,
  Package,
  Mail,
  MessageCircle,
  Instagram,
  ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Zellige SVG (étoile 8 branches)                                   */
/* ------------------------------------------------------------------ */
const ZelligeStar = ({ className = '', size = 60 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
  >
    <g stroke="currentColor" strokeWidth="0.8" opacity="0.06">
      <polygon points="50,10 55,35 50,32 45,35" />
      <polygon points="50,10 55,35 70,42 50,38" />
      <polygon points="70,42 58,58 50,50 50,38" />
      <polygon points="58,58 50,75 42,58 50,50" />
      <polygon points="50,75 30,58 42,50 50,58" />
      <polygon points="30,58 18,42 30,38 42,50" />
      <polygon points="18,42 30,28 42,32 30,38" />
      <polygon points="30,28 50,10 50,32 42,32" />
    </g>
  </svg>
);

const ZelligeWatermark = ({ color = 'cedar', className = '' }: { color?: string; className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className={`absolute inset-0 ${color === 'gold' ? 'zellige-bg-gold' : 'zellige-bg'}`} />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper                                             */
/* ------------------------------------------------------------------ */
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  HEADER                                                            */
/* ------------------------------------------------------------------ */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: "Nos Huiles", href: '#produits' },
    { label: "Nos Valeurs", href: '#valeurs' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a href="#hero" className="flex flex-col items-start">
            <span className="font-display text-2xl font-semibold text-cedar tracking-tight">
              ARGANI
            </span>
            <span className="hidden md:block text-[10px] font-body font-normal uppercase tracking-[0.12em] text-gold -mt-0.5">
              Huile d&apos;Argan Premium
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-body font-medium uppercase tracking-[0.05em] text-cedar hover:text-terracotta transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block bg-gold-light text-cedar text-[11px] font-body font-medium px-3.5 py-1.5 rounded-full">
              Livraison France &amp; Maroc
            </span>
            <button
              className="md:hidden p-2 text-cedar"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-cedar flex flex-col"
          >
            <div className="flex justify-end p-5">
              <button onClick={() => setMenuOpen(false)} className="p-2 text-cream" aria-label="Fermer le menu">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-cream hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */
const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cream flex items-center pt-20 md:pt-0 overflow-hidden"
    >
      <ZelligeWatermark color="gold" />

      {/* Decorative spinning zellige stars */}
      <div className="absolute top-1/4 right-[15%] animate-spin-slow pointer-events-none hidden lg:block">
        <ZelligeStar size={80} className="text-gold" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDirection: 'reverse' }}>
        <ZelligeStar size={60} className="text-gold" />
      </div>

      <div className="container-main relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-0">
        {/* Text */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-body font-medium uppercase tracking-[0.12em] text-terracotta mb-5"
          >
            Origine Maroc — Cooperative Feminine
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-normal text-cedar leading-[1.05] tracking-tight max-w-[500px] mx-auto md:mx-0"
          >
            L&apos;Or Liquide du Maroc
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-base font-body font-light text-cedar/80 leading-relaxed max-w-[440px] mx-auto md:mx-0"
          >
            Huile d&apos;argan pressée à froid, certifiée ECOCERT. Extraite avec soin des noix de l&apos;arganier du Sud-Marocain, notre huile nourrit, protège et sublime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <a href="#produits" className="btn-primary">
              Découvrir nos huiles
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-5"
          >
            {[
              { icon: Leaf, text: 'Bio ECOCERT' },
              { icon: Droplets, text: 'Pressée à froid' },
              { icon: MapPin, text: 'Origine traçable' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-cedar/60">
                <Icon size={16} strokeWidth={1.5} />
                <span className="text-[11px] font-body font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <img
            src="/images/ARGANI_premium_laiton.jpg"
            alt="ARGANI Premium — Huile d'Argan du Maroc"
            className="max-h-[55vh] md:max-h-[65vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(212,175,55,0.15)]"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cedar/40"
      >
        <span className="text-[10px] uppercase tracking-widest font-body">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  PRODUITS                                                          */
/* ------------------------------------------------------------------ */
const ProductCard = ({
  image,
  badge,
  badgeColor,
  title,
  subtitle,
  description,
  price,
  oldPrice,
  ctaText,
  paypalLink,
}: {
  image: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  oldPrice?: string;
  ctaText: string;
  paypalLink: string;
}) => {
  const badgeStyles: Record<string, string> = {
    cedar: 'bg-cedar text-cream',
    gold: 'bg-gold text-cedar',
    terracotta: 'bg-terracotta text-cream',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-warm-sand rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-350"
    >
      <div className="relative overflow-hidden rounded-lg mb-5 aspect-[3/4]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
        <span className={`absolute top-3 left-3 text-xs font-body font-medium uppercase px-4 py-1.5 rounded-full ${badgeStyles[badgeColor]}`}>
          {badge}
        </span>
      </div>

      <h3 className="font-display text-[22px] md:text-[26px] text-cedar leading-tight mb-1">
        {title}
      </h3>
      <p className="text-[13px] font-body text-cedar/60 mb-3">{subtitle}</p>
      <p className="text-sm font-body font-light text-cedar/80 leading-relaxed mb-5">
        {description}
      </p>

      <div className="flex items-baseline gap-2 mb-5">
        <span className="text-[28px] font-body font-semibold text-cedar">{price}</span>
        {oldPrice && (
          <span className="text-base font-body text-cedar/40 line-through">{oldPrice}</span>
        )}
      </div>

      <a
        href={paypalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full block"
      >
        {ctaText}
      </a>
    </motion.div>
  );
};

const Produits = () => {
  const products = [
    {
      image: '/images/ARGANI_bio_liege.jpg',
      badge: 'BIO',
      badgeColor: 'cedar',
      title: "Huile d'Argan Bio Cosmétique Premium",
      subtitle: '100ml — Pressée à froid, certifiée ECOCERT',
      description: 'Hydratation intense visage, corps et cheveux. Riche en vitamine E. Texture non grasse, pénétration rapide.',
      price: '24,90 €',
      ctaText: 'Commander — 24,90 €',
      paypalLink: 'https://paypal.me/argani/24.90eur',
    },
    {
      image: '/images/ARGANI_classique_zellige.jpg',
      badge: 'AOC',
      badgeColor: 'gold',
      title: "Huile d'Argan Alimentaire Traditionnelle",
      subtitle: '250ml — AOC Maroc',
      description: 'Idéale pour salades, couscous, tajines. Goût noisette subtil, pression première. Une cuillère d\'or pour vos plats.',
      price: '34,90 €',
      ctaText: 'Commander — 34,90 €',
      paypalLink: 'https://paypal.me/argani/34.90eur',
    },
    {
      image: '/images/ARGANI_premium_laiton.jpg',
      badge: 'Édition limitée',
      badgeColor: 'terracotta',
      title: 'Coffret Argani Luxe — Duo Visage & Cuisine',
      subtitle: '2x100ml — Édition limitée',
      description: "Huile cosmétique + huile alimentaire dans un coffret cadeau artisanal marocain. Brochure bienfaits incluse. Le cadeau parfait.",
      price: '49,90 €',
      oldPrice: '59,80 €',
      ctaText: 'Commander — 49,90 €',
      paypalLink: 'https://paypal.me/argani/49.90eur',
    },
  ];

  return (
    <section id="produits" className="relative section-padding bg-cream">
      <ZelligeWatermark />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-12 md:mb-16">
            <p className="text-xs font-body font-medium uppercase tracking-[0.12em] text-terracotta mb-3">
              Notre Selection
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-cedar leading-tight">
              Trois Huiles, Une Essence
            </h2>
            <p className="mt-4 text-base font-body font-light text-cedar/70">
              Chaque bouteille raconte l&apos;histoire des terroirs marocains.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.15}>
              <ProductCard {...p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center flex items-center justify-center gap-2 text-cedar/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cedar/40">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
            <span className="text-xs font-body">
              Paiement sécurisé PayPal — Aucune donnée bancaire stockée
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  CONFIANCE                                                         */
/* ------------------------------------------------------------------ */
const Confiance = () => {
  const items = [
    { icon: Leaf, title: 'Certifiée Bio', desc: 'ECOCERT, agriculture biologique du Sud-Marocain' },
    { icon: Droplets, title: 'Pressée à Froid', desc: 'Première pression mécanique, qualité artisanale' },
    { icon: MapPin, title: 'Origine Maroc', desc: "Coopérative féminine de l'Anti-Atlas" },
    { icon: Truck, title: 'Livraison 48h', desc: 'France et Maroc, suivi inclus' },
  ];

  return (
    <section className="relative bg-cedar py-16 md:py-20 overflow-hidden">
      {/* Arc separator top */}
      <div className="absolute -top-5 left-0 right-0 flex justify-center pointer-events-none">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="text-gold/20">
          <path d="M0 40 Q100 -20 200 40" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <Icon size={32} className="text-gold mb-3 mx-auto md:mx-0" strokeWidth={1.5} />
                <h3 className="text-sm font-body font-medium uppercase tracking-[0.05em] text-cream mb-2">
                  {title}
                </h3>
                <p className="text-[13px] font-body font-light text-cream/70 leading-relaxed">
                  {desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  AVIS CLIENTS                                                      */
/* ------------------------------------------------------------------ */
const AvisClients = () => {
  const testimonials = [
    {
      quote: "Ma peau n'a jamais été aussi douce. L'absorption est instantanée et le parfum naturel est divin. Je ne peux plus m'en passer.",
      author: 'Sophie L., Paris',
      detail: 'Huile Bio Cosmétique — utilisée depuis 3 mois',
    },
    {
      quote: "Je l'utilise dans mes tajines et salades. Le goût noisette sublimé transforme chaque plat. Authentique et d'une qualité rare.",
      author: 'Karim B., Marseille',
      detail: 'Huile Alimentaire — client depuis 1 an',
    },
    {
      quote: "Le coffret était magnifique, mon mari a adoré. L'emballage artisanal marocain fait toute la différence. Cadeau parfait.",
      author: 'Claire M., Lyon',
      detail: 'Coffret Luxe — offert en cadeau',
    },
  ];

  return (
    <section className="relative bg-warm-sand section-padding overflow-hidden">
      {/* Arc separator top */}
      <div className="absolute -top-5 left-0 right-0 flex justify-center pointer-events-none">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="text-gold/20">
          <path d="M0 40 Q100 -20 200 40" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-12 md:mb-16">
            <p className="text-xs font-body font-medium uppercase tracking-[0.12em] text-terracotta mb-3">
              Temoignages
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-cedar leading-tight">
              Ce Qu&apos;ils En Disent
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.15}>
              <div className="bg-cream rounded-xl p-8 shadow-card h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-base font-body font-light italic text-cedar leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-cream-dark">
                  <p className="text-sm font-body font-medium text-cedar">{t.author}</p>
                  <p className="text-xs font-body text-cedar/50 mt-1">{t.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  POURQUOI ARGANI                                                   */
/* ------------------------------------------------------------------ */
const PourquoiArgani = () => {
  const values = [
    {
      icon: Globe,
      title: 'Origine Traçable',
      desc: "Chaque bouteille est tracée jusqu'à la coopérative de l'Anti-Atlas. Nous connaissons le nom de chaque femme qui a pressé votre huile.",
    },
    {
      icon: Heart,
      title: 'Coopérative Féminine',
      desc: "Nous collaborons exclusivement avec des coopératives féminines berbères. Votre achat finance l'éducation et l'autonomie des femmes au Maroc.",
    },
    {
      icon: Package,
      title: 'Emballage Premium',
      desc: 'Bouteilles en verre ambré de qualité cosmétique, coffrets artisanaux tissés à la main, livraison protégée dans un packaging éco-conçu.',
    },
  ];

  return (
    <section id="valeurs" className="relative bg-cream section-padding">
      <ZelligeWatermark />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-[600px] mx-auto mb-12 md:mb-16">
            <p className="text-xs font-body font-medium uppercase tracking-[0.12em] text-terracotta mb-3">
              Nos Valeurs
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-cedar leading-tight">
              Pourquoi Choisir Argani ?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.15}>
              <div className="text-center md:text-left">
                <div className="w-14 h-14 rounded-full bg-gold-light flex items-center justify-center mb-5 mx-auto md:mx-0">
                  <Icon size={28} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-body font-medium text-cedar mb-3">{title}</h3>
                <p className="text-sm font-body font-light text-cedar/70 leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  CTA NEWSLETTER                                                    */
/* ------------------------------------------------------------------ */
const CTA = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="bg-terracotta py-16 md:py-20">
      <div className="container-main text-center">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(1.75rem,3vw,3rem)] text-cream leading-tight mb-4">
            Rejoignez l&apos;Univers Argani
          </h2>
          <p className="text-base font-body font-light text-cream/85 mb-8 max-w-[500px] mx-auto">
            Offre exclusive : -10% sur votre première commande en vous inscrivant.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Merci pour votre inscription ! Votre code de réduction vous sera envoyé par email.');
              setEmail('');
            }}
          >
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-cream/20 border border-cream/40 text-cream placeholder:text-cream/60 rounded px-5 py-3.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-cream/50"
            />
            <button
              type="submit"
              className="bg-cream text-terracotta font-body font-medium text-sm px-8 py-3.5 rounded hover:bg-cream/90 transition-colors duration-200"
            >
              S&apos;inscrire
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  FOOTER                                                            */
/* ------------------------------------------------------------------ */
const Footer = () => {
  return (
    <footer id="footer" className="bg-cedar pt-16 pb-8 md:pt-20">
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-cream">ARGANI</h3>
            <p className="text-xs font-body text-cream/60 mt-1">L&apos;Or Liquide du Maroc</p>
            <p className="text-[13px] font-body font-light text-cream/50 mt-4 leading-relaxed">
              Huile d&apos;argan premium, extraite avec soin des terroirs marocains.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-body font-medium uppercase text-gold tracking-wide mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {['Accueil', "Nos Huiles", "Nos Valeurs", 'Avis clients'].map((label) => (
                <a
                  key={label}
                  href={`#${label === 'Accueil' ? 'hero' : label === "Nos Huiles" ? 'produits' : label === "Nos Valeurs" ? 'valeurs' : 'avis'}`}
                  className="text-sm font-body text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-body font-medium uppercase text-gold tracking-wide mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:contact@argani.ma"
                className="flex items-center gap-2 text-sm font-body text-cream/70 hover:text-cream transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} /> contact@argani.ma
              </a>
              <a
                href="https://wa.me/212612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-cream/70 hover:text-cream transition-colors"
              >
                <MessageCircle size={14} strokeWidth={1.5} /> +212 6 12 34 56 78
              </a>
              <a
                href="https://instagram.com/argani.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-cream/70 hover:text-cream transition-colors"
              >
                <Instagram size={14} strokeWidth={1.5} /> @argani.ma
              </a>
            </div>
          </div>

          {/* Mentions */}
          <div>
            <h4 className="text-sm font-body font-medium uppercase text-gold tracking-wide mb-4">
              Informations
            </h4>
            <nav className="flex flex-col gap-2.5">
              {["Livraison & Retours", 'Conditions générales', 'Politique de confidentialité', 'Mentions légales'].map(
                (label) => (
                  <span
                    key={label}
                    className="text-[13px] font-body text-cream/50 hover:text-cream/70 transition-colors cursor-pointer"
                  >
                    {label}
                  </span>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-cream/10 text-center">
          <p className="text-xs font-body text-cream/40">
            &copy; 2025 Argani — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ------------------------------------------------------------------ */
/*  APP                                                               */
/* ------------------------------------------------------------------ */
function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <Produits />
      <Confiance />
      <AvisClients />
      <PourquoiArgani />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
