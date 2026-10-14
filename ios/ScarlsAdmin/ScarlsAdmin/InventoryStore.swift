import Foundation
import Combine
@MainActor final class InventoryStore: ObservableObject {
 @Published var products:[Product] = [
 .init(name:"GHK-Cu",quantity:20,code:"SCARLS-GHKCU"),.init(name:"MOTS-C",quantity:17,code:"SCARLS-MOTSC"),
 .init(name:"Semax",quantity:18,code:"SCARLS-SEMAX"),.init(name:"Selank",quantity:15,code:"SCARLS-SELANK"),
 .init(name:"Glutathion",quantity:20,code:"SCARLS-GLUTATHION"),.init(name:"NAD+",quantity:20,code:"SCARLS-NAD"),
 .init(name:"L-Carnitine",quantity:9,code:"SCARLS-LCARNITINE"),.init(name:"KLOW",quantity:8,code:"SCARLS-KLOW"),
 .init(name:"Epitalon",quantity:7,code:"SCARLS-EPITALON"),.init(name:"Retatrutide",quantity:7,code:"SCARLS-RETATRUTIDE"),
 .init(name:"CJC no DAC + Ipamorelin",quantity:6,code:"SCARLS-CJCIPA"),.init(name:"DSIP",quantity:5,code:"SCARLS-DSIP"),
 .init(name:"Melanotan I",quantity:5,code:"SCARLS-MELANOTAN1")]
 @Published var movements:[StockMovement]=[]

 @Published var storageError: String?
 private let fileURL: URL
 private var loadFailed = false
 private struct Snapshot: Codable {
  var products: [Product]
  var movements: [StockMovement]
 }
 init(fileURL: URL? = nil) {
  self.fileURL = fileURL ?? FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent("ScarlsAdmin/inventory.json")
  if FileManager.default.fileExists(atPath: self.fileURL.path) {
   do {
    let saved = try JSONDecoder().decode(Snapshot.self, from: Data(contentsOf: self.fileURL))
    guard saved.products.allSatisfy({ $0.quantity >= 0 }), Set(saved.products.map(\.id)).count == saved.products.count else { throw CocoaError(.fileReadCorruptFile) }
    products = saved.products
    movements = saved.movements
   } catch {
    loadFailed = true
    storageError = "Impossible de lire la sauvegarde. Les modifications sont bloquées pour préserver vos données. \(error.localizedDescription)"
   }
  }
 }
 func change(_ p: Product, by delta: Int) {
  guard !loadFailed else { return }
  guard let i = products.firstIndex(where: { $0.id == p.id }) else { return }
  let (sum, overflow) = products[i].quantity.addingReportingOverflow(delta)
  guard !overflow else { return }
  let quantity = max(0, sum)
  let actualDelta = quantity - products[i].quantity
  guard actualDelta != 0 else { return }
  var nextProducts = products
  nextProducts[i].quantity = quantity
  var nextMovements = movements
  nextMovements.insert(.init(product: p.name, delta: actualDelta, user: "Admin"), at: 0)
  do {
   let data = try JSONEncoder().encode(Snapshot(products: nextProducts, movements: nextMovements))
   try FileManager.default.createDirectory(at: fileURL.deletingLastPathComponent(), withIntermediateDirectories: true)
   #if os(iOS)
   try data.write(to: fileURL, options: [.atomic, .completeFileProtection])
   #else
   try data.write(to: fileURL, options: .atomic)
   #endif
   products = nextProducts
   movements = nextMovements
   storageError = nil
  } catch {
   storageError = "Modification non enregistrée : \(error.localizedDescription)"
  }
 }
 func product(for code: String) -> Product? {
  products.first { $0.code.caseInsensitiveCompare(code) == .orderedSame }
 }
}
