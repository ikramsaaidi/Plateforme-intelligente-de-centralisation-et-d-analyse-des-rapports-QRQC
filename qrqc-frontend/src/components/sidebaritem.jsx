import { NavLink } from "react-router-dom";

/**
 * SidebarItem
 * -----------------------------------------------------------------------
 * Élément unique du menu de navigation de la Sidebar.
 *
 * Ce composant est volontairement générique : il ne connaît rien du
 * contenu du menu, il se contente d'afficher une icône, un libellé,
 * et de gérer ses propres états (survol, actif) via NavLink.
 *
 * Le fait de centraliser ce rendu ici évite de dupliquer le style
 * (hover, actif, transition, coins arrondis) pour chaque lien du menu.
 *
 * Props :
 * - to      : chemin de destination (react-router)
 * - icon    : composant icône (ex: lucide-react) à afficher
 * - label   : libellé affiché à côté de l'icône
 */
function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium",
          "transition-all duration-200 ease-in-out",
          isActive
            ? "bg-[#0B96B7] text-white shadow-sm"
            : "text-slate-200 hover:bg-white/10 hover:text-white",
        ].join(" ")
      }
    >
      {Icon && (
        <Icon
          size={18}
          strokeWidth={2}
          className="shrink-0 opacity-90 group-hover:opacity-100"
        />
      )}
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default SidebarItem;