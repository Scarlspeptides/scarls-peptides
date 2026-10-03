# Réception des commandes clients WhatsApp — prototype privé

Ce service conserve les nouveaux messages reçus sur un numéro WhatsApp Business Platform connecté. Il ne se connecte pas par QR code, n'importe pas l'historique existant et n'envoie aucun message au client. Il n'a pas encore été déployé ni relié au compte du propriétaire.

## Activation nécessaire

1. Configurer le numéro du propriétaire dans WhatsApp Business Platform. Pour conserver l'application Business et le même numéro, vérifier l'éligibilité à la coexistence auprès du parcours de connexion choisi avant toute migration.
2. Héberger `server.py` avec Python 3.12 et un reverse proxy HTTPS. Le processus écoute uniquement sur `127.0.0.1:8080`. Fournir un stockage SQLite persistant, des sauvegardes protégées et une supervision. Configurer le proxy pour limiter les tailles et délais de requêtes. Ne pas journaliser les paramètres de vérification ni l'en-tête Authorization.
3. Fournir les variables d'environnement suivantes dans le gestionnaire de secrets de l'hébergement :
   - `META_APP_SECRET` : secret de l'application Meta, uniquement sur le serveur.
   - `WEBHOOK_VERIFY_TOKEN` : secret aléatoire de vérification choisi pour ce service.
   - `INBOX_ACCESS_TOKEN` : autre secret aléatoire long, destiné à cet iPhone.
   - `WHATSAPP_PHONE_NUMBER_ID` : identifiant du numéro connecté, pas le numéro de téléphone.
   - `INBOX_DB` : chemin absolu vers le fichier SQLite sur le volume persistant.
   - `PORT` : facultatif, 8080 par défaut.
4. Lancer `python3 server.py`. Dans la configuration Meta, déclarer `https://votre-service/webhook`, le jeton de vérification, et souscrire aux événements `messages` du compte WhatsApp Business concerné.
5. Dans l'appli, ouvrir Commandes → Commandes clients → Connexion WhatsApp Business. Renseigner `https://votre-service/api/inbox` et `INBOX_ACCESS_TOKEN`. La clé est stockée dans le trousseau iOS, le secret Meta reste sur le serveur.
6. Effectuer un test avec un message client de test, vérifier l'arrivée, corriger les lignes puis valider. Vérifier l'historique et le stock avant un usage réel.

Ne pas transmettre les secrets Meta dans une conversation. La connexion et les éventuels frais de plateforme restent à configurer par le propriétaire dans son compte.

## Comportement exact de cette version

- Tous les messages entrants créent des brouillons « À valider », y compris les messages qui ne sont pas des commandes. L'administrateur refuse les messages hors commande.
- Les lignes explicites `2 x Retatrutide` ou `2 Retatrutide` sont proposées si le nom correspond exactement au catalogue. Une ligne par produit. Pas d'interprétation libre, de rapprochement entre dosages, de calcul de prix, ni d'extraction automatique d'adresse.
- Le message d'origine, le nom transmis par WhatsApp et le numéro sont visibles. Pour les images, audios ou autres formats, un rappel invite à consulter WhatsApp et saisir les lignes manuellement ; le fichier joint n'est pas téléchargé.
- Lecture automatique toutes les 30 secondes pendant que l'application est active, quel que soit l'onglet, plus actualisation manuelle. Pas de notification push, de tâche permanente en arrière-plan ni d'agent ChatGPT qui surveille le compte.
- Déduplication par identifiant WhatsApp sur le serveur et l'iPhone ; pagination des messages par lots de 100. Les brouillons ne modifient pas le stock.
- La validation demande confirmation, vérifie le stock de toutes les lignes (y compris les doublons de produits), puis déduit le stock et ajoute l'historique local. Une commande validée ne peut pas être validée une deuxième fois. Refuser ou modifier ne déduit rien.
- Les décisions et le stock restent locaux. Le serveur contient une boîte de réception, pas une base de commandes partagée. Utiliser un seul iPhone administrateur : plusieurs appareils pourraient approuver le même message séparément.
- Garder la même base SQLite et la même connexion configurée ; le curseur local n'est pas destiné à alterner entre serveurs. La restauration/synchronisation entre appareils reste à développer.

## Vérifications

`python3 -m unittest discover -s WhatsAppBridge -v` depuis le dossier principal : 5 tests couvrent vérification Meta, authentification de lecture, signature des messages, doublons, mauvais numéro, médias, payload invalide et pagination.

Les sources SwiftUI n'ont pas été compilées dans cet environnement : vérifier dans Xcode sur Mac, avec iOS 16 minimum. Aucun .ipa ni projet Xcode complet n'est livré. Ce pont est un prototype de connexion à finaliser et tester avec le compte réel avant utilisation quotidienne.


## Stock partagé avec GitHub — peut fonctionner avant WhatsApp

Ce module est préparé, pas encore hébergé. `stock_sync.py` lit et met à jour `stock.json` dans `Scarlspeptides/scarls-peptides` sur la branche `main`. Ajouter les variables serveur :

- `GITHUB_STOCK_TOKEN` : token GitHub limité à ce dépôt, permission Contents en lecture/écriture. À fournir uniquement dans les secrets de l'hébergement.
- `GITHUB_STOCK_REPOSITORY=Scarlspeptides/scarls-peptides` et `GITHUB_STOCK_BRANCH=main`.
- `INBOX_ACCESS_TOKEN` : clé aléatoire longue utilisée par l'appli pour le service privé.
- `HOST=0.0.0.0` sur un hébergement géré comme Render ; conserver 127.0.0.1 derrière un proxy local.

Les variables Meta peuvent rester absentes pour synchroniser uniquement les stocks. `/health` est public et n'affiche aucune donnée. `/api/stock` (GET) et `/api/stock/movements` (POST) nécessitent la clé privée.

Dans l'appli : Plus → Stock partagé, URL `https://votre-service/api/stock`, clé `INBOX_ACCESS_TOKEN`. La connexion adopte le stock du site comme référence, sans additionner les anciens chiffres de démonstration de l'app. Les références avec dosage distinct restent séparées.

Les scans, changements manuels, réceptions et commandes validées envoient un mouvement avant de confirmer le changement local. Les mouvements ont un identifiant persistant ; la quantité et le reçu de cet identifiant sont écrits dans la même mise à jour GitHub. Un retry après une réponse perdue ne déduit rien une deuxième fois. Le serveur vérifie toute la commande avant d'écrire et relit le stock après un conflit concurrent. Le journal `__scarls_sync` dans stock.json ne contient ni noms de clients, ni téléphones, ni messages. Ne pas effacer ce journal : il protège les reprises.

Le site GitHub Pages affiche les nouveaux stocks après son déploiement, puis son actualisation périodique ou sa vérification avant export. Ce n'est pas une réservation instantanée depuis un panier : le site reste une sélection informative, et le stock est déduit à la validation de la commande dans l'app. Les brouillons, réceptions fournisseurs et historiques restent locaux ; seules les quantités sont partagées.

Si le réseau échoue, l'opération reste en attente dans l'app et bloque les nouveaux mouvements jusqu'à sa reprise. Une réponse de refus 400/409 ne change pas le stock local. Stock → Stock partagé permet de réessayer ou de corriger la clé. Aucun secret GitHub ne doit être placé dans l'application.

13 tests Python passent, dont 8 sur le stock partagé : batch refusé sans changement partiel, rupture, reprise sans double déduction, id réutilisé incorrectement et conflit concurrent. La compilation et les tests réels de l'app restent à effectuer sur Mac/iPhone.

Une offre d'hébergement gratuite qui suspend le service peut imposer un délai de redémarrage. Le stock et les reçus restent dans GitHub. L'inbox SQLite, si WhatsApp est ajouté plus tard, exige en revanche un stockage persistant : ne pas activer WhatsApp sur un disque éphémère.
