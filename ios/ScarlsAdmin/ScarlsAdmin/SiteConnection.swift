import Foundation
import Security
import Combine

struct RemoteStock: Codable {
 let stock: [String: Int]
 let sha: String
}

@MainActor final class SiteConnection: ObservableObject {
 @Published var address = UserDefaults.standard.string(forKey: "adminServerURL") ?? ""
 @Published var token = ""
 @Published var remote: RemoteStock?
 @Published var status = "Serveur privé à configurer."
 @Published var busy = false
 private let service = "com.nathansouffir.ScarlsAdmin.server"
 private var storedAddress = ""
 init() {
  storedAddress = address
  var query = keyQuery
  query[kSecReturnData as String] = true
  query[kSecMatchLimit as String] = kSecMatchLimitOne
  var result: CFTypeRef?
  if SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess, let data = result as? Data {
   token = String(data: data, encoding: .utf8) ?? ""
  }
 }
 private var keyQuery: [String: Any] {
  [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service, kSecAttrAccount as String: "owner-api-token"]
 }
 func configure() {
  guard let url = URL(string: address), url.scheme == "https", url.host != nil,
        url.user == nil, url.password == nil, url.query == nil, url.fragment == nil,
        url.path.isEmpty || url.path == "/", token.count >= 43 else {
   status = "Indiquez l’adresse HTTPS du serveur et sa clé privée (au moins 43 caractères)."; return
  }
  let data = Data(token.utf8)
  let attributes: [String: Any] = [kSecValueData as String: data, kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly]
  var code = SecItemUpdate(keyQuery as CFDictionary, attributes as CFDictionary)
  if code == errSecItemNotFound {
   code = SecItemAdd(keyQuery.merging(attributes) { _, new in new } as CFDictionary, nil)
  }
  guard code == errSecSuccess else { status = "Impossible de protéger la clé dans le trousseau."; return }
  storedAddress = address
  UserDefaults.standard.set(address, forKey: "adminServerURL")
  remote = nil
  status = "Connexion enregistrée. Chargez le stock du site."
 }
 func load() async {
  await request(method: "GET", stock: nil)
 }
 func publish(_ products: [Product]) async {
  guard let remote, Set(products.map(\.name)) == Set(remote.stock.keys) else {
   status = "Rechargez le site et vérifiez que toutes les références correspondent."; return
  }
  await request(method: "PUT", stock: RemoteStock(stock: Dictionary(uniqueKeysWithValues: products.map { ($0.name, $0.quantity) }), sha: remote.sha))
 }
 private func request(method: String, stock: RemoteStock?) async {
  guard !busy else { return }
  guard address == storedAddress, !token.isEmpty, let base = URL(string: storedAddress), base.scheme == "https" else {
   status = "Enregistrez la connexion avant de continuer."; return
  }
  busy = true
  defer { busy = false }
  do {
   var request = URLRequest(url: base.appendingPathComponent("stock"))
   request.httpMethod = method
   request.timeoutInterval = 25
   request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
   request.setValue("application/json", forHTTPHeaderField: "Content-Type")
   request.cachePolicy = .reloadIgnoringLocalCacheData
   if let stock { request.httpBody = try JSONEncoder().encode(stock) }
   let configuration = URLSessionConfiguration.ephemeral
   let session = URLSession(configuration: configuration, delegate: RejectRedirects(), delegateQueue: nil)
   defer { session.invalidateAndCancel() }
   let (data, response) = try await session.data(for: request)
   guard let http = response as? HTTPURLResponse else { throw URLError(.badServerResponse) }
   guard http.statusCode == 200 else {
    if http.statusCode == 409 { remote = nil }
    let message = (try? JSONDecoder().decode([String: String].self, from: data))?["error"]
    status = message ?? "Connexion refusée (\(http.statusCode))."; return
   }
   let result = try JSONDecoder().decode(RemoteStock.self, from: data)
   guard !result.stock.isEmpty, result.stock.values.allSatisfy({ $0 >= 0 && $0 <= 1000000 }) else { throw URLError(.cannotParseResponse) }
   remote = result
   status = method == "PUT" ? "Stock enregistré sur GitHub. La mise à jour du site dépend de son déploiement." : "Stock du site chargé pour comparaison."
  } catch { status = "Connexion impossible : \(error.localizedDescription)" }
 }
}

private final class RejectRedirects: NSObject, URLSessionTaskDelegate, @unchecked Sendable {
 nonisolated func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping @Sendable (URLRequest?) -> Void) {
  completionHandler(nil)
 }
}
