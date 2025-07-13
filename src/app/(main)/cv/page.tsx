"use client";

import Image from "next/image";
import cvImage from "../../../../public/assets/images/cvImage.png";
import { Button } from "@/components/ui/shadcn/button";
import { Download } from "lucide-react";

export default function Cv() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/Mohammed-cv.pdf";
    link.download = "Mohammed-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl ">My CV</h1>
        </div>

        {/* CV Content */}
        <div className="max-w-4xl mx-auto">
          {/* CV Image */}
          <div className="p-6 mb-8">
            <Image
              src={cvImage}
              alt="Mohammed Alheraki CV"
              className="w-full h-auto rounded-lg"
              priority
              quality={100}
            />
          </div>

          {/* Download Section */}
          <div className="text-center">
            <Button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              High-quality PDF format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
