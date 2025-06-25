"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Solutions",
    content:
      "Mohammed delivered exceptional work on our web application. His attention to detail and technical expertise made our project a success.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO",
    company: "StartupX",
    content:
      "Working with Mohammed was a game-changer for our startup. He not only built our platform but also provided valuable insights on user experience.",
    rating: 5,
    avatar: "DC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Studio",
    content:
      "Mohammed has an excellent eye for design and the technical skills to bring any vision to life. Highly recommend for any full-stack project.",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "CTO",
    company: "InnovateLab",
    content:
      "Impressive problem-solving skills and clean code architecture. Mohammed exceeded our expectations and delivered ahead of schedule.",
    rating: 5,
    avatar: "MT",
  },
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-primary fill-primary" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">
          What Clients Say
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Testimonials from satisfied clients and collaborators
        </p>
      </div>

      <div className="relative">
        {/* Main Testimonial Card */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 shadow-lg border border-surface-light">
          <div className="text-center">
            <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-60" />

            <blockquote className="text-lg md:text-xl text-text-primary mb-8 leading-relaxed max-w-3xl mx-auto">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            <div className="flex justify-center mb-4">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-text-primary">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {testimonials[currentTestimonial].role} at{" "}
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            className="text-text-secondary hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            className="text-text-secondary hover:text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-text-secondary">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-text-secondary">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-text-secondary">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}
