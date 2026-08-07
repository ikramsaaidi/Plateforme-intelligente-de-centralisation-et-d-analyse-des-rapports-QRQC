import { useState } from "react";
import PasswordInput from "./PasswordInput";
import LanguageSelector from "./LanguageSelector";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);
const [showResetInfo, setShowResetInfo] = useState(false);

const { login } = useAuth();

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    await authService.login(username, password);
    
    login();

    console.log("Connexion réussie !");
  } catch (error) {
    console.error("Erreur de connexion");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};  
  const handleForgotPassword = () => {
    setShowResetInfo(true);
  };

  return (
    <div className="flex flex-col justify-center bg-white px-14 py-10">

      {/* Langue */}
      <div className="mb-12 flex justify-end">
        <LanguageSelector />
      </div>

      {/* Header */}
      <div className="mb-12 flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#074784]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-8 w-8 text-[#074784]"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#074784]">
            Bienvenue !
          </h2>

          <p className="mt-2 text-base text-gray-500">
            Accédez à la plateforme de gestion QRQC.
          </p>
        </div>

      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7"
      >

        {/* Identifiant */}
        <div>

          <label
            htmlFor="username"
            className="mb-2 block text-base font-semibold text-[#1F2937]"
          >
            Identifiant
          </label>

          <div className="relative">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre identifiant"
              autoComplete="username"
              className="
                w-full
                h-14
                rounded-xl
                border
                border-slate-300
                bg-white
                pl-12
                pr-4
                text-[15px]
                text-slate-800
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-[#074784]
                focus:ring-4
                focus:ring-[#074784]/10
              "
            />

          </div>

        </div>

        {/* Mot de passe */}
        <PasswordInput
          id="password"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Options */}
        <div className="flex items-center justify-between">

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#1F2937]">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[#074784]"
            />

            Se souvenir de moi

          </label>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-semibold text-[#074784] transition hover:underline"
          >
            Mot de passe oublié ?
          </button>

        </div>

        {/* Message */}
        {showResetInfo && (

          <div className="rounded-xl border border-[#0B96B7]/30 bg-[#0B96B7]/10 p-4 text-sm text-[#074784]">

            Pour des raisons de sécurité, la réinitialisation du mot de passe
            est effectuée uniquement par l'administrateur.

            <br />

            Merci de contacter votre administrateur.

          </div>

        )}

        {/* Bouton */}
        <button
          type="submit"
          className="
            mt-2
            h-14
            rounded-xl
            bg-[#074784]
            text-lg
            font-semibold
            text-white
            transition
            duration-200
            hover:bg-[#052F57]
          "
        >
          Se connecter
        </button>

      </form>

      {/* Footer */}
      <div className=" pb-2 mt-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SEWS MFZ
      </div>

    </div>
  );
};

export default LoginForm;