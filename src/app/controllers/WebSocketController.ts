import {AppController} from './AppController';

export class WebSocketController {
  app: AppController;
  socket: WebSocket;

  constructor(app: AppController) {
    console.log('Websocket Controller Constructor');
    this.app = app;
    this.socket = new WebSocket(this.app.projectConfig.localServerURL);
    this.connectWebsocket();

  }

  connectWebsocket(){
    // When the web socket connection is opened
    this.socket.onopen = (e: Event) => {
      console.log('[WebSocketController] Websocket connected.');
      this.app.loaded = true;
      this.sendMessage({
        action: 'GET_VM_INFO',
        groupByProduct: this.app.projectConfig.ui.groupCell
      });
    };

    // When receive message
    this.socket.onmessage = (msg: MessageEvent) => {
      const socketMsg: LocalBackendResp = JSON.parse(msg.data);
      console.log('[WebSocketController] Received Message from local server: ', socketMsg);
      switch (socketMsg.msgCode){
        case 'GET_VM_INFO': this.handleVmInfoResponse(socketMsg as VmInfoResp); break;

        case 'SELECT_PRODUCT' : {
          if (socketMsg.success) this.app.productController.handleSelectProductResponse(socketMsg as SelectProductResp);
          else  this.app.productController.handleSelectProductErrorResponse(socketMsg as ErrorResp);
          break;
        }
        case 'SELECT_PRODUCT_PAYMENT' : {
          if (socketMsg.success)this.app.productController.handleSelectProductPaymentResponse(socketMsg);
          else this.app.productController.handleSelectProductPaymentErrorResponse(socketMsg as ErrorResp);
          break;
        }
        case 'UNSELECT_PRODUCT_PAYMENT':{
          if (socketMsg.success) this.app.productController.closePayment();
          break;
        }

        // Payment processing response
        case 'OCT_TRAN_STATUS': this.app.productController.handlePaymentOctopusResponse(socketMsg as OctopusStatusResp);break;
        case 'WECHAT_QR_CODE': this.app.productController.handlePaymentQRCodeResponse(socketMsg as QRCodeResp); break;
        case 'ALIPAY_QR_CODE': this.app.productController.handlePaymentQRCodeResponse(socketMsg as QRCodeResp); break;

        // Transaction Complete
        case 'TRAN_COMPLETE':{
          if (socketMsg.success) this.app.productController.handleTransactionCompleteResp(socketMsg as TransCompleteResp);
          else this.app.productController.handleTransactionCompleteErrorResp(socketMsg as TransCompleteFailResp);
          break;
        }

        // Washing Machine Waiting
        case 'VEND_WAITING_WASHING_MACHINE': this.app.vendingMachineController.handleWaitingWashingMachineResp(socketMsg as WashingMachineWaitingResp); break;
        case 'VEND_WASHING_MACHINE_FAIL': this.app.vendingMachineController.handleWashingMachineInitFailResp(socketMsg as VendingFailResp); break;
        case 'VEND_WASHING_MACHINE_SUCCESS' : this.app.vendingMachineController.handleWashingMachineInitSuccessResp(socketMsg as VendingSuccessResp); break;

        // Octopus Enquiry
        case 'OCT_ENQUIRY':this.app.octopusEnquiryController.handleEnquiryResponse(socketMsg as OctopusEnquiryResp); break;
        case 'OCT_ENQUIRY_STATUS': this.app.octopusEnquiryController.handleEnquiryStatusResponse(socketMsg as OctopusEnquiryStatusResp); break;
        case 'OCT_ENQUIRY_CANCEL' : {
          if (socketMsg.success) this.app.octopusEnquiryController.closeEnquiryDialog();
          break;
        }

        case 'OCT_3_SCHEME_ENQUIRY': this.app.adminController.handleOctopusV3SchemeEnquiryResult(socketMsg as OctopusSchemeEnquiryResp); break;


        default: console.log('UNKNOWN ACTION. ABORTED.', socketMsg);
      }
    };

    this.socket.onerror = (e: Event)=>{
      console.log('Websocket error: ', e)
    }
    this.socket.onclose = (e: CloseEvent) =>{
      console.log('Websocket closed');
      setTimeout(() => {
        this.socket = new WebSocket(this.app.projectConfig.localServerURL);
        this.connectWebsocket()
      }, 15000);
    }
  }
  sendMessage(json: any) {
    try {
      this.socket.send(JSON.stringify(json));
    } catch (e){
      console.log("Error in sending message: " + e);
      this.socket = new WebSocket(this.app.projectConfig.localServerURL);
      this.connectWebsocket();
      this.socket.send(JSON.stringify(json));
    }

  }

  /**
   * Handle Response of Getting Vending Machine Information
   * @param resp
   */
  handleVmInfoResponse(resp: VmInfoResp) {
    // Update Video Information
    this.app.videoController.setVideos(resp.dataObj.globalVideo);
    // Update TAB Information
    this.app.uiController.setAllTabs(resp.dataObj.allTab);
    this.app.uiController.setCustomTabs(resp.dataObj.tabs);
    this.app.uiController.loadTab();
  }

}
