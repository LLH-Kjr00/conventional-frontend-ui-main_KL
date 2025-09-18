import {AppController} from "./AppController";
import {ProductDialog} from "../models/ProductDialog";
import {Payment} from "../models/Payment";
import {PaymentOctopus} from "../models/PaymentOctopus";
import {PaymentAlipay} from "../models/PaymentAlipay";
import {PaymentWechatPay} from "../models/PaymentWechatPay";

export class ProductController {
  app: AppController;
  productDialog: ProductDialog | undefined;
  private allowedPayment: Payment[];
  paymentSelected: Payment | undefined;


  constructor(app: AppController) {
    this.app = app;
    this.allowedPayment = [];
  }

  setAllowedPayment(resp: SelectProductResp){
    this.allowedPayment = [];

    if (resp.dataObj.octopusPayment) this.allowedPayment.push(new PaymentOctopus(this.app.projectConfig.ui.octopusCountdown));
    if (resp.dataObj.aliPayment)  this.allowedPayment.push(new PaymentAlipay(this.app.projectConfig.ui.alipayCountdown));
    if (resp.dataObj.wechatPayment)  this.allowedPayment.push(new PaymentWechatPay(this.app.projectConfig.ui.wechatCountdown));

    // If there is only one allowed payment -> select this payment method automatically
    if( this.allowedPayment.length ==1){
      this.openPayment(this.allowedPayment[0])
    }
  }
  getAllowedPayment(){
    return this.allowedPayment;
  }

  /**
   * Remove the error of the product Dialog
   */
  resetError(){
    if (this.productDialog){
      if (this.productDialog.octopus3){
        // Send UNSELECT_PRODUCT_PAYMENT to local backend
        const socketJSON = {
          action: 'UNSELECT_PRODUCT_PAYMENT',
        };
        this.app.websocketController.sendMessage(socketJSON);

      } else {
        this.productDialog.error = false;
      }
    }
  }

  handleOtherError(errorMsg: string, errorMsgChi : string){
    if (this.productDialog){
      this.productDialog.error = false;
      this.productDialog.otherError = true;
      this.productDialog.errorMsg = errorMsg;
      this.productDialog.errorMsgChi = errorMsgChi;
      if (this.paymentSelected){
        this.paymentSelected.lockDialog = false;
      }
    }
  }

  /**
   * Unlock Dialog for payment process
   * @private
   */
  private cancelLockDialog(){
    if (this.paymentSelected){
      this.paymentSelected.lockDialog = false;
      clearInterval(this.paymentSelected.lockDialogHandler)
      this.paymentSelected.lockDialogHandler = undefined;
    }
  }

  /**
   * Initialize a product dialog
   * @param cell
   */
  openProductDialog(cell: Cell){
    if (!cell.enabled || cell.notInUse) return;

    this.productDialog = new ProductDialog(cell, this.app.projectConfig.ui.productDialogCountdownValue);

    // Check the product image exist or not
    this.app.mediaController.productImageExist(cell, this.app.mediaController.getProductImagePath(cell.image))

    // Send SELECT_PRODUCT to local backend
    const socketJSON = {
      action: 'SELECT_PRODUCT',
      productId: cell.productId,
      price: cell.price,
      vipPrice: cell.vipPrice
    };
    this.app.websocketController.sendMessage(socketJSON);

    // Set a timer, after 30s(productDialogWaitForBEResponseValue), if the product dialog is till not inited, close the dialog
    this.productDialog.waitForHandler = setTimeout(() => {
      if (!this.productDialog?.inited) {
        this.closeProductDialog();
      }
    }, this.app.projectConfig.ui.productDialogWaitForBEResponseValue * 1000);

    // Set a timer, after 30s(productDialogCountdownValue), close the product dialog
    this.productDialog.countdownHandler = setInterval(()=>{
      if (this.productDialog){
        this.productDialog.countdown -= 1;
        if (this.productDialog.countdown < 0){
          this.closeProductDialog();
        }
      }
    }, 1000)
  }

  /**
   * Close a product dialog when time's up, or user choose to return or the transaction complete
   */
  closeProductDialog(){
    clearTimeout(this.productDialog?.waitForHandler);
    clearInterval(this.productDialog?.countdownHandler);
    clearInterval(this.paymentSelected?.lockDialogHandler);

    // If ths productDialog is init -> send unselect_product to local backend
    if (this.productDialog?.inited) {
      this.app.websocketController.sendMessage({
        action:  'UNSELECT_PRODUCT'
      });
    }

    // Clear the product dialog , selected payment allowed payment
    this.productDialog = undefined;
    this.paymentSelected = undefined;
    this.allowedPayment = [];
  }

  /**
   * Handle Response of Selecting Product
   * @param resp
   */
  handleSelectProductResponse(resp: SelectProductResp){
    if (this.productDialog){
      this.productDialog.inited = true;
      this.setAllowedPayment(resp)
    }
  }
  /**
   * Handle Error Response of Selecting Product
   * @param resp
   */
  handleSelectProductErrorResponse(resp: ErrorResp){
    if (this.productDialog){
      this.productDialog.inited  = true;
      this.productDialog.error = true;
      this.productDialog.errorMsg = resp.dataObj.error;
      this.productDialog.errorMsgChi = resp.dataObj.errorChi;
    }
  }

  /**
   * Open the payment dialog
   * @param method
   */
  openPayment(method: Payment){
    if (this.productDialog){
      this.paymentSelected = method;

      // Update Countdown as the countdown for this payment method
      this.productDialog.countdown = method.countdown;

      this.productDialog.octopus3 = false;

      // Send SELECT_PRODUCT to local backend
      const socketJSON = {
        action: 'SELECT_PRODUCT_PAYMENT',
        paymentCode: method.name
      };
      this.app.websocketController.sendMessage(socketJSON);
    }
  }

  tryToClosePayment(){
    // Send UNSELECT_PRODUCT_PAYMENT to local backend
    const socketJSON = {
      action: 'UNSELECT_PRODUCT_PAYMENT',
    };
    this.app.websocketController.sendMessage(socketJSON);
  }

  /**
   * Unselect payment after clicking cancel button in the ui
   */
  closePayment(){
    if (this.productDialog){
      this.paymentSelected = undefined;

      // Update Countdown as the original countdown value for the product dialog
      this.productDialog.countdown = this.app.projectConfig.ui.productDialogCountdownValue;

      this.productDialog.error = false;
      this.productDialog.otherError = false;
      this.productDialog.askRetry = false;
    }
  }

  /**
   * Handle Response of Select Payment
   * @param resp
   */
  handleSelectProductPaymentResponse(resp: LocalBackendResp){
    if (this.paymentSelected){
      this.paymentSelected.inited = resp.success;
    }
  }

  handleSelectProductPaymentErrorResponse(resp: ErrorResp){
    this.handleOtherError(resp.dataObj.error, resp.dataObj.errorChi);
  }

  handleOctopus3notRetry(){
    this.app.websocketController.sendMessage({action: 'OCT_3_NOT_RETRY'})
    this.closePayment()

    if (this.productDialog){
      this.productDialog.countdownHandler = setInterval(()=>{
        if (this.productDialog){
          this.productDialog.countdown -= 1;
          if (this.productDialog.countdown < 0){
            this.closeProductDialog();
          }
        }
      }, 1000)
    }
  }

  handleOctopus3Retry(){
    if (this.paymentSelected && this.productDialog){
      this.app.websocketController.sendMessage({action: 'OCT_3_RETRY'})

      this.productDialog.error = false;
      this.productDialog.askRetry = false;

      this.productDialog.countdown =  this.app.projectConfig.ui.octopus3Countdown;

      this.productDialog.countdownHandler = setInterval(()=>{
        if (this.productDialog){
          this.productDialog.countdown -= 1;
          if (this.productDialog.countdown < 0){
            this.closeProductDialog();
          }
        }
      }, 1000)
    }
  }


  /**
   * Handle Response of Octopus Payment Status
   * @param resp
   * @private
   */
   handlePaymentOctopusResponse(resp: OctopusStatusResp) {
      if (this.paymentSelected && this.productDialog){
        // When there is waitTime, it means it is octopus3, there is no error here
        if (resp.dataObj.waitTime){
          this.productDialog.countdown = resp.dataObj.waitTime;
          this.app.projectConfig.ui.octopus3Countdown = resp.dataObj.waitTime;
          this.productDialog.octopus3 = true;
          return;
        }

        // When there is retry and true, it means it is octopus3
        if (resp.dataObj.retry){
          clearInterval(this.productDialog?.countdownHandler);
          this.productDialog.askRetry = true;
        }

        // If the readerNormal is false, it means it is other type error
        if (!resp.dataObj.readerNormal) {
          this.handleOtherError(resp.dataObj.message, resp.dataObj.messageChi);
          return;
        }

        if (resp.dataObj.newDialog) this.productDialog.error = true;
        this.productDialog.errorMsg = resp.dataObj.message;
        this.productDialog.errorMsgChi = resp.dataObj.messageChi;
        
        // If there is lock dialog handler already -> the lockDialog must be true
        if (this.paymentSelected.lockDialogHandler !== undefined) {
          this.paymentSelected.lockDialog = true;
        } else {
          this.paymentSelected.lockDialog = resp.dataObj.lockDialog;
        }


        //  If it is required to reset countdown : add 25 second to the product dialog countdown
        if (resp.dataObj.resetCountdown){
          this.productDialog.countdown += 25;
          this.paymentSelected.lockDialogCountdown = 25
        // If it is not required to reset countdown but to lock the dialog

        } else if (resp.dataObj.lockDialog){
          this.paymentSelected.lockDialogCountdown = 25
          this.paymentSelected.lockDialog = true;
        }

        

        // If it is required to lock the dialog (payment processing page, but no return button) but the lock dialog handler is undefined
        // -> create the handler
        if (this.paymentSelected.lockDialog && this.paymentSelected.lockDialogHandler === undefined){
          this.paymentSelected.lockDialogCountdown = 20;
          this.paymentSelected.lockDialogHandler = setInterval(()=>{
            if(this.paymentSelected){
              this.paymentSelected.lockDialogCountdown -= 1;
              if (this.paymentSelected.lockDialogCountdown <0) this.cancelLockDialog()
            }
          }, 1000)
        }

      }
   }


  /**
   * Handle Response of QR code payment status
   * @param resp
   * @private
   */
   handlePaymentQRCodeResponse(resp: QRCodeResp){
    if (this.paymentSelected && this.productDialog){
      if (resp.dataObj.qrCode){
        this.paymentSelected.qrcode = resp.dataObj.qrCode;
        this.productDialog.countdown = resp.dataObj.timeout
      } else{
        this.handleOtherError(resp.dataObj.message, resp.dataObj.messageChi );
      }
    }
  }

  handleTransactionCompleteResp(resp: TransCompleteResp){
     if (this.productDialog && this.paymentSelected){
       this.paymentSelected.successful = true;

       const tranInfo = resp.dataObj.tranInfo;

       // trandTypeId = 6 : free vending
       if (tranInfo.payStatusCode != 0 && tranInfo.tranTypeId !== 6){
         if (tranInfo.cardId) tranInfo.cardId = this.formatSensitiveInfo(tranInfo.cardId, 4);
         this.app.receiptController.openReceiptDialog(this.productDialog.cell, tranInfo, resp.dataObj.qrCode, resp.dataObj.printData, resp.dataObj.printDataChi);

         this.closeProductDialog()
       }
     // TODO
     } else if ( resp.dataObj.tranInfo.tranTypeId == 6) {

     }
  }
  handleTransactionCompleteErrorResp(resp: TransCompleteFailResp){
     if (this.productDialog){
       this.productDialog.error = true;
       this.productDialog.countdown = this.app.projectConfig.ui.productDialogCountdownValue;
       this.productDialog.errorMsg = resp.dataObj.message;
       this.productDialog.errorMsgChi = resp.dataObj.messageChi
     }
  }

  formatSensitiveInfo(input:string, numberToShow: number) {
    let output = '';
    for (let i = 0; i < input.toString().length - numberToShow; i++) {
      output += '*';
    }
    output = output + input.toString().slice(-numberToShow);
    return output;
  }

}
