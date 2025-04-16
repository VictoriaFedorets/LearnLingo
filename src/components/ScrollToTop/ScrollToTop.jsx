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
        backgroundColor: "var(--background)",
        color: "var(--main-accent)",
        border: isHovered ? "1px solid var(--focus-accent)" : "none",
        borderRadius: "50%",
        boxShadow: isHovered
          ? "0 6px 12px rgba(0, 0, 0, 0.2)"
          : "0 6px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition:
          "opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border 0.3s ease-in-out",
      }}
    >
      <ArrowUp
        style={{
          color: isHovered ? "var(--main-accent)" : "var(--hover-accent)",
        }}
        size={24}
      />
    </button>
  );
}
