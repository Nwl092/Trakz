/* ==========================================================================
   CONFIGURATION — le seul fichier à modifier
   --------------------------------------------------------------------------
   Ce fichier est déjà rempli avec tes valeurs. Tu n'as rien à changer pour
   que le site fonctionne.
   ========================================================================== */

window.CONFIG = {

  /* --- Ton produit --- */
  nom:        "Trakz",
  baseline:   "Le poste de commande de ta boutique de seconde main",
  prix:       "39",      /* prix de référence, affiché barré si un prix de lancement existe */
  devise:     "€",

  /* Prix de lancement. Laisse vide pour ne rien afficher de particulier.
     N'annonce un nombre de places que si tu comptes vraiment augmenter
     après : une rareté inventée se retourne toujours contre le vendeur. */
  prixLancement:   "29",
  placesLancement: "30",

  /* Lien de paiement (Stripe Payment Link, Gumroad, Payhip…). */
  lienPaiement: "https://buy.stripe.com/28EbITeL1fVV83l3M863K01",

  /* Adresse affichée publiquement sur le site pour te joindre. */
  email: "trakzfr1@gmail.com",


  /* ======================================================================
     MODE TEST — désactivé.
     À true, le site ignore Supabase et n'accepte que la liste ci-dessous.
     ====================================================================== */

  modeTest: false,

  comptesTest: [
    { email: "admin@trakz.fr", mdp: "Trakz2026" }
  ],


  /* ======================================================================
     SUPABASE — la base de comptes
     ====================================================================== */

  supabaseUrl: "https://cokgjjeekxgsbzikerql.supabase.co",

  /* Clé PUBLIQUE (sb_publishable_… ou eyJ…).
     Jamais la clé « secret » ni « service_role ». */
  supabaseKey: "sb_publishable_PcrW0nWIxxhRkTPsuuojfQ__Hj_TnpU"
};
