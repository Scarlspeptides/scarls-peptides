import SwiftUI
struct HistoryView:View{@EnvironmentObject var store:InventoryStore;var body:some View{NavigationStack{List(store.movements){m in HStack{VStack(alignment:.leading){Text(m.product).font(.headline);Text(m.date.formatted()).font(.caption).foregroundStyle(.secondary)};Spacer();Text(m.delta>0 ? "+\(m.delta)":"\(m.delta)")}}.navigationTitle("Historique")}}}
