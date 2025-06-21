"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

const New = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuBtnOpen, setIsMobileMenuBtnOpen] = useState(false);
  const router = useRouter();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileMenuBtn = () => {
    setIsMobileMenuBtnOpen(!isMobileMenuBtnOpen);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
    setIsMobileMenuBtnOpen(false);
  };

  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".absolute");
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      (element as HTMLElement).style.transform = `translateY(${
        scrolled * speed
      }px)`;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const heroContent = document.querySelector("#hero .space-y-8");
    if (heroContent) {
      heroContent.classList.add("opacity-0", "translate-y-8");
      setTimeout(() => {
        heroContent.classList.add("opacity-100", "translate-y-0");
        heroContent.classList.remove("opacity-0", "translate-y-8");
      }, 300);
    }
  }, []);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll("#features .group, #features .bg-white")
      .forEach((card) => {
        observer.observe(card);
      });

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateCounter = (
    element: HTMLElement,
    target: number,
    suffix = ""
  ) => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 25);
  };

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll(".text-3xl");
            statElements.forEach((stat) => {
              const text = stat.textContent?.trim() || "";
              if (text.includes("%")) {
                const number = parseFloat(text);
                stat.textContent = "0%";
                animateCounter(stat as HTMLElement, number, "%");
              } else if (text.includes("₹")) {
                const number = parseInt(text.replace("₹", ""));
                stat.textContent = "₹0";
                animateCounter(stat as HTMLElement, number, "");
                stat.textContent = "₹" + Math.floor(number);
              }
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll("#benefits .bg-gradient-to-r")
      .forEach((section) => {
        if (section.querySelector(".text-2xl")) {
          statsObserver.observe(section);
        }
      });

    return () => {
      statsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-up");
            }, index * 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("#how-it-works .group").forEach((step) => {
      stepObserver.observe(step);
    });

    return () => {
      stepObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const testimonials = document.querySelectorAll("#benefits .bg-white\\/10");
    let currentTestimonial = 0;

    const rotateTestimonials = () => {
      testimonials.forEach((testimonial, index) => {
        if (testimonial instanceof HTMLElement) {
          testimonial.style.opacity =
            index === currentTestimonial ? "1" : "0.7";
          testimonial.style.transform =
            index === currentTestimonial ? "scale(1.05)" : "scale(1)";
        }
      });
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    };

    const interval = setInterval(rotateTestimonials, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main id="main-content" className="flex-1 relative h-full">
      <div id="RolloutPageContent">
        <div id="root">
          {/* <header
            id="header"
            className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                  <span className="font-Manrope text-2xl font-bold text-primary">
                    SportVenue
                  </span>
                </div>
                <div className="hidden md:flex space-x-8">
                  <a
                    href="#hero"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="#features"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    How It Works
                  </a>
                  <a
                    href="#benefits"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Benefits
                  </a>
                  <a
                    href="#testimonials"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Pricing
                  </a>
                  <a
                    href="#cta"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Contact
                  </a>
                </div>
                <div className="md:hidden">
                  <button
                    id="mobile-menu-button"
                    type="button"
                    className="text-neutral-700 hover:text-primary focus:outline-none focus:text-primary transition-colors duration-300"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                    onClick={toggleMobileMenu}
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          isMobileMenuOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16M4 18h16"
                        }
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="mobile-menu"
                ref={mobileMenuRef}
                className={`md:hidden ${
                  isMobileMenuOpen ? "" : "hidden"
                } border-t border-gray-200 mt-2 pt-4 pb-4`}
              >
                <div className="flex flex-col space-y-4">

                  <a
                    href="#hero"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#hero")}
                  >
                    Home
                  </a>
                  <a
                    href="#features"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#features")}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                  >
                    How It Works
                  </a>
                  <a
                    href="#benefits"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#benefits")}
                  >
                    Benefits
                  </a>
                  <a
                    href="#testimonials"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#testimonials")}
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#pricing")}
                  >
                    Pricing
                  </a>
                  <a
                    href="#cta"
                    className="font-Manrope text-neutral-700 hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                    onClick={(e) => handleSmoothScroll(e, "#cta")}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
          </header> */}
          <section
            id="hero"
            className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden bg-[url('https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBwcm9mZXNzaW9uYWwlMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NDYwNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-transparent"></div>
            {/* <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBwcm9mZXNzaW9uYWwlMjUyMGJyaWdodHxlbnwxfDB8fHwxNzQ5NDYwNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern sports venue"
                className="w-full h-full object-cover"
              />
            </div> */}
            <div className="absolute inset-0 overflow-hidden w-full h-full">
              <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400/10 rounded-full animate-bounce"></div>
              <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-indigo-400/15 rounded-full animate-ping"></div>
            </div>
            <nav className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">SportVenue</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#hero"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#benefits"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Benefits
                </a>
                <a
                  href="#venues"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Venues
                </a>
                <a
                  href="#pricing"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Pricing
                </a>

                <a
                  href="#contact"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Get Started
                </button>
              </div>
              <button
                className="md:hidden text-white p-2"
                id="mobile-menu-btn"
                ref={mobileMenuBtnRef}
                onClick={toggleMobileMenuBtn}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMobileMenuBtnOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  ></path>
                </svg>
              </button>
            </nav>
            <div
              id="mobile-menu"
              className={`md:hidden ${
                isMobileMenuBtnOpen ? "" : "hidden"
              } absolute top-16 left-0 right-0 bg-blue-900/95 backdrop-blur-sm z-30 mx-4 rounded-lg`}
            >
              <div className="flex flex-col space-y-4 p-6">
                <a
                  href="#hero"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#benefits"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Benefits
                </a>
                <a
                  href="#venues"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Venues
                </a>
                <a
                  href="#pricing"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Pricing
                </a>

                <a
                  href="#contact"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <button
                  onClick={() => router.push("/login")}
                  className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-12">
              <div className="max-w-7xl mx-auto flex  gap-12 items-center">
                <div className="text-white space-y-8 ">
                  <div className="space-y-4">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Live Venue Availability
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      Book Sports
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        Venues
                      </span>
                      Instantly
                    </h1>
                    <p className="text-xl text-white/80 max-w-lg">
                      Compare prices, check availability, and book your perfect
                      sports venue in seconds.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                      Find Venues Near You
                    </button>
                    <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                      List Your Venue
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">500+</div>
                      <div className="text-white/70 text-sm">Venues Listed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">10K+</div>
                      <div className="text-white/70 text-sm">
                        Happy Customers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">50+</div>
                      <div className="text-white/70 text-sm">
                        Cities Covered
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 flex flex-col max-w-lg items-end">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Instant Booking
                      </h3>
                    </div>
                    <p className="text-white/80">
                      Book venues instantly with real-time availability and
                      instant confirmation.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Compare Venues
                      </h3>
                    </div>
                    <p className="text-white/80">
                      Compare prices, amenities, and reviews to find the perfect
                      venue for your needs.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Easy Management
                      </h3>
                    </div>
                    <p className="text-white/80">
                      Venue owners can easily list and manage their facilities
                      with our intuitive dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </section>
          <section
            id="features"
            className="py-20 bg-gradient-to-b from-gray-50 to-white"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  Platform Features
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Everything You Need to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Book & Manage
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover powerful features that make venue booking effortless
                  for customers and profitable for owners.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                <div className="group animate-fade-in-up">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in-up">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBpbnRlcmZhY2V8ZW58MXwwfHx8MTc0OTQ2MDkzMXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                        alt="Badminton player in action"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Real-time Availability
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Instant Booking
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Book your favorite sports venues instantly with
                        real-time availability updates and immediate
                        confirmation.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Live slot availability
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Instant confirmation
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Secure payment gateway
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="group animate-fade-in-up">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in-up">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBpbnRlcmZhY2V8ZW58MXwwfHx8MTc0OTQ2MDkzMXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                        alt="Football player preparing"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Smart Analytics
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Smart Comparison
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6">
                        Compare venues side-by-side with detailed analytics on
                        pricing, amenities, and user reviews.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Price comparison tool
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Amenity filters
                        </li>
                        <li className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                          </svg>
                          Review aggregation
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 animate-fade-in-up">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBpbnRlcmZhY2V8ZW58MXwwfHx8MTc0OTQ2MDkzMXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                        alt="Water sports activity"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Multi-Sport Venues
                      </h3>
                      <p className="text-gray-600 mb-4">
                        From swimming pools to tennis courts, find venues for
                        every sport in your area.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Swimming
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Tennis
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          Basketball
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 animate-fade-in-up">
                  <div className="flex items-start space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8NHx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBkaWdpdGFsJTI1MjBpbnRlcmZhY2V8ZW58MXwwfHx8MTc0OTQ2MDkzMXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                        alt="Sports venue management"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Owner Dashboard
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Comprehensive management tools for venue owners to track
                        bookings and revenue.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          Analytics
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          Revenue
                        </span>
                        <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                          Scheduling
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      500+
                    </div>
                    <div className="text-blue-100">Active Venues</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      50K+
                    </div>
                    <div className="text-blue-100">Monthly Bookings</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      25+
                    </div>
                    <div className="text-blue-100">Sports Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      4.8★
                    </div>
                    <div className="text-blue-100">Average Rating</div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Experience the Future of Venue Booking?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of sports enthusiasts and venue owners who
                  trust our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Booking Now
                  </button>
                  <button
                    onClick={() => router.push("/login")}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                  >
                    List Your Venue
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section id="how-it-works" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                  Simple Process
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  How It
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Works
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get started in just three simple steps. Book your venue or
                  list your facility effortlessly.
                </p>
              </div>
              <div className="relative">
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-blue-200 transform -translate-y-1/2 z-0"></div>
                <div className="grid lg:grid-cols-3 gap-12 relative z-10">
                  <div className="text-center group">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTAwMnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                          alt="Search venues"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent"></div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        1
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Search & Discover
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Browse through hundreds of sports venues in your area.
                      Filter by sport type, location, and amenities.
                    </p>
                    <ul className="text-left space-y-2 max-w-xs mx-auto">
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Location-based search
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Advanced filters
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Real-time availability
                      </li>
                    </ul>
                  </div>
                  <div className="text-center group">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTAwMnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                          alt="Compare venues"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        2
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Compare & Select
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Compare prices, read reviews, and check amenities. Select
                      the perfect venue that matches your needs.
                    </p>
                    <ul className="text-left space-y-2 max-w-xs mx-auto">
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Side-by-side comparison
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        User reviews & ratings
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Detailed venue info
                      </li>
                    </ul>
                  </div>
                  <div className="text-center group">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYm9va2luZyUyNTIwbW9kZXJuJTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTAwMnww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                          alt="Book and play"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        3
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Book & Play
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Secure your booking with instant confirmation. Show up and
                      enjoy your game at the reserved venue.
                    </p>
                    <ul className="text-left space-y-2 max-w-xs mx-auto">
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Instant confirmation
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Secure payment
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Digital receipt
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    For Venue Owners
                  </h3>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    List your venue and start earning. Our platform makes it
                    easy to manage bookings and grow your business.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.54 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      List Your Venue
                    </h4>
                    <p className="text-gray-600">
                      Create your venue profile with photos, amenities, and
                      pricing details.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Manage Bookings
                    </h4>
                    <p className="text-gray-600">
                      Track reservations, manage availability, and communicate
                      with customers.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Earn Revenue
                    </h4>
                    <p className="text-gray-600">
                      Receive payments automatically and track your earnings
                      with detailed analytics.
                    </p>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <button
                    onClick={() => router.push("/admin")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Listing Your Venue
                  </button>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    3 min
                  </div>
                  <div className="text-gray-600">Average booking time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600">Platform availability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    99%
                  </div>
                  <div className="text-gray-600">Booking success rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    5 min
                  </div>
                  <div className="text-gray-600">Venue listing time</div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="benefits"
            className="py-20 bg-gradient-to-b from-blue-50 to-white"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  Why Choose Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Unlock Amazing
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Benefits
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience the advantages that make our platform the preferred
                  choice for sports venue booking.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Save Time & Money
                        </h3>
                        <p className="text-green-600 font-medium">
                          Up to 40% savings
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Compare prices instantly across multiple venues. No more
                      calling around or visiting different locations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Instant price comparison
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Exclusive platform discounts
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        No hidden booking fees
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">
                        Average savings per booking
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹500
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Guaranteed Availability
                        </h3>
                        <p className="text-blue-600 font-medium">
                          99.9% uptime
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Real-time slot updates ensure you never face booking
                      conflicts. Your reservation is always secure.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Live availability tracking
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Instant confirmation
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                        Backup venue suggestions
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 font-medium">
                        Successful bookings
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        99.9%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    All venues are verified and rated by real users for quality
                    and safety standards.
                  </p>
                  <div className="text-purple-600 font-semibold">
                    4.8★ Average Rating
                  </div>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Round-the-clock customer support to help with bookings,
                    cancellations, and queries.
                  </p>
                  <div className="text-orange-600 font-semibold">
                    Always Available
                  </div>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01-.61-1.276z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Flexible Booking
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Easy rescheduling and cancellation policies. Change plans
                    without hassle.
                  </p>
                  <div className="text-teal-600 font-semibold">
                    Free Cancellation
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    What Our Users Say
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Real experiences from sports enthusiasts and venue owners
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">R</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Rahul Sharma</h4>
                        <p className="text-gray-300 text-sm">
                          Cricket Enthusiast
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-200 mb-4">
                      "Saved me hours of searching! Found the perfect cricket
                      ground with great facilities at 30% less cost."
                    </p>
                    <div className="flex text-yellow-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Priya Patel</h4>
                        <p className="text-gray-300 text-sm">Venue Owner</p>
                      </div>
                    </div>
                    <p className="text-gray-200 mb-4">
                      "Increased my bookings by 200%! The platform brings
                      customers directly to my badminton courts."
                    </p>
                    <div className="flex text-yellow-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">A</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Arjun Singh</h4>
                        <p className="text-gray-300 text-sm">Football Coach</p>
                      </div>
                    </div>
                    <p className="text-gray-200 mb-4">
                      "Reliable platform for team bookings. Never had issues
                      with availability or quality of venues."
                    </p>
                    <div className="flex text-yellow-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Experience These Benefits?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied users who have transformed their
                  sports venue booking experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Booking Today
                  </button>
                  <button
                    onClick={() => router.push("/about")}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="testimonials"
            className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join thousands of venue owners and sports enthusiasts who
                  trust our platform
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      R
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Rajesh Kumar
                      </h4>
                      <p className="text-sm text-gray-600">Venue Owner</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Listing my cricket ground was so easy! I get 3x more
                    bookings now and the payment system is seamless."
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      P
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Priya Sharma
                      </h4>
                      <p className="text-sm text-gray-600">Badminton Player</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Found the perfect badminton court near my office. Booking
                    takes just 2 minutes!"
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Arjun Patel
                      </h4>
                      <p className="text-sm text-gray-600">
                        Football Team Captain
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Comparing venues and prices saved us 40% on our weekly
                    football sessions. Game changer!"
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Sneha Reddy
                      </h4>
                      <p className="text-sm text-gray-600">Tennis Player</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Real-time slot availability is amazing. No more calling
                    multiple venues!"
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      M
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Manoj Singh
                      </h4>
                      <p className="text-sm text-gray-600">
                        Sports Complex Owner
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "My 5 courts are now booked 90% of the time. The analytics
                    help me optimize pricing perfectly."
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      K
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        Kavya Joshi
                      </h4>
                      <p className="text-sm text-gray-600">College Student</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Student discounts and group booking features make sports
                    affordable for our college team!"
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      50K+
                    </div>
                    <div className="text-gray-600 font-medium">Happy Users</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                      2K+
                    </div>
                    <div className="text-gray-600 font-medium">
                      Venues Listed
                    </div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                      1M+
                    </div>
                    <div className="text-gray-600 font-medium">
                      Bookings Made
                    </div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                      4.9★
                    </div>
                    <div className="text-gray-600 font-medium">
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="text-6xl mb-4 opacity-50">"</div>
                  <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                    "This platform revolutionized how we manage our sports
                    facility. From zero to hero in just 3 months!"
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                      V
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">Vikram Mehta</div>
                      <div className="text-blue-200">Sports Arena Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="pricing"
            className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the perfect plan for your sports venue needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-200">
                  <div className="mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwcHJpY2luZyUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTMwM3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                      alt="Basic Plan"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Basic
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      Free
                    </div>
                    <p className="text-gray-600">For individual players</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Browse all venues</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">
                        Basic booking features
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>
                  <button className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
                    Get Started
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-blue-500 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                  <div className="mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwcHJpY2luZyUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTMwM3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                      alt="Pro Plan"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Pro
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ₹299<span className="text-lg text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600">For venue owners</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">List up to 3 venues</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">5% commission only</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    Start Free Trial
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-200">
                  <div className="mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1542319281-2a3772c20dfc?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwcHJpY2luZyUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTQ2MTMwM3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                      alt="Enterprise Plan"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Enterprise
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ₹999<span className="text-lg text-gray-600">/month</span>
                    </div>
                    <p className="text-gray-600">For large facilities</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Unlimited venues</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">24/7 phone support</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700">3% commission only</span>
                    </li>
                  </ul>
                  <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Compare Features
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Features
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          Basic
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          Pro
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-4 px-4 text-gray-700">
                          Venue Listings
                        </td>
                        <td className="py-4 px-4 text-center">Browse Only</td>
                        <td className="py-4 px-4 text-center">Up to 3</td>
                        <td className="py-4 px-4 text-center">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-gray-700">
                          Commission Rate
                        </td>
                        <td className="py-4 px-4 text-center">N/A</td>
                        <td className="py-4 px-4 text-center">5%</td>
                        <td className="py-4 px-4 text-center">3%</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-gray-700">
                          Analytics Dashboard
                        </td>
                        <td className="py-4 px-4 text-center">❌</td>
                        <td className="py-4 px-4 text-center">✅</td>
                        <td className="py-4 px-4 text-center">✅ Advanced</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-gray-700">
                          Priority Support
                        </td>
                        <td className="py-4 px-4 text-center">❌</td>
                        <td className="py-4 px-4 text-center">✅</td>
                        <td className="py-4 px-4 text-center">✅ 24/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Can I change plans anytime?
                    </h4>
                    <p className="text-gray-600">
                      Yes, upgrade or downgrade your plan at any time with
                      immediate effect.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Is there a setup fee?
                    </h4>
                    <p className="text-gray-600">
                      No setup fees. Start listing your venues immediately after
                      signup.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      How do payments work?
                    </h4>
                    <p className="text-gray-600">
                      Secure payments processed instantly. Funds transferred to
                      your account weekly.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Free trial available?
                    </h4>
                    <p className="text-gray-600">
                      Yes! 14-day free trial for Pro plan. No credit card
                      required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="cta"
            className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwYWN0aW9uJTI1MjBtb2Rlcm4lMjUyMGJyaWdodCUyNTIwcGhvdG98ZW58MXwwfHx8MTc0OTQ2MTM2NXww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                alt="Sports Action"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-ping"></div>
              <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                <div className="max-w-4xl mx-auto mb-12">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Ready to Transform Your Sports Experience?
                  </h2>
                  <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                    Join thousands of players and venue owners who've
                    revolutionized their game
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl min-w-[200px]">
                    Book Your Venue Now
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                    List Your Venue
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      50K+
                    </div>
                    <div className="text-blue-200 font-medium">
                      Active Users
                    </div>
                  </div>
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      2K+
                    </div>
                    <div className="text-blue-200 font-medium">
                      Venues Listed
                    </div>
                  </div>
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      1M+
                    </div>
                    <div className="text-blue-200 font-medium">
                      Bookings Made
                    </div>
                  </div>
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      4.9★
                    </div>
                    <div className="text-blue-200 font-medium">User Rating</div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white border-opacity-20">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Limited Time Offer
                      </h3>
                      <p className="text-blue-100">
                        Get 3 months free when you list your venue this month!
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">15</div>
                        <div className="text-xs text-blue-200">DAYS</div>
                      </div>
                      <div className="text-white">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">08</div>
                        <div className="text-xs text-blue-200">HOURS</div>
                      </div>
                      <div className="text-white">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">42</div>
                        <div className="text-xs text-blue-200">MINS</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>Trusted by 50,000+ users</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L13.414 9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>100% Secure Payments</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-8 7a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H7z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>24/7 Support Available</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                <path
                  d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </section>
          <footer id="footer" className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwbG9nbyUyNTIwbWluaW1hbCUyNTIwdmVjdG9yfGVufDF8fHx8MTc0OTQ2MTQwN3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                      alt="SportVenue Logo"
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                    <h3 className="text-2xl font-bold">SportVenue</h3>
                  </div>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Your ultimate platform for booking sports venues. Connect
                    players with perfect courts and fields across the city.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951-.564-2.005-.974-3.127-1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693-.188-1.452-.232-2.224-.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-2.005.85-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693-.188-1.452-.232-2.224-.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 3.992-2.861 0-7.392-2.967-7.392-6.923 0-1.033.394-2.143.889-2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Find Venues
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        List Your Venue
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        How It Works
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-6">Sports</h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Cricket
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Football
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Badminton
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Tennis
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Basketball
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-800 rounded-2xl p-8 mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <img
                      src="https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3BvcnRzJTI1MjB2ZW51ZSUyNTIwbG9nbyUyNTIwbWluaW1hbCUyNTIwdmVjdG9yfGVufDF8fHx8MTc0OTQ2MTQwN3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080"
                      alt="Newsletter"
                      className="w-16 h-16 rounded-lg mb-4 mx-auto md:mx-0"
                    />
                    <h4 className="text-xl font-semibold mb-2 text-center md:text-left">
                      Stay Updated
                    </h4>
                    <p className="text-gray-300 text-center md:text-left">
                      Get the latest venue deals and sports news
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mb-12">
                <h4 className="text-xl font-semibold mb-6">Download Our App</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"></path>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-gray-400 text-sm mb-4 md:mb-0">
                    © 2024 SportVenue. All rights reserved.
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Cookie Policy
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default New;
