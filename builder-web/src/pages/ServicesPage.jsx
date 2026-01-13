import React, { useState, useEffect, useRef } from 'react';
import { Building2, Home, Hotel, Waves, Store, Hammer, PenTool, ArrowRight, Phone, ChevronDown, Key, Sparkles, Shield, Users, Award, Clock, Check, ArrowDown, Play, Star } from 'lucide-react';

// ============ INTERSECTION OBSERVER HOOK ============

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.3, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

// ============ SERVICES DATA ============

const services = [
  {
    id: 'residential',
    title: 'บ้านพักอาศัย',
    subtitle: 'Residential',
    tagline: 'สร้างบ้านที่เป็นมากกว่าที่พักอาศัย',
    description: 'ออกแบบและก่อสร้างบ้านในฝันของคุณ ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ',
    icon: Home,
    gradient: 'from-orange-600 via-amber-500 to-yellow-400',
    bgGradient: 'from-orange-950 via-orange-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    features: ['ออกแบบตามไลฟ์สไตล์', 'วัสดุพรีเมียม', 'ประกัน 10 ปี'],
    stats: { projects: '200+', satisfaction: '100%' },
  },
  {
    id: 'resort',
    title: 'รีสอร์ท & โรงแรม',
    subtitle: 'Resort & Hotel',
    tagline: 'สร้างประสบการณ์พักผ่อนระดับโลก',
    description: 'ออกแบบและก่อสร้างรีสอร์ท โรงแรม ที่ผสมผสานความหรูหราและธรรมชาติ',
    icon: Hotel,
    gradient: 'from-blue-600 via-cyan-500 to-teal-400',
    bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    features: ['Interior Design รวม', 'Landscape Design', 'ระบบ Smart Hotel'],
    stats: { projects: '50+', satisfaction: '100%' },
  },
  {
    id: 'floating',
    title: 'บ้านลอยน้ำ',
    subtitle: 'Floating House',
    tagline: 'นวัตกรรมที่พักริมน้ำแห่งอนาคต',
    description: 'บ้านลอยน้ำที่แข็งแรง ทนทาน ออกแบบให้เหมาะกับวิถีชีวิตริมน้ำ',
    icon: Waves,
    gradient: 'from-teal-600 via-emerald-500 to-green-400',
    bgGradient: 'from-teal-950 via-emerald-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80',
    features: ['ลอยน้ำได้จริง', 'วัสดุกันน้ำ 100%', 'พลังงานโซลาร์'],
    stats: { projects: '30+', satisfaction: '100%' },
  },
  {
    id: 'commercial',
    title: 'อาคารพาณิชย์',
    subtitle: 'Commercial Building',
    tagline: 'สร้างพื้นที่ธุรกิจที่น่าจดจำ',
    description: 'ออกแบบและก่อสร้างอาคารพาณิชย์ ออฟฟิศ ร้านค้า โกดังและโรงงาน',
    icon: Store,
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-400',
    bgGradient: 'from-purple-950 via-violet-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    features: ['แบบมาตรฐาน อบต.', 'ระบบ MEP ครบ', 'ส่งมอบตรงเวลา'],
    stats: { projects: '150+', satisfaction: '100%' },
  },
  {
    id: 'prefab',
    title: 'บ้านสำเร็จรูป',
    subtitle: 'Prefabricated House',
    tagline: 'บ้านคุณภาพ สร้างเร็ว ราคาคุ้ม',
    description: 'บ้านสำเร็จรูปที่ผลิตจากโรงงาน ติดตั้งรวดเร็ว ประหยัดเวลา',
    icon: Building2,
    gradient: 'from-rose-600 via-pink-500 to-red-400',
    bgGradient: 'from-rose-950 via-pink-950 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    features: ['สร้างเสร็จ 45 วัน', 'ราคาคงที่', 'เลือกแบบได้'],
    stats: { projects: '100+', satisfaction: '100%' },
  },
];

// ============ STATS DATA ============

const stats = [
  { value: '500+', label: 'โปรเจ็คสำเร็จ', icon: Building2 },
  { value: '15+', label: 'ปีประสบการณ์', icon: Clock },
  { value: '100%', label: 'ลูกค้าพึงพอใจ', icon: Award },
  { value: '10', label: 'ปีรับประกัน', icon: Shield },
];

// ============ HERO SECTION ============

const HeroSection = ({ isDark, onScrollDown }) => {
  const [heroRef, heroInView] = useInView();

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-pool-at-sunset-aerial-view-40019-large.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
        heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80">
          <Sparkles className="w-4 h-4 text-orange-400" />
          Crystal Bridge Construction
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
          สร้างทุกฝัน<br/>
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            ให้เป็นจริง
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          บริการรับสร้างบ้าน รีสอร์ท โรงแรม และอาคารพาณิชย์<br/>
          ด้วยมาตรฐานระดับพรีเมียม
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator - CENTERED */}
        <div className="flex justify-center">
          <button 
            onClick={onScrollDown}
            className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">เลื่อนลงดูบริการ</span>
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

// ============ SERVICE SECTION ============

const ServiceSection = ({ service, index, isDark }) => {
  const [sectionRef, isInView] = useInView();
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden snap-start"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={service.bgImage} 
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isEven 
            ? 'from-slate-950/95 via-slate-950/80 to-transparent' 
            : 'from-transparent via-slate-950/80 to-slate-950/95'
        }`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60`} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid md:grid-cols-2 gap-12 items-center`}>
          
          {/* Text Content - Animate from Left or Right */}
          <div className={`${isEven ? 'md:order-1' : 'md:order-2'} transition-all duration-1000 delay-300 ${
            isInView 
              ? 'opacity-100 translate-x-0' 
              : isEven 
                ? 'opacity-0 -translate-x-20' 
                : 'opacity-0 translate-x-20'
          }`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
              <Icon className="w-4 h-4" />
              {service.subtitle}
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {service.title}
            </h2>

            {/* Tagline */}
            <p className={`text-xl md:text-2xl font-medium mb-6 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {service.tagline}
            </p>

            {/* Description */}
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
              {service.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-8">
              {service.features.map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm"
                >
                  <Check className="w-4 h-4 text-green-400" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-black text-white">{service.stats.projects}</div>
                <div className="text-sm text-white/50">โปรเจ็คสำเร็จ</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">{service.stats.satisfaction}</div>
                <div className="text-sm text-white/50">ความพึงพอใจ</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className={`group px-8 py-4 rounded-full bg-gradient-to-r ${service.gradient} text-white font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3`}>
                ดูผลงาน
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3">
                <Play className="w-5 h-5" />
                ดูวิดีโอ
              </button>
            </div>
          </div>

          {/* Image Card - Animate from opposite side */}
          <div className={`${isEven ? 'md:order-2' : 'md:order-1'} flex justify-center transition-all duration-1000 delay-500 ${
            isInView 
              ? 'opacity-100 translate-x-0 scale-100' 
              : isEven 
                ? 'opacity-0 translate-x-20 scale-95' 
                : 'opacity-0 -translate-x-20 scale-95'
          }`}>
            <div className="relative">
              {/* Main Image Card */}
              <div className={`w-80 h-[28rem] md:w-96 md:h-[32rem] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10`}>
                <img 
                  src={service.bgImage} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent`} />
                
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3 bg-gradient-to-r ${service.gradient} text-white`}>
                    ผลงานล่าสุด
                  </div>
                  <div className="text-white font-bold text-lg">โปรเจ็ค {service.title}</div>
                  <div className="text-white/60 text-sm">กรุงเทพฯ และปริมณฑล</div>
                </div>
              </div>

              {/* Floating Card - Always on outer edge (away from text) */}
              <div className={`absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl bg-white shadow-2xl`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{service.stats.projects}</div>
                    <div className="text-sm text-slate-500">โปรเจ็คสำเร็จ</div>
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all group">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Number */}
      <div className={`absolute bottom-8 ${isEven ? 'left-8' : 'right-8'} text-[10rem] font-black text-white/5 leading-none`}>
        0{index + 1}
      </div>
    </section>
  );
};

// ============ CTA SECTION ============

const CTASection = ({ isDark }) => {
  const [ctaRef, isInView] = useInView();

  return (
    <section ref={ctaRef} className="relative h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-500/85 to-orange-600/90" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-8 bg-white/20 backdrop-blur-sm text-white">
          <Phone className="w-4 h-4" />
          ปรึกษาฟรี 24 ชั่วโมง
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          พร้อมเริ่มสร้าง<br/>บ้านในฝันแล้วหรือยัง?
        </h2>

        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด<br/>
          ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษา
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
            เริ่มต้นโปรเจ็คของคุณ
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" />
            083-892-4659
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { icon: Shield, label: 'รับประกัน 10 ปี' },
            { icon: Award, label: 'มาตรฐาน ISO' },
            { icon: Users, label: '500+ ลูกค้าไว้วางใจ' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <badge.icon className="w-6 h-6" />
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ MAIN COMPONENT ============

const ServicesPage = ({ isDark = false }) => {
  const containerRef = useRef(null);

  const scrollToSection = (index) => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('section');
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-auto snap-y snap-mandatory scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Hero */}
      <HeroSection isDark={isDark} onScrollDown={() => scrollToSection(1)} />

      {/* Service Sections */}
      {services.map((service, index) => (
        <ServiceSection 
          key={service.id}
          service={service}
          index={index}
          isDark={isDark}
        />
      ))}

      {/* CTA */}
      <CTASection isDark={isDark} />

      {/* Footer Section - Inside snap container */}
      <section className="snap-start bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-black text-white">CRYSTAL</span>
                  <span className="font-black text-orange-500">BRIDGE</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                บริษัท รับสร้างบ้าน รับเหมาก่อสร้าง<br/>
                ที่คุณไว้วางใจมากว่า 15 ปี
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">ติดต่อเรา</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>083-892-4659</span>
                </div>
                <div>097-248-1259</div>
                <div>crystalbridge.co.th@gmail.com</div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-white mb-4">SOCIAL MEDIA</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div>Facebook: ช่างก้อง ก่อสร้าง</div>
                <div>TikTok: TikTok Official</div>
                <div>Line: @crystalbridge</div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4">ID & LINKS</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <div>ใบอนุญาตเลขที่: 12/4829</div>
                <div>เลขที่จดทะเบียน: 0915764</div>
              </div>
              <button className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:shadow-lg transition-all">
                ขอใบเสนอราคา
              </button>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-500 text-sm">
            © 2026 Crystal Bridge Co., Ltd. สงวนลิขสิทธิ์
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
