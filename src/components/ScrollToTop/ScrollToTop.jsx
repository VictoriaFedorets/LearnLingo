import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
        padding: "12px 14px",
        backgroundColor: isHovered ? "var(--button-hover)" : "var(--button)",
        color: "var(--white)",
        border: "none",
        borderRadius: "50%",
        boxShadow: "0 4px 6px var(--background)",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition:
          "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      <ArrowUp size={24} />
    </button>
  );
}
