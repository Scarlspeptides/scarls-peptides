import SwiftUI
struct SiteView: View {
 @EnvironmentObject private var store: InventoryStore
 @StateObject private var connection = SiteConnection()
 @State private var confirmPublish = false
 var body: some View {
  NavigationStack {
   Form {
    Section("Site Scarl’s") {
     Link("Ouvrir le site", destination: URL(string: "https://scarlspeptides.github.io/scarls-peptides/")!)
     Link("Dépôt GitHub", destination: URL(string: "https://github.com/Scarlspeptides/scarls-peptides")!)
    }
    Section("Connexion privée") {
     TextField("https://votre-serveur.workers.dev", text: $connection.address).textInputAutocapitalization(.never).autocorrectionDisabled().keyboardType(.URL)
     SecureField("Clé privée du serveur", text: $connection.token).textInputAutocapitalization(.never).autocorrectionDisabled()
     Button("Enregistrer la connexion") { connection.configure() }.disabled(connection.busy)
     Text("La clé GitHub reste sur le serveur. Seule la clé d’accès à votre serveur est conservée dans le trousseau de cet iPhone.").font(.footnote)
    }
    Section("Publication du stock") {
     Button("Charger le stock du site") { Task { await connection.load() } }.disabled(connection.busy)
     if let remote = connection.remote {
      ForEach(store.products) { product in
       LabeledContent(product.name, value: "Site : \(remote.stock[product.name].map(String.init) ?? "—") · iPhone : \(product.quantity)")
      }
      Button("Publier le stock de l’iPhone") { confirmPublish = true }.disabled(connection.busy)
     }
     if connection.busy { ProgressView() }
     Text(connection.status).font(.footnote)
     Text("Vérifiez les différences avant publication : le stock de l’iPhone remplacera celui du site. Les changements distants intervenus entre-temps bloquent la publication.").font(.footnote).foregroundStyle(.secondary)
    }
   }.navigationTitle("Site")
    .confirmationDialog("Publier les quantités affichées sur le site public ?", isPresented: $confirmPublish, titleVisibility: .visible) {
     Button("Publier le stock") { Task { await connection.publish(store.products) } }
     Button("Annuler", role: .cancel) {}
    }
  }
 }
}
