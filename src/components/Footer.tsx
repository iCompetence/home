'use client'

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    Company: ["About Us", "Our Team", "Careers", "Contact"],
    Services: ["Web Development", "Mobile Apps", "Cloud Solutions", "Consulting"],
    Resources: ["Blog", "Case Studies", "Documentation", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Company</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Transforming businesses through innovative technology solutions 
                  and exceptional digital experiences.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <span>hello@company.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4" />
                  <span>123 Business Ave, Tech City, TC 12345</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="p-2">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-semibold">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-primary-foreground/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Stay Updated</h4>
              <p className="text-primary-foreground/80 text-sm">
                Get the latest insights and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:max-w-md lg:flex-1">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-primary-foreground/80">
            <p>
              © 2024 Company. All rights reserved.
            </p>
            <p>
              Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}