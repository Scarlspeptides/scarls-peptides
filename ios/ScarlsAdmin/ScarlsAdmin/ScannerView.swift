import SwiftUI
import AVFoundation
struct ScannerView:View{
 @EnvironmentObject var store:InventoryStore; @State private var scanned:Product?
 var body:some View{NavigationStack{VStack{CodeScannerView{code in scanned=store.product(for:code)}.clipShape(RoundedRectangle(cornerRadius:24)).padding();if let p=scanned{VStack{Text(p.name).font(.title.bold());HStack{Button("Retirer 1"){store.change(p,by:-1)}.buttonStyle(.borderedProminent);Button("Ajouter 1"){store.change(p,by:1)}.buttonStyle(.bordered)}}.padding()}}.navigationTitle("Scanner")}}
}
struct CodeScannerView:UIViewControllerRepresentable{
 let onCode:(String)->Void
 func makeUIViewController(context:Context)->ScannerController{let v=ScannerController();v.onCode=onCode;return v}
 func updateUIViewController(_ uiViewController:ScannerController,context:Context){}
}
final class ScannerController:UIViewController,AVCaptureMetadataOutputObjectsDelegate{
 var onCode:((String)->Void)?;let session=AVCaptureSession()
 override func viewDidLoad(){super.viewDidLoad();guard let d=AVCaptureDevice.default(for:.video),let i=try? AVCaptureDeviceInput(device:d),session.canAddInput(i) else{return};session.addInput(i);let o=AVCaptureMetadataOutput();guard session.canAddOutput(o) else{return};session.addOutput(o);o.setMetadataObjectsDelegate(self,queue:.main);o.metadataObjectTypes=[.qr,.ean8,.ean13,.code128];let p=AVCaptureVideoPreviewLayer(session:session);p.videoGravity = .resizeAspectFill;p.frame=view.bounds;view.layer.addSublayer(p);DispatchQueue.global(qos:.userInitiated).async{self.session.startRunning()}}
 func metadataOutput(_ output:AVCaptureMetadataOutput,didOutput objects:[AVMetadataObject],from connection:AVCaptureConnection){if let c=(objects.first as? AVMetadataMachineReadableCodeObject)?.stringValue{onCode?(c)}}
}