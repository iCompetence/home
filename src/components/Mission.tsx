'use client'

import { Card, CardContent } from "./ui/card";
import { Target, Lightbulb, Users, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Mission() {
  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "Every project we undertake is guided by clear objectives and meaningful impact."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Success comes from working together, both within our team and with our clients."
    },
    {
      icon: Rocket,
      title: "Excellence",
      description: "We strive for perfection in everything we do, delivering quality that exceeds expectations."
    }
  ];

  return (
    <section id="mission" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To empower businesses with innovative technology solutions that drive growth,
                enhance efficiency, and create lasting value in an ever-evolving digital landscape.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Core Values</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <Card key={index} className="border-none bg-background/60">
                    <CardContent className="p-6 space-y-3">
                      <value.icon className="h-8 w-8 text-primary" />
                      <h4 className="font-semibold">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="/images/inno.jpeg"
              alt="Business innovation and technology"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}