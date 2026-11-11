import SwiftUI
struct ContentView: View {
 var body: some View { TabView {
  InventoryView().tabItem{Label("Stock",systemImage:"shippingbox.fill")}
  ScannerView().tabItem{Label("Scanner",systemImage:"qrcode.viewfinder")}
  HistoryView().tabItem{Label("Historique",systemImage:"clock.arrow.circlepath")}
  SiteView().tabItem{Label("Site",systemImage:"globe")}
  TeamView().tabItem{Label("Équipe",systemImage:"person.2.fill")}
 }.tint(.purple)}
}