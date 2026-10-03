import Foundation
struct Product: Identifiable, Hashable, Codable {
 var id: String { name }
 let name: String
 var quantity: Int
 let code: String
}
struct StockMovement: Identifiable, Codable {
 var id = UUID()
 var date = Date()
 let product: String
 let delta: Int
 let user: String
}
