import { useState } from "react";

/**
 * PasswordInput
 * Champ mot de passe réutilisable.
 * Utilisé par le formulaire de connexion QRQC.
 */
const PasswordInput = ({
  id = "password",
  label = "Mot de passe",
  placeholder = "Entrez votre mot de passe",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-base font-semibold text-[#1F2937]"
      >
        {label}
      </label>

      <div className="relative">

        {/* Icône cadenas */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>

        <input
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="current-password"
          className="
            w-full
            h-14
            rounded-xl
            border
            border-slate-300
            bg-white
            pl-12
            pr-12
            text-[15px]
            text-slate-800
            placeholder:text-slate-400
            outline-none
            transition
            duration-200
            focus:border-[#074784]
            focus:ring-4
            focus:ring-[#074784]/10
          "
        />

        {/* Afficher / Masquer */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition
            hover:text-[#074784]
          "
          aria-label={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6 0-10-6-10-8a12.5 12.5 0 0 1 3.16-4.44M9.9 4.24A10.5 10.5 0 0 1 12 4c6 0 10 6 10 8a12.3 12.3 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>

      </div>

    </div>
  );
};

export default PasswordInput;