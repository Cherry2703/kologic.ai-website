"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      // Reset form logic would go here
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 pb-32 relative overflow-hidden bg-gray-50/20">
      <GradientBlob color="primary" className="w-[800px] h-[800px] top-0 right-0 opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Ready to explore how Kologic can transform your enterprise? Our team of AI architects is ready to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Address</h3>
              <p className="text-text-secondary flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span>Sri Vivekananda Nagar, Madhapur,<br/>Hyderabad, Telangana<br/>India</span>
              </p>
            </div>

            <div className="bg-gray-100/50 rounded-2xl p-6 mt-4">
              <h4 className="font-semibold text-text-primary mb-4">Direct Contact</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@kologic.ai" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>hello@kologic.ai</span>
                </a>
                <a href="tel:+18005550199" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) 555-0199</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <GlassCard hoverEffect={false} className="bg-white p-8 md:p-10 shadow-xl border-gray-100">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Request a Demo</h3>
              
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-text-primary">Message Received</h4>
                  <p className="text-text-secondary">An AI architect will be in touch with you shortly to schedule your demo.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 text-primary font-medium hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="firstName" className="text-sm font-medium text-text-secondary">First Name</label>
                      <input required type="text" id="firstName" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="lastName" className="text-sm font-medium text-text-secondary">Last Name</label>
                      <input required type="text" id="lastName" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-text-secondary">Work Email</label>
                    <input required type="email" id="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="company" className="text-sm font-medium text-text-secondary">Company</label>
                    <input required type="text" id="company" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-sm font-medium text-text-secondary">Project Details</label>
                    <textarea required id="message" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary transition-all resize-none"></textarea>
                  </div>

                  <button 
                    disabled={status === "submitting"}
                    type="submit" 
                    className="w-full bg-primary text-white rounded-lg px-4 py-3.5 font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <>Book Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
