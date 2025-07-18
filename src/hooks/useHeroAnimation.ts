import { useState, useEffect, useCallback, useMemo } from "react";

export const useHeroAnimation = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const roles = useMemo(
    () => [
      "Full Stack Developer",
      "UI/UX Designer",
      "Problem Solver",
      "Tech Enthusiast",
    ],
    []
  );

  // Typewriter effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRoleText = roles[currentRole];

    if (isTyping) {
      if (typingText.length < currentRoleText.length) {
        timeout = setTimeout(() => {
          setTypingText(currentRoleText.slice(0, typingText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (typingText.length > 0) {
        timeout = setTimeout(() => {
          setTypingText(typingText.slice(0, -1));
        }, 50);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typingText, isTyping, currentRole, roles]);

  // Intersection observer for scroll animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("skills");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const downloadCV = useCallback(() => {
    // Create a temporary link to download CV
    const link = document.createElement("a");
    link.href = "/assets/cv/Mohammed_Alheraki_CV.pdf"; // Update with your actual CV path
    link.download = "Mohammed_Alheraki_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return {
    currentRole,
    roles,
    isVisible,
    typingText,
    scrollToNext,
    downloadCV,
  };
};
