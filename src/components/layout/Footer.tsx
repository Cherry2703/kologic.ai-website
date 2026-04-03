import Link from "next/link";
import { Bot, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-text-primary">
                Kologic <span className="text-secondary">AI</span>
              </span>
            </Link>
            <p className="text-text-secondary text-base leading-relaxed max-w-sm mb-8">
              Empowering modern enterprises with conversational AI, agentic automation, and intelligent digital platforms.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Platform</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/platform" className="text-text-secondary hover:text-primary transition-colors text-sm">Overview</Link></li>
              <li><Link href="/products/agents" className="text-text-secondary hover:text-primary transition-colors text-sm">AI Agents</Link></li>
              <li><Link href="/products/chatbots" className="text-text-secondary hover:text-primary transition-colors text-sm">Conversational AI</Link></li>
              <li><Link href="/products/automation" className="text-text-secondary hover:text-primary transition-colors text-sm">Workflow Automation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Company</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-text-secondary hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/case-studies" className="text-text-secondary hover:text-primary transition-colors text-sm">Customers</Link></li>
              <li><Link href="/blog" className="text-text-secondary hover:text-primary transition-colors text-sm">Blog</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Resources</h3>
            <ul className="flex flex-col gap-4 mb-6">
              <li><Link href="/developers" className="text-text-secondary hover:text-primary transition-colors text-sm">Documentation</Link></li>
              <li><Link href="/developers/api" className="text-text-secondary hover:text-primary transition-colors text-sm">API Reference</Link></li>
              <li><Link href="/community" className="text-text-secondary hover:text-primary transition-colors text-sm">Community</Link></li>
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
              Start Building <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-4 text-sm text-text-secondary">
          <p>© {currentYear} Kologic AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
