import logo from "../assets/logos/sews-logo.png";
import bannerImage from "../assets/images/login-banner.png";

/**
 * LoginBanner
 * Partie gauche de l'écran de connexion.
 * Identité visuelle SEWS MFZ.
 */

const LoginBanner = () => {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-col">

      {/* Image de fond */}
      <img
        src={bannerImage}
        alt="SEWS Banner"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-[center_35%]
          scale-100
        "
      />

      {/* Couleur principale */}
      <div className="absolute inset-0 bg-[#074784]/35"></div>

      {/* Triangle bleu clair */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,150,183,.45) 0%, rgba(11,150,183,.20) 32%, transparent 60%)",
        }}
      />

      {/* Dégradé sombre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,47,87,.82), rgba(5,47,87,.08) 45%)",
        }}
      />

      {/* Léger effet lumineux */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,.10), transparent 45%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10">

        {/* Logo */}
        <div className="flex justify-end">
          <img
            src={logo}
            alt="SEWS MFZ"
            className="
              w-24
              object-contain
              drop-shadow-lg
            "
          />
        </div>

        {/* Texte */}
        <div className="pmt-auto pb-6">

          <h1 className="mb-5 text-5xl font-extrabold tracking-tight text-white  drop-shadow-[0_3px_8px_rgba(0,0,0,.45)] ">
            Plateforme QRQC
          </h1>

          <h2 className="mb-5 text-2xl font-semibold text-[#4DD6F5] drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
            Digitalisez votre processus qualité
          </h2>

          <p className="max-w-lg text-[17px] leading-8 text-white/90">
            Centralisez les QRQC, suivez les actions correctives
            et pilotez la qualité en temps réel sur l'ensemble
            des lignes de production.
          </p>

        </div>

      </div>

    </div>
  );
};

export default LoginBanner;