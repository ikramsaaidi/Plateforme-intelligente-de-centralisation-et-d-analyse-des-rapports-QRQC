import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * UserProfile
 * -----------------------------------------------------------------------
 * Affiche les informations de l'utilisateur connecté (photo, nom, rôle)
 * ainsi qu'un bouton de déconnexion.
 *
 * Utilisé en bas de la Sidebar. Le composant est autonome : il récupère
 * lui-même l'utilisateur courant et la fonction de déconnexion depuis
 * le AuthContext, ce qui évite de faire transiter ces données par props
 * depuis les composants parents.
 */
function UserProfile() {
  const { user, logout } = useAuth();

  // Initiales utilisées comme avatar de secours si aucune photo n'est fournie
  const initials = user?.first_name
    ? `${user.first_name[0]}${user.last_name?.[0] ?? ""}`.toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
      {/* Avatar : photo si disponible, sinon initiales */}
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.first_name}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/20"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B96B7] text-sm font-semibold text-white ring-2 ring-white/20">
          {initials}
        </div>
      )}

      {/* Nom et rôle */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {user?.first_name ? `${user.first_name} ${user.last_name ?? ""}` : "Utilisateur"}
        </p>
        <p className="truncate text-xs text-slate-300">{user?.role ?? "Rôle non défini"}</p>
      </div>

      {/* Bouton de déconnexion */}
      <button
        type="button"
        onClick={logout}
        title="Se déconnecter"
        className="shrink-0 rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
      >
        <LogOut size={18} strokeWidth={2} />
      </button>
    </div>
  );
}

export default UserProfile;