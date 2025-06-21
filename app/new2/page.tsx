// 'use client';

// import { useState, useEffect, useCallback } from 'react';

// export default function LandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isHeaderHidden, setIsHeaderHidden] = useState(false);
//   const [lastScrollTop, setLastScrollTop] = useState(0);

//   const handleScroll = useCallback(() => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     if (scrollTop > lastScrollTop && scrollTop > 100) {
//       setIsHeaderHidden(true);
//     } else {
//       setIsHeaderHidden(false);
//     }
//     setLastScrollTop(scrollTop);
//   }, [lastScrollTop]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const href = e.currentTarget.getAttribute('href');
//     if (!href) return;

//     const target = document.querySelector(href);
//     if (target) {
//       const headerHeight = document.querySelector('header')?.offsetHeight || 0;
//       const targetPosition = (target as HTMLElement).offsetTop - headerHeight;

//       window.scrollTo({
//         top: targetPosition,
//         behavior: 'smooth'
//       });

//       if (isMenuOpen) setIsMenuOpen(false);
//     }
//   };

//   return (
//     <main id="main-content" className="flex-1 relative h-full">
//       <header
//         id="header"
//         className="bg-white shadow-sm fixed w-full top-0 z-50"
//         style={{
//           transition: 'transform 0.3s ease-in-out',
//           transform: isHeaderHidden ? 'translateY(-100%)' : 'translateY(0)'
//         }}>

//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <span className="font-Manrope text-2xl font-bold text-primary">SportVenue</span>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-8">
//               {['Home', 'Features', 'How It Works', 'About Us', 'Contact'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(' ', '-')}`}
//                   onClick={handleSmoothScroll}
//                   className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
//                 aria-controls="mobile-menu"
//                 aria-expanded={isMenuOpen}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {/* Hamburger icon */}
//                 <svg
//                   className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//                 {/* Close icon */}
//                 <svg
//                   className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200">
//               {['Home', 'Features', 'How It Works', 'About Us', 'Contact'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(' ', '-')}`}
//                   onClick={handleSmoothScroll}
//                   className="font-Manrope block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors duration-300"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </nav>
//       </header>
//       <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1534527489986-3e3394ca569c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTI1MjBzcG9ydHMlMjUyMGZhY2lsaXR5JTI1MjBicmlnaHQlMjUyMHByb2Zlc3Npb25hbHxlbnwxfDB8fHwxNzQ5NjYxMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
//             alt="Modern sports facility with glass roof"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-neutral-900 bg-opacity-60"></div>
//         </div>

//         {/* Hero Content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ opacity: 1, transform: 'translateY(0px)', transition: '1s ease-out' }}>
//           <div className="max-w-4xl mx-auto">
//             {/* Main Headline */}
//             <h1 className="font-Manrope text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               Book Premium Sports Venues
//               <span className="text-primary block mt-2">Instantly</span>
//             </h1>

//             {/* Subheadline */}
//             <p className="font-Inter text-xl sm:text-2xl text-neutral-200 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Compare venues, check availability, and secure your perfect sports facility in seconds. Join thousands of athletes and teams.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//               <button className="font-Manrope bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Find Venues Now
//               </button>
//               <button className="font-Manrope border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
//                 List Your Venue
//               </button>
//             </div>

//             {/* Key Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
//               {[
//                 { icon: '⚡', title: 'Instant Booking', description: 'Book venues in real-time with instant confirmation' },
//                 { icon: '📍', title: 'Compare Nearby', description: 'Find and compare venues in your area' },
//                 { icon: '💰', title: 'Best Deals', description: 'Access exclusive offers and discounts' }
//               ].map((feature, index) => (
//                 <div
//                   key={feature.title}
//                   className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20"
//                   style={{ opacity: 1, transform: 'translateY(0px)', transition: '0.6s ease-out' }}
//                 >
//                   <div className="text-3xl mb-3">{feature.icon}</div>
//                   <h3 className="font-Manrope text-white font-semibold text-lg mb-2">{feature.title}</h3>
//                   <p className="font-Inter text-neutral-200 text-sm">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//             <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
//             </div>
//           </div>
//         </div>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Smooth scroll for scroll indicator
//         const scrollIndicator = document.querySelector('.animate-bounce');
//         if (scrollIndicator) {
//           scrollIndicator.addEventListener('click', function() {
//             const nextSection = document.querySelector('#features');
//             if (nextSection) {
//               nextSection.scrollIntoView({ behavior: 'smooth' });
//             }
//           });
//         }

//         // Parallax effect for hero background
//         window.addEventListener('scroll', function() {
//           const scrolled = window.pageYOffset;
//           const heroSection = document.querySelector('#hero');
//           const heroImage = heroSection.querySelector('img');

//           if (heroImage && scrolled < window.innerHeight) {
//             heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
//           }
//         });

//         // Animate hero content on load
//         const heroContent = document.querySelector('#hero .relative.z-10');
//         heroContent.style.opacity = '0';
//         heroContent.style.transform = 'translateY(30px)';

//         setTimeout(() => {
//           heroContent.style.transition = 'all 1s ease-out';
//           heroContent.style.opacity = '1';
//           heroContent.style.transform = 'translateY(0)';
//         }, 300);

//         // Stagger animation for feature cards
//         const featureCards = document.querySelectorAll('#hero .grid > div');
//         featureCards.forEach((card, index) => {
//           card.style.opacity = '0';
//           card.style.transform = 'translateY(20px)';

//           setTimeout(() => {
//             card.style.transition = 'all 0.6s ease-out';
//             card.style.opacity = '1';
//             card.style.transform = 'translateY(0)';
//           }, 800 + (index * 200));
//         });
//       });
//     </script>
//   </section>
// </div>
// <div id="root">
//   <section id="features" class="py-20 bg-neutral-50">
//     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <!-- Section Header -->
//       <div class="text-center mb-16">
//         <h2 class="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//           Features
//         </h2>
//         <p class="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//           Everything you need to find, book, and manage sports venues in one powerful platform
//         </p>
//       </div>

//       <!-- Features Grid -->
//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
//         <!-- Feature 1: Instant Booking -->
//         <div class="flex flex-col lg:flex-row items-center gap-8" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out;">
//           <div class="lg:w-1/2">
//             <img src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBwcm9mZXNzaW9uYWx8ZW58MXwwfHx8MTc0OTY2MTExNnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Perfectly timed shot while a man is about to lift the shuttle" class="w-full h-64 object-cover rounded-lg shadow-lg">
//           </div>
//           <div class="lg:w-1/2">
//             <h3 class="font-Manrope text-2xl font-bold text-neutral-900 mb-4">Instant Booking System</h3>
//             <p class="font-Inter text-neutral-600 mb-6">
//               Book your favorite sports venues instantly with real-time availability. No waiting, no delays - just click and play.
//             </p>
//             <ul class="space-y-2">
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Real-time slot availability
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Instant confirmation
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Secure payment processing
//               </li>
//             </ul>
//           </div>
//         </div>

//         <!-- Feature 2: Venue Comparison -->
//         <div class="flex flex-col lg:flex-row-reverse items-center gap-8" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.1s;">
//           <div class="lg:w-1/2">
//             <img src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBwcm9mZXNzaW9uYWx8ZW58MXwwfHx8MTc0OTY2MTExNnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Football player preparing for the match" class="w-full h-64 object-cover rounded-lg shadow-lg">
//           </div>
//           <div class="lg:w-1/2">
//             <h3 class="font-Manrope text-2xl font-bold text-neutral-900 mb-4">Smart Venue Comparison</h3>
//             <p class="font-Inter text-neutral-600 mb-6">
//               Compare nearby venues by price, amenities, and ratings. Make informed decisions with detailed insights.
//             </p>
//             <ul class="space-y-2">
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Side-by-side comparisons
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Location-based search
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 User reviews &amp; ratings
//               </li>
//             </ul>
//           </div>
//         </div>

//         <!-- Feature 3: Multi-Sport Support -->
//         <div class="flex flex-col lg:flex-row items-center gap-8" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.2s;">
//           <div class="lg:w-1/2">
//             <img src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBwcm9mZXNzaW9uYWx8ZW58MXwwfHx8MTc0OTY2MTExNnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Man in red tank top doing water sports during daytime" class="w-full h-64 object-cover rounded-lg shadow-lg">
//           </div>
//           <div class="lg:w-1/2">
//             <h3 class="font-Manrope text-2xl font-bold text-neutral-900 mb-4">All Sports, One Platform</h3>
//             <p class="font-Inter text-neutral-600 mb-6">
//               From football to swimming, tennis to basketball - find venues for every sport in your area.
//             </p>
//             <ul class="space-y-2">
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 50+ sport categories
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Indoor &amp; outdoor venues
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Professional facilities
//               </li>
//             </ul>
//           </div>
//         </div>

//         <!-- Feature 4: Venue Management -->
//         <div class="flex flex-col lg:flex-row-reverse items-center gap-8" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.3s;">
//           <div class="lg:w-1/2">
//             <img src="https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8NHx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBwcm9mZXNzaW9uYWx8ZW58MXwwfHx8MTc0OTY2MTExNnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Professional sports venue management" class="w-full h-64 object-cover rounded-lg shadow-lg">
//           </div>
//           <div class="lg:w-1/2">
//             <h3 class="font-Manrope text-2xl font-bold text-neutral-900 mb-4">Easy Venue Listing</h3>
//             <p class="font-Inter text-neutral-600 mb-6">
//               Venue owners can easily list their facilities and manage bookings with our comprehensive dashboard.
//             </p>
//             <ul class="space-y-2">
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Simple listing process
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Booking management tools
//               </li>
//               <li class="font-Inter flex items-center text-neutral-700">
//                 <span class="text-primary mr-2">✓</span>
//                 Revenue analytics
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <!-- Stats Section -->
//       <div class="bg-white rounded-2xl p-8 shadow-lg">
//         <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out;">
//             <div class="font-Manrope text-3xl lg:text-4xl font-bold text-primary mb-2">1000+</div>
//             <div class="font-Inter text-neutral-600">Venues Listed</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.1s;">
//             <div class="font-Manrope text-3xl lg:text-4xl font-bold text-primary mb-2">50K+</div>
//             <div class="font-Inter text-neutral-600">Happy Users</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.2s;">
//             <div class="font-Manrope text-3xl lg:text-4xl font-bold text-primary mb-2">100K+</div>
//             <div class="font-Inter text-neutral-600">Bookings Made</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.3s;">
//             <div class="font-Manrope text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
//             <div class="font-Inter text-neutral-600">Support</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <script>
//       // Implement animations using React hooks
//         useEffect(() => {
//           // Create Intersection Observer for animations
//           const observer = new IntersectionObserver(
//             (entries) => {
//               entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                   entry.target.style.opacity = '1';
//                   entry.target.style.transform = 'translateY(0)';
//                 }
//               });
//             },
//             { threshold: 0.1 }
//           );

//           // Observe all animated elements
//           document.querySelectorAll('[style*="opacity: 0"]').forEach((el) => observer.observe(el));

//           return () => observer.disconnect();
//         }, []);

//         // Add React hooks for feature and stats animations
//         useEffect(() => {
//           const featureItems = document.querySelectorAll('#features .grid > div');
//           const statsItems = document.querySelectorAll('#features .bg-white.rounded-2xl > div > div');
//           const statsNumbers = document.querySelectorAll('#features .text-3xl.lg\\:text-4xl');

//           const animateCounter = (element, target) => {
//             let current = 0;
//             const increment = target / 100;
//             const timer = setInterval(() => {
//               current += increment;
//               if (current >= target) {
//                 current = target;
//                 clearInterval(timer);
//               }

//               if (target >= 1000) {
//                 element.textContent = Math.floor(current / 1000) + 'K+';
//               } else {
//                 element.textContent = Math.floor(current) + '+';
//               }
//             }, 20);

//             return () => clearInterval(timer);
//           };

//           const observer = new IntersectionObserver(
//             (entries) => {
//               entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                   entry.target.style.opacity = '1';
//                   entry.target.style.transform = 'translateY(0)';
//                 }
//               });
//             },
//             { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
//           );

//           const statsObserver = new IntersectionObserver(
//             (entries) => {
//               entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                   const text = entry.target.textContent;
//                   const number = parseInt(text.replace(/[^\d]/g, ''));
//                   animateCounter(entry.target, number);
//                   statsObserver.unobserve(entry.target);
//                 }
//               });
//             },
//             { threshold: 0.5 }
//           );

//           // Initialize animations
//           featureItems.forEach((item, index) => {
//             item.style.opacity = '0';
//             item.style.transform = 'translateY(30px)';
//             item.style.transition = 'all 0.6s ease-out';
//             item.style.transitionDelay = `${index * 0.1}s`;
//             observer.observe(item);
//           });

//           statsItems.forEach((item, index) => {
//             item.style.opacity = '0';
//             item.style.transform = 'translateY(20px)';
//             item.style.transition = 'all 0.5s ease-out';
//             item.style.transitionDelay = `${index * 0.1}s`;
//             observer.observe(item);
//           });

//           statsNumbers.forEach((stat) => {
//             statsObserver.observe(stat);
//           });

//           return () => {
//             observer.disconnect();
//             statsObserver.disconnect();
//           };
//         }, []);
//       </section>

//       <section id="how-it-works" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//               How It Works
//             </h2>
//             <p className="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//               Get started in three simple steps and book your perfect sports venue today
//             </p>
//           </div>

//           {/* Steps */}
//           <div className="relative">
//             {/* Connection Line */}
//             <div
//               className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 transform -translate-y-1/2"
//               style={{ width: 0, transition: 'width 2s ease-out 0.5s' }}
//             />

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
//               {[
//                 {
//                   number: 1,
//                   title: 'Search & Compare',
//                   description: 'Browse venues in your area, compare prices, amenities, and read reviews from other users.',
//                   image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBpbnRlcmZhY2UlMjUyMGlsbHVzdHJhdGlvbnxlbnwxfDB8fHwxNzQ5NjYxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
//                   alt: 'Perfectly timed shot while a man is about to lift the shuttle',
//                   delay: 0
//                 },
//                 {
//                   number: 2,
//                   title: 'Select & Book',
//                   description: 'Choose your preferred time slot, select additional services, and complete your booking with secure payment.',
//                   image: 'https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBpbnRlcmZhY2UlMjUyMGlsbHVzdHJhdGlvbnxlbnwxfDB8fHwxNzQ5NjYxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
//                   alt: 'Football player preparing for the match',
//                   delay: 0.2
//                 },
//                 {
//                   number: 3,
//                   title: 'Play & Enjoy',
//                   description: 'Receive instant confirmation, show up at your venue, and enjoy your game with friends or teammates.',
//                   image: 'https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBpbnRlcmZhY2UlMjUyMGlsbHVzdHJhdGlvbnxlbnwxfDB8fHwxNzQ5NjYxMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
//                   alt: 'Man in red tank top doing water sports during daytime',
//                   delay: 0.4
//                 }
//               ].map((step) => (
//                 <div
//                   key={step.number}
//                   className="relative text-center"
//                   style={{
//                     opacity: 0,
//                     transform: 'translateY(30px)',
//                     transition: `0.6s ease-out ${step.delay}s`
//                   }}
//                 >
//                   <div className="relative z-10 bg-white p-4 inline-block">
//                     <div
//                       className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
//                       style={{
//                         transform: 'scale(0)',
//                         transition: `transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.8 + step.number * 0.2}s`
//                       }}
//                     >
//                       <span className="font-Manrope text-2xl font-bold text-white">{step.number}</span>
//                     </div>
//                   </div>
//                   <div className="mb-6">
//                     <img
//                       src={step.image}
//                       alt={step.alt}
//                       className="w-full h-48 object-cover rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-4">{step.title}</h3>
//                   <p className="font-Inter text-neutral-600">{step.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="text-center mt-16">
//             <div
//               className="bg-neutral-50 rounded-2xl p-8 lg:p-12"
//               style={{
//                 opacity: 0,
//                 transform: 'translateY(20px)',
//                 transition: '0.6s ease-out'
//               }}
//             >
//               <h3 className="font-Manrope text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
//                 Ready to Book Your Next Game?
//               </h3>
//               <p className="font-Inter text-neutral-600 mb-8 max-w-2xl mx-auto">
//                 Join thousands of athletes who trust SportVenue for their booking needs. Start playing today!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   className="font-Manrope bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
//                   onClick={() => console.log('Start Booking clicked')}
//                 >
//                   Start Booking Now
//                 </button>
//                 <button
//                   className="font-Manrope border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
//                   onClick={() => console.log('List Venue clicked')}
//                 >
//                   List Your Venue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       // Add React hooks for step animations
//         useEffect(() => {
//           const observer = new IntersectionObserver(
//             (entries) => {
//               entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                   entry.target.style.opacity = '1';
//                   entry.target.style.transform = 'translateY(0)';
//                 }
//               });
//             },
//             { threshold: 0.2 }
//           );

//         // Animate steps
//         const steps = document.querySelectorAll('#how-it-works .grid > div');
//         steps.forEach((step, index) => {
//           step.style.opacity = '0';
//           step.style.transform = 'translateY(30px)';
//           step.style.transition = 'all 0.6s ease-out';
//           step.style.transitionDelay = `${index * 0.2}s`;
//           observer.observe(step);
//         });

//         // Animate connection line
//         const connectionLine = document.querySelector('#how-it-works .absolute.top-1\\/2');
//         if (connectionLine) {
//           connectionLine.style.width = '0';
//           connectionLine.style.transition = 'width 2s ease-out';
//           connectionLine.style.transitionDelay = '0.5s';

//           const lineObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                 connectionLine.style.width = '100%';
//                 lineObserver.unobserve(entry.target);
//               }
//             });
//           }, { threshold: 0.3 });

//           lineObserver.observe(connectionLine);
//         }

//         // Animate step numbers
//         const stepNumbers = document.querySelectorAll('#how-it-works .bg-primary.rounded-full');
//         stepNumbers.forEach((number, index) => {
//           number.style.transform = 'scale(0)';
//           number.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
//           number.style.transitionDelay = `${0.8 + (index * 0.2)}s`;

//           const numberObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                 entry.target.style.transform = 'scale(1)';
//                 numberObserver.unobserve(entry.target);
//               }
//             });
//           }, { threshold: 0.5 });

//           numberObserver.observe(number);
//         });

//         // Animate CTA section
//         const ctaSection = document.querySelector('#how-it-works .bg-neutral-50');
//         ctaSection.style.opacity = '0';
//         ctaSection.style.transform = 'translateY(20px)';
//         ctaSection.style.transition = 'all 0.6s ease-out';

//         const ctaObserver = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//               ctaObserver.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.3 });

//         ctaObserver.observe(ctaSection);
//       });
//     </script>
//   </section>
// </div>
//       <section id="benefits" className="py-20 bg-neutral-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//               Why Choose SportVenue?
//             </h2>
//             <p className="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//               Experience the future of sports venue booking with unmatched convenience and reliability
//             </p>
//           </div>

//           {/* Benefits Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
//             {[
//               {
//                 title: 'Save Time & Money',
//                 description: 'Skip the phone calls and endless searching. Compare prices instantly and book the best deals in seconds.',
//                 icon: '⏰',
//                 iconBg: 'primary',
//                 image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBicmlnaHQlMjUyMHByb2Zlc3Npb25hbHxlbnwxfDB8fHwxNzQ5NjYxMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
//                 imageAlt: 'Perfectly timed shot while a man is about to lift the shuttle',
//                 features: [
//                   'Instant price comparison',
//                   'Exclusive platform discounts',
//                   'No booking fees'
//                 ],
//                 reverse: false
//               },
//               {
//                 title: 'Guaranteed Availability',
//                 description: 'Real-time updates ensure you never book a slot that's already taken. Your time is confirmed instantly.',
//                 icon: '🎯',
//                 iconBg: 'secondary',
//                 image: 'https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBicmlnaHQlMjUyMHByb2Zlc3Npb25hbHxlbnwxfDB8fHwxNzQ5NjYxMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
//                 imageAlt: 'Football player preparing for the match',
//                 features: [
//                   'Live availability updates',
//                   'Instant confirmation',
//                   'Backup venue suggestions'
//                 ],
//                 reverse: true
//               }
//             ].map((benefit, index) => (
//               <div
//                 key={benefit.title}
//                 className={`flex flex-col ${benefit.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8`}
//                 style={{ opacity: 0, transform: 'translateY(30px)', transition: `0.6s ease-out ${index * 0.15}s` }}
//               >
//                 <div className="lg:w-1/2">
//                   <img
//                     src={benefit.image}
//                     alt={benefit.imageAlt}
//                     className="w-full h-64 object-cover rounded-lg shadow-lg"
//                   />
//                 </div>
//                 <div className="lg:w-1/2">
//                   <div
//                     className={`bg-${benefit.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
//                     style={{ transform: 'scale(0)', transition: `transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.5 + index * 0.2}s` }}
//                   >
//                     <span className="text-2xl text-white">{benefit.icon}</span>
//                   </div>
//                   <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-4">{benefit.title}</h3>
//                   <p className="font-Inter text-neutral-600 mb-6">{benefit.description}</p>
//                   <ul className="space-y-3">
//                     {benefit.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="font-Inter flex items-center text-neutral-700">
//                         <span className={`text-${benefit.iconBg} mr-3`}>✓</span>
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}

//             {/* Premium Experience */}
//             <div
//               className="flex flex-col lg:flex-row items-center gap-8 lg:col-span-2"
//               style={{ opacity: 0, transform: 'translateY(30px)', transition: '0.6s ease-out 0.3s' }}
//             >
//               <div className="lg:w-1/2">
//                 <img
//                   src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9iaWxlJTI1MjBicmlnaHQlMjUyMHByb2Zlc3Npb25hbHxlbnwxfDB8fHwxNzQ5NjYxMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
//                   alt="Man in red tank top doing water sports during daytime"
//                   className="w-full h-64 object-cover rounded-lg shadow-lg"
//                 />
//               </div>
//               <div className="lg:w-1/2">
//                 <div
//                   className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-6"
//                   style={{ transform: 'scale(0)', transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.9s' }}
//                 >
//                   <span className="text-2xl text-white">⭐</span>
//                 </div>
//                 <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-4">Premium Experience</h3>
//                 <p className="font-Inter text-neutral-600 mb-6">
//                   Access to top-rated venues with professional facilities, equipment, and services for the ultimate sports experience.
//                 </p>
//                 <div className="grid grid-cols-2 gap-4">
//                   {[
//                     { value: '4.8★', label: 'Average Rating' },
//                     { value: '500+', label: 'Premium Venues' }
//                   ].map((stat, index) => (
//                     <div
//                       key={stat.label}
//                       className="text-center p-4 bg-white rounded-lg"
//                       style={{ opacity: 0, transform: 'translateY(30px)', transition: `0.6s ease-out ${0.45 + index * 0.15}s` }}
//                     >
//                       <div className="font-Manrope text-2xl font-bold text-accent mb-1">{stat.value}</div>
//                       <div className="font-Inter text-sm text-neutral-600">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Value Proposition Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: '📱',
//                 title: 'Mobile First',
//                 description: 'Book on-the-go with our mobile-optimized platform. Available 24/7 from any device.',
//                 bgColor: 'primary'
//               },
//               {
//                 icon: '🔒',
//                 title: 'Secure Payments',
//                 description: 'Bank-level security with multiple payment options. Your data is always protected.',
//                 bgColor: 'secondary'
//               },
//               {
//                 icon: '🏆',
//                 title: 'Quality Assured',
//                 description: 'All venues are verified and rated by our community. Quality guaranteed every time.',
//                 bgColor: 'accent'
//               }
//             ].map((card, index) => (
//               <div
//                 key={card.title}
//                 className="bg-white p-8 rounded-xl shadow-lg text-center"
//                 style={{ opacity: 0, transform: 'translateY(20px)', transition: `0.5s ease-out ${0.8 + index * 0.1}s` }}
//               >
//                 <div className={`w-12 h-12 bg-${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
//                   <span className="text-white text-xl">{card.icon}</span>
//                 </div>
//                 <h4 className="font-Manrope text-lg font-bold text-neutral-900 mb-3">{card.title}</h4>
//                 <p className="font-Inter text-neutral-600 text-sm">{card.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Intersection Observer for animations
//         const observerOptions = {
//           threshold: 0.1,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate benefit items
//         const benefitItems = document.querySelectorAll('#benefits .grid > div');
//         benefitItems.forEach((item, index) => {
//           item.style.opacity = '0';
//           item.style.transform = 'translateY(30px)';
//           item.style.transition = 'all 0.6s ease-out';
//           item.style.transitionDelay = `${index * 0.15}s`;
//           observer.observe(item);
//         });

//         // Animate value proposition cards
//         const valueCards = document.querySelectorAll('#benefits .grid.grid-cols-1.md\\:grid-cols-3 > div');
//         valueCards.forEach((card, index) => {
//           card.style.opacity = '0';
//           card.style.transform = 'translateY(20px)';
//           card.style.transition = 'all 0.5s ease-out';
//           card.style.transitionDelay = `${0.8 + (index * 0.1)}s`;
//           observer.observe(card);
//         });

//         // Animate benefit icons
//         const benefitIcons = document.querySelectorAll('#benefits .w-16.h-16.rounded-full');
//         benefitIcons.forEach((icon, index) => {
//           icon.style.transform = 'scale(0)';
//           icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
//           icon.style.transitionDelay = `${0.5 + (index * 0.2)}s`;

//           const iconObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                 entry.target.style.transform = 'scale(1)';
//                 iconObserver.unobserve(entry.target);
//               }
//             });
//           }, { threshold: 0.5 });

//           iconObserver.observe(icon);
//         });

//         // Hover effects for value proposition cards
//         valueCards.forEach(card => {
//           card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-5px)';
//             this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
//           });

//           card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//             this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
//           });
//         });

//         // Counter animation for stats
//         const statNumbers = document.querySelectorAll('#benefits .text-2xl.font-bold.text-accent');
//         const animateCounter = (element, target, suffix = '') => {
//           let current = 0;
//           const increment = target / 50;
//           const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//               current = target;
//               clearInterval(timer);
//             }

//             if (suffix === '★') {
//               element.textContent = current.toFixed(1) + suffix;
//             } else {
//               element.textContent = Math.floor(current) + suffix;
//             }
//           }, 30);
//         };

//         const statsObserver = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               const text = entry.target.textContent;
//               if (text.includes('★')) {
//                 animateCounter(entry.target, 4.8, '★');
//               } else if (text.includes('+')) {
//                 animateCounter(entry.target, 500, '+');
//               }
//               statsObserver.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.5 });

//         statNumbers.forEach(stat => {
//           statsObserver.observe(stat);
//         });
//       });
//     </script>
//   </section>
// </div>
//       <section id="about" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//               About Us
//             </h2>
//             <p className="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//               Revolutionizing sports venue booking with technology, passion, and a commitment to connecting athletes with perfect facilities
//             </p>
//           </div>

//           {/* Main About Content */}
//           <div
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
//             style={{
//               opacity: 0,
//               transform: 'translateY(30px)',
//               transition: '0.6s ease-out'
//             }}
//           >
//             <div>
//               <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-6">Our Mission</h3>
//               <p className="font-Inter text-neutral-600 mb-6">
//                 SportVenue was born from a simple frustration: finding and booking quality sports facilities shouldn't be complicated. We're building the future of sports venue booking.
//               </p>
//               <p className="font-Inter text-neutral-600 mb-8">
//                 Our platform connects athletes, teams, and sports enthusiasts with premium venues while helping facility owners maximize their bookings and revenue.
//               </p>

//               {/* Key Stats */}
//               <div
//                 className="grid grid-cols-2 gap-6"
//                 style={{
//                   opacity: 0,
//                   transform: 'translateY(30px)',
//                   transition: '0.6s ease-out 0.2s'
//                 }}
//               >
//                 {[
//                   { value: '2023', label: 'Founded' },
//                   { value: '50+', label: 'Cities' }
//                 ].map((stat, index) => (
//                   <div key={stat.label} className="text-center p-4 bg-neutral-50 rounded-lg">
//                     <div className="font-Manrope text-3xl font-bold text-primary mb-2">{stat.value}</div>
//                     <div className="font-Inter text-neutral-600 text-sm">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <img
//                 src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBwcm9mZXNzaW9uYWwlMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NjYxMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
//                 alt="Perfectly timed shot while a man is about to lift the shuttle"
//                 className="w-full h-80 object-cover rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//           </div>

//           {/* Our Values */}
//           <div className="mb-20">
//             <h3 className="font-Manrope text-3xl font-bold text-neutral-900 text-center mb-12">Our Values</h3>
//             <div
//               className="grid grid-cols-1 md:grid-cols-3 gap-8"
//               style={{
//                 opacity: 0,
//                 transform: 'translateY(30px)',
//                 transition: '0.6s ease-out 0.4s'
//               }}
//             >
//               {[
//                 {
//                   icon: '🎯',
//                   title: 'Simplicity',
//                   description: 'Making sports venue booking as simple as ordering food online. No complexity, just results.',
//                   bgColor: 'primary',
//                   delay: 0.5
//                 },
//                 {
//                   icon: '🤝',
//                   title: 'Trust',
//                   description: 'Building lasting relationships with verified venues and transparent pricing for every user.',
//                   bgColor: 'secondary',
//                   delay: 0.6
//                 },
//                 {
//                   icon: '⚡',
//                   title: 'Innovation',
//                   description: 'Constantly improving our platform with cutting-edge technology and user feedback.',
//                   bgColor: 'accent',
//                   delay: 0.7
//                 }
//               ].map((value, index) => (
//                 <div
//                   key={value.title}
//                   className="text-center p-6"
//                   style={{
//                     opacity: 0,
//                     transform: 'translateY(20px)',
//                     transition: `0.5s ease-out ${value.delay}s`
//                   }}
//                 >
//                   <div
//                     className={`w-16 h-16 bg-${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
//                     style={{
//                       transform: 'translateX(-20px)',
//                       transition: `0.4s ease-out ${1 + index * 0.1}s`,
//                       opacity: 0
//                     }}
//                   >
//                     <span className="text-2xl text-white">{value.icon}</span>
//                   </div>
//                   <h4 className="font-Manrope text-xl font-bold text-neutral-900 mb-3">{value.title}</h4>
//                   <p className="font-Inter text-neutral-600">{value.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Our Story */}
//           <div
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
//             style={{
//               opacity: 0,
//               transform: 'translateY(30px)',
//               transition: '0.6s ease-out 0.6s'
//             }}
//           >
//             <div>
//               <img
//                 src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBwcm9mZXNzaW9uYWwlMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NjYxMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
//                 alt="Football player preparing for the match"
//                 className="w-full h-80 object-cover rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>

//             <div>
//               <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-6">Our Story</h3>
//               <p className="font-Inter text-neutral-600 mb-6">
//                 Started by a team of sports enthusiasts and tech experts who experienced the pain of booking venues firsthand. We knew there had to be a better way.
//               </p>
//               <p className="font-Inter text-neutral-600 mb-8">
//                 Today, we're proud to serve thousands of athletes and hundreds of venue owners, creating a thriving ecosystem that benefits everyone in the sports community.
//               </p>

//               {/* Achievement Stats */}
//               <div className="space-y-4">
//                 {[
//                   '1000+ venues successfully onboarded',
//                   '50,000+ happy customers served',
//                   '100,000+ successful bookings completed'
//                 ].map((achievement, index) => (
//                   <div
//                     key={achievement}
//                     className="flex items-center"
//                     style={{
//                       opacity: 0,
//                       transform: 'translateX(-20px)',
//                       transition: `0.4s ease-out ${1.3 + index * 0.1}s`
//                     }}
//                   >
//                     <span className="text-primary mr-3">✓</span>
//                     <span className="font-Inter text-neutral-700">{achievement}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Team & Vision */}
//           <div className="bg-neutral-50 rounded-2xl p-8 lg:p-12">
//             <div
//               className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//               style={{
//                 opacity: 0,
//                 transform: 'translateY(30px)',
//                 transition: '0.6s ease-out 0.8s'
//               }}
//             >
//               <div>
//                 <h3 className="font-Manrope text-2xl font-bold text-neutral-900 mb-6">Our Vision</h3>
//                 <p className="font-Inter text-neutral-600 mb-6">
//                   To become the global leader in sports venue booking, making quality facilities accessible to everyone, everywhere.
//                 </p>
//                 <p className="font-Inter text-neutral-600 mb-8">
//                   We envision a world where finding and booking the perfect sports venue is instant, transparent, and enjoyable for athletes of all levels.
//                 </p>

//                 <button className="font-Manrope bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
//                   Join Our Mission
//                 </button>
//               </div>

//               <div>
//                 <img
//                   src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBwcm9mZXNzaW9uYWwlMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NjYxMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
//                   alt="Man in red tank top doing water sports during daytime"
//                   className="w-full h-80 object-cover rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Intersection Observer for animations
//         const observerOptions = {
//           threshold: 0.1,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate content sections
//         const contentSections = document.querySelectorAll('#about .grid');
//         contentSections.forEach((section, index) => {
//           section.style.opacity = '0';
//           section.style.transform = 'translateY(30px)';
//           section.style.transition = 'all 0.6s ease-out';
//           section.style.transitionDelay = `${index * 0.2}s`;
//           observer.observe(section);
//         });

//         // Animate value cards
//         const valueCards = document.querySelectorAll('#about .text-center.p-6');
//         valueCards.forEach((card, index) => {
//           card.style.opacity = '0';
//           card.style.transform = 'translateY(20px)';
//           card.style.transition = 'all 0.5s ease-out';
//           card.style.transitionDelay = `${0.5 + (index * 0.1)}s`;
//           observer.observe(card);
//         });

//         // Animate value icons
//         const valueIcons = document.querySelectorAll('#about .w-16.h-16.rounded-full');
//         valueIcons.forEach((icon, index) => {
//           icon.style.transform = 'scale(0)';
//           icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
//           icon.style.transitionDelay = `${0.7 + (index * 0.15)}s`;

//           const iconObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//               if (entry.isIntersecting) {
//                 entry.target.style.transform = 'scale(1)';
//                 iconObserver.unobserve(entry.target);
//               }
//             });
//           }, { threshold: 0.5 });

//           iconObserver.observe(icon);
//         });

//         // Counter animation for stats
//         const statNumbers = document.querySelectorAll('#about .text-3xl.font-bold.text-primary');
//         const animateCounter = (element, target, suffix = '') => {
//           let current = 0;
//           const increment = target / 50;
//           const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//               current = target;
//               clearInterval(timer);
//             }
//             element.textContent = Math.floor(current) + suffix;
//           }, 30);
//         };

//         const statsObserver = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               const text = entry.target.textContent;
//               if (text.includes('2023')) {
//                 entry.target.textContent = '2023';
//               } else if (text.includes('+')) {
//                 animateCounter(entry.target, 50, '+');
//               }
//               statsObserver.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.5 });

//         statNumbers.forEach(stat => {
//           statsObserver.observe(stat);
//         });

//         // Animate achievement checkmarks
//         const achievements = document.querySelectorAll('#about .flex.items-center');
//         achievements.forEach((achievement, index) => {
//           achievement.style.opacity = '0';
//           achievement.style.transform = 'translateX(-20px)';
//           achievement.style.transition = 'all 0.4s ease-out';
//           achievement.style.transitionDelay = `${1 + (index * 0.1)}s`;
//           observer.observe(achievement);
//         });

//         // Hover effects for value cards
//         valueCards.forEach(card => {
//           card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-5px)';
//             this.style.transition = 'transform 0.3s ease-out';
//           });

//           card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//           });
//         });

//         // Image hover effects
//         const images = document.querySelectorAll('#about img');
//         images.forEach(img => {
//           img.addEventListener('mouseenter', function() {
//             this.style.transform = 'scale(1.05)';
//             this.style.transition = 'transform 0.3s ease-out';
//           });

//           img.addEventListener('mouseleave', function() {
//             this.style.transform = 'scale(1)';
//           });
//         });
//       });
//     </script>
//   </section>
// </div>
// <div id="root">
//   <section id="testimonials" class="py-20 bg-neutral-50 overflow-hidden">
//     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
//       <!-- Section Header -->
//       <div class="text-center">
//         <h2 class="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//           What Our Users Say
//         </h2>
//         <p class="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//           Join thousands of satisfied athletes and venue owners who trust SportVenue for their booking needs
//         </p>
//       </div>
//     </div>

//     <!-- Full-width testimonials carousel -->
//     <div class="w-full relative">
//       <div class="scroller" data-speed="slow">
//         <ul class="tag-list scroller__inner flex gap-6 animate-scroll">
//           <!-- Testimonial 1 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "SportVenue made booking our weekly football matches so easy. No more calling around - just click and play!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">MJ</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Mike Johnson</div>
//                 <div class="font-Inter text-sm text-neutral-600">Team Captain</div>
//               </div>
//             </div>
//           </li>

//           <!-- Testimonial 2 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "As a venue owner, SportVenue has doubled our bookings. The platform is intuitive and the support is excellent."
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">SP</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Sarah Parker</div>
//                 <div class="font-Inter text-sm text-neutral-600">Venue Owner</div>
//               </div>
//             </div>
//           </li>

//           <!-- Testimonial 3 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "Found the perfect tennis court in minutes. The comparison feature saved me both time and money!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">AL</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Alex Lee</div>
//                 <div class="font-Inter text-sm text-neutral-600">Tennis Player</div>
//               </div>
//             </div>
//           </li>

//           <!-- Testimonial 4 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "The instant booking feature is a game-changer. No more waiting for confirmations - just show up and play!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">RK</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Rachel Kim</div>
//                 <div class="font-Inter text-sm text-neutral-600">Basketball Coach</div>
//               </div>
//             </div>
//           </li>

//           <!-- Testimonial 5 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "SportVenue's venue management dashboard is incredible. I can track bookings and revenue in real-time."
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">DM</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">David Martinez</div>
//                 <div class="font-Inter text-sm text-neutral-600">Sports Complex Manager</div>
//               </div>
//             </div>
//           </li>

//           <!-- Testimonial 6 -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "Love how I can see reviews and photos before booking. Makes choosing the right venue so much easier!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">JW</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Jessica Wong</div>
//                 <div class="font-Inter text-sm text-neutral-600">Fitness Enthusiast</div>
//               </div>
//             </div>
//           </li>

//           <!-- Duplicate testimonials for seamless loop -->
//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "SportVenue made booking our weekly football matches so easy. No more calling around - just click and play!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">MJ</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Mike Johnson</div>
//                 <div class="font-Inter text-sm text-neutral-600">Team Captain</div>
//               </div>
//             </div>
//           </li>

//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "As a venue owner, SportVenue has doubled our bookings. The platform is intuitive and the support is excellent."
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">SP</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Sarah Parker</div>
//                 <div class="font-Inter text-sm text-neutral-600">Venue Owner</div>
//               </div>
//             </div>
//           </li>

//           <li class="bg-white rounded-xl p-6 shadow-lg min-w-80 max-w-80 border border-neutral-200">
//             <blockquote class="font-Inter text-neutral-700 mb-4">
//               "Found the perfect tennis court in minutes. The comparison feature saved me both time and money!"
//             </blockquote>
//             <div class="flex items-center">
//               <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
//                 <span class="font-Manrope text-white font-bold">AL</span>
//               </div>
//               <div>
//                 <div class="font-Manrope font-semibold text-neutral-900">Alex Lee</div>
//                 <div class="font-Inter text-sm text-neutral-600">Tennis Player</div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>

//     <!-- Trust indicators -->
//     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//       <div class="text-center">
//         <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out;">
//             <div class="font-Manrope text-3xl font-bold text-primary mb-2">4.9★</div>
//             <div class="font-Inter text-neutral-600 text-sm">Average Rating</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.1s;">
//             <div class="font-Manrope text-3xl font-bold text-primary mb-2">10K+</div>
//             <div class="font-Inter text-neutral-600 text-sm">Reviews</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.2s;">
//             <div class="font-Manrope text-3xl font-bold text-primary mb-2">50K+</div>
//             <div class="font-Inter text-neutral-600 text-sm">Happy Users</div>
//           </div>
//           <div style="opacity: 0; transform: translateY(20px); transition: 0.5s ease-out 0.3s;">
//             <div class="font-Manrope text-3xl font-bold text-primary mb-2">99%</div>
//             <div class="font-Inter text-neutral-600 text-sm">Satisfaction</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <style>
//       @keyframes scroll {
//         0% {
//           transform: translateX(0);
//         }
//         100% {
//           transform: translateX(-50%);
//         }
//       }

//       .animate-scroll {
//         animation: scroll 30s linear infinite;
//       }

//       .scroller:hover .animate-scroll {
//         animation-play-state: paused;
//       }

//       .scroller {
//         mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
//         -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
//       }
//     </style>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Intersection Observer for trust indicators
//         const observerOptions = {
//           threshold: 0.5,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate trust indicators
//         const trustIndicators = document.querySelectorAll('#testimonials .grid > div');
//         trustIndicators.forEach((indicator, index) => {
//           indicator.style.opacity = '0';
//           indicator.style.transform = 'translateY(20px)';
//           indicator.style.transition = 'all 0.5s ease-out';
//           indicator.style.transitionDelay = `${index * 0.1}s`;
//           observer.observe(indicator);
//         });

//         // Counter animation for stats
//         const statNumbers = document.querySelectorAll('#testimonials .text-3xl.font-bold.text-primary');
//         const animateCounter = (element, target, suffix = '') => {
//           let current = 0;
//           const increment = target / 50;
//           const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//               current = target;
//               clearInterval(timer);
//             }

//             if (suffix === '★') {
//               element.textContent = current.toFixed(1) + suffix;
//             } else if (suffix === '%') {
//               element.textContent = Math.floor(current) + suffix;
//             } else {
//               element.textContent = Math.floor(current) + suffix;
//             }
//           }, 30);
//         };

//         const statsObserver = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               const text = entry.target.textContent;
//               if (text.includes('★')) {
//                 animateCounter(entry.target, 4.9, '★');
//               } else if (text.includes('10K+')) {
//                 animateCounter(entry.target, 10, 'K+');
//               } else if (text.includes('50K+')) {
//                 animateCounter(entry.target, 50, 'K+');
//               } else if (text.includes('%')) {
//                 animateCounter(entry.target, 99, '%');
//               }
//               statsObserver.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.5 });

//         statNumbers.forEach(stat => {
//           statsObserver.observe(stat);
//         });

//         // Add hover effects to testimonial cards
//         const testimonialCards = document.querySelectorAll('#testimonials li');
//         testimonialCards.forEach(card => {
//           card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-5px)';
//             this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
//             this.style.transition = 'all 0.3s ease-out';
//           });

//           card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//             this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
//           });
//         });
//       });
//     </script>
//   </section>
// </div>
// <div id="root">
//   <section id="cta" class="relative py-20 overflow-hidden">
//     <!-- Background Image -->
//     <div class="absolute inset-0 z-0">
//       <img src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYWN0aW9uJTI1MjBkeW5hbWljJTI1MjBtb2Rlcm4lMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NjYxNDQzfDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Perfectly timed shot while a man is about to lift the shuttle" class="w-full h-full object-cover">
//       <div class="absolute inset-0 bg-neutral-900 bg-opacity-75"></div>
//     </div>

//     <!-- CTA Content -->
//     <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div class="text-center" style="opacity: 0; transform: translateY(30px); transition: 1s ease-out;">
//         <!-- Main Headline -->
//         <h2 class="font-Manrope text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//           Ready to Transform Your
//           <span class="text-primary block mt-2">Sports Experience?</span>
//         </h2>

//         <!-- Subheadline -->
//         <p class="font-Inter text-xl sm:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto leading-relaxed">
//           Join thousands of athletes and venue owners who've revolutionized their sports booking experience. Start your journey today.
//         </p>

//         <!-- CTA Buttons -->
//         <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
//           <button class="font-Manrope bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl">
//             Book Your Venue Now
//           </button>
//           <button class="font-Manrope border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-10 py-5 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105">
//             List Your Venue
//           </button>
//         </div>

//         <!-- Urgency & Social Proof -->
//         <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//           <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20" style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 0.8s;">
//             <div class="text-3xl mb-3">🚀</div>
//             <h3 class="font-Manrope text-white font-bold text-lg mb-2">Launch Special</h3>
//             <p class="font-Inter text-neutral-200 text-sm">50% off first booking for new users</p>
//           </div>

//           <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20" style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 1s;">
//             <div class="text-3xl mb-3">⏰</div>
//             <h3 class="font-Manrope text-white font-bold text-lg mb-2">Limited Time</h3>
//             <p class="font-Inter text-neutral-200 text-sm">Free venue listing for first 100 owners</p>
//           </div>

//           <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20" style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 1.2s;">
//             <div class="text-3xl mb-3">🎯</div>
//             <h3 class="font-Manrope text-white font-bold text-lg mb-2">Instant Access</h3>
//             <p class="font-Inter text-neutral-200 text-sm">Start booking immediately after signup</p>
//           </div>
//         </div>

//         <!-- Trust Indicators -->
//         <div class="mt-16 pt-8 border-t border-white border-opacity-20">
//           <p class="font-Inter text-neutral-300 mb-6">Trusted by leading sports facilities and athletes</p>
//           <div class="flex flex-wrap justify-center items-center gap-8 text-white text-opacity-60" style="opacity: 0; transform: translateY(20px); transition: 0.8s ease-out 1.5s;">
//             <div class="font-Manrope text-lg font-semibold">1000+ Venues</div>
//             <div class="w-1 h-1 bg-white rounded-full"></div>
//             <div class="font-Manrope text-lg font-semibold">50K+ Users</div>
//             <div class="w-1 h-1 bg-white rounded-full"></div>
//             <div class="font-Manrope text-lg font-semibold">4.9★ Rating</div>
//             <div class="w-1 h-1 bg-white rounded-full"></div>
//             <div class="font-Manrope text-lg font-semibold">24/7 Support</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <!-- Floating Action Elements -->
//     <div class="absolute top-20 left-10 animate-bounce">
//       <div class="w-4 h-4 bg-primary rounded-full opacity-60"></div>
//     </div>
//     <div class="absolute top-40 right-20 animate-pulse">
//       <div class="w-6 h-6 bg-secondary rounded-full opacity-40"></div>
//     </div>
//     <div class="absolute bottom-32 left-20 animate-bounce" style="animation-delay: 1s;">
//       <div class="w-3 h-3 bg-accent rounded-full opacity-50"></div>
//     </div>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Parallax effect for background
//         window.addEventListener('scroll', function() {
//           const scrolled = window.pageYOffset;
//           const ctaSection = document.querySelector('#cta');
//           const ctaImage = ctaSection.querySelector('img');
//           const ctaRect = ctaSection.getBoundingClientRect();

//           if (ctaRect.top < window.innerHeight && ctaRect.bottom > 0) {
//             const parallaxSpeed = 0.5;
//             ctaImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
//           }
//         });

//         // Intersection Observer for animations
//         const observerOptions = {
//           threshold: 0.2,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate main content
//         const ctaContent = document.querySelector('#cta .text-center');
//         ctaContent.style.opacity = '0';
//         ctaContent.style.transform = 'translateY(30px)';
//         ctaContent.style.transition = 'all 1s ease-out';
//         observer.observe(ctaContent);

//         // Animate feature cards
//         const featureCards = document.querySelectorAll('#cta .grid > div');
//         featureCards.forEach((card, index) => {
//           card.style.opacity = '0';
//           card.style.transform = 'translateY(20px)';
//           card.style.transition = 'all 0.6s ease-out';
//           card.style.transitionDelay = `${0.8 + (index * 0.2)}s`;
//           observer.observe(card);
//         });

//         // Button hover effects
//         const buttons = document.querySelectorAll('#cta button');
//         buttons.forEach(button => {
//           button.addEventListener('mouseenter', function() {
//             this.style.transform = 'scale(1.05) translateY(-2px)';
//             this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
//           });

//           button.addEventListener('mouseleave', function() {
//             this.style.transform = 'scale(1) translateY(0)';
//             this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
//           });
//         });

//         // Feature card hover effects
//         featureCards.forEach(card => {
//           card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-5px) scale(1.02)';
//             this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
//             this.style.transition = 'all 0.3s ease-out';
//           });

//           card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0) scale(1)';
//             this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//           });
//         });

//         // Countdown timer effect (optional enhancement)
//         const urgencyElements = document.querySelectorAll('#cta .text-3xl');
//         urgencyElements.forEach(element => {
//           element.addEventListener('mouseenter', function() {
//             this.style.transform = 'scale(1.2) rotate(10deg)';
//             this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
//           });

//           element.addEventListener('mouseleave', function() {
//             this.style.transform = 'scale(1) rotate(0deg)';
//           });
//         });

//         // Trust indicators animation
//         const trustIndicators = document.querySelector('#cta .flex.flex-wrap');
//         trustIndicators.style.opacity = '0';
//         trustIndicators.style.transform = 'translateY(20px)';
//         trustIndicators.style.transition = 'all 0.8s ease-out';
//         trustIndicators.style.transitionDelay = '1.5s';
//         observer.observe(trustIndicators);

//         // Add pulsing effect to floating elements
//         const floatingElements = document.querySelectorAll('#cta .absolute > div');
//         floatingElements.forEach((element, index) => {
//           setTimeout(() => {
//             element.style.animation += ', pulse 2s infinite';
//           }, index * 500);
//         });
//       });
//     </script>
//   </section>
// </div>
// <div id="root">
//   <section id="contact" class="py-20 bg-white">
//     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <!-- Section Header -->
//       <div class="text-center mb-16">
//         <h2 class="font-Manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
//           Contact
//         </h2>
//         <p class="font-Inter text-xl text-neutral-600 max-w-3xl mx-auto">
//           Have questions? We're here to help. Reach out to our team for support, partnerships, or general inquiries.
//         </p>
//       </div>

//       <!-- Contact Content -->
//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-16" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out;">
//         <!-- Contact Form -->
//         <div>
//           <h3 class="font-Manrope text-2xl font-bold text-neutral-900 mb-6">Get In Touch</h3>
//           <form id="contact-form" class="space-y-6">
//             <div class="grid grid-cols-1 sm:grid-cols-2 gap-6" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.2s;">
//               <div>
//                 <label for="firstName" class="font-Inter block text-sm font-medium text-neutral-700 mb-2">First Name</label>
//                 <input type="text" id="firstName" name="firstName" required="" class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="John">
//               </div>
//               <div>
//                 <label for="lastName" class="font-Inter block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
//                 <input type="text" id="lastName" name="lastName" required="" class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="Doe">
//               </div>
//             </div>

//             <div>
//               <label for="email" class="font-Inter block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
//               <input type="email" id="email" name="email" required="" class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="john@example.com">
//             </div>

//             <div>
//               <label for="subject" class="font-Inter block text-sm font-medium text-neutral-700 mb-2">Subject</label>
//               <select id="subject" name="subject" required="" class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
//                 <option value="">Select a subject</option>
//                 <option value="general">General Inquiry</option>
//                 <option value="support">Technical Support</option>
//                 <option value="partnership">Partnership</option>
//                 <option value="venue-listing">Venue Listing</option>
//                 <option value="billing">Billing Question</option>
//               </select>
//             </div>

//             <div>
//               <label for="message" class="font-Inter block text-sm font-medium text-neutral-700 mb-2">Message</label>
//               <textarea id="message" name="message" rows="5" required="" class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none" placeholder="Tell us how we can help you..."></textarea>
//             </div>

//             <button type="submit" class="font-Manrope w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
//               Send Message
//             </button>
//           </form>
//         </div>

//         <!-- Contact Information & Images -->
//         <div class="space-y-8">
//           <!-- Customer Service Image -->
//           <div>
//             <img src="https://images.unsplash.com/photo-1517702087178-fa967a8e8169?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8Y3VzdG9tZXIlMjUyMHNlcnZpY2UlMjUyMHJlcHJlc2VudGF0aXZlJTI1MjBwcm9mZXNzaW9uYWwlMjUyMHdlbGNvbWluZyUyNTIwYnJpZ2h0fGVufDF8fHx8MTc0OTY2MTQ5M3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Group of people standing in front of food stall counter" class="w-full h-64 object-cover rounded-lg shadow-lg">
//           </div>

//           <!-- Contact Information -->
//           <div class="bg-neutral-50 rounded-lg p-8" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.4s;">
//             <h4 class="font-Manrope text-xl font-bold text-neutral-900 mb-6">Contact Information</h4>
//             <div class="space-y-4" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.6s;">
//               <div class="flex items-center">
//                 <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
//                   <span class="text-white text-lg">📧</span>
//                 </div>
//                 <div>
//                   <div class="font-Inter font-medium text-neutral-900">Email</div>
//                   <div class="font-Inter text-neutral-600">support@sportvenue.com</div>
//                 </div>
//               </div>

//               <div class="flex items-center">
//                 <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-4">
//                   <span class="text-white text-lg">📞</span>
//                 </div>
//                 <div>
//                   <div class="font-Inter font-medium text-neutral-900">Phone</div>
//                   <div class="font-Inter text-neutral-600">+1 (555) 123-4567</div>
//                 </div>
//               </div>

//               <div class="flex items-center">
//                 <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-4">
//                   <span class="text-white text-lg">📍</span>
//                 </div>
//                 <div>
//                   <div class="font-Inter font-medium text-neutral-900">Address</div>
//                   <div class="font-Inter text-neutral-600">123 Sports Ave, Athletic City, AC 12345</div>
//                 </div>
//               </div>

//               <div class="flex items-center">
//                 <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
//                   <span class="text-white text-lg">🕒</span>
//                 </div>
//                 <div>
//                   <div class="font-Inter font-medium text-neutral-900">Support Hours</div>
//                   <div class="font-Inter text-neutral-600">24/7 Online Support</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <!-- Support Image -->
//           <div>
//             <img src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8Y3VzdG9tZXIlMjUyMHNlcnZpY2UlMjUyMHJlcHJlc2VudGF0aXZlJTI1MjBwcm9mZXNzaW9uYWwlMjUyMHdlbGNvbWluZyUyNTIwYnJpZ2h0fGVufDF8fHx8MTc0OTY2MTQ5M3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Gray computer monitor" class="w-full h-48 object-cover rounded-lg shadow-lg">
//           </div>
//         </div>
//       </div>

//       <!-- FAQ Section -->
//       <div class="mt-20">
//         <h3 class="font-Manrope text-2xl font-bold text-neutral-900 text-center mb-12">Frequently Asked Questions</h3>
//         <div class="max-w-4xl mx-auto space-y-4" style="opacity: 0; transform: translateY(30px); transition: 0.6s ease-out 0.8s;">
//           <div class="border border-neutral-200 rounded-lg">
//             <button class="faq-button w-full px-6 py-4 text-left font-Inter font-medium text-neutral-900 hover:bg-neutral-50 transition-colors duration-300 flex justify-between items-center" data-faq="faq1">
//               How do I book a sports venue?
//               <span class="faq-icon text-primary text-xl">+</span>
//             </button>
//             <div id="faq1" class="faq-content hidden px-6 pb-4">
//               <p class="font-Inter text-neutral-600">Simply search for venues in your area, compare options, select your preferred time slot, and complete the booking with secure payment. You'll receive instant confirmation.</p>
//             </div>
//           </div>

//           <div class="border border-neutral-200 rounded-lg">
//             <button class="faq-button w-full px-6 py-4 text-left font-Inter font-medium text-neutral-900 hover:bg-neutral-50 transition-colors duration-300 flex justify-between items-center" data-faq="faq2">
//               Can I cancel or modify my booking?
//               <span class="faq-icon text-primary text-xl">+</span>
//             </button>
//             <div id="faq2" class="faq-content hidden px-6 pb-4">
//               <p class="font-Inter text-neutral-600">Yes, you can cancel or modify bookings up to 24 hours before your scheduled time. Check our cancellation policy for specific terms and refund details.</p>
//             </div>
//           </div>

//           <div class="border border-neutral-200 rounded-lg">
//             <button class="faq-button w-full px-6 py-4 text-left font-Inter font-medium text-neutral-900 hover:bg-neutral-50 transition-colors duration-300 flex justify-between items-center" data-faq="faq3">
//               How do I list my venue on SportVenue?
//               <span class="faq-icon text-primary text-xl">+</span>
//             </button>
//             <div id="faq3" class="faq-content hidden px-6 pb-4">
//               <p class="font-Inter text-neutral-600">Click "List Your Venue" and complete our simple onboarding process. Upload photos, set your pricing, and start receiving bookings within 24 hours of approval.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <!-- Success Modal -->
//     <div id="success-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4" aria-modal="true" aria-hidden="true">
//       <div class="bg-white rounded-lg p-8 max-w-md w-full transform scale-95 transition-all duration-300">
//         <div class="text-center">
//           <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <span class="text-white text-2xl">✓</span>
//           </div>
//           <h3 class="font-Manrope text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
//           <p class="font-Inter text-neutral-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
//           <button id="close-modal" class="font-Manrope bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
//             Close
//           </button>
//         </div>
//         <button id="modal-close-x" class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-2xl" aria-label="Close modal">
//           ×
//         </button>
//       </div>
//     </div>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Form submission
//         const contactForm = document.getElementById('contact-form');
//         const successModal = document.getElementById('success-modal');
//         const closeModalBtn = document.getElementById('close-modal');
//         const modalCloseX = document.getElementById('modal-close-x');

//         contactForm.addEventListener('submit', function(e) {
//           e.preventDefault();

//           // Show success modal
//           successModal.classList.remove('hidden');
//           successModal.setAttribute('aria-hidden', 'false');
//           document.body.style.overflow = 'hidden';

//           // Focus trap
//           closeModalBtn.focus();

//           // Reset form
//           contactForm.reset();

//           // Animation
//           setTimeout(() => {
//             successModal.querySelector('.bg-white').style.transform = 'scale(1)';
//           }, 10);
//         });

//         // Close modal functions
//         function closeModal() {
//           successModal.querySelector('.bg-white').style.transform = 'scale(0.95)';
//           setTimeout(() => {
//             successModal.classList.add('hidden');
//             successModal.setAttribute('aria-hidden', 'true');
//             document.body.style.overflow = '';
//           }, 300);
//         }

//         closeModalBtn.addEventListener('click', closeModal);
//         modalCloseX.addEventListener('click', closeModal);

//         // Close modal on background click
//         successModal.addEventListener('click', function(e) {
//           if (e.target === successModal) {
//             closeModal();
//           }
//         });

//         // Close modal on ESC key
//         document.addEventListener('keydown', function(e) {
//           if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
//             closeModal();
//           }
//         });

//         // FAQ functionality
//         const faqButtons = document.querySelectorAll('.faq-button');

//         faqButtons.forEach(button => {
//           button.addEventListener('click', function() {
//             const faqId = this.getAttribute('data-faq');
//             const faqContent = document.getElementById(faqId);
//             const faqIcon = this.querySelector('.faq-icon');

//             // Close all other FAQs
//             faqButtons.forEach(otherButton => {
//               if (otherButton !== this) {
//                 const otherFaqId = otherButton.getAttribute('data-faq');
//                 const otherFaqContent = document.getElementById(otherFaqId);
//                 const otherFaqIcon = otherButton.querySelector('.faq-icon');

//                 otherFaqContent.classList.add('hidden');
//                 otherFaqIcon.textContent = '+';
//                 otherButton.setAttribute('aria-expanded', 'false');
//               }
//             });

//             // Toggle current FAQ
//             if (faqContent.classList.contains('hidden')) {
//               faqContent.classList.remove('hidden');
//               faqIcon.textContent = '−';
//               this.setAttribute('aria-expanded', 'true');
//             } else {
//               faqContent.classList.add('hidden');
//               faqIcon.textContent = '+';
//               this.setAttribute('aria-expanded', 'false');
//             }
//           });
//         });

//         // Form validation and styling
//         const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');

//         formInputs.forEach(input => {
//           input.addEventListener('focus', function() {
//             this.style.borderColor = '#059669';
//             this.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
//           });

//           input.addEventListener('blur', function() {
//             if (this.value.trim() === '') {
//               this.style.borderColor = '#d1d5db';
//               this.style.boxShadow = 'none';
//             } else {
//               this.style.borderColor = '#10b981';
//             }
//           });
//         });

//         // Intersection Observer for animations
//         const observerOptions = {
//           threshold: 0.1,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate sections
//         const animatedElements = document.querySelectorAll('#contact .grid, #contact .bg-neutral-50, #contact .space-y-4');
//         animatedElements.forEach((element, index) => {
//           element.style.opacity = '0';
//           element.style.transform = 'translateY(30px)';
//           element.style.transition = 'all 0.6s ease-out';
//           element.style.transitionDelay = `${index * 0.2}s`;
//           observer.observe(element);
//         });
//       });
//     </script>
//   </section>
// </div>
// <div id="root">
//   <footer id="footer" class="bg-neutral-900 text-white py-16">
//     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <!-- Main Footer Content -->
//       <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
//         <!-- Company Info & Logo -->
//         <div class="lg:col-span-1" style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out;">
//           <div class="mb-6">
//             <span class="font-Manrope text-2xl font-bold text-white">SportVenue</span>
//           </div>
//           <p class="font-Inter text-neutral-300 mb-6 leading-relaxed">
//             Revolutionizing sports venue booking with technology, passion, and a commitment to connecting athletes with perfect facilities.
//           </p>

//           <!-- Sports Images Gallery -->
//           <div class="grid grid-cols-3 gap-2 mb-6">
//             <img src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwbG9nbyUyNTIwbWluaW1hbGlzdCUyNTIwdmVjdG9yfGVufDF8fHx8MTc0OTY2MTU2Mnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Perfectly timed shot while a man is about to lift the shuttle" class="w-full h-16 object-cover rounded">
//             <img src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwbG9nbyUyNTIwbWluaW1hbGlzdCUyNTIwdmVjdG9yfGVufDF8fHx8MTc0OTY2MTU2Mnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Football player preparing for the match" class="w-full h-16 object-cover rounded">
//             <img src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwbG9nbyUyNTIwbWluaW1hbGlzdCUyNTIwdmVjdG9yfGVufDF8fHx8MTc0OTY2MTU2Mnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080" alt="Man in red tank top doing water sports during daytime" class="w-full h-16 object-cover rounded">
//           </div>

//           <!-- Social Media Links -->
//           <div class="flex space-x-4">
//             <a href="#" class="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
//               <span class="text-sm">f</span>
//             </a>
//             <a href="#" class="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
//               <span class="text-sm">t</span>
//             </a>
//             <a href="#" class="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
//               <span class="text-sm">in</span>
//             </a>
//             <a href="#" class="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
//               <span class="text-sm">ig</span>
//             </a>
//           </div>
//         </div>

//         <!-- Quick Links -->
//         <div style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 0.1s;">
//           <h3 class="font-Manrope text-lg font-bold text-white mb-6">Quick Links</h3>
//           <ul class="space-y-3">
//                 <li>
//                   <a href="#hero" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Home</a>
//                 </li>
//                 <li>
//                   <a href="#features" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Features</a>
//                 </li>
//                 <li>
//                   <a href="#how-it-works" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">How It Works</a>
//                 </li>
//                 <li>
//                   <a href="#about" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">About Us</a>
//                 </li>
//                 <li>
//                   <a href="#contact" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Contact</a>
//                 </li>
//           </ul>
//         </div>

//         <!-- Services -->
//         <div style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 0.2s;">
//           <h3 class="font-Manrope text-lg font-bold text-white mb-6">Services</h3>
//           <ul class="space-y-3">
//             <li>
//               <a href="#" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Venue Booking</a>
//             </li>
//             <li>
//               <a href="#" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Venue Management</a>
//             </li>
//             <li>
//               <a href="#" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Event Planning</a>
//             </li>
//             <li>
//               <a href="#" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Equipment Rental</a>
//             </li>
//             <li>
//               <a href="#" class="font-Inter text-neutral-300 hover:text-primary transition-colors duration-300">Team Management</a>
//             </li>
//           </ul>
//         </div>

//         <!-- Contact & Newsletter -->
//         <div style="opacity: 0; transform: translateY(20px); transition: 0.6s ease-out 0.3s;">
//           <h3 class="font-Manrope text-lg font-bold text-white mb-6">Stay Connected</h3>
//           <div class="space-y-4 mb-6">
//             <div class="flex items-center">
//               <span class="text-primary mr-3">📧</span>
//               <span class="font-Inter text-neutral-300 text-sm">support@sportvenue.com</span>
//             </div>
//             <div class="flex items-center">
//               <span class="text-primary mr-3">📞</span>
//               <span class="font-Inter text-neutral-300 text-sm">+1 (555) 123-4567</span>
//             </div>
//             <div class="flex items-center">
//               <span class="text-primary mr-3">📍</span>
//               <span class="font-Inter text-neutral-300 text-sm">123 Sports Ave, Athletic City</span>
//             </div>
//           </div>

//           <!-- Newsletter Signup -->
//           <div>
//             <h4 class="font-Manrope text-sm font-semibold text-white mb-3">Newsletter</h4>
//             <form class="flex">
//               <input type="email" placeholder="Your email" class="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-primary">
//               <button type="submit" class="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-r-lg text-sm font-semibold transition-colors duration-300">
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <!-- Bottom Footer -->
//       <div class="border-t border-neutral-800 pt-8">
//         <div class="flex flex-col md:flex-row justify-between items-center">
//           <div class="font-Inter text-neutral-400 text-sm mb-4 md:mb-0">
//             © 2024 SportVenue. All rights reserved.
//           </div>

//           <!-- Legal Links -->
//           <div class="flex space-x-6">
//                 <a href="#privacy" class="font-Inter text-neutral-400 hover:text-primary text-sm transition-colors duration-300">Privacy Policy</a>
//                 <a href="#terms" class="font-Inter text-neutral-400 hover:text-primary text-sm transition-colors duration-300">Terms of Service</a>
//           </div>
//         </div>

//         <!-- Trust Badges -->
//         <div class="flex justify-center items-center mt-8 space-x-8">
//           <div class="text-center" style="opacity: 0; transform: translateY(10px); transition: 0.4s ease-out 0.8s;">
//             <div class="font-Manrope text-primary font-bold text-lg">1000+</div>
//             <div class="font-Inter text-neutral-400 text-xs">Venues</div>
//           </div>
//           <div class="text-center" style="opacity: 0; transform: translateY(10px); transition: 0.4s ease-out 0.9s;">
//             <div class="font-Manrope text-primary font-bold text-lg">50K+</div>
//             <div class="font-Inter text-neutral-400 text-xs">Users</div>
//           </div>
//           <div class="text-center" style="opacity: 0; transform: translateY(10px); transition: 0.4s ease-out 1s;">
//             <div class="font-Manrope text-primary font-bold text-lg">4.9★</div>
//             <div class="font-Inter text-neutral-400 text-xs">Rating</div>
//           </div>
//           <div class="text-center" style="opacity: 0; transform: translateY(10px); transition: 0.4s ease-out 1.1s;">
//             <div class="font-Manrope text-primary font-bold text-lg">24/7</div>
//             <div class="font-Inter text-neutral-400 text-xs">Support</div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         // Newsletter form submission
//         const newsletterForm = document.querySelector('#footer form');
//         const emailInput = newsletterForm.querySelector('input[type="email"]');

//         newsletterForm.addEventListener('submit', function(e) {
//           e.preventDefault();

//           if (emailInput.value.trim() !== '') {
//             // Show success message
//             const button = this.querySelector('button');
//             const originalText = button.textContent;

//             button.textContent = 'Subscribed!';
//             button.style.backgroundColor = '#10b981';

//             setTimeout(() => {
//               button.textContent = originalText;
//               button.style.backgroundColor = '';
//               emailInput.value = '';
//             }, 2000);
//           }
//         });

//         // Smooth scroll for footer links
//         document.querySelectorAll('#footer a[href^="#"]').forEach(anchor => {
//           anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             const target = document.querySelector(this.getAttribute('href'));
//             if (target) {
//               const headerHeight = document.querySelector('header').offsetHeight;
//               const targetPosition = target.offsetTop - headerHeight;

//               window.scrollTo({
//                 top: targetPosition,
//                 behavior: 'smooth'
//               });
//             }
//           });
//         });

//         // Intersection Observer for footer animations
//         const observerOptions = {
//           threshold: 0.1,
//           rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               entry.target.style.opacity = '1';
//               entry.target.style.transform = 'translateY(0)';
//             }
//           });
//         }, observerOptions);

//         // Animate footer sections
//         const footerSections = document.querySelectorAll('#footer .grid > div');
//         footerSections.forEach((section, index) => {
//           section.style.opacity = '0';
//           section.style.transform = 'translateY(20px)';
//           section.style.transition = 'all 0.6s ease-out';
//           section.style.transitionDelay = `${index * 0.1}s`;
//           observer.observe(section);
//         });

//         // Animate trust badges
//         const trustBadges = document.querySelectorAll('#footer .flex.justify-center.items-center.mt-8 > div');
//         trustBadges.forEach((badge, index) => {
//           badge.style.opacity = '0';
//           badge.style.transform = 'translateY(10px)';
//           badge.style.transition = 'all 0.4s ease-out';
//           badge.style.transitionDelay = `${0.8 + (index * 0.1)}s`;
//           observer.observe(badge);
//         });

//         // Social media hover effects
//         const socialLinks = document.querySelectorAll('#footer .flex.space-x-4 a');
//         socialLinks.forEach(link => {
//           link.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-2px) scale(1.1)';
//             this.style.transition = 'transform 0.3s ease-out';
//           });

//           link.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0) scale(1)';
//           });
//         });

//         // Image hover effects
//         const footerImages = document.querySelectorAll('#footer img');
//         footerImages.forEach(img => {
//           img.addEventListener('mouseenter', function() {
//             this.style.transform = 'scale(1.05)';
//             this.style.transition = 'transform 0.3s ease-out';
//           });

//           img.addEventListener('mouseleave', function() {
//             this.style.transform = 'scale(1)';
//           });
//         });

//         // Counter animation for trust badges
//         const animateCounter = (element, target, suffix = '') => {
//           let current = 0;
//           const increment = target / 30;
//           const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//               current = target;
//               clearInterval(timer);
//             }

//             if (suffix === '★') {
//               element.textContent = current.toFixed(1) + suffix;
//             } else if (suffix === '+') {
//               element.textContent = Math.floor(current) + suffix;
//             } else {
//               element.textContent = Math.floor(current) + suffix;
//             }
//           }, 50);
//         };

//         const badgeObserver = new IntersectionObserver((entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               const numberElement = entry.target.querySelector('.text-primary');
//               const text = numberElement.textContent;

//               if (text.includes('1000+')) {
//                 animateCounter(numberElement, 1000, '+');
//               } else if (text.includes('50K+')) {
//                 animateCounter(numberElement, 50, 'K+');
//               } else if (text.includes('4.9★')) {
//                 animateCounter(numberElement, 4.9, '★');
//               } else if (text.includes('24/7')) {
//                 numberElement.textContent = '24/7';
//               }

//               badgeObserver.unobserve(entry.target);
//             }
//           });
//         }, { threshold: 0.5 });

//         trustBadges.forEach(badge => {
//           badgeObserver.observe(badge);
//         });
//       });
//     </script>
//   </footer>
// </div></div></mountpoint>
//       </main>
