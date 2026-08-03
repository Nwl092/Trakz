# Mettre le site en service

Quatre fichiers, une base de comptes gratuite, un hébergement gratuit. Compte une heure la première fois.

```
site/
├── index.html        la page de vente
├── connexion.html    la connexion
├── motdepasse.html   le changement de mot de passe
├── app.html          l'application, accessible seulement connecté
└── config.js         le seul fichier à modifier
```

---

## Essayer tout de suite (0 min)

Le site est livré en **mode test** : il fonctionne sans rien installer.

| | |
|---|---|
| Identifiant | `admin@trakz.fr` |
| Mot de passe | `Trakz2026` |

Ouvre `index.html`, clique sur **Se connecter**, entre ces identifiants, et tu arrives dans l'application. Tu peux changer l'adresse et le mot de passe en haut de `config.js`, et en ajouter d'autres.

**Ce mode ne protège rien.** Les identifiants sont écrits dans `config.js`, que n'importe qui peut ouvrir depuis son navigateur. Un bandeau orange s'affiche sur toutes les pages tant qu'il est actif — c'est fait pour que tu ne l'oublies pas.

Il sert à deux choses : essayer le parcours complet, et montrer le site à quelqu'un. Pour vendre, il faut passer aux vraies étapes ci-dessous.

---

## 1. Créer la base de comptes (15 min)

1. Va sur **supabase.com**, crée un compte gratuit, puis un projet.
   Note bien le mot de passe de base de données qu'il te demande, tu ne le reverras pas.
2. Le projet met deux minutes à démarrer.
3. Va dans **Project Settings → API** et copie deux valeurs :
   - **Project URL** (ressemble à `https://abcdefgh.supabase.co`)
   - la clé **anon public** (longue chaîne qui commence par `ey…`)

Ces deux valeurs sont publiques par conception : elles ne donnent accès à rien sans un compte valide.
**Ne copie jamais la clé `service_role`** dans `config.js` — celle-là donne tous les droits.

---

## 2. Fermer les inscriptions libres — l'étape à ne pas rater

Par défaut, **n'importe qui peut se créer un compte sur ton projet Supabase**. Sans cette étape, ton paywall ne sert à rien : il suffirait de s'inscrire pour accéder à l'appli gratuitement.

Dans Supabase : **Authentication → Sign In / Providers → Email**, et désactive l'inscription libre (*Allow new users to sign up*). Enregistre.

À partir de là, seuls les comptes que **tu** crées peuvent se connecter.

Pendant que tu y es, dans **Authentication → URL Configuration** :
- *Site URL* : l'adresse de ton site (ex. `https://tonsite.netlify.app`)
- *Redirect URLs* : ajoute `https://tonsite.netlify.app/motdepasse.html`

Sans ça, le lien « mot de passe oublié » renverra vers une page qui n'existe pas.

---

## 3. Remplir `config.js`

Ouvre `config.js` dans n'importe quel éditeur de texte et complète :

```js
nom:          "Trakz",              // le nom de ton produit
prix:         "29",
email:        "ton@adresse.fr",
lienPaiement: "",                    // à remplir à l'étape 5
supabaseUrl:  "https://abcdefgh.supabase.co",
supabaseKey:  "eyJhbGciOi…"
```

Le nom et le prix ne sont écrits qu'ici : ils se propagent sur tout le site.

---

## 4. Mettre le site en ligne (5 min)

1. Va sur **netlify.com/drop**
2. Glisse **le dossier `site` entier** (pas les fichiers un par un)
3. Tu obtiens une adresse du type `nom-au-hasard.netlify.app`

Reviens ensuite dans Supabase compléter les URL de l'étape 2 avec cette adresse.

**Pour les mises à jour :** crée un compte Netlify gratuit et rattache le site. Tu pourras alors déposer une nouvelle version dans l'onglet **Deploys**, et l'adresse ne changera pas — tes clients recevront la mise à jour sans rien faire. Si tu redéposes sur *Drop*, tu crées un nouveau site avec une nouvelle adresse, et tes clients resteront sur l'ancienne.

---

## 5. Encaisser

Le plus simple pour démarrer : un **lien de paiement Stripe** (Stripe → Payment Links), ou une page **Gumroad** ou **Payhip**. Aucun code à écrire : tu crées le lien, tu le colles dans `lienPaiement`.

Ces plateformes gèrent la TVA et t'envoient un e-mail à chaque vente.

---

## 6. Créer un compte après chaque vente (30 secondes)

Tant que tu as peu de clients, fais-le à la main. C'est plus rapide que d'automatiser, et tu gardes le contrôle.

Dans Supabase : **Authentication → Users → Add user**
- l'adresse e-mail de l'acheteur
- un mot de passe provisoire
- coche *Auto Confirm User* (sinon il devra confirmer son adresse avant de pouvoir entrer)

Puis envoie-lui un e-mail :

> Bonjour,
>
> Voici votre accès :
> Adresse du site : https://tonsite.netlify.app
> Identifiant : [son e-mail]
> Mot de passe provisoire : [le mot de passe]
>
> À la première connexion, changez-le depuis « Mot de passe oublié » sur la page de connexion.
>
> Sur téléphone : ouvrez le lien, puis Partager → « Sur l'écran d'accueil » pour avoir une vraie icône d'application.

**Pour couper un accès** (remboursement, partage abusif) : Authentication → Users → supprimer l'utilisateur. L'accès tombe immédiatement.

### Ton tableau de bord

C'est **Authentication → Users** dans Supabase qui te sert d'administration : la liste de tes clients, leur date de dernière connexion, la création, la réinitialisation de mot de passe et la suppression. Rien à coder, c'est inclus.

N'essaie pas d'ajouter une page d'administration sur ton propre site : elle demanderait la clé `service_role`, qui donne tous les droits sur ta base. Placée dans une page web, cette clé est lisible par tout le monde — n'importe qui pourrait effacer tes comptes. Le tableau de bord Supabase est le bon outil, et il est protégé par ton propre mot de passe.

Quand tu dépasseras une vingtaine de ventes par mois, on automatisera avec un webhook de paiement.

---

## Ce que ce système protège, et ce qu'il ne protège pas

**Il protège :** l'accès. Sans compte, on ne passe pas la page de connexion. Tu peux couper un accès à tout moment. Chaque acheteur a son identifiant, et son adresse apparaît en filigrane sur les guides.

**Il ne protège pas :** le fichier lui-même. `app.html` est servi par un hébergement statique — quelqu'un de déterminé, connecté une fois, peut enregistrer la page et la relancer plus tard hors ligne. Le filigrane à son nom reste dessus.

C'est le même arbitrage que pour les guides : **traçable plutôt qu'inviolable**. Rendre le fichier réellement impossible à récupérer demanderait de le servir depuis un serveur qui vérifie la session à chaque chargement — c'est faisable plus tard, quand le volume le justifiera.

---

## Deux pièges du plan gratuit Supabase

**Le projet se met en pause après 7 jours sans aucune activité.** Tes clients ne pourraient plus se connecter jusqu'à ce que tu le relances à la main depuis le tableau de bord. Tant que tu as peu d'utilisateurs, connecte-toi une fois par semaine — ça suffit à le garder éveillé.

**Les e-mails de réinitialisation** partent avec un quota limité et depuis une adresse Supabase. Si un client dit ne rien recevoir, fais-lui vérifier ses indésirables, ou change son mot de passe toi-même depuis le tableau de bord.

---

## Avant d'ouvrir à la vente

- [ ] **`modeTest` repassé à `false`** *(sinon les identifiants sont publics)*
- [ ] Inscriptions libres désactivées *(sinon tout le reste ne sert à rien)*
- [ ] URL de redirection renseignées dans Supabase
- [ ] `config.js` complété
- [ ] Testé de bout en bout : compte créé, connexion, application, déconnexion
- [ ] Testé « mot de passe oublié » sur ta propre adresse
- [ ] Lien de paiement en place et testé
- [ ] Mentions légales et conditions de vente ajoutées au site
- [ ] Statut d'entreprise en règle — tu vends un produit, les règles du guide fiscal s'appliquent à toi aussi
