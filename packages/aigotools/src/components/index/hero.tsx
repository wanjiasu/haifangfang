import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Istok_Web } from "next/font/google";

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: "700",
});

export default function Hero() {
  const t = useTranslations("index");

  return (
    <div className="relative overflow-hidden">
      {/* Summer background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">☀️</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce">🌴</div>
        <div className="absolute bottom-10 left-20 text-3xl animate-pulse">🏖️</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-bounce">🌊</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-pulse">🦋</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce">🌺</div>
      </div>
      
      {/* Hello Summer text */}
      <div className="text-center mb-8">
        <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-4 animate-pulse">
          Hello Summer!
        </h1>
        <div className="flex justify-center items-center gap-4 text-4xl">
          <span className="animate-bounce">🌴</span>
          <span className="animate-pulse">☀️</span>
          <span className="animate-bounce">🏔️</span>
        </div>
      </div>

      {/* Original slogan with summer styling */}
      <div
        className={clsx(
          istokWeb.className,
          "relative z-10 mt-10 sm:mt-16 text-3xl sm:text-5xl max-w-[1000px] !leading-[1.3] mx-auto font-bold text-center",
          "bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 bg-clip-text text-transparent",
          "drop-shadow-lg summer-decoration"
        )}
      >
        {t("slogan")}
      </div>

      {/* Summer greeting message */}
      <div className="text-center mt-8 text-xl sm:text-2xl text-orange-700 dark:text-orange-300 font-medium">
        Wishing you a season filled with sunshine, laughter, and relaxation! 🌞
      </div>
    </div>
  );
}
