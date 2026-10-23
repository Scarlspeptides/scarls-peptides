import SwiftUI
@main struct ScarlsAdminApp: App {
 @StateObject private var store=InventoryStore()
 var body: some Scene { WindowGroup { LockedRootView().environmentObject(store) } }
}