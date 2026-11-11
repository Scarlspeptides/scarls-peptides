# Scarl’s Admin iOS V1
Prototype SwiftUI privé.

Fonctions déjà préparées : inventaire avec stock actuel, +/- manuel, scanner QR/EAN/Code128, historique local, écrans Site/Équipe et Face ID.

## Ouvrir dans Xcode
Créez un projet iOS App nommé ScarlsAdmin (SwiftUI), puis remplacez les fichiers Swift par ceux du dossier ScarlsAdmin.
Ajoutez NSCameraUsageDescription = "Scanner les références pour gérer l’inventaire."
Ajoutez NSFaceIDUsageDescription = "Protéger l’accès à Scarl’s Admin."

## Étape suivante avant TestFlight
Ajouter un backend authentifié pour les comptes associés, la synchronisation multi-iPhone et les publications GitHub. Ne jamais placer un token GitHub dans l’application.
La signature/TestFlight nécessite le compte Apple Developer du propriétaire.
