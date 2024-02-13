import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      presentation:
        "You can easily track and manage your portfolios, analyze your performance, and get real-time information on your investments. Enjoy an intuitive and comprehensive experience to optimize your financial management.",
    },
  },
  fr: {
    translation: {
      "Add a new transaction": "Ajouter une nouvelle transaction",
      "Asset name": "Nom de l'actif",
      Quantity: "Quantité",
      Price: "Prix",
      "Total Spent": "Total",
      Submit: "Ajouter",
      "Account Balance": "Solde actuel",
      "+ Add transaction": "+ Ajouter une transaction",
      "Total Pnl": "Profit total",
      "Best performer": "Meilleur performance",
      "Worst performer": "Pire performance",
      Name: "Nom",
      Price: "Prix",
      Holdings: "Avoirs",
      "Average buy price": "Prix d'achat moyen",
      PnL: "Profits/Pertes",
      "New Trade": "Nouveau Trade",
      Amount: "Montant",
      "Buy Price": "Prix d'achat",
      "Exit Price": "Prix de sortie",
      Leverage: "Levier",
      Entry: "Entrée",
      Exit: "Sortie",
      "Biggest gain": "Plus gros gain",
      "Biggest loss": "Plus grosse perte",
      "Sort by": "Trier par",
      "BUY / SELL": "Achat / Vente",
      Buy: "Achat",
      Sell: "Vente",
      Pricing: "Prix",
      Monthly: "Mensuel",
      Yearly: "Annuel",
      "Invest\nment": "Investissement",
      "About us": "À propos",
      LOGOUT: "Déconnexion",
      presentation:
        "Vous pouvez facilement suivre et gérer vos portefeuilles, analyser vos performances, et obtenir des informations en temps réel sur vos investissements. Profitez d'une expérience intuitive et complète pour optimiser votre gestion financière.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
