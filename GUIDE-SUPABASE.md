# Mettre Supabase en place

Onze étapes, dans l'ordre. Compte 20 à 30 minutes la première fois.
Ne saute aucune étape, surtout la 6.

---

## Étape 1 — Créer le compte

1. Va sur **supabase.com**
2. Clique **Start your project**
3. Inscris-toi (avec GitHub ou avec ton adresse e-mail)
4. Confirme ton adresse si on te le demande

---

## Étape 2 — Créer le projet

1. Clique **New project**
2. Remplis :
   - **Name** : `trakz` (ou ce que tu veux)
   - **Database Password** : clique sur *Generate a password* et **copie-le dans tes notes**. Tu ne le reverras plus. Tu n'en auras pas besoin pour le site, mais tu le regretteras si tu en as besoin un jour.
   - **Region** : choisis l'Europe (`Frankfurt` ou `Paris` si proposé)
   - **Plan** : Free
3. Clique **Create new project**
4. **Attends 2 à 3 minutes** que le projet démarre. Ne fais rien pendant ce temps.

---

## Étape 3 — Récupérer les deux valeurs

1. En bas à gauche, clique sur l'engrenage **Settings**
2. Dans le menu, clique **API Keys** (parfois écrit simplement **API**)

Tu cherches deux choses :

**a) L'adresse du projet.** Elle ressemble à `https://abcdefghijkl.supabase.co`
Selon la version, elle est appelée **Project URL** et se trouve dans *Settings → API*, ou dans le bouton **Connect** en haut de l'écran.

**b) La clé publique.** Deux cas de figure :

| Ce que tu vois | Quoi prendre |
|---|---|
| Un onglet **Publishable key** | la clé qui commence par `sb_publishable_` |
| Seulement **Project API keys** | la clé nommée **anon** / **public**, qui commence par `eyJ` |

Les deux fonctionnent. Si tu vois un bouton *Create new API keys*, tu peux cliquer dessus sans risque, ou rester sur l'ancienne clé.

> **Jamais la clé `service_role` ni `secret`.** Celle-là donne tous les droits sur ta base. Collée dans une page web, n'importe qui pourrait effacer tes comptes.

Copie ces deux valeurs quelque part, tu en as besoin à l'étape suivante.

---

## Étape 4 — Remplir `config.js`

Ouvre `config.js` avec un éditeur de texte (Bloc-notes, TextEdit, ou l'éditeur de ton téléphone).

Modifie **trois lignes** :

```js
  modeTest: false,                                    // ← passe à false

  supabaseUrl: "https://abcdefghijkl.supabase.co",    // ← ton adresse
  supabaseKey: "sb_publishable_xxxxx"                 // ← ta clé publique
```

Garde bien les guillemets et les virgules.

---

## Étape 5 — Renseigner les adresses de retour

Dans Supabase : **Authentication** → **URL Configuration**

- **Site URL** : l'adresse de ton site, sans barre oblique à la fin
  `https://marvelous-gelato-eafb40.netlify.app`
- **Redirect URLs** : clique *Add URL* et ajoute
  `https://marvelous-gelato-eafb40.netlify.app/motdepasse.html`

Clique **Save**.

Sans ça, le lien « mot de passe oublié » renverra tes clients vers une page inexistante.

---

## Étape 6 — Fermer les inscriptions libres

**C'est l'étape la plus importante. Si tu la sautes, n'importe qui pourra se créer un compte gratuitement et ton produit sera accessible à tous.**

Dans Supabase : **Authentication** → **Sign In / Providers** (ou **Providers**) → clique sur **Email**

Cherche l'interrupteur **Allow new users to sign up** et **désactive-le**.
Il peut aussi s'appeler *Enable sign ups* ou *Allow signups*.

Clique **Save**.

À partir de là, seuls les comptes que **tu** crées peuvent se connecter.

---

## Étape 7 — Créer ton propre compte

Dans Supabase : **Authentication** → **Users** → bouton **Add user** → **Create new user**

- **Email** : ton adresse
- **Password** : celui que tu veux
- **Coche « Auto Confirm User »** — sinon tu devras confirmer par e-mail avant de pouvoir entrer

Clique **Create user**.

---

## Étape 8 — Remettre le site en ligne

1. Va sur **app.netlify.com**, ouvre ton site
2. Onglet **Deploys**
3. Glisse le dossier complet dans la zone de dépôt

L'adresse ne change pas, la nouvelle version remplace l'ancienne.

---

## Étape 9 — Vider le cache et tester

Sur téléphone, **ferme complètement l'onglet** avant de rouvrir l'adresse, sinon l'ancien `config.js` reste en mémoire.

1. Ouvre `ton-site.netlify.app/verifier.html`
   Tout doit être vert, et le bandeau orange doit avoir disparu.
2. Va sur `ton-site.netlify.app/connexion`
3. Connecte-toi avec le compte créé à l'étape 7

---

## Étape 10 — Vérifier que la porte est bien fermée

Un test qui prend trente secondes et qui vaut la peine :

1. Ouvre ton site dans une **fenêtre de navigation privée**
2. Va directement sur `ton-site.netlify.app/app.html`
3. Tu dois être renvoyé vers la page de connexion

Si tu accèdes à l'application sans te connecter, c'est que `modeTest` est resté à `true` ou que le fichier n'a pas été remplacé.

---

## Étape 11 — Vendre

Après chaque vente, **Authentication → Users → Add user** avec l'adresse de l'acheteur et un mot de passe provisoire, *Auto Confirm User* coché.

Puis envoie-lui :

> Bonjour,
>
> Voici votre accès :
> Site : https://ton-site.netlify.app
> Identifiant : [son adresse]
> Mot de passe provisoire : [le mot de passe]
>
> À la première connexion, changez-le avec « Mot de passe oublié » sur la page de connexion.
>
> Sur téléphone : ouvrez le lien, puis Partager → « Sur l'écran d'accueil » pour avoir une vraie icône d'application.

**Pour couper un accès** : Authentication → Users → les trois points à droite de la ligne → *Delete user*. L'accès tombe immédiatement.

---

## Si ça ne marche pas

| Ce que tu vois | Ce que ça veut dire |
|---|---|
| « Adresse ou mot de passe incorrect » | Le compte n'existe pas dans Supabase, ou le mot de passe diffère. Recrée-le à l'étape 7. |
| « Ton adresse n'est pas encore confirmée » | Tu as oublié de cocher *Auto Confirm User*. Supprime l'utilisateur et recrée-le. |
| « config.js n'a pas été chargé » | Le fichier n'est pas en ligne. Redépose le dossier entier. |
| Le bandeau orange est toujours là | `modeTest` est resté à `true`, ou le cache n'a pas été vidé. |
| Rien ne se passe au clic | Vide le cache et recharge. Si ça persiste, dis-le-moi. |
| « Failed to fetch » ou erreur réseau | L'adresse du projet est mal copiée, ou le projet Supabase est en pause. |

---

## Étape 12 — Recevoir les e-mails de l'essai gratuit

La démo (`appli-vinted-demo.html`) demande une adresse e-mail avant de démarrer l'essai de trois jours. Pour que ces adresses arrivent quelque part, crée une table dédiée :

1. Dans Supabase : **SQL Editor** → **New query**
2. Colle ceci et clique **Run** :

```sql
create table if not exists public.essais_gratuits (
  id bigint generated by default as identity primary key,
  email text not null,
  cree_le timestamptz not null default now()
);

alter table public.essais_gratuits enable row level security;

create policy "Autoriser l'inscription anonyme"
  on public.essais_gratuits
  for insert
  to anon
  with check (true);
```

C'est tout. La clé publique du site peut désormais **ajouter** une ligne, mais ne peut **rien lire** : les adresses restent visibles seulement par toi, dans **Table Editor → essais_gratuits**.

Si tu sautes cette étape, la démo continue de fonctionner normalement (l'essai démarre quand même) — les adresses sont simplement perdues, l'échec est silencieux.

Pour exporter la liste plus tard : **Table Editor → essais_gratuits → Export → CSV**.

---

## Le piège du plan gratuit

Un projet Supabase **sans aucune activité pendant 7 jours se met en pause**. Tes clients ne peuvent alors plus se connecter jusqu'à ce que tu le relances à la main depuis le tableau de bord.

Tant que tu as peu d'utilisateurs, connecte-toi une fois par semaine. Ça suffit à le garder éveillé.
