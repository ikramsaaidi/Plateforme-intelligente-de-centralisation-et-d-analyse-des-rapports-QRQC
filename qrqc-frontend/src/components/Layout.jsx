import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * Layout
 * -----------------------------------------------------------------------
 * Ossature commune à toutes les pages authentifiées de la plateforme.
 *
 * Ce composant ne contient aucune logique métier : il se contente
 * d'assembler la Sidebar, la Navbar et la zone de contenu principale,
 * puis délègue l'affichage de la page courante à <Outlet />.
 *
 * Toute nouvelle page de l'application n'a donc rien à connaître de
 * la Sidebar ou de la Navbar : il suffit de la déclarer comme route
 * enfant de ce Layout pour qu'elle en hérite automatiquement.
 */
function Layout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar fixe à gauche (280px) */}
      <Sidebar />

      {/* Décalage du contenu pour laisser la place à la Sidebar fixe */}
      <div className="flex min-h-screen flex-col pl-[280px]">
        {/* Navbar fixe en haut */}
        <Navbar />

        {/* Zone de contenu principale : chaque page s'affiche ici */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

        {/* Pied de page optionnel */}
        <footer className="border-t border-[#E5E7EB] px-8 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} SEWS MFZ — QRQC Platform
        </footer>
      </div>
    </div>
  );
}

export default Layout;