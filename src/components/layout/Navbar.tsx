"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "Products", href: "/products" },
  { name: "Partners", href: "/partners" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About Us", href: "/about-us" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pr-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <img 
                src="/kologic-logo.jpg" 
                alt="Kologic AI Logo" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary">
              Kologic <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative py-2 ${
                  pathname === link.href ? "text-primary" : "text-text-secondary"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-text-primary text-white text-sm font-medium hover:bg-primary transition-colors shadow-lg shadow-text-primary/20 hover:shadow-primary/30"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-secondary hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass absolute top-20 left-0 w-full border-b border-gray-100/50 py-4 px-4 flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium ${
                pathname === link.href
                  ? "bg-primary/5 text-primary"
                  : "text-text-secondary hover:bg-gray-50 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-lg bg-primary text-white font-medium shadow-md shadow-primary/20"
          >
            Book Demo
          </Link>
        </motion.div>
      )}
    </header>
  );
}
