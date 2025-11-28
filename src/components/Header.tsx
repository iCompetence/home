'use client'

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">iCompetence</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">
              Home
            </a>
            <a href="#mission" className="hover:text-primary transition-colors">
              Mission
            </a>
            <a href="#services" className="hover:text-primary transition-colors">
              Services
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Skills
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Contact</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#mission" className="hover:text-primary transition-colors">
                Mission
              </a>
              <a href="#services" className="hover:text-primary transition-colors">
                Services
              </a>
              <a href="#skills" className="hover:text-primary transition-colors">
                Skills
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline">Contact</Button>
                <Button>Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}