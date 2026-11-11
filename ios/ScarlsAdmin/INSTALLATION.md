# ScarlsAdmin — version avec sauvegarde et verrouillage

## Fonctionne dans le projet préparé
- Stock et historique sauvegardés à chaque modification, avant validation de l’écran.
- Fichier écrit atomiquement avec protection des données iOS ; une erreur de lecture bloque les modifications pour préserver la sauvegarde.
- Verrouillage global avec Face ID ou le code de l’iPhone, à l’ouverture et après passage en arrière-plan. Contenu masqué pendant l’inactivité.
- Comparaison du stock local et distant, publication explicite via serveur privé, conflits de version bloqués.
- Clé du serveur conservée dans le trousseau de l’iPhone, sans synchronisation vers d’autres appareils. Aucune clé GitHub dans l’app.

## Activation du serveur — pas encore déployé
Le dossier server contient un Cloudflare Worker limité à stock.json du dépôt Scarlspeptides/scarls-peptides, branche main. Il ne permet pas d’éditer du code ou de choisir un autre dépôt.

1. Le propriétaire doit créer un compte Cloudflare et s’y connecter.
2. Déployer server/worker.mjs comme Worker, avec server/wrangler.toml.
3. Dans les secrets du Worker, ajouter GITHUB_TOKEN : un jeton GitHub à permissions fines, limité au dépôt scarls-peptides, permission Contents: Read and write, avec expiration.
4. Générer une clé aléatoire de 32 octets minimum (encodée en base64url, au moins 43 caractères). La conserver comme secret ADMIN_API_TOKEN dans le Worker et dans un gestionnaire de mots de passe. Cette clé donne un accès administrateur au stock ; ne pas la partager aux associés.
5. Dans l’onglet Site de l’app, renseigner l’adresse HTTPS du Worker et ADMIN_API_TOKEN. Ne jamais y entrer GITHUB_TOKEN.
6. Enregistrer, charger le stock distant, vérifier les différences, puis publier explicitement. La publication crée un commit de stock.json ; le délai d’affichage dépend du déploiement GitHub Pages.

Aucun secret réel n’a été créé, téléchargé ou publié pendant la préparation. Aucun compte hébergeur n’était disponible.

Documentation : https://developers.cloudflare.com/workers/configuration/secrets/

## Installation sur iPhone
1. Dans Xcode > cible ScarlsAdmin > Signing & Capabilities > Add Account…, connectez votre compte Apple directement dans Xcode.
2. Sélectionnez votre équipe et laissez Automatically manage signing activé.
3. Branchez et déverrouillez l’iPhone, acceptez la connexion de confiance et activez le mode développeur si demandé.
4. Choisissez l’iPhone comme destination puis lancez avec ▶︎.

Identifiant : com.nathansouffir.ScarlsAdmin. Version minimale : iOS 17.0.

## TestFlight — bloqué par l’inscription Apple
Le propriétaire doit s’inscrire au programme Apple Developer et accomplir le paiement et les accords Apple lui-même. Ensuite : configurer la signature, créer l’app dans App Store Connect, archiver dans Xcode, valider et transférer l’archive, puis configurer le groupe de testeurs. Les tests externes peuvent nécessiter la revue Apple.

## Vérifications effectuées
- Compilation iOS sans signature réussie.
- Tests de persistance : rechargement, identité/date de l’historique, stock plancher zéro, sauvegarde corrompue préservée, échec d’écriture sans validation en mémoire.
- Tests du serveur avec GitHub simulé : authentification, validation, conflit, catalogue autorisé, écriture, absence d’écriture inutile et limite de taille.
- À effectuer après activation : Face ID et scanner sur iPhone, publication réelle et contrôle du site, signature et TestFlight.

## Limites restantes
Cette connexion publie les quantités seulement. Elle n’importe pas automatiquement le stock distant et ne synchronise pas plusieurs iPhone. Les invitations, comptes associés, modifications de textes et d’images restent à développer. Le verrouillage Face ID est local ; la clé serveur doit être protégée et peut être révoquée en changeant ADMIN_API_TOKEN.
