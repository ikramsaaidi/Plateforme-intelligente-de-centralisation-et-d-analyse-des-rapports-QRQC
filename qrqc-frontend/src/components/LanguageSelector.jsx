import { useState, useRef, useEffect } from "react";

/**
 * LanguageSelector
 * Sélecteur de langue (UI uniquement).
 * Les traductions seront intégrées ultérieurement
 * avec react-i18next.
 */

const LANGUAGES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2
          rounded-xl
          border border-slate-300
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          transition-all
          duration-200
          hover:border-[#074784]
          hover:shadow-md
        "
      >
        {/* Globe */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-[#074784]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>

        <span>{selectedLang.code}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>

      </button>

      {isOpen && (
        <ul
          className="
            absolute
            right-0
            z-20
            mt-2
            w-44
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => {
                  setSelectedLang(lang);
                  setIsOpen(false);

                  // TODO :
                  // Intégration react-i18next
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  px-4
                  py-3
                  text-sm
                  transition-colors
                  hover:bg-slate-100
                  ${
                    lang.code === selectedLang.code
                      ? "bg-[#074784]/5 font-semibold text-[#074784]"
                      : "text-slate-700"
                  }
                `}
              >
                {lang.label}

                <span className="text-xs text-slate-400">
                  {lang.code}
                </span>

              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;