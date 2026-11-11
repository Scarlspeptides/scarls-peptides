import Foundation

@main struct PersistenceChecks {
 @MainActor static func main() throws {
  let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
  let url = root.appendingPathComponent("inventory.json")
  defer { try? FileManager.default.removeItem(at: root) }
  let first = InventoryStore(fileURL: url)
  let product = first.products[0]
  first.change(product, by: -2)
  precondition(first.storageError == nil)
  let next = InventoryStore(fileURL: url)
  precondition(next.products[0].quantity == product.quantity - 2)
  precondition(next.movements.count == 1 && next.movements[0].delta == -2)
  precondition(next.movements[0].id == first.movements[0].id)
  precondition(next.movements[0].date == first.movements[0].date)
  next.change(next.products[0], by: -100)
  precondition(next.products[0].quantity == 0)
  precondition(next.movements[0].delta == -(product.quantity - 2))
  let count = next.movements.count
  next.change(next.products[0], by: -1)
  precondition(next.movements.count == count)
  try Data("broken".utf8).write(to: url)
  let corrupt = InventoryStore(fileURL: url)
  precondition(corrupt.storageError != nil)
  corrupt.change(corrupt.products[0], by: 1)
  let preserved = try String(contentsOf: url, encoding: .utf8)
  precondition(preserved == "broken")
  let blocker = root.appendingPathComponent("not-a-directory")
  try Data().write(to: blocker)
  let failed = InventoryStore(fileURL: blocker.appendingPathComponent("inventory.json"))
  let old = failed.products[0].quantity
  failed.change(failed.products[0], by: 1)
  precondition(failed.storageError != nil)
  precondition(failed.products[0].quantity == old && failed.movements.isEmpty)
  print("PASS: restart persistence, stable history, zero clamp, corruption protection, failed-write rollback")
 }
}
