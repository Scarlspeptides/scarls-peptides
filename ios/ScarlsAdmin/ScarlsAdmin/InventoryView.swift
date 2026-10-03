import SwiftUI
struct InventoryView: View {
 @EnvironmentObject var store:InventoryStore; @State private var search=""
 var shown:[Product]{search.isEmpty ? store.products : store.products.filter{$0.name.localizedCaseInsensitiveContains(search)}}
 var body:some View{NavigationStack{List(shown){p in HStack{VStack(alignment:.leading){Text(p.name).font(.headline); Text(p.quantity==0 ? "Rupture" : p.quantity<=3 ? "Stock faible":"En stock").font(.caption).foregroundStyle(.secondary)};Spacer();Button{store.change(p,by:-1)}label:{Image(systemName:"minus.circle.fill")}.buttonStyle(.plain);Text("\(p.quantity)").frame(minWidth:35);Button{store.change(p,by:1)}label:{Image(systemName:"plus.circle.fill")}.buttonStyle(.plain)}}.searchable(text:$search).navigationTitle("Scarl’s · Stock")}}
}