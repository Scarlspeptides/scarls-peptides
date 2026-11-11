import SwiftUI
struct TeamView: View {
 @EnvironmentObject private var lock: AppLock
 var body: some View {
  NavigationStack {
   Form {
    Section("Sécurité") {
     Label("Application déverrouillée", systemImage: "lock.open.fill")
     Text("Face ID ou le code de l’iPhone protège l’accès. L’application se verrouille à chaque passage en arrière-plan.")
     Button("Verrouiller maintenant") { lock.lock() }
    }
    Section("Accès") {
     LabeledContent("Vous", value: "Admin local")
     Text("Les comptes associés et les invitations nécessitent un serveur d’authentification.").font(.footnote)
    }
   }.navigationTitle("Équipe")
  }
 }
}
