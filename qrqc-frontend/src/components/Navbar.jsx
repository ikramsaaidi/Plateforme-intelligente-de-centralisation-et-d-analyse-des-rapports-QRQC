import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, ChevronDown, Globe, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * Correspondance entre un segment d'URL et son libellé affiché.
 * A compléter au fur et à mesure que de nouvelles routes sont ajoutées.
 */
const ROUTE_LABELS = {
  dashboard: "Dashboard",
  qrqc: "QRQC",
  lignes: "Lignes",
  utilisateurs: "Utilisateurs",
  statistiques: "Statistiques",
  parametres: "Paramètres",
};

/**
 * Construit le fil d'ariane (breadcrumb) à partir du chemin courant.
 * Ex : "/qrqc/lignes" -> ["QRQC", "Lignes"]
 */
function useBreadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment) => ROUTE_LABELS[segment] ?? segment);
  const pageTitle = crumbs[crumbs.length - 1] ?? "Dashboard";
  return { crumbs, pageTitle };
}

/**
 * Navbar
 * -----------------------------------------------------------------------
 * Barre supérieure fixe affichant :
 * - à gauche : le titre de la page courante et son fil d'ariane
 * - à droite : recherche, notifications, langue et menu profil
 *
 * Le titre et le breadcrumb sont dérivés automatiquement de l'URL,
 * ce qui évite de les répéter manuellement dans chaque page.
 */
function Navbar() {
  const { user, logout } = useAuth();
  const { crumbs, pageTitle } = useBreadcrumb();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#E5E7EB] bg-white px-8 shadow-sm">
      {/* Zone gauche : titre + fil d'ariane */}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold text-[#1F2937]">
          {pageTitle}
        </h1>
        <nav className="flex items-center text-xs text-slate-400" aria-label="Fil d'ariane">
          <span className="hover:text-slate-600">Accueil</span>
          {crumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              <ChevronRight size={12} className="mx-1" />
              <span
                className={index === crumbs.length - 1 ? "font-medium text-slate-600" : ""}
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Zone droite : actions rapides */}
      <div className="flex items-center gap-2">
        {/* Recherche */}
        <div className="hidden items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 md:flex">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-40 bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          title="Notifications"
          className="relative rounded-lg p-2.5 text-slate-500 transition-colors duration-200 hover:bg-[#F8FAFC] hover:text-[#074784]"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
        </button>

        {/* Sélecteur de langue */}
        <button
          type="button"
          title="Langue"
          className="flex items-center gap-1 rounded-lg p-2.5 text-slate-500 transition-colors duration-200 hover:bg-[#F8FAFC] hover:text-[#074784]"
        >
          <Globe size={19} />
        </button>

        {/* Séparateur */}
        <div className="mx-1 h-8 w-px bg-[#E5E7EB]" />

        {/* Menu déroulant du profil */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#F8FAFC]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#074784] text-sm font-semibold text-white">
              {user?.first_name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-48 rounded-xl border border-[#E5E7EB] bg-white py-2 shadow-lg">
              <p className="truncate px-4 py-1.5 text-sm font-medium text-[#1F2937]">
                {user?.first_name ?? "Utilisateur"}
              </p>
              <p className="truncate px-4 pb-2 text-xs text-slate-400">
                {user?.role ?? "Rôle non défini"}
              </p>
              <div className="my-1 border-t border-[#E5E7EB]" />
              <button
                type="button"
                onClick={logout}
                className="w-full px-4 py-2 text-left text-sm text-[#EF4444] transition-colors duration-200 hover:bg-[#F8FAFC]"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;