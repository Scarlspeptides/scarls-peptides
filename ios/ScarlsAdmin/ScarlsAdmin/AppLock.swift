import SwiftUI
import LocalAuthentication
import Combine

@MainActor final class AppLock: ObservableObject {
 @Published private(set) var unlocked = false
 @Published private(set) var authenticating = false
 @Published var message: String?
 private var context: LAContext?
 private var attempt = UUID()
 func lock() {
  attempt = UUID()
  context?.invalidate()
  context = nil
  unlocked = false
  authenticating = false
 }
 func unlock() async {
  guard !unlocked, !authenticating else { return }
  let id = UUID()
  attempt = id
  let context = LAContext()
  self.context = context
  context.localizedCancelTitle = "Annuler"
  var error: NSError?
  guard context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) else {
   message = "Configurez Face ID ou un code de verrouillage dans les réglages de l’iPhone."
   return
  }
  authenticating = true
  message = nil
  do {
   let success = try await context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: "Déverrouiller Scarl’s Admin")
   guard attempt == id else { return }
   unlocked = success
  } catch {
   guard attempt == id else { return }
   message = "Accès verrouillé. Réessayez pour ouvrir votre espace de gestion."
  }
  if attempt == id { authenticating = false; self.context = nil }
 }
}

struct LockedRootView: View {
 @Environment(\.scenePhase) private var phase
 @EnvironmentObject private var store: InventoryStore
 @StateObject private var lock = AppLock()
 var body: some View {
  ZStack {
   if lock.unlocked {
    ContentView().environmentObject(lock)
     .alert("Sauvegarde", isPresented: Binding(get: { store.storageError != nil }, set: { if !$0 { store.storageError = nil } })) {
      Button("OK") { store.storageError = nil }
     } message: { Text(store.storageError ?? "") }
   } else {
    VStack(spacing: 24) {
     Image(systemName: "lock.shield.fill").font(.system(size: 60)).foregroundStyle(.purple)
     Text("Scarl’s Admin").font(.largeTitle.bold())
     Text("Déverrouillez avec Face ID ou le code de votre iPhone.").multilineTextAlignment(.center)
     Button("Déverrouiller") { Task { await lock.unlock() } }
      .buttonStyle(.borderedProminent).disabled(lock.authenticating || phase != .active)
     if let message = lock.message { Text(message).font(.footnote).multilineTextAlignment(.center) }
    }.padding()
   }
   if phase != .active {
    Color(.systemBackground).ignoresSafeArea()
    Label("Scarl’s Admin verrouillé", systemImage: "lock.fill")
   }
  }
  .onChange(of: phase) { _, next in
   if next == .background { lock.lock() }
  }
 }
}
