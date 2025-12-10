'use client'

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Skills() {
  const skillCategories = [
    {
      category: "Frontend Technologies",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 85 }
      ]
    },
    {
      category: "Backend Technologies",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 82 }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 87 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 78 },
        { name: "CI/CD", level: 90 }
      ]
    }
  ];

  const certifications = [
    "AWS Solutions Architect",
    "Google Cloud Professional",
    "Microsoft Azure Developer",
    "Certified Scrum Master",
    "Security+ Certified",
    "PMP Certified"
  ];

  const technologies = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS",
    "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL",
    "Tailwind CSS", "Firebase", "Supabase", "Vercel", "Figma"
  ];

  return (
    <section id="skills" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team brings together diverse technical skills and industry expertise
            to deliver exceptional results across all project phases.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-8">
                {skillCategories.map((category, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">{category.category}</h4>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Certifications</h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <ImageWithFallback
                src="/images/prof.jpeg"
                alt="Professional workspace design"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Our Approach</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Agile development methodology for faster delivery
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Test-driven development for reliable code
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Continuous integration and deployment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Regular code reviews and quality assurance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}