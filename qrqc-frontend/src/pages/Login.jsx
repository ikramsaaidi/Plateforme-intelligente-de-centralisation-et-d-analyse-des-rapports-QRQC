import LoginBanner from "../components/LoginBanner";
import LoginForm from "../components/LoginForm";

/**
 * Login (page)
 * Écran de connexion de la plateforme QRQC.
 * Assemble le panneau visuel (LoginBanner) et le formulaire
 * d'authentification (LoginForm) dans une carte centrée et responsive.
 *
 * Aucune logique métier ici : cette page reste un simple conteneur
 * de mise en page, conformément à l'architecture "pages / components".
 */
const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-6">
      <div className="grid h-[90vh] w-[92vw] max-w-[1500px] overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <LoginBanner />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;