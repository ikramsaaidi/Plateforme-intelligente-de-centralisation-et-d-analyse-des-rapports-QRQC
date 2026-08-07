import {
  LayoutDashboard,
  ClipboardList,
  Factory,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import SidebarItem from "./Sidebaritem";
import UserProfile from "../hooks/userProfile";
import sewsLogo from "../assets/logos/sews-logo.png";

/**
 * Configuration du menu de navigation.
 *
 * Centraliser les entrées du menu dans un tableau permet d'ajouter,
 * retirer ou réordonner une section sans jamais toucher au JSX de
 * rendu : la Sidebar reste ainsi facilement extensible.
 */
const MENU_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/qrqc", label: "QRQC", icon: ClipboardList },
  { to: "/lignes", label: "Lignes", icon: Factory },
  { to: "/utilisateurs", label: "Utilisateurs", icon: Users },
  { to: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { to: "/parametres", label: "Paramètres", icon: Settings },
];

/**
 * Sidebar
 * -----------------------------------------------------------------------
 * Barre de navigation latérale fixe de la plateforme.
 *
 * Structure :
 * 1. En-tête : logo SEWS, nom de la plateforme et sous-titre
 * 2. Corps   : liste des liens de navigation (générée depuis MENU_ITEMS)
 * 3. Pied    : profil de l'utilisateur connecté + déconnexion
 */
function Sidebar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 flex w-[280px] flex-col bg-[#052F57]"
      aria-label="Navigation principale"
    >
      {/* En-tête : identité de la plateforme */}
      <div className="flex items-center gap-3 px-6 py-6">
        <img src={sewsLogo} alt="SEWS" className="h-10 w-8 object-contain" />
        <div className="min-w-0">
          <p className="truncate text-base font-bold leading-tight text-white">
            SEWS MFZ
          </p>
          <p className="truncate text-xs font-medium text-slate-300">
            QRQC Platform
          </p>
        </div>
      </div>

      {/* Séparateur discret entre l'en-tête et le menu */}
      <div className="mx-6 border-t border-white/10" />

      {/* Corps : menu de navigation, extensible via MENU_ITEMS */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {MENU_ITEMS.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      {/* Pied : profil utilisateur + déconnexion */}
      <div className="border-t border-white/10 p-4">
        <UserProfile />
      </div>
    </aside>
  );
}

export default Sidebar;