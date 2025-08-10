'use client';
import React, { useState, useEffect } from 'react';

const page = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [rainDrops, setRainDrops] = useState([]);
  const [waterSplashes, setWaterSplashes] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles only on client side
    const generateParticles = () => {
      return [...Array(15)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        size: 1 + Math.random() * 2
      }));
    };

    // Generate rain drops
    const generateRainDrops = () => {
      return [...Array(25)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        height: 20 + Math.random() * 40
      }));
    };

    // Generate water splashes
    const generateWaterSplashes = () => {
      return [...Array(8)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 80 + Math.random() * 20,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
        scale: 0.5 + Math.random() * 1
      }));
    };
    
    setParticles(generateParticles());
    setRainDrops(generateRainDrops());
    setWaterSplashes(generateWaterSplashes());

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Ultra-Modern Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Ambient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '5%',
            left: '5%'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            top: '50%',
            right: '5%',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            bottom: '10%',
            left: '30%',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Rain Drops Effect */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-0.5 bg-gradient-to-b from-blue-400/60 to-transparent rounded-full animate-rain"
              style={{
                left: `${drop.left}%`,
                height: `${drop.height}px`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Water Splash Effects */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {waterSplashes.map((splash) => (
            <div
              key={splash.id}
              className="absolute animate-splash"
              style={{
                left: `${splash.left}%`,
                top: `${splash.top}%`,
                animationDelay: `${splash.delay}s`,
                animationDuration: `${splash.duration}s`,
                transform: `scale(${splash.scale})`
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-sm"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-md -translate-x-2 -translate-y-2"></div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-200/10 to-cyan-200/10 rounded-full blur-lg -translate-x-4 -translate-y-4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Particles */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Ultra-Sleek Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${
        scrollY > 50 
          ? 'bg-slate-950/70 backdrop-blur-3xl border-b border-white/5 shadow-2xl shadow-blue-500/10' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="group cursor-pointer">
              <div className="text-3xl font-black tracking-tight transform transition-all duration-700 group-hover:scale-110">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-flow">
                  Newinfo
                </span>
                <span className="text-white/90">.</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-16">
              {['HOME', 'SERVICES', 'PRODUCTS', 'ABOUT', 'CONTACT'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-all duration-700 text-xs font-bold tracking-[0.2em] group uppercase"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-700 group-hover:w-full"></span>
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 blur-sm transition-all duration-700 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <button className="group relative bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-500 hover:to-cyan-500 backdrop-blur-xl text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 border border-white/10">
              <span className="relative z-10">Get Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Futuristic Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 z-50 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-xl hover:from-blue-500 hover:to-cyan-500 text-white p-4 rounded-full shadow-2xl transition-all duration-1000 transform hover:scale-125 hover:rotate-12 border border-white/20 ${
          scrollY > 300 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </button>

      {/* Hero Section - Ultra Modern */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-8 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-12 animate-fade-in-up">
            <div className="space-y-6">
              <span className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-2xl text-blue-300 rounded-full text-sm font-bold tracking-wider border border-blue-400/30 animate-pulse-glow">
                ✨ ADVANCED ICT SOLUTIONS
              </span>
              
              <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none tracking-tighter">
                <span className="block transform transition-all duration-1000 hover:scale-105 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  DIGITAL
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow text-shadow-glow">
                  EVOLUTION
                </span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light tracking-wide" style={{ animationDelay: '0.5s' }}>
              Revolutionary software solutions that transcend traditional boundaries, 
              <span className="text-blue-400 font-medium"> transforming businesses </span>
              into digital powerhouses with unprecedented efficiency.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center" style={{ animationDelay: '0.7s' }}>
              <button className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-16 py-6 rounded-full text-xl font-black tracking-wide transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 min-w-[300px] border border-white/20">
                <span className="relative z-10 flex items-center justify-center gap-4">
                  START EVOLUTION
                  <svg className="w-7 h-7 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              </button>
              
              <button className="group text-white border-2 border-white/30 hover:border-white/60 backdrop-blur-xl px-16 py-6 rounded-full text-xl font-black tracking-wide transition-all duration-700 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20 min-w-[300px]">
                <span className="flex items-center justify-center gap-4">
                  EXPLORE PRODUCTS
                  <svg className="w-7 h-7 transform group-hover:scale-125 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-8 h-16 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-xl">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-3 animate-pulse-glow"></div>
          </div>
        </div>
      </section>

      {/* About Section - Ultra Sleek */}
      <section id="about" className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black text-white mb-12 tracking-tight">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Newinfo</span>
            </h2>
            <p className="text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
              Where innovation meets <span className="text-blue-400 font-medium">excellence</span> in every digital solution
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 max-w-8xl mx-auto">
            {[
              { icon: "🎯", title: "Vision", desc: "Transform businesses through revolutionary technology solutions that redefine industry standards", gradient: "from-blue-500/20 to-cyan-500/20", border: "blue-400/50" },
              { icon: "🚀", title: "Mission", desc: "Create cutting-edge platforms that propel organizations into the future of digital excellence", gradient: "from-cyan-500/20 to-purple-500/20", border: "cyan-400/50" },
              { icon: "⭐", title: "Values", desc: "Integrity, Innovation, Excellence, and Security form the foundation of everything we deliver", gradient: "from-purple-500/20 to-pink-500/20", border: "purple-400/50" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${item.gradient} backdrop-blur-2xl rounded-[2rem] p-12 border border-white/10 hover:border-${item.border} transition-all duration-1000 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">{item.icon}</div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors duration-500">{item.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Next Level */}
      <section id="services" className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black text-white mb-12 tracking-tight">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-3xl text-gray-300 max-w-4xl mx-auto font-light">
              Comprehensive solutions for your digital <span className="text-cyan-400 font-medium">transformation journey</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-8xl mx-auto">
            {[
              { icon: "💻", title: "Software Development", desc: "Enterprise-grade custom solutions", gradient: "from-blue-600/30 to-blue-800/30", glow: "blue" },
              { icon: "🌐", title: "Web Development", desc: "Ultra-modern responsive applications", gradient: "from-cyan-600/30 to-cyan-800/30", glow: "cyan" },
              { icon: "📱", title: "Mobile Apps", desc: "Cross-platform excellence", gradient: "from-purple-600/30 to-purple-800/30", glow: "purple" },
              { icon: "🛡️", title: "Network Security", desc: "Fortress-level protection", gradient: "from-emerald-600/30 to-emerald-800/30", glow: "emerald" },
              { icon: "☁️", title: "Cloud Services", desc: "Infinite scalability", gradient: "from-indigo-600/30 to-indigo-800/30", glow: "indigo" },
              { icon: "📊", title: "Digital Marketing", desc: "Strategic online dominance", gradient: "from-pink-600/30 to-pink-800/30", glow: "pink" }
            ].map((service, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${service.gradient} backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10 hover:border-${service.glow}-400/50 transition-all duration-1000 transform hover:scale-110 hover:shadow-2xl hover:shadow-${service.glow}-500/40 cursor-pointer relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="text-8xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-500 mb-8">
                    {service.desc}
                  </p>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                    <button className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-3 text-lg">
                      Explore More
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Revolutionary */}
      <section id="products" className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black text-white mb-12 tracking-tight">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-3xl text-gray-300 max-w-4xl mx-auto font-light">
              Revolutionary software solutions <span className="text-purple-400 font-medium">transforming industries</span>
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {[
              {
                icon: "🏫",
                title: "School ERP",
                desc: "Complete educational ecosystem management from Kindergarten to Secondary level with AI-powered analytics and comprehensive reporting.",
                features: ["AI Student Analytics", "Real-time Performance", "Financial Intelligence", "Parent Ecosystem"],
                gradient: "from-blue-600 to-blue-900",
                delay: "0s"
              },
              {
                icon: "🎓",
                title: "TERP System",
                desc: "Next-generation tertiary institution management platform for complete digital transformation and operational excellence.",
                features: ["Smart Faculty Hub", "Campus Intelligence", "Advanced Analytics", "Compliance Automation"],
                gradient: "from-cyan-600 to-cyan-900",
                delay: "0.2s"
              },
              {
                icon: "💻",
                title: "Edu-CBT",
                desc: "Ultra-secure computer-based testing solution with advanced proctoring and intelligent assessment capabilities.",
                features: ["Fort Knox Security", "AI Proctoring", "Smart Analytics", "Universal Platform"],
                gradient: "from-purple-600 to-purple-900",
                delay: "0.4s"
              },
              {
                icon: "📹",
                title: "Edu-Visual",
                desc: "Professional virtual classroom platform with immersive collaboration tools and real-time interactive features.",
                features: ["4K Live Streaming", "Interactive Universe", "Smart Breakouts", "Cloud Recording"],
                gradient: "from-emerald-600 to-emerald-900",
                delay: "0.6s"
              }
            ].map((product, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${product.gradient} rounded-[2.5rem] p-12 text-white relative overflow-hidden cursor-pointer transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl border border-white/20`}
                style={{ animationDelay: product.delay }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="text-8xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                    {product.icon}
                  </div>
                  <h3 className="text-4xl font-black mb-6 group-hover:text-yellow-300 transition-colors duration-500">
                    {product.title}
                  </h3>
                  <p className="text-white/90 mb-10 leading-relaxed text-xl font-light">
                    {product.desc}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <span className="text-lg font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-xl text-white px-10 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-500 transform hover:scale-105 border border-white/30">
                    Discover More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Ultra Futuristic */}
      <section id="contact" className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black text-white mb-12 tracking-tight">
              Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-3xl text-gray-300 max-w-4xl mx-auto font-light">
              Ready to embark on your <span className="text-blue-400 font-medium">digital transformation</span>?
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
            {/* Ultra-Modern Contact Form */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-12 border border-white/10 hover:border-blue-400/30 transition-all duration-1000">
              <h3 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                <span className="text-5xl">📧</span>
                Send Message
              </h3>
              
              <form className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-700 group-hover:border-white/40"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-700 group-hover:border-white/40"
                    />
                  </div>
                </div>

                <div className="group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-700 group-hover:border-white/40"
                  />
                </div>

                <div className="group">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-700 group-hover:border-white/40"
                  />
                </div>

                <div className="group">
                  <select className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl focus:outline-none focus:border-blue-400 transition-all duration-700 group-hover:border-white/40">
                    <option value="" className="bg-slate-900 text-white">Service of Interest</option>
                    <option value="software" className="bg-slate-900 text-white">Software Development</option>
                    <option value="web" className="bg-slate-900 text-white">Web Development</option>
                    <option value="mobile" className="bg-slate-900 text-white">Mobile App</option>
                    <option value="school-erp" className="bg-slate-900 text-white">School ERP</option>
                    <option value="terp" className="bg-slate-900 text-white">TERP System</option>
                  </select>
                </div>

                <div className="group">
                  <textarea
                    rows={5}
                    placeholder="Tell us about your vision..."
                    className="w-full px-0 py-6 bg-transparent border-0 border-b-2 border-white/20 text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-700 resize-none group-hover:border-white/40"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 rounded-full text-2xl font-black tracking-wide transition-all duration-1000 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 border border-white/20"
                >
                  <span className="flex items-center justify-center gap-4">
                    SEND MESSAGE
                    <svg className="w-8 h-8 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-12 border border-white/10 hover:border-cyan-400/30 transition-all duration-1000 transform hover:scale-105">
                <h3 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                  <span className="text-5xl">📍</span>
                  Contact Info
                </h3>
                
                <div className="space-y-10">
                  {[
                    { icon: "🏢", title: "Location", desc: "Lagos, Nigeria", sub: "Serving nationwide with excellence" },
                    { icon: "📧", title: "Email", desc: "info@newinfo.com.ng", sub: "24/7 dedicated support" },
                    { icon: "⏰", title: "Hours", desc: "Mon-Fri: 8AM-6PM", sub: "Sat: 9AM-4PM" }
                  ].map((contact, index) => (
                    <div key={index} className="group flex items-start gap-8">
                      <div className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                        {contact.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors duration-500">
                          {contact.title}
                        </h4>
                        <p className="text-gray-300 text-lg">{contact.desc}</p>
                        <p className="text-gray-500">{contact.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Map */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-12 border border-white/10 hover:border-purple-400/30 transition-all duration-1000 transform hover:scale-105">
                <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                  <span className="text-4xl">🗺️</span>
                  Our Location
                </h3>
                <div className="h-80 bg-slate-800/50 rounded-[1.5rem] overflow-hidden relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.898424578!2d3.3792057!3d6.5056718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1704234567890!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Location"
                    className="transform group-hover:scale-110 transition-transform duration-1000"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent pointer-events-none group-hover:from-blue-500/40 transition-all duration-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Ultra Dynamic */}
      <section className="py-40 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black text-white mb-12">
              Trusted by <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Thousands</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {[
              { number: "500+", label: "Happy Clients", icon: "😊", gradient: "from-blue-500/30 to-blue-700/30" },
              { number: "99.9%", label: "Uptime", icon: "⚡", gradient: "from-yellow-500/30 to-orange-700/30" },
              { number: "24/7", label: "Support", icon: "🎧", gradient: "from-green-500/30 to-emerald-700/30" },
              { number: "6+", label: "Years Experience", icon: "🏆", gradient: "from-purple-500/30 to-pink-700/30" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`group text-center bg-gradient-to-br ${stat.gradient} backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10 hover:border-yellow-400/50 transition-all duration-1000 transform hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/30`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors duration-500">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-bold text-lg group-hover:text-white transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Epic */}
      <section className="py-40 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-95"></div>
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-8xl font-black text-white mb-12 tracking-tight">
            Ready to <span className="text-yellow-300">Transform?</span>
          </h2>
          <p className="text-3xl text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Join hundreds of satisfied clients who have revolutionized their operations with our 
            <span className="font-bold text-yellow-300"> cutting-edge solutions</span>.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
            <button className="group bg-white hover:bg-gray-100 text-purple-600 px-16 py-6 rounded-full text-2xl font-black tracking-wide transition-all duration-1000 transform hover:scale-110 hover:shadow-2xl min-w-[350px] border border-white/20">
              <span className="flex items-center justify-center gap-4">
                START FREE CONSULTATION
                <svg className="w-8 h-8 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </button>
            
            <button className="group border-3 border-white text-white hover:bg-white hover:text-purple-600 px-16 py-6 rounded-full text-2xl font-black tracking-wide transition-all duration-700 min-w-[350px] backdrop-blur-xl">
              <span className="flex items-center justify-center gap-4">
                VIEW PORTFOLIO
                <svg className="w-8 h-8 transform group-hover:scale-125 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Futuristic */}
      <footer className="py-24 px-8 relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="group cursor-pointer inline-block">
              <div className="text-5xl font-black text-white mb-6 transform transition-all duration-700 group-hover:scale-110">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-flow">
                  Newinfo
                </span>
                <span className="text-white">.</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed">
              Transforming businesses through revolutionary technology solutions that make work faster, smarter, and life infinitely better.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-16 text-center md:text-left mb-20">
            <div>
              <h4 className="text-white font-black mb-8 text-2xl">Services</h4>
              <div className="space-y-4">
                {['Software Development', 'Web Development', 'Mobile Apps', 'IT Consulting'].map((item, index) => (
                  <div key={index} className="text-gray-400 hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-8 text-2xl">Products</h4>
              <div className="space-y-4">
                {['School ERP', 'TERP System', 'Edu-CBT', 'Edu-Visual'].map((item, index) => (
                  <div key={index} className="text-gray-400 hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-8 text-2xl">Company</h4>
              <div className="space-y-4">
                {['About Us', 'Our Team', 'Careers', 'Contact'].map((item, index) => (
                  <div key={index} className="text-gray-400 hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-8 text-2xl">Connect</h4>
              <div className="space-y-4 text-gray-400">
                <div className="hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                  info@newinfo.com.ng
                </div>
                <div className="hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                  newinfo.com.ng
                </div>
                <div className="hover:text-white transition-colors duration-500 cursor-pointer text-lg">
                  Lagos, Nigeria
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 text-center">
            <p className="text-gray-500 text-lg">© 2025 Newinfo Global Solutions Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rain {
          from {
            transform: translateY(-100vh);
            opacity: 1;
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes splash {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }
        
        .animate-gradient-flow {
          animation: gradient-flow 4s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }

        .animate-rain {
          animation: rain linear infinite;
        }

        .animate-splash {
          animation: splash linear infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default page;