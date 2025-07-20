"use client";

import { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";

export default function EducationExperience() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education"
  );

  return (
    <div className="min-h-screen bg-base-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & Experience
          </h1>
          <p className="text-lg text-light-span max-w-2xl mx-auto">
            My academic background and professional journey in software
            development
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-surface-alt rounded-sm p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-medium transition-all duration-300 cursor-pointer border-2 ${
                activeTab === "education"
                  ? "bg-accent text-white shadow-lg scale-95 border-accent"
                  : "text-light-span hover:text-white hover:bg-surface-elevated/50 hover:scale-105 hover:border-white/30 border-transparent"
              }`}
            >
              <GraduationCap size={20} />
              Education
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-medium transition-all duration-300 cursor-pointer border-2 ${
                activeTab === "experience"
                  ? "bg-accent text-white shadow-lg scale-95 border-accent"
                  : "text-light-span hover:text-white hover:bg-surface-elevated/50 hover:scale-105 hover:border-white/30 border-transparent"
              }`}
            >
              <Briefcase size={20} />
              Experience
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-surface-alt rounded-3xl p-8 md:p-12 shadow-xl">
          {activeTab === "education" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <GraduationCap className="text-accent" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white">Education</h2>
              </div>

              <div className="bg-surface-elevated rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      Arab Open University
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-light-span">
                        <MapPin size={18} className="text-accent" />
                        <span className="font-medium">Riyadh - Dammam</span>
                      </div>

                      <div className="flex items-center gap-3 text-light-span">
                        <Calendar size={18} className="text-accent" />
                        <span className="font-medium">
                          September 2022 - Present
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/5 p-4 rounded-xl border border-accent/20">
                    <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                      Current Student
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <Briefcase className="text-accent" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Professional Experience
                </h2>
              </div>

              <div className="space-y-8">
                {/* Role 1: Frontend Developer */}
                <div className="bg-surface-elevated rounded-2xl p-6 md:p-8 border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        Frontend Developer
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-light-span">
                          <Building2 size={18} className="text-accent" />
                          <span className="font-medium">Shafrah</span>
                        </div>

                        <div className="flex items-center gap-3 text-light-span">
                          <Calendar size={18} className="text-accent" />
                          <span className="font-medium">
                            January 2025 - Present
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                      <span className="text-green-400 font-semibold text-sm uppercase tracking-wide">
                        Current Position
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-light-span leading-relaxed">
                          Built and launched Shafrah website using Next.js and
                          Firebase.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-light-span leading-relaxed">
                          Working on developing Shafrah technical products.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Role 2: Front-End Development Trainee */}
                <div className="bg-surface-elevated rounded-2xl p-6 md:p-8 border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        Front-End Development Trainee
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-light-span">
                          <Building2 size={18} className="text-accent" />
                          <span className="font-medium">Maded Studio</span>
                        </div>

                        <div className="flex items-center gap-3 text-light-span">
                          <MapPin size={18} className="text-accent" />
                          <span className="font-medium">Madinah</span>
                        </div>

                        <div className="flex items-center gap-3 text-light-span">
                          <Calendar size={18} className="text-accent" />
                          <span className="font-medium">
                            August 2022 - November 2023
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                      <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">
                        Training Program
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-light-span leading-relaxed">
                          Trained under Suliman Suliman with mentorship from
                          Abdurahman Al Mubarak.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-light-span leading-relaxed">
                          Gained hands-on experience in front-end development,
                          focusing on modern web technologies and best
                          practices.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
